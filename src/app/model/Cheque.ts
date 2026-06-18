export interface Cheque {
  id: number;

  numero: string;

  banco: string;

  fechaEmision: Date;

  fechaVencimiento: Date;

  importe: number;

  estado: EstadoCheque;
}
export enum EstadoCheque {
  PENDIENTE = 'PENDIENTE',
  DEPOSITADO = 'DEPOSITADO',
  COBRADO = 'COBRADO',
  RECHAZADO = 'RECHAZADO'
}