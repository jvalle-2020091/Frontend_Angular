import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRestService } from '../services/login-rest.service';


@Injectable({
  providedIn: 'root'
})
export class NeedPasswordGuard implements CanActivate {

  constructor(
    public loginRest: LoginRestService,
    public router: Router
  ){
  }

  canActivate() {
    if(this.loginRest.getUser().needChangePassword == true){
      return true;
    }{
      this.router.navigateByUrl("");
      return false;
    }
  }
}