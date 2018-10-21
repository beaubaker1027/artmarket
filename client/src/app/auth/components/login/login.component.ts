import { Component, OnInit }      from '@angular/core';
import { ViewEncapsulation }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }                  from '@angular/platform-browser';
import { Location,
         LocationStrategy,
         PathLocationStrategy }   from '@angular/common';
import { FlashMessagesService }   from 'angular2-flash-messages';

//modules
import { AuthService }            from '../../services/auth/auth.service';
import { LocalStorageService }    from '../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit() {
    localStorage.clear();
    console.log('login Component');
    if(!this.authService.isNotLoggedIn()){
      console.log('login authService is logged in');
      this.router.navigate(['/'+this.localStorageService.getUserName()]);
      return true;
    } else{
      console.log('login authService is not logged in');
      return false;
    }
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.returnUrl = this.route.snapshot.queryParams['return'] || '/'+data.user.username;
        this.router.navigate([this.returnUrl]);
      } else {
        this.flashMessage.show('Sorry, We didnt find your account', {cssClass: 'alert', timeout: 3000})
      }
    })
  }

}
