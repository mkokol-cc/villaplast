import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Producto } from '../../model/Producto';

@Component({
  selector: 'app-modal-formulario-ingreso',
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
    MatTooltipModule
  ],
  templateUrl: './modal-formulario-ingreso.component.html',
  styleUrl: './modal-formulario-ingreso.component.scss'
})
export class ModalFormularioIngresoComponent implements OnInit {
  ingresoForm: FormGroup;
  proveedores: string[];
  productos: Producto[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedores: string[], productos: Producto[] }
  ) {
    this.proveedores = data.proveedores;
    this.productos = data.productos;

    this.ingresoForm = this.fb.group({
      proveedor: ['', Validators.required],
      numeroRemito: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addItem(); // Iniciar con una fila de producto vacía
  }

  get items() {
    return this.ingresoForm.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  save() {
    if (this.ingresoForm.invalid) return;
    this.dialogRef.close(this.ingresoForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
