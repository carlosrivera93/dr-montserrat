/**
 * Script de Migración de Videos a Vercel Blob
 * 
 * Este script sube todos los videos de la carpeta assets/videos/
 * a Vercel Blob Storage.
 * 
 * Uso:
 *   1. npm install @vercel/blob
 *   2. Configura tu BLOB_READ_WRITE_TOKEN en las variables de entorno
 *   3. node scripts/upload-videos.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Configuración
const VIDEOS_DIR = path.join(__dirname, '..', 'assets', 'videos');
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Verificar que existe el token
if (!BLOB_TOKEN) {
    console.error('❌ ERROR: BLOB_READ_WRITE_TOKEN no está configurado');
    console.log('\n💡 Pasos para configurar:');
    console.log('   1. Ve a https://vercel.com/dashboard');
    console.log('   2. Selecciona tu proyecto');
    console.log('   3. Settings → Storage → Create Blob Store');
    console.log('   4. Copia el token y ejecuta:');
    console.log('      PowerShell: $env:BLOB_READ_WRITE_TOKEN="tu_token"');
    console.log('      CMD: set BLOB_READ_WRITE_TOKEN=tu_token');
    console.log('      Bash: export BLOB_READ_WRITE_TOKEN=tu_token\n');
    process.exit(1);
}

// Mapeo de nombres de archivos locales a nombres en Blob
const videoMapping = {
    'testionio1-v2.mp4': 'testimonios/testimonio-1.mp4',
    'testimonio2.mp4': 'testimonios/testimonio-2.mp4',
    '2025-11-05-111134851.mp4': 'consultorio/tour-instalaciones.mp4'
};

/**
 * Sube un video a Vercel Blob
 */
async function uploadVideo(localFilename, blobFilename) {
    const localPath = path.join(VIDEOS_DIR, localFilename);

    // Verificar que el archivo existe
    if (!fs.existsSync(localPath)) {
        console.log(`⚠️  Archivo no encontrado: ${localFilename}`);
        return null;
    }

    try {
        console.log(`\n📤 Subiendo: ${localFilename} → ${blobFilename}`);

        // Leer el archivo
        const fileBuffer = fs.readFileSync(localPath);
        const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
        console.log(`   Tamaño: ${fileSizeMB} MB`);

        // Subir a Blob
        const blob = await put(blobFilename, fileBuffer, {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: true // Agrega un sufijo único para evitar colisiones
        });

        console.log(`✅ Subido exitosamente!`);
        console.log(`🔗 URL: ${blob.url}`);
        console.log(`📊 Detalles:`, {
            size: `${(blob.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadedAt: new Date(blob.uploadedAt).toLocaleString('es-MX'),
            contentType: blob.contentType
        });

        return {
            localFilename,
            blobFilename,
            url: blob.url,
            size: blob.size
        };

    } catch (error) {
        console.error(`❌ Error subiendo ${localFilename}:`, error.message);
        return null;
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('🚀 Iniciando migración de videos a Vercel Blob...\n');
    console.log(`📁 Directorio de videos: ${VIDEOS_DIR}\n`);

    const results = [];

    // Subir cada video
    for (const [local, blob] of Object.entries(videoMapping)) {
        const result = await uploadVideo(local, blob);
        if (result) {
            results.push(result);
        }
    }

    // Resumen final
    console.log('\n' + '='.repeat(70));
    console.log('📊 RESUMEN DE MIGRACIÓN');
    console.log('='.repeat(70) + '\n');

    if (results.length > 0) {
        console.log(`✅ ${results.length} video(s) subido(s) exitosamente:\n`);

        // Tabla de resultados
        results.forEach((r, i) => {
            console.log(`${i + 1}. ${r.localFilename}`);
            console.log(`   → ${r.url}`);
            console.log('');
        });

        // Generar snippet de actualización para HTML
        console.log('\n' + '-'.repeat(70));
        console.log('🔧 ACTUALIZAR EN index.html:');
        console.log('-'.repeat(70) + '\n');

        results.forEach((r, i) => {
            const videoNumber = i + 1;
            console.log(`<!-- Video ${videoNumber} -->`);
            console.log(`<video controls preload="metadata" playsinline>`);
            console.log(`    <source src="${r.url}" type="video/mp4">`);
            console.log(`    Tu navegador no soporta video HTML5.`);
            console.log(`</video>\n`);
        });

        // Calcular tamaño total
        const totalSize = results.reduce((sum, r) => sum + r.size, 0);
        const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
        console.log(`\n📦 Tamaño total subido: ${totalMB} MB`);

    } else {
        console.log('⚠️  No se subieron videos.');
    }

    console.log('\n✨ Migración completada!\n');
}

// Ejecutar
main().catch(error => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
});
