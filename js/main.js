// Verificar si hay datos guardados en LocalStorage al cargar la página
window.onload = function() {
    let invitadoGuardado = localStorage.getItem("invitado");
    if (invitadoGuardado) {
        mostrarDatosPorGenero(JSON.parse(invitadoGuardado)); 
    }
};

document.getElementById("formulario-invitado").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores de los campos de entrada
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let genero = document.getElementById("genero").value;
    let edad = document.getElementById("edad").value;
    let relacion = document.getElementById("relacion").value;
    let ciudad = document.getElementById("ciudad").value;
    let asistencia = document.getElementById("asistencia").value;

    // Validar los datos del invitado
    if (nombre === "" || apellido === "" || email === "" || genero === "" || edad === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Validar si el invitado es menor de edad
    if (parseInt(edad) < 18) {
        alert("Lo siento, la fiesta es solo para mayores de edad.");
        return;
    }

    // Crear un objeto con los datos del invitado
    let invitado = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        genero: genero,
        edad: edad,
        relacion: relacion,
        ciudad: ciudad,
        asistencia: asistencia
    };

    // Mostrar los datos del invitado en el cuadro correspondiente
    mostrarDatosPorGenero(invitado);

    // Mostrar un mensaje de agradecimiento si el invitado no va a asistir
    if (invitado.asistencia === "no") {
        alert("Gracias y lamentamos que no puedas asistir a nuestra fiesta.");
    }

    // Guardar los datos del invitado en LocalStorage
    localStorage.setItem("invitado", JSON.stringify(invitado));

    // Limpiar el formulario para futuros ingresos
    document.getElementById("formulario-invitado").reset();
});

function mostrarDatosPorGenero(invitado) {
    // Crear un nuevo elemento div para contener los datos del invitado
    let nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("datos-invitado");

    // Crear un HTML con los datos del invitado
    let datosHTML = `
        <h2>Datos del Invitado:</h2>
        <p><strong>Nombre:</strong> ${invitado.nombre} ${invitado.apellido}</p>
        <p><strong>Email:</strong> ${invitado.email}</p>
        <p><strong>Género:</strong> ${invitado.genero}</p>
        <p><strong>Edad:</strong> ${invitado.edad}</p>
        <p><strong>Relación con los novios:</strong> ${invitado.relacion}</p>
        <p><strong>Ciudad de residencia:</strong> ${invitado.ciudad}</p>
        <p><strong>Asistencia a la boda:</strong> ${invitado.asistencia}</p>
    `;

    // Agregar el HTML al nuevo elemento
    nuevoElemento.innerHTML = datosHTML;

    // Obtener el elemento donde se mostrarán los datos del invitado
    let datosClienteDiv = null;

    // Determinar el contenedor de datos del invitado según su género
    if (invitado.genero === "hombre") {
        datosClienteDiv = document.getElementById("datos-hombres");
    } else if (invitado.genero === "mujer") {
        datosClienteDiv = document.getElementById("datos-mujeres");
    }

    // Agregar el nuevo elemento al contenedor de datos del invitado
    if (datosClienteDiv) {
        datosClienteDiv.appendChild(nuevoElemento);
    }
}


