import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { BoosterComponent } from './components/booster/booster.component';
import { DonutGraphicComponent } from './components/donut-graphic/donut-graphic.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        BoosterComponent,
        DonutGraphicComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        BoosterComponent,
        ChartsModule,
        DonutGraphicComponent,
        RouterModule
    ],
    providers: [],
})
export class SharedModule { }
