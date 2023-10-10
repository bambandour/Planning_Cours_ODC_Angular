import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  formGroup!:FormGroup
  constructor(private fb:FormBuilder){
    this.formGroup=this.fb.group({
      h_debut:[''],
      h_fin:[''],
      type: [''],
      salle: [''],
      date: [''],
    });
  }

}
