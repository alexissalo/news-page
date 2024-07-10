//funciones para el formulario de contacto

const formContacto = document.querySelector(".form-contacto form");

formContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.querySelector(".nombre").value;
  const email = document.querySelector(".email").value;
  const asunto = document.querySelector(".asunto").value;
  const mensaje = document.querySelector(".mensaje").value;

  if (nombre == "" || email == "" || asunto == "" || mensaje == "") {
    alert("Faltan completar campos");
  } else {
    const myHeaders = getHeaders();

    const contenido = JSON.stringify({
      nombre: nombre,
      asunto: asunto,
      mail: email,
      mensaje: mensaje,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: contenido,
    };

    fetch("http://localhost:3000/enviarMail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
    alert(
      `Mensaje enviado con exito!!\nNombre: ${nombre}\nEmail: ${email}\nAsunto: ${asunto}\nMensaje: ${mensaje}`
    );
  }
});

function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}
