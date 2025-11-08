
//============================================================//
//Codigo para el cambio de imagenes en el HERO//
//===========================================================//


//Creo una array con las imagenes que iran al fondo del hero//
const imagenes = [
    'Img/Noway-home.jpeg',
    'Img/avengers-Gemini.png',
    'Img/breaking-bad.jpg',
    'Img/imagen-stranger-things.jpg',
    'Img/Alien-romulus.jpeg',
    'Img/interestelar.jpg',
    'Img/the-last-of-us.jpg',
    'Img/the-walking-dead.jpg',
    'Img/arcain.jpg'
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




// ===== CARRUSEL 3D ESTILO NETFLIX (APLICADO A PELÍCULAS Y SERIES) =====

const carruselMovies = document.getElementById('img-movies-container');
const carruselSeries = document.getElementById('img-series-container');

const btnPrevMovie = document.getElementById('btn-prev-movie');
const btnNextMovie = document.getElementById('btn-next-movie');

const btnPrevSeries = document.getElementById('btn-prev-serie');
const btnNextSeries = document.getElementById('btn-next-serie');

// --- VARIABLES PARA PELÍCULAS ---
let currentIndexMovie = 0;
const imagesMovies = carruselMovies.querySelectorAll('img');
let isAnimatingMovie = false;

// --- VARIABLES PARA SERIES ---
let currentIndexSeries = 0; // Nuevo índice para el carrusel de series
const imagesSeries = carruselSeries.querySelectorAll('img'); // Imágenes del carrusel de series
let isAnimatingSeries = false;

// ----------------------------------------------------
// FUNCIÓN GENÉRICA PARA EL EFECTO 3D Y CENTRADO
// ----------------------------------------------------

function updateCarousel3D(carruselElement, images, currentIndex) {
    images.forEach((img, index) => {
        img.classList.remove('center-image');
        
        const distance = Math.abs(index - currentIndex);
        
        if (index === currentIndex) {
            img.classList.add('center-image');
            // Usamos las clases CSS para el centrado, solo re-aplicamos el transform
            img.style.transform = 'scale(1.1) translateZ(50px)'; 
            img.style.opacity = '1';
            img.style.filter = 'brightness(1)';
        } else if (distance === 1) {
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.85) rotateY(${25 * direction}deg)`;
            img.style.opacity = '0.6';
            img.style.filter = 'brightness(0.7)';
        } else if (distance === 2) {
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.7) rotateY(${35 * direction}deg)`;
            img.style.opacity = '0.4';
            img.style.filter = 'brightness(0.5)';
        } else {
            const direction = index > currentIndex ? 1 : -1;
            img.style.transform = `scale(0.6) rotateY(${40 * direction}deg)`;
            img.style.opacity = '0.2';
            img.style.filter = 'brightness(0.3)';
        }
    });
    
    centerCurrentImage(carruselElement, images[currentIndex]);
}

// ----------------------------------------------------
// FUNCIÓN GENÉRICA PARA CENTRAR IMAGEN (CORREGIDA)
// ----------------------------------------------------

function centerCurrentImage(carruselElement, currentImg) {
    if (currentImg) {
        // Obtenemos la posición de la imagen y el ancho del contenedor de scroll
        const imgLeft = currentImg.offsetLeft; 
        const imgWidth = currentImg.offsetWidth;
        const containerWidth = carruselElement.clientWidth;
        
        // Cálculo para centrar la imagen en el área visible del carrusel
        const scrollPosition = imgLeft - (containerWidth / 2) + (imgWidth / 2);
        
        carruselElement.scrollTo({
            left: Math.max(0, scrollPosition), 
            behavior: 'smooth'
        });
    }
}

// ----------------------------------------------------
// LÓGICA ESPECÍFICA PARA PELÍCULAS
// ----------------------------------------------------

function nextSlideMovie() {
    if (isAnimatingMovie || currentIndexMovie >= imagesMovies.length - 1) return;
    
    isAnimatingMovie = true;
    currentIndexMovie++;
    updateCarousel3D(carruselMovies, imagesMovies, currentIndexMovie);
    updateButtonsStateMovie();
    
    setTimeout(() => { isAnimatingMovie = false; }, 500);
}

function prevSlideMovie() {
    if (isAnimatingMovie || currentIndexMovie <= 0) return;
    
    isAnimatingMovie = true;
    currentIndexMovie--;
    updateCarousel3D(carruselMovies, imagesMovies, currentIndexMovie);
    updateButtonsStateMovie();
    
    setTimeout(() => { isAnimatingMovie = false; }, 500);
}

