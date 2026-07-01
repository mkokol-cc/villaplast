import { CuentaCorriente } from "./CuentaCorriente";

export interface Proveedor {
  id: number;
  razonSocial: string;
  cuit: string;
  telefono?: string;
  direccion?: string;
  cuentaCorriente?: CuentaCorriente;
  activo: boolean;
  observaciones?: string;
  ultimaCompra?: Date;
  saldoPendiente?: number;
}