
//============================================================//
//Codigo para el cambio de imagenes en el HERO//
//===========================================================//


//Creo una array con las imagenes que iran al fondo del hero//
const imagenes = [
    'Img/Noway-home.jpeg',
    'Img/avengers-Gemini.png'
];

const tituloH1 = document.getElementById("tittle-main");
// Guardo en variables const a la clase del hero y de los div que contienen a los <h2> y <p>//
const infoItems = document.querySelectorAll('.info-item');
const hero = document.querySelector('.hero');



//Declaro una variable index que empieza en cero y cada vez que cambia la imagen se le suma uno//
let index = 0;


//Comienza la funcion que cambiara la imagen del fondo del hero//
function cambiarFondo() {

    hero.style.backgroundImage = `url(${imagenes[index]})`;

    infoItems.forEach(item => item.classList.remove('active'));

    infoItems[index].classList.add('active');

    index = (index + 1) % imagenes.length;
}


//declara un intervalo de cincomil milisegundos(cinco segundos) hasta que se haga el siguiente cambio de imagen//
setInterval(cambiarFondo, 5000);

cambiarFondo();

//==================================================================================//




// ===== CARRUSEL 3D ESTILO NETFLIX =====

const carrusel = document.getElementById('img-movies-container');
const carruselseries = document.getElementById('img-series-container');

const btnPrev = document.getElementById('btn-prev-movie');
const btnNext = document.getElementById('btn-next-movie');

const btnPrevSeries = document.getElementById('btn-prev-serie');
const btnNextSeries = document.getElementById('btn-next-serie');

// Variables para el carrusel 3D de películas
let currentIndex = 0;
const imagesMovies = carrusel.querySelectorAll('img');
let isAnimating = false;

