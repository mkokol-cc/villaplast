import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Cliente } from '../../model/Cliente';

@Component({
  selector: 'app-modal-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './modal-formulario-cliente.component.html',
  styleUrls: ['./modal-formulario-cliente.component.scss']
})
export class ModalFormularioClienteComponent {
  clientForm: FormGroup;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente | null }
  ) {
    this.isEditing = !!data?.cliente;

    this.clientForm = this.fb.group({
      razonSocial: [data?.cliente?.razonSocial || '', [Validators.required, Validators.minLength(3)]],
      cuitDni: [data?.cliente?.cuitDni || '', [Validators.required]],
      telefono: [data?.cliente?.telefono || ''],
      direccion: [data?.cliente?.direccion || ''],
      observaciones: [data?.cliente?.observaciones || ''],
      ultimaCompra: [data?.cliente?.ultimaCompra || null],
      activo: [data?.cliente ? data.cliente.activo : true]
    });
  }

  saveCliente() {
    if (this.clientForm.invalid) return;
    this.dialogRef.close(this.clientForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
