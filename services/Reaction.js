import { enviroment } from "./enviroment.js";
const BASE_API_URL = enviroment.url + '/Reaction';
//const BASE_API_URL = 'http://localhost:5296/api/Reaction';

function getToken() {
  const token = localStorage.getItem("token"); 
  if (!token) {
      console.error("No hay token disponible. getToken()");
      return;
  }
  return token
}

// async function getReactionsByPost(idPost) {
//   console.log("idPost", idPost);
//   // Se usa el query string en lugar del path para enviar el parámetro
//   const url = `${BASE_API_URL}/reactionsByIdPost?idPost=${idPost}`;
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       // headers: getToken() // Descomenta y configura si es necesario
//     });

//     if (!response.ok) {
//       throw new Error(`Error obteniendo las reacciones: ${response.status}`);
//     }

//     // Leer la respuesta como texto para comprobar si está vacía
//     const text = await response.text();
//     if (!text) {
//       // Si la respuesta está vacía, devolvemos un objeto con valores por defecto
//       return { likes: 0, dislikes: 0 };
//     }

//     // Parsear el texto a JSON
//     const data = JSON.parse(text);
//     console.log("RESPONSE DE REACCIONES EN SERVICES", data);
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }

// }


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


export {
  // getReactionsByPost,
  updatePost,
  deletePost,
  createReaction,
};
