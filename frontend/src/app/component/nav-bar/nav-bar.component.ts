import {Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    // console.log("ok")
  }

  logoutUser() {
    this.loginService.logout();
    location.reload();
  }

  registerPage(){
    return window.location.href.indexOf('register') > -1
  }

}
