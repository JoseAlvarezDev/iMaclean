<p align="center">
  <img src="public/icons/logo_light.png" alt="iMaclean Logo" width="120" height="120">
</p>

<h1 align="center">iMaclean</h1>

<p align="center">
  <strong>🧹 El asistente de limpieza inteligente y seguro para tu Mac</strong>
</p>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#uso">Uso</a> •
  <a href="#desarrollo">Desarrollo</a> •
  <a href="#tecnologías">Tecnologías</a> •
  <a href="#licencia">Licencia</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/platform-macOS-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

---

## ⚠️ Disclaimer

> **iMaclean NO está asociado, afiliado, patrocinado ni respaldado por Apple Inc.** 
> 
> macOS, Mac, Finder y otros nombres de productos de Apple son marcas comerciales de Apple Inc. Este proyecto es una herramienta independiente de código abierto creada con fines educativos y de utilidad personal.
> 
> El diseño visual inspirado en macOS se utiliza únicamente para proporcionar una experiencia familiar a los usuarios de Mac. No pretendemos representar a Apple Inc. de ninguna manera.

---

## 📖 Acerca del Proyecto

**iMaclean** es una aplicación web progresiva (PWA) y de escritorio que te ayuda a mantener tu Mac limpio y optimizado. Con una interfaz inspirada en el diseño de Apple, iMaclean te proporciona herramientas visuales para identificar y limpiar archivos innecesarios de forma segura y transparente.

### ¿Por qué iMaclean?

- 🔒 **100% Seguro**: No accedemos directamente a tus archivos. Todo se realiza a través de comandos de terminal que tú ejecutas.
- 👁️ **Transparente**: Puedes ver exactamente qué comandos se van a ejecutar antes de hacerlo.
- 🎨 **Hermoso**: Diseño moderno inspirado en macOS con efectos de glassmorphism.
- 🌍 **Multiidioma**: Disponible en Español e Inglés.
- 📱 **Multiplataforma**: Funciona como web app, PWA instalable y app de escritorio con Electron.

---

## ✨ Características

### 📊 Dashboard
- Vista general del almacenamiento con gráfico interactivo
- Estadísticas de espacio recuperado y archivos limpiados
- Acceso rápido a todas las herramientas de limpieza

### 🗑️ Herramientas de Limpieza
- **Papelera**: Vacía la papelera del sistema
- **Caché**: Limpia archivos temporales de aplicaciones
- **Descargas**: Revisa y elimina descargas antiguas
- **Logs del Sistema**: Limpia registros de diagnóstico
- **Apps Residuales**: Encuentra archivos de apps desinstaladas
- **Archivos Grandes**: Identifica los archivos que más espacio ocupan

### ⏰ Programación de Limpiezas
- Configura limpiezas automáticas
- Elige frecuencia: diaria, semanal o mensual
- Activa/desactiva programaciones fácilmente

### 🎨 Personalización
- Temas: Claro, Oscuro o Automático (según el sistema)
- Cambia el idioma en cualquier momento
- Historial completo de limpiezas realizadas

### 🔔 Notificaciones
- Toasts estilo macOS
- Feedback visual de todas las acciones

---

## 🚀 Instalación

### Requisitos Previos
- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Josealvarezdev/imaclean.git

# Entrar al directorio
cd imaclean

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

### Ejecutar como App de Escritorio (Electron)

```bash
# Modo desarrollo
npm run electron:dev

# Construir para macOS
npm run electron:build:mac

# Construir para Windows
npm run electron:build:win

# Construir para Linux
npm run electron:build:linux
```

---

## 💻 Uso

### Web App
1. Ejecuta `npm run dev`
2. Abre [http://localhost:5173](http://localhost:5173) en tu navegador
3. ¡Empieza a limpiar!

### PWA (Progressive Web App)
1. Abre la app en Chrome o Safari
2. Haz clic en "Instalar" en la barra de direcciones
3. La app se instalará como aplicación nativa

### Electron (App de Escritorio)
1. Ejecuta `npm run electron:dev` para desarrollo
2. O construye el instalador con `npm run electron:build:mac`
3. El archivo `.dmg` estará en la carpeta `release/`

---

## 🛠️ Desarrollo

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo web |
| `npm run build` | Construye para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta el linter |
| `npm run electron:dev` | Inicia Electron en modo desarrollo |
| `npm run electron:build:mac` | Construye .dmg para macOS |
| `npm run electron:build:win` | Construye installer para Windows |
| `npm run electron:build:linux` | Construye AppImage para Linux |

### Estructura del Proyecto

```
imaclean/
├── electron/           # Archivos de Electron
│   ├── main.cjs       # Proceso principal
│   └── preload.cjs    # Script de preload
├── public/
│   └── icons/         # Logos e iconos
├── src/
│   ├── components/    # Componentes React
│   │   ├── Cards/     # Tarjetas de estadísticas
│   │   ├── Charts/    # Gráficos
│   │   ├── Layout/    # Sidebar, WindowFrame
│   │   ├── Modals/    # Modales
│   │   ├── Toast/     # Notificaciones
│   │   └── Views/     # Vistas principales
│   ├── i18n/          # Internacionalización
│   │   └── locales/   # Archivos de traducción
│   ├── store/         # Estado global (Zustand)
│   ├── styles/        # CSS global y variables
│   └── utils/         # Funciones de utilidad
├── index.html
├── package.json
├── vite.config.ts     # Configuración de Vite + PWA
└── tsconfig.json
```

---

## 🔧 Tecnologías

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Electron-34-47848F?logo=electron&logoColor=white" alt="Electron">
</p>

- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones fluidas
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Estado global
- **[Recharts](https://recharts.org/)** - Gráficos
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[i18next](https://www.i18next.com/)** - Internacionalización
- **[Electron](https://www.electronjs.org/)** - App de escritorio
- **[Vite PWA](https://vite-pwa-org.netlify.app/)** - Progressive Web App

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Jose Alvarez**
- GitHub: [@Josealvarezdev](https://github.com/Josealvarezdev)

---

## 🙏 Agradecimientos

- Inspiración de diseño: Apple Design System
- Iconos: [Lucide](https://lucide.dev/)
- Fuentes: [SF Pro](https://developer.apple.com/fonts/) (vía sistema)

---

<p align="center">
  Hecho con ❤️ por <a href="https://github.com/Josealvarezdev">Jose Alvarez</a>
</p>

<p align="center">
  <sub>⚠️ Este proyecto no está afiliado con Apple Inc.</sub>
</p>
