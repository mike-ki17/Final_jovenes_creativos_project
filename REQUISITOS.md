## 🎮 ¡PRESENTACIÓN DEL RETO GAMETRACKER!

### Transición: De Torneos a Biblioteca Personal

**"Ahora que saben manejar datos de jugadores en torneos, vamos a crear algo personal: su propia biblioteca de videojuegos"**

### El Desafío Final

**¡Es hora del desafío final! Un proyecto completamente diferente:**

| Tecnología | Descripción |
|------------|-------------|
| 🖥️ **Backend** | Node.js + Express + MongoDB |
| ⚛️ **Frontend** | React + CSS |
| 🗄️ **Base de Datos** | Mongoose + Atlas |
| 📝 **CRUD** | Juegos + Reseñas |

### 🎯 El Reto: GameTracker - Tu Biblioteca Personal

**Una aplicación completamente diferente donde puedas:**
- 📚 Gestionar tu colección personal de videojuegos
- ⭐ Escribir reseñas detalladas con puntuaciones
- 🔍 Filtrar tu biblioteca por género, plataforma, etc.
- 📊 Ver estadísticas de tus juegos jugados
- ✅ Marcar juegos como completados
- ⏱️ Registrar horas jugadas

### 🗄️ Entidades del CRUD (Diferentes a la Práctica)

#### 1. Videojuegos (Games)
```javascript
{
  _id: ObjectId,
  titulo: String,
  genero: String,           // "Acción", "RPG", "Estrategia", etc.
  plataforma: String,       // "PC", "PlayStation", "Xbox", etc.
  añoLanzamiento: Number,
  desarrollador: String,
  imagenPortada: String,    // URL de la imagen
  descripcion: String,
  completado: Boolean,
  fechaCreacion: Date
}
```

#### 2. Reseñas (Reviews)
```javascript
{
  _id: ObjectId,
  juegoId: ObjectId,        // Referencia al videojuego
  puntuacion: Number,       // 1-5 estrellas
  textoReseña: String,
  horasJugadas: Number,
  dificultad: String,       // "Fácil", "Normal", "Difícil"
  recomendaria: Boolean,
  fechaCreacion: Date,
  fechaActualizacion: Date
}
```

### ⚙️ Backend - API RESTful GameTracker

#### Endpoints para Videojuegos:
- `GET /api/juegos` - Obtener todos los juegos de tu biblioteca
- `GET /api/juegos/:id` - Obtener un juego específico
- `POST /api/juegos` - Agregar juego a tu colección
- `PUT /api/juegos/:id` - Actualizar información del juego
- `DELETE /api/juegos/:id` - Remover juego de tu biblioteca

#### Endpoints para Reseñas:
- `GET /api/reseñas` - Obtener todas tus reseñas
- `GET /api/reseñas/juego/:juegoId` - Reseñas de un juego específico
- `POST /api/reseñas` - Escribir nueva reseña
- `PUT /api/reseñas/:id` - Actualizar reseña existente
- `DELETE /api/reseñas/:id` - Eliminar reseña

### ⚛️ Frontend - React

#### Componentes Principales:
- **BibliotecaJuegos** - Vista principal de la colección
- **TarjetaJuego** - Card individual de cada juego
- **FormularioJuego** - Agregar/editar juegos
- **ListaReseñas** - Vista de reseñas
- **FormularioReseña** - Escribir/editar reseñas
- **EstadisticasPersonales** - Dashboard de estadísticas

#### Funcionalidades Core:
- Ver biblioteca completa con imágenes
- Agregar nuevos juegos con portadas
- Marcar juegos como completados
- Sistema de puntuación con estrellas ⭐
- Escribir reseñas detalladas
- Registro de horas jugadas

### ✨ Características Extra (Opcionales)

#### Filtros y Búsqueda:
- Filtro por género (RPG, Acción, etc.)
- Filtro por plataforma (PC, PlayStation, etc.)
- Solo juegos completados/por completar
- Búsqueda por título o desarrollador
- Ordenamiento por fecha, puntuación, etc.

#### Funcionalidades Avanzadas:
- Dashboard de estadísticas personales
- Modo oscuro 🌙
- Drag & drop para subir portadas
- Gráficos de progreso y tiempo jugado
- Lista de deseos (Wishlist)
- Exportar biblioteca a PDF

### 📋 Entregables del Reto (FECHA: 15 DE NOVIEMBRE DE 2025 POR Q10)

| ✅ | Componente | Descripción |
|----|------------|-------------|
| ✅ | **Backend** | API REST completa con estructura clara, modelos Mongoose y validaciones (Repositorio de Github) |
| ✅ | **Frontend** | Aplicación React funcional con diseño atractivo y todas las funcionalidades (Repositorio de Github) |

## 🎊 ¡Felicidades Developers!

**¡Prepárense para construir su proyecto Full Stack más ambicioso! 🚀**