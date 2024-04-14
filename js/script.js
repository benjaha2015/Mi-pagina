//Registro 
let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("title");

signIn.onclick = function(){
    nameInput.style.maxHeight="0";
    title.innerHTML = "Login";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}

signUp.onclick = function(){
    nameInput.style.maxHeight="60px";
    title.innerHTML = "Registrarse";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}

//lo demas
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', this.window.scrollY > 80);
});

document.addEventListener('DOMContentLoaded', function () {
    const productosEnTienda = document.querySelectorAll('.row');
    const tablaCarrito = document.getElementById('tabla-carrito');
    const carrito = document.getElementById('carrito');
    let totalCarrito = 0;

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>$${precio}</td>
        `;
        tablaCarrito.appendChild(fila);

        // Convertir el precio a número eliminando el signo "$" y la coma ","
        totalCarrito += parseFloat(precio.replace('$', '').replace(',', ''));

        // Actualizar el total en el carrito
        actualizarTotal();
    }

    // Event listener para agregar productos al carrito al hacer clic en "Agregar carrito"
    productosEnTienda.forEach(producto => {
        producto.querySelector('.agregar-carrito').addEventListener('click', function () {
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('.price h6').textContent;
            agregarAlCarrito(nombre, precio);
        });
    });

    // Event listener para mostrar u ocultar el carrito
    document.getElementById('mostrar-carrito').addEventListener('click', function () {
        carrito.classList.toggle('hidden');
    });

    // Función para actualizar el total en el carrito
    function actualizarTotal() {
        const totalElemento = document.getElementById('total-carrito');
        totalElemento.textContent = `$${totalCarrito.toFixed(2)}`;
    }
});