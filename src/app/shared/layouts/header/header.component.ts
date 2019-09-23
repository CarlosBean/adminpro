import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user = this.userService.user;

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  searchText(text: string) {
    this.router.navigate(['/search', text]);
  }
}
