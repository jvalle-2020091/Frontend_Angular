import { Component, OnInit  } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRestService } from 'src/app/services/login-rest.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];

    dataUser = {
        username: "",
        password: ""
    }

    constructor(
        public layoutService: LayoutService,
        private loginRest: LoginRestService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
    
    }

    login(){
        this.loginRest.login(this.dataUser).subscribe({
          next: (res: any) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.newUserSearch || res.usernameExist));
            this.toastr.success(res.message);
            this.router.navigateByUrl("layout");
          },
          error: (err) => {
            this.toastr.error(err.error.message || err.error);
          }
        });
    }
}