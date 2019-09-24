import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from '../account/account.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public accountService: AccountService) { }

  canActivate() {
    if (this.accountService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.accountService.logout();
      return false;
    }
  }
}
