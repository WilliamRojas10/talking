import { enviroment } from "./enviroment.js";
const BASE_API_URL = enviroment.url + '/Login';


export async function login(loginData) {
    try {
        const response = await fetch(BASE_API_URL, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const responseDTO = await response.json();

        if (response.ok) {
            // Save the token in localStorage
            localStorage.setItem("token", responseDTO.data.token);
            console.log("LOGIN: token -> ", responseDTO.data.token);
            alert(responseDTO.message);
            window.location.href = "index.html"; 
            console.log(responseDTO)
        } else {
            console.log(responseDTO)

            alert("Error: " + (responseDTO.message || "Credenciales incorrectas"));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al intentar iniciar sesión.");
    }
}