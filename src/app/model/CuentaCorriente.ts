import { MovimientoCuentaCorriente } from "./MovimientoCuentaCorriente";

export interface CuentaCorriente {
  id: number;

  movimientos: MovimientoCuentaCorriente[];
}