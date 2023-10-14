import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Session } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  // formGroup!:FormGroup
  viewDate:Date=new Date()
  view:CalendarView=CalendarView.Week
  CalendarView=CalendarView
  events:CalendarEvent[] | any=[]
  sessions:Session[]=[]
  constructor(private fb:FormBuilder, private sessionService:SessionService){
    
  }
  
  ngOnInit() {
    this.sessionService.get().subscribe((res: any) => {
      this.sessions = res.data.session;

      this.sessions.forEach(session => {
        const event = {
          title:"ANGULAR",
          start: new Date(session.date+"T"+session.heure_debut),
          end: new Date(session.date+"T"+session.heure_fin)
        };
        
        this.events.push(event);
      });
    });
  }

  setView(view:CalendarView){
    this.view=view
  }

}
