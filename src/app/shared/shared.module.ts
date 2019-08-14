import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule { }
