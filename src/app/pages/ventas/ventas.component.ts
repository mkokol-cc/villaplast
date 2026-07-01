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
import { Cliente } from '../../model/Cliente';
import { ClientesService } from '../../services/clientes.service';
import { VentasService } from '../../services/ventas.service';

import { Venta, EstadoVenta } from '../../model/Venta';
import { MedioPago } from '../../model/Pago';

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
    MatChipsModule,
    MatDialogModule,
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

  dataSource = new MatTableDataSource<Venta>([]);
  clientes: Cliente[] = [];
  private ventas: Venta[] = [];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private ventasService: VentasService, private clientesService: ClientesService) {}

  onClienteCreated(cliente: Cliente) {
    if (!cliente) return;
    if (!this.clientes.find(c => c.id === cliente.id)) this.clientes.push(cliente);
    this.filterForm.patchValue({ cliente });
  }

  ngOnInit(): void {
    this.ventasService.getAll().subscribe(data => {
      this.ventas = data;
      this.dataSource.data = this.ventas;
    });
    this.clientesService.getAll().subscribe(data => {
      this.clientes = data;
    });
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
    this.snackBar.open('Filtros aplicados', 'Cerrar', { duration: 2000 });
  }

  limpiarFiltros() {
    this.filterForm.reset();
    this.dataSource.data = this.ventas;
  }
}
