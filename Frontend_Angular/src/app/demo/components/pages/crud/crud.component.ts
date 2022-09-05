import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

   

  
    // Propiedades de plantilla
    userUpdateDialog: boolean = false;

    lockedUser: boolean = false;

    addUser: boolean = false;

    changePassword: boolean = false;    

    deleteUserDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    items: MenuItem[] = [];


    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    // Propiedades de proyecto BDG
    users: any = [];
    userDelete:any;
    userUpdate: any;
    userLocked: any;
    passworUpdate: any;

    constructor(
        private userRest: UserRestService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getUsers();
        this.items = [
            {label: 'Step 1',
            routerLink: 'addUser'},
            {label: 'Step 2',
             routerLink: 'settings'}
        ];
    }

    dialogCreateUser(){
        this.addUser = true;
    }

    // GET
    getUsers(){
        this.userRest.getUsers().subscribe({
            next: (res: any) => {
                this.users = res.users;
                console.log(this.users);
            },
            error: (err) => {
                console.log(err);
            }
        });
    };

    // DELETE
    getUserDelete(id:string){
        this.userRest.getUser(id).subscribe({
            next: (res: any) => {
                this.deleteUserDialog = true;
                this.userDelete = res.user;
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     getUserLocked(id:string){
        this.userRest.getUser(id).subscribe({
            next: (res: any) => {
                this.lockedUser = true;
                this.userLocked = res.user;
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     deleteUser(){
        this.userRest.deleteUser(this.userDelete.id).subscribe({
            next:(res:any)=>{
                this.toastr.success(res.message);
                this.deleteUserDialog = false;
                this.getUsers();
            },
            error:(err)=>{
                console.log(err);
            }
        })
     };

     // UPDATE
    getUserUpdate(id:string){
        this.userRest.getUser(id).subscribe({
            next: (res: any) => {
                this.userUpdateDialog = true;
                this.userUpdate = res.user;
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     getPasswordUpdate(id:string){
        this.userRest.getUser(id).subscribe({
            next: (res: any) => {
                this.changePassword = true;
                this.passworUpdate = res.user;
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     updatePasswordByAdmin(){
        this.userRest.updatePasswordByAdmin(this.passworUpdate.id).subscribe({
            next: (res: any) => {
                this.changePassword = false;
                this.toastr.success(res.message);
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     updateUser(){
        if (this.userUpdate.firstName?.trim() && this.userUpdate.lastName?.trim()) {
        this.userRest.updateUser(this.userUpdate.id, this.userUpdate).subscribe({
            next:(res:any)=>{
                
                    this.getUsers();
                    this.userUpdateDialog = false;
                    this.toastr.success(res.message);
                
            },
            error:(err)=>{
                console.log(err);
            }
        })
        }
        this.submitted = true;
     }
     

     updateUserLock(){
        this.userRest.updateUser(this.userLocked.id, this.userLocked).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.lockedUser = false;
                this.toastr.success(res.message);
            },
            error:(err)=>{
                console.log(err);
            }
        })
     }

     lockUser(){
        this.userRest.lockedUser(this.userUpdate.id, this.userUpdate).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.lockedUser = false;
                this.toastr.success(res.message);
            },
            error:(err)=>{
                console.log(err);
            }
        })
     }

     unLockUser(){
        this.userRest.unlockedUser(this.userUpdate.id, this.userUpdate).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.lockedUser = false;
                this.toastr.success(res.message);
            },
            error:(err)=>{
                console.log(err);
            }
        })
     }


    openNew() {
        this.product = {};
        this.submitted = false;
        
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.userUpdateDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
    }

    hideDialog() {
        this.userUpdateDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
