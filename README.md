# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




```markdown
# Frontend - Gestión de Empresas y Trabajadores

Frontend desarrollado en React para el sistema de gestión de empresas y trabajadores.

## Requisitos Previos

- Node.js 16.x o superior
- npm 8.x o superior
- Backend del proyecto en ejecución (puerto 8080)

## Instalación

1. Clona el repositorio (si aún no lo has hecho):
```bash
git clone <url-del-repositorio>
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

## Ejecución

### Modo Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`

### Modo Producción
```bash
npm run build
```

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/           # Componentes compartidos
│   │   ├── empresa/          # Componentes relacionados con empresas
│   │   └── trabajador/       # Componentes relacionados con trabajadores
│   ├── services/            # Servicios API
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Principales Características

1. **Gestión de Empresas**
   - Listado de empresas
   - Creación de nuevas empresas
   - Edición de empresas existentes
   - Eliminación de empresas

2. **Gestión de Trabajadores**
   - Listado de trabajadores por empresa
   - Creación de nuevos trabajadores
   - Edición de trabajadores existentes
   - Eliminación de trabajadores

## Tecnologías Utilizadas

- React 18
- Material-UI (MUI)
- React Router DOM
- Axios
- date-fns

## Configuración

La configuración de la API se encuentra en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Componentes Principales

### Empresas
- `EmpresaList`: Lista de empresas con funciones CRUD
- `EmpresaForm`: Formulario para crear/editar empresas

### Trabajadores
- `TrabajadorList`: Lista de trabajadores por empresa
- `TrabajadorForm`: Formulario para crear/editar trabajadores

### Componentes Comunes
- `Loading`: Componente de carga
- `Navbar`: Barra de navegación
- `ErrorBoundary`: Manejo de errores

## Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Ejecutar linter
npm run lint
```

## Convenciones de Código

- Usar nombres descriptivos para componentes y funciones
- Mantener componentes pequeños y reutilizables
- Seguir principios de Clean Code
- Documentar funciones y componentes complejos

## Manejo de Estado

- Estados locales con useState para datos de componentes
- Props para pasar datos entre componentes
- useEffect para efectos secundarios y llamadas API

## Navegación

La navegación se maneja con React Router con las siguientes rutas principales:

```javascript
/                                   // Lista de empresas
/empresas/nuevo                     // Crear empresa
/empresas/editar/:id               // Editar empresa
/empresas/:empresaId/trabajadores   // Lista de trabajadores
/empresas/:empresaId/trabajadores/nuevo     // Crear trabajador
/empresas/:empresaId/trabajadores/editar/:id // Editar trabajador
```

## Manejo de Errores

- Validación de formularios
- Manejo de errores de API
- Mensajes de error amigables para el usuario
- Feedback visual para acciones del usuario

## Buenas Prácticas

1. Mantener el código limpio y documentado
2. Usar componentes funcionales y hooks
3. Implementar manejo de errores robusto
4. Seguir principios de diseño responsivo
5. Optimizar rendimiento cuando sea necesario

## Problemas Conocidos y Soluciones

1. Error CORS con el backend:
   - Verificar que el backend esté configurado correctamente
   - Revisar la configuración de CORS en el backend

2. Problemas de caché:
   - Limpiar caché del navegador
   - Usar modo incógnito para pruebas

## Contribuir

1. Crear rama para nueva característica
2. Hacer commit de cambios
3. Asegurar que los tests pasen
4. Crear Pull Request

## Autor

CharlieBravo90Byte

## Última Actualización

29 de Diciembre de 2024
```
