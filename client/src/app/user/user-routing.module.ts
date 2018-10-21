import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component'
import { SettingsComponent } from './components/settings/settings.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full'},
      { path: 'settings', component: SettingsComponent },
      { path: 'edit', component: EditUserComponent },
      { path: 'upload', component: UploadComponent },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
