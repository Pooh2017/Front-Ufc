# Sistema de Gestión de Usuarios y Vehículos

Este proyecto es una aplicación para la gestión de usuarios y vehículos, permitiendo la autenticación, registro, y administración de datos tanto de los usuarios como de los vehículos en el sistema.

## Características

### 1. Registro de Usuario
Permite a los nuevos usuarios registrarse proporcionando su nombre, correo electrónico y contraseña. Los usuarios registrados pueden acceder a sus cuentas mediante el login.

- **Ruta**: `/register`
- **Método**: `POST`
- **Campos requeridos**:
  - `nombre`: Nombre del usuario.
  - `correo`: Correo electrónico único.
  - `contraseña`: Contraseña segura.
  - `foto`: Foto del usuario (opcional).

### 2. Login de Usuario
Los usuarios pueden iniciar sesión con su correo electrónico y contraseña para acceder a su cuenta.

- **Ruta**: `/login`
- **Método**: `POST`
- **Campos requeridos**:
  - `correo`: Correo electrónico del usuario.
  - `contraseña`: Contraseña del usuario.

### 3. Logout de Usuario
Los usuarios pueden cerrar sesión para terminar su sesión activa.

- **Ruta**: `/logout`
- **Método**: `POST`

### 4. CRUD de Usuarios
Los administradores pueden realizar operaciones CRUD sobre los usuarios, como crear, leer, actualizar y eliminar usuarios. Cada usuario tiene los siguientes campos:

- `nombre`: Nombre del usuario.
- `correo`: Correo electrónico del usuario.
- `contraseña`: Contraseña del usuario.
- `foto`: Foto del usuario.

- **Rutas**:
  - `GET /usuarios`: Obtener todos los usuarios.
  - `GET /usuarios/{id}`: Obtener un usuario específico.
  - `POST /usuarios`: Crear un nuevo usuario.
  - `PUT /usuarios/{id}`: Actualizar un usuario.
  - `DELETE /usuarios/{id}`: Eliminar un usuario.

### 5. CRUD de Vehículos
Permite la gestión de vehículos, donde cada vehículo tiene los siguientes atributos: modelo, marca, placa, foto y precio por día.

- **Rutas**:
  - `GET /vehiculos`: Obtener todos los vehículos.
  - `GET /vehiculos/{id}`: Obtener un vehículo específico.
  - `POST /vehiculos`: Crear un nuevo vehículo.
  - `PUT /vehiculos/{id}`: Actualizar un vehículo.
  - `DELETE /vehiculos/{id}`: Eliminar un vehículo.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/carlosupreme/front-prograweb.git
