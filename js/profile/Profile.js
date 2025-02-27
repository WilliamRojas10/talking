import { getMyPostsPaged, deletePost, updatePost } from "../../services/Post.js";
import { getMyUserByLogin } from "../../services/user.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadUserProfile();
    await loadUserPosts(1);
});

async function loadUserProfile() {
    try {
        const response = await getMyUserByLogin();
        if (response.success) {
            const userData = response.data;
            document.querySelector(".personal-information").innerHTML = `
                <p>Nombre: <span>${userData.name}</span></p>
                <p>Apellido: <span>${userData.lastName}</span></p>
                <p>Correo: <span>${userData.email}</span></p>
                <p>Fecha nacimiento: <span>${userData.birthDate}</span></p>
                <p>Nacionalidad: <span>${userData.nationality}</span></p>
                <p>Provincia: <span>${userData.province}</span></p>
            `;
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error("Error cargando perfil de usuario", error);
    }
}

async function loadUserPosts(page) {
    try {
        const response = await getMyPostsPaged(page);
        console.log("RESPONSE PROFILE", response);
        
        const container = document.querySelector(".container-publication");
        container.innerHTML = "";

        if (response.success) {
            const postsData = response.data.posts;
            
            if (!postsData || postsData.length === 0) {
                const noPostsMessage = document.createElement("h3");
                noPostsMessage.textContent = "No hay posteos";
                container.appendChild(noPostsMessage);
            } else {
                postsData.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("publication-space");
                    postElement.innerHTML = `
                        <p class="descripcion">${post.description}</p>
                        <div class="container-img">
                            <img src="http://localhost:5296${post.path}" alt="Imagen del post">
                        </div>
                        <button class="buttonUpdate">Editar</button>
                        <button class="buttonDelete" data-id="${post.idPost}">Eliminar</button>
                    `;
                    container.appendChild(postElement);
                });

                document.querySelectorAll(".buttonDelete").forEach(button => {
                    button.addEventListener("click", async () => {
                        const postId = button.getAttribute("data-id");
                        console.log("ID del post a eliminar:", postId);
                        const resp = await deletePost(postId);
                        console.log("Respuesta de deletePost:", resp);
                        if (resp.success) {
                            await loadUserPosts(page);
                        } else {
                            alert(resp.message);
                        }
                    });
                });
            }
            
            setupPagination(response.data.totalRecords, page);
        } else {
            const noPostsMessage = document.createElement("h3");
            noPostsMessage.textContent = "No hay posteos";
            container.appendChild(noPostsMessage);
        }
    } catch (error) {
        console.error("Error cargando posteos", error);
    }
}

function setupPagination(totalRecords, currentPage) {
    const container = document.querySelector(".container-pagination");
    if (!container) {
        console.error("Error: No se encontró el elemento .container-pagination");
        return;
    }
    
    container.innerHTML = "";
    const totalPages = Math.ceil(totalRecords / 10);
    
    if (currentPage > 1) {
        const prev = document.createElement("span");
        prev.classList.add("previous");
        prev.textContent = "Anterior";
        prev.addEventListener("click", () => loadUserPosts(currentPage - 1));
        container.appendChild(prev);
    }
    
    for (let i = 1; i <= totalPages; i++) {
        const pageEl = document.createElement("span");
        pageEl.classList.add("page-number");
        pageEl.textContent = i;
        if (i === currentPage) {
            pageEl.classList.add("active");
        }
        pageEl.addEventListener("click", () => loadUserPosts(i));
        container.appendChild(pageEl);
    }
    
    if (currentPage < totalPages) {
        const next = document.createElement("span");
        next.classList.add("next");
        next.textContent = "Siguiente";
        next.addEventListener("click", () => loadUserPosts(currentPage + 1));
        container.appendChild(next);
    }
}
