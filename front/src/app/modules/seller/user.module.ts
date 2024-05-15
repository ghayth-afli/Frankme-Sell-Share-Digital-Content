import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from '../../shared/shared.module';
import { AssetService } from './services/asset.service';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, DashboardModule, SharedModule],
  providers: [AssetService],
})
export class UserModule {}
