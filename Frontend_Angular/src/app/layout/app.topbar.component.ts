import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    selectedLenguaje: any;

    lenguajes: any = [];


    items!: MenuItem[];

    @ViewChild('menu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    
    ngOnInit() {
        this.lenguajes = [
            {
                name: 'Espanish',
                code: 'AU',

            },
            {
                name: 'English', 
                code: 'CA',
            
            },
            
        ];
    }
}
