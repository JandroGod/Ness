// ===============================================
// starsGame.js
// Solo maneja el juego interactivo de estrellas
// ===============================================

// starMessages viene de messages.js (cargado antes)

let discoveredStars = 0;

function createStars() {

    const container = document.getElementById("starsGame");

    if (!container) {
        console.error("No existe #starsGame");
        return;
    }

    // Usar starMessages de messages.js si existe
    const msgs = (typeof starMessages !== "undefined" && Array.isArray(starMessages))
        ? starMessages
        : [
            "Cada noche miro el cielo imaginando que tú también ves las mismas estrellas.",
            "Aunque estemos lejos, el mismo cielo nos une.",
            "Si pudiera pedir un deseo, sería abrazarte ahora mismo.",
            "Gracias por hacer que la distancia nunca sea más grande que nuestro amor.",
            "Contigo aprendí que el amor verdadero sabe esperar.",
            "Eres la casualidad más bonita que me ha regalado la vida.",
            "No importa cuántos kilómetros haya, siempre encuentro el camino hacia ti.",
            "Cada día es un día menos para poder estar juntos.",
            "Cada estrella representa un pensamiento bonito que tengo sobre ti.",
            "Y esto apenas es el comienzo de todo lo que quiero decirte ❤️"
        ];

    container.innerHTML = "";
    discoveredStars = 0;

    const foundEl = document.getElementById("starsFound");
    if (foundEl) foundEl.textContent = "0";

    const continueBtn = document.getElementById("starsContinue");
    if (continueBtn) continueBtn.classList.add("hidden");

    for (let i = 0; i < msgs.length; i++) {

        const star = document.createElement("div");
        star.className = "game-star";
        star.style.left = (5 + Math.random() * 90) + "%";
        star.style.top = (5 + Math.random() * 85) + "%";

        star.addEventListener("click", () => {

            if (star.classList.contains("discovered")) return;
            star.classList.add("discovered");
            star.remove();

            discoveredStars++;

            if (foundEl) foundEl.textContent = discoveredStars;

            const msgEl = document.getElementById("starMessage");
            if (msgEl) msgEl.textContent = msgs[i];

            const card = document.getElementById("messageCard");
            if (card) card.classList.remove("hidden");

            if (discoveredStars === msgs.length && continueBtn) {
                continueBtn.classList.remove("hidden");
            }

        });

        container.appendChild(star);

    }

}

// Cerrar tarjeta de mensaje de estrella
document.addEventListener("DOMContentLoaded", () => {

    const closeMessage = document.getElementById("closeMessage");

    if (closeMessage) {
        closeMessage.addEventListener("click", () => {
            const card = document.getElementById("messageCard");
            if (card) card.classList.add("hidden");
        });
    }

});