import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSupportRoutingModule } from './client-support-routing.module';
import { ClientSupportComponent } from './client-support.component';


@NgModule({
  declarations: [
    ClientSupportComponent
  ],
  imports: [
    CommonModule,
    ClientSupportRoutingModule
  ]
})
export class ClientSupportModule { }
