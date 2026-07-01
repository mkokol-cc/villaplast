import { Producto } from './Producto';
import { Proveedor } from './Proveedor';

export interface DetalleIngreso {
  producto: Producto;
  cantidad: number;
}

export interface Ingreso {
  id: number;
  fecha: Date;
  proveedor: Proveedor;
  numeroRemito: string;
  items: DetalleIngreso[];
  usuario: string;
  totalCantidad: number;
}
