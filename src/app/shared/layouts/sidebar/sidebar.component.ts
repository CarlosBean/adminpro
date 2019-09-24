import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AccountService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user = this.accountService.user;

  constructor(public sidebarService: SidebarService, private accountService: AccountService) { }

  ngOnInit() { }

  logout() {
    this.accountService.logout();
  }

}
