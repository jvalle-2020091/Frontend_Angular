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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},

];




@Component({
  templateUrl: './roles.component.html',
  providers: [MessageService]

})
export class RolesComponent implements OnInit {

  addRoles: boolean = false;
  deleteRoleDialog: boolean = false;
  roleUpdateDialog: boolean = false;
  checked: boolean = false;


  cols: any[] = [];
  roles: any = [];
  users: any = [];

  roleDelete:any;
  roleUpdate: any;

  newRole = {
    name: '',
    description: '',
  }

  

   //Propiedades Step 2
   displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
   dataSource = new MatTableDataSource(ELEMENT_DATA);
   selection = new SelectionModel<PeriodicElement>(true, []);

   applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   /* Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
       const numSelected = this.selection.selected.length;
       const numRows = this.dataSource.data.length;
       return numSelected === numRows;
   }

   /* Selects all rows if they are not all selected; otherwise clear selection. */
   toggleAllRows() {
       if (this.isAllSelected()) {
       this.selection.clear();
       return;
       }

       this.selection.select(...this.dataSource.data);
   }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: PeriodicElement): string {
       if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
       }
       return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
   } 

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

addRole(){
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
          console.log(res);
          
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
          console.log(err);
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
