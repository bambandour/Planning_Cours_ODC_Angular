import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Notification, User } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifications:Notification[]=[]
  notifyLength!:number
  user!:User
  constructor(private notService:SessionService, private router:Router){}
  ngOnInit(){
    initFlowbite()
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.notService.notification().subscribe(res=>{
      this.notifications=res.data
      this.notifyLength=res.data.length
    })
  }
  cancelSession(session:number){
    this.notService.cancelSession(session).subscribe(res=>{
      this.notifications=this.notifications.filter(not=>not.statut==="pending")
      // console.log(res);
    })
  }
}
