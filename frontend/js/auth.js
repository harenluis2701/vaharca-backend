// ==========================================
// VAHARCA
// auth.js
// Autenticación (Modo Demo - Sprint 1)
// ==========================================

function iniciarLogin() {

    console.log("Vista Login iniciada.");

    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener("submit", iniciarSesion);

}

async function iniciarSesion(evento) {

    evento.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        alert("Todos los campos son obligatorios.");

        return;

    }

    // ============================
    // USUARIOS DE PRUEBA
    // ============================

    const usuarios = [

        {
            id: 1,
            nombre: "Carlos",
            correo: "coder@vaharca.com",
            password: "123456",
            rol: "coder"
        },

        {
            id: 2,
            nombre: "Haren",
            correo: "leader@vaharca.com",
            password: "123456",
            rol: "leader"
        },

        {
            id: 3,
            nombre: "Administrador",
            correo: "admin@vaharca.com",
            password: "admin123",
            rol: "admin"
        }

    ];

    const usuario = usuarios.find(u =>
        u.correo === email &&
        u.password === password
    );

    if (!usuario) {

        alert("Correo o contraseña incorrectos.");

        return;

    }

    Storage.guardarUsuario(usuario);

    Storage.guardarToken("TOKEN_DE_PRUEBA");

    console.log("Bienvenido", usuario.nombre);

    switch (usuario.rol) {

        case "coder":

            cargarVista("dashboard-coder");

            break;

        case "leader":

            cargarVista("dashboard-leader");

            break;

        case "admin":

            alert("Dashboard Administrador en construcción.");

            break;

    }

}

function cerrarSesion() {

    Storage.cerrarSesion();

    cargarVista("login");

}