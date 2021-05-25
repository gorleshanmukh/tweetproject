import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  public users : any;
  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log(this.users)
    }, error => {
      console.log(error)
    })
  }
}
