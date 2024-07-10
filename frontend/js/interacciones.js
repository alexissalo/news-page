const accordionHeaders = document.querySelectorAll(".accordion-header");
const fecha = document.querySelector(".fecha");
const mensaje = document.querySelector(".mensaje")

//funcion para obtener la fecha actual
function getFecha() {
  let fechaDato = new Date();
  const configuracion = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  fecha.textContent = fechaDato.toLocaleDateString("es-ES", configuracion);
}

getFecha();

//funciones para los accordion de la seccion Quienes somos

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const contenido = header.nextElementSibling;
    const isVisible = contenido.classList.contains("show");

    document.querySelectorAll(".accordion-content").forEach((contenido) => {
      contenido.classList.remove("show");
    });

    if (!isVisible) {
      contenido.classList.add("show");
    }
  });
});

//menu hamburguesa

const menuHamburguesa = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

menuHamburguesa.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  if (navLinks.classList == "nav-links open") {
    menuHamburguesa.innerHTML = `<i class="bi bi-x-lg"></i>`;
  } else {
    menuHamburguesa.innerHTML = `<i class="bi bi-list"></i>`;
  }
});

function buscador() {
  const buscadorInput = document.querySelector(".buscador input");
  const titulo = buscadorInput.value;
  console.log(titulo);
  const myHeaders = getHeaders();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`http://localhost:3000/buscador?q=${titulo}`, requestOptions)
    .then((response) => response.json())
    .then((noticias) => {
      console.log(noticias);
      const resultadosContainer = document.querySelector(".overlay .results");
      resultadosContainer.innerHTML = "";
      if (noticias.length > 0) {
        noticias.forEach((item) => {
          let cardResult = `
                <div class="result-item">
                    <a onclick="redireccionarAlArticulo(${item.id})"><h3>${item.titulo}</h3></a>
                    <p>${item.descripcion}</p>
                    <span>${item.categoria}</span>
                </div>
            `;

          resultadosContainer.innerHTML += cardResult;
        });
      } else {
        resultadosContainer.textContent = "No se encontraron resultados";
      }
      const overlay = document.querySelector(".overlay");
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    })
    .catch((error) => {
      console.error("Error al realizar la búsqueda:", error);
    });
}

function cerrarOverlay() {
  document.querySelector(".overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

function redireccionarAlArticulo(id) {
  const url = window.location;
  if (url.href.includes("index.html")) {
    window.location.href = `./pages/detalleArticulo.html?id=${id}`;
  } else {
    window.location.href = `./detalleArticulo.html?id=${id}`;
  }
}

function abrirSubscripcion() {
  const overlaySubscripcion = document.querySelector(".overlay-subscripcion");
  overlaySubscripcion.style.display = "flex";
}

function cerrarSubscripcion() {
  document.querySelector(".overlay-subscripcion").style.display = "none";
}

function subscribirse() {
  const email = document.querySelector(".subscripcion input").value;

  if (email == "") {
    mensaje.textContent = "Introduce un email";
  } else {
    const myHeaders = getHeaders();

    const contenido = JSON.stringify({
      email: email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: contenido,
    };

    fetch("http://localhost:3000/subscripcion", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          mensaje.textContent=result.error
        }else{
          mensaje.textContent="Enviado"
        }
      })
      .catch((error) => console.error(error));
  }
}

function anularSubscripcion() {
  const email = document.querySelector(".subscripcion input").value;

  if (email == "") {
    mensaje.textContent = "Introduce un email";
  } else {
    mensaje.textContent = "Enviado";
    const myHeaders = getHeaders();

    const contenido = JSON.stringify({
      email: email,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: contenido,
    };

    fetch("http://localhost:3000/subscripcion", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  }
}

function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}
