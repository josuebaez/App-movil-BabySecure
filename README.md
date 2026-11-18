<div align="center">

<img src="assets/images/Logo_BabySecure.png" alt="Logo de BabySecure" width="160" />

# BabySecure · App móvil

**Seguridad y tranquilidad para madres y familiares durante la estancia hospitalaria del recién nacido.**

![Expo](https://img.shields.io/badge/Expo-SDK%2058-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo%20Router-58-000020?logo=expo&logoColor=white)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange)

</div>

---

## ¿Qué es BabySecure?

BabySecure es un sistema de control de accesos para áreas materno-infantiles. Esta aplicación es la parte móvil: permite que **las madres y sus familiares autorizados** consulten los accesos registrados, reciban notificaciones en tiempo real y obtengan su **credencial móvil**.

La app se comunica con el servidor de BabySecure, que a su vez se integra con **Suprema BioStar X** (lectores y credenciales físicas).

> Esta app forma parte de un proyecto más grande. Los paneles web (administración y personal médico) y el servidor viven en su propio código.

## Funciones

| | Función | Descripción |
|---|---|---|
| 🔐 | **Inicio de sesión** | La madre entra con su UID y su confirmación. El familiar, con su correo y el UID de la madre. |
| 📝 | **Registro** | Alta de cuenta con validación de datos y confirmación del UID. |
| 🔑 | **Recuperar contraseña** | Flujo para restablecer el acceso por correo. |
| 🚪 | **Accesos** | Historial de accesos concedidos y denegados, con resumen. |
| 🔔 | **Notificaciones** | Eventos de acceso en tiempo real mediante WebSockets. |
| 🪪 | **Credenciales** | Solicitud y estado de la credencial móvil. |

## Tecnologías

- **[Expo](https://expo.dev) SDK 58** y **React Native 0.88**, con el **React Compiler** activado.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** para la navegación por archivos y rutas tipadas.
- **TypeScript** para todo el código de la app.
- **Axios** para consumir la API REST.
- **Socket.IO Client** para las notificaciones en tiempo real.
- **React Native Reanimated** y **Expo Image** para animaciones e imágenes.

## Estructura del proyecto

```text
babysecure/
├── app/                    # Pantallas (Expo Router)
│   ├── index.tsx           # Entrada
│   ├── LogIn.tsx           # Inicio de sesión
│   ├── Registro.tsx        # Registro
│   ├── OlvidarContrasena.tsx
│   ├── PanelPrincipal.tsx  # Menú principal
│   ├── Accesos.tsx         # Historial de accesos
│   ├── Notificaciones.tsx  # Eventos en tiempo real
│   └── Credenciales.tsx    # Credencial móvil
├── components/             # Componentes reutilizables
├── constants/
│   └── api.ts              # URL de la API y del socket
├── hooks/                  # Hooks de tema y color
├── assets/                 # Imágenes e íconos
└── app.json                # Configuración de Expo
```

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior (probado con 22)
- npm
- La app **Expo Go** en tu teléfono, o un emulador de Android o iOS
- El **servidor de BabySecure** en ejecución y alcanzable desde el teléfono

## Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/josuebaez/App-movil-BabySecure.git
cd App-movil-BabySecure

# 2. Instala las dependencias
npm install

# 3. Crea tu archivo de entorno
cp .env.example .env
```

Abre `.env` y escribe la dirección de tu servidor, **sin diagonal al final**:

```env
EXPO_PUBLIC_API_URL=https://tu-servidor-o-tunel
```

## Ejecución

```bash
npx expo start -c --tunnel
```

Escanea el código QR con Expo Go. La opción `--tunnel` permite que el teléfono llegue a Metro aunque no esté en la misma red.

| Comando | Para qué sirve |
|---|---|
| `npx expo start -c` | Inicia limpiando la caché (úsalo tras cambiar el `.env`) |
| `npm run android` | Abre en un emulador de Android |
| `npm run ios` | Abre en el simulador de iOS (solo macOS) |
| `npm run lint` | Revisa el código con ESLint |

## Configuración del servidor

`constants/api.ts` toma la dirección de `EXPO_PUBLIC_API_URL` en desarrollo y usa la de producción en una compilación final.

> ⚠️ Expo lee las variables `EXPO_PUBLIC_*` **solo al arrancar**. Si cambias el `.env`, reinicia con `npx expo start -c`.

Si publicas el backend con un túnel de Cloudflare de los rápidos (`trycloudflare.com`), la dirección **cambia cada vez que lo reinicias**, así que tendrás que actualizar el `.env`.

## Problemas frecuentes

<details>
<summary><b>Network Error al iniciar sesión</b></summary>

El teléfono no alcanza el servidor. Revisa que el backend esté corriendo, que la URL del `.env` sea la actual (sin diagonal final) y reinicia Expo con `-c`.
</details>

<details>
<summary><b>Metro falla con <code>EINVAL readlink</code> o <code>Unable to resolve module</code></b></summary>

Suele ocurrir si el proyecto está dentro de una carpeta sincronizada con **OneDrive**. Trabaja en una carpeta local que no se sincronice (por ejemplo, `C:\dev`) y usa Git como respaldo.
</details>

<details>
<summary><b>El teclado tapa los campos del formulario</b></summary>

Las pantallas de login y registro ya ajustan el desplazamiento. Si aún pasa, cierra Expo Go por completo y vuelve a abrirlo tras reiniciar Metro.
</details>

## Hoja de ruta

- [x] Inicio de sesión de madre y familiar
- [x] Notificaciones de accesos en tiempo real
- [x] Solicitud de credencial móvil
- [ ] Notificaciones push cuando la app está cerrada
- [ ] Aviso de privacidad
- [ ] Aprobación del acceso de familiares por parte de la madre

## Autor

Proyecto desarrollado por **Josué Báez** como parte de su trabajo terminal.

<div align="center">

<sub>Hecho con 💙 para cuidar a quienes más importan.</sub>

</div>
