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

export const CLIENTES_MOCK: Cliente[] = [
    {
      id: 1,
      razonSocial: 'Juan Pérez',
      cuitDni: '20-33444555-1',
      telefono: '11 5566-7788',
      direccion: 'Calle Falsa 123, CABA',
      activo: true,
      observaciones: 'Cliente habitual, siempre paga a término.',
      ultimaCompra: new Date(2026, 5, 10),
      cantidadCompras: 15,
      cuentaCorriente: { id: 1, movimientos: [] }
    },
    {
      id: 2,
      razonSocial: 'Villaplast Distribuidora',
      cuitDni: '30-11222333-4',
      telefono: '11 4455-6677',
      direccion: 'Av. Corrientes 500, CABA',
      activo: true,
      observaciones: 'Requiere factura A.',
      ultimaCompra: new Date(2026, 4, 25),
      cantidadCompras: 42,
      cuentaCorriente: { id: 2, movimientos: [] }
    },
    {
      id: 3,
      razonSocial: 'María García',
      cuitDni: '27-99888777-2',
      telefono: '11 2233-4455',
      activo: false,
      ultimaCompra: new Date(2025, 11, 15),
      cantidadCompras: 3,
      cuentaCorriente: { id: 3, movimientos: [] }
    }
  ];