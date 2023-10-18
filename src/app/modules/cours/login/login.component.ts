import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!:FormGroup
  constructor(private fb:FormBuilder,private authService: LoginService, private router:Router,private userService:UserService) {
    this.formGroup=this.fb.group({
      email: ['',[Validators.required , Validators.minLength(7)]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    });
  }
  login() {
    initFlowbite();
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(res => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('current_user',JSON.stringify(res.user))
        // this.userService.setCurrentUser(res.user.nomComplet);
        this.router.navigate(['/cours']);
      });
    }
  }
  singUp(){
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['']);
    })
  }
}
