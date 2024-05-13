


document.addEventListener('DOMContentLoaded',  () => {
    const baseDeDatos = [
        {
          id: 1,
          nombre: "Italiano Fantástico",
          descripcion: "La hamburguesa con un toque italiano de sabor y estilo",
          precio: 4500
        },
        {
          id: 2,
          "nombre": "Pollo Paradise",
          "descripcion": "La hamburguesa jugosa con pollo tierno y sabroso",
           precio: 5000
        },
        {
          id: 3,
          nombre: "Classic Crave",
          descripcion: "La hamburguesa clásica que siempre antoja",
          precio: 4000
        },
    
        {
          id: 4,
          nombre: "Bacon Bliss",
          descripcion: "La hamburguesa con el toque irresistible del bacon crujiente",
          precio: 6000
        },
        {
            id: 5,
            nombre: "Garden Delight",
            descripcion: "Una explosión de sabores con vegetales frescos y proteínas vegetales",
            precio: 5580
        },
        {
            id: 6,
            nombre: "BBQ Supreme",
            descripcion: "La hamburguesa con sabor a la parrilla que lo tiene todo",
            precio: 6000
        }
    ];
      
    let carrito = []; // Variable para almacenar los productos del carrito
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');    

    
    botonagregarcarrito.onclick = function(){
        anyadirProductoAlCarrito(evento);
    }

    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito
        renderizarCarrito();

    }


    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
    }


    // Cargar los productos desde el archivo JSON
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error('Error al cargar los productos:', error));

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        const contenedorProductos = document.querySelector('.shop-content');

        productos.forEach(producto => {
            const { id, nombre, descripcion, precio } = producto;

            const productoHTML = `
                <div class="row" id="${id}">
                    <h3>${nombre}</h3>
                    <p>${descripcion}</p>
                    <div class="in-text">
                        <div class="price"> 
                            <h6>$${precio}</h6>
                        </div>
                        <div class="s-btn">
                        <a href="#" id="boton-agregar-carrito" class="agregar-carrito">Agregar carrito</a>
                        </div>
                    </div>
                </div>
            `;

            contenedorProductos.innerHTML += productoHTML;
        });

        // Manejador de eventos para el botón "Agregar al carrito"
        document.querySelectorAll('.agregar-carrito').forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar que se realice la acción predeterminada del enlace
                // Lógica para agregar el producto al carrito
                const id = event.target.dataset.id;
                const productoAgregado = carrito.find(producto => producto.id === id);

                if (productoAgregado) {
                    productoAgregado.cantidad++;
                } else {
                    const producto = {
                        id: id,
                        nombre: event.target.parentNode.parentNode.querySelector('h3').textContent,
                        precio: parseInt(event.target.parentNode.parentNode.querySelector('.price h6').textContent.replace('$', '')),
                        cantidad: 1
                    };
                    carrito.push(producto);
                }

                mostrarCarrito();
            });
        });

        // Manejador de eventos para el botón "Vaciar Carrito"
        document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    }

    // Función para mostrar el contenido del carrito
    function mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = ''; // Limpiar la lista antes de mostrar los productos

        carrito.forEach(producto => {
            const itemCarrito = document.createElement('li');
            itemCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad}`;
            listaCarrito.appendChild(itemCarrito);
        });
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = []; // Vaciar el arreglo de productos en el carrito
        mostrarCarrito(); // Actualizar la visualización del carrito
    }
});