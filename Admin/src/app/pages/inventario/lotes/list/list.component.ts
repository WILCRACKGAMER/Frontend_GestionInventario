import { Component, OnInit, HostListener } from '@angular/core';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { CreateComponent } from '../create/create.component';
import { Lote } from 'src/app/Modelos/Inventario/lote.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.prod';

interface LoteConDropdown extends Lote {
  dropdownOpen?: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [BreadcrumbsComponent, CommonModule, CreateComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  
  lotes: LoteConDropdown[] = [];
  lotesPaginados: LoteConDropdown[] = [];
  
  // Paginación
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;
  inicioRegistro: number = 0;
  finRegistro: number = 0;
  paginasVisibles: number[] = [];
  
  cargando: boolean = false;
  
  // Control del formulario de crear
  mostrarFormularioCrear: boolean = false;
  
  // URL del API
  private apiUrl = `${environment.apiBaseUrl}/Lotes/Listar`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarLotes();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeAllDropdowns();
    }
  }

  toggleDropdown(lote: LoteConDropdown): void {
    this.lotesPaginados.forEach(l => {
      if (l.lote_Id !== lote.lote_Id) {
        l.dropdownOpen = false;
      }
    });
    lote.dropdownOpen = !lote.dropdownOpen;
  }

  closeAllDropdowns(): void {
    this.lotesPaginados.forEach(l => l.dropdownOpen = false);
  }

  cargarLotes(): void {
    this.cargando = true;
    
    this.http.get<Lote[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.lotes = data.map(lote => ({...lote, dropdownOpen: false}));
        this.calcularPaginacion();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los lotes:', error);
        this.cargando = false;
      }
    });
  }

  calcularPaginacion(): void {
    this.totalRegistros = this.lotes.length;
    this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
    
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    
    this.lotesPaginados = this.lotes.slice(inicio, fin);
    this.inicioRegistro = this.totalRegistros > 0 ? inicio + 1 : 0;
    this.finRegistro = Math.min(fin, this.totalRegistros);
    
    this.calcularPaginasVisibles();
  }

  calcularPaginasVisibles(): void {
    const maxPaginasVisibles = 5;
    const mitad = Math.floor(maxPaginasVisibles / 2);
    
    let inicio = Math.max(1, this.paginaActual - mitad);
    let fin = Math.min(this.totalPaginas, inicio + maxPaginasVisibles - 1);
    
    if (fin - inicio < maxPaginasVisibles - 1) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }
    
    this.paginasVisibles = [];
    for (let i = inicio; i <= fin; i++) {
      this.paginasVisibles.push(i);
    }
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.calcularPaginacion();
      this.closeAllDropdowns();
    }
  }

  onCrear(): void {
    this.mostrarFormularioCrear = !this.mostrarFormularioCrear;
  }

  onLoteGuardado(): void {
    this.mostrarFormularioCrear = false;
    this.cargarLotes();
  }

  onFormularioCancelado(): void {
    this.mostrarFormularioCrear = false;
  }

  onEditar(lote: LoteConDropdown): void {
    lote.dropdownOpen = false;
    console.log('Editar lote:', lote);
  }

  onEliminar(lote: LoteConDropdown): void {
    lote.dropdownOpen = false;
    console.log('Eliminar lote:', lote);
  }
}