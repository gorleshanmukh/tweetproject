import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import {RegisterService} from "./service/register.service";
import {AuthGuard} from "./service/auth.guard";
import {AuthInterceptor} from "./service/auth.interceptor";
import {GetAllUserService} from "./service/get-all-user.service";
import { TweettileComponent } from './component/shared/tweettile/tweettile.component';
import { DateAgoPipe } from './pipes/dateago.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './component/shared/dialog/dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        HomeComponent,
        LoginComponent,
        DashboardComponent,
        RegisterComponent,
        TweettileComponent,
        DateAgoPipe,
        DialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    RegisterService,
    AuthGuard,
    GetAllUserService,
    [{provide : HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
