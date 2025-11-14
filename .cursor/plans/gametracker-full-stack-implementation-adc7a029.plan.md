<!-- adc7a029-6920-4ce9-a86a-3c0f5101913d 52382f84-0dfb-41a1-a248-7746c3406913 -->
# Plan de Implementación GameTracker

## Backend - Completar API REST

### 1. Controladores - Agregar operaciones CRUD faltantes

**Archivo: `back/src/controllers/gameController.js`**

- Agregar `createGame` (POST)
- Agregar `updateGame` (PUT)
- Agregar `deleteGame` (DELETE)
- Agregar validaciones de datos

**Archivo: `back/src/controllers/reviewController.js`**

- Agregar `createReview` (POST)
- Agregar `updateReview` (PUT)
- Agregar `deleteReview` (DELETE)
- Agregar `getReviewsByGameId` (GET /api/reseñas/juego/:juegoId)
- Agregar validaciones y verificación de existencia del juego

### 2. Rutas - Completar endpoints

**Archivo: `back/src/routes.js`**

- Agregar POST /api/juegos
- Agregar PUT /api/juegos/:id
- Agregar DELETE /api/juegos/:id
- Agregar GET /api/reseñas/juego/:juegoId
- Agregar POST /api/reseñas
- Agregar PUT /api/reseñas/:id
- Agregar DELETE /api/reseñas/:id
- Considerar usar "/api/reseñas" (con tilde) o mantener "/api/resenas" según preferencia

## Frontend - Construcción Completa

### 3. Estructura de Componentes

**Crear componentes principales:**

- `src/components/BibliotecaJuegos.jsx` - Vista principal con grid de juegos
- `src/components/TarjetaJuego.jsx` - Card individual con imagen, título, info básica
- `src/components/FormularioJuego.jsx` - Modal/formulario para agregar/editar juegos
- `src/components/ListaReseñas.jsx` - Vista de reseñas con filtros
- `src/components/FormularioReseña.jsx` - Formulario para crear/editar reseñas
- `src/components/EstadisticasPersonales.jsx` - Dashboard con estadísticas
- `src/components/Filtros.jsx` - Componente de filtros (género, plataforma, completado)
- `src/components/Buscador.jsx` - Barra de búsqueda

### 4. Servicios y Utilidades

**Archivo: `src/services/api.js`**

- Funciones para todas las operaciones CRUD de juegos
- Funciones para todas las operaciones CRUD de reseñas
- Configuración de base URL del API
- Manejo de errores

### 5. Estado Global y Hooks

**Archivo: `src/context/GameContext.jsx`** (opcional, o usar useState local)

- Context para compartir estado de juegos y reseñas
- O usar hooks personalizados en App.jsx

**Archivo: `src/hooks/useGames.js`** (opcional)

- Hook personalizado para manejar operaciones de juegos

### 6. Estilos y UI - Diseño Cyberpunk Minimalista

**Dependencia: `react-icons`**

- Instalar react-icons para iconografía profesional
- Usar iconos de: FaGamepad, FaStar, FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaCheck, FaClock, etc.

**Archivo: `src/App.css`**

- Estilo cyberpunk minimalista con:
- Paleta cyberpunk: neón cyan/magenta sobre fondo negro profundo
- Efectos de neón sutiles y elegantes (glow effects)
- Bordes delgados con efectos de luz
- Tipografía futurista pero legible
- Layout más compacto y organizado
- Grid más denso para tarjetas más pequeñas
- Navegación minimalista y discreta (sticky pero compacta)
- Tarjetas de juegos más pequeñas y compactas
- Espaciado optimizado para mejor organización
- Efectos de hover sutiles con glow cyberpunk

**Archivo: `src/index.css`**

- Reset CSS moderno
- Variables CSS cyberpunk:
- Colores neón (cyan, magenta, verde neón)
- Fondos negros profundos
- Efectos glow y sombras neón
- Espaciado más compacto
- Breakpoints responsivos
- Estilos globales minimalistas

### 7. Funcionalidades Core del Frontend

**En `App.jsx`:**

- Navegación entre vistas (Biblioteca, Reseñas, Estadísticas)
- Estado para juegos y reseñas
- Funciones para CRUD operations
- Integración de todos los componentes

**Funcionalidades a implementar:**

- Ver biblioteca completa con imágenes
- Agregar/editar/eliminar juegos
- Marcar juegos como completados
- Sistema de puntuación con estrellas (1-5)
- Escribir/editar/eliminar reseñas
- Registro de horas jugadas
- Filtros por género, plataforma, estado completado
- Búsqueda por título/desarrollador
- Dashboard de estadísticas (total juegos, completados, horas totales, etc.)

### 8. Mejoras Adicionales (Opcionales pero recomendadas)

- Manejo de errores con mensajes al usuario
- Loading states durante peticiones
- Confirmación antes de eliminar
- Validación de formularios
- Diseño responsivo para móviles

## Archivos a Modificar/Crear

### Backend:

- `back/src/controllers/gameController.js` - Agregar create, update, delete
- `back/src/controllers/reviewController.js` - Agregar create, update, delete, getByGameId
- `back/src/routes.js` - Agregar todas las rutas faltantes

### Frontend:

- `front/gameTracker/src/App.jsx` - Reemplazar completamente
- `front/gameTracker/src/App.css` - Estilos principales
- `front/gameTracker/src/index.css` - Estilos globales
- `front/gameTracker/src/components/BibliotecaJuegos.jsx` - Nuevo
- `front/gameTracker/src/components/TarjetaJuego.jsx` - Nuevo
- `front/gameTracker/src/components/FormularioJuego.jsx` - Nuevo
- `front/gameTracker/src/components/ListaReseñas.jsx` - Nuevo
- `front/gameTracker/src/components/FormularioReseña.jsx` - Nuevo
- `front/gameTracker/src/components/EstadisticasPersonales.jsx` - Nuevo
- `front/gameTracker/src/components/Filtros.jsx` - Nuevo
- `front/gameTracker/src/components/Buscador.jsx` - Nuevo
- `front/gameTracker/src/services/api.js` - Nuevo

### Dependencias Frontend (si necesario):

- Verificar si se necesita axios para peticiones HTTP (o usar fetch nativo)