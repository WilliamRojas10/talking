import { getPostsPaged, createPost } from "../../services/Post.js";
import { createReaction } from "../../services/Reaction.js";
import { getCommentsPaged, createComment } from "../../services/Comment.js";

const postsContainer = document.querySelector(".section");
const postsPerPage = 10;
let currentPage = 1;
let totalRecords = 0;
let isFetching = false;

async function fetchPosts(page) {
  try {
    const response = await getPostsPaged(page, postsPerPage);
    totalRecords = response.data.totalRecords;
    renderPosts(response.data.posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
  }
}

function renderPosts(posts) {
  const postsHTML = posts.map(post => {
    const likeReaction = post.reactions?.find(r => r.reactionStatus === 1);
    const dislikeReaction = post.reactions?.find(r => r.reactionStatus === 2);
    const likeCount = likeReaction ? likeReaction.count : 0;
    const dislikeCount = dislikeReaction ? dislikeReaction.count : 0;

    return `
      <article class="post">
        <div class="container">
          <div class="img-perfil">
            <img src="./images/perfil.png" alt="profile picture">
          </div>
          <a class="name-person" href="#">${post.nameUser} ${post.lastNameUser}</a>
        </div>
        <p class="description">${post.description || ""}</p>
        ${post.path ? `<div class="img-publication"><img src="http://localhost:5296${post.path}" alt="publication image"></div>` : ""}
        <div class="buttons-post">
          <div class="container-reactions">
            <i class="recomendar bi bi-hand-thumbs-up" data-post-id="${post.idPost}" data-reaction-type="1"></i>
            <span class="like-count">${likeCount}</span>
            <i class="noMeGusta bi bi-hand-thumbs-down" data-post-id="${post.idPost}" data-reaction-type="2"></i>
            <span class="dislike-count">${dislikeCount}</span>
          </div>
          <button class="comment-btn" data-post-id="${post.idPost}">Comentar</button>
        </div>
        <!-- Contenedor de comentarios oculto por defecto -->
        <div class="container-comments" id="comments-${post.idPost}" style="display:none;"></div>
      </article>
    `;
  }).join("");

  if (currentPage === 1) {
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
      <div class="posts-list">
        ${postsHTML}
      </div>
    `;
  } else {
    const postsList = postsContainer.querySelector(".posts-list");
    if (postsList) {
      postsList.insertAdjacentHTML("beforeend", postsHTML);
    }
  }

  addReactionListeners();
  setupFileUploadListener();
  setupPostSubmitListener();
  addCommentListeners();
}

// Escuchar clics en los íconos de reacción
function addReactionListeners() {
  const reactionButtons = document.querySelectorAll(".container-reactions i");
  reactionButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const idPost = button.getAttribute("data-post-id");
      const idReaction = button.getAttribute("data-reaction-type");
      try {
        const response = await createReaction(idPost, idReaction);
        if (response.success) {
          fetchPosts(1);
        } else {
          alert("Error al crear la reacción: " + response.message);
        }
      } catch (error) {
        alert("Error al crear la reacción.");
      }
    });
  });
}

// Escuchar clics en el botón "Comentar"
function addCommentListeners() {
  const commentButtons = document.querySelectorAll(".comment-btn");
  commentButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const postId = button.getAttribute("data-post-id");
      const commentsSection = document.getElementById(`comments-${postId}`);
      // Toggle: si ya está visible, se oculta; de lo contrario, se muestra y se cargan los comentarios
      if (commentsSection.style.display === "flex") {
        commentsSection.style.display = "none";
      } else {
        commentsSection.style.display = "flex";
        const commentsData = await getCommentsPaged(postId, 1, 5);
        renderComments(commentsData, commentsSection, 1, 5, postId);
        setupCommentSubmitListener(postId, commentsSection);
      }
    });
  });
}

// Renderizar comentarios con la estructura deseada
// Siempre se muestra el bloque "my-comment" (input y botón "Enviar") al inicio del contenedor
function renderComments(commentsData, container, currentPage = 1, pageSize = 5, postId) {
  // Usamos los datos de commentsData.data, ya que la API retorna { success, message, data: { totalRecords, comments } }
  const totalRecordsComments = commentsData.data?.totalRecords || 0;
  const comments = commentsData.data?.comments || [];
  const totalPages = Math.ceil(totalRecordsComments / pageSize);
  let commentsHTML = "";
  if (comments.length > 0) {
    commentsHTML = comments.map(comment => `
      <div class="comment">
        <span class="comment-user">${comment.userName}</span>
        <p>${comment.text}</p>
        <span class="comment-datetime">${comment.registrationDate}</span>
      </div>
    `).join("");
  }
  container.innerHTML = `
    <div class="my-comment">
      <input type="text" placeholder="Escribe un comentario..." class="new-comment-input">
      <button class="submit-comment" type="submit">Enviar</button>
    </div>
    ${commentsHTML}
    ${totalRecordsComments > 0 ? `
      <div class="container-pagination pagination">
        ${currentPage > 1 ? `<span class="previous" data-page="${currentPage - 1}">Anterior</span>` : ""}
        ${Array.from({ length: totalPages }, (_, i) => `<span class="page-number" data-page="${i + 1}">${i + 1}</span>`).join("")}
        ${currentPage < totalPages ? `<span class="next" data-page="${currentPage + 1}">Siguiente</span>` : ""}
      </div>
    ` : ""}
  `;
  setupCommentPaginationListeners(container, currentPage, pageSize, totalPages, postId);
}

// Configurar eventos para la paginación de comentarios
function setupCommentPaginationListeners(container, currentPage, pageSize, totalPages, postId) {
  const prevButton = container.querySelector(".previous");
  const nextButton = container.querySelector(".next");
  const pageNumbers = container.querySelectorAll(".page-number");

  if (prevButton) {
    prevButton.addEventListener("click", async () => {
      const newPage = currentPage - 1;
      const newCommentsData = await getCommentsPaged(postId, newPage, pageSize);
      renderComments(newCommentsData, container, newPage, pageSize, postId);
      setupCommentSubmitListener(postId, container);
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", async () => {
      const newPage = currentPage + 1;
      const newCommentsData = await getCommentsPaged(postId, newPage, pageSize);
      renderComments(newCommentsData, container, newPage, pageSize, postId);
      setupCommentSubmitListener(postId, container);
    });
  }
  pageNumbers.forEach(pageNumber => {
    pageNumber.addEventListener("click", async () => {
      const newPage = parseInt(pageNumber.getAttribute("data-page"));
      const newCommentsData = await getCommentsPaged(postId, newPage, pageSize);
      renderComments(newCommentsData, container, newPage, pageSize, postId);
      setupCommentSubmitListener(postId, container);
    });
  });
}

// Manejar el envío de nuevos comentarios
function setupCommentSubmitListener(postId, commentsContainer) {
  const submitButton = commentsContainer.querySelector(".submit-comment");
  const commentInput = commentsContainer.querySelector(".new-comment-input");
  submitButton.addEventListener("click", async () => {
    const commentText = commentInput.value;
    if (!commentText) return;
    try {
      await createComment(postId, commentText);
      commentInput.value = "";
      const updatedCommentsData = await getCommentsPaged(postId, 1, 5);
      renderComments(updatedCommentsData, commentsContainer, 1, 5, postId);
      setupCommentSubmitListener(postId, commentsContainer);
    } catch (error) {
      alert("Error al enviar el comentario.");
    }
  });
}

// Manejar el evento de subir imágenes
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

// Manejar el envío de nuevos posts (con imagen)
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
        formData.append("image", file);
      }
      try {
        const response = await createPost(formData);
        if (response.success) {
          alert("Post subido exitosamente.");
          currentPage = 1;
          fetchPosts(currentPage);
        } else {
          alert("Error: " + response.message);
        }
      } catch (error) {
        console.error("Error al subir el post:", error);
      }
    });
  }
}

// Scroll infinito
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    if (!isFetching && currentPage * postsPerPage < totalRecords) {
      isFetching = true;
      currentPage++;
      fetchPosts(currentPage).finally(() => {
        isFetching = false;
      });
    }
  }
});

fetchPosts(currentPage);
