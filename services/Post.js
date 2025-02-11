// Base URL de la API (ajusta el puerto si es necesario)
const BASE_API_URL = 'http://localhost:5296/api/Post';

// (Opcional) Si manejas autenticación con token JWT, almacénalo aquí o recupéralo de localStorage
let authToken = ''; // Ejemplo: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Función para obtener encabezados comunes para peticiones JSON
function getJsonHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (authToken) {
    headers['Authorization'] = authToken;
  }
  return headers;
}

// Función para obtener encabezados sin "Content-Type" (para FormData)
function getAuthHeaders() {
  const headers = {};
  if (authToken) {
    headers['Authorization'] = authToken;
  }
  return headers;
}

/* ====================================================
   GET: Obtener posts paginados
==================================================== */
async function getPosts(page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error obteniendo posts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   GET: Obtener un post por ID
==================================================== */
async function getPostById(postId) {
  const url = `${BASE_API_URL}/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error obteniendo el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Actualizar un post (modificar)
==================================================== */
async function updatePost(postId, postData) {
  const url = `${BASE_API_URL}/modificar/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getJsonHeaders(),
      body: JSON.stringify(postData)
    });
    if (!response.ok) {
      throw new Error(`Error actualizando el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Bloquear un post
==================================================== */
async function blockPost(postId) {
  const url = `${BASE_API_URL}/bloquear/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error bloqueando el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Activar un post
==================================================== */
async function activatePost(postId) {
  const url = `${BASE_API_URL}/activar/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error activando el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Eliminar un post
==================================================== */
async function deletePost(postId) {
  const url = `${BASE_API_URL}/eliminar/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getJsonHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error eliminando el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   POST: Crear un post (con envío de archivo usando FormData)
   
   Se espera que el parámetro "formData" sea un objeto FormData que
   incluya, por ejemplo:
     - description: string
     - FileDTO.image: File  (campo "image" dentro del objeto FileDTO)
==================================================== */
async function createPost(formData) {
  const url = `${BASE_API_URL}`;
  try {
    // No agregamos 'Content-Type' ya que fetch se encargará de establecerlo para FormData
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Error creando el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   POST: Upload post (otra ruta para subir post, si es distinta)
==================================================== */
async function uploadPost(formData) {
  const url = `${BASE_API_URL}/upload-post`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Error subiendo el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   Exportar funciones para su uso en otros scripts
==================================================== */
export {
  getPosts,
  getPostById,
  updatePost,
  blockPost,
  activatePost,
  deletePost,
  createPost,
  uploadPost
};
