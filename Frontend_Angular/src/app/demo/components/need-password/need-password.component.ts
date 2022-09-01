import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRestService } from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-need-password',
  templateUrl: './need-password.component.html',
  styleUrls: ['./need-password.component.scss']
})
export class NeedPasswordComponent implements OnInit {

    dataUser = {
    newPassword: '',
    confirmPassword: '', 
    idUser: 0
  };

  idUser: any;

  constructor(
    public layoutService: LayoutService,
    private loginRest: LoginRestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idUser = idRuta.get('idUser');
  });
}

  needPasword(){
    this.dataUser.idUser = this.idUser;
    this.loginRest.needChangePassword(this.dataUser).subscribe({
      next: (res: any) => {
        
        this.toastr.success(res.message);
        this.router.navigateByUrl('')
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message || err.error);
      }
    })
  }

}
