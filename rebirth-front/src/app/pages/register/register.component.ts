import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  register() {
    const apiUrl = 'http://localhost:4000/usuarios/registro';
    const user = {
      nombre: this.name,
      email: this.email,
      contraseña: this.password,
      rol: 'cliente'
    };

    this.http.post(apiUrl, user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response)
        this.errorMessage = "";
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'error';
        } else {
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo.';
          console.log('Error en el registro:', error);
          console.error('Mensaje del backend:', error.error?.message);
          console.log(user);
        }
    }});
  }
}
