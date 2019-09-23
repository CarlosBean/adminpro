import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  helper = new JwtHelperService();

  constructor(public userService: UserService) { }

  canActivate(): Promise<boolean> | boolean {
    const isExpired = this.helper.isTokenExpired(this.userService.token);
    if (isExpired) {
      this.userService.logout();
      return false;
    }

    return this.verifyExpTime();
  }

  verifyExpTime(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expTime = this.helper.getTokenExpirationDate(this.userService.token).getTime();
      const now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (expTime > now.getTime()) {
        resolve(true);
      } else {
        this.userService.renewToken().subscribe(() => resolve(true), () => reject(false));
      }
    });
  }
}
