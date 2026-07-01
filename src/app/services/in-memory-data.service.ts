import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const clientes = [
      { id: 1, razonSocial: 'Juan Pérez', cuitDni: '20-33444555-1', telefono: '11 5566-7788', direccion: 'Calle Falsa 123, CABA', activo: true, observaciones: 'Cliente habitual, siempre paga a término.', ultimaCompra: '2026-06-10T00:00:00.000Z', cantidadCompras: 15, cuentaCorriente: { id: 1, movimientos: [] } },
      { id: 2, razonSocial: 'Villaplast Distribuidora', cuitDni: '30-11222333-4', telefono: '11 4455-6677', direccion: 'Av. Corrientes 500, CABA', activo: true, observaciones: 'Requiere factura A.', ultimaCompra: '2026-05-25T00:00:00.000Z', cantidadCompras: 42, cuentaCorriente: { id: 2, movimientos: [] } },
      { id: 3, razonSocial: 'María García', cuitDni: '27-99888777-2', telefono: '11 2233-4455', activo: false, ultimaCompra: '2025-12-15T00:00:00.000Z', cantidadCompras: 3, cuentaCorriente: { id: 3, movimientos: [] } },
      { id: 4, razonSocial: 'Carlos Rodríguez', cuitDni: '20-55667788-3', telefono: '11 7788-9900', direccion: 'Belgrano 850, CABA', activo: true, observaciones: 'Nuevo cliente, referido por Juan Pérez.', ultimaCompra: '2026-06-20T00:00:00.000Z', cantidadCompras: 2, cuentaCorriente: { id: 4, movimientos: [] } },
      { id: 5, razonSocial: 'Comercial del Oeste SRL', cuitDni: '30-99887766-1', telefono: '11 3344-5566', direccion: 'Av. Rivadavia 12000, Merlo', activo: true, observaciones: 'Empresa de logística, compras por mayor.', ultimaCompra: '2026-06-25T00:00:00.000Z', cantidadCompras: 8, cuentaCorriente: { id: 5, movimientos: [] } },
    ];

    const productos = [
      { id: 1, codigoInterno: 'PAN001', descripcion: 'Pan Artesanal', codigoBarra: '779123456', precioVenta: 1200, precioCosto: 600, stockActual: 20, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2821/2821804.png', categoria: 'Panadería' },
      { id: 2, codigoInterno: 'LEC001', descripcion: 'Leche Entera', codigoBarra: '779987654', precioVenta: 1500, precioCosto: 900, stockActual: 50, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/869/869504.png', categoria: 'Lácteos' },
      { id: 3, codigoInterno: 'CAF001', descripcion: 'Café Molido', codigoBarra: '779456123', precioVenta: 4500, precioCosto: 2800, stockActual: 15, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/924/924514.png', categoria: 'Bebidas' },
      { id: 4, codigoInterno: 'QUE001', descripcion: 'Queso Crema', codigoBarra: '779321654', precioVenta: 2800, precioCosto: 1600, stockActual: 10, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/4813/4813075.png', categoria: 'Lácteos' },
      { id: 5, codigoInterno: 'MAN001', descripcion: 'Manzanas Rojas', codigoBarra: '779112233', precioVenta: 350, precioCosto: 180, stockActual: 100, stockMinimo: 20, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1032/1032549.png', categoria: 'Frutas y Verduras' },
      { id: 6, codigoInterno: 'JUG001', descripcion: 'Jugo de Naranja', codigoBarra: '779445566', precioVenta: 1800, precioCosto: 950, stockActual: 30, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Bebidas' },
      { id: 7, codigoInterno: 'GAL001', descripcion: 'Galletas Surtidas', codigoBarra: '779778899', precioVenta: 950, precioCosto: 500, stockActual: 40, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/859/859283.png', categoria: 'Snacks' },
      { id: 8, codigoInterno: 'AGU001', descripcion: 'Agua Mineral 1.5L', codigoBarra: '779101010', precioVenta: 600, precioCosto: 300, stockActual: 60, stockMinimo: 20, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2402/2402120.png', categoria: 'Bebidas' },
      { id: 9, codigoInterno: 'ARR001', descripcion: 'Arroz Blanco 1kg', codigoBarra: '779202020', precioVenta: 1100, precioCosto: 700, stockActual: 25, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Cereales' },
      { id: 10, codigoInterno: 'FID001', descripcion: 'Fideos Largos', codigoBarra: '779303030', precioVenta: 850, precioCosto: 450, stockActual: 35, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046755.png', categoria: 'Cereales' },
      { id: 11, codigoInterno: 'ACE001', descripcion: 'Aceite de Girasol', codigoBarra: '779404040', precioVenta: 2500, precioCosto: 1500, stockActual: 12, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 12, codigoInterno: 'DET001', descripcion: 'Detergente Ropa', codigoBarra: '779505050', precioVenta: 3200, precioCosto: 1800, stockActual: 18, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 13, codigoInterno: 'JAB001', descripcion: 'Jabón de Tocador', codigoBarra: '779606060', precioVenta: 400, precioCosto: 200, stockActual: 45, stockMinimo: 15, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 14, codigoInterno: 'PAP001', descripcion: 'Papel Higiénico', codigoBarra: '779707070', precioVenta: 1600, precioCosto: 900, stockActual: 22, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 15, codigoInterno: 'BOL001', descripcion: 'Bolsas Consorcio 60x90', codigoBarra: '779808080', precioVenta: 1200, precioCosto: 700, stockActual: 100, stockMinimo: 30, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 16, codigoInterno: 'CIN001', descripcion: 'Cinta Embalar 48x100', codigoBarra: '779909090', precioVenta: 850, precioCosto: 400, stockActual: 50, stockMinimo: 15, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 17, codigoInterno: 'ROL001', descripcion: 'Rollo Cocina x3', codigoBarra: '779010101', precioVenta: 1500, precioCosto: 800, stockActual: 200, stockMinimo: 40, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 18, codigoInterno: 'PHP001', descripcion: 'Papel Higiénico Premium x4', codigoBarra: '779020202', precioVenta: 2200, precioCosto: 1200, stockActual: 150, stockMinimo: 30, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 19, codigoInterno: 'VAS001', descripcion: 'Vasos Descartables x50', codigoBarra: '779030303', precioVenta: 800, precioCosto: 400, stockActual: 80, stockMinimo: 20, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
      { id: 20, codigoInterno: 'SER001', descripcion: 'Servilletas x100', codigoBarra: '779040404', precioVenta: 600, precioCosto: 300, stockActual: 120, stockMinimo: 30, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png', categoria: 'Limpieza' },
    ];

    const proveedores = [
      { id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', telefono: '011 4567-8900', direccion: 'Av. Corrientes 1234, CABA', activo: true, ultimaCompra: '2026-06-12T00:00:00.000Z', observaciones: 'Proveedor principal de bolsas y descartables.', saldoPendiente: 15000 },
      { id: 2, razonSocial: 'Papelera Norte', cuit: '30-98765432-1', telefono: '011 4321-0011', direccion: 'Ruta 8 Km 50, Pilar', activo: true, ultimaCompra: '2026-05-20T00:00:00.000Z', observaciones: 'Entregas solo los martes.', saldoPendiente: 8000 },
      { id: 3, razonSocial: 'Insumos Pro', cuit: '20-11223344-5', telefono: '0230 445-6677', activo: false, ultimaCompra: '2025-11-30T00:00:00.000Z', observaciones: 'Cuenta suspendida por cambio de firma.', saldoPendiente: 0 },
      { id: 4, razonSocial: 'Plásticos del Sur', cuit: '30-55667788-2', telefono: '011 5678-9012', direccion: 'Av. Mitre 3400, Avellaneda', activo: true, ultimaCompra: '2026-06-18T00:00:00.000Z', observaciones: 'Especialistas en plásticos descartables.', saldoPendiente: 5000 },
      { id: 5, razonSocial: 'Envases S.A.', cuit: '30-11223344-6', telefono: '011 6789-0123', direccion: 'Calle 12 N° 450, La Plata', activo: true, ultimaCompra: '2026-06-28T00:00:00.000Z', observaciones: 'Envases y packaging en general.', saldoPendiente: 0 },
    ];

    const ventas = [
      {
        id: 4582, fecha: '2026-06-15T14:20:00.000Z',
        cliente: { id: 1, razonSocial: 'Juan Pérez', cuitDni: '20-33444555-1', activo: true },
        items: [
          { id: 1, producto: { id: 15, descripcion: 'Bolsas Consorcio 60x90', precioVenta: 1200, stockActual: 100, activo: true, codigoInterno: 'BOL001' }, cantidad: 5, precioUnitario: 1200, subtotal: 6000 },
          { id: 2, producto: { id: 16, descripcion: 'Cinta Embalar 48x100', precioVenta: 850, stockActual: 50, activo: true, codigoInterno: 'CIN001' }, cantidad: 2, precioUnitario: 850, subtotal: 1700 },
        ],
        pagos: [{ id: 1, fecha: '2026-06-15T14:20:00.000Z', importe: 7700, medioPago: 'EFECTIVO' }],
        total: 7700, estado: 'FACTURADA',
        factura: { id: 1, numero: 'B-0001-00004582', tipo: 'B', cae: '74258963214587', vencimientoCAE: '2026-06-25T00:00:00.000Z', fechaEmision: '2026-06-15T14:20:00.000Z', estado: 'EMITIDA' },
      },
      {
        id: 4583, fecha: '2026-06-16T09:15:00.000Z',
        cliente: { id: 2, razonSocial: 'Papelera Norte', cuitDni: '30-98765432-1', activo: true },
        items: [
          { id: 3, producto: { id: 17, descripcion: 'Rollo Cocina x3', precioVenta: 1500, stockActual: 200, activo: true, codigoInterno: 'ROL001' }, cantidad: 10, precioUnitario: 1500, subtotal: 15000 },
        ],
        pagos: [
          { id: 2, fecha: '2026-06-16T09:15:00.000Z', importe: 5000, medioPago: 'TRANSFERENCIA' },
          { id: 3, fecha: '2026-06-16T09:15:00.000Z', importe: 10000, medioPago: 'CUENTA_CORRIENTE' },
        ],
        total: 15000, estado: 'PENDIENTE',
      },
      {
        id: 4584, fecha: '2026-06-20T11:00:00.000Z',
        cliente: { id: 3, razonSocial: 'María García', cuitDni: '27-99888777-2', activo: false },
        items: [
          { id: 4, producto: { id: 1, descripcion: 'Pan Artesanal', precioVenta: 1200, stockActual: 20, activo: true, codigoInterno: 'PAN001' }, cantidad: 3, precioUnitario: 1200, subtotal: 3600 },
          { id: 5, producto: { id: 6, descripcion: 'Jugo de Naranja', precioVenta: 1800, stockActual: 30, activo: true, codigoInterno: 'JUG001' }, cantidad: 2, precioUnitario: 1800, subtotal: 3600 },
        ],
        pagos: [{ id: 4, fecha: '2026-06-20T11:00:00.000Z', importe: 7200, medioPago: 'EFECTIVO' }],
        total: 7200, estado: 'FACTURADA',
        factura: { id: 2, numero: 'B-0001-00004583', tipo: 'B', cae: '85236974102583', vencimientoCAE: '2026-06-30T00:00:00.000Z', fechaEmision: '2026-06-20T11:00:00.000Z', estado: 'EMITIDA' },
      },
      {
        id: 4585, fecha: '2026-06-22T16:30:00.000Z',
        cliente: { id: 4, razonSocial: 'Carlos Rodríguez', cuitDni: '20-55667788-3', activo: true },
        items: [
          { id: 6, producto: { id: 11, descripcion: 'Aceite de Girasol', precioVenta: 2500, stockActual: 12, activo: true, codigoInterno: 'ACE001' }, cantidad: 5, precioUnitario: 2500, subtotal: 12500 },
          { id: 7, producto: { id: 8, descripcion: 'Agua Mineral 1.5L', precioVenta: 600, stockActual: 60, activo: true, codigoInterno: 'AGU001' }, cantidad: 10, precioUnitario: 600, subtotal: 6000 },
        ],
        pagos: [{ id: 5, fecha: '2026-06-22T16:30:00.000Z', importe: 18500, medioPago: 'TRANSFERENCIA' }],
        total: 18500, estado: 'FACTURADA',
        factura: { id: 3, numero: 'B-0001-00004584', tipo: 'B', cae: '96325874102584', vencimientoCAE: '2026-07-02T00:00:00.000Z', fechaEmision: '2026-06-22T16:30:00.000Z', estado: 'EMITIDA' },
      },
      {
        id: 4586, fecha: '2026-06-25T08:45:00.000Z',
        cliente: { id: 5, razonSocial: 'Comercial del Oeste SRL', cuitDni: '30-99887766-1', activo: true },
        items: [
          { id: 8, producto: { id: 12, descripcion: 'Detergente Ropa', precioVenta: 3200, stockActual: 18, activo: true, codigoInterno: 'DET001' }, cantidad: 8, precioUnitario: 3200, subtotal: 25600 },
          { id: 9, producto: { id: 19, descripcion: 'Vasos Descartables x50', precioVenta: 800, stockActual: 80, activo: true, codigoInterno: 'VAS001' }, cantidad: 20, precioUnitario: 800, subtotal: 16000 },
        ],
        pagos: [{ id: 6, fecha: '2026-06-25T08:45:00.000Z', importe: 41600, medioPago: 'CUENTA_CORRIENTE' }],
        total: 41600, estado: 'PENDIENTE',
      },
    ];

    const ingresos = [
      {
        id: 1, fecha: '2026-06-10T10:30:00.000Z',
        proveedor: { id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', activo: true },
        numeroRemito: 'R-0001-00004562', usuario: 'matias.admin', totalCantidad: 150,
        items: [
          { producto: { id: 15, descripcion: 'Bolsas Consorcio 60x90', stockActual: 500, activo: true, codigoInterno: 'BOL001' }, cantidad: 100 },
          { producto: { id: 18, descripcion: 'Papel Higiénico Premium x4', stockActual: 200, activo: true, codigoInterno: 'PHP001' }, cantidad: 50 },
        ],
      },
      {
        id: 2, fecha: '2026-06-12T15:45:00.000Z',
        proveedor: { id: 2, razonSocial: 'Papelera Norte', cuit: '30-98765432-1', activo: true },
        numeroRemito: 'R-0002-00001234', usuario: 'esteban.user', totalCantidad: 80,
        items: [
          { producto: { id: 17, descripcion: 'Rollo Cocina x3', stockActual: 300, activo: true, codigoInterno: 'ROL001' }, cantidad: 80 },
        ],
      },
      {
        id: 3, fecha: '2026-06-18T09:00:00.000Z',
        proveedor: { id: 4, razonSocial: 'Plásticos del Sur', cuit: '30-55667788-2', activo: true },
        numeroRemito: 'R-0003-00007890', usuario: 'matias.admin', totalCantidad: 350,
        items: [
          { producto: { id: 19, descripcion: 'Vasos Descartables x50', stockActual: 80, activo: true, codigoInterno: 'VAS001' }, cantidad: 200 },
          { producto: { id: 20, descripcion: 'Servilletas x100', stockActual: 120, activo: true, codigoInterno: 'SER001' }, cantidad: 150 },
        ],
      },
      {
        id: 4, fecha: '2026-06-22T14:20:00.000Z',
        proveedor: { id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', activo: true },
        numeroRemito: 'R-0004-00005678', usuario: 'esteban.user', totalCantidad: 130,
        items: [
          { producto: { id: 1, descripcion: 'Pan Artesanal', stockActual: 20, activo: true, codigoInterno: 'PAN001' }, cantidad: 30 },
          { producto: { id: 2, descripcion: 'Leche Entera', stockActual: 50, activo: true, codigoInterno: 'LEC001' }, cantidad: 60 },
          { producto: { id: 6, descripcion: 'Jugo de Naranja', stockActual: 30, activo: true, codigoInterno: 'JUG001' }, cantidad: 40 },
        ],
      },
      {
        id: 5, fecha: '2026-06-28T11:30:00.000Z',
        proveedor: { id: 5, razonSocial: 'Envases S.A.', cuit: '30-11223344-6', activo: true },
        numeroRemito: 'R-0005-00003456', usuario: 'matias.admin', totalCantidad: 200,
        items: [
          { producto: { id: 20, descripcion: 'Servilletas x100', stockActual: 120, activo: true, codigoInterno: 'SER001' }, cantidad: 200 },
        ],
      },
    ];

    const movimientosStock = [
      { id: 1, fecha: '2026-06-10T10:30:00.000Z', producto: { id: 15, descripcion: 'Bolsas Consorcio 60x90', codigoInterno: 'BOL001' }, tipo: 'INGRESO', cantidad: 100, referencia: 'R-0001-00004562' },
      { id: 2, fecha: '2026-06-10T10:30:00.000Z', producto: { id: 18, descripcion: 'Papel Higiénico Premium x4', codigoInterno: 'PHP001' }, tipo: 'INGRESO', cantidad: 50, referencia: 'R-0001-00004562' },
      { id: 3, fecha: '2026-06-12T15:45:00.000Z', producto: { id: 17, descripcion: 'Rollo Cocina x3', codigoInterno: 'ROL001' }, tipo: 'INGRESO', cantidad: 80, referencia: 'R-0002-00001234' },
      { id: 4, fecha: '2026-06-15T14:20:00.000Z', producto: { id: 15, descripcion: 'Bolsas Consorcio 60x90', codigoInterno: 'BOL001' }, tipo: 'EGRESO', cantidad: 5, referencia: 'V-4582' },
      { id: 5, fecha: '2026-06-15T14:20:00.000Z', producto: { id: 16, descripcion: 'Cinta Embalar 48x100', codigoInterno: 'CIN001' }, tipo: 'EGRESO', cantidad: 2, referencia: 'V-4582' },
      { id: 6, fecha: '2026-06-16T09:15:00.000Z', producto: { id: 17, descripcion: 'Rollo Cocina x3', codigoInterno: 'ROL001' }, tipo: 'EGRESO', cantidad: 10, referencia: 'V-4583' },
      { id: 7, fecha: '2026-06-18T09:00:00.000Z', producto: { id: 19, descripcion: 'Vasos Descartables x50', codigoInterno: 'VAS001' }, tipo: 'INGRESO', cantidad: 200, referencia: 'R-0003-00007890' },
      { id: 8, fecha: '2026-06-18T09:00:00.000Z', producto: { id: 20, descripcion: 'Servilletas x100', codigoInterno: 'SER001' }, tipo: 'INGRESO', cantidad: 150, referencia: 'R-0003-00007890' },
      { id: 9, fecha: '2026-06-22T14:20:00.000Z', producto: { id: 1, descripcion: 'Pan Artesanal', codigoInterno: 'PAN001' }, tipo: 'INGRESO', cantidad: 30, referencia: 'R-0004-00005678' },
      { id: 10, fecha: '2026-06-25T08:45:00.000Z', producto: { id: 12, descripcion: 'Detergente Ropa', codigoInterno: 'DET001' }, tipo: 'EGRESO', cantidad: 8, referencia: 'V-4586' },
    ];

    const cierresCaja = [
      { id: 1, fecha: '2026-06-30T00:00:00.000Z', hora: '19:30', totalVendido: 22700, cantidadVentas: 2, totalPorMedioPago: [{ medioPago: 'EFECTIVO', total: 7700 }, { medioPago: 'TRANSFERENCIA', total: 5000 }, { medioPago: 'CUENTA_CORRIENTE', total: 10000 }], montoInicial: 0 },
      { id: 2, fecha: '2026-06-29T00:00:00.000Z', hora: '18:45', totalVendido: 15000, cantidadVentas: 1, totalPorMedioPago: [{ medioPago: 'TRANSFERENCIA', total: 15000 }], montoInicial: 5000 },
      { id: 3, fecha: '2026-06-28T00:00:00.000Z', hora: '20:00', totalVendido: 7200, cantidadVentas: 1, totalPorMedioPago: [{ medioPago: 'EFECTIVO', total: 7200 }], montoInicial: 2000 },
      { id: 4, fecha: '2026-06-25T00:00:00.000Z', hora: '19:00', totalVendido: 41600, cantidadVentas: 1, totalPorMedioPago: [{ medioPago: 'CUENTA_CORRIENTE', total: 41600 }], montoInicial: 0 },
      { id: 5, fecha: '2026-06-22T00:00:00.000Z', hora: '18:30', totalVendido: 25700, cantidadVentas: 2, totalPorMedioPago: [{ medioPago: 'TRANSFERENCIA', total: 18500 }, { medioPago: 'EFECTIVO', total: 7200 }], montoInicial: 3000 },
    ];

    const compras = [
      { id: 1, fecha: '2026-06-10T10:30:00.000Z', proveedor: { id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', activo: true }, total: 180000, items: [
        { id: 1, producto: { id: 15, descripcion: 'Bolsas Consorcio 60x90', codigoInterno: 'BOL001' }, cantidad: 100, costoUnitario: 700, subtotal: 70000 },
        { id: 2, producto: { id: 18, descripcion: 'Papel Higiénico Premium x4', codigoInterno: 'PHP001' }, cantidad: 50, costoUnitario: 1200, subtotal: 60000 },
      ]},
      { id: 2, fecha: '2026-06-12T15:45:00.000Z', proveedor: { id: 2, razonSocial: 'Papelera Norte', cuit: '30-98765432-1', activo: true }, total: 64000, items: [
        { id: 3, producto: { id: 17, descripcion: 'Rollo Cocina x3', codigoInterno: 'ROL001' }, cantidad: 80, costoUnitario: 800, subtotal: 64000 },
      ]},
      { id: 3, fecha: '2026-06-18T09:00:00.000Z', proveedor: { id: 4, razonSocial: 'Plásticos del Sur', cuit: '30-55667788-2', activo: true }, total: 140000, items: [
        { id: 4, producto: { id: 19, descripcion: 'Vasos Descartables x50', codigoInterno: 'VAS001' }, cantidad: 200, costoUnitario: 400, subtotal: 80000 },
        { id: 5, producto: { id: 20, descripcion: 'Servilletas x100', codigoInterno: 'SER001' }, cantidad: 150, costoUnitario: 400, subtotal: 60000 },
      ]},
      { id: 4, fecha: '2026-06-22T14:20:00.000Z', proveedor: { id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', activo: true }, total: 99500, items: [
        { id: 6, producto: { id: 1, descripcion: 'Pan Artesanal', codigoInterno: 'PAN001' }, cantidad: 30, costoUnitario: 600, subtotal: 18000 },
        { id: 7, producto: { id: 2, descripcion: 'Leche Entera', codigoInterno: 'LEC001' }, cantidad: 60, costoUnitario: 900, subtotal: 54000 },
        { id: 8, producto: { id: 6, descripcion: 'Jugo de Naranja', codigoInterno: 'JUG001' }, cantidad: 40, costoUnitario: 950, subtotal: 38000 },
      ]},
    ];

    const categorias = ['Lácteos', 'Carnes', 'Pescados', 'Panadería', 'Bebidas', 'Frutas y Verduras', 'Cereales', 'Snacks', 'Limpieza', 'Higiene'];

    return { clientes, productos, proveedores, ventas, ingresos, movimientosStock, cierresCaja, compras, categorias };
  }
}
