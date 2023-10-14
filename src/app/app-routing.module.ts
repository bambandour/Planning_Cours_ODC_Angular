import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './modules/cours/add-cours/add-cours.component';
import { CoursComponent } from './modules/cours/cours.component';
import { LoginComponent } from './modules/cours/login/login.component';
import { SessionComponent } from './modules/cours/session/session.component';

const routes: Routes = [{ path: 'cours', loadChildren: () => import('./modules/cours/cours.module').then(m => m.CoursModule) },
    {
      path: 'session', component: SessionComponent
    },
    {
      path: 'add-cours', component: AddCoursComponent
    },
    {
      path: 'cour', component: CoursComponent
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
