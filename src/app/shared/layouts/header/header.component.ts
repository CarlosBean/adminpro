import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user = this.userService.user;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
