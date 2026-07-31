// ==========================================
// CONFIGURACIÓN
// ==========================================

const starsContainer = document.getElementById("stars");

const TOTAL_STARS = 250;

// ==========================================
// CREAR ESTRELLAS
// ==========================================

for (let i = 0; i < TOTAL_STARS; i++) {

    const star = document.createElement("div");

    const size = Math.random() * 3 + 1;

    star.classList.add("star");

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 5}s`;

    star.style.animationDuration = `${2 + Math.random() * 4}s`;

    star.style.opacity = Math.random();

    starsContainer.appendChild(star);

}

// ==========================================
// ESTRELLA FUGAZ
// ==========================================

function createShootingStar(){

    const shootingStar = document.createElement("div");

    shootingStar.className = "shooting-star";

    shootingStar.style.left = `${Math.random() * window.innerWidth}px`;

    shootingStar.style.top = `${Math.random() * 250}px`;

    starsContainer.appendChild(shootingStar);

    setTimeout(() => {

        shootingStar.remove();

    },3000);

}

// Cada 8-15 segundos aparece una

function shootingLoop(){

    createShootingStar();

    const next = Math.random() * 7000 + 8000;

    setTimeout(shootingLoop,next);

}

shootingLoop();

// ==========================================
// EFECTO PARALLAX
// ==========================================

document.addEventListener("mousemove",(e)=>{

    const x = (e.clientX / window.innerWidth - .5) * 12;
    const y = (e.clientY / window.innerHeight - .5) * 12;

    starsContainer.style.transform = `translate(${x}px, ${y}px)`;

});