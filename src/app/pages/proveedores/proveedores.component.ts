import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Proveedor, PROVEEDORES_MOCK } from '../../model/Proveedor';
import { BuscadorProveedorComponent } from '../../components/buscador-proveedor/buscador-proveedor.component';
import { ModalDetalleProveedorComponent } from '../../components/modal-detalle-proveedor/modal-detalle-proveedor.component';
import { ModalFormularioProveedorComponent } from '../../components/modal-formulario-proveedor/modal-formulario-proveedor.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscadorProveedorComponent,
    ModalFormularioProveedorComponent,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit {
  searchControl = new FormControl('');
  displayedColumns: string[] = ['razonSocial', 'cuit', 'telefono', 'saldo', 'ultimaCompra', 'acciones'];
  dataSource = new MatTableDataSource<Proveedor>([]);
  proveedoresMock: Proveedor[] = PROVEEDORES_MOCK
  

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.proveedoresMock;
    
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '');
    });
  }

  onProveedorSelected(p: Proveedor) {
    // abrir detalle como si el usuario hiciera click en la fila
    this.selectProveedor(p);
  }

  onProveedorCreated(p: Proveedor) {
    // agregar al listado y refrescar tabla
    this.proveedoresMock.push(p);
    this.dataSource.data = this.proveedoresMock;
    this.snackBar.open(`Proveedor creado: ${p.razonSocial}`, 'Cerrar', { duration: 2000 });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectProveedor(row: Proveedor) {
    this.dialog.open(ModalDetalleProveedorComponent, {
      width: '600px',
      data: { proveedor: row }
    });
  }

  // Acciones
  openNewProveedor() {
    const dialogRef = this.dialog.open(ModalFormularioProveedorComponent, {
      width: '640px',
      data: { proveedor: null },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProv: Proveedor = { ...result, id: Date.now(), activo: result.activo ?? true } as Proveedor;
        this.proveedoresMock.push(newProv);
        this.dataSource.data = [...this.proveedoresMock];
        this.snackBar.open(`Proveedor creado: ${newProv.razonSocial}`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  editProveedor(p: Proveedor, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalFormularioProveedorComponent, {
      width: '640px',
      data: { proveedor: { ...p } },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(p, result);
        this.dataSource.data = [...this.proveedoresMock];
        this.snackBar.open(`Proveedor actualizado: ${p.razonSocial}`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  toggleProveedorStatus(p: Proveedor, event: Event) {
    event.stopPropagation();
    p.activo = !p.activo;
    this.snackBar.open(`Proveedor ${p.activo ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
  }

  registrarPago(p: Proveedor | null) {
    if (!p) return;
    this.snackBar.open(`Registrar pago para: ${p.razonSocial}`, 'Cerrar');
  }

  verHistorial(p: Proveedor | null) {
    if (!p) return;
    this.snackBar.open(`Historial de compras: ${p.razonSocial}`, 'Cerrar');
  }
}
