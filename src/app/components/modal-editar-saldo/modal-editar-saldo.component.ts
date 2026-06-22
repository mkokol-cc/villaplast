import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-editar-saldo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Editar Saldo</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Saldo pendiente</mat-label>
          <input matInput type="number" formControlName="saldo">
          <mat-error *ngIf="form.get('saldo')?.invalid">Ingrese un valor válido</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="form.invalid">Guardar</button>
    </mat-dialog-actions>
  `
})
export class ModalEditarSaldoComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditarSaldoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { saldo?: number }
  ) {
    this.form = this.fb.group({ saldo: [data?.saldo ?? 0, [Validators.required]] });
  }

  save() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value.saldo);
  }
  cancel() { this.dialogRef.close(); }
}
