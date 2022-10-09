import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseComponent} from "./browse/browse.component";
import {FavoriteComponent} from "./favorite/favorite.component";

const routes: Routes = [
    {path: '', redirectTo: 'browse', pathMatch: "full"},
    {path: 'browse', component: BrowseComponent},
    {path: 'favorite', component: FavoriteComponent},
    {path: '**', redirectTo: 'browse'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
