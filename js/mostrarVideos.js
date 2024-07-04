import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

export default function crearCard(id, titulo, precio, url, imagen) {
    const video = document.createElement("li");
    video.className = "videos__item";
    video.innerHTML = `
    <iframe width="100%" height="70%" src="${url}"
                title="${titulo}" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            <div class="descripcion-video">
                <button class="delete-button"> <img src="./img/logo.png" alt=""></button>
                <h3>${titulo}</h3>
                <p>${precio}</p>
            </div>
    `;

    // Agregar evento al botón para eliminar el card
    const deleteButton = video.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try {
            await conexionAPI.eliminarVideo(id);
            video.remove();
        } catch (error) {
            alert(`Error al eliminar el video: ${error.message}`);
        }
    });

    return video;
}

async function listarVideos() {
    try {
        const listaApi = await conexionAPI.listarVideos();

        listaApi.forEach((elemtVideo) =>
            lista.appendChild(
                crearCard(
                    elemtVideo.id, // Asegúrate de que el objeto tenga un ID único
                    elemtVideo.titulo,
                    elemtVideo.precio,
                    elemtVideo.url,
                    elemtVideo.imagen
                )
            )
        );
    } catch (error) {
        lista.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexión: ${error.message}</h2>`;
    }
}

listarVideos();
