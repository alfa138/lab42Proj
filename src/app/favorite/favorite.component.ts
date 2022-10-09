import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Beer} from "../models";
import {BeerStoreService} from "../services";
import {BeerModalComponent} from "../beer-modal/beer-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
    beers$: Observable<Beer[]> = this.beerStoreService.favoriteBeers;
    
    
    constructor(private beerStoreService: BeerStoreService, public dialog: MatDialog) {
    }
    
    ngOnInit(): void {
    }
    
    trackByFn(index, item) {
        return item.id;
    }
    
    openDialog(selectedBeer) {
        this.dialog.open(BeerModalComponent, {
            data: selectedBeer as Beer,
        });
    }
    
    removeAllFavoritesModal(content) {
        this.dialog.open(content, {
            minWidth: '25vw'
        });
    }
    
    removeAllFavorites() {
        this.beerStoreService.removeAllBeersFromFavorite();
        this.beers$ = this.beerStoreService.favoriteBeers;
    }
    
}
