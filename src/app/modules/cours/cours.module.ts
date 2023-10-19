import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursRoutingModule } from './cours-routing.module';
import { CoursComponent } from './cours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { FilterPipe } from './filter.pipe';
import { SessionComponent } from './session/session.component';
import { CalendarModule, DateAdapter ,CalendarDateFormatter, CalendarNativeDateFormatter, DateFormatterParams} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localeFr from '@angular/common/locales/fr'
import { registerLocaleData } from '@angular/common';
import { fr } from 'date-fns/locale';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth.interceptor';
import { NotificationComponent } from './notification/notification.component';
import { ClasseComponent } from './classe/classe.component';

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
    CoursComponent,
    AddCoursComponent,
    FilterPipe,
    SessionComponent,
    NotificationComponent,
    ClasseComponent,
  ],
  imports: [
    CommonModule,
    CoursRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ]
})

export class CoursModule { }
