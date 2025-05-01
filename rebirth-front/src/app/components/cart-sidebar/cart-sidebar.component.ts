// cart-sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit {
  isOpen: boolean = false;
  
  // Inicialización directa de cartItems$
  cartItems$: Observable<any[]> = new Observable();
  subtotal$: Observable<number> = new Observable();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems$ = this.cartService.getCartItems();
    this.subtotal$ = this.cartService.subtotal$;

    this.cartItems$.subscribe(items => {
      console.log('Items en el carrito:', items); // Para depuración
    });
  }

  // Método para abrir y cerrar el carrito
  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  // Método para eliminar un producto del carrito
  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  // Método para aumentar la cantidad de un producto
  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }
}
