export interface Producto {
  id: number;
  codigoInterno: string;
  codigoBarra?: string;
  descripcion: string;
  precioVenta: number;
  precioCosto?: number;
  stockActual: number;
  stockMinimo?: number;
  activo: boolean;
  imagenUrl?: string;
  categoria?: string;
  proveedorNombre?: string;
}