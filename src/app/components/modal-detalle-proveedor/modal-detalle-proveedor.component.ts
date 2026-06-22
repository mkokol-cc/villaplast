import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../model/Proveedor';
import { ModalFormularioProveedorComponent } from '../modal-formulario-proveedor/modal-formulario-proveedor.component';
import { ModalEditarSaldoComponent } from '../modal-editar-saldo/modal-editar-saldo.component';

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
    DatePipe, // Para formatear fechas
    ModalFormularioProveedorComponent,
    ModalEditarSaldoComponent
  ],
  templateUrl: './modal-detalle-proveedor.component.html',
  styleUrl: './modal-detalle-proveedor.component.scss'
})
export class ModalDetalleProveedorComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor },
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  editProveedor() {
    const dialogRef = this.dialog.open(ModalFormularioProveedorComponent, {
      width: '640px',
      data: { proveedor: this.data.proveedor }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        Object.assign(this.data.proveedor, result);
        this.snackBar.open(`Proveedor actualizado`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  editarSaldo(p: Proveedor) {
    const dialogRef = this.dialog.open(ModalEditarSaldoComponent, {
      width: '420px',
      data: { saldo: p.saldoPendiente ?? 0 }
    });
    dialogRef.afterClosed().subscribe((newSaldo: number) => {
      if (typeof newSaldo === 'number') {
        p.saldoPendiente = newSaldo;
        this.snackBar.open(`Saldo actualizado: $${newSaldo}`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  verHistorial(p: Proveedor) { this.snackBar.open(`Historial de compras: ${p.razonSocial}`, 'Cerrar'); }
}
