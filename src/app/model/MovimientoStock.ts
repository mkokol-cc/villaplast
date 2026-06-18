import { Producto } from "./Producto";

export interface MovimientoStock {
  id: number;

  fecha: Date;

  producto: Producto;

  tipo: TipoMovimientoStock;

  cantidad: number;

  referencia?: string;
}
export enum TipoMovimientoStock {
  INGRESO_COMPRA = 'INGRESO_COMPRA',

  VENTA = 'VENTA',

  DEVOLUCION_CLIENTE = 'DEVOLUCION_CLIENTE',

  DEVOLUCION_PROVEEDOR = 'DEVOLUCION_PROVEEDOR',

  AJUSTE_POSITIVO = 'AJUSTE_POSITIVO',

  AJUSTE_NEGATIVO = 'AJUSTE_NEGATIVO'
}