import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation }      from '@angular/core';
import { Router }         from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
}                                 from "@angular/forms";
import { FlashMessagesService }   from 'angular2-flash-messages';

//services
import { SettingsService } from '../../services/settings/settings.service';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { ValidateService } from '../../../shared/services/validate/validate.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditUserComponent implements OnInit {

  currentName: string;
  currentEmail: string;
  currentUser: string;
  username: string;
  fullname: string;
  email: string;
  accountType: string;
  gender: string;
  password: string;
  fileToUpload: File = null;

  constructor(
    private settingsService:SettingsService,
    private validateService: ValidateService,
    private title:Title,
    private localStorageService:LocalStorageService,
    private router:Router,
    private flashMessage: FlashMessagesService,
  ) {
    this.title.setTitle('Edit User')
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getUserName();
    this.currentEmail = this.localStorageService.getEmail();
    this.currentName = this.localStorageService.getFullName();
  }

  onChange(file: FileList){
    this.fileToUpload = file.item(0);
  }

  onUpdateSubmit(){
    let input = new FormData();

    const user = {
      newUsername: this.username || null,
      currentUsername: this.currentUser || null,
      name: this.fullname || null,
      email: this.email || this.currentEmail,
      accountType: this.accountType || null,
      gender: this.gender || null,
      password: this.password || null,
    }

    if(!this.validateService.validateUsername(user.currentUsername)){
      return this.flashMessage.show('Username is already taken', {cssClass: 'alert', timeout: 3000});
    }
    if(!this.validateService.validateEmail(user.email)){
      return this.flashMessage.show('Invalid email', {cssClass: 'alert', timeout: 3000});
    }

    input.append('profilePic', this.fileToUpload);
    input.append('user', JSON.stringify(user));

    console.log(user);
    console.log(input);

    //updateUser
    this.settingsService.editUserInfo(input).subscribe(data => {
    console.log(data)
      if(data.success){
        /*this.localStorage.storeUserData(data.user);*/
        return this.flashMessage.show(data.msg, {cssClass: 'success', timeout: 3000});
      } else {
        return this.flashMessage.show(data.msg, {cssClass: 'alert', timeout: 3000});
      }
  })
  }

}
