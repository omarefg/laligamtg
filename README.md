# Liga MTG Commander

Una aplicación web para gestionar una liga de Magic: The Gathering Commander con 9 jugadores.

## Características

- 📊 **Leaderboard** - Tabla de posiciones en tiempo real
- 🎮 **Resultados de Rondas** - Historial completo de partidas
- 👤 **Perfiles de Jugadores** - Stats detallados, commanders y cartas baneadas
- 📋 **Reglas** - Documentación completa del formato
- 🛡️ **Panel Admin** - Gestión de datos (solo para scorekeeper)

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos con tema dark MTG
- **Supabase** - Base de datos y autenticación
- **Vercel** - Hosting y deployment

## Setup Local

1. **Clonar el proyecto**
```bash
git clone <repo>
cd liga-web
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir** [http://localhost:3000](http://localhost:3000)

## Configuración de Supabase

### 1. Crear proyecto en Supabase
- Ve a [supabase.com](https://supabase.com)
- Crea un nuevo proyecto
- Obtén las credenciales de Project Settings > API

### 2. Configurar autenticación
- Ve a Authentication > Settings
- Desactiva "Enable email confirmations"
- Configura las URLs de redirect si es necesario

### 3. Crear usuarios (admin task)
Los usuarios se crean directamente en Supabase Auth con metadata:

```sql
-- Ejemplo de metadata para un jugador
{
  "displayName": "Nombre del Jugador",
  "avatarUrl": "https://example.com/avatar.jpg",
  "wins": 0,
  "seconds": 0,
  "thirds": 0,
  "saves": 0,
  "losses": 0,
  "commanders": ["Commander 1", "Commander 2"],
  "rounds": [],
  "bannedCards": []
}
```

## Estructura del Proyecto

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Leaderboard (home)
│   ├── rounds/page.tsx    # Resultados de rondas
│   ├── rules/page.tsx     # Reglas de la liga
│   ├── players/[id]/      # Detalle de jugador
│   └── admin/page.tsx     # Panel de administración
├── components/
│   └── Layout.tsx         # Layout principal con nav
├── lib/
│   ├── supabase.ts        # Cliente Supabase
│   └── supabase-server.ts # Server-side Supabase
├── types/
│   └── index.ts           # Tipos TypeScript
└── middleware.ts          # Middleware de Supabase
```

## Sistema de Puntuación

- **1º lugar**: 3 puntos
- **2º lugar**: 2 puntos  
- **3º lugar**: 1 punto
- **4º lugar**: 0 puntos
- **Save**: +1 punto (máximo 1 por partida)

## Deploy en Vercel

1. **Push a GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Conectar en Vercel**
- Ve a [vercel.com](https://vercel.com)
- Import from GitHub
- Configura las variables de entorno

3. **Variables de entorno en Vercel**
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_key
```

## Próximas Características

- [ ] Formulario admin para agregar resultados
- [ ] Editor de metadata de jugadores
- [ ] Gestión visual de cartas baneadas
- [ ] Generador de emparejamientos
- [ ] Exportar datos de liga
- [ ] Sistema de notificaciones

## Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
