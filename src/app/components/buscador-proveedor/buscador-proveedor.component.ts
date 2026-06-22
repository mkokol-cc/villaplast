import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Proveedor } from '../../model/Proveedor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalFormularioProveedorComponent } from '../modal-formulario-proveedor/modal-formulario-proveedor.component';

@Component({
  selector: 'app-buscador-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    ModalFormularioProveedorComponent
  ],
  templateUrl: './buscador-proveedor.component.html',
  styleUrls: ['./buscador-proveedor.component.scss']
})
export class BuscadorProveedorComponent implements OnInit {
  @Input() proveedores: Proveedor[] = [];
  @Output() proveedorSelected = new EventEmitter<Proveedor>();
  @Output() proveedorCreated = new EventEmitter<Proveedor>();

  searchControl = new FormControl<Proveedor | string>('');
  filteredProveedores!: Observable<Proveedor[]>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredProveedores = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? this._filter(value) : [])
    );
  }

  displayFn(proveedor?: Proveedor) {
    return proveedor ? proveedor.razonSocial : '';
  }

  onOptionSelected(proveedor: Proveedor) {
    this.proveedorSelected.emit(proveedor);
    // Keep the selected object in the control so the displayWith shows the proveedor
    this.searchControl.setValue(proveedor);
  }

  openNewProveedor(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const ref = this.dialog.open(ModalFormularioProveedorComponent, {
      width: '640px',
      data: { proveedor: null }
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const newProv: Proveedor = { ...result, id: Date.now(), activo: result.activo ?? true } as Proveedor;
        this.proveedorCreated.emit(newProv);
        this.proveedorSelected.emit(newProv);
      }
    });
  }

  private _filter(query: string): Proveedor[] {
    const filterValue = query.toLowerCase();
    return this.proveedores.filter(p =>
      (p.razonSocial || '').toLowerCase().includes(filterValue) ||
      (p.cuit || '').toLowerCase().includes(filterValue) ||
      (p.telefono || '').toLowerCase().includes(filterValue) ||
      (p.direccion || '').toLowerCase().includes(filterValue)
    );
  }
}
