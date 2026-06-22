import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Producto } from '../../model/Producto';
import { ModalFormularioProductoComponent } from '../modal-formulario-producto/modal-formulario-producto.component';

@Component({
  selector: 'app-buscador-producto',
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
    ModalFormularioProductoComponent
  ],
  templateUrl: './buscador-producto.component.html',
  styleUrls: ['./buscador-producto.component.scss']
})
export class BuscadorProductoComponent implements OnInit {
  @Input() products: Producto[] = [];
  @Output() productSelected = new EventEmitter<Producto>();

  searchControl = new FormControl('');
  filteredProducts!: Observable<Producto[]>;
  constructor(private dialog: MatDialog) {}

  @Output() productCreated = new EventEmitter<Producto>();
  ngOnInit(): void {
    this.filteredProducts = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? this._filter(value) : [])
    );
  }

  displayFn(product?: Producto) {
    return product ? product.descripcion : '';
  }

  onOptionSelected(product: Producto) {
    this.productSelected.emit(product);
    this.searchControl.setValue('');
  }

  openNewProduct(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const ref = this.dialog.open(ModalFormularioProductoComponent, {
      width: '900px',
      data: { producto: null }
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const newProd: Producto = { ...result, id: Date.now(), stockActual: result.stockActual ?? 0 } as Producto;
        this.productCreated.emit(newProd);
        this.productSelected.emit(newProd);
      }
    });
  }

  private _filter(name: string): Producto[] {
    const filterValue = name.toLowerCase();
    return this.products.filter(p =>
      p.descripcion.toLowerCase().includes(filterValue) ||
      p.codigoBarra?.includes(filterValue) ||
      p.codigoInterno.toLowerCase().includes(filterValue)
    );
  }
}
