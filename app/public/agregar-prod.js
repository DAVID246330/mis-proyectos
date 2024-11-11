document.getElementById("addProductForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const nombre = document.getElementById("productName").value;
    const descripcion = document.getElementById("productDescription").value;
    const precio = parseFloat(document.getElementById("productPrice").value);
    const productDiscountPrice = document.getElementById('productDiscountPrice').value; // Nuevo campo
    const productStock = document.getElementById('productStock').value; // Nuevo campo

    const producto = {
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio,
        Precio_Descuento: productDiscountPrice, // Nuevo campo
        Stock: productStock // Nuevo campo
    };

    try {
        const response = await fetch("/api/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Producto agregado con éxito: ID " + data.id); // Cambiado a ID
            document.getElementById("addProductForm").reset();
        } else {
            const errorData = await response.json();
            alert("Error al agregar el producto: " + errorData.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al agregar el producto. Intenta de nuevo.");
    }
});
