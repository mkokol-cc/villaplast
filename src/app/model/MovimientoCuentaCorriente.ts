export interface MovimientoCuentaCorriente {
  id: number;

  fecha: Date;

  concepto: string;

  debe: number;

  haber: number;

  saldoResultante: number;
}