import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DetalleVenta } from '../../model/DetalleVenta';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent {
  @Input() cart: DetalleVenta[] = [];
  @Output() changeQuantity = new EventEmitter<{ item: DetalleVenta; delta: number }>();

  onChange(item: DetalleVenta, delta: number) {
    this.changeQuantity.emit({ item, delta });
  }

  onManualChange(item: DetalleVenta, newVal: string | number) {
    const parsed = typeof newVal === 'number' ? newVal : parseInt(String(newVal), 10);
    if (isNaN(parsed) || parsed < 0) return;
    const delta = parsed - (item.cantidad || 0);
    if (delta === 0) return;
    this.changeQuantity.emit({ item, delta });
  }
}
