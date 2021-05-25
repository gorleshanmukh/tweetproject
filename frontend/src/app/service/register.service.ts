import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SERVICE_URI } from "../../environments/service.uri";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  registerUser(userInfo:any) {
    return this.http.post(SERVICE_URI.registerURI, userInfo);
  }
}
