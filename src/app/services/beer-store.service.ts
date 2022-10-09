import {Injectable} from '@angular/core';
import {Beer} from "../models";
import {BehaviorSubject, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BeerStoreService {
    private _favoriteBeers: Beer[] = [];
    currentPage = new BehaviorSubject<number>(1);
    
    constructor() {
    }
    
    addBeerToFavorite(beer) {
        this._favoriteBeers.push(beer);
        console.log(this._favoriteBeers);
    }
    
    removeBeerFromFavorite(beerId) {
        const beerIndex = this._favoriteBeers.findIndex(beer => beer.id === beerId);
        
        if (beerIndex < 0) {
            // beer not found
            return;
        }
        
        // beer found
        this._favoriteBeers.splice(beerIndex, 1);
        console.log(this._favoriteBeers);
    }
    
    removeAllBeersFromFavorite() {
        for (let beer of this._favoriteBeers) {
            beer.favorite = of(false);
        }
        
        this._favoriteBeers = [];
    }
    
    rankBeer(beerId, rank) {
        const beerIndex = this._favoriteBeers.findIndex(beer => beer.id === beerId);
        
        if (beerIndex < 0) {
            // beer not found
            return;
        }
        
        // beer found
        this._favoriteBeers[beerIndex].rank = rank;
    }
    
    get favoriteBeers() {
        return of(this._favoriteBeers);
    }
}
