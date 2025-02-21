import { getPostsPaged, createPost } from "../../services/Post.js";
import { createReaction, getReactionsByPost } from "../../services/Reaction.js";
import { getCommentsPaged, createComment } from "../../services/Comment.js";

const postsContainer = document.querySelector(".section");
const postsPerPage = 10;
let currentPage = 1;
let totalRecords = 0;
let isFetching = false;

// Obtener posts paginados
async function fetchPosts(page) {
  try {
    const response = await getPostsPaged(page, postsPerPage);
    totalRecords = response.totalRecords;
    renderPosts(response.posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
  }
}

// Renderizar los posts
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
        <div class="comments-section" id="comments-${post.idPost}"></div>
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

// Escuchar eventos de clic en los botones de reacción
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

// Escuchar eventos de clic en el botón "Comentar"
function addCommentListeners() {
  const commentButtons = document.querySelectorAll(".comment-btn");
  commentButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const postId = button.getAttribute("data-post-id");
      const commentsSection = document.getElementById(`comments-${postId}`);
      const comments = await getCommentsPaged(postId, 1, 5);
      renderComments(comments, commentsSection);
      setupCommentSubmitListener(postId, commentsSection);
    });
  });
}

// Renderizar comentarios
function renderComments(comments, container) {
  container.innerHTML = comments.map(comment => `
    <div class="comment">
      <strong>${comment.userName}</strong>
      <p>${comment.text}</p>
    </div>
  `).join("");

  container.innerHTML += `
    <div class="comment-input">
      <input type="text" placeholder="Escribe un comentario..." class="new-comment-input">
      <button class="submit-comment">Enviar</button>
    </div>
  `;
}

// Manejar el envío de comentarios
function setupCommentSubmitListener(postId, commentsContainer) {
  const submitButton = commentsContainer.querySelector(".submit-comment");
  const commentInput = commentsContainer.querySelector(".new-comment-input");
  submitButton.addEventListener("click", async () => {
    const commentText = commentInput.value;
    if (!commentText) return;
    try {
      await createComment(postId, commentText);
      commentInput.value = "";
      const updatedComments = await getCommentsPaged(postId, 1, 5);
      renderComments(updatedComments, commentsContainer);
    } catch (error) {
      alert("Error al enviar el comentario.");
    }
  });
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
