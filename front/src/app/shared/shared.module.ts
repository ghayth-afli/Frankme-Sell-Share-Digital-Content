import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
