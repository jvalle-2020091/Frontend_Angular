import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    // Propiedades de plantilla
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    // Propiedades de proyecto BDG
    users: any = [];
    userDelete:any;
    userUpdate: any;
    booleanValues = [true, false];

    constructor(
        private userRest: UserRestService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.getUsers();
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
                this.deleteProductDialog = true;
                this.userDelete = res.user;
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
                this.deleteProductDialog = false;
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
                this.productDialog = true;
                this.userUpdate = res.user;
            },
            error: (err) => {
                console.log(err);
            }
        });
     };

     updateUser(){
        this.userRest.updateUser(this.userUpdate.id, this.userUpdate).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.productDialog = false;
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
        this.productDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
