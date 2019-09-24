import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user = this.accountService.user;

  constructor(private accountService: AccountService, public router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
  }

  searchText(text: string) {
    this.router.navigate(['/search', text]);
  }
}
