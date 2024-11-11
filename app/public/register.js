document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const user = e.target.user.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
   

    try {
        const res = await fetch("/api/register", {  // URL relativa
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user,
                email,
                password,
               
            }),
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);  // Muestra un mensaje de éxito
            window.location.href = "/"; // Redirige a la página de inicio o login
        } else {
            alert(data.message);  // Muestra el mensaje de error desde el servidor
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

  