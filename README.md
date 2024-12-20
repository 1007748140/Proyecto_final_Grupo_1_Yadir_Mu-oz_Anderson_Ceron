# PROYECTO APIRESTFULL TIENDA VIRTUAL DESARROLLO GRUPO_2

## 📝 Descripción

API RESTful desarrollada en Node.js con TypeScript que proporciona un sistema integral para la gestión de usuarios, roles, facturas y pagos. La API implementa autenticación JWT y sigue las mejores prácticas de desarrollo.

## 🚀 Características Principales

- Gestión completa de usuarios y perfiles
- Sistema de roles y permisos
- Gestión de facturas y pagos
- Detalles de facturación
- Sistema de autenticación JWT
- Validación de datos
- Manejo de errores consistente
- Documentación Swagger

## 🛠️ Tecnologías Utilizadas

- Node.js
- TypeScript
- Express.js
- Sequelize (ORM)
- MySQL
- JSON Web Tokens (JWT)
- Bcrypt.js
- Express Validator
- Swagger UI

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/APIRESTful.git
cd APIRESTful
```

2. Instalar dependencias

``` .
npm install
``` 

3. Configurar variables de entorno

```.
cp .env.example .env
```
4. Editar el archivo .env con tus configuraciones

```.
ENV=dev
NAME='Mi api RESTful'
BASE_URL=http://localhost:3000
DB_HOST='localhost'
DB_DATABASE='nombre_base_datos'
DB_USER='usuario'
DB_PASSWORD='contraseña'
DB_PORT=3306
JWT_SECRET=tu_secreto_jwt
PORT=3001
```

5. Iniciar el servidor:

```.
npm run dev
```