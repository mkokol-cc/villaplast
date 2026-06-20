import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BuscadorProductoComponent } from '../../components/buscador-producto/buscador-producto.component';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';
import { Producto } from '../../model/Producto';
import { DetalleVenta } from '../../model/DetalleVenta';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscadorProductoComponent,
    ListaProductosComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent implements OnInit {
  // Mock de datos adaptado a la interfaz Producto
  products: Producto[] = [
    { id: 1, codigoInterno: 'PAN001', descripcion: 'Pan Artesanal', codigoBarra: '779123456', precioVenta: 1200, stockActual: 20, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2821/2821804.png' },
    { id: 2, codigoInterno: 'LEC001', descripcion: 'Leche Entera', codigoBarra: '779987654', precioVenta: 1500, stockActual: 50, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/869/869504.png' },
    { id: 3, codigoInterno: 'CAF001', descripcion: 'Café Molido', codigoBarra: '779456123', precioVenta: 4500, stockActual: 15, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/924/924514.png' },
    { id: 4, codigoInterno: 'QUE001', descripcion: 'Queso Crema', codigoBarra: '779321654', precioVenta: 2800, stockActual: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/4813/4813075.png' },
    { id: 5, codigoInterno: 'MAN001', descripcion: 'Manzanas Rojas', codigoBarra: '779112233', precioVenta: 350, stockActual: 100, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1032/1032549.png' },
    { id: 6, codigoInterno: 'JUG001', descripcion: 'Jugo de Naranja', codigoBarra: '779445566', precioVenta: 1800, stockActual: 30, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
    { id: 7, codigoInterno: 'GAL001', descripcion: 'Galletas Surtidas', codigoBarra: '779778899', precioVenta: 950, stockActual: 40, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/859/859283.png' },
    { id: 8, codigoInterno: 'AGU001', descripcion: 'Agua Mineral 1.5L', codigoBarra: '779101010', precioVenta: 600, stockActual: 60, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2402/2402120.png' },
    { id: 9, codigoInterno: 'ARR001', descripcion: 'Arroz Blanco 1kg', codigoBarra: '779202020', precioVenta: 1100, stockActual: 25, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
    { id: 10, codigoInterno: 'FID001', descripcion: 'Fideos Largos', codigoBarra: '779303030', precioVenta: 850, stockActual: 35, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046755.png' },
    { id: 11, codigoInterno: 'ACE001', descripcion: 'Aceite de Girasol', codigoBarra: '779404040', precioVenta: 2500, stockActual: 12, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
    { id: 12, codigoInterno: 'DET001', descripcion: 'Detergente Ropa', codigoBarra: '779505050', precioVenta: 3200, stockActual: 18, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
    { id: 13, codigoInterno: 'JAB001', descripcion: 'Jabón de Tocador', codigoBarra: '779606060', precioVenta: 400, stockActual: 45, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
    { id: 14, codigoInterno: 'PAP001', descripcion: 'Papel Higiénico', codigoBarra: '779707070', precioVenta: 1600, stockActual: 22, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2360/2360060.png' },
  ];

  
  cart: DetalleVenta[] = [];

  ngOnInit(): void {}

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

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.subtotal, 0);
  }
}
