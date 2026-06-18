import { Component, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venta } from '../../model/Venta';

@Component({
  selector: 'app-modal-detalle-venta',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './modal-detalle-venta.component.html',
  styleUrl: './modal-detalle-venta.component.scss'
})
export class ModalDetalleVentaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { venta: Venta },
    private snackBar: MatSnackBar
  ) {}

  getCantidadItems(venta: Venta): number { return venta.items.reduce((acc, item) => acc + item.cantidad, 0); }

  imprimirComprobante() { this.snackBar.open('Generando comprobante PDF...', 'Cerrar', { duration: 2000 }); }
  reimprimirTicket() { this.snackBar.open('Enviando ticket a la impresora...', 'Cerrar', { duration: 2000 }); }
  verFactura() { if (this.data.venta?.factura) { this.snackBar.open(`Visualizando factura ${this.data.venta.factura.numero}`, 'Cerrar'); } }
}
