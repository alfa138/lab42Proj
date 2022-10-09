import {Component, Input, OnInit} from '@angular/core';
import {Beer} from "../models";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {BeerStoreService} from "../services";
import {of} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-beer-card',
    templateUrl: './beer-card.component.html',
    styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {
    @Input() beer: Beer;
    @Input() showRank = false;
    rank: FormControl;
    
    constructor(private beerStoreService: BeerStoreService) {
    }
    
    ngOnInit(): void {
        this.rank = new FormControl(this.beer.rank);
    }
    
    sliderChanged(e: MatSlideToggleChange) {
        this.beer.favorite = of(e.checked);
        
        if (e.checked) {
            this.beerStoreService.addBeerToFavorite(this.beer);
        } else {
            this.beerStoreService.removeBeerFromFavorite(this.beer.id);
        }
    }
    
    changeRank(e) {
        this.beer.rank = e.value;
        this.beerStoreService.rankBeer(this.beer.id, this.beer.rank);
    }
}
