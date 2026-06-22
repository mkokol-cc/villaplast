import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Cliente } from '../../model/Cliente';
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
import { ModalFormularioClienteComponent } from '../modal-formulario-cliente/modal-formulario-cliente.component';

@Component({
  selector: 'app-buscador-cliente',
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
    ModalFormularioClienteComponent
  ],
  templateUrl: './buscador-cliente.component.html',
  styleUrls: ['./buscador-cliente.component.scss']
})
export class BuscadorClienteComponent implements OnInit {
  @Input() clientes: Cliente[] = [];
  @Output() clienteSelected = new EventEmitter<Cliente>();
  @Output() clienteCreated = new EventEmitter<Cliente>();

  searchControl = new FormControl<Cliente | string>('');
  filteredClientes!: Observable<Cliente[]>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredClientes = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? this._filter(value) : [])
    );
  }

  displayFn(cliente?: Cliente) {
    return cliente ? cliente.razonSocial : '';
  }

  onOptionSelected(cliente: Cliente) {
    this.clienteSelected.emit(cliente);
    // Keep the selected object in the control so the displayWith shows the cliente
    this.searchControl.setValue(cliente);
  }

  openNewCliente(event?: Event) {
    if (event) event.stopPropagation();
    const ref = this.dialog.open(ModalFormularioClienteComponent, {
      width: '640px',
      data: { cliente: null }
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const newCli: Cliente = { ...result, id: Date.now(), activo: result.activo ?? true } as Cliente;
        this.clienteCreated.emit(newCli);
        this.clienteSelected.emit(newCli);
      }
    });
  }

  private _filter(query: string): Cliente[] {
    const filterValue = query.toLowerCase();
    return this.clientes.filter(c =>
      (c.razonSocial || '').toLowerCase().includes(filterValue) ||
      (c.cuitDni || '').toLowerCase().includes(filterValue) ||
      (c.telefono || '').toLowerCase().includes(filterValue) ||
      (c.direccion || '').toLowerCase().includes(filterValue)
    );
  }
}

