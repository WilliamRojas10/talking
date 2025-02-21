// Base URL de la API (ajusta el puerto si es necesario)
const BASE_API_URL = 'http://localhost:5296/api/Reaction';

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
   GET: Obtener posts paginados
==================================================== */
async function getPostsPaged(page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
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
async function getReactionsByPost(idPost) {
  console.log("idPost", idPost);
  // Se usa el query string en lugar del path para enviar el parámetro
  const url = `${BASE_API_URL}/reactionsByIdPost?idPost=${idPost}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      // headers: getToken() // Descomenta y configura si es necesario
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo las reacciones: ${response.status}`);
    }

    // Leer la respuesta como texto para comprobar si está vacía
    const text = await response.text();
    if (!text) {
      // Si la respuesta está vacía, devolvemos un objeto con valores por defecto
      return { likes: 0, dislikes: 0 };
    }

    // Parsear el texto a JSON
    const data = JSON.parse(text);
    console.log("RESPONSE DE REACCIONES EN SERVICES", data);
    return data;
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
      headers: getToken(),
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
      headers: getToken()
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
      headers: getToken()
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
      headers: getToken()
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
async function createReaction(idPost, idReaction) {
  const url = `${BASE_API_URL}`;
  try {
    // No agregamos 'Content-Type' ya que fetch se encargará de establecerlo para FormData
    console.log(idPost, "---" ,idReaction)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        idPost,
        idReaction // Ejemplo: 1 = Like, 2 = Dislike
      })
    });
    // if (!response.success) {
    //   throw new Error(`Error creando una reaction: ${response.status}`);
    // }
    // console.log("EN response EN REACTION SERVICE", response)
    return response.json();
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
  getPostsPaged,
  getReactionsByPost,
  updatePost,
  blockPost,
  activatePost,
  deletePost,
  createReaction,
  uploadPost
};
