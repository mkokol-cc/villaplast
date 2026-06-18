import { Cheque } from "./Cheque";

export interface Pago {
  id: number;

  fecha: Date;

  importe: number;

  medioPago: MedioPago;

  cheque?: Cheque;

  observacion?: string;
}
export enum MedioPago {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  TARJETA = 'TARJETA',
  CHEQUE = 'CHEQUE',
  CUENTA_CORRIENTE = 'CUENTA_CORRIENTE'
}