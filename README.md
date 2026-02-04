# Chilli Tandori - Frontend

Aplicación web para el restaurante Chilli Tandori en El Campello, Alicante.

## 🚀 Instalación

### Requisitos previos
- Node.js (versión 18 o superior)
- npm (viene con Node.js)

### Paso 1: Instalar dependencias

Abre una terminal en la carpeta `FrontEnd` y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- React 18
- React Router DOM (para navegación)
- i18next (para traducciones ES/EN)
- Vite (servidor de desarrollo)

## 🎯 Ejecutar el proyecto

### Modo desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:3000`

La página se abrirá automáticamente en tu navegador.

### Compilar para producción

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`

## 📁 Estructura del proyecto

```
FrontEnd/
├── public/
│   └── images/
│       ├── general/        # Imágenes del carrusel (INI_*.jpg)
│       ├── carta/          # Fotos de platos (17.jpg, 18.jpg, etc.)
│       └── alergenos/      # Iconos de alérgenos (1.png, 2.png, etc.)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Páginas principales
│   │   ├── Inicio.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Carta.jsx
│   │   └── Contactar.jsx
│   ├── context/            # Contextos de React
│   │   └── LanguageContext.jsx
│   ├── hooks/              # Custom hooks
│   ├── locales/            # Traducciones
│   │   ├── es.json         # Español
│   │   └── en.json         # Inglés
│   ├── data/               # Datos JSON
│   │   ├── categorias.json
│   │   ├── carta.json
│   │   └── alergenos.json
│   ├── utils/              # Utilidades
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   ├── i18n.js             # Configuración de i18next
│   └── index.css           # Estilos globales
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 Funcionalidades implementadas

### ✅ Fase 1 (COMPLETADA)
- [x] Configuración de React + Vite
- [x] Sistema bilingüe (Español/Inglés) con i18next
- [x] Navegación con React Router
- [x] Estructura de páginas básicas
- [x] Header con menú y selector de idioma
- [x] Footer
- [x] Página de Contacto con información real

### ⏳ Próximas fases
- [ ] Carrusel de imágenes en Inicio
- [ ] Página de Carta completa (categorías, platos, alérgenos)
- [ ] Sistema de carrito de compras
- [ ] Integración con WhatsApp
- [ ] Menús diarios

## 🎨 Personalización

### Colores

Los colores principales se definen en `src/index.css`:

```css
:root {
  --primary-color: #c41e3a;    /* Rojo */
  --secondary-color: #f4a460;  /* Naranja/dorado */
  --dark-bg: #2c1810;          /* Marrón oscuro */
}
```

Ajusta estos colores según el logo real del restaurante.

### Traducciones

Para añadir o modificar traducciones, edita:
- `src/locales/es.json` (Español)
- `src/locales/en.json` (Inglés)

## 📝 Notas importantes

1. **Datos JSON**: Los archivos JSON (categorias, carta, alergenos) deben estar en `src/data/`
2. **Imágenes**: Las imágenes deben estar en `public/images/` con los nombres correctos
3. **Idioma por defecto**: El idioma inicial es español, se guarda en localStorage

## 🛠️ Scripts disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## ❓ Problemas comunes

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Elimina `node_modules` y ejecuta `npm install` de nuevo

### Los cambios no se reflejan
- Asegúrate de que el servidor esté corriendo (`npm run dev`)
- Recarga la página con Ctrl+F5 (recarga forzada)

### Errores de importación
- Verifica que las rutas de importación sean correctas
- Los archivos JSX deben tener extensión `.jsx`

## 📞 Soporte

Para dudas o problemas, contacta al desarrollador.
