import { pagedUser } from "../services/user.js";

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todos los botones con la clase 'agregar'
    const addFriendButtons = document.querySelectorAll(".agregar");

    addFriendButtons.forEach(button => {
        button.addEventListener("click", async () => {
            alert("Amigo agregado");

            try {
                const users = await pagedUser(1, 10);
                console.log(users);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        });
    });
});
