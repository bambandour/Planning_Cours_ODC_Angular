import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursRoutingModule } from './cours-routing.module';
import { CoursComponent } from './cours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { FilterPipe } from './filter.pipe';
import { SessionComponent } from './session/session.component';


@NgModule({
  declarations: [
    CoursComponent,
    AddCoursComponent,
    FilterPipe,
    SessionComponent,
  ],
  imports: [
    CommonModule,
    CoursRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoursModule { }
