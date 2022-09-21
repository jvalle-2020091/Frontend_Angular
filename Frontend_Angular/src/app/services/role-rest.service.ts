import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoleRestService {
  httpOption;
  locale: any;

  constructor(
    private http: HttpClient,
    private loginRest: LoginRestService
  ) { 
    this.httpOption = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.loginRest.getToken() 
    });
    this.locale = {
      locale: this.getLanguage()
    }
  }

  getRoles(){
    return this.http.get(environment.baseUri + "rols/getRoles", {headers: this.httpOption});
  }

  getRole(idRole: string){
    return this.http.get(environment.baseUri + "rols/getRol/"+ idRole, {headers: this.httpOption});
  }

  deleteRole(idRole: string){
    return this.http.put(environment.baseUri + "rols/deleteRol/" + idRole, this.locale, {headers: this.httpOption});
  }

  updateRole(idRole: string, params: {}){
    params = {...params, ...this.locale};
    return this.http.put(environment.baseUri + "rols/updateRol/" + idRole, params,  {headers: this.httpOption});
  } 
  
  createRole(params: {}){
    params = {...params, ...this.locale};
    return this.http.post(environment.baseUri + "rols/createRol", params, {headers: this.httpOption});
  } 

  getUsersByAdmin(idRol: any){
    return this.http.get(environment.baseUri + "rols/getUsersByAdmin/" + idRol, {headers: this.httpOption});
  }

  postUsersByRol(idRol:any, params:any){
    params = {...params, ...this.locale};
    return this.http.post(environment.baseUri + "rols/postUsersByRol/" + idRol, params, {headers: this.httpOption});
  }
  
  assignPermissions(idRol:any, params: any){
    params = {...params, ...this.locale};
    return this.http.post(environment.baseUri + "functions/assignPermissions/" + idRol, params, {headers: this.httpOption});
  }

  getLanguage(){
    let language = localStorage.getItem('language');
    if(language === null){
      language = ""
    }
    return language
  };

  getFunctions(idRol:any){
    return this.http.get(environment.baseUri + "functions/getFunctions/" + idRol, {headers: this.httpOption});
  }


  getFunctionsCreateRol(){
    return this.http.get(environment.baseUri + "rols/getFunctions", {headers: this.httpOption});
  }

}
