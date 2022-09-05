import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html'
})
export class SettingsUserComponent implements OnInit {

  userInformation: any
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  nextPage() {
  }
  prevPage() {
    this.router.navigate(['/layout/pages/crud/addUser']);
  }

}
