import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of }         from 'rxjs';
import { FlashMessagesService }   from 'angular2-flash-messages';
import { Title }                  from '@angular/platform-browser';

//modules
import { ProfileService }         from '../../services/profile/profile.service';
import { LocalStorageService }    from '../../../shared/services/local-storage/local-storage.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  profile: string;
  user: object;
  profilePic: object;

  constructor(
    private localStorageService: LocalStorageService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private titleService: Title,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit(): void{
    this.extractProfilePath();
    this.profileService.loadRequestedProfileImage(this.profile).subscribe(data => {
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        this.profilePic = reader.result;
      }, false);
      if(data.size){
        return reader.readAsDataURL(data);
      }
    });
    this.profileService.loadRequestedProfile(this.profile).subscribe(data => {
      console.log(data);
      if(data.success){
        this.loadUser(data);
        return this.titleService.setTitle(data.user.username);
      } else{
        this.flashMessage.show(data.msg, {cssClass: 'alert', timeout: 3000});
        this.router.navigate(['/']);
      }
    })
  }

  isOwnProfile(){
    return this.profile == this.localStorageService.getUserName();
  }

  extractProfilePath(): void{
    const param = this.activatedRoute.snapshot.paramMap.get('user');
    this.profile = param;
  }

  getUser(){
    return this.user;
  }

  convertImage(image){

  }

  loadUser(data){
    this.user = {
      followers: data.user.followers,
      artwork: data.user.artwork,
      email: data.user.email,
      gender: data.user.gender,
      name: data.user.name,
      username: data.user.username
    };
  }
}
