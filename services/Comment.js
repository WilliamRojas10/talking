import { enviroment } from "./enviroment.js";
const BASE_API_URL = enviroment.url + '/Comment';

// const BASE_API_URL = 'http://localhost:5296/api/Comment';
function getToken() {
  const token = localStorage.getItem("token"); 
  if (!token) {
      console.error("No hay token disponible. getToken()");
      return;
  }
  return token
}

async function getCommentsPaged(idPost, page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}&idPost=${idPost}`;
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
