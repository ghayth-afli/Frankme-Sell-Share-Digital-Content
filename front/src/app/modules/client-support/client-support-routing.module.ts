import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSupportComponent } from './client-support.component';

const routes: Routes = [{ path: '', component: ClientSupportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSupportRoutingModule {}
