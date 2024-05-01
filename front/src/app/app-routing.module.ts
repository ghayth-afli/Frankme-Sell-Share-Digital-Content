import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client-support',
    loadChildren: () =>
      import('./modules/client-support/client-support.module').then(
        (m) => m.ClientSupportModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./modules/service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('./modules/pricing/pricing.module').then((m) => m.PricingModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
