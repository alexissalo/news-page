const noticiasContainer = document.querySelector(".noticias-container");

//fetch de las noticias

function getNoticias(){

  const myHeaders=getHeaders()

  const requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	};
  fetch("http://localhost:3000/noticias",requestOptions)
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
            <div class="noticia-card">
                <div class="img-container">
                  <img src=${noticia.img}>
                </div>
                <div class="info-container">
                  <a href="./pages/detalleArticulo.html?id=${noticia.id}">
                    <h2>${noticia.titulo}</h2>
                  </a>
                  <p>${noticia.descripcion}</p>
                  <span>${noticia.categoria}</span>
                </div>
            </div>
        `;

    noticiasContainer.innerHTML += cardNoticia;
  });
}


function getHeaders() {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	return myHeaders;	
}