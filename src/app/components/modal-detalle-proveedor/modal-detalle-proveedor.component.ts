import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../model/Proveedor';

@Component({
  selector: 'app-modal-detalle-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    DatePipe // Para formatear fechas
  ],
  templateUrl: './modal-detalle-proveedor.component.html',
  styleUrl: './modal-detalle-proveedor.component.scss'
})
export class ModalDetalleProveedorComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor },
    private snackBar: MatSnackBar
  ) {}

  registrarPago(p: Proveedor) { this.snackBar.open(`Registrar pago para: ${p.razonSocial}`, 'Cerrar'); }
  verHistorial(p: Proveedor) { this.snackBar.open(`Historial de compras: ${p.razonSocial}`, 'Cerrar'); }
}
