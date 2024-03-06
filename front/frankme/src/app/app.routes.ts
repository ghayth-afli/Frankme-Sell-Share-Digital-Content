import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./presentation/pages/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./presentation/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
];
