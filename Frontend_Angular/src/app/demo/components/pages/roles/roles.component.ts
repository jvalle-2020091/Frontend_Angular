import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoleRestService } from 'src/app/services/role-rest.service'
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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
  
  cols: any[] = [];
  roles: any = [];
  users: any = [];
  idsArray: any = [];
  rol_user: any = [];

  roleDelete:any;
  roleUpdate: any;

  newRole = {
    name: '',
    description: '',
    ids: []
  }

  idsPrueba: any = [];

  constructor(
    private roleRest: RoleRestService,
    private userRest: UserRestService, 
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
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
getUsersByAdmin(idRol: any){
  this.userRolDialog = true;
  this.roleRest.getUsersByAdmin(idRol).subscribe({
    next: (res: any) => {
      // let RolId = res.searchRol;
      // let UserId = res.searchRol;
      console.log(res.searchRol);
      
    },
    error: (err) => {
      console.log(err);
    }
  });
}

addRole(){
  this.newRole.ids = this.idsArray.map((user: any) => user.id);
  this.roleRest.createRole(this.newRole).subscribe({
      next:(res:any)=>{
          this.getRoles();          
          this.addRoles = false;
          this.toastr.success(res.message);
      },
      error:(err)=>{
          this.toastr.error(err.error.message || err.error);
      }
  });
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



  dialogCreateRole(){
    this.addRoles = true;
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



}
