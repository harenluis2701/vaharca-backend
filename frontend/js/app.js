// ==========================================
// VAHARCA
// app.js
// Control principal de la aplicación (SPA)
// ==========================================

// Contenedor donde se mostrarán todas las vistas
const app = document.getElementById("app");

// Guarda la vista actualmente cargada
let vistaActual = null;

/**
 * Carga una vista HTML dentro del contenedor principal.
 * @param {string} nombreVista
 */
async function cargarVista(nombreVista) {

    if (vistaActual === nombreVista) {
        return;
    }

    try {

        console.log(`Cargando vista: ${nombreVista}`);

        const respuesta = await fetch(`views/${nombreVista}.html`);

        if (!respuesta.ok) {
            throw new Error(`No existe la vista "${nombreVista}"`);
        }

        const html = await respuesta.text();

        app.innerHTML = html;

        vistaActual = nombreVista;

        inicializarVista(nombreVista);

    } catch (error) {

        console.error(error);

        app.innerHTML = `
            <section class="error-container">

                <h1>Error</h1>

                <p>${error.message}</p>

            </section>
        `;

    }

}

/**
 * Inicializa la lógica de cada pantalla.
 */
function inicializarVista(nombreVista) {

    switch (nombreVista) {

        case "login":
            iniciarLogin();
            break;

        case "dashboard-coder":
            iniciarDashboardCoder();
            break;

        case "dashboard-leader":
            iniciarDashboardLeader();
            break;

        default:
            console.log(`Vista "${nombreVista}" inicializada.`);
            break;

    }

}

/**
 * Dashboard del estudiante
 */
function iniciarDashboardCoder() {

    console.log("Dashboard Coder iniciado");

}

/**
 * Dashboard del Team Leader
 */
function iniciarDashboardLeader() {

    console.log("Dashboard Team Leader iniciado");

}

/**
 * Inicia la aplicación
 */
window.addEventListener("DOMContentLoaded", () => {

    console.log("VAHARCA iniciada");

    cargarVista("login");

});