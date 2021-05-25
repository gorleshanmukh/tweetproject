import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../service/login.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials={
    loginId:"",
    password:""
  }
  forgotPassFlag = false;
  responsevalidation = {
    flag : false,
    message : ""
  }

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.credentials.loginId != null
      && this.credentials.password != null
      && this.credentials.loginId != '' && this.credentials.password != '') {
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any) => {
          this.loginService.loginUser((response));
          if (response.errorMessage == "OK") {
            window.location.href='/dashboard';
          } else {
            this.responsevalidation.flag = true;
            this.responsevalidation.message = response.errorMessage
          }
        }, error => {
          console.log(error)
        }
      )
    }
  }

  onForgotPassword() {
    this.credentials={
      loginId:"",
      password:""
    }
    this.responsevalidation = {
      flag : false,
      message : ""
    }
    this.forgotPassFlag = true;
  }

  loginAgain() {
    this.credentials={
      loginId:"",
      password:""
    }
    this.responsevalidation = {
      flag : false,
      message : ""
    }
    this.forgotPassFlag = false;
  }

  onForgotPasswordSubmit() {
    if (this.credentials.loginId != null
      && this.credentials.password != null
      && this.credentials.loginId != '' && this.credentials.password != '') {
        this.loginService.forgotPassword(this.credentials).subscribe(
          (response:any) => {
            if (response) {
              this.responsevalidation.flag = true;
              this.responsevalidation.message = "Password successfully changed";
            } else {
              this.responsevalidation.flag = true;
              this.responsevalidation.message = "User doesnot exist";
            }
          }, error => {
            console.log(error);
          }
        )
      }
    }
}
