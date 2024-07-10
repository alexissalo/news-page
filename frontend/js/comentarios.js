
function enviarComentario() {
  const myHeaders = getHeaders();
  const urlParams = new URLSearchParams(window.location.search);
  //obtengo el valor del parametro categoria
  const id = urlParams.get("id");
  const nombre = document.querySelector(".form-comentarios .form .nombre");
  const comentario = document.querySelector(".form-comentarios .form .comentario");
  const mensajeComentario= document.querySelector(".mensaje-comentario")

  const nombreValue = nombre.value;
  const comentarioValue = comentario.value;

  console.log(nombreValue);

  if (nombreValue === "" || comentarioValue === "") {
    mensajeComentario.textContent="Falta completar campos"
    return;
  } else {
    const contenido = JSON.stringify({
      nombre: nombreValue,
      comentario: comentarioValue,
      idNoticia: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: contenido,
    };

    fetch("http://localhost:3000/comentarios", requestOptions)
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.error(error));
  }

  location.reload()
}

function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}
