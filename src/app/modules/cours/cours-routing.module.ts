import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { authGuard } from './auth.guard';
import { CoursComponent } from './cours.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
    {
      path: '', component: CoursComponent,canActivate: [authGuard]
    },
    {
      path: 'session', component: SessionComponent,canActivate: [authGuard]
    },
    {
      path: 'add-cours', component: AddCoursComponent,canActivate: [authGuard]
    },
    {
      path: 'cours', component: CoursComponent,canActivate: [authGuard]
    },
    // {
    //   path: 'notifications', component: NotificationComponent,canActivate: [authGuard]
    // },
    {
      path: '', component: LoginComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
