import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Beer, LocalStorageKeys} from "../models";
import {catchError, EMPTY, firstValueFrom, map, mergeMap, Observable, of, tap} from "rxjs";
import {BeerStoreService} from "./beer-store.service";

@Injectable({
    providedIn: 'root'
})
export class BeerService {
    beersFromCache = true;
    
    constructor(private http: HttpClient, private beerStoreService: BeerStoreService) {
    }
    
    getBeers(page = 1, perPage = 12, food = null) {
        const beersCache = localStorage.getItem(LocalStorageKeys.BEERS);
        
        if (this.beersFromCache && beersCache) {
            this.beersFromCache = false;
            console.log(JSON.parse(localStorage.getItem(LocalStorageKeys.BEERS)));
            return of(JSON.parse(localStorage.getItem(LocalStorageKeys.BEERS))) as Observable<Beer[]>;
        }
        
        const extraUrl = food ? `&food=${food}` : '';
        console.log(`${environment.apiUrl}/beers?page=${page}&per_page=${perPage}${extraUrl}`);
        return this.http.get<any[]>(`${environment.apiUrl}/beers?page=${page}&per_page=${perPage}${extraUrl}`)
            .pipe(
                tap(beers => console.log(beers)),
                map(item => {
                    
                    return item.map(beer => {
                        const favState = this.beerStoreService.favoriteBeers.pipe(
                            mergeMap(favBeerProject => {
                                const foundBeer = favBeerProject.find(favorite => {
                                    return favorite.id === beer.id;
                                });
                                
                                if (foundBeer) {
                                    return of(true);
                                }
                                return of(false);
                            })
                        );
                        
                        const mappedBeer: Beer = {
                            id: beer.id,
                            name: beer.name,
                            image_url: beer.image_url,
                            favorite: favState,
                            description: beer.description,
                            brewers_tips: beer.brewers_tips,
                            first_brewed: beer.first_brewed,
                            ph: beer.ph
                        }
                        
                        return mappedBeer;
                    });
                }),
                catchError(err => {
                    // show a global or a specific error msg or modal and return EMPTY to complete the Observable
                    return EMPTY;
                })
            );
    }
    
    async setLocal(value: Observable<any>): Promise<any> {
        return await firstValueFrom(value);
    }
}
