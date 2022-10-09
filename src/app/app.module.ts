import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BrowseComponent } from './browse/browse.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { BeerModalComponent } from './beer-modal/beer-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    FavoriteComponent,
    BeerCardComponent,
    BeerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
