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

import { SettingsService } from '../../services/settings/settings.service';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

  file:any;
  fileToUpload:any;
  base64:string;
  description:string;
  price:number;

  constructor(
    private settingService:SettingsService,
    private title:Title,
    private localStorageService:LocalStorageService,
    private router:Router,
    private flashMessage: FlashMessagesService,
  ) {
    this.title.setTitle('Upload')
  }

  ngOnInit() {
  }

  onChange(file: FileList){
    this.file = file.item(0);
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.fileToUpload = reader.result;
    }, false);
    reader.readAsDataURL(file.item(0));
  }

  onUploadSubmit(){
    let input = new FormData();

    const artwork = {
      username: this.localStorageService.getUserName(),
      description: this.description,
      price: this.price,
    }

    input.append('upload', this.file);
    input.append('artwork', JSON.stringify(artwork));

    console.log(input);

    console.log(artwork);

    this.settingService.uploadArtwork(input).subscribe(data => {
      console.log(data);
      if(data.success){
        this.router.navigate(['/'+this.localStorageService.getUserName()])
      } else {
        return this.flashMessage.show(data.msg, {cssClass: 'alert', timeout: 3000});
      }
    });
  }

}
