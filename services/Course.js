import { enviroment } from "./enviroment.js";
const API_URL = enviroment.url + '/Course';

function getToken() {
    const token = localStorage.getItem("token"); 
    if (!token) {
        console.error("No hay token disponible. getToken()");
        return;
    }
    return token
  }

export const pagedCourse = async (page = 1, pageSize = 10, level = "") => {
    try {
        const url = new URL(`${API_URL}/filtrar-paged-level`);
        url.searchParams.append("page", page);
        url.searchParams.append("pageSize", pageSize);
        if (level) url.searchParams.append("level", level); 

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

// http://localhost:5296/api/Course/filtrar-paged-level/Basic?page=1&pageSize=10

export const getCousesPagedFiltered = async(page = 1, pageSize = 10, level ="") => {
  const url = `${API_URL}/filtrar-paged-level/${level}?page=${page}&pageSize=${pageSize}`;
    console.log(url);
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    const data = await response.json()
    if (!data.success) {
      console.error(data.message)
      return data
    }
    return data

  } catch (error) {
    console.error(error);
    throw error;
  }
}


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