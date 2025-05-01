import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Importar ReactiveFormsModule

@Component({
  selector: 'app-confirmation',
  imports: [
    CommonModule,
    ReactiveFormsModule // ✅ Agregar aquí
  ],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ExpressCheckoutComponent {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
      phone: ['', Validators.required],
      country: ['Colombia'],
      shipping: ['priority'],
      payment: ['creditCard']
    });
  }

  getShippingCost(): string {
    return this.checkoutForm.value.shipping === 'priority' ? '$12.77' : '$57.65';
  }

  getTotalCost(): string {
    const subtotal = 43.50;
    const shipping = this.checkoutForm.value.shipping === 'priority' ? 12.77 : 57.65;
    const taxes = 7.98;
    return `$${(subtotal + shipping + taxes).toFixed(2)}`;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Order submitted:', this.checkoutForm.value);
      alert('Order placed successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
