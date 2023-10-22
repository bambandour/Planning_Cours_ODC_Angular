import { Component } from '@angular/core';
import { ClassElfe, User } from 'src/app/cours';
import { ClasseService } from 'src/app/services/classe.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent {
  classRoom:ClassElfe[]=[]
  notLength!:number
  user!:User

  constructor(private classeService:ClasseService, private notifySession:SessionService){}
  ngOnInit(){
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.classeService.get().subscribe(res=>{
      this.classRoom=res.data
    })
   this.getNotifyLength()
  }
  getNotifyLength(){
    this.notifySession.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }
}
