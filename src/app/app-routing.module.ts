import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './modules/cours/add-cours/add-cours.component';
import { authGuard } from './modules/cours/auth.guard';
import { ClasseComponent } from './modules/cours/classe/classe.component';
import { CoursComponent } from './modules/cours/cours.component';
import { LoginComponent } from './modules/cours/login/login.component';
import { NotificationComponent } from './modules/cours/notification/notification.component';
import { RegistrationComponent } from './modules/cours/registration/registration.component';
import { SessionComponent } from './modules/cours/session/session.component';

const routes: Routes = [{ path: 'cours', loadChildren: () => import('./modules/cours/cours.module').then(m => m.CoursModule) },
    {
      path: 'session', component: SessionComponent,canActivate: [authGuard]
    },
    {
      path: 'add-cours', component: AddCoursComponent,canActivate: [authGuard]
    },
    {
      path: 'cours', component: CoursComponent,canActivate: [authGuard]
    },
    {
      path: 'notifications', component: NotificationComponent,canActivate: [authGuard],data: {
        requiredRole: 'RP' 
      }
    },
    {
      path: 'classes', component: ClasseComponent,canActivate: [authGuard]
    },
    {
      path: 'registration', component: RegistrationComponent,canActivate: [authGuard]
    },
    {
      path: '', component: LoginComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
