//variables para la sección de categorias
const URL_categorias = "http://localhost:3000/categories";
const addCategoria = document.querySelector("#addCategoria");
const formularioCategoria = document.querySelector("#formularioCategoria");
const nombreCategoria = document.querySelector("#nameCategory");
const descripcionCategoria = document.querySelector("#descriptionCategory");
const tablaDeCategorias = document.querySelector("#categorias-tbody");
// Aquí terminan las variables de la sección categoria

//Varibales para la sección de noticias
const URL_noticias = "http://localhost:3000/news";
const addNoticia = document.querySelector("#boton-notice");
const formularioNoticias = document.querySelector("#formularioNoticias");
const nombreNoticias = document.querySelector("#nameNotice");
const imagenNoticias = document.querySelector("#urlImage");
const categoriaNoticias = document.querySelector("#idCategory");
const descripcionNoticias = document.querySelector("#contentNotice");
const nombreAutor = document.querySelector("#authorName");
const fecha = document.querySelector("#date"); 
const tablaDeNoticias = document.querySelector("#noticias-tbody");
//Aquí terminan las variables de la sección de noticias

//eventos
//Evento que llama las dos funciones que pintan la información en la página del administrador
document.addEventListener("DOMContentLoaded", () => {
  pintarInfoCategorias();
  pintarInfoNoticias();
});
//Evento que arregla el formulario de categorias
addCategoria.addEventListener("click",()=>{
  nombreCategoria.value = "";
  descripcionCategoria.value = "";
  formularioCategoria.classList.remove("editar-form");
})
//Evento que arregla el formulario de noticias
addNoticia.addEventListener("click",()=>{
  nombreNoticias.value = "";
  imagenNoticias.value = "";
  categoriaNoticias.value = "";
  descripcionNoticias.value = "";

  formularioNoticias.classList.remove("editar-form");
})

//Categorias
formularioCategoria.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formularioCategoria.classList.contains("editar-form")) {
    editarCategorias(event.target.getAttribute("data-id"));
  } else nuevaCategoria();
});

//Noticias
formularioNoticias.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formularioNoticias.classList.contains("editar-form")) {
    editarNoticias(event.target.getAttribute("data-id"));
  } else nuevaNoticia();
});
//Aqui terminan los eventos

//Sección de categorias
async function nuevaCategoria() {
  const agregarCategoria = {
    Nombre: nombreCategoria.value,
    Descripcion: descripcionCategoria.value,
  };

  await fetch(URL_categorias, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agregarCategoria),
  });

  // localStorage.setItem("Categorias", JSON.stringify(agregarCategoria));
}
//Función que crea el contenido de la tabla de categorias, adicional envia el tipo de categoria al carrusel de seleccion del formulario de noticias
async function pintarInfoCategorias() {
  const respuesta = await fetch(URL_categorias);
  const datos = await respuesta.json();
  tablaDeCategorias.innerHTML = "";
  datos.forEach((infoCategorias, index) => {
    tablaDeCategorias.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${infoCategorias.Nombre}</td>
        <td>${infoCategorias.Descripcion}</td>
        <td>
          <button data-id="${infoCategorias.id}" class="btn btn-primary" onclick="btnEditar('${
            infoCategorias.id
          }')" data-bs-toggle="modal"
          data-bs-target="#modal-category">Edit</button>
          <button class="btn btn-danger" onclick="eliminarCategoria('${
            infoCategorias.id
          }')">Delete</button>
        </td>
      </tr>`;
    categoriaNoticias.innerHTML += `
      <option value="${infoCategorias.Nombre}">
        ${infoCategorias.Nombre}
      </option>;`;
  });
}

//Funciones que editan y eliminan el contenido de la tabla de categorias
//Esta función cambia la función del formulario
async function btnEditar(id){
  formularioCategoria.classList.add("editar-form");
  formularioCategoria.setAttribute("data-id",id);
  const respuesta = await fetch(`${URL_categorias}/${id}`);
  const datos = await respuesta.json();

  nombreCategoria.value = datos.Nombre;
  descripcionCategoria.value = datos.Descripcion;
}

async function editarCategorias(id){
  const categoriaEditada = {
    Nombre: nombreCategoria.value,
    Descripcion: descripcionCategoria.value
  }
  
  await fetch(`${URL_categorias}/${id}`,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoriaEditada)
  })

}

async function eliminarCategoria(id){
  await fetch(`${URL_categorias}/${id}`,{
    method:"DELETE"
  })
}
// Aquí termina la sección de categorias
//
//

//Sección de noticias
async function nuevaNoticia() {
  const agregarNoticia = {
    Nombre: nombreNoticias.value,
    Imagen: imagenNoticias.value,
    Categoria: categoriaNoticias.value,
    Descripcion: descripcionNoticias.value,
    NombreAutor: nombreAutor.value,
    Fecha: fecha.value
  };

  await fetch(URL_noticias, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agregarNoticia),
  });
  // localStorage.setItem("Noticias", JSON.stringify(agregarNoticia));
}

//Función que crea el contenido en la tabla de noticias
async function pintarInfoNoticias() {
  const respuesta = await fetch(URL_noticias);
  const datos = await respuesta.json();
  tablaDeNoticias.innerHTML = "";
  datos.forEach((infoNoticias) => {
    tablaDeNoticias.innerHTML += `
      <tr>
          <td>
            <img
              src="${infoNoticias.Imagen}"
              alt="photo"
              height="50"
              width="50"
              class="rounded-circle"
            />
          </td>
          <td>${infoNoticias.Nombre}</td>
          <td>${infoNoticias.Descripcion}</td>
          <td>${infoNoticias.Fecha}</td>
          <td>${infoNoticias.NombreAutor}</td>
          <td>${infoNoticias.Categoria}</td>
          <td>
            <button class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-notice" onclick="btnEditarNoticia('${infoNoticias.id}')">Edit</button>
            <button class="btn btn-danger" onclick="eliminarNoticias('${
              infoNoticias.id
            }')">Delete</button>
          </td>
        </tr>
    `;
  });
}

//Funciones que editan y eliminan el contenido de la tabla de noticias
async function btnEditarNoticia(id){
  formularioNoticias.classList.add("editar-form");
  formularioNoticias.setAttribute("data-id",id);
  const respuesta = await fetch(`${URL_noticias}/${id}`);
  const datos = await respuesta.json();

  nombreNoticias.value = datos.Nombre;
  imagenNoticias.value = datos.Imagen;
  categoriaNoticias.value = datos.Categoria;
  descripcionNoticias.value = datos.Descripcion;

}

async function editarNoticias(id){
  const noticiaEditada = {
    Nombre: nombreNoticias.value,
    Imagen: imagenNoticias.value,
    Categoria: categoriaNoticias.value,
    Descripcion: descripcionNoticias.value,
    NombreAutor: nombreAutor.value,
    Fecha: fecha.value
  }
  
  await fetch(`${URL_noticias}/${id}`,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noticiaEditada)
  })

}

async function eliminarNoticias(id){
  await fetch(`${URL_noticias}/${id}`,{
    method:"DELETE"
  })
}
