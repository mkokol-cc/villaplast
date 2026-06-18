import { DetalleCompra } from "./DetalleCompra";
import { Proveedor } from "./Proveedor";

export interface Compra {
  id: number;

  fecha: Date;

  proveedor: Proveedor;

  items: DetalleCompra[];

  total: number;
}