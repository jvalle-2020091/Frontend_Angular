import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

  submitted: boolean = false;
  user: any
  
  constructor(
     private router: Router
  ) { }

  ngOnInit(): void {

  }

  nextPage() {
    this.router.navigate(['/layout/pages/crud/settings']);
  }


}
