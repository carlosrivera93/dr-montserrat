# Arquitectura Técnica y Stack

## 1. Frontend: HTML Estático (Vanilla o Vite)
**Veredicto: NO usar Next.js. Usar HTML5 + CSS Moderno.**

### ¿Por qué?
1.  **Velocidad Extrema (SEO & Ads):** Una Landing Page para anuncios debe cargar en <1.5 segundos. Next.js añade JavaScript innecesario (hidratación) para una página informativa. Un sitio estático puro garantiza una puntuación de 100/100 en Google PageSpeed, lo que baja el costo de tus anuncios (CPC).
2.  **Mantenimiento Cero:** No hay actualizaciones de npm, vulnerabilidades de seguridad de servidor o bases de datos que mantener. El código que escribimos hoy funcionará en 5 años.
3.  **Flexibilidad de Diseño:** Al usar CSS moderno (Grid, Flexbox, Variables), tenemos control total de las animaciones y estética "Premium" sin pelear con las opiniones de un framework.

**Recomendación:** Estructura pura de HTML/CSS/JS.

## 2. Sistema de Agendamiento
**Veredicto: Usar Calendly (o Cal.com) incrustado. NO conectar API de Google Calendar directamente.**

### ¿Por qué NO conectar la API directamente?
*   **Complejidad Innecesaria:** Crear un selector de fechas funcional requiere manejar: Zonas horarias, Días festivos, Buffers (tiempo entre citas), Prevención de doble reserva y UX móvil.
*   **Mantenimiento:** Si Google cambia su API o expira el token de autenticación (Oauth), el sistema de citas se cae.
*   **Recordatorios:** Calendly ya incluye correos automáticos de confirmación y recordatorios, vitales para reducir el "No-Show" de pacientes.

### ¿Por qué Calendly?
*   Se sincroniza nativamente con el Google Calendar de la Doctora (Bidireccional).
*   Se puede incrustar (Embed) en la web para que parezca parte del sitio.
*   Permite cobrar la cita por adelantado (Stripe/PayPal) si decidimos implementar "Costo por reserva" para filtrar aún más.

## 3. Infraestructura Sugerida
*   **Hosting:** Netlify o Vercel (Plan Gratuito es suficiente).
*   **Dominio:** Comprar en Namecheap o similar.
*   **Analytics:** Google Analytics 4 + Facebook Pixel.

## Resumen del Stack
*   **Core:** HTML5, CSS3, JavaScript (ES6).
*   **Librerías Visuales:** Posiblemente una librería ligera de animación como `AOS` (Animate On Scroll) o `GSAP` para el efecto "WOW", pero manteniendo el peso bajo.
*   **Integraciones:** Calendly (Citas), WhatsApp Link (Dudas rápidas).
