import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../model/Proveedor';
import { Producto } from '../../model/Producto';
import { Ingreso } from '../../model/Ingreso';
import { IngresosService } from '../../services/ingresos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProductosService } from '../../services/productos.service';
import { ModalDetalleIngresoComponent } from '../../components/modal-detalle-ingreso/modal-detalle-ingreso.component';
import { ModalFormularioIngresoComponent } from '../../components/modal-formulario-ingreso/modal-formulario-ingreso.component';
import { BuscadorProveedorComponent } from '../../components/buscador-proveedor/buscador-proveedor.component';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuscadorProveedorComponent,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    DatePipe,
    MatDialogModule,
    ModalFormularioIngresoComponent
  ],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.scss'
})
export class IngresosComponent implements OnInit {
  filterForm = new FormGroup({
    proveedor: new FormControl<Proveedor | null>(null),
    fechaDesde: new FormControl(null),
    fechaHasta: new FormControl(null),
    remito: new FormControl('')
  });

  displayedColumns: string[] = ['fecha', 'proveedor', 'remito', 'cantidad', 'usuario', 'acciones'];

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  private ingresos: Ingreso[] = [];
  dataSource = new MatTableDataSource<Ingreso>([]);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ingresosService: IngresosService,
    private proveedoresService: ProveedoresService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.ingresosService.getAll().subscribe(data => {
      this.ingresos = data;
      this.dataSource.data = this.ingresos;
    });
    this.proveedoresService.getAll().subscribe(data => {
      this.proveedores = data;
    });
    this.productosService.getAll().subscribe(data => {
      this.productos = data;
    });
  }

  onProveedorSelected(p: Proveedor) {
    this.filterForm.patchValue({ proveedor: p });
  }

  onProveedorCreated(p: Proveedor) {
    this.proveedores.push(p);
    this.filterForm.patchValue({ proveedor: p });
  }

  verDetalle(ingreso: Ingreso) {
    this.dialog.open(ModalDetalleIngresoComponent, { width: '600px', data: { ingreso: ingreso } });
  }

  openNuevoIngreso() {
    const dialogRef = this.dialog.open(ModalFormularioIngresoComponent, {
      width: '850px',
      data: { proveedores: this.proveedores, productos: this.productos },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevoIngreso: Ingreso = {
          ...result,
          id: Date.now(),
          fecha: new Date(),
          usuario: 'matias.admin',
          totalCantidad: result.items.reduce((acc: number, item: any) => acc + item.cantidad, 0)
        };
        this.ingresos.unshift(nuevoIngreso);
        this.dataSource.data = [...this.ingresos];
        this.snackBar.open('Ingreso registrado y stock actualizado con éxito', 'Cerrar', { duration: 3000 });
      }
    });
  }

  imprimirComprobante(ingreso: Ingreso) {
    console.log('Imprimiendo comprobante para ingreso:', ingreso.numeroRemito);
  }

  limpiarFiltros() {
    this.filterForm.reset();
    this.dataSource.data = this.ingresos;
  }

  applyFilters() {
  }
}
