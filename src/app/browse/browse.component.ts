import {Component, OnDestroy, OnInit} from '@angular/core';
import {Beer, LocalStorageKeys} from "../models";
import {BeerService, BeerStoreService} from "../services";
import {from, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BeerModalComponent} from "../beer-modal/beer-modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
    beers$: Observable<Beer[]>;
    currentPage;
    readonly MIN_PAGE = 1;
    readonly MAX_PAGE = 10;
    readonly PER_PAGE = 12;
    
    foodPairForm: FormGroup;
    
    constructor(private beerService: BeerService, public dialog: MatDialog,
                private beerStoreService: BeerStoreService, private fb: FormBuilder) {
    }
    
    ngOnInit(): void {
        this.foodPairForm = this.fb.group({
            food: ['', Validators.required]
        });
        
        this.listenToCurrentPage();
        
        const localStorageBeers = localStorage.getItem(LocalStorageKeys.BEERS);
        if (localStorageBeers) {
            this.currentPage = +localStorage.getItem(LocalStorageKeys.PAGE);
            this.beers$ = of(JSON.parse(localStorageBeers)) as Observable<Beer[]>;
            return;
        }
        
        this.beers$ = this.beerService.getBeers(this.currentPage);
    }
    
    listenToCurrentPage() {
        this.beerStoreService.currentPage.subscribe(page => {
            this.currentPage = page;
        });
    }
    
    trackByFn(index, item) {
        return item.id;
    }
    
    openDialog(selectedBeer) {
        this.dialog.open(BeerModalComponent, {
            data: selectedBeer as Beer,
        });
    }
    
    nextPage() {
        if (this.currentPage >= this.MAX_PAGE) {
            return;
        }
        
        const food = this.foodPairForm.get('food').value;
        
        this.beerStoreService.currentPage.next(++this.currentPage);
        this.beers$ = this.beerService.getBeers(this.currentPage, 12, food ?? null);
    }
    
    prevPage() {
        if (this.currentPage <= this.MIN_PAGE) {
            return;
        }
        
        const food = this.foodPairForm.get('food').value;
        
        this.beerStoreService.currentPage.next(--this.currentPage);
        this.beers$ = this.beerService.getBeers(this.currentPage, 12, food ?? null);
    }
    
    formSubmitHandle() {
        if (this.foodPairForm.invalid) {
            return;
        }
        
        // valid form
        this.beerStoreService.currentPage.next(1);
        const food = this.foodPairForm.get('food').value;
        this.beers$ = this.beerService.getBeers(1, 12, food);
    }
    
    resetForm() {
        this.foodPairForm.reset()
        
        this.beerStoreService.currentPage.next(1);
        this.beers$ = this.beerService.getBeers(1);
    }
    
    async setCacheData() {
        // set beers
        const localStorageBeers = await this.beerService.setLocal(this.beers$);
        localStorage.setItem(LocalStorageKeys.BEERS, JSON.stringify(localStorageBeers));
        
        // set current page
        localStorage.setItem(LocalStorageKeys.PAGE, this.currentPage);
    }
    
    ngOnDestroy() {
        this.setCacheData();
    }
    
}
