import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { Cliente } from '../../model/Cliente';

@Component({
  selector: 'app-modal-detalle-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    DatePipe // Para formatear fechas
  ],
  templateUrl: './modal-detalle-cliente.component.html',
  styleUrl: './modal-detalle-cliente.component.scss'
})
export class ModalDetalleClienteComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    private snackBar: MatSnackBar
  ) {}

  registrarCobro(cliente: Cliente) { this.snackBar.open(`Registrar cobro para: ${cliente.razonSocial}`, 'Cerrar'); }
  imprimirEstadoCuenta() { this.snackBar.open('Generando estado de cuenta PDF...', 'Cerrar'); }
  editarCliente(cliente: Cliente) { this.snackBar.open(`Editando: ${cliente.razonSocial}`, 'Cerrar'); }
}
