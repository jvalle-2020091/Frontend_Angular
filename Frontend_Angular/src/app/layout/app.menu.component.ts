import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RoleRestService } from '../services/role-rest.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginRestService } from '../services/login-rest.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    permissionsStrings: any = [];

     //GET PERMISSION
     permissions(){
        this.loginRest.permissions(this.loginRest.getUser().id).subscribe({
          next: (res: any)=> {
            this.permissionsStrings = res.nameFunctions;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

    permissionGetUsers(){
        let permissions = this.permissionsStrings;
        let bandera: boolean = false;
        if(permissions != undefined){
          for(let x = 0; x < permissions.length; x++){
              if(permissions[x] == 'Get users'){
                bandera = true;
                break;
              }
          }
        }
        return bandera;
      }
      false: boolean = false;
      true: boolean = true;

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
                    routerLink: ['/layout/pages/crud'],
                    //hidden:this.false
                },
                {
                    label: 'MENU.ROLES',
                    icon: 'pi pi-fw pi-cog',
                    routerLink: ['/layout/pages/roles'],
                    //hidden:this.true
                },
               
            ]
        },
    ];

    setLang: any

    constructor(
        public layoutService: LayoutService,
        public translate: TranslateService,
        private roleRest: RoleRestService,
        private loginRest: LoginRestService) 
                {
                    
                }

    ngOnInit() {
        this.permissions();    

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