import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient
  ) { }

  login(params:{}){
    return this.http.post(environment.baseUri + 'users/login', params, {headers: this.httpOption.set("Authorization",this.getToken())});
  }

  needChangePassword(params:{}){
    return this.http.put(environment.baseUri + 'users/updatePassword/', params, {headers: this.httpOption.set("Authorization",this.getToken())}  )
  }

  permissions(id: any){
    return this.http.get(environment.baseUri + 'users/permissions/' + id, {headers: this.httpOption.set("Authorization",this.getToken())});
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
