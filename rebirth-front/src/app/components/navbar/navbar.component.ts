import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart-service/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CartSidebarComponent, CommonModule], // ✅ Importar el sidebar aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartSize: number = 0;

  // 🛒 Referencia al sidebar
  @ViewChild('cartSidebar') cartSidebar!: CartSidebarComponent;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartSize$.subscribe(size => {
      this.cartSize = size; // Actualizar el tamaño del carrito
    });
  }

  
  // 🔹 Método para abrir/cerrar el sidebar
  toggleCart() {
    this.cartSidebar.toggleCart(); // Llamar al método del sidebar
  }
}