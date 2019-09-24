import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public accountService: AccountService, public router: Router) { }

  canActivate() {
    if (this.accountService.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
