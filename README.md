Este proyecto fue desarrollado con [Create React App](https://github.com/facebook/create-react-app).

## Comandos disponibles

En este propoyecto, podrás correr los siguientes comandos:

### `npm start`

Corre la aplicacion en modo desarrollador.<br>
Abrir [http://localhost:3000](http://localhost:3000) para ver en el navegador.

esta página será recargada si es modificado el código.<br>
colo se podrán ver los errores en consola.

### `npm run build`

Constrye la aplicacion para produccion, la cual se vera reflejada en la carpeta `build`.<br>

ver la seccion de despliegue en: [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mas informacion.

### `npm run deploy`

Levanta el servicio de Express js que permite hacer público el proyecto<br>
En caso de querer cambiar el puerto para su ejecucion, modificar el archivo `server.js`<br>

> es importante que node js este instalado en el servidor que alojará el sistema

### `npm run startAPI`

Levanta una API falsa para pruebas de desarrollo en el puerto 3001 con el archivos json `2018-1-B-S-66106.json` <br>

> será necesario tener instalado json-server de forma
