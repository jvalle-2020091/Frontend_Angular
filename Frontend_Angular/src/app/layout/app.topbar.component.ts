import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoleRestService } from '../services/role-rest.service';
import { LoginRestService } from 'src/app/services/login-rest.service';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent  {
    selectedLenguaje: any;
    language: any;

    token: any;
    lastname: any;
    firstname: any;
    image:any;

    model: any[] = [];

    log: any = [
        {label: 'TOPBAR.LOGOUT', icon: 'pi pi-sign-out', command: () => {
            this.logOut()
        }}
    ];

    languages:any = [
        {label: 'TOPBAR.SPANISH', icon: 'pi pi-globe', command: () => {
            this.setLanguage('es')
        }},
        {label: 'TOPBAR.ENGLISH', icon: 'pi pi-globe', command: () => {
            this.setLanguage('en')
        }}
    ]

    @ViewChild('menu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private router: Router,
                public translate: TranslateService,
                private roleRest: RoleRestService,
                private loginRest: LoginRestService,
                
                ) { }

                disableSelect = new FormControl(false);

    
    ngOnInit() {
        this.language = this.roleRest.getLanguage();
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang(this.language);

        for(const item of this.log){
            this.translate.get(item.label).subscribe(res =>{
                item.label = res
            })
        }

        for(const item of this.languages){
            this.translate.get(item.label).subscribe(res =>{
                item.label = res
            })
        }
        

        this.firstname = this.loginRest.getUser().firstName;
        this.lastname = this.loginRest.getUser().lastName;
        this.image = this.loginRest.getUser().image;
        this.token = this.loginRest.getToken();
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
