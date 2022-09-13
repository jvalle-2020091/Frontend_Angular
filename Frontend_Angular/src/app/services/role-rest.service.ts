import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoleRestService {

  httpOption = new HttpHeaders().set("Content-Type", "application/json");


  constructor(
    private http: HttpClient,
    private loginRest: LoginRestService
  ) { }

  getRoles(){
    return this.http.get(environment.baseUri + "rols/getRoles", {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  getRole(idRole: string){
    return this.http.get(environment.baseUri + "rols/getRol/"+ idRole, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  deleteRole(idRole: string){
    return this.http.delete(environment.baseUri + "rols/deleteRol/" + idRole, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  updateRole(idRole: string, params: {}){
    return this.http.put(environment.baseUri + "rols/updateRol/" + idRole, params,  {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  } 
  
  createRole(params: {}){
    return this.http.post(environment.baseUri + "rols/createRol", params, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  } 

  getUsersByAdmin(idRol: any){
    return this.http.get(environment.baseUri + "rols/getUsersByAdmin/" + idRol, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  postUsersByRol(idRol:any, idsArray:any){
    
    return this.http.post(environment.baseUri + "rols/postUsersByRol/" + idRol, idsArray, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  getLanguage(){
    let language = localStorage.getItem('language');
    return language
  };

}
