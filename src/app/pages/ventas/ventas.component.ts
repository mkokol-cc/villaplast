import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDetalleVentaComponent } from '../../components/modal-detalle-venta/modal-detalle-venta.component';
import { BuscadorClienteComponent } from '../../components/buscador-cliente/buscador-cliente.component';
import { CLIENTES_MOCK, Cliente } from '../../model/Cliente';

import { Venta, EstadoVenta } from '../../model/Venta';
import { MedioPago } from '../../model/Pago';
import { TipoFactura, EstadoFactura } from '../../model/Factura';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
    , MatDialogModule,
    BuscadorClienteComponent
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
  filterForm = new FormGroup({
    cliente: new FormControl<Cliente | string | null>(''),
    fechaDesde: new FormControl(null),
    fechaHasta: new FormControl(null),
    numeroVenta: new FormControl(''),
    estadoFacturacion: new FormControl(''),
    medioPago: new FormControl('')
  });

  displayedColumns: string[] = ['numeroVenta', 'fecha', 'cliente', 'cantidad', 'total', 'estadoPago', 'estadoFacturacion', 'acciones'];

  estadosVenta = Object.values(EstadoVenta);
  mediosPago = Object.values(MedioPago);

  // Mock de datos para auditoría y visualización
  private ventasMock: Venta[] = [
    {
      id: 4582,
      fecha: new Date(2026, 5, 15, 14, 20),
      cliente: { id: 1, razonSocial: 'Juan Pérez', cuitDni: '20-33444555-1', activo: true },
      items: [
        { id: 1, producto: { id: 10, descripcion: 'Bolsas Consorcio 60x90', precioVenta: 1200, stockActual: 100, activo: true, codigoInterno: 'BC01' }, cantidad: 5, precioUnitario: 1200, subtotal: 6000 },
        { id: 2, producto: { id: 11, descripcion: 'Cinta Embalar 48x100', precioVenta: 850, stockActual: 50, activo: true, codigoInterno: 'CE02' }, cantidad: 2, precioUnitario: 850, subtotal: 1700 }
      ],
      pagos: [
        { id: 1, fecha: new Date(), importe: 7700, medioPago: MedioPago.EFECTIVO }
      ],
      total: 7700,
      estado: EstadoVenta.FACTURADA,
      factura: { 
        id: 1, numero: 'B-0001-00004582', tipo: TipoFactura.B, cae: '74258963214587', 
        vencimientoCAE: new Date(2026, 5, 25), fechaEmision: new Date(), estado: EstadoFactura.EMITIDA 
      }
    },
    {
      id: 4583,
      fecha: new Date(2026, 5, 16, 9, 15),
      cliente: { id: 2, razonSocial: 'Papelera Norte', cuitDni: '30-98765432-1', activo: true },
      items: [
        { id: 3, producto: { id: 12, descripcion: 'Rollo Cocina x3', precioVenta: 1500, stockActual: 200, activo: true, codigoInterno: 'RC03' }, cantidad: 10, precioUnitario: 1500, subtotal: 15000 }
      ],
      pagos: [
        { id: 2, fecha: new Date(), importe: 5000, medioPago: MedioPago.TRANSFERENCIA },
        { id: 3, fecha: new Date(), importe: 10000, medioPago: MedioPago.CUENTA_CORRIENTE }
      ],
      total: 15000,
      estado: EstadoVenta.PENDIENTE
    }
  ];

  dataSource = new MatTableDataSource<Venta>([]);
  clientes: Cliente[] = CLIENTES_MOCK.slice();

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  onClienteCreated(cliente: Cliente) {
    if (!cliente) return;
    if (!this.clientes.find(c => c.id === cliente.id)) this.clientes.push(cliente);
    this.filterForm.patchValue({ cliente });
  }

  ngOnInit(): void {
    this.dataSource.data = this.ventasMock;
  } 

  openVentaDetails(venta: Venta) {
    this.dialog.open(ModalDetalleVentaComponent, {
      width: '600px',
      data: { venta: venta }
    });
  }

  getCantidadItems(venta: Venta): number {
    return venta.items.reduce((acc, item) => acc + item.cantidad, 0);
  }

  // This method is used in the table to display payment status, not to open a dialog.
  getEstadoPago(venta: Venta): string {
    const pagado = venta.pagos.reduce((acc, p) => acc + p.importe, 0);
    if (pagado >= venta.total) return 'Pagado';
    if (pagado > 0) return 'Parcial';
    return 'Pendiente';
  }

  getCCAmount(venta: Venta): number {
    return venta.pagos
      .filter(p => p.medioPago === MedioPago.CUENTA_CORRIENTE)
      .reduce((acc, p) => acc + p.importe, 0);
  }

  applyFilters() {
    // Lógica de filtrado en el dataSource
    this.snackBar.open('Filtros aplicados', 'Cerrar', { duration: 2000 });
  }

  limpiarFiltros() {
    this.filterForm.reset();
    this.dataSource.data = this.ventasMock;
  }

}
