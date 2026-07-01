import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Venta } from '../../model/Venta';
import { CierreCaja } from '../../model/CierreCaja';
import { VentasService } from '../../services/ventas.service';
import { CierresCajaService } from '../../services/cierres-caja.service';
import { ModalDetalleCierreComponent } from '../../components/modal-detalle-cierre/modal-detalle-cierre.component';

const MEDIO_PAGO_LABELS: Record<string, string> = {
  EFECTIVO: 'Efectivo',
  TRANSFERENCIA: 'Transferencia',
  TARJETA: 'Tarjeta',
  CHEQUE: 'Cheque',
  CUENTA_CORRIENTE: 'Cuenta Corriente',
  APERTURA: 'Monto Inicial'
};

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

function calcularResumen(ventas: Venta[]) {
  const totalPorMedioPago: Record<string, number> = {};
  let totalVendido = 0;

  for (const v of ventas) {
    totalVendido += v.total;
    for (const p of v.pagos) {
      const key = p.medioPago;
      totalPorMedioPago[key] = (totalPorMedioPago[key] || 0) + p.importe;
    }
  }

  const desglose = Object.entries(totalPorMedioPago)
    .filter(([_, total]) => total > 0)
    .map(([medioPago, total]) => ({
      medioPago,
      label: MEDIO_PAGO_LABELS[medioPago] || medioPago,
      total
    }))
    .sort((a, b) => b.total - a.total);

  return { totalVendido, cantidadVentas: ventas.length, desglose };
}

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.scss'
})
export class CajaComponent implements OnInit {
  MEDIO_PAGO_LABELS = MEDIO_PAGO_LABELS;
  hoy = new Date();

  resumenHoy = { totalVendido: 0, cantidadVentas: 0, desglose: [] as { medioPago: string; label: string; total: number }[] };
  mostrarMontoInicial = false;
  montoInicial = 0;
  cierreRealizado = false;

  cierres: CierreCaja[] = [];
  dataSource = new MatTableDataSource<CierreCaja>([]);
  displayedColumns: string[] = ['fecha', 'hora', 'cantidadVentas', 'totalVendido', 'acciones'];

  filterForm = new FormGroup({
    fechaDesde: new FormControl(null),
    fechaHasta: new FormControl(null)
  });

  private ventasDelDia: Venta[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private ventasService: VentasService,
    private cierresCajaService: CierresCajaService
  ) {}

  ngOnInit(): void {
    this.cierresCajaService.getAll().subscribe(data => {
      this.cierres = data;
      this.dataSource.data = this.cierres;
    });
    this.ventasService.getAll().subscribe(data => {
      this.ventasDelDia = data.filter(v => isSameDay(v.fecha, this.hoy));
      this.actualizarResumenHoy();
    });
  }

  private actualizarResumenHoy(): void {
    this.resumenHoy = calcularResumen(this.ventasDelDia);
  }

  cerrarCaja(): void {
    const desglose = [
      ...this.resumenHoy.desglose.map(d => ({ medioPago: d.medioPago, total: d.total }))
    ];

    if (this.montoInicial > 0) {
      desglose.push({ medioPago: 'APERTURA', total: this.montoInicial });
    }

    const cierre: CierreCaja = {
      id: Date.now(),
      fecha: this.hoy,
      hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      totalVendido: this.resumenHoy.totalVendido + this.montoInicial,
      cantidadVentas: this.resumenHoy.cantidadVentas,
      totalPorMedioPago: desglose,
      montoInicial: this.montoInicial
    };

    this.cierresCajaService.create(cierre).subscribe(nuevo => {
      this.cierres.unshift(nuevo);
      this.dataSource.data = [...this.cierres];
      this.cierreRealizado = true;
      this.montoInicial = 0;
      this.mostrarMontoInicial = false;
      this.snackBar.open('Cierre de caja registrado correctamente', 'Cerrar', { duration: 4000 });
    });
  }

  openDetalle(cierre: CierreCaja): void {
    this.dialog.open(ModalDetalleCierreComponent, {
      width: '550px',
      data: { cierre }
    });
  }

  applyFilters(): void {
    const raw = this.filterForm.value;
    const desde = raw.fechaDesde as Date | null;
    const hasta = raw.fechaHasta as Date | null;

    let filtrados = this.cierres;

    if (desde) {
      filtrados = filtrados.filter(c => c.fecha >= desde);
    }
    if (hasta) {
      const hastaFin = new Date(hasta);
      hastaFin.setHours(23, 59, 59, 999);
      filtrados = filtrados.filter(c => c.fecha <= hastaFin);
    }

    this.dataSource.data = filtrados;
  }

  limpiarFiltros(): void {
    this.filterForm.reset();
    this.dataSource.data = this.cierres;
  }

  resetearCierre(): void {
    this.cierreRealizado = false;
    this.ventasService.getAll().subscribe(data => {
      this.ventasDelDia = data.filter(v => isSameDay(v.fecha, this.hoy));
      this.actualizarResumenHoy();
    });
  }
}
