import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Lote } from 'src/app/Modelos/Inventario/lote.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create-lote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  
  @Output() onGuardado = new EventEmitter<void>();
  @Output() onCancelado = new EventEmitter<void>();
  
  nuevoLote: Lote = this.inicializarLote();
  guardando: boolean = false;
  
  // Catálogos
  sucursales: any[] = [];
  productos: any[] = [];
  
  // Mensajes
  mensajeError: string = '';
  mensajeExito: string = '';
  
  private apiUrlInsertar = `${environment.apiBaseUrl}/Lote/Insertar`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  inicializarLote(): Lote {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    
    return {
      secuencia: 0,
      lote_Id: 0,
      sucu_Id: 0,
      lote_Codigo: '',
      lote_Descripcion: '',
      prod_Id: 0,
      lote_FechaFabricacion: hoy,
      lote_FechaVencimiento: manana,
      lote_PrecioUnitario: 0,
      lote_CantidadProductos: 0,
      lote_Stock: 0,
      usua_Creacion: 1, // TODO: Obtener del usuario logueado
      lote_FechaCreacion: new Date()
    };
  }

  cargarCatalogos(): void {
    // Cargar sucursales
    this.http.get<any[]>(`${environment.apiBaseUrl}/Sucursales/Listar`).subscribe({
      next: (data) => this.sucursales = data,
      error: (error) => {
        console.error('Error al cargar sucursales:', error);
        this.mensajeError = 'Error al cargar las sucursales';
      }
    });
    
    // Cargar productos
    this.http.get<any[]>(`${environment.apiBaseUrl}/Productos/Listar`).subscribe({
      next: (data) => this.productos = data,
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.mensajeError = 'Error al cargar los productos';
      }
    });
  }

  validarFormulario(): boolean {
    this.mensajeError = '';
    
    if (!this.nuevoLote.lote_Codigo.trim()) {
      this.mensajeError = 'El código del lote es requerido';
      return false;
    }
    
    if (this.nuevoLote.sucu_Id === 0) {
      this.mensajeError = 'Debe seleccionar una sucursal';
      return false;
    }
    
    if (this.nuevoLote.prod_Id === 0) {
      this.mensajeError = 'Debe seleccionar un producto';
      return false;
    }
    
    if (!this.nuevoLote.lote_Descripcion.trim()) {
      this.mensajeError = 'La descripción es requerida';
      return false;
    }
    
    if (this.nuevoLote.lote_PrecioUnitario <= 0) {
      this.mensajeError = 'El precio unitario debe ser mayor a 0';
      return false;
    }
    
    if (this.nuevoLote.lote_CantidadProductos <= 0) {
      this.mensajeError = 'La cantidad de productos debe ser mayor a 0';
      return false;
    }
    
    if (this.nuevoLote.lote_Stock <= 0) {
      this.mensajeError = 'El stock debe ser mayor a 0';
      return false;
    }
    
    if (this.nuevoLote.lote_FechaVencimiento <= this.nuevoLote.lote_FechaFabricacion) {
      this.mensajeError = 'La fecha de vencimiento debe ser posterior a la fecha de fabricación';
      return false;
    }
    
    return true;
  }

  onGuardar(): void {
    if (!this.validarFormulario()) {
      return;
    }
    
    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    
    this.http.post(this.apiUrlInsertar, this.nuevoLote).subscribe({
      next: (response) => {
        this.mensajeExito = 'Lote creado exitosamente';
        this.guardando = false;
        
        // Esperar 1.5 segundos y emitir evento de guardado
        setTimeout(() => {
          this.onGuardado.emit();
          this.limpiarFormulario();
        }, 1500);
      },
      error: (error) => {
        console.error('Error al guardar el lote:', error);
        this.mensajeError = error.error?.mensaje || 'Error al guardar el lote';
        this.guardando = false;
      }
    });
  }

  onCancelar(): void {
    this.limpiarFormulario();
    this.onCancelado.emit();
  }

  limpiarFormulario(): void {
    this.nuevoLote = this.inicializarLote();
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  // Función auxiliar para formatear fechas para input date
  formatearFecha(fecha: Date): string {
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Métodos para actualizar fechas
  onFechaFabricacionChange(event: any): void {
    this.nuevoLote.lote_FechaFabricacion = new Date(event.target.value);
  }

  onFechaVencimientoChange(event: any): void {
    this.nuevoLote.lote_FechaVencimiento = new Date(event.target.value);
  }
}