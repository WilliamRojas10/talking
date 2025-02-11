const API_URL = "http://localhost:5296/api/courses"; // Asegúrate de que la ruta sea correcta
let currentPage = 1;
let pageSize = 2; // Define cuántos cursos mostrar por página

// Función para obtener cursos desde la API
async function fetchCourses(page) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&size=${pageSize}`);
        const data = await response.json();
        console.log("Respuesta de la API:", data); // Depuración

        if (!response.ok) {
            throw new Error("Error al obtener los cursos");
        }

        renderCourses(data.data);
        renderPagination(data.totalPages);
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

// Función para renderizar los cursos en el HTML
function renderCourses(courses) {
    const container = document.getElementById("course-container");
    container.innerHTML = ""; // Limpiar contenido anterior

    courses.forEach(course => {
        console.log("Curso recibido:", course); // Depuración

        const courseElement = document.createElement("section");
        courseElement.classList.add("idioma");

        courseElement.innerHTML = `
            <h2>${course.nombre ?? "Sin nombre"}</h2>
            <div class="imagen">
                <img src="${course.imagen ?? "default.jpg"}" alt="Imagen del curso">
            </div>
            <p>${course.descripcion ?? "Sin descripción disponible"}</p>
            <a href="${course.link ?? "#"}" target="_blank">
                <button class="boton">+ Info</button>
            </a>
        `;

        container.appendChild(courseElement);
    });
}

// Función para crear botones de paginación
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = ""; // Limpiar botones anteriores

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            fetchCourses(currentPage);
        });

        paginationContainer.appendChild(button);
    }
}

// Cargar cursos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    fetchCourses(currentPage);
});
