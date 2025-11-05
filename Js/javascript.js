
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




const carrusel = document.getElementById('img-movies-container');
const carruselseries = document.getElementById('img-series-container');

const btnPrev = document.getElementById('btn-prev-movie');
const btnNext = document.getElementById('btn-next-movie');

const btnPrevSeries = document.getElementById('btn-prev-serie');
const btnNextSeries = document.getElementById('btn-next-serie');

const primerImagen = carrusel.querySelector('img'); // usá 'img', no '.img'

const scrollAmount = primerImagen ? primerImagen.offsetWidth * 4 : 800; 

btnNext.addEventListener('click', () => {
    carrusel.scrollLeft += scrollAmount;
});

btnPrev.addEventListener('click', () => {
    carrusel.scrollLeft -= scrollAmount;
});

btnNextSeries.addEventListener('click', () => {
    carruselseries.scrollLeft += scrollAmount;
});

btnPrevSeries.addEventListener('click', () => {
    carruselseries.scrollLeft -= scrollAmount;
});





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


