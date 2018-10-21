import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

//Modules
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UploadComponent } from './components/upload/upload.component';

//Services
import { SettingsService } from './services/settings/settings.service'
@NgModule({
  declarations: [
    UserComponent,
    SettingsComponent,
    EditUserComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    SettingsService
  ]
})
export class UserModule { }
