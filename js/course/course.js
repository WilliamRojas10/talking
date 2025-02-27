import { getCousesPagedFiltered } from "../../services/Course.js";

const courseContainer = document.getElementById('course-grid');
const paginationContainer = document.createElement('div');
paginationContainer.id = 'pagination-container';

const levelSelect = document.getElementById('course-level');
const searchButton = document.getElementById('search-btn');

let currentPage = 1;
const pageSize = 6; // Para que se ajuste al diseño
let currentLevel = "Todos";

// Función para cargar cursos con paginación y filtro
const loadCourses = async (page, level) => {
    currentPage = page;
    currentLevel = level;

    const response = await getCousesPagedFiltered(page, pageSize, level);

    if (response.success && response.data.courses.length > 0) {
        courseContainer.innerHTML = ''; // Limpiar cursos
        paginationContainer.innerHTML = ''; // Limpiar paginación

        // Insertar cursos con la estructura definida en el HTML
        response.data.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';

            courseElement.innerHTML = `
                <img src="${course.imageUrl || './images/Curso-de-ingles-gratis.png'}" alt="">
                <span class="name">${course.name}</span>
                <span class="description">${course.description}</span>
                <a href="${course.url || '#'}" target="_blank">Enlace al curso</a>
            `;

            courseContainer.appendChild(courseElement);
        });

        // Generar botones de paginación
        if (response.totalRecords > pageSize) {
            const totalPages = Math.ceil(response.totalRecords / pageSize);

            const prevButton = document.createElement('span');
            prevButton.className = 'previous';
            prevButton.innerText = 'Anterior';
            prevButton.onclick = () => {
                if (currentPage > 1) loadCourses(currentPage - 1, currentLevel);
            };
            prevButton.style.cursor = currentPage === 1 ? 'default' : 'pointer';
            prevButton.style.opacity = currentPage === 1 ? '0.5' : '1';

            paginationContainer.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('span');
                pageButton.className = 'page-number';
                pageButton.innerText = i;
                pageButton.onclick = () => loadCourses(i, currentLevel);

                if (i === currentPage) {
                    pageButton.style.fontWeight = 'bold';
                    pageButton.style.textDecoration = 'underline';
                }

                paginationContainer.appendChild(pageButton);
            }

            const nextButton = document.createElement('span');
            nextButton.className = 'next';
            nextButton.innerText = 'Siguiente';
            nextButton.onclick = () => {
                if (currentPage < totalPages) loadCourses(currentPage + 1, currentLevel);
            };
            nextButton.style.cursor = currentPage === totalPages ? 'default' : 'pointer';
            nextButton.style.opacity = currentPage === totalPages ? '0.5' : '1';

            paginationContainer.appendChild(nextButton);
        }

        courseContainer.appendChild(paginationContainer);

    } else {
        courseContainer.innerHTML = '<p>No hay cursos disponibles.</p>';
        paginationContainer.innerHTML = '';
    }
};

// Evento para aplicar el filtro al hacer clic en "Filtrar"
searchButton.addEventListener('click', () => {
    const selectedLevel = levelSelect.value;
    loadCourses(1, selectedLevel);
});

// Cargar los cursos al inicio
loadCourses(currentPage, currentLevel);
