import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { initFlowbite } from 'flowbite';
import { Session, User } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

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
  isOpen:boolean=false;
  router!:Router
  notifyLength!:number
  user!:User
  formGroup!:FormGroup
  constructor(private fb:FormBuilder, private sessionService:SessionService){
    this.formGroup=this.fb.group({
      sessionId:[''],
      textarea:['',Validators.required]
    })
  }
  
  ngOnInit() {
    initFlowbite();
    this.setView(this.view)
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.sessionService.get().subscribe((res: any) => {
      this.sessions = res.data.session;
      // console.log(res.data);
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
    this.sessionService.notification().subscribe(res=>{
      this.notifyLength=res.data.length
    })
  }

  onClickEvents(event:any) {
    this.cal=event.event
    this.openModal()
  }

  validated(session:number){
    this.sessionService.validatedSession(session).subscribe(res=>{
      console.log(res);
      this.closeModal()
      if (res.success==true) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 2500
        })
      }else
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2500
      })
    })
  }
  invalidatedSession(session:number){
    this.sessionService.invalidatedSession(session).subscribe(res=>{
      console.log(res);
      this.closeModal()
      if (res.success==true) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 2500
        })
      }else
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2500
      })
    })
  }

  onSubmitRequest(){
    console.log(this.formGroup.value);
    // this.sessionService.demande(this.formGroup.value).subscribe(res=>{
      
    // })
  }

  openModal(){
    this.isModalOpen=true;
  }
  open(){
    this.isOpen=true;
  }
  
  closeModal(){
    this.isModalOpen=false;
  }

  close(){
    this.isOpen=false;
  }

  setView(view:CalendarView){
    this.view=view
  }

}
