import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserRestService } from 'src/app/services/user-rest.service';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { Validators, FormBuilder} from '@angular/forms';
import { RoleRestService } from 'src/app/services/role-rest.service';
import {FormControl} from '@angular/forms';




@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
})

export class CrudComponent implements OnInit {

    stateCtrl = new FormControl('');
    stateCtrl2 = new FormControl(' ');

 

    // Propiedades de plantilla
    userUpdateDialog: boolean = false;

    lockedUser: boolean = false;

    addUser: boolean = false;

    changePassword: boolean = false;    

    deleteUserDialog: boolean = false;

    deleteProductsDialog: boolean = false;



    items: MenuItem[] = [];
    checkBox: any;


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
    roles: any = [];

    idsRolArray: any = [];
    
    //Propiedades Step 1

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        fiveCtrl: [],
        checkCtrl1: [],
        checkCtrl2: []
      });
      secondFormGroup = this._formBuilder.group({
        a: ['', Validators.required],
      });
      thirdFormGroup = this._formBuilder.group({
        firstCtrll: ['', Validators.required],
      });

      validateCheckBox: boolean = true;

    newUser ={
        username:'',
        mail:'',
        firstName:'',
        lastName:'',
        sendEmail: false,
        image: "",
        idsRol: []
    }

    disabled: boolean = false;
          
    constructor(
        private userRest: UserRestService,
        private toastr: ToastrService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private roleRest: RoleRestService

    ) { }

    

    ngOnInit() {
        this.getUsers();
        this.getRoles();
        this.stateCtrl.enable();
        this.items = [
            {label: 'Step 1',
            routerLink: 'addUser'},
            {label: 'Step 2',
             routerLink: 'settings'}
        ];
    }

    dialogCreateUser(){        
        this.addUser = true;
        this.idsRolArray = []; 
    }

    equalToEmail(){
        if(this.newUser.mail){
            this.newUser.username = this.newUser.mail;    
            this.stateCtrl.disable(); 
        }else{
            this.stateCtrl.enable(); 
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
    


    registerByAdmin(){
        this.userRest.registerByAdmin(this.newUser).subscribe({
            next:(res:any)=>{
                this.getUsers();
                this.uploadImage();                
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
        this.newUser.idsRol = this.idsRolArray.map((role: any) => role.id);
        this.userRest.requestFiles( this.filesToUpload, 'image', 
                                    this.newUser.username, 
                                    this.newUser.firstName, 
                                    this.newUser.lastName, 
                                    this.newUser.mail,
                                    this.newUser.sendEmail,
                                    this.newUser.idsRol)
          .then((res: any) => {            
            let resClear = JSON.parse(res);
            if (!resClear.error) {
                this.getUsers();
                this.addUser = false;
                this.toastr.success(resClear.message);
            } else {
                this.toastr.error(res);
            }
          }).catch((err) => {
                let error = JSON.parse(err)
                this.toastr.error(error.message);
                
          })
    }

    
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }


    hideDialog() {
        this.userUpdateDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onGlobalFilterRole(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }



}
