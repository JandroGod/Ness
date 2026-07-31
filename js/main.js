// ===============================================
// PARA TI ❤️
// main.js — navegación y escenas
// ===============================================

const distanceMessages = [
    "Dicen que la distancia separa a las personas...",
    "Durante mucho tiempo pensé que tenían razón.",
    "Hasta que llegaste tú.",
    "Porque contigo descubrí que el amor no se mide en kilómetros...",
    "Se mide en las ganas de quedarse.",
    "En las llamadas que nunca quisiera terminar.",
    "Y en la ilusión de saber que algún día podré abrazarte."
];

// ===============================================
// RAZONES — estado
// ===============================================

let currentReasonIndex = 0;
let reasonsPlaying = false;

// ===============================================
// AL CARGAR LA PÁGINA
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");
    const distanceNext = document.getElementById("distanceNext");
    const music = document.getElementById("music");
    const starsContinue = document.getElementById("starsContinue");
    const nextReasonBtn = document.getElementById("nextReason");

    // ==========================
    // BOTÓN INICIO
    // ==========================

    if (startBtn) {

        startBtn.addEventListener("click", async () => {

            if (music) {
                music.volume = 0.3;
                music.play().catch(() => {});
            }

            showScene("distance");
            await sleep(1000);
            await playDistanceScene();

        });

    }

    // ==========================
    // BOTÓN CONTINUAR (HISTORIA → ESTRELLAS)
    // ==========================

    if (distanceNext) {

        distanceNext.addEventListener("click", () => {

            showScene("starsScene");

            // createStars vive en starsGame.js
            if (typeof createStars === "function") {
                createStars();
            } else {
                console.error("createStars no está definida. ¿Se cargó starsGame.js?");
            }

        });

    }

    // ==========================
    // BOTÓN ESTRELLAS → 90 RAZONES
    // ==========================

    if (starsContinue) {

        starsContinue.addEventListener("click", () => {

            showScene("reasonsScene");
            startReasonsScene();

        });

    }

    // ==========================
    // BOTÓN SIGUIENTE RAZÓN
    // ==========================

    if (nextReasonBtn) {

        nextReasonBtn.addEventListener("click", () => {

            if (reasonsPlaying) return;

            const reasons = getReasons();

            if (currentReasonIndex >= reasons.length - 1) {
                // Última razón ya mostrada → ir a carta / corazón
                showScene("heartScene");
                return;
            }

            currentReasonIndex++;
            showReason(currentReasonIndex);

        });

    }

    // ==========================
    // CORAZÓN → CARTA FINAL
    // ==========================

    const heart = document.getElementById("heart");
    const heartNext = document.getElementById("heartNext");

    if (heart) {
        heart.addEventListener("click", () => {
            openFinalLetter();
        });
    }

    if (heartNext) {
        heartNext.addEventListener("click", () => {
            showFinalEmbrace();
        });
    }

});

// ===============================================
// CAMBIAR ESCENA
// ===============================================

function showScene(id) {

    document.querySelectorAll(".screen").forEach(scene => {
        scene.classList.remove("active");
    });

    const scene = document.getElementById(id);

    if (scene) {
        scene.classList.add("active");
    }

}

// ===============================================
// ESCENA 2 - NUESTRA HISTORIA
// ===============================================

async function playDistanceScene() {

    const text = document.getElementById("dialogText");
    const btn = document.getElementById("distanceNext");

    if (!text || !btn) {
        console.error("No existe dialogText o distanceNext");
        return;
    }

    btn.classList.add("hidden");
    btn.style.display = "none";

    text.style.opacity = "1";

    for (const message of distanceMessages) {

        await typeWriter(text, message, 40);
        await sleep(1700);
        text.innerHTML = "";
        await sleep(300);

    }

    btn.classList.remove("hidden");
    btn.style.display = "inline-block";

}

// ===============================================
// ESCENA 4 - 90 RAZONES
// ===============================================

function getReasons() {

    if (typeof messages !== "undefined" && Array.isArray(messages) && messages.length > 0) {
        return messages;
    }

    console.warn("No se encontró el array messages. Usando fallback.");
    return [
        "Porque desde que llegaste a mi vida, me has hecho muy feliz.",
        "Porque simplemente eres tú... y eso ya es suficiente para enamorarme una y otra vez."
    ];

}

function startReasonsScene() {

    currentReasonIndex = 0;
    reasonsPlaying = false;

    const btn = document.getElementById("nextReason");
    if (btn) {
        btn.textContent = "Siguiente razón ❤️";
        btn.classList.remove("hidden");
        btn.style.display = "";
    }

    showReason(0);

}

