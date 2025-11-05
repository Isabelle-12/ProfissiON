document.getElementById("entrar").addEventListener("click", () => {
    verificarlogin();

});

async function verificarlogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    const fd = new FormData();
    fd.append("email", email);
    fd.append("senha", senha);

    const retorno = await fetch("../php/profission_login.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "Ok") {
        alert("Logado");
        window.location.href = "../html/home_logado.html";
    } else {
        alert("Credenciais invalidas")
    }
}
