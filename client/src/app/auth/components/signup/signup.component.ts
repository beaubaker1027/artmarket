import { Component, OnInit }      from '@angular/core';
import { ViewEncapsulation }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }                  from '@angular/platform-browser';
import { FlashMessagesService }   from 'angular2-flash-messages';
import {
  FormBuilder,
  FormGroup,
  Validators
}                                 from "@angular/forms";

//modules
import { ValidateService }        from '../../../shared/services/validate/validate.service';
import { AuthService }            from '../../services/auth/auth.service';
import { LocalStorageService }    from '../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  username: string;
  fullname: string;
  email: string;
  accountType: string;
  gender: string;
  password: string;
  fileToUpload: File = null;


  constructor(
    private localStorageService: LocalStorageService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Signup');
  }

  ngOnInit() {
    if(!this.localStorageService.isNotLoggedIn()){
      this.router.navigate(['/'+this.localStorageService.getUserName()]);
      return true;
    } else{
      return false;
    }
  }

  onChange(file: FileList){
    this.fileToUpload = file.item(0);
  }

  onRegisterSubmit(){
    let input = new FormData();

    const user = {
      username: this.username,
      name: this.fullname,
      email: this.email,
      accountType: this.accountType,
      gender: this.gender,
      password: this.password,
    }


    if(!this.validateService.validateRegister(user)){
      return this.flashMessage.show('Please fill in all fields', {cssClass: 'alert', timeout: 3000});
    }
    if(!this.validateService.validateUsername(user.username)){
      return this.flashMessage.show('Username already taken', {cssClass: 'alert', timeout: 3000});
    }
    if(!this.validateService.validateEmail(user.email)){
      return this.flashMessage.show('Invalid email', {cssClass: 'alert', timeout: 3000});
    }

    input.append('profilePic', this.fileToUpload);
    input.append('user', JSON.stringify(user));

    // register user
    this.authService.registerUser(input).subscribe(data => {
      if(data.success){
        this.router.navigate(['/'+user.username]);
        return this.flashMessage.show(data.msg, {cssClass: 'success', timeout: 3000});
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert', timeout: 3000});
        this.router.navigate(['/signup']);
      }
    })
  }

  ngOnDestroy() {
  }

}
