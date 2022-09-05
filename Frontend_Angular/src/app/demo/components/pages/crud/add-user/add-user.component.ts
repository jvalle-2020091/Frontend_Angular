import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

  submitted: boolean = false;
  user: any

  registerData = {
   username: '',
  }

  saveInformation: any;
 
  constructor(
     private router: Router,
     private userRest: UserRestService 
  ) { }

  ngOnInit(  ): void {
    this.saveInformation = this.registerData
  }

  nextPage() {
    this.registerData = this.saveInformation
    console.log(this.registerData);
    
    this.router.navigate(['/layout/pages/crud/settings']);
  }


}
