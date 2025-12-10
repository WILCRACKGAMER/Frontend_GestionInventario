export class Salida {
    secuencia: number = 0;
    sali_Id: number = 0;
    sali_Origen: number = 0;
    sali_Destino: number = 0;
    sali_CostoTotal: number = 0;
    sali_UsuarioEnvio: number = 0;
    sali_FechaEnvio: Date = new Date()
    sali_UsuarioRecibido?: number = 0;
    sali_FechaRecibido?: Date;
    usua_Creacion: number = 0;
    sali_FechaCreacion: Date = new Date();
    fechaInicio?: Date;
    fechaFin?: Date;
    usuarioEnvio?: string = '';
    usuarioRecibido?: string = '';
    sucursalOrigen?: string = '';
    direccionOrigen?: string = ''
    sucursalDestino?: string = '';
    direccionDestino?: string = '';
    estado?: string = '';
    usuarioCreacion?: string = '';
}