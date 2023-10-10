import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { CoursComponent } from './cours.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
  {
     path: '', component: CoursComponent
  },
  {
    path: 'session', component: SessionComponent
  },
  {
    path: 'add-cours', component: AddCoursComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
