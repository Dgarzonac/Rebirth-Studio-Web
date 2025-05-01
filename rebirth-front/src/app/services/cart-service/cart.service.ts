import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = []; // Lista de productos en el carrito
  private cartSubject = new BehaviorSubject<any[]>([]); // 🔹 Observable de los productos
  private cartSizeSubject = new BehaviorSubject<number>(0); // 🔹 Observable del tamaño del carrito
  private subtotalSubject = new BehaviorSubject<number>(0); // 🔹 Observable del subtotal

  cartSize$ = this.cartSizeSubject.asObservable(); // 🔹 Observable del tamaño
  cartItems$ = this.cartSubject.asObservable(); // 🔹 Observable de los productos
  subtotal$ = this.subtotalSubject.asObservable(); // 🔹 Observable del subtotal

  constructor() {}

  // 🛒 Agregar producto al carrito o aumentar su cantidad si ya existe
  addToCart(product: any) {
    const existingProductIndex = this.cart.findIndex(p => p.id === product.id); // Buscar si ya está el producto en el carrito

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, solo aumentamos la cantidad
      this.cart[existingProductIndex].cantidad += 1; 
    } else {
      // Si no está, lo agregamos con cantidad 1
      product.cantidad = 1;
      this.cart.push(product);
    }

    this.cartSubject.next([...this.cart]); // 🔹 Notificar cambio en la lista
    this.cartSizeSubject.next(this.cart.length); // 🔹 Notificar nuevo tamaño

    // Actualizamos el subtotal
    this.updateSubtotal();
  }


  // 📦 Obtener los productos del carrito como observable
  getCartItems() {
    return this.cartItems$;
  }

  // 🗑 Vaciar carrito
  clearCart() {
    this.cart = [];
    this.cartSubject.next([...this.cart]); // 🔹 Notificar carrito vacío
    this.cartSizeSubject.next(0);
    this.subtotalSubject.next(0); // 🔹 Establecer subtotal en 0 al vaciar el carrito
  }

  // ❌ Remover un producto específico del carrito
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.cartSubject.next([...this.cart]); // 🔹 Notificar cambio
    this.cartSizeSubject.next(this.cart.length);
    this.updateSubtotal(); // 🔹 Actualizar subtotal al eliminar un producto
  }

  // 💲 Método para actualizar el subtotal
  private updateSubtotal() {
    const subtotal = this.cart.reduce((total, product) => total + (Number(product.precio) * product.cantidad), 0); // Multiplicar el precio por la cantidad
    this.subtotalSubject.next(subtotal); // 🔹 Notificar cambio en el subtotal
  }

  // 💲 Método para aumentar la cantidad de un producto en el carrito
  increaseQuantity(productId: number) {
    const productIndex = this.cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      this.cart[productIndex].cantidad += 1; // Aumentar la cantidad
      this.cartSubject.next([...this.cart]); // 🔹 Notificar cambio
      this.updateSubtotal(); // 🔹 Actualizar el subtotal
    }
  }

  // 💲 Método para disminuir la cantidad de un producto en el carrito
  decreaseQuantity(productId: number) {
    const productIndex = this.cart.findIndex(p => p.id === productId);
    if (productIndex !== -1 && this.cart[productIndex].cantidad > 1) {
      this.cart[productIndex].cantidad -= 1; // Disminuir la cantidad
      this.cartSubject.next([...this.cart]); // 🔹 Notificar cambio
      this.updateSubtotal(); // 🔹 Actualizar el subtotal
    }
  }


}
