import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AboutServiceComponent } from './components/about-service/about-service.component';
import { CheckAccountComponent } from './components/check-account/check-account.component';
import { AccountVerificationComponent } from './components/account-verification/account-verification.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TermsComponent } from './components/terms/terms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutServiceComponent,
    CheckAccountComponent,
    AccountVerificationComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
