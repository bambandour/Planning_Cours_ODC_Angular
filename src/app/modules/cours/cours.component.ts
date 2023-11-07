import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cours, Data } from 'src/app/interfaces/planning';
import { CoursService } from 'src/app/services/cours.service';
import { initFlowbite } from 'flowbite';
import { Salle, Session, User } from 'src/app/cours';
import { SessionService } from 'src/app/services/session.service';
import { min } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'],
})
export class CoursComponent {

  formGroup!:FormGroup
  cours:Cours[]=[]
  selectedFilter: string = 'state';
  searchText: string = '';
  selectedModule:string=''
  selectedHours:number=0
  selectedClass:string=''
  filteredCourses: any[] = [];
  isModalOpen = false;
  salles:Salle[]=[]
  courId!:number
  user!:User
  notifyLength!:number


  constructor(private fb:FormBuilder, private coursService:CoursService,private sessionservice:SessionService, private authService:LoginService,private router:Router){
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
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.performSearch()
    this.sessionservice.notification().subscribe(res=>{
      this.notifyLength=res.data.length
    })
    
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
      // console.log(res.data);
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
      this.sessionservice.add(data).subscribe(res=>{
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
        this.router.navigate(['/cours'])
        this.formGroup.reset();
    })
    }
  }
 
  singUp(){
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['']);
    })
  }

  performSearch() {
    if (this.selectedFilter === 'class') {
      this.cours = this.cours.filter(cour => cour.annee_classe.classe.libelle === this.searchText);
    } else if (this.selectedFilter === 'module') {
      this.cours = this.cours.filter(cour => cour.prof_module.module === this.searchText);
    } else if (this.selectedFilter === 'hours') {
      
    } else if (this.selectedFilter === 'state') {
      if (this.searchText === 'termine') {
        this.cours = this.cours.filter(cour => cour.etat === true);
      } else if (this.searchText === 'pending') {
        this.cours = this.cours.filter(cour => cour.etat === false);
      }
    }
  }
  
}
