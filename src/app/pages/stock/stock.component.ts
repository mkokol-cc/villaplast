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
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { Producto } from '../../model/Producto';
import { Proveedor } from '../../model/Proveedor';
import { Ingreso } from '../../model/Ingreso';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { IngresosService } from '../../services/ingresos.service';
import { BuscadorCategoriaComponent } from '../../components/buscador-categoria/buscador-categoria.component';
import { BuscadorProveedorComponent } from '../../components/buscador-proveedor/buscador-proveedor.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormularioProductoComponent } from '../../components/modal-formulario-producto/modal-formulario-producto.component';
import { ModalFormularioIngresoComponent } from '../../components/modal-formulario-ingreso/modal-formulario-ingreso.component';

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
    MatDialogModule,
    MatPaginatorModule,
    BuscadorCategoriaComponent,
    BuscadorProveedorComponent
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchControl = new FormControl('');
  filterForm = new FormGroup({
    categoria: new FormControl(''),
    proveedor: new FormControl<Proveedor | string | null>(''),
    soloStockBajo: new FormControl(false)
  });

  displayedColumns: string[] = ['imagen', 'codigoBarra', 'descripcion', 'stockActual', 'precioVenta', 'proveedorNombre', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);

  private products: Producto[] = [];
  categories: string[] = [];
  providers: Proveedor[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private proveedoresService: ProveedoresService,
    private ingresosService: IngresosService
  ) {}

  onCategoriaCreated(nombre: string) {
    if (!nombre) return;
    if (!this.categories.includes(nombre)) this.categories.push(nombre);
    this.filterForm.patchValue({ categoria: nombre });
  }

  onProveedorCreated(p: Proveedor) {
    if (!p) return;
    if (!this.providers.find(pr => pr.id === p.id)) this.providers.push(p);
    this.filterForm.patchValue({ proveedor: p });
  }

  ngOnInit() {
    this.productosService.getAll().subscribe(data => {
      this.products = data;
      this.refreshTable();
    });
    this.categoriasService.getAll().subscribe(data => {
      this.categories = data;
    });
    this.proveedoresService.getAll().subscribe(data => {
      this.providers = data;
    });
    this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const intl: MatPaginatorIntl = this.paginator._intl as MatPaginatorIntl;
    intl.itemsPerPageLabel = 'Elementos por página';
    intl.nextPageLabel = 'Página siguiente';
    intl.previousPageLabel = 'Página anterior';
    intl.firstPageLabel = 'Primera página';
    intl.lastPageLabel = 'Última página';
    intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      const startIndex = page * pageSize + 1;
      const endIndex = Math.min(length, (page + 1) * pageSize);
      return `${startIndex} - ${endIndex} de ${length}`;
    };
    try { (intl as any).changes.next(); } catch (e) { }
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
    const provVal = this.filterForm.value.proveedor;
    const provName = typeof provVal === 'string' ? (provVal || '') : (provVal?.razonSocial || '');
    const filterValue = {
      search: this.searchControl.value?.toLowerCase() || '',
      categoria: this.filterForm.value.categoria || '',
      proveedor: provName,
      soloStockBajo: this.filterForm.value.soloStockBajo || false
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  limpiarFiltros() {
    this.searchControl.setValue('');
    this.filterForm.reset({ categoria: '', proveedor: '', soloStockBajo: false });
    this.refreshTable();
    this.applyFilters();
  }

  getStockStatus(product: Producto): 'normal' | 'low' | 'out' {
    if (product.stockActual === 0) return 'out';
    if (product.stockActual <= (product.stockMinimo || 0)) return 'low';
    return 'normal';
  }

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
      data: { proveedores: this.providers, productos: this.products },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
