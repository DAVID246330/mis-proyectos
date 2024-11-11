let carrito = []; // Array para almacenar los productos en el carrito

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    const producto = { id, nombre, precio, imagen }; // Crear el objeto producto con imagen
    carrito.push(producto); // Agregar el producto al carrito
    alert(nombre + " agregado al carrito"); // Mostrar el nombre correcto del producto
    mostrarCarrito(); // Mostrar el carrito actualizado
    actualizarContadorCarrito(); // Actualizar el contador de artículos
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalContainer = document.querySelector(".cart-total span");
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
    let total = 0; // Inicializar el total

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50"> <!-- Mostrar la imagen del producto -->
            <div class="item-details">
                <p class="item-name">${producto.nombre}</p>
                <span class="item-subtotal">Subtotal: $${producto.precio}</span>
                <button class="remove-item" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(li); // Agregar al contenedor del carrito
        total += producto.precio; // Sumar al total
    });

    totalContainer.textContent = `$${total.toFixed(2)}`; // Mostrar total
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el producto del carrito
    mostrarCarrito(); // Actualizar el carrito en pantalla
    actualizarContadorCarrito(); // Actualizar el contador de artículos
    
}

// Función para actualizar el contador de artículos en el carrito
function actualizarContadorCarrito() {
    const contadorElement = document.getElementById("cart-item-count");
    contadorElement.textContent = `${carrito.length} artículos en el carrito`;
}

// Función para alternar la visualización del carrito
function toggleCart(event) {
    event.preventDefault(); // Evitar recargar la página
    const cartDropdown = document.getElementById("cartDropdown");
    cartDropdown.style.display = (cartDropdown.style.display === "none" || cartDropdown.style.display === "") ? "block" : "none";
    mostrarCarrito(); // Mostrar los productos en el carrito
}

// Función para finalizar la compra
function finalizarCompra() {
    alert("Redirigiendo a la página de pago...");
    window.location.href = '/pago'; // Redirige a la ruta del servidor
}
