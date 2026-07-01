import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Venta } from '../../model/Venta';
import { VentasService } from '../../services/ventas.service';

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

const MEDIO_PAGO_LABELS: Record<string, string> = {
  EFECTIVO: 'Efectivo',
  TRANSFERENCIA: 'Transferencia',
  TARJETA: 'Tarjeta',
  CHEQUE: 'Cheque',
  CUENTA_CORRIENTE: 'Cuenta Corriente'
};

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  reporteForm = new FormGroup({
    fecha: new FormControl(new Date())
  });

  totalVendido = 0;
  cantidadVentas = 0;
  desglose: { label: string; total: number }[] = [];
  private ventas: Venta[] = [];

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.ventasService.getAll().subscribe(data => {
      this.ventas = data;
      this.onFechaChange();
    });
    this.reporteForm.valueChanges.subscribe(() => this.onFechaChange());
  }

  onFechaChange(): void {
    const fecha = this.reporteForm.value.fecha;
    if (!fecha) return;

    const ventasDelDia = this.ventas.filter(v => isSameDay(v.fecha, fecha));

    const totalPorMedioPago: Record<string, number> = {};
    let total = 0;

    for (const v of ventasDelDia) {
      total += v.total;
      for (const p of v.pagos) {
        const key = p.medioPago;
        totalPorMedioPago[key] = (totalPorMedioPago[key] || 0) + p.importe;
      }
    }

    this.totalVendido = total;
    this.cantidadVentas = ventasDelDia.length;
    this.desglose = Object.entries(totalPorMedioPago)
      .filter(([_, t]) => t > 0)
      .map(([medioPago, t]) => ({
        label: MEDIO_PAGO_LABELS[medioPago] || medioPago,
        total: t
      }))
      .sort((a, b) => b.total - a.total);
  }

  limpiar(): void {
    this.reporteForm.reset({ fecha: new Date() });
  }
}
