import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { VerifyService } from './Services/verify.service';
import { ChatComponent } from './Components/chat/chat.component';
import { UsersComponent } from './Components/users/users.component';

import { SocketIoModule } from 'ngx-socket-io';
import { ProfileComponent } from './Components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ChatComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({ options: {}, url: 'https://ed-social.herokuapp.com' }) //https://ed-social.herokuapp.com
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: VerifyService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
