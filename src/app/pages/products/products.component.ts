import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Producto } from '../../model/Producto';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Producto[] = [
    { id: 1, codigoInterno: 'P001', descripcion: 'Producto Ejemplo', precioVenta: 150, precioCosto: 100, stockActual: 10, stockMinimo: 5, activo: true, categoria: 'Varios' }
  ];
  
  dataSource = new MatTableDataSource<Producto>(this.products);
  displayedColumns: string[] = ['imagen', 'codigoInterno', 'descripcion', 'categoria', 'precios', 'estado', 'acciones'];
  
  productForm: FormGroup;
  showForm = false;
  isEditing = false;
  selectedProductId: number | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.productForm = this.fb.group({
      codigoInterno: ['', Validators.required],
      codigoBarra: [''],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      categoria: [''],
      precioCosto: [0, [Validators.required, Validators.min(0)]],
      precioVenta: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, Validators.min(0)],
      proveedorNombre: [''],
      imagenUrl: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {}

  openNewProduct() {
    this.isEditing = false;
    this.selectedProductId = null;
    this.productForm.reset({ activo: true, precioCosto: 0, precioVenta: 0, stockMinimo: 0 });
    this.showForm = true;
  }

  editProduct(producto: Producto) {
    this.isEditing = true;
    this.selectedProductId = producto.id;
    this.productForm.patchValue(producto);
    this.showForm = true;
  }

  saveProduct() {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;
    
    if (this.isEditing) {
      const index = this.products.findIndex(p => p.id === this.selectedProductId);
      this.products[index] = { ...productData, id: this.selectedProductId };
      this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 3000 });
    } else {
      const newProduct = { ...productData, id: Date.now(), stockActual: 0 };
      this.products.push(newProduct);
      this.snackBar.open('Producto creado', 'Cerrar', { duration: 3000 });
    }

    this.refreshTable();
    this.showForm = false;
  }

  toggleStatus(producto: Producto) {
    producto.activo = !producto.activo;
    this.refreshTable();
    this.snackBar.open(`Producto ${producto.activo ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
  }

  refreshTable() {
    this.dataSource.data = [...this.products];
  }

  cancel() {
    this.showForm = false;
  }
}
