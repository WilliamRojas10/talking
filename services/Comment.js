// Base URL de la API (ajusta el puerto si es necesario)
const BASE_API_URL = 'http://localhost:5296/api/Comment';

// (Opcional) Si manejas autenticación con token JWT, almacénalo aquí o recupéralo de localStorage
let authToken = ''; // Ejemplo: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

function getToken() {
  const token = localStorage.getItem("token"); 
  if (!token) {
      console.error("No hay token disponible. getToken()");
      return;
  }
  return token
}


/* ====================================================
   GET: Obtener Comments paginados
==================================================== */
// http://localhost:5296/api/Comment/paginado?page=1&pageSize=10&idPost=1
async function getCommentsPaged(idPost, page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}&idPost=${idPost}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) { 
      throw new Error(`Error obteniendo comments: ${response.status}`);
    }
    const data = await response.json()
    console.log("Response list comment: ",data)
    return data

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   GET: Obtener un comment por ID
==================================================== */
async function getCommentById(commentId) {
  const url = `${BASE_API_URL}/${commentId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getToken()
    });
    if (!response.ok) {
      throw new Error(`Error obteniendo el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Actualizar un comment (modificar)
==================================================== */
async function updateComment(commentId, commentData) {
  const url = `${BASE_API_URL}/modificar/${commentId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getToken(),
      body: JSON.stringify(commentData)
    });
    if (!response.ok) {
      throw new Error(`Error actualizando el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Bloquear un comment
==================================================== */
async function blockComment(commentId) {
  const url = `${BASE_API_URL}/bloquear/${commentId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getToken()
    });
    if (!response.ok) {
      throw new Error(`Error bloqueando el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Activar un comment
==================================================== */
async function activateComment(commentId) {
  const url = `${BASE_API_URL}/activar/${commentId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getToken()
    });
    if (!response.ok) {
      throw new Error(`Error activando el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   PUT: Eliminar un comment
==================================================== */
async function deleteComment(commentId) {
  const url = `${BASE_API_URL}/eliminar/${commentId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getToken()
    });
    if (!response.ok) {
      throw new Error(`Error eliminando el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   comment: Crear un comment (con envío de archivo usando FormData)
   
   Se espera que el parámetro "formData" sea un objeto FormData que
   incluya, por ejemplo:
     - description: string
     - FileDTO.image: File  (campo "image" dentro del objeto FileDTO)
==================================================== */
async function createComment(idPost, text) {
  const url = `${BASE_API_URL}`;
  try {
    // No agregamos 'Content-Type' ya que fetch se encargará de establecerlo para FormData
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        idPost,
        text 
      })
    });
    if (!response.ok) {
      throw new Error(`Error creando el comment: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ====================================================
   comment: Upload comment (otra ruta para subir comment, si es distinta)
==================================================== */
async function uploadComment(formData) {
  const url = `${BASE_API_URL}/upload-comment`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Error subiendo el comment: ${response.status}`);
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
  getCommentsPaged,
  getCommentById,
  updateComment,
  blockComment,
  activateComment,
  deleteComment,
  createComment,
  uploadComment
};
