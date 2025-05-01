import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // 🔹 Inyectar HttpClient
    const http = appRef.injector.get(HttpClient);

    // 🔹 Probar que HttpClient funciona haciendo una petición GET
    http.get('http://localhost:4000/productos').subscribe({
      next: (products) => console.log('Productos obtenidos:', products),
      error: (err) => console.error('Error al obtener productos:', err),
    });
  })
  .catch((err) => console.error(err));
