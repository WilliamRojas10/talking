// document.addEventListener("DOMContentLoaded", () => {
//     const postForm = document.getElementById("send");

//     postForm.addEventListener("submit", async (event) => {
//         event.preventDefault(); // Evita recargar la página

//         const description = document.getElementById("postDescription").value;
//         const fileInput = document.getElementById("file-upload").files[0];

//         const formData = new FormData();
//         formData.append("description", description);
//         if (fileInput) {
//             formData.append("file", fileInput);
//         }

//         try {
//             const newPost = await createPost(formData);
//             fetchPosts(1); // Recargar los posts después de publicar uno nuevo
//         } catch (error) {
//             console.error("Error al crear el post:", error);
//         }
//     });
// });

// async function createPost(formData) {
//     const url = "http://localhost:5296/api/Post"; // Asegúrate de que esta es la URL correcta
//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             body: formData,
//             headers: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJVc2VySWQiOiIxIiwiZXhwIjoxNzM5MjM3MTMzLCJpc3MiOiJhcGkudGFsa2luZyIsImF1ZCI6ImFwaS50YWxraW5nLnVzZXJzIn0.p-A8rmn0qSL4ZfKly_S9hQ1FlH6QxlMbkqwIK9wZ4No"
//         });

//         if (!response.ok) {
//             throw new Error(`Error creando el post: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
