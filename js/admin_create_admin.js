document.addEventListener("DOMContentLoaded", () => {
    // valida_sessao() é chamado pelo HTML
});

document.getElementById("form-criar-admin").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão
    salvarNovoAdmin();
});

async function salvarNovoAdmin() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const fd = new FormData();
    fd.append("nome", nome);
    fd.append("email", email);
    fd.append("senha", senha);

    const retorno = await fetch("../php/admin_create_admin.php", {
        method: "POST",
        body: fd
    });

    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = "../html/admin_home.html";
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}