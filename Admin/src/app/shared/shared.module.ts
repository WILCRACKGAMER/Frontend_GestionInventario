import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BreadcrumbsComponent,
    CommonModule
  ],
  exports: [BreadcrumbsComponent]
})
export class SharedModule { }
