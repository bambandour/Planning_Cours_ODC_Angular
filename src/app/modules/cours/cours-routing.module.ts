import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { CoursComponent } from './cours.component';
import { LoginComponent } from './login/login.component';
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
    {
      path: 'cours', component: CoursComponent
    },
    {
      path: '', component: LoginComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
