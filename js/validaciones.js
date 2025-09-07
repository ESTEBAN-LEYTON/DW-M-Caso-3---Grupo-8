// Validaciones de formularios

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usuario = document.getElementById("usuario");
    const password = document.getElementById("password");
    const mensajeError = document.getElementById("mensajeError");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // evita que se recargue la página
        let errores = [];

        // Validar usuario
        if (usuario.value.trim() === "") {
            errores.push("El usuario es obligatorio.");
        } else if (!validarEmail(usuario.value) && !validarRUT(usuario.value)) {
            errores.push("Ingrese un correo válido o un RUT válido.");
        }

        // Validar contraseña
        if (password.value.trim() === "") {
            errores.push("La contraseña es obligatoria.");
        } else if (password.value.length < 6) {
            errores.push("La contraseña debe tener al menos 6 caracteres.");
        }

        // Mostrar errores o mensaje de éxito
        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
        } else {
            mensajeError.style.color = "green";
            mensajeError.textContent = "✅ Login exitoso (simulado).";
            // Aquí se podría redirigir a otra página si se implementara backend
        }
    });

    // Función para validar email simple
    function validarEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Función para validar formato de RUT simple (ej: 12345678-9)
    function validarRUT(rut) {
        const re = /^\d{7,8}-[0-9kK]$/;
        return re.test(rut);
    }
});
