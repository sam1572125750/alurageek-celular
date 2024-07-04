async function listarVideos() {
    const conexion = await fetch("http://localhost:3001/videos");
    const convertidoConexion = await conexion.json();
    return convertidoConexion;
}

async function enviarVideos(titulo, precio, url, imagen) {
    const conexion = await fetch("http://localhost:3001/videos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            titulo: titulo,
            precio: `${precio} soles`,
            url: url,
            imagen: imagen,
        }),
    });

    const conexionconvertida = await conexion.json();
    if (!conexion.ok) {
        throw new Error("ha ocurrido un error al enviar el video");
    }

    return conexionconvertida;
}

async function buscarVideos(palabraclave) {
    const conexion = await fetch(`http://localhost:3001/videos?q=${palabraclave}`);
    const conexionConbertida = await conexion.json();
    return conexionConbertida;
}

async function eliminarVideo(id) {
    const conexion = await fetch(`http://localhost:3001/videos/${id}`, {
        method: "DELETE"
    });

    if (!conexion.ok) {
        const message = await conexion.text();
        throw new Error(`Error al eliminar el video: ${message}`);
    }
}


export const conexionAPI = {
    listarVideos,
    enviarVideos,
    buscarVideos,
    eliminarVideo
};
