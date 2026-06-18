export interface Factura {
  id: number;

  numero: string;

  tipo: TipoFactura;

  cae?: string;

  vencimientoCAE?: Date;

  fechaEmision: Date;

  estado: EstadoFactura;
}
export enum TipoFactura {
  A = 'A',
  B = 'B',
  C = 'C'
}
export enum EstadoFactura {
  PENDIENTE = 'PENDIENTE',
  EMITIDA = 'EMITIDA',
  RECHAZADA = 'RECHAZADA',
  ANULADA = 'ANULADA'
}