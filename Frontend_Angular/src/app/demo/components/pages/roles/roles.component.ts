import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoleRestService } from 'src/app/services/role-rest.service'
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder} from '@angular/forms';
import {TranslateService} from '../../../../../../node_modules/@ngx-translate/core';
import { LoginRestService } from 'src/app/services/login-rest.service';
import { permissions } from './permissions';

interface City {
  name: string,
  code: string
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  templateUrl: './roles.component.html',
  providers: [MessageService]

})
export class RolesComponent implements OnInit {

  addRoles: boolean = false;
  deleteRoleDialog: boolean = false;
  roleUpdateDialog: boolean = false;
  userRolDialog: boolean = false;
  rolPermissionDialog: boolean = false;
  selectedCities1: any;

  listPermission: any;

  //Lenguaje
  language: any
  
  cols: any[] = [];
  roles: any = [];
  users: any = [];
  idsArray: any = [];
  rol_user:any = [];
  id: any
  
  roleDelete:any;
  roleUpdate: any;
  nameRole: any;

  newRole = {
    name: '',
    description: '',
    ids: [],
    idsPermissions: []
  }
  idsPrueba: any = [];

  //Form update rol
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
  });

  //Form add rol
  secondFormGroup = this._formBuilder.group({
    nameNewRol: ['', Validators.required],
    descriptionNewRol: ['', Validators.required]
  });

  submitted: boolean = false;
  //Lenguaje
  
  permissionsIdFunctions: any = [];


  constructor(
    private roleRest: RoleRestService,
    private userRest: UserRestService, 
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public translate: TranslateService,
    private loginRest: LoginRestService


  ) {   
    this.listPermission = permissions;    
   }

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
    this.language = this.roleRest.getLanguage();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang(this.language);
    this.permissions();
  }

  permissions(){
    this.loginRest.permissions(this.loginRest.getUser().id).subscribe({
      next: (res: any)=> {
        this.permissionsIdFunctions = res.idFunctions;        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getRoles(){
    this.roleRest.getRoles().subscribe({
      next: (res: any) => {
          this.roles = res.roles;
      },
      error: (err) => {
          console.log(err);
      }
    });
  }
  
  

  getUsers(){
    this.userRest.getUsers().subscribe({
        next: (res: any) => {
            this.users = res.users;
        },
        error: (err) => {
            console.log(err);
        }
    });
};


// Obnter los usuarios asociados a un Rol
getUsersByAdmin(idRol: any, name: any){
  this.userRolDialog = true;
  this.roleRest.getUsersByAdmin(idRol).subscribe({
    next: (res: any) => {
      this.nameRole = name;
      this.id= idRol
      this.rol_user = res.newArray;     
      this.idsArray = this.rol_user.filter((user: any) => user.include);
    },
    error: (err) => {
      console.log(err);
    }
  });
  
}

objectpostUsersByRol={
  idsArray: []
}


//Acatualizar los usuarios asociados a un Rol
postUsersByRol(){
  let idsArray = this.idsArray
  this.objectpostUsersByRol.idsArray = idsArray;
  this.roleRest.postUsersByRol(this.id, this.objectpostUsersByRol).subscribe({
    next:(res:any)=>{
      this.toastr.success(res.message);
      this.userRolDialog = false;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

//Aqui se almacenan las funciones como objetos completos.
functionsUsers: any = [];
functionsRoles: any = [];

idsFunctionUsers: any = [];
idsFunctionRoles: any = [];
//translate
translateFunctionUsers: any =[];
translateFunctionRoles: any =[];
dialogCreateRole(){
    this.addRoles = true;
    this.idsArray = [];
    this.idsFunctionUsers = [];
    this.idsFunctionRoles = [];
    this.roleRest.getFunctionsCreateRol().subscribe({
      next: (res: any) => {
        //Traducción de las funciones de user
        this.functionsUsers = res.functionsUsers;
        for(let item of this.functionsUsers){
          this.translateFunctionUsers.push({
            id: item.id,
            name: "FUNCTION." + [item.id]
          })
        }
        //Traducción de las funciones de roles
        this.functionsRoles = res.functionsRoles;
        for(let child of this.functionsRoles){
          this.translateFunctionRoles.push({
            id: child.id,
            name: "FUNCTION." + [child.id]
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
}

newIdsUser: any = [];
newIdsRoles: any = [];

addRole(){
  if (this.newRole.name?.trim() && this.newRole.description?.trim()) {
    this.newRole.ids = this.idsArray.map((user: any) => user.id);

    // PREUBA
    for(let i = 0; i < this.idsFunctionUsers.length; i++){
      this.newIdsUser.push(this.idsFunctionUsers[i].id);
    }

    for(let j = 0; j < this.idsFunctionRoles.length; j++){
      this.newIdsRoles.push(this.idsFunctionRoles[j].id);
    }

    this.newRole.idsPermissions = this.newIdsUser.concat(this.newIdsRoles);
    // FIN PRUEBA

    this.roleRest.createRole(this.newRole).subscribe({
        next:(res:any)=>{
            this.getRoles();          
            this.addRoles = false;
            this.toastr.success(res.message);
            this.idsArray = [];
            this.newIdsUser = [];
            this.newIdsRoles = [];
            this.idsFunctionUsers = [];
            this.idsFunctionRoles = [];
        },
        error:(err)=>{
            this.toastr.error(err.error.message || err.error);
        }
    });
  }
  this.submitted = true;
}

// DELETE
getRoleDeleted(id:string){
  this.roleRest.getRole(id).subscribe({
      next: (res: any) => {
          this.deleteRoleDialog = true;
          this.roleDelete = res.rol;
      },
      error: (err) => {
          console.log(err);
      }
  });
};

deleteRole(){
  this.roleRest.deleteRole(this.roleDelete.id).subscribe({
      next:(res:any)=>{
          this.toastr.success(res.message);
          this.deleteRoleDialog = false;
          this.getRoles();
      },
      error:(err)=>{
        this.toastr.error(err.error.message || err.error);
      }
  })
};

// UPDATE
getRoleUpdate(id:string){
  this.roleRest.getRole(id).subscribe({
      next: (res: any) => {
          this.roleUpdateDialog = true;
          this.roleUpdate = res.rol;          
      },
      error: (err) => {
          console.log(err);
      }
  });
};

updateRole(){
  if (this.roleUpdate.name?.trim() && this.roleUpdate.description?.trim()) {
  this.roleRest.updateRole(this.roleUpdate.id, this.roleUpdate).subscribe({
      next:(res:any)=>{
          
              this.getRoles();
              this.roleUpdateDialog = false;
              this.toastr.success(res.message);
          
      },
      error:(err)=>{
          console.log(err);
      }
  })
}
this.submitted = true;
}

deleteRolDialog(){
  this.deleteRoleDialog = true;
}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

onGlobalFilterUsers(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

onGlobalFilterFunctions(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


//Functions
arrayUsers: any = [];
arrayRoles: any = [];
idsUsers: any = [];
idsRoles: any = [];
idRolSelected: any;

idsRoleSelected: any = [];
idsUserSelected: any = [];
//translate
getTranslateFunctionUser: any =[];
getTranslateFunctionRole: any =[]

getPermmissions(idRole: string){
  this.rolPermissionDialog = true
  this.idRolSelected = idRole;

  this.getTranslateFunctionUser =[];
  this.getTranslateFunctionRole =[];

  this.roleRest.getFunctions(idRole).subscribe({
    next:(res:any)=>{
      //Traducción de fucnicones de usuario
      this.arrayUsers = res.arrayUsers;
      for(let item of this.arrayUsers){
        this.getTranslateFunctionUser.push({
          id: item.id,
          name: "FUNCTION." + [item.id],
          include: item.include
        })
      }
      //Traducción de fucnicones de role
      this.arrayRoles = res.arrayRoles;
      for(let child of this.arrayRoles){
        this.getTranslateFunctionRole.push({
          id: child.id,
          name: "FUNCTION." + [child.id],
          include: child.include
        })
      }
      this.idsUsers = this.getTranslateFunctionUser.filter((user: any) => user.include);
      this.idsRoles = this.getTranslateFunctionRole.filter((role: any) => role.include);
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

object = {
  idsPermissionsArray: []
}

assignPermissions(){
  this.idsUserSelected = [];
  this.idsRoleSelected = [];
  
  //Se recorre el arreglo de las funciones seleccionadas
  for(let i = 0; i < this.idsUsers.length; i++){
    this.idsUserSelected.push(this.idsUsers[i].id);
  }
  for(let j = 0; j < this.idsRoles.length; j++){
    this.idsRoleSelected.push(this.idsRoles[j].id);
  }
  
  let idsPermissionsArray = this.idsUserSelected.concat(this.idsRoleSelected);

  this.object.idsPermissionsArray = idsPermissionsArray;
  let user = this.loginRest.getUser();
  user.ids = this.object.idsPermissionsArray;
  localStorage.setItem("user", JSON.stringify(user));
  this.roleRest.assignPermissions(this.idRolSelected, this.object).subscribe({
    next: (res: any) =>{
      this.rolPermissionDialog = false;
      this.toastr.success(res.message);
    },
    error: (err) => {
      console.log(err);
    }
  })
  location.reload();
}

public getPermission(id_Function: number): boolean {
  return  this.permissionsIdFunctions.includes(id_Function);
}


}
