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

// Mock de datos para demostración
  export const PROVEEDORES_MOCK: Proveedor[] = [
    { 
      id: 1, 
      razonSocial: 'Distribuidora Villaplast', 
      cuit: '30-12345678-9', 
      telefono: '011 4567-8900', 
      activo: true, 
      ultimaCompra: new Date(2026, 5, 12),
      observaciones: 'Proveedor principal de bolsas y descartables.',
      direccion: 'Av. Corrientes 1234, CABA'
    },
    { 
      id: 2, 
      razonSocial: 'Papelera Norte', 
      cuit: '30-98765432-1', 
      telefono: '011 4321-0011', 
      activo: true, 
      ultimaCompra: new Date(2026, 4, 20),
      observaciones: 'Entregas solo los martes.',
      direccion: 'Ruta 8 Km 50, Pilar'
    },
    { 
      id: 3, 
      razonSocial: 'Insumos Pro', 
      cuit: '20-11223344-5', 
      telefono: '0230 445-6677', 
      activo: false, 
      ultimaCompra: new Date(2025, 11, 0),
      observaciones: 'Cuenta suspendida por cambio de firma.'
    }
  ];