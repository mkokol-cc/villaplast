import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../model/Proveedor';
import { Producto } from '../../model/Producto';

interface DetalleIngreso { producto: Producto; cantidad: number; }
interface Ingreso { id: number; fecha: Date; proveedor: Proveedor; numeroRemito: string; items: DetalleIngreso[]; usuario: string; totalCantidad: number; }

@Component({
  selector: 'app-modal-detalle-ingreso',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule, // Keep MatIconModule for the close button and print icon
    MatDividerModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './modal-detalle-ingreso.component.html',
  styleUrl: './modal-detalle-ingreso.component.scss'
})
export class ModalDetalleIngresoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingreso: Ingreso },
    private snackBar: MatSnackBar
  ) {}

  imprimirComprobante(ingreso: Ingreso) {
    this.snackBar.open(`Imprimiendo comprobante para ingreso: ${ingreso.numeroRemito}`, 'Cerrar');
  }
}
