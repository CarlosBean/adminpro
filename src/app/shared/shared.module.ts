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
import { ImagePipe } from './pipes/image/image.pipe';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        BoosterComponent,
        DonutGraphicComponent,
        ImagePipe,
        ModalUploadComponent,
        HasRoleDirective
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
        RouterModule,
        ImagePipe,
        ModalUploadComponent
    ],
    providers: [],
})
export class SharedModule { }
