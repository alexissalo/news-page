const noticiasContainer = document.querySelector(".noticias-container");
const categoriaRef = document.querySelector(".categoria-ref");

//fetch de noticias

function getNoticias(){
  const myHeaders=getHeaders()

  const requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	};
  const urlParams = new URLSearchParams(window.location.search);
    //obtengo el valor del parametro categoria
  const categoria = urlParams.get("categoria");
  categoriaRef.textContent = categoria;
  fetch(`http://localhost:3000/noticias/${categoria}`,requestOptions)
  .then((response) => response.json())
  .then((noticias) => {
    console.log(noticias);
    renderNoticias(noticias);
  });
}

getNoticias()


//render de noticias

function renderNoticias(noticias) {
  noticiasContainer.innerHTML = "";
  noticias.forEach((noticia, index) => {
    let cardNoticia = `
            <article class="noticia-card">
                <div class="img-container">
                  <img src=${noticia.img}>
                </div>
                <div class="info-container">
                  <a href="./detalleArticulo.html?id=${noticia.id}">
                    <h2>${noticia.titulo}</h2>
                  </a>
                  <p>${noticia.descripcion}</p>
                  <span>${noticia.categoria}</span>
                </div>
            </article>
        `;

    noticiasContainer.innerHTML += cardNoticia;
  });
}

function getHeaders() {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	return myHeaders;	
}