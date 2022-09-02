import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  personalInformation: any;

    submitted: boolean = false

  constructor(
     private router: Router
  ) { }

  ngOnInit(): void {

  }

  nextPage() {
    if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      
        this.router.navigate(['steps/seat']);

        return;
    }

    this.submitted = true;
}

}
