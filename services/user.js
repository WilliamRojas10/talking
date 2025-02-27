import { enviroment } from "./enviroment.js";
const BASE_API_URL = enviroment.url + '/User';


function getToken() {
  const token = localStorage.getItem("token"); 
  if (!token) {
      console.error("No hay token disponible. getToken()");
      return;
  }
  return token
}
async function getUsersPaged (page, pageSize) {
    try {
        const response = await fetch(`${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}`, {
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
}

async function getMyUserByLogin () {
        try {
            const response = await fetch(`${BASE_API_URL}/obtener-mi-usuario`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            const data = await response.json();
            // console.log("Datos por usuario: ", data);
            if (!data.success) {
                throw new Error(`Error: ${response.message}`);
            }
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null; 
        }
};

async function updateUser(userId, userData) {
  const url = `${BASE_API_URL}/modificar/${userId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getToken(),
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error(`Error actualizando el user: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function deletePost(postId) {
//   const url = `${BASE_API_URL}/eliminar/${postId}`;
//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: getToken()
//     });
//     if (!response.ok) {
//       throw new Error(`Error eliminando el post: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


async function createUser(data) {
  const url = `${BASE_API_URL}`;
  try {
    // No agregamos 'Content-Type' ya que fetch se encargará de establecerlo para FormData
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que se envía JSON
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error creando el usuario: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function uploadPost(formData) {
//   const url = `${BASE_API_URL}/upload-post`;
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: formData
//     });
//     if (!response.ok) {
//       throw new Error(`Error subiendo el post: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export {
  getUsersPaged,
  updateUser,
  createUser,
  getMyUserByLogin
};
