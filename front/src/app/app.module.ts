import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './modules/about/about.component';
import { ServiceComponent } from './modules/service/service.component';
import { PricingComponent } from './modules/pricing/pricing.component';
import { SharedModule } from "./shared/shared.module";
import { ContactComponent } from './modules/contact/contact.component';

@NgModule({
    declarations: [AppComponent, AboutComponent, ServiceComponent, PricingComponent, ContactComponent],
    providers: [AuthService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CoreModule,
        AuthModule,
        HttpClientModule,
        SharedModule
    ]
})
export class AppModule {}
