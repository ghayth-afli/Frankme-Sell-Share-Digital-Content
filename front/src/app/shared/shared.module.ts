import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
<<<<<<< HEAD
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterMainComponent } from './components/footer-main/footer-main.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HomeHeaderComponent } from './components/home-header/home-header.component';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, FooterComponent, NavbarComponent, FooterMainComponent, HomeHeaderComponent],
  exports: [HeaderComponent, SideBarComponent, FooterComponent,NavbarComponent,FooterMainComponent,HomeHeaderComponent],
  imports: [CommonModule,RouterLink,RouterModule],
=======
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    LoaderComponent,
  ],
  exports: [
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    LoaderComponent,
  ],
  imports: [CommonModule],
>>>>>>> 03f3e86453ecd8f3385ee4cba5cbf229edee51cd
})
export class SharedModule {}
