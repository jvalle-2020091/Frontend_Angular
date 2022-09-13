import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {TranslateService} from '../../../node_modules/@ngx-translate/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,
                public translate: TranslateService) {
                    this.translate.addLangs(['es', 'en']);
                    //this.translate.setDefaultLang('es');
                 }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/layout'] }
                ]
            },
           
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                  
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/layout/pages/crud']
                    },
                    {
                        label: 'Roles',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/layout/pages/roles']
                    },
                   
                ]
            },
        ];
    }
}
