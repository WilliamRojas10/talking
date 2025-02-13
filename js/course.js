let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9ycy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiNCIsImV4cCI6MTczOTA1MTc2NiwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.iBGA7erHDA0FwqTZTTXqKouaGryxeoayEgxoK5JSwXA';

const API_URL = 'http://localhost:5296/api/Course'; // Ajusta la URL según tu API

export const pagedCourse = async (page, pageSize) => {
    try {
        const response = await fetch(`${API_URL}/paginado?page=${page}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null; // Para manejar errores sin romper el código
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null; // Para manejar errores sin romper el código
    }
};

// // Función para agregar un nuevo curso
// export const addCourse = async (course) => {
//     try {
//         const response = await fetch(`${API_URL}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(course)
//         });

//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//         return null; // Para manejar errores sin romper el código
//     }
// };

// // Función para actualizar un curso existente
// export const updateCourse = async (id, updatedCourse) => {
//     try {
//         const response = await fetch(`${API_URL}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(updatedCourse)
//         });

//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//         return null; // Para manejar errores sin romper el código
//     }
// };

// // Función para eliminar un curso
// export const deleteCourse = async (id) => {
//     try {
//         const response = await fetch(`${API_URL}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//         return null; // Para manejar errores sin romper el código
//     }
// };

// // Función para cargar cursos y paginación
// const loadCourses = async (page, pageSize) => {
//     const courseContainer = document.getElementById('course-container');
//     const paginationContainer = document.getElementById('pagination-container');

//     const data = await pagedCourse(page, pageSize);
//     if (data) {
//         courseContainer.innerHTML = '';
//         data.courses.forEach(course => {
//             const courseElement = document.createElement('div');
//             courseElement.className = 'course';
//             courseElement.innerHTML = `<h2>${course.name}</h2><p>${course.description}</p>`;
//             courseContainer.appendChild(courseElement);
//         });

//         paginationContainer.innerHTML = '';
//         for (let i = 1; i <= data.totalPages; i++) {
//             const pageButton = document.createElement('button');
//             pageButton.innerText = i;
//             pageButton.onclick = () => loadCourses(i, pageSize);
//             paginationContainer.appendChild(pageButton);
//         }
//     } else {
//         courseContainer.innerHTML = '<p>No se pudieron cargar los cursos.</p>';
//     }
// };

// // Cargar la primera página de cursos al cargar la página
// loadCourses(1, 10);
