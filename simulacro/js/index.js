const URL_noticias = "http://localhost:3000/news";
const contenedor = document.querySelector("main");

async function pintarInfoNoticias() {
    const respuesta = await fetch(URL_noticias);
    const datos = await respuesta.json();
    contenedor.innerHTML = "";
    datos.forEach((infoNoticias) => {
      contenedor.innerHTML += `
        <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
                <div class="col-md-4">
                <img
                    src="${infoNoticias.Imagen}"
                    class="img-fluid rounded-start"
                    alt="..."
                />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${infoNoticias.Nombre}</h5>
                    <p class="card-text">
                    ${infoNoticias.Descripcion}
                    </p>
                    <p class="card-text">
                    ${infoNoticias.NombreAutor}
                    </p>
                    <p class="card-text">
                    ${infoNoticias.Fecha}
                    </p>
                    <p class="card-text">
                    <small class="text-body-secondary">${infoNoticias.Categoria}</small>
                    </p>
                </div>
                </div>
            </div>
        </div>
      `;
    });
  }

pintarInfoNoticias();