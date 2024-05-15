import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { Step1Component } from './upload/step-1/step-1.component';
import { Step2Component } from './upload/step-2/step-2.component';
import { Step3Component } from './upload/step-3/step-3.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    Step1Component,
    Step2Component,
    Step3Component,
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
