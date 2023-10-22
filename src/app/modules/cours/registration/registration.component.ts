import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/cours';
import { ClasseService } from 'src/app/services/classe.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  notLength!:number
  formGroup!:FormGroup
  user!:User

  constructor(private notifyService:SessionService, private classeService:ClasseService, private fb:FormBuilder){
    this.formGroup=this.fb.group({
      excel:['',Validators.required]
    })
  }
  ngOnInit(){
    let current_user=JSON.parse(localStorage.getItem('current_user')!)
    this.user=current_user;
    this.notifyService.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }
  uploadFileExcel(){
    // if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('file', this.formGroup.get('excel')?.value);
      console.log(formData);

      this.classeService.importStudents(this.formGroup.value.excel).subscribe(res=>{
        console.log(res);
        
      })
      
    // }
  }
}
