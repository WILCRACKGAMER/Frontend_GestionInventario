import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Lote } from 'src/app/Modelos/Inventario/lote.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-lote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnChanges {
  
  @Input() loteId: number = 0;
  @Output() onActualizado = new EventEmitter<void>();
  @Output() onCancelado = new EventEmitter<void>();
  
  loteEditado: Lote = this.inicializarLote();
  guardando: boolean = false;
  cargando: boolean = true;
  
  // Fechas en formato string para los inputs
  fechaFabricacionStr: string = '';
  fechaVencimientoStr: string = '';
  
  // Catálogos
  sucursales: any[] = [];
  productos: any[] = [];
  
  // Mensajes
  mensajeError: string = '';
  mensajeExito: string = '';
  
  private apiUrlActualizar = `${environment.apiBaseUrl}/Lote/Actualizar`;
  private apiUrlDetalle = `${environment.apiBaseUrl}/Lote/Detalle`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('EditComponent - ngOnInit - loteId:', this.loteId);
    this.cargarCatalogos();
    if (this.loteId > 0) {
      this.cargarLote();
    } else {
      console.warn('EditComponent - loteId es 0 o undefined');
      this.cargando = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('EditComponent - ngOnChanges:', changes);
    if (changes['loteId'] && !changes['loteId'].firstChange && changes['loteId'].currentValue > 0) {
      console.log('loteId cambió a:', changes['loteId'].currentValue);
      this.cargarLote();
    }
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
      usua_Creacion: 1,
      lote_FechaCreacion: new Date()
    };
  }

  cargarLote(): void {
    this.cargando = true;
    
    const body = {
      lote_Id: this.loteId
    };
    
    console.log('Cargando lote con body:', body);
    
    this.http.post<Lote[]>(this.apiUrlDetalle, body).subscribe({
      next: (data) => {
        console.log('Datos del lote recibidos:', data);
        
        // El API devuelve un array, tomamos el primer elemento
        if (data && data.length > 0) {
          const loteData = data[0];
          this.loteEditado = {
            ...loteData,
            lote_FechaFabricacion: new Date(loteData.lote_FechaFabricacion),
            lote_FechaVencimiento: new Date(loteData.lote_FechaVencimiento)
          };
          
          // Formatear fechas para los inputs
          this.fechaFabricacionStr = this.formatearFecha(this.loteEditado.lote_FechaFabricacion);
          this.fechaVencimientoStr = this.formatearFecha(this.loteEditado.lote_FechaVencimiento);
          
          console.log('Lote editado asignado:', this.loteEditado);
          console.log('Fechas formateadas:', this.fechaFabricacionStr, this.fechaVencimientoStr);
        } else {
          this.mensajeError = 'No se encontró el lote solicitado';
        }
        
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el lote:', error);
        this.mensajeError = 'Error al cargar los datos del lote';
        this.cargando = false;
      }
    });
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
    
    if (!this.loteEditado.lote_Codigo.trim()) {
      this.mensajeError = 'El código del lote es requerido';
      return false;
    }
    
    if (this.loteEditado.sucu_Id === 0) {
      this.mensajeError = 'Debe seleccionar una sucursal';
      return false;
    }
    
    if (this.loteEditado.prod_Id === 0) {
      this.mensajeError = 'Debe seleccionar un producto';
      return false;
    }
    
    if (!this.loteEditado.lote_Descripcion.trim()) {
      this.mensajeError = 'La descripción es requerida';
      return false;
    }
    
    if (this.loteEditado.lote_PrecioUnitario <= 0) {
      this.mensajeError = 'El precio unitario debe ser mayor a 0';
      return false;
    }
    
    if (this.loteEditado.lote_CantidadProductos <= 0) {
      this.mensajeError = 'La cantidad de productos debe ser mayor a 0';
      return false;
    }
    
    if (this.loteEditado.lote_Stock <= 0) {
      this.mensajeError = 'El stock debe ser mayor a 0';
      return false;
    }
    
    if (this.loteEditado.lote_FechaVencimiento <= this.loteEditado.lote_FechaFabricacion) {
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
    
    this.http.put(this.apiUrlActualizar, this.loteEditado).subscribe({
      next: (response) => {
        this.mensajeExito = 'Lote actualizado exitosamente';
        this.guardando = false;
        
        // Esperar 1.5 segundos y emitir evento de actualización
        setTimeout(() => {
          this.onActualizado.emit();
        }, 1500);
      },
      error: (error) => {
        console.error('Error al actualizar el lote:', error);
        this.mensajeError = error.error?.mensaje || 'Error al actualizar el lote';
        this.guardando = false;
      }
    });
  }

  onCancelar(): void {
    this.onCancelado.emit();
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
    const fecha = event.target.value;
    this.fechaFabricacionStr = fecha;
    this.loteEditado.lote_FechaFabricacion = new Date(fecha);
    console.log('Fecha fabricación actualizada:', this.loteEditado.lote_FechaFabricacion);
  }

  onFechaVencimientoChange(event: any): void {
    const fecha = event.target.value;
    this.fechaVencimientoStr = fecha;
    this.loteEditado.lote_FechaVencimiento = new Date(fecha);
    console.log('Fecha vencimiento actualizada:', this.loteEditado.lote_FechaVencimiento);
  }
}