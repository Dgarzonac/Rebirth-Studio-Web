import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  
  usuario: any = null;
  cargando: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if(token){
      this.http.get('http://localhost:4000/usuarios/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: (data) => {
          this.usuario = data;
          console.log('Datos:', data);
          this.cargando = false;
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/']); // Redirige al login
  }
  
}
