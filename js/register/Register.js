import { createUser } from "../../services/User.js";

const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevenir el envío por defecto del formulario

  // Se crea un objeto FormData a partir del formulario
  const formData = new FormData(form);

  let userDTO = {
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    birthDate: formData.get('birthDate'),
    nationality: formData.get('nationality'),
    province: formData.get('province')
  };
    console.log("FORMULARIO USUARIOº", userDTO);
  try {
    const responseDTO = await createUser(userDTO);
    console.log(responseDTO)

    // const responseDTODTO = await responseDTO.json();

    if (responseDTO.success) {
        alert(responseDTO.message);
        window.location.href = "login.html"; 
        console.log("responseDTO", responseDTO)
    } else {
        console.log(responseDTO)

        alert("Error: " + (responseDTO.message || "Fallo algo al registrarse"));
    }
  } catch (error) {
    
    console.error('Error al crear usuario:', error);
    alert('Error al crear usuario, revisa la consola para más detalles.');
  }
});
