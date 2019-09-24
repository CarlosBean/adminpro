import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../account/account.service';
@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  helper = new JwtHelperService();

  constructor(public accountService: AccountService) { }

  canActivate(): Promise<boolean> | boolean {
    const isExpired = this.helper.isTokenExpired(this.accountService.token);
    if (isExpired) {
      this.accountService.logout();
      return false;
    }

    return this.verifyExpTime();
  }

  verifyExpTime(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expTime = this.helper.getTokenExpirationDate(this.accountService.token).getTime();
      const now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (expTime > now.getTime()) {
        resolve(true);
      } else {
        this.accountService.renewToken().subscribe(() => resolve(true), () => reject(false));
      }
    });
  }
}
