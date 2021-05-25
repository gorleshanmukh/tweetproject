import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVICE_URI} from "../../environments/service.uri";

@Injectable({
  providedIn: 'root'
})
export class GetAllUserService {

  constructor(private http : HttpClient) { }

  getUser() {
    return this.http.get(SERVICE_URI.getUser);
  }
}
