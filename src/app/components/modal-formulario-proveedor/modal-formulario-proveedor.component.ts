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
import { Proveedor } from '../../model/Proveedor';

@Component({
  selector: 'app-modal-formulario-proveedor',
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
  templateUrl: './modal-formulario-proveedor.component.html',
  styleUrls: ['./modal-formulario-proveedor.component.scss']
})
export class ModalFormularioProveedorComponent {
  providerForm: FormGroup;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor | null }
  ) {
    this.isEditing = !!data?.proveedor;

    this.providerForm = this.fb.group({
      razonSocial: [data?.proveedor?.razonSocial || '', [Validators.required, Validators.minLength(3)]],
      cuit: [data?.proveedor?.cuit || '', [Validators.required]],
      telefono: [data?.proveedor?.telefono || ''],
      direccion: [data?.proveedor?.direccion || ''],
      observaciones: [data?.proveedor?.observaciones || ''],
      ultimaCompra: [data?.proveedor?.ultimaCompra || null],
      activo: [data?.proveedor ? data.proveedor.activo : true]
    });
  }

  saveProveedor() {
    if (this.providerForm.invalid) return;
    this.dialogRef.close(this.providerForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
