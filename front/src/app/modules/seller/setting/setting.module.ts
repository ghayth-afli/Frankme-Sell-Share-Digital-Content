import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SecurityComponent } from './security/security.component';
import { SettingNavComponent } from './setting-nav/setting-nav.component';


@NgModule({
  declarations: [
    SettingComponent,
    EditProfileComponent,
    SecurityComponent,
    SettingNavComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
