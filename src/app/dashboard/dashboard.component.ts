import { Component } from '@angular/core';
import { User } from '../cours';
import { ClasseService } from '../services/classe.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  notLength!:number
  user!:User
  constructor(private notifyService:SessionService, private classeService:ClasseService, ){
  }
  ngOnInit(){
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;

    console.log(this.user);
    this.notifyService.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }

}
