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
      ]
    }
  ];

  constructor() { }
}
