# Friopacking — Portal de Encuestas

App central para gestionar múltiples evaluaciones de desempeño con React + Vite + Supabase.

## Setup inicial

1. Clona el repo e instala dependencias:
```bash
npm install
```

2. Crea el archivo `.env` a partir del ejemplo:
```bash
cp .env.example .env
```
Rellena con tus credenciales de Supabase (las encuentras en Settings > API).

3. Crea la tabla en Supabase ejecutando el archivo `supabase-schema.sql` en el SQL Editor.

4. Levanta el proyecto:
```bash
npm run dev
```

## Agregar una nueva encuesta

1. Crea un archivo en `/src/encuestas/` siguiendo la estructura de los existentes.
2. Impórtalo en `/src/encuestas/index.js` y agrégalo al array.
3. Listo — aparecerá automáticamente en la home.

## Tipos de preguntas disponibles
- `texto` — campo de texto libre
- `escala` — botones 1 a N con etiquetas
- `opcion_multiple` — radio buttons
- `si_no` — Sí / No

## Despliegue
Compatible con Vercel, Netlify o GitHub Pages (con adaptador de SPA).
