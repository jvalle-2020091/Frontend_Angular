import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RoleRestService } from '../services/role-rest.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginRestService } from '../services/login-rest.service';
import { permissions } from '../../../src/app/demo/components/pages/roles/permissions';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  permissionsStrings: any = [];
  permissionsIdFunctions: any = [];

  //GET PERMISSION
  permissions() {
    this.loginRest.permissions(this.loginRest.getUser().id).subscribe({
      next: (res: any) => {
        this.permissionsIdFunctions = res.idFunctions;
        console.log(this.permissionsIdFunctions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setLang: any

  constructor(
    public layoutService: LayoutService,
    public translate: TranslateService,
    private roleRest: RoleRestService,
    private loginRest: LoginRestService) {

  }

  ngOnInit() {
    this.permissions();

    this.setLang = this.roleRest.getLanguage();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang(this.setLang)

    for (const item of this.model) {
      this.translate.get(item.label).subscribe(res => {
        item.label = res
      })
      item.items.map((child: any) => {

        this.translate.get(child.label).subscribe(res => {
          child.label = res
        })

      })
    }
  }

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
          label: 'MENU.USERS',
          icon: 'pi pi-fw pi-users',
          routerLink: ['/layout/pages/crud'],
          visible: this.getPermission(permissions.Get_users),
        },
        {
          label: 'MENU.ROLES',
          icon: 'pi pi-fw pi-cog',
          routerLink: ['/layout/pages/roles'],
          //hidden:this.true
        },
      ],
    },
  ];

  // Metodo para validar permisos de un usuario
  public getPermission(id_Function: number): boolean {
    console.log(this.permissionsIdFunctions.includes(id_Function))
    return this.permissionsIdFunctions.includes(id_Function);
  }
}