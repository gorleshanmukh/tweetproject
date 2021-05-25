import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfo = {
    firstName : "",
    lastName : "",
    loginId : "",
    emailId : "",
    contactNumber : "",
    password : ""
  }

  userInfoValidator = {
    firstName : false,
    lastName : false,
    loginId : false,
    emailId : false,
    contactNumber : false,
    password : false,
    confirmPassword : false
  }

  public confirmPassword = "";
  public errorResponse = {
    flag:false,
    errorMessage : ""
  }
  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorResponse = {
      flag:false,
      errorMessage : ""
    }
    if (this.userInfo.loginId != ""
        && this.userInfo.emailId != ""
        && this.userInfo.contactNumber != ""
        && this.userInfo.firstName != ""
        && this.userInfo.lastName != ""
        && this.userInfo.password != ""
        && this.confirmPassword != "") {
        if (this.userInfo.password == this.confirmPassword) {
          this.registerService.registerUser(this.userInfo).subscribe(
            (response : any) => {
              console.log(response)
              if (response.errorMessage == "OK"){
                window.location.href='/login';
              } else {
                this.errorResponse = {
                  flag:true,
                  errorMessage : response.errorMessage
                }
              }
            }, error => {
              console.log(error)
            }
          );
        }  else {
          this.userInfoValidator.confirmPassword = true;
        }
    }
  }
}
