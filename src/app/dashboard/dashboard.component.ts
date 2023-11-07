import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../cours';
import { ClasseService } from '../services/classe.service';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  notLength!:number
  user!:User
  constructor(private notifyService:SessionService, private classeService:ClasseService, private authService:LoginService,private router:Router){
  }
  ngOnInit(){
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.notifyService.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }
  singUp(){
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['']);
    })
  }


}
