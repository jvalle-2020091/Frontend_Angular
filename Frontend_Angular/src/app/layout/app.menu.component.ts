import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

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
                        icon: 'pi pi-fw pi-pencil',
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
