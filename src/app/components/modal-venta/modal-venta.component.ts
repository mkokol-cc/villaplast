import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BuscadorClienteComponent } from '../buscador-cliente/buscador-cliente.component';
import { Cliente } from '../../model/Cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-modal-venta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    BuscadorClienteComponent
  ],
  templateUrl: './modal-venta.component.html',
  styleUrls: ['./modal-venta.component.scss']
})
export class ModalVentaComponent implements OnInit {
  ventaForm: FormGroup;
  editingClient = false;
  selectedClient: Cliente | null = null;
  cart: any[] = [];
  total = 0;
  fecha: Date = new Date();
  clientes: Cliente[] = [];
  metodoPagoOptions = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'qr', label: 'QR' },
    { value: 'debito', label: 'Débito' },
    { value: 'credito', label: 'Crédito' },
    { value: 'cuenta_corriente', label: 'Cuenta Corriente' },
    { value: 'cheque', label: 'Cheque' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cart: any[]; total: number; fecha: Date },
    private clientesService: ClientesService
  ) {
    this.cart = data.cart || [];
    this.total = data.total || 0;
    this.fecha = data.fecha || new Date();

    this.ventaForm = this.fb.group({
      razonSocial: [''],
      cuitDni: [''],
      telefono: [''],
      direccion: [''],
      metodoPago: ['efectivo']
    });
    this.disableClientFields();
  }

  get metodoPagoControl(): FormControl {
    return this.ventaForm.get('metodoPago') as FormControl;
  }

  get hasClient(): boolean {
    return !!this.selectedClient;
  }

  ngOnInit(): void {
    this.clientesService.getAll().subscribe(data => {
      this.clientes = data;
    });
  }

  onClienteSelected(cliente: any) {
    if (!cliente) return;
    this.selectedClient = cliente;
    this.ventaForm.patchValue({
      razonSocial: cliente.razonSocial || '',
      cuitDni: cliente.cuitDni || cliente.cuit || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || ''
    });
    this.editingClient = false;
    this.disableClientFields();
  }

  onClienteCreated(cliente: any) {
    this.onClienteSelected(cliente);
  }

  toggleEditClient() {
    this.editingClient = !this.editingClient;
    if (this.editingClient) this.ventaForm.enable(); else this.disableClientFields();
  }

  disableClientFields() {
    const clientControls = ['razonSocial', 'cuitDni', 'telefono', 'direccion'];
    clientControls.forEach(key => this.ventaForm.get(key)?.disable());
  }

  close() { this.dialogRef.close(); }

  guardar() {
    const payload = { client: this.ventaForm.getRawValue(), metodoPago: this.ventaForm.getRawValue().metodoPago };
    this.dialogRef.close({ action: 'guardar', payload });
  }

  facturar() {
    const payload = { client: this.ventaForm.getRawValue(), metodoPago: this.ventaForm.getRawValue().metodoPago };
    this.dialogRef.close({ action: 'facturar', payload });
  }

  getTotalQuantity(): number {
    return this.cart.reduce((sum, i) => sum + i.cantidad, 0);
  }
}
