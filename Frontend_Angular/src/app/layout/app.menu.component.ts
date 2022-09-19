import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RoleRestService } from '../services/role-rest.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any = [
        // {
        //     label: 'MENU.HOME',
        //     items: [
        //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/layout'] }
        //     ]
        // },
       
        {
            label: 'MENU.COMPONENTS',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/pages'],
            items: [
              
                {
                    label: "MENU.USERS",
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/layout/pages/crud']
                },
                {
                    label: 'MENU.ROLES',
                    icon: 'pi pi-fw pi-cog',
                    routerLink: ['/layout/pages/roles']
                },
               
            ]
        },
    ];

    setLang: any

    constructor(
        public layoutService: LayoutService,
        public translate: TranslateService,
        private roleRest: RoleRestService) 
                {
                    
                }

    ngOnInit() {

        this.setLang = this.roleRest.getLanguage();
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang(this.setLang)

        for(const item of this.model){
            this.translate.get(item.label).subscribe(res =>{
                item.label = res
            })
            item.items.map((child:any) =>{
            
                this.translate.get(child.label).subscribe(res =>{
                    child.label = res
                })
                
            })
        }
        
        
    }
}