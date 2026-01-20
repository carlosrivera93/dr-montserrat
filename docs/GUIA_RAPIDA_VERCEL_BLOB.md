# 🚀 Guía Rápida: Migrar Videos a Vercel Blob

**Para:** Dra. Montserrat - Landing Page  
**Tiempo estimado:** 10-15 minutos  
**Dificultad:** ⭐⭐ (Fácil-Intermedio)

---

## ✅ Pre-requisitos

Antes de comenzar, asegúrate de tener:
- [ ] Una cuenta en Vercel (gratis en https://vercel.com)
- [ ] Node.js instalado (v18 o superior)
- [ ] Tu proyecto vinculado a Vercel

---

## 📋 Paso a Paso

### 1️⃣ Instalar Dependencias

Abre PowerShell en tu carpeta del proyecto y ejecuta:

```powershell
cd c:\WebDev\montse
npm install
```

Esto instalará `@vercel/blob` automáticamente.

---

### 2️⃣ Configurar Vercel Blob

#### 2.1 Crear Blob Store en Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto `dr-montserrat` (o créalo si no existe)
3. Click en **Storage** en el menú lateral
4. Click en **Create Database** → Selecciona **Blob**
5. Nombra tu store: `dr-montserrat-videos`
6. Click en **Create**

#### 2.2 Obtener el Token

Vercel automáticamente creará la variable de entorno `BLOB_READ_WRITE_TOKEN`. Para usarla localmente:

1. En la página del Blob Store, ve a la pestaña **Settings**
2. Copia el valor de `BLOB_READ_WRITE_TOKEN`
3. Guárdalo temporalmente (lo necesitarás en el siguiente paso)

---

### 3️⃣ Subir los Videos

#### 3.1 Configurar el Token Localmente

En PowerShell:

```powershell
$env:BLOB_READ_WRITE_TOKEN="tu_token_aqui"
```

**Ejemplo:**
```powershell
$env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_AbCdEf123456_ghijklmnopqrstuvwxyz"
```

> ⚠️ **IMPORTANTE:** Este comando solo funciona en la sesión actual de PowerShell. Si cierras la ventana, tendrás que configurarlo de nuevo.

#### 3.2 Ejecutar el Script de Migración

```powershell
npm run upload-videos
```

**Salida esperada:**

```
🚀 Iniciando migración de videos a Vercel Blob...

📁 Directorio de videos: c:\WebDev\montse\assets\videos

📤 Subiendo: testionio1-v2.mp4 → testimonios/testimonio-1.mp4
   Tamaño: 15.23 MB
✅ Subido exitosamente!
🔗 URL: https://xyzabc123.public.blob.vercel-storage.com/testimonio-1-AbC123.mp4

📤 Subiendo: testimonio2.mp4 → testimonios/testimonio-2.mp4
   Tamaño: 12.45 MB
✅ Subido exitosamente!
🔗 URL: https://xyzabc123.public.blob.vercel-storage.com/testimonio-2-DeF456.mp4

======================================================================
📊 RESUMEN DE MIGRACIÓN
======================================================================

✅ 2 video(s) subido(s) exitosamente:

----------------------------------------------------------------------
🔧 ACTUALIZAR EN index.html:
----------------------------------------------------------------------

<!-- Video 1 -->
<video controls preload="metadata" playsinline>
    <source src="https://xyzabc123.public.blob.vercel-storage.com/testimonio-1-AbC123.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>

<!-- Video 2 -->
<video controls preload="metadata" playsinline>
    <source src="https://xyzabc123.public.blob.vercel-storage.com/testimonio-2-DeF456.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>

📦 Tamaño total subido: 27.68 MB

✨ Migración completada!
```

#### 3.3 Guardar las URLs

**MUY IMPORTANTE:** Copia las URLs que aparecen en el resumen. Las necesitarás para el siguiente paso.

---

### 4️⃣ Actualizar el HTML

Ahora debes reemplazar las rutas locales con las URLs de Vercel Blob.

#### Archivo: `index.html`

**ANTES (líneas 189-192):**
```html
<video controls preload="metadata" playsinline>
    <source src="assets/videos/testionio1-v2.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

**DESPUÉS:**
```html
<video controls preload="metadata" playsinline>
    <source src="https://xyzabc123.public.blob.vercel-storage.com/testimonio-1-AbC123.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>
```

Haz lo mismo para el **Video 2** (líneas 197-200).

---

### 5️⃣ Probar Localmente

1. Abre `index.html` en tu navegador
2. Navega hasta la sección de testimonios
3. Verifica que los videos se cargan correctamente desde Vercel Blob
4. Comprueba que los controles (play, pause, volumen) funcionan

---

### 6️⃣ Desplegar a Producción

Si todo funciona correctamente:

```powershell
git add .
git commit -m "Migrar videos a Vercel Blob"
git push origin main
```

Vercel desplegará automáticamente los cambios.

---

### 7️⃣ Limpiar (Opcional)

Una vez que confirmes que todo funciona en producción, puedes:

1. **Eliminar videos locales** (para ahorrar espacio en Git):
   ```powershell
   Remove-Item assets\videos\testionio1-v2.mp4
   Remove-Item assets\videos\testimonio2.mp4
   ```

2. **Agregar a .gitignore** (para evitar subir videos futuros):
   Agrega esta línea a `.gitignore`:
   ```
   assets/videos/*.mp4
   ```

---

## 🐛 Solución de Problemas

### Error: "BLOB_READ_WRITE_TOKEN no está configurado"

**Solución:**
```powershell
# Verifica que el token esté configurado
echo $env:BLOB_READ_WRITE_TOKEN

# Si está vacío, configúralo de nuevo
$env:BLOB_READ_WRITE_TOKEN="tu_token_aqui"
```

---

### Error: "Cannot find module '@vercel/blob'"

**Solución:**
```powershell
npm install @vercel/blob
```

---

### Error: "Access denied" al subir

**Solución:**
1. Verifica que el token sea correcto
2. Asegúrate de que el Blob Store esté conectado a tu proyecto
3. Ve a Vercel Dashboard → Storage → Blob → Conectar a proyecto

---

### Los videos no cargan en la página

**Checklist:**
- [ ] ¿Las URLs están correctamente copiadas en el HTML?
- [ ] ¿Los videos tienen permisos públicos (`access: 'public'`)?
- [ ] ¿Hay errores en la consola del navegador? (F12 → Console)

---

## 📊 Ventajas de Vercel Blob

| Antes (Local) | Después (Blob) |
|---------------|----------------|
| Videos en Git (~50MB) | Git solo contiene HTML/CSS/JS |
| Carga lenta para usuarios lejanos | CDN global - carga rápida en todo el mundo |
| Difícil actualizar videos | Subir nuevos videos con 1 comando |
| Límite de tamaño en GitHub | Hasta 1GB gratis en Vercel |

---

## ✅ Checklist Final

- [ ] Blob Store creado en Vercel
- [ ] Token configurado localmente
- [ ] Videos subidos exitosamente
- [ ] URLs copiadas y guardadas
- [ ] HTML actualizado con nuevas URLs
- [ ] Probado localmente
- [ ] Desplegado a producción
- [ ] Verificado en producción

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas en algún paso, revisa:

1. **Documentación completa:** `docs/strategy/07_vercel_blob_videos.md`
2. **Docs oficiales:** https://vercel.com/docs/storage/vercel-blob
3. **Estado de Vercel:** https://www.vercel-status.com/

---

**¡Éxito! 🎉** Ahora tus videos están optimizados y se sirven desde un CDN global.
