import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // ✅ Importar NgFor
import { RouterLink } from '@angular/router';
import { Talla } from '../../models/talla.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [NgFor, RouterLink, NgIf, CommonModule], // ✅ Agregar NgFor aquí
  standalone: true, // ❗️ Solo si es un componente independiente
})

export class HomeComponent implements OnInit {
  products: any[] = [];
  productosAgrupadosPorColor: {
    [productId: number]: { [color: string]: boolean;};
  } = {};

  private productService = inject(ProductService);
  
  groupProductsByColor() {
    this.products.forEach((product) => {
      const id = product.id_producto;

      if (!this.productosAgrupadosPorColor[id]) {
        this.productosAgrupadosPorColor[id] = {};
      }

      product.tallas.forEach((talla: Talla) => {
        const color = talla.color;
        const stockDisponible = talla.stock > 0;

        // Si ya existe el color y tiene stock disponible, asigna true
        if (stockDisponible) {
          this.productosAgrupadosPorColor[id][color] = true;
        } 

        // Si no tiene stock disponible, solo asigna false si aún no se ha asignado
        else if (!(color in this.productosAgrupadosPorColor[id])) {
          this.productosAgrupadosPorColor[id][color] = false;
        }

        });
    });
  };

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.groupProductsByColor();
        console.log(this.productosAgrupadosPorColor);
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }
}

