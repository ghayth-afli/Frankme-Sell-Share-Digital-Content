import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, FooterComponent],
  exports: [HeaderComponent, SideBarComponent, FooterComponent],
  imports: [CommonModule],
})
export class SharedModule {}
