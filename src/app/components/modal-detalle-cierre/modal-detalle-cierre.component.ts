import { Component, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CierreCaja } from '../../model/CierreCaja';

const LABELS: Record<string, string> = {
  EFECTIVO: 'Efectivo',
  TRANSFERENCIA: 'Transferencia',
  TARJETA: 'Tarjeta',
  CHEQUE: 'Cheque',
  CUENTA_CORRIENTE: 'Cuenta Corriente',
  APERTURA: 'Monto Inicial'
};

@Component({
  selector: 'app-modal-detalle-cierre',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './modal-detalle-cierre.component.html',
  styleUrl: './modal-detalle-cierre.component.scss'
})
export class ModalDetalleCierreComponent {
  LABELS = LABELS;

  constructor(
    public dialogRef: MatDialogRef<ModalDetalleCierreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cierre: CierreCaja }
  ) {}
}
