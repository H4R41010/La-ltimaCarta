// Función para reproducir música en bucle en index.html
let audio;
function playAudio1() {
    if (!audio) {
        audio = new Audio('musica/musica1.mp3');
        audio.loop = true;
    }
    audio.play();
}

document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const closeButton = document.querySelector(".close-button");

    // Variables para navegación de imágenes
    let currentImgIndex = null;
    let currentVidIndex = null;
    const maxImgIndex = 160; // Solo imágenes existentes
    const maxVidIndex = 100; // Total de videos

    // Función para mostrar imagen en el modal
    function showImageInModal(index) {
        if (index < 1 || index > maxImgIndex) return;
        modalContent.innerHTML = `<img src="img/img${index}.jpg" alt="Recuerdo ${index}">`;
        modal.classList.add("show");
        currentImgIndex = index;
        currentVidIndex = null;
    }

    function showVideoInModal(index) {
        if (index < 1 || index > maxVidIndex) return;
        modalContent.innerHTML = `<video autoplay controls playsinline><source src="vd/vd${index}.mp4" type="video/mp4"></video>`;
        modal.classList.add("show");
        currentVidIndex = index;
        currentImgIndex = null;
        if (index === 16) {
            alert("ultimo video");
        }
    }

    // Función para crear elementos de medios
    function addMedia(type, index) {
        const div = document.createElement("div");
        div.className = "media-item";
        if (type === "image") {
            const img = document.createElement("img");
            img.src = `img/img${index}.jpg`;
            img.alt = `Recuerdo ${index}`;
            img.onerror = () => div.remove(); // Elimina si el archivo no existe
            div.appendChild(img);
            div.addEventListener("click", () => {
                showImageInModal(index);
            });
        } else if (type === "video") {
            const video = document.createElement("video");
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            const source = document.createElement("source");
            source.src = `vd/vd${index}.mp4`;
            source.type = "video/mp4";
            source.onerror = () => div.remove(); // Elimina si el archivo no existe
            video.appendChild(source);
            div.appendChild(video);
            div.addEventListener("click", () => {
                showVideoInModal(index);
            });
        }
        gallery.appendChild(div);
    }
    
    // Cargar imágenes
    let imgIndex = 1;
    while (imgIndex <= 160) {
        addMedia("image", imgIndex);
        imgIndex++;
    }
    
    // Cargar videos
    let vidIndex = 1;
    while (vidIndex <= 15) {
        addMedia("video", vidIndex);
        vidIndex++;
    }

    // Cerrar modal
    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
        modalContent.innerHTML = "";
        currentImgIndex = null;
        currentVidIndex = null;
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modalContent.innerHTML = "";
            currentImgIndex = null;
            currentVidIndex = null;
        }
    });

    // Navegación con flechas
    document.addEventListener("keydown", function(e) {
        if (modal.classList.contains("show")) {
            if (e.key === "ArrowRight") {
                if (currentImgIndex !== null) {
                    // Siguiente imagen o pasar al primer video
                    let next = currentImgIndex + 1;
                    if (next > maxImgIndex) {
                        showVideoInModal(1);
                    } else {
                        showImageInModal(next);
                    }
                } else if (currentVidIndex !== null) {
                    // Siguiente video o volver a la primera imagen
                    let next = currentVidIndex + 1;
                    // Buscar la primera imagen válida
                    let found = false;
                    if (next > maxVidIndex) {
                        // Busca la primera imagen existente
                        for (let i = 1; i <= maxImgIndex; i++) {
                            let img = new Image();
                            img.src = `img/img${i}.jpg`;
                            if (gallery.querySelector(`img[src='img/img${i}.jpg']`)) {
                                showImageInModal(i);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            // Si no hay imágenes, cierra el modal
                            modal.classList.remove("show");
                            modalContent.innerHTML = "";
                            currentImgIndex = null;
                            currentVidIndex = null;
                        }
                    } else {
                        showVideoInModal(next);
                    }
                }
            } else if (e.key === "ArrowLeft") {
                if (currentImgIndex !== null) {
                    // Imagen anterior o ir al último video
                    let prev = currentImgIndex - 1;
                    if (prev < 1) {
                        showVideoInModal(maxVidIndex);
                    } else {
                        showImageInModal(prev);
                    }
                } else if (currentVidIndex !== null) {
                    // Video anterior o ir a la última imagen
                    let prev = currentVidIndex - 1;
                    if (prev < 1) {
                        showImageInModal(maxImgIndex);
                    } else {
                        showVideoInModal(prev);
                    }
                }
            }
        }
    });

});