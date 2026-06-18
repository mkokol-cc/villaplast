import { Producto } from "./Producto";

export interface DetalleCompra {
  id: number;

  producto: Producto;

  cantidad: number;

  costoUnitario: number;

  subtotal: number;
}