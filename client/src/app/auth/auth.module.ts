import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

//Modudules
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

//Services
import { AuthService } from './services/auth/auth.service';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
