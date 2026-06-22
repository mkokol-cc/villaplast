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
import { Cliente, CLIENTES_MOCK } from '../../model/Cliente';

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
  cart: any[] = [];
  total = 0;
  fecha: Date = new Date();
  clientes: Cliente[] = CLIENTES_MOCK
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
    @Inject(MAT_DIALOG_DATA) public data: { cart: any[]; total: number; fecha: Date }
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

  ngOnInit(): void {}

  onClienteSelected(cliente: any) {
    if (!cliente) return;
    this.ventaForm.patchValue({
      razonSocial: cliente.razonSocial || '',
      cuitDni: cliente.cuitDni || cliente.cuit || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || ''
    });
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
    // Deshabilitar solo los campos relacionados al cliente, mantener otros controles (p.ej. metodoPago) activos
    const clientControls = ['razonSocial', 'cuitDni', 'telefono', 'direccion'];
    clientControls.forEach(key => this.ventaForm.get(key)?.disable());
  }

  close() { this.dialogRef.close(); }

  facturar() {
    // placeholder: implement invoicing later
    const payload = { client: this.ventaForm.value, metodoPago: this.ventaForm.value.metodoPago };
    this.dialogRef.close({ action: 'facturar', payload });
  }
}
