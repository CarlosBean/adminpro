import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  auth2: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public ngZone: NgZone,
    public userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.loadRememberMe();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '307578317618-f0n0ghdkukcun28cheh76o9o18r3tghb.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // added ngzone as temporal solution for warning: Navigation triggered outside Angular zone
      this.userService.googleLogin(token)
        .subscribe(() => this.ngZone.run(() => this.router.navigate(['/dashboard'])).then());
    });
  }

  loadRememberMe() {
    const email = localStorage.getItem('email') || '';
    this.form.controls.email.setValue(email);

    if (email) {
      this.form.controls.rememberMe.setValue(true);
    }
  }

  login() {
    this.userService.login(this.form.value)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
