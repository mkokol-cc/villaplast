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
import { Proveedor } from '../../model/Proveedor';
import { BuscadorProductoComponent } from '../buscador-producto/buscador-producto.component';
import { BuscadorProveedorComponent } from '../buscador-proveedor/buscador-proveedor.component';
import { ListaProductosComponent } from '../lista-productos/lista-productos.component';
import { DetalleVenta } from '../../model/DetalleVenta';

@Component({
  selector: 'app-modal-formulario-ingreso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    BuscadorProductoComponent,
    BuscadorProveedorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    ListaProductosComponent
  ],
  templateUrl: './modal-formulario-ingreso.component.html',
  styleUrl: './modal-formulario-ingreso.component.scss'
})
export class ModalFormularioIngresoComponent implements OnInit {
  ingresoForm: FormGroup;
  proveedores: Proveedor[];
  products: Producto[] = [];
  cart: DetalleVenta[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedores: Proveedor[], productos: Producto[] }
  ) {
    this.proveedores = data.proveedores;
    this.products = data.productos;

    this.ingresoForm = this.fb.group({
      proveedor: ['', Validators.required],
      numeroRemito: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  onProveedorSelected(proveedor: Proveedor) {
    this.ingresoForm.patchValue({ proveedor });
  }

  onProveedorCreated(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
    this.ingresoForm.patchValue({ proveedor });
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

  addProductToItems(product: Producto) {
    // si ya existe, aumentar cantidad
    const existingIndex = this.items.controls.findIndex(ctrl => ctrl.value.producto?.id === product.id);
    if (existingIndex > -1) {
      const ctrl = this.items.at(existingIndex);
      const newQty = (ctrl.value.cantidad || 0) + 1;
      ctrl.patchValue({ cantidad: newQty, producto: product });
    } else {
      const itemForm = this.fb.group({
        producto: [product, Validators.required],
        cantidad: [1, [Validators.required, Validators.min(1)]]
      });
      this.items.push(itemForm);
    }
  }

  onRowProductSelected(product: Producto, index: number) {
    const ctrl = this.items.at(index);
    if (ctrl) {
      ctrl.patchValue({ producto: product });
    }
  }

  save() {
    if (this.ingresoForm.invalid) return;
    this.dialogRef.close(this.ingresoForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }


  handleChangeQuantity(event: { item: DetalleVenta; delta: number }) {
    if (event && event.item) {
      this.updateQuantity(event.item, event.delta);
    }
  }
  updateQuantity(item: DetalleVenta, delta: number) {
    item.cantidad += delta;
    item.subtotal = item.cantidad * item.precioUnitario;
    if (item.cantidad <= 0) {
      this.cart = this.cart.filter(i => i !== item);
    }
  }
  addToCart(product: Producto) {
    const item = this.cart.find(i => i.producto.id === product.id);
    if (item) { 
      item.cantidad++; 
      item.subtotal = item.cantidad * item.precioUnitario;
    } 
    else { 
      this.cart.push({ 
        id: 0, 
        producto: product, 
        cantidad: 1, 
        precioUnitario: product.precioVenta,
        subtotal: product.precioVenta
      }); 
    }
    // input cleared by child component after selection
  }
  onProductCreated(product: Producto) {
    // agregar al listado de productos y añadir al carrito inmediatamente
    this.products.push(product);
    this.addToCart(product);
  }

}
