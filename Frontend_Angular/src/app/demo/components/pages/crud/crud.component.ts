import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, NgForm, Validators, FormBuilder} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

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
    filesToUpload: any;

    
    
    //Propiedades Step 1

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        checkCtrl1: [],
        checkCtrl2: []
      });
      secondFormGroup = this._formBuilder.group({
        a: ['', Validators.required],
      });
      thirdFormGroup = this._formBuilder.group({
        firstCtrll: ['', Validators.required],
      });

    newUser ={
        username:'',
        mail:'',
        firstName:'',
        lastName:'',
        sendEmail: false,
        image: ""
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
        private userRest: UserRestService,
        private toastr: ToastrService,
        private router: Router,
        private _formBuilder: FormBuilder
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

    equalToEmail(){
        if(this.newUser.mail){

        }
    }

 
    // GET
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

    

    registerByAdmin(){
        this.userRest.registerByAdmin(this.newUser).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.uploadImage();
                console.log(this.uploadImage());
                
                this.addUser = false;
                this.toastr.success(res.message);
            },
            error:(err)=>{
                this.toastr.error(err.error.message || err.error);
            }
        });
    }

    filesChange(inputFile: any) {
        this.filesToUpload = <Array<File>>inputFile.target.files;
        console.log(this.filesToUpload);
      }


      uploadImage() {
        this.userRest
          .requestFiles( this.filesToUpload, 'image', 
          this.newUser.username, 
          this.newUser.firstName, 
          this.newUser.lastName, 
          this.newUser.mail,
          this.newUser.sendEmail )
          .then((res: any) => {

            let resClear = JSON.parse(res);
            if (!resClear.error) {
                this.getUsers();
                this.addUser = false;
                this.toastr.success(resClear.message);
            } else {
                this.toastr.error(res);
            }
          });
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