function updateButtonsStateMovie() {
    btnPrevMovie.disabled = currentIndexMovie === 0;
    btnPrevMovie.style.opacity = currentIndexMovie === 0 ? '0.3' : '1';
    btnPrevMovie.style.cursor = currentIndexMovie === 0 ? 'not-allowed' : 'pointer';

    btnNextMovie.disabled = currentIndexMovie === imagesMovies.length - 1;
    btnNextMovie.style.opacity = currentIndexMovie === imagesMovies.length - 1 ? '0.3' : '1';
    btnNextMovie.style.cursor = currentIndexMovie === imagesMovies.length - 1 ? 'not-allowed' : 'pointer';
}

// ----------------------------------------------------
// 🚀 LÓGICA ESPECÍFICA PARA SERIES (NUEVA)
// ----------------------------------------------------

function nextSlideSeries() {
    if (isAnimatingSeries || currentIndexSeries >= imagesSeries.length - 1) return;
    
    isAnimatingSeries = true;
    currentIndexSeries++;
    updateCarousel3D(carruselSeries, imagesSeries, currentIndexSeries);
    updateButtonsStateSeries();
    
    setTimeout(() => { isAnimatingSeries = false; }, 500);
}

function prevSlideSeries() {
    if (isAnimatingSeries || currentIndexSeries <= 0) return;
    
    isAnimatingSeries = true;
    currentIndexSeries--;
    updateCarousel3D(carruselSeries, imagesSeries, currentIndexSeries);
    updateButtonsStateSeries();
    
    setTimeout(() => { isAnimatingSeries = false; }, 500);
}

function updateButtonsStateSeries() {
    btnPrevSeries.disabled = currentIndexSeries === 0;
    btnPrevSeries.style.opacity = currentIndexSeries === 0 ? '0.3' : '1';
    btnPrevSeries.style.cursor = currentIndexSeries === 0 ? 'not-allowed' : 'pointer';

    btnNextSeries.disabled = currentIndexSeries === imagesSeries.length - 1;
    btnNextSeries.style.opacity = currentIndexSeries === imagesSeries.length - 1 ? '0.3' : '1';
    btnNextSeries.style.cursor = currentIndexSeries === imagesSeries.length - 1 ? 'not-allowed' : 'pointer';
}

// ----------------------------------------------------
// EVENT LISTENERS Y SETUP
// ----------------------------------------------------

// Event listeners para Películas
btnNextMovie.addEventListener('click', nextSlideMovie);
btnPrevMovie.addEventListener('click', prevSlideMovie);

// Event listeners para Series
btnNextSeries.addEventListener('click', nextSlideSeries);
btnPrevSeries.addEventListener('click', prevSlideSeries);

// Click en las imágenes de Películas para centrarlas
imagesMovies.forEach((img, index) => {
    img.addEventListener('click', () => {
        if (isAnimatingMovie) return;
        isAnimatingMovie = true;
        currentIndexMovie = index;
        updateCarousel3D(carruselMovies, imagesMovies, currentIndexMovie);
        updateButtonsStateMovie();
        setTimeout(() => { isAnimatingMovie = false; }, 500);
    });
});

// Click en las imágenes de Series para centrarlas
imagesSeries.forEach((img, index) => {
    img.addEventListener('click', () => {
        if (isAnimatingSeries) return;
        isAnimatingSeries = true;
        currentIndexSeries = index;
        updateCarousel3D(carruselSeries, imagesSeries, currentIndexSeries);
        updateButtonsStateSeries();
        setTimeout(() => { isAnimatingSeries = false; }, 500);
    });
});

// Navegación con teclado (controla ambos carruseles según el último enfocado o simplemente el principal)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlideMovie(); 
        nextSlideSeries(); // Puedes comentar esta línea si solo quieres que la navegación por teclado controle uno.
    } else if (e.key === 'ArrowLeft') {
        prevSlideMovie();
        prevSlideSeries(); // Puedes comentar esta línea si solo quieres que la navegación por teclado controle uno.
    }
});

// Soporte para gestos táctiles en móvil (Solo para carrusel de Películas)
// Se puede adaptar para series si se usa un elemento común o se detecta el objetivo.
carruselMovies.addEventListener('touchstart', (e) => {
    e.currentTarget.touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carruselMovies.addEventListener('touchend', (e) => {
    e.currentTarget.touchEndX = e.changedTouches[0].screenX;
    handleSwipeMovie(e.currentTarget);
}, { passive: true });

function handleSwipeMovie(element) {
    const swipeThreshold = 50;
    const diff = element.touchStartX - element.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlideMovie();
        } else {
            prevSlideMovie();
        }
    }
}

// Inicializar ambos carruseles 3D
updateCarousel3D(carruselMovies, imagesMovies, currentIndexMovie);
updateButtonsStateMovie();

// Inicializar Series
updateCarousel3D(carruselSeries, imagesSeries, currentIndexSeries);
updateButtonsStateSeries();





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
