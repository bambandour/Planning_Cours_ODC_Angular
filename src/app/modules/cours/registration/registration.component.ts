import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/cours';
import { ClasseService } from 'src/app/services/classe.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  notLength!:number
  formGroup!:FormGroup
  user!:User;
  role:string=""
  selectedFile:File | null=null;
  isLoader:boolean=false

  constructor(private notifyService:SessionService, private classeService:ClasseService, private fb:FormBuilder){
    this.formGroup=this.fb.group({
      excel:['',Validators.required]
    })
  }
  ngOnInit(){
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.role=this.user.role;
    // console.log(this.user);
    
    this.notifyService.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }
  onselectedFile($event:any){
    this.selectedFile=$event.target.files[0]
  }
  uploadFileExcel(){
    if (this.selectedFile) {
      // this.classeService.importStudents(this.selectedFile).subscribe(res=>{
      //   console.log(res);
        this.isLoader=true
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Les eleves ont été inscrits avec succés',
            showConfirmButton: false,
            timer: 2500
          })
      // })
    }
    this.isLoader=false
  }

}
