# 🎉 U2ActIntCRUDAngular - Sistema de Gestión de Eventos

## 📋 Descripción
Aplicación CRUD completa desarrollada en Angular para gestionar eventos y sus invitados. Esta aplicación demuestra las operaciones básicas de un CRUD (Crear, Leer, Actualizar y Eliminar) usando Angular junto con almacenamiento local (localStorage).

## ✨ Funcionalidades
* **Crear** nuevos eventos con información detallada
* **Leer** eventos de distintas maneras:
  * Vista de lista de todos los eventos
  * Vista detallada de un evento específico
* **Actualizar** información de eventos existentes
* **Eliminar** eventos no deseados o cancelados
* **Gestionar invitados** para cada evento con su propio sistema CRUD
* **Clasificar eventos** por tipo (Boda, XV Años, Bautizo, etc.)
* **Marcar eventos** como virtuales o sorpresa

## 🏗️ Estructura del Proyecto

### 📊 Modelos
- **Event**: Define la estructura de datos para los eventos con propiedades como tipo, capacidad y si es sorpresa
- **Guest**: Define la estructura de datos para los invitados a eventos

### 🔧 Servicios
- **EventService**: Proporciona métodos CRUD para manipular eventos utilizando localStorage
- **GuestService**: Proporciona métodos CRUD para gestionar invitados relacionados a eventos
- **NotificationService**: Maneja las notificaciones y confirmaciones en la aplicación

### 🧩 Componentes
- **EventListComponent**: Muestra la lista de todos los eventos (operación READ) e implementa la funcionalidad de eliminación (operación DELETE)
- **EventFormComponent**: Formulario para crear nuevos eventos o editar existentes (operaciones CREATE y UPDATE)
- **EventDetailsComponent**: Muestra información detallada del evento y gestiona los invitados asociados con su propio CRUD

## 🔄 Rutas de la Aplicación
- `/events`: Lista de todos los eventos
- `/events/new`: Formulario para crear un nuevo evento
- `/events/:id`: Detalles de un evento específico y gestión de invitados
- `/events/edit/:id`: Formulario para editar un evento existente

## 🚀 Tecnologías Utilizadas
- Angular 19
- TypeScript
- HTML5 & CSS3
- Lucide Icons para iconografía
- LocalStorage para persistencia de datos

## ⚙️ Instalación y Ejecución

### Requisitos Previos
- Node.js
- npm

### Comandos para Ejecutar
```bash
# Navegar al directorio del proyecto
cd U2ActIntCRUDAngular

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📚 Aprendizaje de Angular
Este proyecto demuestra varios conceptos importantes de Angular:

1. **Componentes y Directivas**: Uso de componentes, NgIf, NgFor
2. **Servicios e Inyección de Dependencias**: Múltiples servicios para separación de responsabilidades
3. **Enrutamiento**: Navegación entre componentes
4. **Enlace de Datos**: Uso de interpolación, property binding y event binding
5. **Formularios**: Manejo de formularios para entrada de datos
6. **Persistencia de Datos**: Uso de localStorage como almacenamiento persistente
7. **Gestión de tipos con Enums**: Uso de enumeraciones para tipos de eventos
8. **Interfaces de datos**: Definición de estructuras de datos con TypeScript

## ✅ Características CRUD
| Operación | Descripción | Ubicación |
|-----------|-------------|-----------|
| CREATE | Creación de eventos e invitados | EventFormComponent, EventDetailsComponent |
| READ | Listado y detalles de eventos e invitados | EventListComponent, EventDetailsComponent |
| UPDATE | Edición de eventos e invitados existentes | EventFormComponent, EventDetailsComponent |
| DELETE | Eliminación de eventos e invitados | EventListComponent, EventDetailsComponent |

## 🔍 Características de la Gestión de Invitados
- Registro completo de datos del invitado (nombre, origen, acompañantes, etc.)
- Confirmación de asistencia
- Estadísticas de invitados (total, confirmados, personas totales)
- Búsqueda y filtrado de invitados
- Interfaz modal para añadir/editar invitados

## 🎨 Mejoras de Diseño
- Diseño responsivo para distintos dispositivos
- Tarjetas de información con diseño moderno
- Feedback visual para las acciones del usuario
- Barras de progreso para visualizar la capacidad del evento
- Badges para identificar tipos de eventos y características especiales

## 👨‍💻 Autor
Hiram Agustín Acevedo López  
Licenciatura en desarrollo web  
Universidad de Guadalajara  
Optativa: Tópicos selectos de entornos de desarrollo: Frameworks
