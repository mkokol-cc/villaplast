import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PosComponent } from './pages/pos/pos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { StockComponent } from './pages/stock/stock.component';
import { VentasComponent } from './pages/ventas/ventas.component';

export const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent, 
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component:PosComponent },
            { path: 'stock', component:StockComponent },
            { path: 'remitos', component:IngresosComponent },
            { path: 'proveedores', component:ProveedoresComponent },
            { path: 'clientes', component:ClientesComponent },
            { path: 'ventas', component:VentasComponent }
        ]
    },
];
