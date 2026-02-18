# 📚 MACKENNA - Sistema de Gestión de Biblioteca Digital

Sistema web desarrollado en Angular para la gestión y visualización de una biblioteca digital de libros académicos, integrado con Google Sheets como fuente de datos.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Modelos de Datos](#modelos-de-datos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Características Principales](#características-principales)
- [Scripts Disponibles](#scripts-disponibles)
- [Testing](#testing)

## 🎯 Descripción General

MACKENNA es una aplicación web de biblioteca digital que permite gestionar y visualizar colecciones de libros académicos organizados por carreras, cursos y temas. La aplicación consume datos directamente desde Google Sheets en formato CSV y los presenta de manera interactiva con capacidades de búsqueda, filtrado y paginación.

### Funcionalidades Principales:
- 🔐 Sistema de autenticación con cookies
- 📊 Visualización de libros en tablas interactivas con Angular Material
- 🔍 Búsqueda y filtrado avanzado de contenido
- 📑 Paginación y ordenamiento de resultados
- 📱 Diseño responsivo con Bootstrap
- 🔔 Notificaciones en tiempo real con Toastr
- 📄 Integración con Google Drive para vista previa de documentos

## 🛠️ Tecnologías Utilizadas

### Framework Principal
- **Angular 18.1.1** - Framework principal de desarrollo
- **TypeScript 5.4.2** - Lenguaje de programación

### Librerías de UI/UX
- **Angular Material 18.0.6** - Componentes de interfaz (tablas, paginadores, formularios)
- **Bootstrap 5.3.3** - Framework CSS para diseño responsivo
- **Angular Animations 18.1.1** - Sistema de animaciones

### Gestión de Estado y Datos
- **RxJS 7.8.0** - Programación reactiva y manejo de observables
- **HttpClient** - Consumo de APIs y datos externos
- **PapaParse 5.4.1** - Parser de archivos CSV

### Utilidades y Herramientas
- **ngx-toastr 19.0.0** - Sistema de notificaciones toast
- **ngx-cookie-service 18.0.0** - Gestión de cookies para autenticación
- **Angular Router** - Navegación entre vistas
- **Angular Forms** - Manejo de formularios reactivos y template-driven

### Herramientas de Desarrollo
- **Angular CLI 18.1.1** - Herramienta de línea de comandos
- **Jasmine 5.1.0** - Framework de testing
- **Karma 6.4.0** - Test runner
- **Angular DevKit** - Herramientas de construcción y desarrollo
- **angular-cli-ghpages 2.0.1** - Despliegue en GitHub Pages

## 🏗️ Arquitectura del Proyecto

```
MACKENNA/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Componente de cabecera
│   │   │   ├── home/            # Página principal
│   │   │   ├── login/           # Sistema de autenticación
│   │   │   └── table/           # Tabla de libros con Material
│   │   ├── model/               # Interfaces TypeScript
│   │   │   ├── carrera.ts       # Modelo de Carrera
│   │   │   ├── curso.ts         # Modelo de Curso
│   │   │   ├── libro.ts         # Modelo de Libro
│   │   │   └── tema.ts          # Modelo de Tema
│   │   ├── service/             # Servicios de la aplicación
│   │   │   ├── libro.service.ts # Servicio para obtener libros
│   │   │   └── login.service.ts # Servicio de autenticación
│   │   ├── app.config.ts        # Configuración de la aplicación
│   │   ├── app.routes.ts        # Definición de rutas
│   │   └── app.component.ts     # Componente raíz
│   ├── assets/
│   │   ├── image/               # Imágenes del proyecto
│   │   └── JS/                  # Scripts externos
│   ├── index.html               # HTML principal
│   ├── main.ts                  # Punto de entrada
│   └── styles.css               # Estilos globales
├── angular.json                 # Configuración de Angular
├── package.json                 # Dependencias del proyecto
└── tsconfig.json               # Configuración de TypeScript
```

## 🧩 Componentes Principales

### 1. **LoginComponent**
- Gestiona la autenticación de usuarios
- Valida credenciales contra una contraseña almacenada
- Maneja cookies para persistir sesiones
- Muestra notificaciones de error/éxito con Toastr
- Redirecciona a la página principal tras login exitoso

### 2. **HomeComponent**
- Página principal de la aplicación
- Contiene el HeaderComponent y TableComponent
- Punto de entrada después de la autenticación

### 3. **HeaderComponent**
- Barra de navegación superior
- Información del usuario y controles de sesión

### 4. **TableComponent**
- Componente más complejo del sistema
- Implementa `MatTableDataSource` para tablas de Angular Material
- Integración con `MatPaginator` para paginación
- Integración con `MatSort` para ordenamiento
- Consume datos desde Google Sheets vía CSV
- Parsea CSV con PapaParse
- Filtra y organiza datos por Carreras, Cursos y Temas
- Vista previa de documentos desde Google Drive
- Sidebar navegable con estructura jerárquica

## 🔧 Servicios

### **LibroService**
```typescript
- getLibros(): Observable<any>
```
- Consume datos desde Google Sheets publicadas como CSV
- URL: Google Sheets público en formato CSV
- Retorna un Observable con los datos en formato texto
- Utiliza HttpClient para peticiones HTTP

### **LoginService**
```typescript
- setCookie(key: string, value: string): void
```
- Gestiona cookies de sesión con ngx-cookie-service
- Maneja la persistencia de autenticación
- Integración con el Router para navegación

## 📊 Modelos de Datos

### **Libro**
```typescript
interface Libro {
  Folder: string;
  Name: string;
  "Date Last Updated": string;
  URL: string;
  ID: string;
  Description: string;
  Type: string;
  Autor: string;
  Editorial: string;
  Año: string;
  ciclo: string;
}
```

### **Carrera**
```typescript
interface Carrera {
  descripcion: string;
  cursos: Curso[];
}
```

### **Curso**
```typescript
// Contiene información de cursos dentro de una carrera
```

### **Tema**
```typescript
// Representa temas dentro de los cursos
```

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (viene con Node.js)
- Angular CLI 18.1.1

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/MACKENNA.git
cd MACKENNA
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar Angular CLI (si no está instalado)**
```bash
npm install -g @angular/cli@18.1.1
```

## 🚀 Uso

### Servidor de Desarrollo

Ejecutar el servidor de desarrollo:
```bash
npm start
# o
ng serve
```

Navegar a `http://localhost:4200/`. La aplicación se recargará automáticamente al realizar cambios.

### Compilación para Producción

```bash
npm run build
# o
ng build
```

Los archivos compilados se almacenarán en el directorio `dist/libreria-api/`.

### Compilación para Producción Optimizada

```bash
ng build --configuration production
```

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- Login con contraseña
- Gestión de sesiones mediante cookies
- Protección de rutas
- Notificaciones de autenticación

### 📊 Gestión de Datos
- Integración con Google Sheets como base de datos
- Parsing automático de CSV con PapaParse
- Actualización dinámica de contenido
- Estructura jerárquica: Carreras → Cursos → Temas → Libros

### 🎨 Interfaz de Usuario
- Diseño responsivo con Bootstrap 5
- Componentes Material Design
- Tablas interactivas con:
  - Búsqueda en tiempo real
  - Ordenamiento por columnas
  - Paginación configurable
  - Filtros dinámicos
- Sidebar navegable con estructura de árbol
- Vista previa integrada de documentos de Google Drive

### 🔔 Notificaciones
- Sistema de notificaciones Toastr
- Configuración personalizada:
  - Posición: top-right
  - Tiempo: 3000ms
  - Botón de cierre
  - Barra de progreso

### 🎯 Características Técnicas
- Componentes standalone de Angular (sin módulos NgModule)
- Programación reactiva con RxJS
- Inyección de dependencias
- Lazy loading preparado
- TypeScript estricto
- Testing unitario con Jasmine/Karma

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm start          # Inicia servidor de desarrollo
ng serve           # Alternativa con Angular CLI
```

### Build
```bash
npm run build      # Compila el proyecto
ng build          # Alternativa con Angular CLI
```

### Testing
```bash
npm test          # Ejecuta tests unitarios
ng test           # Alternativa con Angular CLI
```

### Linting
```bash
npm run lint      # Verifica código (si está configurado)
ng lint           # Alternativa con Angular CLI
```

## 🧪 Testing

El proyecto utiliza **Jasmine** como framework de testing y **Karma** como test runner.

### Ejecutar Tests Unitarios
```bash
ng test
```

### Tests Disponibles
Cada componente, servicio y modelo tiene su archivo de especificación:
- `*.component.spec.ts` - Tests de componentes
- `*.service.spec.ts` - Tests de servicios
- `*.spec.ts` - Tests de modelos

### Configuración de Testing
- **Framework**: Jasmine 5.1.0
- **Test Runner**: Karma 6.4.0
- **Reporter**: karma-jasmine-html-reporter
- **Coverage**: karma-coverage

## 🔧 Configuración

### Configuración de la Aplicación (app.config.ts)
```typescript
- provideRouter(routes)           # Configuración de rutas
- provideToastr(...)              # Configuración de notificaciones
- provideAnimations()             # Habilitación de animaciones
- provideZoneChangeDetection()    # Detección de cambios optimizada
```

### Rutas Configuradas
- `/` → LoginComponent (ruta por defecto)
- `/login` → LoginComponent
- `/home` → HomeComponent (requiere autenticación)

### Estilos Globales
El proyecto incluye:
- Angular Material theme: `azure-blue`
- Bootstrap 5.3.3
- Toastr CSS
- Estilos personalizados para Sidebar
- Estilos globales en `styles.css`

## 🌐 Integración con Google Sheets

El sistema consume datos directamente desde una hoja de cálculo de Google Sheets publicada como CSV. Esto permite:
- Actualización de contenido sin redesplegar la aplicación
- Gestión de datos desde una interfaz familiar (Sheets)
- Colaboración multi-usuario en la gestión de contenido
- Sin necesidad de base de datos backend

### Estructura Esperada del CSV
El CSV debe contener columnas correspondientes a la interfaz `Libro`:
- Folder, Name, Date Last Updated, URL, ID, Description, Type, Autor, Editorial, Año, ciclo

## 👨‍💻 Desarrollo

### Generar Nuevo Componente
```bash
ng generate component nombre-componente
```

### Generar Nuevo Servicio
```bash
ng generate service nombre-servicio
```

### Generar Nueva Interfaz
```bash
ng generate interface nombre-interfaz
```

## 📄 Licencia

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.0.3.

## 📞 Ayuda Adicional

Para obtener más ayuda sobre Angular CLI usa `ng help` o visita la [Documentación Oficial de Angular CLI](https://angular.dev/tools/cli).

---

**Generado con Angular 18 | Powered by Google Sheets**
