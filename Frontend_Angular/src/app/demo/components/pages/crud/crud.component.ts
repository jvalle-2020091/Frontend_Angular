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
import {TranslateService} from '../../../../../../node_modules/@ngx-translate/core';
import { LoginRestService } from 'src/app/services/login-rest.service';




@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService],
})
export class CrudComponent implements OnInit {
  stateCtrl = new FormControl('');
  stateCtrl2 = new FormControl(' ');

  // Propiedades de plantilla
  userUpdateDialog: boolean = false;
  lockUserDialog: boolean = false;

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
  userDelete: any;
  userUpdate: any;
  userLocked: any;
  passworUpdate: any;
  filesToUpload: any;
  roles: any = [];

  nameLock: any;
  idsRolArray: any = [];

  //Propiedades Step 1

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
    fourthCtrl: ['', Validators.required],
    fiveCtrl: [],
    checkCtrl1: [],
    checkCtrl2: [],
  });
  secondFormGroup = this._formBuilder.group({
    a: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    firstCtrll: ['', Validators.required],
  });

  validateCheckBox: boolean = true;

  newUser = {
    username: '',
    mail: '',
    firstName: '',
    lastName: '',
    sendEmail: false,
    image: '',
    idsRol: [],
  };

  language: any

  disabled: boolean = false;
  mensaje: any;

  permissionsStrings: any = [];

  constructor(
    private userRest: UserRestService,
    private toastr: ToastrService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private roleRest: RoleRestService,
    public translate: TranslateService,
    public rolRest: RoleRestService,
    private loginRest: LoginRestService
  ) 
  {
    
  }
  
  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.stateCtrl.enable();
    this.items = [
      { label: 'Step 1', routerLink: 'addUser' },
      { label: 'Step 2', routerLink: 'settings' },
    ];
    this.language = this.rolRest.getLanguage();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang(this.language);
    this.permissions();
  }

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

  dialogCreateUser() {
    this.addUser = true;
    this.idsRolArray = [];
  }

  equalToEmail() {
    if (this.newUser.mail) {
      this.newUser.username = this.newUser.mail;
      this.stateCtrl.disable();
    } else {
      this.stateCtrl.enable();
    }
  }

  // GET
  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // DELETE
  getUserDelete(id: string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.deleteUserDialog = true;
        this.userDelete = res.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserLocked(id: string, nameLock:string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.lockUserDialog = true;
        this.userLocked = res.user;
        this.nameLock = res.user.firstName + ' ' + res.user.lastName ;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser() {
    this.userRest.deleteUser(this.userDelete.id).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.deleteUserDialog = false;
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // UPDATE
  getUserUpdate(id: string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.userUpdateDialog = true;
        this.userUpdate = res.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPasswordUpdate(id: string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.changePassword = true;
        this.passworUpdate = res.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePasswordByAdmin() {
    this.userRest.updatePasswordByAdmin(this.passworUpdate.id).subscribe({
      next: (res: any) => {
        this.changePassword = false;
        this.toastr.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser() {
    if (this.userUpdate.firstName?.trim() && this.userUpdate.lastName?.trim()) {
      this.userRest.updateUser(this.userUpdate.id, this.userUpdate).subscribe({
        next: (res: any) => {
          this.getUsers();
          this.userUpdateDialog = false;
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.submitted = true;
  }

  updateUserLock() {
    if (this.userLocked.isLocked == true) {
      this.userLocked.isLocked = false;
    } else if (this.userLocked.isLocked == false) {
      this.userLocked.isLocked = true;
    }
    this.userRest.updateUser(this.userLocked.id, this.userLocked).subscribe({
      next: (res: any) => {
        this.getUsers();
        this.lockUserDialog = false;
        this.toastr.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoles() {
    this.roleRest.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res.roles;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  registerByAdmin() {
    this.userRest.registerByAdmin(this.newUser).subscribe({
      next: (res: any) => {
        this.getUsers();
        this.uploadImage();
        this.addUser = false;
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.error.message || err.error);
      },
    });
  }

  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage() {
    this.newUser.idsRol = this.idsRolArray.map((role: any) => role.id);
    this.userRest
      .requestFiles(
        this.filesToUpload,
        'image',
        this.newUser.username,
        this.newUser.firstName,
        this.newUser.lastName,
        this.newUser.mail,
        this.newUser.sendEmail,
        this.newUser.idsRol
      )
      .then((res: any) => {
        let resClear = JSON.parse(res);
        if (!resClear.error) {
          this.getUsers();
          this.addUser = false;
          this.toastr.success(resClear.message);
        } else {
          this.toastr.error(res);
        }
      })
      .catch((err) => {
        let error = JSON.parse(err);
        this.toastr.error(error.message);
      });
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


  permissionCreateUser(){
    let permissions = this.permissionsStrings;
    let bandera: boolean = false;
    if(permissions != undefined){
      for(let x = 0; x < permissions.length; x++){
          if(permissions[x] == 'User creation'){
            bandera = true;
            break;
          
          }
      }
    }
    return bandera;
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


  permissionPasswordChange(){
    let permissions = this.permissionsStrings;
    let bandera: boolean = false;
    if(permissions != undefined){
      for(let x = 0; x < permissions.length; x++){
          if(permissions[x] == 'Change of password'){
            bandera = true;
            break;
          
          }
      }
    }
    return bandera;
  }

  permissionIsLocked(){
    let permissions = this.permissionsStrings;
    let bandera: boolean = false;
    if(permissions != undefined){
      for(let x = 0; x < permissions.length; x++){
          if(permissions[x] == 'User blocking'){
            bandera = true;
            break;
          
          }
      }
    }
    return bandera;
  }

  permissionEditUser(){
    let permissions = this.permissionsStrings;
    let bandera: boolean = false;
    if(permissions != undefined){
      for(let x = 0; x < permissions.length; x++){
          if(permissions[x] == 'User Edition'){
            bandera = true;
            break;
          
          }
      }
    }
    return bandera;
  }

  permissiondeleteUser(){
    let permissions = this.permissionsStrings;
    let bandera: boolean = false;
    if(permissions != undefined){
      for(let x = 0; x < permissions.length; x++){
          if(permissions[x] == 'Deletion of users'){
            bandera = true;
            break;
          
          }
      }
    }
    return bandera;
  }

  


}
