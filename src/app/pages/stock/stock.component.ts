import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Producto } from '../../model/Producto';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormularioProductoComponent } from '../../components/modal-formulario-producto/modal-formulario-producto.component';
import { ModalFormularioIngresoComponent } from '../../components/modal-formulario-ingreso/modal-formulario-ingreso.component';
import { Proveedor } from '../../model/Proveedor';

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
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatSortModule,
    MatDialogModule
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  searchControl = new FormControl('');
  filterForm = new FormGroup({
    categoria: new FormControl(''),
    proveedor: new FormControl(''),
    soloStockBajo: new FormControl(false)
  });

  displayedColumns: string[] = ['imagen', 'codigoInterno', 'descripcion', 'stockActual', 'precioVenta', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);

  // Mock de datos para pruebas
  private products: Producto[] = [
    { id: 1, codigoInterno: 'P001', descripcion: 'Pan Artesanal', codigoBarra: '779123456', precioVenta: 1200, precioCosto: 800, stockActual: 5, stockMinimo: 10, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2821/2821804.png', categoria: 'Panadería', proveedorNombre: 'Distribuidora Pan' },
    { id: 2, codigoInterno: 'P002', descripcion: 'Leche Entera', codigoBarra: '779987654', precioVenta: 1500, precioCosto: 1100, stockActual: 50, stockMinimo: 20, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/869/869504.png', categoria: 'Lácteos', proveedorNombre: 'La Serenísima' },
    { id: 3, codigoInterno: 'P003', descripcion: 'Café Molido', codigoBarra: '779456123', precioVenta: 4500, precioCosto: 3200, stockActual: 0, stockMinimo: 5, activo: true, imagenUrl: 'https://cdn-icons-png.flaticon.com/512/924/924514.png', categoria: 'Almacén', proveedorNombre: 'Café Martínez' },
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

  categories: string[] = ['Panadería', 'Lácteos', 'Almacén', 'Limpieza'];
  providers: string[] = ['Distribuidora Pan', 'La Serenísima', 'Café Martínez', 'Tregar', 'Unilever'];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.refreshTable();
    this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setupFilters() {
    this.dataSource.filterPredicate = (data: Producto, filter: string): boolean => {
      const filterValues = JSON.parse(filter);
      
      const matchesSearch = !filterValues.search || 
        data.descripcion.toLowerCase().includes(filterValues.search) ||
        data.codigoInterno.toLowerCase().includes(filterValues.search) ||
        (data.codigoBarra?.includes(filterValues.search) ?? false);

      const matchesCategory = !filterValues.categoria || data.categoria === filterValues.categoria;
      const matchesProvider = !filterValues.proveedor || data.proveedorNombre === filterValues.proveedor;
      const matchesLowStock = !filterValues.soloStockBajo || (data.stockActual <= (data.stockMinimo ?? 0));

      return Boolean(matchesSearch && matchesCategory && matchesProvider && matchesLowStock);
    };

    this.searchControl.valueChanges.subscribe(() => this.applyFilters());
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const filterValue = {
      search: this.searchControl.value?.toLowerCase() || '',
      categoria: this.filterForm.value.categoria || '',
      proveedor: this.filterForm.value.proveedor || '',
      soloStockBajo: this.filterForm.value.soloStockBajo || false
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  getStockStatus(product: Producto): 'normal' | 'low' | 'out' {
    if (product.stockActual === 0) return 'out';
    if (product.stockActual <= (product.stockMinimo || 0)) return 'low';
    return 'normal';
  }

  // Lógica de Gestión
  openNewProduct() {
    const dialogRef = this.dialog.open(ModalFormularioProductoComponent, {
      width: '900px',
      data: { producto: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProduct = { ...result, id: Date.now(), stockActual: 0 };
        this.products.push(newProduct);
        this.refreshTable();
        this.snackBar.open('Producto creado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openNuevoIngreso() {
    const dialogRef = this.dialog.open(ModalFormularioIngresoComponent, {
      width: '850px',
      data: { proveedores: this.providers, productos: this.products }
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
        this.dataSource.data = [...this.products];
        this.snackBar.open('Ingreso registrado y stock actualizado con éxito', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editProduct(producto: Producto) {
    const dialogRef = this.dialog.open(ModalFormularioProductoComponent, {
      width: '900px',
      data: { producto: { ...producto } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.products.findIndex(p => p.id === producto.id);
        if (index !== -1) {
          this.products[index] = { 
            ...result, 
            id: producto.id, 
            stockActual: this.products[index].stockActual 
          };
          this.refreshTable();
          this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }

  toggleStatus(producto: Producto) {
    producto.activo = !producto.activo;
    this.refreshTable();
    this.snackBar.open(`Producto ${producto.activo ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
  }

  refreshTable() {
    this.dataSource.data = [...this.products];
  }

  viewProduct(p: Producto) { console.log('Ver', p); }
  viewMovements(p: Producto) { console.log('Movimientos', p); }
}
