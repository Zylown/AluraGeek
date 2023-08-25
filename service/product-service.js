<<<<<<< Updated upstream
const crearNuevaLinea = (imagen, producto, precio) => {
  const linea = document.createElement("li");
  const contenido = `
    <a href="#">
      <img
        src="${imagen}"
        alt="Producto"
        class="image--producto"
      />
    </a>
    <h3>${producto}</h3>
    <h4>$ ${precio}</h4>
    <a href="#">Ver producto</a>
  `;
  linea.innerHTML = contenido;
  return linea;
};

const ul = document.querySelector("[data-ul]");

const listaProductos = () => {
  const promise = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:3000/producto"); //peticion
    http.send(); //hacemos el envio de la petición
    http.onload = () => {
      const responses = JSON.parse(http.response); //convertir la respuesta
      //para obtener un objeto y su codigo de status
      if (http.status >= 400) {
        // si es > de 400 sabemos que hubo un error
        reject(responses);
      } else {
        resolve(responses);
      }
    };
  });
  return promise;
};
listaProductos()
  .then((data) => {
    data.forEach((elemento) => {
      const nuevaLinea = crearNuevaLinea(
        elemento.url,
        elemento.nombre,
        elemento.precio
      ); //trae los datos del db.json
      ul.appendChild(nuevaLinea);
    });
    //console.log(data);
  })
  .catch((e) => {
    console.log("Error: " + e);
  });
=======
const listaProductos = () =>
  //a mi respuesta le da un formato de json
  //https://alurageek-api-jade.vercel.app/producto
  fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

//http://localhost:3000/producto
const crearCliente = (url, nombre, precio, descripcion) => {
  //https://alurageek-api-jade.vercel.app/producto
  return fetch("http://localhost:3000/producto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, nombre, precio, descripcion, id: uuid.v4() }),
  });
};

const eliminarProducto = (id) => {
  //https://alurageek-api-jade.vercel.app/producto
  return fetch(`http://localhost:3000/producto/${id}`, {
    method: "DELETE",
  });
};

const detalleProducto = (id) => {
  //https://alurageek-api-jade.vercel.app/producto
  return fetch(`http://localhost:3000/producto/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error : " + err));
};

const actualizarProducto = (url, nombre, precio, descripcion, id) => {
  //http://localhost:3000/producto
  //https://alurageek-api-jade.vercel.app/producto
  return fetch(`http://localhost:3000/producto/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, nombre, precio, descripcion }),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const productService = {
  listaProductos,
  crearCliente,
  eliminarProducto,
  detalleProducto,
  actualizarProducto,
};
>>>>>>> Stashed changes
