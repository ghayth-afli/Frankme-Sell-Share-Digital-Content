import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from '../about/about.component';
import { ServiceComponent } from '../service/service.component';
import { PricingComponent } from '../pricing/pricing.component';
import { ContactModule } from '../contact/contact.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
