import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings = 'default';

  constructor(@Inject(DOCUMENT) private document) {
    this.loadSettings();
  }

  saveSettings(theme: string) {
    this.changeTheme(theme);
    localStorage.setItem('settings', this.settings);
  }

  loadSettings() {
    this.settings = localStorage.getItem('settings') || this.settings;
    this.changeTheme(this.settings);
  }

  changeTheme(theme: string, event?: any) {
    this.settings = theme;
    const url = `assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
  }

  applyCheck(element: any) {
    const oldElement = this.document.querySelector('#themecolors > li > a.working');
    oldElement.classList.remove('working');
    element.classList.add('working');
  }

  applyDefaultCheck() {
    const defaultTheme = this.document.querySelector(`#themecolors > li > a.${this.settings}-theme`);
    defaultTheme.classList.add('working');
  }
}
