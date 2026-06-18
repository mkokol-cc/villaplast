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
import { Proveedor } from '../../model/Proveedor';
import { ModalDetalleProveedorComponent } from '../../components/modal-detalle-proveedor/modal-detalle-proveedor.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  // Mock de datos para demostración
  private proveedoresMock: Proveedor[] = [
    { 
      id: 1, 
      razonSocial: 'Distribuidora Villaplast', 
      cuit: '30-12345678-9', 
      telefono: '011 4567-8900', 
      activo: true, 
      ultimaCompra: new Date(2026, 5, 12),
      observaciones: 'Proveedor principal de bolsas y descartables.',
      direccion: 'Av. Corrientes 1234, CABA'
    },
    { 
      id: 2, 
      razonSocial: 'Papelera Norte', 
      cuit: '30-98765432-1', 
      telefono: '011 4321-0011', 
      activo: true, 
      ultimaCompra: new Date(2026, 4, 20),
      observaciones: 'Entregas solo los martes.',
      direccion: 'Ruta 8 Km 50, Pilar'
    },
    { 
      id: 3, 
      razonSocial: 'Insumos Pro', 
      cuit: '20-11223344-5', 
      telefono: '0230 445-6677', 
      activo: false, 
      ultimaCompra: new Date(2025, 11, 0),
      observaciones: 'Cuenta suspendida por cambio de firma.'
    }
  ];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.proveedoresMock;
    
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '');
    });
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
    this.snackBar.open('Formulario de Nuevo Proveedor (Próximamente)', 'Cerrar');
  }

  editProveedor(p: Proveedor, event: Event) {
    event.stopPropagation();
    this.snackBar.open(`Editando: ${p.razonSocial}`, 'Cerrar');
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
