import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';
import { AboutComponent } from './modules/about/about.component';
import { ServiceComponent } from './modules/service/service.component';
import { ContactComponent } from './modules/contact/contact.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TokenStorageService } from './core/services/TokenStorage.service';
import { UserService } from './core/services/user.service';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    TokenStorageService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // This is required to add multiple interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
