import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, DashboardModule],
})
export class UserModule {}
