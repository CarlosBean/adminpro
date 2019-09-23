import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [
    {
      title: 'principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'dashboard', url: '/dashboard' },
        { title: 'progress bar', url: '/progress' },
        { title: 'graphics', url: '/graphics1' },
        { title: 'promises', url: '/promises' },
        { title: 'rxjs', url: '/rxjs', auth: 'ADMIN_ROLE' },
      ]
    },
    {
      title: 'management',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'users', url: '/users', auth: 'ADMIN_ROLE' },
        { title: 'doctors', url: '/doctors' },
        { title: 'hospitals', url: '/hospitals' },
      ]
    }
  ];

  constructor() { }
}
