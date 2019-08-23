import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate() {
    if (this.userService.isLogged()) {
      console.log('Passed guard');
      return true;
    } else {
      console.log('Blocked by guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}