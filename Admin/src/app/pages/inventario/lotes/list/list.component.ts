import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { TableModule } from 'src/app/pages/table/table.module';
import { Lote } from 'src/app/Modelos/Inventario/lote.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [BreadcrumbsComponent, TableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Inventario' },
      { label: 'Lotes', active: true }
    ];
    // this.cargarAccionesUsuario();

  // this.showEdit = this.accionPermitida('editar');
  // this.showDelete = this.accionPermitida('eliminar');
  // this.showDetails = this.accionPermitida('detalle');
  }
}