// Función para actualizar el efecto 3D
function updateCarousel3D() {
    imagesMovies.forEach((img, index) => {
        img.classList.remove('center-image');
        
        // Calcular la distancia desde el centro
        const distance = Math.abs(index - currentIndex);
        
        if (index === currentIndex) {
            // Imagen central
            img.classList.add('center-image');
            img.style.transform = 'scale(1.1) translateZ(50px)';
            img.style.opacity = '1';
            img.style.filter = 'brightness(1)';
        } else if (distance === 1) {
            // Imágenes adyacentes
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.85) rotateY(${25 * direction}deg)`;
            img.style.opacity = '0.6';
            img.style.filter = 'brightness(0.7)';
        } else if (distance === 2) {
            // Imágenes más alejadas
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.7) rotateY(${35 * direction}deg)`;
            img.style.opacity = '0.4';
            img.style.filter = 'brightness(0.5)';
        } else {
            // Imágenes muy alejadas
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.6) rotateY(${40 * direction}deg)`;
            img.style.opacity = '0.2';
            img.style.filter = 'brightness(0.3)';
        }
    });
    
    // Centrar la imagen actual en el viewport
    centerCurrentImage();
    
    // Actualizar estado de los botones
    updateButtonsState();
}

// Función para centrar la imagen actual (CORREGIDA)
// Función para centrar la imagen actual (Versión ya corregida)
function centerCurrentImage() {
    const currentImg = imagesMovies[currentIndex];
    
    if (currentImg) {
        // Posición izquierda de la imagen respecto al contenedor de imágenes (incluye el padding del CSS: 100px)
        const imgLeft = currentImg.offsetLeft; 
        const imgWidth = currentImg.offsetWidth;
        
        // Ancho visible del área de scroll
        const containerWidth = carrusel.clientWidth;
        
        // CÁLCULO: Posición para que el centro de la imagen coincida con el centro del contenedor visible
        const scrollPosition = imgLeft - (containerWidth / 2) + (imgWidth / 2);
        
        carrusel.scrollTo({
            left: Math.max(0, scrollPosition), 
            behavior: 'smooth'
        });
        
        // Después de esta corrección, revisa la consola del navegador. Si ves que 
        // `scrollPosition` tiene un valor positivo que aumenta, debería moverse.
        // console.log(`Current Index: ${currentIndex}, Scroll To: ${scrollPosition}`);
    }
}

// Función para actualizar el estado de los botones
function updateButtonsState() {
    // Deshabilitar botón "anterior" si estamos en la primera imagen
    if (currentIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.style.opacity = '0.3';
        btnPrev.style.cursor = 'not-allowed';
    } else {
        btnPrev.disabled = false;
        btnPrev.style.opacity = '1';
        btnPrev.style.cursor = 'pointer';
    }
    
    // Deshabilitar botón "siguiente" si estamos en la última imagen
    if (currentIndex === imagesMovies.length - 1) {
        btnNext.disabled = true;
        btnNext.style.opacity = '0.3';
        btnNext.style.cursor = 'not-allowed';
    } else {
        btnNext.disabled = false;
        btnNext.style.opacity = '1';
        btnNext.style.cursor = 'pointer';
    }
}

// Navegar al siguiente (SIN loop infinito)
function nextSlide() {
    if (isAnimating) return;
    
    // No avanzar si ya estamos en la última imagen
    if (currentIndex >= imagesMovies.length - 1) return;
    
    isAnimating = true;
    currentIndex++; // Simplemente incrementa, sin módulo
    updateCarousel3D();
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// Navegar al anterior (SIN loop infinito)
function prevSlide() {
    if (isAnimating) return;
    
    // No retroceder si ya estamos en la primera imagen
    if (currentIndex <= 0) return;
    
    isAnimating = true;
    currentIndex--; // Simplemente decrementa
    updateCarousel3D();
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// Event listeners para películas
btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

// Click en las imágenes para centrarlas
imagesMovies.forEach((img, index) => {
    img.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = index;
        updateCarousel3D();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });
});

// Navegación con teclado (respetando los límites)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Inicializar el carrusel 3D
updateCarousel3D();

// ===== CARRUSEL NORMAL PARA SERIES (mantiene la funcionalidad original) =====

if (carruselseries && btnNextSeries && btnPrevSeries) {
    const primerImagenSeries = carruselseries.querySelector('img');
    const scrollAmountSeries = primerImagenSeries ? primerImagenSeries.offsetWidth * 4 : 800;

    btnNextSeries.addEventListener('click', () => {
        carruselseries.scrollLeft += scrollAmountSeries;
    });

    btnPrevSeries.addEventListener('click', () => {
        carruselseries.scrollLeft -= scrollAmountSeries;
    });
}

// Soporte para gestos táctiles en móviles (respetando límites)
let touchStartX = 0;
let touchEndX = 0;

carrusel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carrusel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe izquierda → siguiente (respeta límites)
        } else {
            prevSlide(); // Swipe derecha → anterior (respeta límites)
        }
    }
}





// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const loginMenu = document.getElementById('loginMenu');
const navOverlay = document.getElementById('navOverlay');
const closeMenu = document.getElementById('closeMenu');

// Función para abrir el menú
function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    loginMenu.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el menú
function closeMenuFunc() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    loginMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle del menú hamburguesa
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (hamburger.classList.contains('active')) {
            closeMenuFunc();
        } else {
            openMenu();
        }
    });
}

// Cerrar con el botón X
if (closeMenu) {
    closeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenuFunc();
    });
}

// Cerrar al hacer click en el overlay
if (navOverlay) {
    navOverlay.addEventListener('click', closeMenuFunc);
}

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-links');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenuFunc();
    });
});

// Cerrar menú al cambiar de tamaño de pantalla
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenuFunc();
    }
});

// Prevenir que clicks dentro del menú lo cierren
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// === MODAL REGISTRO ===
const btnRegistro = document.querySelector('.registro');
const modalRegistro = document.getElementById('modalRegistro');
const closeModal = document.getElementById('closeModal');
const registroForm = document.getElementById('registroForm');

// Abrir el modal con animación
btnRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    modalRegistro.classList.add('show');
});

// Función para cerrar con animación
function cerrarModal() {
const modalContent = modalRegistro.querySelector('.modal-content');
modalContent.style.animation = 'modalOut 0.3s ease forwards';

  // Esperar que termine la animación antes de ocultar
    setTimeout(() => {
    modalRegistro.classList.remove('show');
    modalContent.style.animation = 'modalIn 0.4s ease forwards';
}, 300);
}

// Cerrar al hacer click en la X
closeModal.addEventListener('click', cerrarModal);

// Cerrar si se hace click fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modalRegistro) {
    cerrarModal();
}
});

// Enviar formulario (simulado)
registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailRegistro').value;

    alert(`✅ ¡Te registraste con éxito!\nTe enviamos un mensaje de confirmación a: ${email}`);

    registroForm.reset();
    cerrarModal();
});
