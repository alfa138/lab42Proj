import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Beer} from "../models";
import {catchError, EMPTY, map, mergeMap, of, tap} from "rxjs";
import {BeerStoreService} from "./beer-store.service";

@Injectable({
    providedIn: 'root'
})
export class BeerService {
    
    constructor(private http: HttpClient, private beerStoreService: BeerStoreService) {
    }
    
    getBeers(page = 1, perPage = 12, food = null) {
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
}
