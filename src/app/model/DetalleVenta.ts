import { Producto } from "./Producto";

export interface DetalleVenta {
  id: number;

  producto: Producto;

  cantidad: number;

  precioUnitario: number;

  subtotal: number;
}