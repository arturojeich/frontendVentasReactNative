# FrontendReactNative

Este proyecto fue diseñado en React Native utilizando [Expo](https://expo.dev/), probado en dispositivos Android.

## Prerequisitos

- Node.js >= 18.16.0
- Expo >= 49.0.15
- Firebase Realtime Database [ver info](https://firebase.google.com/docs/database)
- Aplicación de Expo para dispositivos android [ver info](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Para agregar las claves de Firebase Realtime Database

- Primero, se debe [crear una aplicación web](https://firebase.google.com/docs/database/web/start) en Firebase.
- Luego, se deben guardar en el directorio raíz del proyecto, en el archivo `./firebaseConfig.js` las claves obtenidas de aplicación, siguiendo el siguiente formato:

```JS
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "XXX-XXX-XXX",
    authDomain: "XXX-XXX-XXX",
    databaseURL: "XXX-XXX-XXX",
    projectId: "XXX-XXX-XXX",
    storageBucket: "XXX-XXX-XXX",
    messagingSenderId: "XXX-XXX-XXX",
    appId: "XXX-XXX-XXX"
  }
};

const app = initializeApp(firebaseConfig)
export default app
```

## Para iniciar y probar el proyecto

- Clonar este repositorio.
- Instalar todas las dependencias requeridas en el computador:
  `npm install`
- Se debe ejecutar el proyecto:
  `npm start`

- Acceder desde la app Expo, con el dispositivo conectado en la misma red local que el computador, al codigo QR que se muestre en la terminal.
