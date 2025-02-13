import { login } from "../../services/Login.js";

document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordInput = document.getElementById("password");
    let icon = this.querySelector("i");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".loginForm");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = {
            email: email,
            password: password
        };
        try {
             await login(loginData);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectarse con el servidor');
        }
    });
});





