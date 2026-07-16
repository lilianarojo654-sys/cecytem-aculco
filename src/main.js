// Importaciones de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Efecto scroll en navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  }
});

// Cerrar navbar móvil al hacer clic
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navCollapse = document.getElementById('navMenu');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navCollapse && navCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navCollapse).hide();
    }
  });
});

// FORMULARIO WHATSAPP - CORREGIDO
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
  console.log('✅ Formulario de WhatsApp encontrado');
  
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('📤 Intentando enviar formulario...');
    
    // Validar formulario
    if (!whatsappForm.checkValidity()) {
      event.stopPropagation();
      whatsappForm.classList.add('was-validated');
      console.log('❌ Formulario no es válido');
      return;
    }
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    console.log(' Datos del formulario:', { nombre, telefono, asunto, mensaje });
    
    // Número de WhatsApp (CAMBIA ESTE NÚMERO POR EL TUYO)
    const numeroWhatsApp = '527122020682';
    
    // Construir mensaje
    const textoWhatsApp = `*🎓 NUEVO MENSAJE DESDE LA WEB CECyTEM*\n\n` +
      `* Nombre:* ${nombre}\n` +
      `*📱 Teléfono:* ${telefono}\n` +
      `*📌 Asunto:* ${asunto}\n` +
      `*💬 Mensaje:* ${mensaje}\n\n` +
      `_Enviado desde el sitio web del plantel_`;
    
    console.log(' Número WhatsApp:', numeroWhatsApp);
    console.log('💬 Mensaje:', textoWhatsApp);
    
    // Codificar y crear URL
    const mensajeCodificado = encodeURIComponent(textoWhatsApp);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    console.log('🔗 URL generada:', urlWhatsApp);
    
    // Abrir WhatsApp
    try {
      window.open(urlWhatsApp, '_blank');
      console.log('✅ WhatsApp abierto correctamente');
      
      // Limpiar formulario
      whatsappForm.reset();
      whatsappForm.classList.remove('was-validated');
    } catch (error) {
      console.error('❌ Error al abrir WhatsApp:', error);
      alert('Error al abrir WhatsApp. Por favor, intenta de nuevo o contáctanos directamente.');
    }
  });
} else {
  console.error('❌ ERROR: No se encontró el formulario con id="whatsappForm"');
  console.log('Formularios encontrados en la página:', document.querySelectorAll('form'));
}

// ACCESIBILIDAD: CAMBIO DE TAMAÑO DE FUENTE
window.cambiarTamañoFuente = function(accion) {
  const body = document.body;
  const niveles = ['font-small', 'font-medium', 'font-large', 'font-xlarge'];
  
  let nivelActual = localStorage.getItem('nivelFuente') || 'font-medium';
  let indiceActual = niveles.indexOf(nivelActual);
  let nuevoNivel;

  if (accion === 'aumentar') {
    nuevoNivel = niveles[Math.min(indiceActual + 1, niveles.length - 1)];
  } else if (accion === 'disminuir') {
    nuevoNivel = niveles[Math.max(indiceActual - 1, 0)];
  } else {
    nuevoNivel = 'font-medium';
  }

  body.classList.remove(...niveles);
  body.classList.add(nuevoNivel);
  localStorage.setItem('nivelFuente', nuevoNivel);
  
  mostrarNotificacion(nuevoNivel);
};

function mostrarNotificacion(nivel) {
  const tamaños = {
    'font-small': 'Pequeño',
    'font-medium': 'Normal',
    'font-large': 'Grande',
    'font-xlarge': 'Muy Grande'
  };
  
  const notificacionExistente = document.querySelector('.accesibilidad-notificacion');
  if (notificacionExistente) notificacionExistente.remove();
  
  const notificacion = document.createElement('div');
  notificacion.className = 'accesibilidad-notificacion';
  notificacion.textContent = `Texto: ${tamaños[nivel]}`;
  notificacion.style.cssText = `
    position: fixed; top: 100px; left: 30px; background: #4A86B8; color: white;
    padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000; font-size: 0.9rem; font-weight: 600; animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notificacion);
  setTimeout(() => {
    notificacion.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notificacion.remove(), 300);
  }, 2000);
}

// Cargar preferencia de fuente
document.addEventListener('DOMContentLoaded', () => {
  const nivelGuardado = localStorage.getItem('nivelFuente') || 'font-medium';
  document.body.classList.add(nivelGuardado);
  console.log('🎓 CECyTEM Plantel Aculco - Sitio cargado correctamente');
});

// Animaciones CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
`;
document.head.appendChild(style);