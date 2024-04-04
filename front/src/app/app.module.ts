import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, SharedModule, CoreModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
