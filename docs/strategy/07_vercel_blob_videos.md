# Implementación de Vercel Blob para Videos

**Fecha de creación:** 19 de enero, 2026 - 20:04  
**Última actualización:** 19 de enero, 2026 - 20:04  
**Autor:** Carlos Rivera  
**Estado:** Planificación

---

## 📋 Índice
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [¿Qué es Vercel Blob?](#que-es-vercel-blob)
3. [Videos Actuales](#videos-actuales)
4. [Configuración Inicial](#configuracion-inicial)
5. [Proceso de Migración](#proceso-de-migracion)
6. [Actualización del Código](#actualizacion-del-codigo)
7. [Comandos Útiles](#comandos-utiles)
8. [Mejores Prácticas](#mejores-practicas)
9. [Costos y Límites](#costos-y-limites)

---

## 🎯 Resumen Ejecutivo

Este documento describe el proceso completo para migrar los videos de la landing page de Dra. Montserrat desde el almacenamiento local (`assets/videos/`) hacia **Vercel Blob**, una solución de almacenamiento optimizado en la nube.

### Objetivos:
- ✅ Reducir el tamaño del repositorio Git
- ✅ Mejorar la velocidad de carga con CDN global
- ✅ Optimizar el streaming de videos
- ✅ Facilitar la gestión de archivos multimedia

---

## 🌐 ¿Qué es Vercel Blob?

**Vercel Blob** es un servicio de almacenamiento de objetos diseñado específicamente para aplicaciones web desplegadas en Vercel. Ofrece:

- **CDN Global**: Los archivos se sirven desde edge locations cercanas al usuario
- **Streaming optimizado**: Videos se cargan de forma progresiva
- **API simple**: Subir, eliminar y listar archivos fácilmente
- **Sin configuración compleja**: Se integra directamente con tu proyecto de Vercel

### Casos de Uso:
- Videos de testimonios
- Imágenes de alta resolución
- PDFs y documentos descargables
- Cualquier archivo multimedia grande

---

## 📹 Videos Actuales

Actualmente, la página tiene **3 videos** almacenados localmente:

| Archivo | Ubicación | Uso en la Página |
|---------|-----------|------------------|
| `testionio1-v2.mp4` | `assets/videos/` | Carrusel de testimonios (Video 1) |
| `testimonio2.mp4` | `assets/videos/` | Carrusel de testimonios (Video 2) |
| `2025-11-05-111134851.mp4` | `assets/videos/` | (Sin uso actual) |

### Código Actual (index.html):
```html
<video controls preload="metadata" playsinline>
    <source src="assets/videos/testionio1-v2.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

---

## ⚙️ Configuración Inicial

### Paso 1: Instalar Vercel CLI (si no lo tienes)

```bash
npm install -g vercel
```

### Paso 2: Iniciar sesión en Vercel

```bash
vercel login
```

### Paso 3: Vincular el proyecto

```bash
cd c:\WebDev\montse
vercel link
```

Esto te preguntará:
- ¿Configurar y desplegar? → **Sí**
- ¿Qué alcance? → Selecciona tu cuenta
- ¿Vincular a proyecto existente? → **Sí** (o crea uno nuevo)
- ¿Nombre del proyecto? → `dr-montserrat` (o el que tengas configurado)

### Paso 4: Obtener el Token de Blob

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Storage → Create Database → **Blob**
3. Conecta el Blob a tu proyecto
4. Copia el `BLOB_READ_WRITE_TOKEN` que se genera automáticamente

**IMPORTANTE:** Este token se agregará automáticamente a tus variables de entorno en Vercel.

---

## 🚀 Proceso de Migración

### Opción A: Subir Videos mediante CLI (Recomendado)

Vamos a crear un script simple para subir los videos:

#### 1. Instalar dependencia de Vercel Blob

```bash
npm install @vercel/blob
```

#### 2. Crear script de migración

Crea el archivo `scripts/upload-videos.js`:

```javascript
const { put } = require('@vercel/blob');

async function uploadVideos() {
  const videos = [
    { 
      path: 'assets/videos/testionio1-v2.mp4', 
      name: 'testimonio-1.mp4' 
    },
    { 
      path: 'assets/videos/testimonio2.mp4', 
      name: 'testimonio-2.mp4' 
    },
    { 
      path: 'assets/videos/2025-11-05-111134851.mp4', 
      name: 'video-consultorio.mp4' 
    }
  ];

  for (const video of videos) {
    try {
      console.log(`📤 Subiendo ${video.name}...`);
      
      const file = require('fs').readFileSync(video.path);
      const blob = await put(video.name, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN
      });

      console.log(`✅ ${video.name} subido exitosamente!`);
      console.log(`🔗 URL: ${blob.url}`);
      console.log('---');
    } catch (error) {
      console.error(`❌ Error subiendo ${video.name}:`, error);
    }
  }
}

uploadVideos();
```

#### 3. Ejecutar el script

```bash
# Primero, establece tu token localmente
$env:BLOB_READ_WRITE_TOKEN="tu_token_aqui"

# Ejecuta el script
node scripts/upload-videos.js
```

**Salida esperada:**
```
📤 Subiendo testimonio-1.mp4...
✅ testimonio-1.mp4 subido exitosamente!
🔗 URL: https://xyzabc123.public.blob.vercel-storage.com/testimonio-1-xY9aB2c.mp4
---
📤 Subiendo testimonio-2.mp4...
✅ testimonio-2.mp4 subido exitosamente!
🔗 URL: https://xyzabc123.public.blob.vercel-storage.com/testimonio-2-zW8bC3d.mp4
---
```

**GUARDA ESTAS URLs** - Las necesitarás para actualizar tu HTML.

---

### Opción B: Subir Videos desde el Dashboard de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `dr-montserrat`
3. Ve a **Storage** → **Blob**
4. Haz clic en **Upload**
5. Selecciona tus videos uno por uno
6. Copia las URLs generadas

---

## 🔄 Actualización del Código

### Antes (Almacenamiento Local):
```html
<video controls preload="metadata" playsinline>
    <source src="assets/videos/testionio1-v2.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

### Después (Vercel Blob):
```html
<video controls preload="metadata" playsinline>
    <source src="https://xyzabc123.public.blob.vercel-storage.com/testimonio-1-xY9aB2c.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

### Archivo a Modificar:
`index.html` - Líneas 189-192 y 197-200

---

## 📝 Comandos Útiles

### Ver todos los archivos en Blob
```javascript
const { list } = require('@vercel/blob');

const { blobs } = await list({ 
  token: process.env.BLOB_READ_WRITE_TOKEN 
});

console.log(blobs);
```

### Eliminar un archivo
```javascript
const { del } = require('@vercel/blob');

await del('https://url-del-blob.mp4', {
  token: process.env.BLOB_READ_WRITE_TOKEN
});
```

### Obtener metadata
```javascript
const { head } = require('@vercel/blob');

const blob = await head('https://url-del-blob.mp4', {
  token: process.env.BLOB_READ_WRITE_TOKEN
});

console.log(blob); // { size, uploadedAt, etc. }
```

---

## 💡 Mejores Prácticas

### 1. Naming Convention
- Usa nombres descriptivos y en minúsculas
- Evita espacios (usa guiones `-` o underscores `_`)
- Incluye versión si aplica: `testimonio-1-v2.mp4`

### 2. Organización
```
videos/
  testimonios/testimonio-1.mp4
  testimonios/testimonio-2.mp4
  consultorio/tour-virtual.mp4
```

### 3. Caché Headers
Vercel Blob automáticamente configura headers de caché óptimos:
```
Cache-Control: public, max-age=31536000, immutable
```

### 4. Preload Strategy
```html
<!-- Solo para video principal -->
<video controls preload="auto" playsinline>
    <source src="blob-url" type="video/mp4">
</video>

<!-- Para videos secundarios -->
<video controls preload="metadata" playsinline>
    <source src="blob-url" type="video/mp4">
</video>
```

### 5. Fallback
```html
<video controls preload="metadata" playsinline>
    <source src="https://blob-url.mp4" type="video/mp4">
    <source src="assets/videos/backup.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

---

## 💰 Costos y Límites

### Plan Hobby (Gratis):
- **Almacenamiento:** 1 GB
- **Transferencia:** 100 GB/mes
- **Operaciones:** 1M lecturas, 100K escrituras

### Plan Pro ($20/mes):
- **Almacenamiento:** 100 GB incluidos
- **Transferencia:** 1 TB/mes incluido
- **Operaciones:** Ilimitadas

### Estimación para tu Proyecto:
```
Videos actuales: ~50MB (estimado)
Transferencia mensual estimada: ~10-20 GB
```

**Conclusión:** El plan gratuito (Hobby) es más que suficiente para tus necesidades actuales.

---

## 🔍 Siguiente Pasos

1. ✅ Configurar Vercel Blob en el proyecto
2. ✅ Subir los 3 videos existentes
3. ✅ Actualizar las URLs en `index.html`
4. ✅ Probar carga de videos en desarrollo
5. ✅ Desplegar a producción
6. ✅ Verificar funcionamiento
7. ✅ (Opcional) Eliminar videos del repo Git

---

## 📞 Soporte

**Documentación oficial:**  
https://vercel.com/docs/storage/vercel-blob

**API Reference:**  
https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

**Pricing:**  
https://vercel.com/docs/storage/vercel-blob/pricing
