document.getElementById("admin-login-btn").addEventListener("click", () => {
    verificarLoginAdmin();
});

async function verificarLoginAdmin() {
    var email = document.getElementById("admin-email").value;
    var senha = document.getElementById("admin-senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha e-mail e senha.");
        return;
    }

    const fd = new FormData();
    fd.append("email", email);
    fd.append("senha", senha);

    
    const retorno = await fetch("../php/admin_login.php", {
        method: "POST",
        body: fd
    });
    
    const resposta = await retorno.json();
    
    if (resposta.status == "Ok") {
        
        window.location.href = "../html/admin_home.html";
    } else {
        
        alert("Erro: " + resposta.mensagem);
    }
}