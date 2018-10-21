import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

//Modules
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

//Components
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { GalleryComponent } from './components/gallery/gallery.component';

//Services
import { ProfileService } from './services/profile/profile.service'


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    SharedModule,
  ],
})
export class ProfileModule { }
