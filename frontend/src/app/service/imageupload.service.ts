import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVICE_URI} from "../../environments/service.uri";

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  constructor(private http : HttpClient) { }

  uploadFile(file : File) {
    const data : FormData = new FormData();
    data.append('file',file);
    return this.http.post(SERVICE_URI.uploadFile,file);
  }
}
