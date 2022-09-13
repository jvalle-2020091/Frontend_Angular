import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    selectedLenguaje: any;

    lenguajes: any = [];
    options: any =[];

    model: any[] = [];

    items!: MenuItem[];

    @ViewChild('menu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        private router: Router
        ) { }
    
    ngOnInit() {
        this.lenguajes = [
            {
                name: 'Es',
                code: 'AU',

            },
            {
                name: 'En', 
                code: 'CA',
            
            },
            
        ];
        this.options = [
            {
                name: 'Log Out',
            }
            
            
        ];
    }

    logOut(){
         localStorage.clear();
         this.router.navigateByUrl('');
       }


    setLanguage(language: string){
        localStorage.setItem('language', language)
        
    }

       
    
}
