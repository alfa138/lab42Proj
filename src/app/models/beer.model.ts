import {Observable} from "rxjs";

export interface Beer {
    id: null;
    name: string;
    image_url: string;
    favorite: Observable<boolean>
    description: string;
    brewers_tips: string;
    first_brewed: string;
    ph: number;
    rank?: number
}
