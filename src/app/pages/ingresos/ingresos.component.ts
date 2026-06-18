import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DatePipe } from '@angular/common'; // Import DatePipe
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../model/Proveedor';
import { Producto } from '../../model/Producto';
import { ModalDetalleIngresoComponent } from '../../components/modal-detalle-ingreso/modal-detalle-ingreso.component';
import { ModalFormularioIngresoComponent } from '../../components/modal-formulario-ingreso/modal-formulario-ingreso.component';

interface DetalleIngreso {
  producto: Producto;
  cantidad: number;
}

interface Ingreso {
  id: number;
  fecha: Date;
  proveedor: Proveedor;
  numeroRemito: string;
  items: DetalleIngreso[];
  usuario: string;
  totalCantidad: number;
}

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    proveedor: new FormControl(''),
    fechaDesde: new FormControl(null),
    fechaHasta: new FormControl(null),
    remito: new FormControl('')
  });

  displayedColumns: string[] = ['fecha', 'proveedor', 'remito', 'cantidad', 'usuario', 'acciones'];

  // Mocks para proveedores y datos de historial
  proveedores: string[] = ['Distribuidora Villaplast', 'Papelera Norte', 'Insumos Pro'];
  
  // Mock de productos para la selección en el formulario
  productosMock: Producto[] = [
    { id: 101, descripcion: 'Bolsas de Consorcio 60x90', stockActual: 500, activo: true, codigoInterno: 'B01' } as Producto,
    { id: 102, descripcion: 'Papel Higiénico Premium x4', stockActual: 200, activo: true, codigoInterno: 'P05' } as Producto,
    { id: 103, descripcion: 'Rollo de Cocina x3', stockActual: 300, activo: true, codigoInterno: 'R02' } as Producto
  ];

  private ingresosMock: Ingreso[] = [
    {
      id: 1,
      fecha: new Date(2026, 5, 10, 10, 30),
      proveedor: {
        id: 1, razonSocial: 'Distribuidora Villaplast', cuit: '30-12345678-9', activo: true
      },
      numeroRemito: 'R-0001-00004562',
      usuario: 'matias.admin',
      totalCantidad: 150,
      items: [
        { producto: { id: 101, descripcion: 'Bolsas de Consorcio 60x90', stockActual: 500, activo: true, codigoInterno: 'B01' } as Producto, cantidad: 100 },
        { producto: { id: 102, descripcion: 'Papel Higiénico Premium x4', stockActual: 200, activo: true, codigoInterno: 'P05' } as Producto, cantidad: 50 }
      ]
    },
    {
      id: 2,
      fecha: new Date(2026, 5, 12, 15, 45),
      proveedor: { id: 2, razonSocial: 'Papelera Norte', cuit: '30-98765432-1', activo: true },
      numeroRemito: 'R-0002-00001234',
      usuario: 'esteban.user',
      totalCantidad: 80,
      items: [
        { producto: { id: 103, descripcion: 'Rollo de Cocina x3', stockActual: 300, activo: true, codigoInterno: 'R02' } as Producto, cantidad: 80 }
      ]
    }
  ];

  dataSource = new MatTableDataSource<Ingreso>([]);

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dataSource.data = this.ingresosMock;
  }

  verDetalle(ingreso: Ingreso) {
    this.dialog.open(ModalDetalleIngresoComponent, { width: '600px', data: { ingreso: ingreso } });
  }

  openNuevoIngreso() {
    const dialogRef = this.dialog.open(ModalFormularioIngresoComponent, {
      width: '850px',
      data: { proveedores: this.proveedores, productos: this.productosMock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Simulación de creación de ingreso y actualización de stock
        const nuevoIngreso: Ingreso = {
          ...result,
          id: Date.now(),
          fecha: new Date(),
          usuario: 'matias.admin',
          totalCantidad: result.items.reduce((acc: number, item: any) => acc + item.cantidad, 0)
        };
        this.ingresosMock.unshift(nuevoIngreso);
        this.dataSource.data = [...this.ingresosMock];
        this.snackBar.open('Ingreso registrado y stock actualizado con éxito', 'Cerrar', { duration: 3000 });
      }
    });
  }

  imprimirComprobante(ingreso: Ingreso) {
    console.log('Imprimiendo comprobante para ingreso:', ingreso.numeroRemito);
    // Lógica para generación de PDF o impresión
  }

  limpiarFiltros() {
    this.filterForm.reset();
    this.dataSource.data = this.ingresosMock;
  }

  applyFilters() {
    // Aquí iría la lógica de filtrado por fecha, proveedor y remito
  }
}
