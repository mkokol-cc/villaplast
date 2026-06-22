import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-formulario-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './modal-formulario-categoria.component.html',
  styleUrls: ['./modal-formulario-categoria.component.scss']
})
export class ModalFormularioCategoriaComponent {
  form = this.fb.group({
    nombre: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: string | null }
  ) {
    if (data && data.categoria) {
      this.form.patchValue({ nombre: data.categoria });
    }
  }

  close() { this.dialogRef.close(); }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.nombre);
    }
  }
}
