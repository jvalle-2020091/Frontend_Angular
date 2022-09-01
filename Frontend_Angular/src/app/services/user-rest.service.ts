import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient,
    private loginRest: LoginRestService
  ) { }

  getUsers(){
    return this.http.get(environment.baseUri + "users/getUsers", {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  deleteUser(){
    
  }
}
