import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadrMainComponent } from './components/headr-main/headr-main.component';
import { FooterMainComponent } from './components/footer-main/footer-main.component';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, FooterComponent, HeadrMainComponent, FooterMainComponent],
  exports: [HeaderComponent, SideBarComponent, FooterComponent,HeadrMainComponent,FooterMainComponent],
  imports: [CommonModule],
})
export class SharedModule {}
