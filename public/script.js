document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Ocultar el formulario de login
    document.getElementById("login-box").classList.add("d-none");

    // Centrar el logo (si no lo está en el CSS)
    let logo = document.getElementById("logo");
    logo.classList.add("position-absolute", "top-50", "start-50", "translate-middle");

    // Mostrar el spinner de carga
    document.getElementById("loading").classList.remove("d-none");

    // Simular la carga y redirigir
    setTimeout(function() {
        window.location.href = "dashboard.html"; 
    }, 5000);
});


