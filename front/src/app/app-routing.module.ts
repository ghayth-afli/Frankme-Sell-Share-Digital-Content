import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
      import('./modules/seller/user.module').then((m) => m.UserModule),
    data: {
      role: 'seller',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    data: {
      role: 'ROLE_ADMIN',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'client-support',
    loadChildren: () =>
      import('./modules/client-support/client-support.module').then(
        (m) => m.ClientSupportModule
      ),
    data: {
      role: 'ROLE_SUPPORT',
    },
    canActivate: [AuthGuard],
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
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },

    path: 'download',
    loadChildren: () =>
      import('./modules/download/download.module').then(
        (m) => m.DownloadModule
      ),
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
