import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRestService } from './login-rest.service';
import { RoleRestService } from './role-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOption;
  locale: any;
  
  constructor(
    private http: HttpClient,
    private loginRest: LoginRestService,
    private roleRest: RoleRestService
    ) { 
    this.httpOption = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.loginRest.getToken() 
    });
    this.locale = {
      locale: this.roleRest.getLanguage()
    }
  }

  getUsers(){
    return this.http.get(environment.baseUri + "users/getUsers", {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }

  getUser(idUser: string){
    return this.http.get(environment.baseUri + "users/getUser/" + idUser, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  };

  deleteUser(idUser: string){
    return this.http.put(environment.baseUri + "users/deleteUser/" + idUser, this.locale, {headers: this.httpOption});
  };

  updateUser(idUser: string, params: {}){
    params = {...params, ...this.locale};
    return this.http.put(environment.baseUri + "users/updateUser/" + idUser, params, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())});
  }


  updatePasswordByAdmin(idUser: string){
    return this.http.put(environment.baseUri + "users/updatePasswordByAdmin/" + idUser , {headers: this.httpOption.set("Authorization", this.loginRest.getToken())}) 
  }

  registerByAdmin(params:{}){
    return this.http.post(environment.baseUri + "users/register", params, {headers: this.httpOption.set("Authorization", this.loginRest.getToken())}) 
  }


  requestFiles( files: Array<File>, name: string, username: string, firstName: string, lastName: string, mail: string, sendEmail: any, idsRol: any) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      if(files && name){
        formData.append('username', username );
      formData.append('firstName', firstName );
      formData.append('lastName', lastName );
      formData.append('mail', mail );
      formData.append('sendEmail', sendEmail );

      let uri = environment.baseUri + 'users/register';

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      for(let i = 0; i < idsRol.length; i++){
        formData.append('idsRol', idsRol[i]);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.loginRest.getToken());
      xhr.send(formData);
      }else{

      formData.append('username', username );
      formData.append('firstName', firstName );
      formData.append('lastName', lastName );
      formData.append('mail', mail );
      formData.append('sendEmail', sendEmail );

      for(let i = 0; i < idsRol.length; i++){
        formData.append('idsRol', idsRol[i]);
      }

      let uri = environment.baseUri + 'users/register';

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.loginRest.getToken());
      xhr.send(formData);
    }
    });

  }

}
