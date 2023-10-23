import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import localeFr from '@angular/common/locales/fr'
import { registerLocaleData } from '@angular/common';
import { fr } from 'date-fns/locale';
import { LoginComponent } from './modules/cours/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './modules/cours/auth.interceptor';
// import { DashboardComponent } from './dashboard/dashboard.component';


registerLocaleData(localeFr,fr)
class CostumDateFormatter extends CalendarNativeDateFormatter{
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FormsModule,
    HttpClientXsrfModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    
    {
      provide:CalendarDateFormatter,useClass:CostumDateFormatter
    },
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
