import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoleRestService } from '../services/role-rest.service';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    selectedLenguaje: any;
    language: any;
    lenguajes: any = [];
    options: any =[];

    model: any[] = [];

    items!: MenuItem[];

    @ViewChild('menu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private router: Router,
                public translate: TranslateService,
                private roleRest: RoleRestService) { }
    
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
        this.language = this.roleRest.getLanguage();
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang(this.language);
    }

    logOut(){
         localStorage.clear();
         this.router.navigateByUrl('');
       }


    setLanguage(language: string){
        localStorage.setItem('language', language);
        location.reload();    
    }

       
    
}
