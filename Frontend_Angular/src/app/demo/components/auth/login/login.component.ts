import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRestService } from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  valCheck: string[] = ['remember'];

  dataUser = {
    username: '',
    password: '',
  };

  idUser: any;
  language = 'es'

  constructor(
    public layoutService: LayoutService,
    private loginRest: LoginRestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idUser = idRuta.get('idUser');
  });

  }

  login() {
    this.loginRest.login(this.dataUser).subscribe({
      next: (res: any) => {
        let userPass = res.usernameExist;
        if (userPass.needChangePassword == false) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.newUserSearch || res.usernameExist));
          localStorage.setItem('language', this.language)
          this.permissions();
          this.toastr.success(res.message);
          this.router.navigateByUrl('layout');
        } else if (userPass.needChangePassword == true) {
          this.router.navigateByUrl('needChangePassword/' + userPass.id);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message || err.error);
      },
    });
  }

  permissions(){
    console.log(this.loginRest.getUser().id);
    
    this.loginRest.permissions(this.loginRest.getUser().id).subscribe({
      next: (res: any)=> {
        localStorage.setItem("permissions", res.nameFunctions);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
