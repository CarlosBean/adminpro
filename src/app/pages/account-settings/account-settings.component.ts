import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, AfterViewInit {

  themes = [
    'default',
    'green',
    'red',
    'blue',
    'purple',
    'megna',
  ];

  darkThemes = [
    'default-dark',
    'green-dark',
    'red-dark',
    'blue-dark',
    'purple-dark',
    'megna-dark',
  ];

  checked = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.settingsService.applyDefaultCheck();
  }

  changeTheme(theme: string, event: any) {
    this.settingsService.saveSettings(theme);
    this.settingsService.applyCheck(event.target);
  }
}
