import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  httpOption;
  locale: any;

  constructor(
    private http: HttpClient
  ) { 
    this.httpOption = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.getToken() 
    });
    this.locale = {
      locale: this.getLanguage()
    }
  }

  login(params:{}){
    return this.http.post(environment.baseUri + 'users/login', params);
  }

  needChangePassword(params:{}){
    return this.http.put(environment.baseUri + 'users/updatePassword/', params, {headers: this.httpOption}  )
  }

  permissions(id: any){
    return this.http.get(environment.baseUri + 'users/permissions_id/' + id, {headers: this.httpOption});
  }

  getLanguage(){
    let language = localStorage.getItem('language');
    if(language === null){
      language = ""
    }
    return language
  };

  getPermmissions(){
    let globalPermissions = localStorage.getItem('permissions');
    let permission;
    let arrayFunc; 
    if(globalPermissions != undefined){
      permission = globalPermissions
      arrayFunc = permission.split(',');
    }else{
      permission = "";
    }
    return arrayFunc;
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
