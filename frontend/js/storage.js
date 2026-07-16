// ==========================================
// VAHARCA
// storage.js
// Manejo del LocalStorage
// ==========================================

const Storage = {

    guardarUsuario(usuario) {

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

    },

    obtenerUsuario() {

        const usuario = localStorage.getItem("usuario");

        return usuario
            ? JSON.parse(usuario)
            : null;

    },

    eliminarUsuario() {

        localStorage.removeItem("usuario");

    },

    guardarToken(token) {

        localStorage.setItem(
            "token",
            token
        );

    },

    obtenerToken() {

        return localStorage.getItem("token");

    },

    eliminarToken() {

        localStorage.removeItem("token");

    },

    cerrarSesion() {

        this.eliminarUsuario();
        this.eliminarToken();

    }

};