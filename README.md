# 🛒 SpendList - Gestión Inteligente de Listas de Compras

Una aplicación web moderna para crear y gestionar listas de compras con control de gastos en tiempo real, construida con Astro, React y TypeScript.

![SpendList Demo](https://res.cloudinary.com/ddinz4ewu/image/upload/v1757170745/Recursos/SpendList/Home_rsufn1.webp) 

## 🚀 Características

- **✨ Gestión de Listas**: Crear, editar y eliminar listas de compras personalizadas
- **💰 Control de Gastos**: Cálculo automático del precio total con desglose por artículo
- **📱 Diseño Responsivo**: Interfaz optimizada para dispositivos móviles y desktop
- **🌙 Modo Oscuro**: Alternancia entre tema claro y oscuro
- **💾 Almacenamiento Local**: Persistencia de datos en localStorage para modo demo
- **🗄️ Base de Datos**: Integración con Turso (SQLite) para almacenamiento persistente
- **📊 Estadísticas**: Visualización de cantidad de artículos y totales
- **🎨 UI Moderna**: Interfaz limpia construida con Tailwind CSS y Radix UI
- **⚡ Rendimiento**: Aplicación rápida gracias a Astro y optimizaciones modernas

## 🛠 Tecnologías Utilizadas

- **Frontend**:  
  ![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)  
  ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

- **Base de Datos**:  
  ![Turso](https://img.shields.io/badge/Turso-4F46E5?logo=sqlite&logoColor=white)  
  ![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

- **Herramientas**:  
  ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radix-ui&logoColor=white)  
  ![Lucide Icons](https://img.shields.io/badge/Lucide-F56565?logo=lucide&logoColor=white)  
  ![PNPM](https://img.shields.io/badge/PNPM-F69220?logo=pnpm&logoColor=white)

## 📦 Instalación

### Requisitos Previos

- Node.js (v18+)
- PNPM (recomendado) o NPM
- Cuenta en [Turso](https://turso.tech/) (opcional para modo producción)

### Pasos para Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Angelbyte96/spendlist.git
   cd spendlist/client
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno** (opcional para modo producción):
   ```env
   # .env
   TURSO_DATABASE_URL=libsql://tu-base-de-datos.turso.io
   TURSO_AUTH_TOKEN=tu-token-de-autorizacion
   ```

4. **Configurar la base de datos**:
   ```bash
   # Ejecutar migraciones (si usas Turso)
   pnpm astro db push
   ```

5. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

6. **Abrir en el navegador**:
   - Navega a `http://localhost:4321`

## 🎮 Uso

### Funcionalidades Principales

1. **Página Principal**:
   - Accede a la página de bienvenida con opciones para probar la app o iniciar sesión

2. **Modo Demo** (`/demo`):
   - **Nueva Lista**: Crea listas de compras desde cero
   - **Mis Listas**: Visualiza y gestiona listas guardadas
   - Almacenamiento en localStorage (no requiere autenticación)

3. **Gestión de Listas**:
   - **Crear**: Asigna un nombre y agrega artículos con precios
   - **Editar**: Modifica nombres, precios y cantidades
   - **Eliminar**: Borra listas completas o artículos individuales
   - **Calcular**: Visualización automática del total

4. **Características Avanzadas**:
   - **Expansión de Listas**: Ver más/menos artículos en listas largas
   - **Fechas**: Registro automático de creación y modificación
   - **Validaciones**: Controles de entrada para datos consistentes

### Navegación

- **`/`**: Página de inicio
- **`/demo`**: Aplicación principal (modo demo)
- **`/demo/nueva-lista`**: Crear nueva lista
- **`/demo/mis-listas`**: Ver listas guardadas
- **`/demo/editar/[id]`**: Editar lista específica
- **`/auth`**: Autenticación (en desarrollo)

## 🗄 Estructura del Proyecto

```
client/
├── src/
│   ├── components/           # Componentes React reutilizables
│   │   ├── AddArticleForm.tsx    # Formulario para agregar artículos
│   │   ├── AppDemo.tsx           # Pantalla principal de la app
│   │   ├── DialogTemplate.tsx    # Modal reutilizable
│   │   ├── ListArticles.tsx      # Lista de artículos
│   │   ├── NewListForm.tsx       # Formulario de nueva lista
│   │   ├── ViewList.tsx          # Visualización de listas
│   │   └── ...
│   ├── pages/                # Rutas de Astro
│   │   ├── index.astro           # Página principal
│   │   ├── demo/                 # Rutas de la aplicación
│   │   ├── api/                  # Endpoints API
│   │   └── auth/                 # Autenticación
│   ├── lib/                  # Utilidades y servicios
│   │   └── localStorageService.ts    # Gestión de localStorage
│   ├── hooks/                # Custom hooks de React
│   ├── types/                # Definiciones de TypeScript
│   ├── utils/                # Funciones utilitarias
│   └── layouts/              # Layouts de Astro
├── db/                       # Configuración de base de datos
│   ├── config.ts                 # Esquema de Astro DB
│   └── seed.ts                   # Datos de prueba
└── public/                   # Archivos estáticos
```

## 🔧 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Construye para producción |
| `pnpm preview` | Vista previa de producción |
| `pnpm astro db push` | Sincroniza esquema de BD |
| `pnpm astro db seed` | Llena BD con datos de prueba |

## 🌐 API Endpoints

- **`GET /api/list`**: Obtener todas las listas
- **`POST /api/finalize`**: Crear nueva lista
- **`PATCH /api/list`**: Actualizar lista existente
- **`DELETE /api/list`**: Eliminar lista
- **`POST /api/items`**: Gestionar artículos de lista

## 🎨 Capturas de Pantalla

### Página Principal
![Página Principal](https://res.cloudinary.com/ddinz4ewu/image/upload/v1757170900/Recursos/SpendList/ListaCompras_cdvreo.webp)

### Nueva Lista
![Nueva Lista](https://res.cloudinary.com/ddinz4ewu/image/upload/v1757171070/Recursos/SpendList/NuevaLista_ophh2f.webp)

### Mis Listas
![Mis Listas](https://res.cloudinary.com/ddinz4ewu/image/upload/v1757172175/Recursos/SpendList/MisListas_zbqief.webp)

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno** en el dashboard
3. **Deploy automático** en cada push

### Otros Servicios

La aplicación es compatible con cualquier servicio que soporte aplicaciones Astro con SSR:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork del proyecto**
2. **Crear rama para tu feature**  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Commit de cambios**
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```
4. **Push a la rama**  
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abrir Pull Request**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Astro](https://astro.build/) - Framework web moderno
- [Radix UI](https://radix-ui.com/) - Componentes UI accesibles
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Lucide](https://lucide.dev/) - Iconos hermosos y consistentes

---

Hecho con ❤️ por [Angelbyte](https://github.com/Angelbyte96)
