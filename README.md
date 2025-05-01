# Rebirth Studio Web

**Rebirth Studio** es una plataforma de moda exclusiva enfocada en artistas. Este proyecto contiene tanto el **Frontend** como el **Backend** de la plataforma, los cuales están diseñados para ofrecer una experiencia de compra única y personalizada. El proyecto utiliza **MySQL** como sistema de gestión de bases de datos, **Node.js** y **Express** para el backend, y **Angular** para el frontend.

## Tecnologías Utilizadas

### **Frontend:**
- **Angular**: Framework de JavaScript para construir aplicaciones web dinámicas y SPA (Single Page Applications).
- **RxJS**: Librería para manejar programación reactiva con flujos de datos asíncronos.
- **Bootstrap**: Framework CSS para crear interfaces responsivas y modernas.
- **TypeScript**: Lenguaje que extiende JavaScript con características como tipado estático y clases.

### **Backend:**
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express.js**: Framework para Node.js que facilita la creación de aplicaciones web y APIs RESTful.
- **MySQL**: Base de datos relacional para almacenar datos de usuarios, productos, pedidos, etc.
- **JWT (JSON Web Tokens)**: Utilizado para la autenticación de usuarios y la autorización.
- **Sequelize**: ORM (Object-Relational Mapping) para MySQL que facilita las consultas a la base de datos.

### **Otras herramientas:**
- **Nodemon**: Herramienta que reinicia automáticamente el servidor de Node.js durante el desarrollo.
- **Postman**: Herramienta para realizar pruebas a las API REST.

## Estructura del Proyecto

Este repositorio está organizado en dos partes principales: **Frontend** y **Backend**.

- **rebirth-front/**: Contiene la aplicación de frontend construida con Angular.
  - `src/`: Archivos fuente del frontend, incluyendo componentes, servicios, rutas, etc.
  - `angular.json`: Archivo de configuración de Angular.
  - `package.json`: Lista de dependencias del proyecto Angular.

- **rebirth-backend/**: Contiene la aplicación de backend construida con Node.js y Express.
  - `src/controllers/`: Archivos que gestionan la lógica de los diferentes controladores.
  - `src/middlewares/`: Middleware para la autenticación, manejo de errores, etc.
  - `src/routes/`: Rutas API para la interacción entre frontend y backend.
  - `models/`: Definición de los modelos de base de datos usando Sequelize.
  - `config/`: Configuración de la base de datos y otros ajustes.
  - `package.json`: Lista de dependencias del proyecto backend.

## Funcionalidades

### **1. Iniciar sesión (Login)**
Los usuarios pueden iniciar sesión proporcionando su correo electrónico y contraseña. Si las credenciales son correctas, se les proporcionará un **token JWT** para mantener la sesión activa y acceder a recursos protegidos.

### **2. Registrarse (Register)**
Los usuarios pueden registrarse proporcionando su nombre, correo electrónico y contraseña. El sistema almacena la contraseña de manera segura utilizando bcryptjs para el hash de contraseñas. Al registrarse, el sistema también proporciona un token JWT que permitirá al usuario iniciar sesión.

### **3. Ver productos (View Products)**
Los usuarios pueden ver los productos disponibles en la tienda. La lista de productos incluye el nombre, descripción, precio y una imagen de cada producto.


