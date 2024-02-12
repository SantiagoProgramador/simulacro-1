// Declaración de variables
const URL = "http://localhost:3000/users";
const correo = document.querySelector("#email");
const contraseña = document.querySelector("#password");
const Formulario_inicioSesion = document.querySelector("#form-login");


//Eventos 
Formulario_inicioSesion.addEventListener("submit",(event)=>{
    event.preventDefault();
    InicioSesion();
})

async function InicioSesion() {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    
    datos.forEach(usuario => {
        if (correo.value === usuario.email && contraseña.value === usuario.password) {
            localStorage.setItem("administrador", usuario.id);
            window.location.href = "administrator.html";
        } else if (correo.value != usuario.email || contraseña.value != usuario.password) {
            alert("Información incorrecta");
            
        }
    });
}

