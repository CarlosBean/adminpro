import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesRoutingModule } from './pages.routing.module';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Graphics1Component,
        ProgressComponent,
        AccountSettingsComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ],
    providers: [],
})
export class PagesModule { }
