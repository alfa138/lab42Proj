import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const materialModules = [
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
]

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        materialModules
    ]
})
export class MaterialModule {
}
