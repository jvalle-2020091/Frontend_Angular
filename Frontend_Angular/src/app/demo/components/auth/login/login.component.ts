import { Component, OnInit  } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRestService } from 'src/app/services/login-rest.service'
import { Router } from '@angular/router';


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
        public loginRest: LoginRestService,
       // private messageService: MessageService, 
        private router: Router
        ) {}

    ngOnInit(): void {
    
    }

    login(){
        this.loginRest.login(this.dataUser).subscribe({
            next: (res: any) =>{      
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.newUserSearch || res.usernameExist));
                this.router.navigateByUrl('layout');
               // this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
            },
            error: (err) => {
                console.log(err);
                
               // this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
            }
        })
    }
}