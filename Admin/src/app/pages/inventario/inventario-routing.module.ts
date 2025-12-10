import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'lotes',
    loadChildren: () =>
      import('./lotes/lotes.module').then(m => m.LotesModule),
  },
  {
    path: 'salidas',
    loadChildren: () =>
      import('./salidas/salidas.module').then(m => m.SalidasModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}