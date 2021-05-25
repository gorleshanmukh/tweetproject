import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SERVICE_URI } from "../../environments/service.uri";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  generateToken(cred:any) {
    return this.http.post(SERVICE_URI.loginURI, cred);
  }

  forgotPassword(cred:any) {
    return this.http.post(SERVICE_URI.forgotPassword, cred);
  }

  getAllUsers() {
    return this.http.get(SERVICE_URI.getAllUsers);
  }

  loginUser(response: any) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("loginId", response.loginId);
    localStorage.setItem("userName", response.userName);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null) {
      return false;
    }
    return true;
  }

  getToken() {
    if (this.isLoggedIn()) {
      return localStorage.getItem("token");
    }
    return null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loginId");
    localStorage.removeItem("userName");
    return true;
  }
}
