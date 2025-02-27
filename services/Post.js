import { enviroment } from "./enviroment.js";
const BASE_API_URL = enviroment.url + '/Post';
// const BASE_API_URL = 'http://localhost:5296/api/Post';

function getToken() {
  const token = localStorage.getItem("token"); 
  if (!token) {
      console.error("No hay token disponible. getToken()");
      return;
  }
  return token
}
// http://localhost:5296/api/Post/paginado?page=1&pageSize=10&orden=desc

async function getPostsPaged(page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/paginado?page=${page}&pageSize=${pageSize}&orden=desc`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json()
    if (!data.success) {
      // throw new Error(`Error obteniendo posts: ${response.status}`);
      console.error(data.message)
    }  
    return data

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPostById(postId) {
  const url = `${BASE_API_URL}/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getToken()
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

async function deletePost(postId) {
  const url = `${BASE_API_URL}/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${getToken()}`
      }
    });
    const data = await response.json()
    if (!data.success) {
      // throw new Error(`${response.message}`);
      console.error(data.message)
      alert(data.message)
    }
    else {
      alert(data.message)
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// export async function deletePost(postId) {
//   try {
//       const response = await fetch(`http://localhost:5296/api/posts/${postId}`, {
//           method: "DELETE",
//           headers: {
//               "Content-Type": "application/json"
//               // Si usas un token, asegúrate de que esté definido y sea string:
//               // "Authorization": `Bearer ${token}`
//           }
//       });
//       return await response.json();
//   } catch (error) {
//       console.error("Error en la eliminación:", error);
//       return { success: false, message: "Error en la solicitud" };
//   }
// }


async function createPost(formData) {
  const url = `${BASE_API_URL}`;
  try {
    // No agregamos 'Content-Type' ya que fetch se encargará de establecerlo para FormData
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData,
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


async function getMyPostsPaged(page = 1, pageSize = 10) {
  const url = `${BASE_API_URL}/obtener-mis-posteos?page=${page}&pageSize=${pageSize}&orden=desc`;
  // console.log("url de post: ",url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
    });
    const data = await response.json()
    if (!data.success) {
      console.error(data.message)
      // alert(data.message)
      // throw new Error(`Error obteniendo posts: ${response.status}`);
    }
    return data

  } catch (error) {
    console.error(error);
    throw error;
  }
}



export {
  getPostsPaged,
  getMyPostsPaged,
  getPostById,
  updatePost,
  deletePost,
  createPost,
  uploadPost
};
