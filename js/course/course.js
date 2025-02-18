
const API_URL = "http://localhost:5296/api/Course"; 

// Obtener el token de localStorage o usar un valor por defecto (evita dejarlo hardcodeado en producción)
const getToken = () => localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const pagedCourse = async (page = 1, pageSize = 10, level = "") => {
    try {
        const url = new URL(`${API_URL}/paginado`);
        url.searchParams.append("page", page);
        url.searchParams.append("pageSize", pageSize);
        if (level) url.searchParams.append("level", level); // Solo agrega 'level' si no está vacío

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
        });

        console.log("Response paginado:", response);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en pagedCourse:", error.message);
        return null; 
    }
};

export const getCourseById = async (id) => {
    try {
        if (!id) throw new Error("El ID del curso es requerido");

        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getCourseById:", error.message);
        return null; 
    }
};






// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoianVhbi5wZXJlekBlbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiMyIsImV4cCI6MTczOTgzNzYwMiwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.NZmtc8FMvd3Q5arsPf38-JoZ8oNnqYcJTNw08GiWNHI"
// const API_URL = 'http://localhost:5296/api/Course'; // Ajusta la URL según tu API

// export const pagedCourse = async (page, pageSize, level = "") => {
//     try {
//         const response = await fetch(`${API_URL}/paginado?page=${page}&pageSize=${pageSize}&level=${level}`, {
            
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             },

//         });

//         console.log ("responsepaginado", response)

//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//         return null; // Para manejar errores sin romper el código
//     }
// };

// export const getCourseById = async (id) => {
//     try {
//         const response = await fetch(`${API_URL}/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
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

// Función para agregar un nuevo curso
export const addCourse = async (course) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(course),
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

// Función para actualizar un curso existente
export const updateCourse = async (id, updatedCourse) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCourse),
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

// Función para eliminar un curso
export const deleteCourse = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

// const loadCourses = async (page, pageSize, level) => {
//     const courseContainer = document.getElementById('course-container');
//     const paginationContainer = document.getElementById('pagination-container');

//     const data = await pagedCourse(page, pageSize, level); // Añadir 'level' a la llamada de la API

//     if (data) {
//         courseContainer.innerHTML = ''; // Limpiar el contenedor de cursos
//         data.courses.forEach(course => {
//             const courseElement = document.createElement('div');
//             courseElement.className = 'course';

//              // Si la URL es undefined, mostrar un mensaje en lugar de un enlace
//             const url = course.URL ? `<a href="${course.URL}" target="_blank">Ir al curso</a>` : "<p>URL no disponible</p>";


//             courseElement.innerHTML = `
//                 <h2>${course.name}</h2>
//                 <p>${course.description}</p>
//                 <a href="${course.URL}" target="_blank">Ir al curso</a> 
            
//             `;
//             courseContainer.appendChild(courseElement);
//         });

//         paginationContainer.innerHTML = ''; // Limpiar la paginación

//         for (let i = 1; i <= data.totalPages; i++) {
//             const pageButton = document.createElement('button');
//             pageButton.innerText = i;
//             pageButton.onclick = () => loadCourses(i, pageSize, level); // Añadir el nivel seleccionado

//             if (i === page) {
//                 pageButton.disabled = true;
//             }

//             paginationContainer.appendChild(pageButton);
//         }
//     } else {
//         courseContainer.innerHTML = '<p>No se pudieron cargar los cursos.</p>';
//     }
// };

// // Llamar a la función pasando el nivel seleccionado
// document.getElementById('search-btn').addEventListener('click', () => {
//     const selectedLevel = document.getElementById('course-level').value;
//     loadCourses(1, 10, selectedLevel); // Recargar cursos con el nivel seleccionado
// });


const loadCourses = async (page, pageSize, level) => {
    const courseContainer = document.getElementById('course-container');
    const paginationContainer = document.getElementById('pagination-container');

    const data = await pagedCourse(page, pageSize, level);

    if (data) {
        courseContainer.innerHTML = ''; // Limpiar el contenedor de cursos
        data.courses.forEach(course => { // Asegúrate de que 'courses' coincide con la respuesta del backend
            const courseElement = document.createElement('div');
            courseElement.className = 'course';

            // Si la URL es undefined, mostrar un mensaje en lugar de un enlace
            const url = course.url ? `<a href="${course.url}" target="_blank">Ir al curso</a>` : "<p>URL no disponible</p>";

            courseElement.innerHTML = `
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                ${url}
            `;
            courseContainer.appendChild(courseElement);
        });

        paginationContainer.innerHTML = ''; // Limpiar la paginación

        for (let i = 1; i <= Math.ceil(data.totalRecords / pageSize); i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.onclick = () => loadCourses(i, pageSize, level);

            if (i === page) {
                pageButton.disabled = true;
            }

            paginationContainer.appendChild(pageButton);
        }
    } else {
        courseContainer.innerHTML = '<p>No se pudieron cargar los cursos.</p>';
    }
};

// Llamar a la función pasando el nivel seleccionado
document.getElementById('search-btn').addEventListener('click', () => {
    const selectedLevel = document.getElementById('course-level').value;
    loadCourses(1, 10, selectedLevel); // Recargar cursos con el nivel seleccionado
});








// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9ycy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiNCIsImV4cCI6MTczOTA1MTc2NiwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.iBGA7erHDA0FwqTZTTXqKouaGryxeoayEgxoK5JSwXA';

// const API_URL = 'http://localhost:5296/api/Course'; // Ajusta la URL según tu API

// export const pagedCourse = async (page, pageSize, level= "") => {
//     try {
//         const response = await fetch(`${API_URL}/paginado?page=${page}&pageSize=${pageSize}&level=${level}`, {
//             method: 'GET',
           
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

// export const getCourseById = async (id) => {
//     try {
//         const response = await fetch(`${API_URL}/${id}`, {
//             method: 'GET',
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

// // Función para agregar un nuevo curso
// export const addCourse = async (course) => {
//      try {
//          const response = await fetch(`${API_URL}`, {
//              method: 'POST',
//              headers: {
//                  'Content-Type': 'application/json',
//                  'Authorization': `Bearer ${token}`
//              },
//              body: JSON.stringify(course)
//          });

//          if (!response.ok) {
//              throw new Error(`Error en la solicitud: ${response.status}`);
//          }

//          return await response.json();
//      } catch (error) {
//          console.error('Error:', error);
//          return null; // Para manejar errores sin romper el código
//      }
//  };

// //  Función para actualizar un curso existente
//  export const updateCourse = async (id, updatedCourse) => {
//     try {
//          const response = await fetch(`${API_URL}/${id}`, {
//              method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                  'Authorization': `Bearer ${token}`
//              },
//             body: JSON.stringify(updatedCourse)
//         });

//          if (!response.ok) {
//              throw new Error(`Error en la solicitud: ${response.status}`);
//         }

//          return await response.json();
//      } catch (error) {
//          console.error('Error:', error);
//          return null; // Para manejar errores sin romper el código
//      }
//  };

// //  Función para eliminar un curso
//  export const deleteCourse = async (id) => {
//      try {
//          const response = await fetch(`${API_URL}/${id}`, {
//              method: 'DELETE',
//              headers: {
//                  'Content-Type': 'application/json',
//                  'Authorization': `Bearer ${token}`
//              }
//          });

//         if (!response.ok) {
//              throw new Error(`Error en la solicitud: ${response.status}`);
//          }

//         return await response.json();
//      } catch (error) {
//          console.error('Error:', error);
//          return null; // Para manejar errores sin romper el código
//      }
//  };



// const loadCourses = async (page, pageSize, level) => {
//     const courseContainer = document.getElementById('course-container');
//     const paginationContainer = document.getElementById('pagination-container');

//     const data = await pagedCourse(page, pageSize, level); // Añadir 'level' a la llamada de la API


//     // Comprobación si los datos fueron recibidos correctamente
//     if (data) {
//         courseContainer.innerHTML = ''; // Limpiar el contenedor de cursos
//         data.courses.forEach(course => {
//             // Crear un nuevo div para cada curso
//             const courseElement = document.createElement('div');
//             courseElement.className = 'course';
//             courseElement.innerHTML = `
//                 <h2>${course.name}</h2>
//                 <p>${course.description}</p>
//             `;
//             // Añadirlo al contenedor
//             courseContainer.appendChild(courseElement);
//         });

//         paginationContainer.innerHTML = ''; // Limpiar la paginación

//         // Crear los botones de paginación
//         for (let i = 1; i <= data.totalPages; i++) {
//             const pageButton = document.createElement('button');
//             pageButton.innerText = i;
//             pageButton.onclick = () => loadCourses(i, pageSize);

//             // Deshabilitar el botón si es la página actual
//             if (i === page) {
//                 pageButton.disabled = true;
//             }

//             paginationContainer.appendChild(pageButton);
//         }
//     } else {
//         // Mostrar mensaje si no se pueden cargar los cursos
//         courseContainer.innerHTML = '<p>No se pudieron cargar los cursos.</p>';
//     }
// };

// // Llamar a la función pasando el nivel seleccionado
// document.getElementById('search-btn').addEventListener('click', () => {
//     const selectedLevel = document.getElementById('course-level').value;
//     loadCourses(1, 10, selectedLevel); // Recargar cursos con el nivel seleccionado
// });





// esta bien pero quiero probar otro Función para cargar cursos y paginación
//  const loadCourses = async (page, pageSize) => {
//      const courseContainer = document.getElementById('course-container');
//      const paginationContainer = document.getElementById('pagination-container');

//      const data = await pagedCourse(page, pageSize);
//      if (data) {
//          courseContainer.innerHTML = '';
//          data.courses.forEach(course => {
//              const courseElement = document.createElement('div');
//              courseElement.className = 'course';
//              courseElement.innerHTML = `<h2>${course.name}</h2><p>${course.description}</p>`;
//              courseContainer.appendChild(courseElement);
//          });

//          paginationContainer.innerHTML = '';
//          for (let i = 1; i <= data.totalPages; i++) {
//              const pageButton = document.createElement('button');
//              pageButton.innerText = i;
//              pageButton.onclick = () => loadCourses(i, pageSize);
//              paginationContainer.appendChild(pageButton);
//          }
//      } else {
//          courseContainer.innerHTML = '<p>No se pudieron cargar los cursos.</p>';
//      }
//  };

 
//  loadCourses(1, 10);