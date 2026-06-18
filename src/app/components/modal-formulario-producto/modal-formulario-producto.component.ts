import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { Producto } from '../../model/Producto';

@Component({
  selector: 'app-modal-formulario-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  templateUrl: './modal-formulario-producto.component.html',
  styleUrl: './modal-formulario-producto.component.scss'
})
export class ModalFormularioProductoComponent {
  productForm: FormGroup;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto | null }
  ) {
    this.isEditing = !!data.producto;
    
    this.productForm = this.fb.group({
      codigoInterno: [data.producto?.codigoInterno || '', Validators.required],
      codigoBarra: [data.producto?.codigoBarra || ''],
      descripcion: [data.producto?.descripcion || '', [Validators.required, Validators.minLength(3)]],
      categoria: [data.producto?.categoria || ''],
      precioCosto: [data.producto?.precioCosto || 0, [Validators.required, Validators.min(0)]],
      precioVenta: [data.producto?.precioVenta || 0, [Validators.required, Validators.min(0)]],
      stockMinimo: [data.producto?.stockMinimo || 0, Validators.min(0)],
      proveedorNombre: [data.producto?.proveedorNombre || ''],
      imagenUrl: [data.producto?.imagenUrl || ''],
      activo: [data.producto ? data.producto.activo : true]
    });
  }

  saveProduct() {
    if (this.productForm.invalid) return;
    this.dialogRef.close(this.productForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
