import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const apiUrl = 'http://localhost:4000/usuarios/login';
    const user = {
      email: this.email,
      contraseña: this.password,
    };

    this.http.post<any>(apiUrl, user).subscribe({
      next: (response) => {
        const token = response.token;
        if(token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        } else {
          console.error('Token no recibido en la respuesta del backend');
        }
        console.log('Login exitoso:', response)
      },
      error: (error) => console.error('Error en el login:', error)
    });
  }

}
