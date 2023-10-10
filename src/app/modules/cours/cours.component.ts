import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cours, Data } from 'src/app/interfaces/planning';
import { CoursService } from 'src/app/services/cours.service';
import { initFlowbite } from 'flowbite';
import { Salle, Session } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  formGroup!:FormGroup
  cours:Cours[]=[]
  selectedFilter: string = 'class';
  searchTerm: string = '';
  selectedModule:string=''
  selectedHours:number=0
  selectedClass:string=''
  filteredCourses: any[] = [];
  isModalOpen = false;
  salles:Salle[]=[]
  courId!:number


  constructor(private fb:FormBuilder, private coursService:CoursService,private sessionservice:SessionService){
    this.formGroup=this.fb.group({
      module:[''],
      prof:[''],
      classes: this.fb.array([]),
      h_debut:['',Validators.required],
      h_fin:['',Validators.required,],
      type: ['',Validators.required],
      salle: ['',],
      date: ['',Validators.required],
      cours:['']
      });
  }

  ngOnInit(){
    initFlowbite();
    this.getAllCours()
    this.getSessionAndSalle()
  }
  
  get classes() {
    return this.formGroup.get('classes') as FormArray;
  }

  addClass() {
    this.classes.push(this.fb.group({
      heure_globale:[''],
      classe:[''],
    }));
  }
  
  removeClass(index: number) {
    this.classes.removeAt(index);
  }

  getAllCours(){
    this.coursService.get().subscribe((res:any)=>{
      this.cours=res.data
    })
  }

  getSessionAndSalle(){
    this.sessionservice.get().subscribe((res:any)=>{
      this.salles=res.data.salle
    })
  }
  onClickCourse(courseId: number) {
    console.log('ID du cours sélectionné :', courseId);
    this.courId = courseId
    this.cours.forEach(cour => {
      courseId = cour.id; 
    });
  }


  onSubmitSession(){
    if (this.formGroup.valid) {
      const sessionForm=this.formGroup.value;
      const data={
      date_session:sessionForm.date,
      heure_debut:sessionForm.h_debut,
      heure_fin:sessionForm.h_fin,
      type_session:sessionForm.type,
      salle:sessionForm.salle,
      cours:this.courId
      }
      console.log(data);
      
    // this.sessionservice.add(data).subscribe(res=>{
    //     console.log(res);
    //     this.formGroup.reset();
    // })
    }

    // isSalleDispo(){
    //   const cour=this.formGroup.value.cours
    //   this.cours.forEach(c => {
    //     if (cour===c.id) {
          
    //     }
    //   });
    //   return
    // }
    
    

  }



}
