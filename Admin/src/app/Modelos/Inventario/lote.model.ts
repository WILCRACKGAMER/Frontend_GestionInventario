export class Lote {
    secuencia: number = 0;
    lote_Id: number = 0;
    sucu_Id: number = 0;
    lote_Codigo: string = '';
    lote_Descripcion: string = '';
    prod_Id: number = 0;
    lote_FechaFabricacion: Date = new Date();
    lote_FechaVencimiento: Date = new Date();
    lote_PrecioUnitario: number = 0;
    lote_CantidadProductos: number = 0;
    lote_Stock: number = 0;
    usua_Creacion: number = 0;
    lote_FechaCreacion: Date = new Date()
    usua_Modificacion?: number = 0;
    lote_FechaModificacion?: Date;
    sucursal?: string = '';
    direccion?: string = '';
    producto?: string = '';
    usuarioCreacion?: string = '';
    usuarioModificacion?: string = '';
    dropdownOpen?: boolean = false;
}   