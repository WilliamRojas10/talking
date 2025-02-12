const postsContainer = document.querySelector(".section");
const postsPerPage = 2; // Número de posts por página
let currentPage = 1;
let totalRecords = 0;

// Función para obtener posts paginados desde el backend
async function fetchPosts(page) {
    async function fetchCourses(page) {
        try {
            const response = await fetch(`http://localhost:5296/api/course/paginado?pageNumber=${page}&pageSize=${coursesPerPage}`);
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            totalRecords = data.totalRecords;
            renderCourses(data.courses);
            renderPagination();
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        }
}
}

// Función para renderizar los posts en el HTML
function renderPosts(posts) {
    const postsHTML = posts.map(post => `
        <article class="post">
            <div class="container">
                <div class="img-perfil">
                    <img src="./images/perfil.png" alt="profile picture">
                </div>
                <a class="name-person" href="#">${post.nameUser} ${post.lastNameUser}</a>
            </div>
            <p class="description">${post.description}</p>
            <div class="img-publication">
                <img src="http://localhost:5296${post.path}" alt="publication image">
            </div>
            <div class="buttons-post">
                <button>Reaccionar</button>
                <button>Comentar</button>
                <button>Compartir</button>
            </div>
        </article>
    `).join("");

    // Agregar los posts a la sección junto con el formulario para crear un nuevo post
    postsContainer.innerHTML = `
        <div class="my-post">
            <div class="my-img-perfil">
                <img src="./images/perfil.png" alt="profile picture">
            </div>
            <input class="input-description" type="text" placeholder="¿Qué estás pensando?">
            <label for="file-upload" class="label-image">
                <i class="bi bi-file-image"></i>
            </label>
            <input id="file-upload" type="file" accept="image/*" />
            <button type="submit" id="send" class="send">
                <i class="bi bi-send"></i>
            </button>
        </div>
        ${postsHTML}
    `;

    // Volver a agregar eventos
    setupFileUploadListener();
    setupPostSubmitListener();
}

// Función para renderizar los botones de paginación
function renderPagination() {
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) {
        const newPagination = document.createElement("div");
        newPagination.classList.add("pagination");
        postsContainer.appendChild(newPagination);
    }

    const totalPages = Math.ceil(totalRecords / postsPerPage);
    let buttonsHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }

    document.querySelector(".pagination").innerHTML = buttonsHTML;
}

// Función para cambiar de página
function changePage(page) {
    if (page < 1 || page > Math.ceil(totalRecords / postsPerPage)) return;
    currentPage = page;
    fetchPosts(currentPage);
}

// Configurar el evento para cambiar el color del ícono cuando se suba una imagen
function setupFileUploadListener() {
    const fileInput = document.getElementById("file-upload");
    const icon = document.querySelector(".label-image i");

    if (fileInput && icon) {
        fileInput.addEventListener("change", function () {
            if (fileInput.files.length > 0) {
                icon.classList.add("active");
            } else {
                icon.classList.remove("active");
            }
        });
    }
}

// Función para enviar un nuevo post con imagen y descripción
function setupPostSubmitListener() {
    const sendButton = document.getElementById("send");

    if (sendButton) {
        sendButton.addEventListener("click", async () => {
            const description = document.querySelector(".input-description").value;
            const fileInput = document.getElementById("file-upload");
            const file = fileInput.files[0];

            if (!description && !file) {
                alert("Debe ingresar una descripción o subir una imagen.");
                return;
            }

            const formData = new FormData();
            formData.append("description", description);
            if (file) {
                formData.append("image", file);  // La clave "image" debe coincidir con tu DTO
            }

            try {
                const response = await fetch("http://localhost:5296/api/Post", {
                    method: "POST",
                    body: formData,
                    headers: {
                        // No incluir 'Content-Type'
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJVc2VySWQiOiIxIiwiZXhwIjoxNzM5MjQwNzkzLCJpc3MiOiJhcGkudGFsa2luZyIsImF1ZCI6ImFwaS50YWxraW5nLnVzZXJzIn0.DJx6zfYPTkMdIDb67ubgT2Lkx421rUg-F5to5UbdljQ` // Tu token
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Post subido exitosamente.");
                    fetchPosts(currentPage); // Recargar los posts
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Error al subir el post:", error);
            }
        });
    }
}

// Cargar los posts en la primera carga
fetchPosts(currentPage);

// Configurar los eventos una vez que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    setupFileUploadListener();
    setupPostSubmitListener();
});
