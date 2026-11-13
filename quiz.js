
const preguntas = [
    {
        pregunta: "¿Cuál es la función principal de un sistema operativo?",
        opciones: [
            "Diseñar páginas web",
            "Administrar los recursos de la computadora",
            "Crear componentes electrónicos"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Qué es el hardware?",
        opciones: [
            "Los programas de la computadora",
            "Las páginas de Internet",
            "Los componentes físicos de la computadora"
        ],
        correcta: 2
    },
    {
        pregunta: "¿Qué es un hilo?",
        opciones: [
            "Una unidad de ejecución de un proceso",
            "Un dispositivo de almacenamiento",
            "Un tipo de sistema operativo"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Qué busca evitar el algoritmo del banquero?",
        opciones: [
            "Los interbloqueos entre procesos",
            "La pérdida de archivos",
            "Las fallas del monitor"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cuál de estos sistemas se utiliza en servidores?",
        opciones: [
            "Microsoft Word",
            "Ubuntu Server",
            "Microsoft Excel"
        ],
        correcta: 1
    }
];

let numeroActual = 0;
let puntos = 0;

const numero = document.getElementById("numero-pregunta");
const pregunta = document.getElementById("pregunta-quiz");
const opciones = document.getElementById("opciones-quiz");
const mensaje = document.getElementById("mensaje-quiz");
const siguiente = document.getElementById("siguiente-quiz");

function mostrarPregunta() {
    opciones.innerHTML = "";
    mensaje.textContent = "";
    siguiente.hidden = true;

    numero.textContent = "Pregunta " +
        (numeroActual + 1) + " de " + preguntas.length;

    pregunta.textContent = preguntas[numeroActual].pregunta;

    preguntas[numeroActual].opciones.forEach((respuesta, i) => {
        const boton = document.createElement("button");

        boton.textContent = respuesta;
        boton.className = "opcion-quiz";
        boton.type = "button";

        boton.addEventListener("click", function () {
            verificarRespuesta(i);
        });

        opciones.appendChild(boton);
    });
}

function verificarRespuesta(seleccionada) {
    const correcta = preguntas[numeroActual].correcta;
    const botones = opciones.querySelectorAll("button");

    botones.forEach(boton => {
        boton.disabled = true;
    });

    if (seleccionada === correcta) {
        puntos++;
        mensaje.textContent = "¡Respuesta correcta!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "Respuesta incorrecta. La correcta es: " +
            preguntas[numeroActual].opciones[correcta];
        mensaje.style.color = "darkred";
    }

    siguiente.hidden = false;

    if (numeroActual === preguntas.length - 1) {
        siguiente.textContent = "Ver resultado";
    } else {
        siguiente.textContent = "Siguiente pregunta";
    }
}

siguiente.addEventListener("click", function () {
    numeroActual++;

    if (numeroActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    numero.textContent = "Cuestionario finalizado";
    pregunta.textContent = "Tu calificación es: " +
        puntos + " de " + preguntas.length;

    opciones.innerHTML = "";
    mensaje.textContent = "";
    siguiente.hidden = true;

    const reiniciar = document.createElement("button");
    reiniciar.textContent = "Volver a intentar";
    reiniciar.className = "opcion-quiz";

    reiniciar.addEventListener("click", function () {
        numeroActual = 0;
        puntos = 0;
        mostrarPregunta();
    });

    opciones.appendChild(reiniciar);
}

mostrarPregunta();
