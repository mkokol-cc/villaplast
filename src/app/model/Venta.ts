import { Cliente } from "./Cliente";
import { DetalleVenta } from "./DetalleVenta";
import { Factura } from "./Factura";
import { Pago } from "./Pago";

export interface Venta {
  id: number;
  fecha: Date;

  cliente?: Cliente;

  items: DetalleVenta[];

  pagos: Pago[];

  total: number;

  factura?: Factura;

  estado: EstadoVenta;
}
export enum EstadoVenta {
  PENDIENTE = 'PENDIENTE',
  FACTURADA = 'FACTURADA',
  ANULADA = 'ANULADA'
}