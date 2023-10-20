import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private notifyService:SessionService, private classeService:ClasseService, private fb:FormBuilder){
    this.formGroup=this.fb.group({
      excel:['',Validators.required]
    })
  }
  ngOnInit(){
    this.notifyService.notification().subscribe(res=>{
      this.notLength=res.data.length
    })
  }
  uploadFileExcel(){
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('excel', this.formGroup.get('excel')?.value);
      console.log(formData);

      
      // this.classeService.importStudents(this.formGroup.value.excel).subscribe(res=>{
      //   console.log(res);
        
      // })
      
    }
  }
}
