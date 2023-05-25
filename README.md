# Medic Care - Always taking care of you
<img src="./src/images/logo.png" width="200px" >

## ¿Qué es?
[Medic Care]() es una plataforma desarrollada con el fin de poder proporcionar una herramienta util
a medicos del sector publico y privado para poder llevar el control de los pacientes en uno o más establecimientos.
Esta herramienta tambien permite a las autoridades de la salud poder llevar un control no modificable de los
cambios que se realicen dentro de los expedientes.

## Tecnologías utilizadas
### Para la realización de [Medic Care](), se utilizaron las siguientes tecnologías para front-end:
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" width="30px"> [React](https://es.react.dev)
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png" width="30px"> [HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/sass-1-logo.png" width="30px"> [Sass](https://sass-lang.com)
- <img src="https://www.gstatic.com/devrel-devsite/prod/v2c10fec5dec8e88524872f90bc9df3c3ce398afab445f39d54a016b2c011b9b9/firebase/images/touchicon-180.png" width="30px"> [Firebase](https://firebase.google.com/?hl=es)
### Y se utilizarón las siguientes para back-end:
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png" width="30px"> [PostgreSQL](https://www.postgresql.org)
- <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/299/square_480/supabase-logo-icon_1.png" width="30px"> [Supabase](https://supabase.com)

## Estructura
En este repositorio podrá encontrar los siguientes directorios:<br>
|--Public<br>
|--src <br>
&nbsp;&nbsp;&nbsp;|--config<br>
&nbsp;&nbsp;&nbsp;|--images<br>
&nbsp;&nbsp;&nbsp;|--pages<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--samples<br>

- En el directorio Public, podrá encontrar parte de la metadata de la página, así como iconos y logos.
- En src podrá encontrar todos los elementos del proyecto.
  - En la carpeta config podrá encontrar la configuración de la API utilizada para la recolección de datos de [Supabase](https://supabase.com) utilizando las variables de entorno.
  - En la carpeta images podrá encontrar los logos e imagenes utilizadas dentro del proyecto
  - En la carpeta pages podrá encontrar los componentes que representan las ventanas navegables
    - En la carpeta samples podrá encontrar los componentes utilizados en las ventanas

## ¿Cómo puedo usar la aplicación?
Para poder utilizar la aplicación es necesario clonar el repositorio y en la carpeta raiz ejecutar
```bash
npm i
```
para instalar las dependencias. Luego podrás ejecutar
```bash
npm start
```
para iniciar un servidor local, o
```bash
npm build
```
para generar una carpeta para producción.
Tambien puedes acceder a la aplicación haciendo click [aquí]()
