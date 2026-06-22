
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalFormularioCategoriaComponent } from '../modal-formulario-categoria/modal-formulario-categoria.component';

@Component({
  selector: 'app-buscador-categoria',
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
    ModalFormularioCategoriaComponent
  ],
  templateUrl: './buscador-categoria.component.html',
  styleUrls: ['./buscador-categoria.component.scss']
})
export class BuscadorCategoriaComponent implements OnInit {
  @Input() categorias: string[] = [];
  @Output() categoriaSelected = new EventEmitter<string>();
  @Output() categoriaCreated = new EventEmitter<string>();

  searchControl = new FormControl<string | null>('');
  filteredCategorias!: Observable<string[]>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredCategorias = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? this._filter(value) : this._filter(value ?? ''))
    );
  }

  displayFn(cat?: string) { return cat || ''; }

  onOptionSelected(cat: string) {
    this.categoriaSelected.emit(cat);
    this.searchControl.setValue(cat);
  }

  openNewCategoria(event?: Event) {
    if (event) event.stopPropagation();
    const ref = this.dialog.open(ModalFormularioCategoriaComponent, { width: '480px', data: { categoria: null } });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaCreated.emit(result);
        this.categoriaSelected.emit(result);
        this.searchControl.setValue(result);
      }
    });
  }

  private _filter(query: string): string[] {
    const filterValue = query.toLowerCase();
    return this.categorias.filter(c => (c || '').toLowerCase().includes(filterValue));
  }
}
