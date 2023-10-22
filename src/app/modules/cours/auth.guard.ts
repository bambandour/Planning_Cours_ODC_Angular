import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from 'src/app/cours';

export const authGuard: CanActivateFn = (route, state) => {
  const token=JSON.parse(localStorage.getItem('token')!);
  const user :User =JSON.parse(localStorage.getItem('current_user')!);
  // console.log(user);
  const router=inject(Router)
  if (token  && user && user.role) {
    const requiredRole = route.data['requiredRole'];
    if (user.role.includes(requiredRole)) {
      return true;
    }
    return true;
  }else{
    router.navigate([''])
    return false
  }
};
