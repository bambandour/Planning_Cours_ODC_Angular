import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent {

  formGroup!:FormGroup
  constructor(private fb:FormBuilder, private coursService:CoursService){
    this.formGroup=this.fb.group({
      module:[''],
      prof:[''],
      classes: this.fb.array([])
    });
  }
  ngOnInit(){
    
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
}
