const noticiaDetalleContainer = document.querySelector(".noticia-container");
const urlParams = new URLSearchParams(window.location.search);
//obtengo el valor del parametro categoria
const id = urlParams.get("id");
//fetch de noticias

function getNoticia() {
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`http://localhost:3000/noticia/${id}`, requestOptions)
    .then((response) => response.json())
    .then((noticia) => {
      console.log(noticia);
      renderNoticiaDetail(noticia);
    });
}

getNoticia();

function getNoticiasRelacionadas() {
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`http://localhost:3000/noticiasRelacionadas/${id}`, requestOptions)
    .then((response) => response.json())
    .then((noticias) => {
      console.log(noticias);
      renderNoticiasRelacionadas(noticias);
    });
}

getNoticiasRelacionadas();

function getComentarios() {
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`http://localhost:3000/comentarios/${id}`, requestOptions)
    .then((response) => response.json())
    .then((noticia) => {
      console.log(noticia);
      renderComentarios(noticia)
    });
}

getComentarios();

//render de noticia seleccionada

function renderNoticiaDetail(noticia) {
  if (noticia) {
    noticia.map((e) => {
      noticiaDetalleContainer.innerHTML += `
            <div class="noticia-detail-card">
                <img src=${e.img}>
                <h2>${e.titulo}</h2>
                <p class="descripcion">${e.descripcion}</p>
                <p class="categoria">${e.categoria}</p>
                <p>${e.contenido}</p>
            </div>
        `;
    });
  } else {
    noticiaDetalleContainer.innerHTML = `<p>Noticia no encontrada</p>`;
  }
}

//render de noticias relacionadas

function renderNoticiasRelacionadas(noticias) {
  const noticiasRelacionadas = document.querySelector(
    ".noticias-relacionadas .noticias"
  );
  if (noticias) {
    noticiasRelacionadas.innerHTML = "";
    noticias.forEach((noticia, index) => {
      let cardNoticia = `
            <a href="./detalleArticulo.html?id=${noticia.id}">
              <article class="card-noticia-relacionada">
                  <div class="imagen">
                    <img src=${noticia.img}>
                  </div>
                  <div class="texto">
                    <p>${noticia.titulo}</p>
                  </div>
              </article>
            </a>
          `;

      noticiasRelacionadas.innerHTML += cardNoticia;
    });
  } else {
    noticiasRelacionadas.innerHTML += `<span>Noticias no encontradas</span>`;
  }
}

function renderComentarios(comentarios) {
  const comentariosContainer= document.querySelector(".comentarios-container")
  if (comentarios) {
    comentariosContainer.innerHTML = "";
    comentarios.forEach((comentario, index) => {
      let cardComentario = `
              <div class="comentario-tarjeta">
                <div class="header">
                    <h3>${comentario.nombre}</h3>
                    <p>${comentario.fecha_formateada}</p>
                </div>
                  <p>${comentario.comentario}</p>
              </div>
          `;

      comentariosContainer.innerHTML += cardComentario;
    });
  } else {
    comentariosContainer.innerHTML += `<span>No hay comentarios</span>`;
  }
}


function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}
