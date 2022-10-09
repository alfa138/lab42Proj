import {Component, OnInit} from '@angular/core';
import {Beer} from "../models";
import {BeerService, BeerStoreService} from "../services";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BeerModalComponent} from "../beer-modal/beer-modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
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
    
}
