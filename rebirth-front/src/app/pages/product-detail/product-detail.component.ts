import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    RouterModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: any = null;

  private cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}
  
  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.loadProductDetails(this.productId);
    }
  }

  loadProductDetails(id: string): void {
    const apiUrl = `http://localhost:4000/productos/${id}`;
    this.http.get(apiUrl).subscribe({
      next: (data) => {
        this.product = data;
        console.log('Producto obtenido:', this.product);
      },
      error: (err) => console.error('Error al obtener el producto:', err),
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      console.log('Producto añadido al carrito:', this.product);
    } else {
      console.error('No se puede añadir al carrito, producto no encontrado.');
    }
  }

}
