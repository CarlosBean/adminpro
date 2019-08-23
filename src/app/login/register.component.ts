import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UserService } from '../services';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPass: ['', [Validators.required]],
    terms: [false, [Validators.required]],
  }, { validators: this.matchPasswords('password', 'confirmPass') });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    init_plugins();
  }

  register() {
    // tslint:disable-next-line: curly
    if (this.form.invalid) return;

    if (!this.form.value.terms) {
      return Swal.fire('Atention', 'Must have accept the terms', 'warning');
    }

    this.userService.create(this.buildFromForm()).subscribe(res => this.router.navigate(['/login']));
  }

  buildFromForm(): User {
    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    };

    return user;
  }

  matchPasswords(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;
      return pass1 === pass2 ? null : { matchPasswords: true };
    };
  }

}
