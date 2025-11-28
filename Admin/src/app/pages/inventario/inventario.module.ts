import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { InventarioRoutingModule } from './inventario-routing.module'; // <-- corregido

@NgModule({
  imports: [
    CommonModule,
    InventarioRoutingModule, 
    SharedModule
  ],
})
export class InventarioModule { }