async function showReason(index) {

    const reasons = getReasons();
    const total = reasons.length;

    if (index < 0 || index >= total) return;

    const counter = document.getElementById("reasonCounter");
    const textEl = document.getElementById("reasonText");
    const btn = document.getElementById("nextReason");
    const card = document.querySelector(".reason-card");

    if (!textEl) return;

    reasonsPlaying = true;

    if (counter) {
        counter.textContent = (index + 1) + " / " + total;
    }

    // Animación de entrada de la tarjeta
    if (card) {
        card.classList.remove("reason-enter");
        // forzar reflow
        void card.offsetWidth;
        card.classList.add("reason-enter");
    }

    // Efecto máquina de escribir
    await typeWriter(textEl, reasons[index], 28);

    reasonsPlaying = false;

    // Si es la última razón, cambiar el botón
    if (btn) {
        if (index >= total - 1) {
            btn.textContent = "Continuar a la carta final ❤️";
        } else {
            btn.textContent = "Siguiente razón ❤️";
        }
    }

}

// ===============================================
// EFECTO MÁQUINA DE ESCRIBIR
// ===============================================

function typeWriter(element, text, speed = 40) {

    return new Promise(resolve => {

        element.innerHTML = "";
        let i = 0;

        const interval = setInterval(() => {

            element.innerHTML += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }

        }, speed);

    });

}

// ===============================================
// ESCENA FINAL - CORAZÓN Y CARTA
// ===============================================

const finalLetterText = `Mi amor,

Si estás leyendo esto, es porque ya recorriste cada estrella y cada razón que guardo para ti.

Quería que sintieras, aunque sea un poco, todo lo que mi corazón siente cuando piensa en ti.

La distancia no ha sido fácil… pero contigo nunca se ha sentido imposible.
Porque cada mensaje, cada llamada y cada “te extraño” me recuerdan por qué elegí quedarme.

Gracias por existir.
Gracias por elegir este amor a pesar de los kilómetros.
Gracias por ser mi hogar, aunque todavía no podamos compartir el mismo.

Sé que cuando ese día llegue, voy a abrazarte como si el tiempo nos hubiera debido ese momento desde siempre.

Hoy solo quiero que sepas algo, con total claridad:

Te amo.
Con tiempo, con ganas y con la certeza de que este sentimiento vale cada espera.

Para siempre tuyo. ❤️`;

let letterOpened = false;

async function openFinalLetter() {

    if (letterOpened) return;
    letterOpened = true;

    const heart = document.getElementById("heart");
    const hint = document.getElementById("heartHint");
    const intro = document.getElementById("heartIntro");
    const title = document.getElementById("heartTitle");
    const letterContainer = document.getElementById("letterContainer");
    const letterText = document.getElementById("letterText");
    const heartNext = document.getElementById("heartNext");

    // Animación del corazón al abrirse
    if (heart) {
        heart.classList.add("heart-open");
        heart.style.pointerEvents = "none";
    }

    if (hint) {
        hint.classList.add("fade-out-soft");
        await sleep(500);
        hint.classList.add("hidden");
    }

    if (intro) {
        intro.classList.add("fade-out-soft");
        await sleep(400);
        intro.classList.add("hidden");
    }

    if (title) {
        title.textContent = "Una carta para ti ❤️";
    }

    if (letterContainer) {
        letterContainer.classList.remove("hidden");
        letterContainer.classList.add("letter-appear");
    }

    if (letterText) {
        await typeWriter(letterText, finalLetterText, 22);
    }

    // Mostrar botón final
    if (heartNext) {
        heartNext.classList.remove("hidden");
        heartNext.style.display = "inline-block";
        heartNext.classList.add("fade-in-soft");
    }

}

async function showFinalEmbrace() {

    const letterContainer = document.getElementById("letterContainer");
    const heartContainer = document.getElementById("heartContainer");
    const heartNext = document.getElementById("heartNext");
    const finalMessage = document.getElementById("finalMessage");
    const title = document.getElementById("heartTitle");
    const heart = document.getElementById("heart");

    if (heartNext) {
        heartNext.classList.add("hidden");
        heartNext.style.display = "none";
    }

    if (letterContainer) {
        letterContainer.classList.add("fade-out-soft");
        await sleep(700);
        letterContainer.classList.add("hidden");
    }

    if (heartContainer) {
        heartContainer.classList.add("hidden");
    }

    if (title) {
        title.textContent = "Para siempre ❤️";
    }

    if (finalMessage) {
        finalMessage.classList.remove("hidden");
        finalMessage.classList.add("final-appear");
    }

    // Corazones flotantes suaves
    spawnFloatingHearts(18);

}

function spawnFloatingHearts(count = 12) {

    const layer = document.getElementById("hearts");
    if (!layer) return;

    for (let i = 0; i < count; i++) {
        const h = document.createElement("span");
        h.className = "floating-heart";
        h.textContent = "❤️";
        h.style.left = Math.random() * 100 + "%";
        h.style.animationDelay = (Math.random() * 2.5) + "s";
        h.style.animationDuration = (4 + Math.random() * 4) + "s";
        h.style.fontSize = (14 + Math.random() * 22) + "px";
        layer.appendChild(h);

        setTimeout(() => h.remove(), 9000);
    }

}

// ===============================================
// UTILIDADES
// ===============================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playMusic() {
    const music = document.getElementById("music");
    if (!music) return;
    music.play().catch(() => {});
}

function pauseMusic() {
    const music = document.getElementById("music");
    if (!music) return;
    music.pause();
}