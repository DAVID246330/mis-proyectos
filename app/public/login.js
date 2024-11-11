document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const user = e.target.user.value;
    const password = e.target.password.value;

    try {
        const res = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                password: password,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);  // Muestra un mensaje de éxito
            // Redirigir a la página de inicio de la tienda
            window.location.href = "/home"; // Cambia esto a la ruta de tu página de inicio
        } else {
            alert(data.message);  // Muestra el mensaje de error desde el servidor
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

