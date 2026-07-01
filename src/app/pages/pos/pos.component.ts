import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalVentaComponent } from '../../components/modal-venta/modal-venta.component';
import { BuscadorProductoComponent } from '../../components/buscador-producto/buscador-producto.component';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';
import { Producto } from '../../model/Producto';
import { ProductosService } from '../../services/productos.service';
import { DetalleVenta } from '../../model/DetalleVenta';
import { Venta, EstadoVenta } from '../../model/Venta';
import { Pago, MedioPago } from '../../model/Pago';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscadorProductoComponent,
    ListaProductosComponent,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  products: Producto[] = [];
  cart: DetalleVenta[] = [];

  constructor(
    private dialog: MatDialog,
    private productosService: ProductosService,
    private ventasService: VentasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productosService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  openVenta() {
    const dialogRef = this.dialog.open(ModalVentaComponent, {
      width: '820px',
      data: { cart: this.cart, total: this.getTotal(), fecha: new Date() },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result?.action) return;

      const { client: clientData, metodoPago } = result.payload;

      const pago: Pago = {
        id: 0,
        fecha: new Date(),
        importe: this.getTotal(),
        medioPago: this.mapMedioPago(metodoPago),
      };

      const venta: Partial<Venta> = {
        fecha: new Date(),
        cliente: clientData?.razonSocial
          ? {
              id: 0,
              razonSocial: clientData.razonSocial,
              cuitDni: clientData.cuitDni,
              telefono: clientData.telefono,
              direccion: clientData.direccion,
              activo: true,
            }
          : undefined,
        items: [...this.cart],
        pagos: [pago],
        total: this.getTotal(),
        estado: result.action === 'facturar' ? EstadoVenta.FACTURADA : EstadoVenta.PENDIENTE,
      };

      this.ventasService.create(venta).subscribe({
        next: () => {
          this.cart = [];
          this.snackBar.open(
            result.action === 'facturar'
              ? 'Venta facturada correctamente'
              : 'Venta guardada correctamente',
            'Cerrar',
            { duration: 3000 }
          );
        },
        error: () => {
          this.snackBar.open('Error al procesar la venta', 'Cerrar', { duration: 3000 });
        }
      });
    });
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
  }

  onProductCreated(product: Producto) {
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

  private mapMedioPago(value: string): MedioPago {
    const map: Record<string, MedioPago> = {
      efectivo: MedioPago.EFECTIVO,
      transferencia: MedioPago.TRANSFERENCIA,
      qr: MedioPago.TARJETA,
      debito: MedioPago.TARJETA,
      credito: MedioPago.TARJETA,
      cuenta_corriente: MedioPago.CUENTA_CORRIENTE,
      cheque: MedioPago.CHEQUE,
    };
    return map[value] || MedioPago.EFECTIVO;
  }
}
