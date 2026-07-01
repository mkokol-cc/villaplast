import { CuentaCorriente } from "./CuentaCorriente";

export interface Cliente {
  id: number;
  razonSocial: string;
  cuitDni: string;
  telefono?: string;
  direccion?: string;
  cuentaCorriente?: CuentaCorriente;
  activo: boolean;
  observaciones?: string;
  ultimaCompra?: Date;
  cantidadCompras?: number;
}