import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginRestService {
  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.getToken()
  });

  constructor(
    private http: HttpClient
  ) { }

  login(params:{}){
    let body = JSON.stringify({});
    return this.http.post(environment.baseUri + 'users/login', params, {
      headers: this.httpOptions
    })
  }

  //Método para obtener el usuario del local storage
  getUser(){
    let globalUser = localStorage.getItem("user");
    let user;
    if(globalUser != undefined){
      user = JSON.parse(globalUser);
    }else{
      user = "";
    }
    return user;
  }

  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = '';
    }
    return token;
  }

}
