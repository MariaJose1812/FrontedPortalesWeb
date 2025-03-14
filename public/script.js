document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

  
    document.getElementById("login-box").style.display = "none";


    document.getElementById("logo").style.position = "absolute";
    document.getElementById("logo").style.top = "50%";
    document.getElementById("logo").style.left = "50%";
    document.getElementById("logo").style.transform = "translate(-50%, -50%)";

  
    document.getElementById("loading").style.display = "block";


    setTimeout(function() {
        window.location.href = "dashboard.html"; 
    }, 5000);
});

