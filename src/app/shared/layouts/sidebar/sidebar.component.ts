import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user = this.userService.user;

  constructor(public sidebarService: SidebarService, private userService: UserService) { }

  ngOnInit() {
    console.log(this.sidebarService.menu);
  }

  logout() {
    this.userService.logout();
  }

}
