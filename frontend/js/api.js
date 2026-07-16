// ==========================================
// VAHARCA
// Comunicación con FastAPI
// ==========================================

const API_URL = "http://127.0.0.1:8000/api";

/**
 * Verifica que el backend esté funcionando.
 */
async function obtenerEstadoServidor() {

    try {

        const respuesta = await fetch(`${API_URL}/status`);

        return await respuesta.json();

    } catch (error) {

        console.error(error);

        return null;

    }

}

/**
 * Login (pendiente para Sprint 2)
 */
async function login(datos) {

    console.log(datos);

}