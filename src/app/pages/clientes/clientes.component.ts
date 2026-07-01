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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cliente } from '../../model/Cliente';
import { ClientesService } from '../../services/clientes.service';
import { ModalDetalleClienteComponent } from '../../components/modal-detalle-cliente/modal-detalle-cliente.component';
import { BuscadorClienteComponent } from '../../components/buscador-cliente/buscador-cliente.component';
import { ModalFormularioClienteComponent } from '../../components/modal-formulario-cliente/modal-formulario-cliente.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscadorClienteComponent,
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

  clientesMock: Cliente[] = [];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.getAll().subscribe(data => {
      this.clientesMock = data;
      this.dataSource.data = this.clientesMock;
    });

    this.searchControl.valueChanges.subscribe(value => {
      this.dataSource.filter = (value || '').trim().toLowerCase();
    });
  }

  selectCliente(cliente: Cliente) {
    this.dialog.open(ModalDetalleClienteComponent, {
      width: '600px',
      data: { cliente: cliente }
    });
  }

  onClienteCreated(c: Cliente) {
    this.clientesService.create(c).subscribe(nuevo => {
      this.clientesMock.push(nuevo);
      this.dataSource.data = this.clientesMock;
      this.snackBar.open(`Cliente creado: ${nuevo.razonSocial}`, 'Cerrar', { duration: 2000 });
    });
  }

  nuevoCliente() {
    const dialogRef = this.dialog.open(ModalFormularioClienteComponent, {
      width: '640px',
      data: { cliente: null },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newClient: Cliente = { ...result, id: Date.now(), activo: result.activo ?? true } as Cliente;
        this.clientesMock.push(newClient);
        this.dataSource.data = this.clientesMock;
        this.snackBar.open(`Cliente creado: ${newClient.razonSocial}`, 'Cerrar', { duration: 2000 });
      }
    });
  }

  editarCliente(cliente: Cliente, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalFormularioClienteComponent, {
      width: '640px',
      data: { cliente: cliente },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(cliente, result);
        this.clientesService.update(cliente.id, cliente).subscribe(() => {
          this.dataSource.data = [...this.clientesMock];
          this.snackBar.open(`Cliente actualizado: ${cliente.razonSocial}`, 'Cerrar', { duration: 2000 });
        });
      }
    });
  }

  toggleActivo(cliente: Cliente, event: Event) {
    event.stopPropagation();
    cliente.activo = !cliente.activo;
    this.clientesService.update(cliente.id, cliente).subscribe(() => {
      this.snackBar.open(`Cliente ${cliente.activo ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
    });
  }

  registrarCobro(cliente: Cliente | null) {
    const nombre = cliente ? cliente.razonSocial : 'general';
    this.snackBar.open(`Registrar cobro para: ${nombre}`, 'Cerrar');
  }

  imprimirEstadoCuenta() {
    this.snackBar.open('Generando estado de cuenta PDF...', 'Cerrar');
  }
}
