export interface CierreCaja {
  id: number;
  fecha: Date;
  hora: string;
  totalVendido: number;
  cantidadVentas: number;
  totalPorMedioPago: { medioPago: string; total: number }[];
  montoInicial: number;
}
