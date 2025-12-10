import { Component, OnInit, HostListener } from '@angular/core';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { Salida } from 'src/app/Modelos/Inventario/salida.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

interface SalidaConDropdown extends Salida {
  dropdownOpen?: boolean;
}

interface FiltrosSalida {
  fechaInicio: string | null;
  fechaFin: string | null;
  sali_Destino: number | null;
}

interface Sucursal {
  sucu_Id: number;
  sucu_Nombre: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [BreadcrumbsComponent, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  salidas: SalidaConDropdown[] = [];
  salidasPaginadas: SalidaConDropdown[] = [];
  sucursales: Sucursal[] = [];
  
  // Paginación
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;
  inicioRegistro: number = 0;
  finRegistro: number = 0;
  paginasVisibles: number[] = [];
  
  cargando: boolean = false;
  
  // Control del panel de filtros
  mostrarFiltros: boolean = false;
  
  // Filtros
  filtros: FiltrosSalida = {
    fechaInicio: null,
    fechaFin: null,
    sali_Destino: null
  };
  
  // URL del API
  private apiUrl = `${environment.apiBaseUrl}/Salida/Listar`;
  private apiSucursalesUrl = `${environment.apiBaseUrl}/Sucursales/Listar`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarSucursales();
    this.cargarSalidas();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeAllDropdowns();
    }
  }

  toggleDropdown(salida: SalidaConDropdown): void {
    this.salidasPaginadas.forEach(s => {
      if (s.sali_Id !== salida.sali_Id) {
        s.dropdownOpen = false;
      }
    });
    salida.dropdownOpen = !salida.dropdownOpen;
  }

  closeAllDropdowns(): void {
    this.salidasPaginadas.forEach(s => s.dropdownOpen = false);
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  cargarSucursales(): void {
    this.http.get<Sucursal[]>(this.apiSucursalesUrl).subscribe({
      next: (data) => {
        this.sucursales = data;
      },
      error: (error) => {
        console.error('Error al cargar las sucursales:', error);
      }
    });
  }

  cargarSalidas(): void {
    this.cargando = true;
    
    const body = {
      fechaInicio: this.filtros.fechaInicio || null,
      fechaFin: this.filtros.fechaFin || null,
      sali_Destino: this.filtros.sali_Destino || null
    };
    
    this.http.post<Salida[]>(this.apiUrl, body).subscribe({
      next: (data) => {
        this.salidas = data.map(salida => ({...salida, dropdownOpen: false}));
        this.paginaActual = 1;
        this.calcularPaginacion();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar las salidas:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las salidas',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.cargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.cargarSalidas();
  }

  limpiarFiltros(): void {
    this.filtros = {
      fechaInicio: null,
      fechaFin: null,
      sali_Destino: null
    };
    this.cargarSalidas();
  }

  calcularPaginacion(): void {
    this.totalRegistros = this.salidas.length;
    this.totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
    
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    
    this.salidasPaginadas = this.salidas.slice(inicio, fin);
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
    Swal.fire({
      title: 'Información',
      text: 'Funcionalidad en desarrollo',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  onVerDetalle(salida: SalidaConDropdown): void {
    salida.dropdownOpen = false;
    Swal.fire({
      title: 'Ver Detalle',
      text: `Mostrando detalles de la salida #${salida.sali_Id}`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  onEditar(salida: SalidaConDropdown): void {
    salida.dropdownOpen = false;
    Swal.fire({
      title: 'Recibir',
      text: `Recibir salida #${salida.sali_Id}`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  onEliminar(salida: SalidaConDropdown): void {
    salida.dropdownOpen = false;
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este registro de salida?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarSalida(salida.sali_Id);
      }
    });
  }

  eliminarSalida(salidaId: number): void {
    const urlEliminar = `${environment.apiBaseUrl}/Salida/Eliminar`;
    this.http.post(urlEliminar, { sali_Id: salidaId }).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El registro ha sido eliminado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.cargarSalidas();
      },
      error: (error) => {
        console.error('Error al eliminar la salida:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar el registro',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}