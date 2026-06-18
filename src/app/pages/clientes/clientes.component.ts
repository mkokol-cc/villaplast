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
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cliente } from '../../model/Cliente';
import { ModalDetalleClienteComponent } from '../../components/modal-detalle-cliente/modal-detalle-cliente.component';

@Component({
  selector: 'app-clientes',
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
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {
  searchControl = new FormControl('');
  displayedColumns: string[] = ['razonSocial', 'cuitDni', 'telefono', 'saldo', 'ultimaCompra', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);

  // Mock de datos para visualización
  private clientesMock: Cliente[] = [
    {
      id: 1,
      razonSocial: 'Juan Pérez',
      cuitDni: '20-33444555-1',
      telefono: '11 5566-7788',
      direccion: 'Calle Falsa 123, CABA',
      activo: true,
      observaciones: 'Cliente habitual, siempre paga a término.',
      ultimaCompra: new Date(2026, 5, 10),
      cantidadCompras: 15,
      cuentaCorriente: { id: 1, movimientos: [] }
    },
    {
      id: 2,
      razonSocial: 'Villaplast Distribuidora',
      cuitDni: '30-11222333-4',
      telefono: '11 4455-6677',
      direccion: 'Av. Corrientes 500, CABA',
      activo: true,
      observaciones: 'Requiere factura A.',
      ultimaCompra: new Date(2026, 4, 25),
      cantidadCompras: 42,
      cuentaCorriente: { id: 2, movimientos: [] }
    },
    {
      id: 3,
      razonSocial: 'María García',
      cuitDni: '27-99888777-2',
      telefono: '11 2233-4455',
      activo: false,
      ultimaCompra: new Date(2025, 11, 15),
      cantidadCompras: 3,
      cuentaCorriente: { id: 3, movimientos: [] }
    }
  ];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.clientesMock;
    
    this.searchControl.valueChanges.subscribe(value => {
      this.dataSource.filter = (value || '').trim().toLowerCase();
    }); 
  }

  selectCliente(cliente: Cliente) {
    this.dialog.open(ModalDetalleClienteComponent, {
      width: '800px',
      data: { cliente: cliente }
    });
  }

  nuevoCliente() {
    this.snackBar.open('Formulario de nuevo cliente (próximamente)', 'Cerrar');
  }

  editarCliente(cliente: Cliente, event: Event) {
    event.stopPropagation();
    this.snackBar.open(`Editando: ${cliente.razonSocial}`, 'Cerrar');
  }

  toggleActivo(cliente: Cliente, event: Event) {
    event.stopPropagation();
    cliente.activo = !cliente.activo;
    this.snackBar.open(`Cliente ${cliente.activo ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
  }

  registrarCobro(cliente: Cliente | null) {
    const nombre = cliente ? cliente.razonSocial : 'general';
    this.snackBar.open(`Registrar cobro para: ${nombre}`, 'Cerrar');
  }

  imprimirEstadoCuenta() {
    this.snackBar.open('Generando estado de cuenta PDF...', 'Cerrar');
  }
}
