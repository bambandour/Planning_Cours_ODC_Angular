import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { initFlowbite } from 'flowbite';
import { Session } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  viewDate:Date=new Date()
  view:CalendarView=CalendarView.Week
  CalendarView=CalendarView
  events:CalendarEvent[] | any=[]
  cal!:Session
  sessions:Session[]=[]
  isModalOpen:boolean=false;
  router!:Router
  constructor(private fb:FormBuilder, private sessionService:SessionService){
    
  }
  
  ngOnInit() {
    initFlowbite();
    this.sessionService.get().subscribe((res: any) => {
      this.sessions = res.data.session;
      this.sessions.forEach(session => {
        const event = {
          title:`<p>${session.cours.prof_module.module}</p>
                  <p>${session.cours.prof_module.prof}</p>
                  <p>${session.cours.annee_classe.classe.libelle}</p>
                  <p>Salle: ${session.salle}</p>
          `,
          start: new Date(session.date+"T"+session.heure_debut),
          end: new Date(session.date+"T"+session.heure_fin),
          id: session.id,
          date: session.date,
          heure_debut: session.heure_debut,
          heure_fin: session.heure_fin,
          duree: session.duree,
          cours: session.cours,
          type_session: session.type_session,
          salle: session.salle,
          etat: session.etat,

        };
        this.events.push(event);
      });
    });
  }


  onClickEvents(event:any) {
    this.cal=event.event
    this.openModal()
  }

  validated(session:number){
    this.sessionService.validatedSession(session).subscribe(res=>{
      console.log(res);
      this.closeModal()
    })
  }

  openModal(){
    this.isModalOpen=true;
  }
  
  closeModal(){
    this.isModalOpen=false;
  }

  setView(view:CalendarView){
    this.view=view
  }

}
