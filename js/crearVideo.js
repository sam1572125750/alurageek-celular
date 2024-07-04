import { conexionAPI } from "./conexionAPI.js";

const fomrulario = document.querySelector("[data-formulario]");

async function crearVideos(evento) {
    evento.preventDefault();
    const titulo = document.querySelector("[data-titulo]").value;
    const url = document.querySelector("[data-url]").value;
    // const imagen = document.querySelector("[data-imagen]").value;
    const precio=document.querySelector("[data-imagen]").value
    // const precio = Math.floor(Math.random * 10).toString();

    try {
        await conexionAPI.enviarVideos(titulo, precio,url);  //?aca borre imagen

        window.location.href = "./pages/envio-concluido.html";
    } catch (e) {
        alert(e);
    }
}

fomrulario.addEventListener("submit", (evento) => crearVideos(evento));
