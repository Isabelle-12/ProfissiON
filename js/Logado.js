document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    document.getElementById("sair").addEventListener("click", () => {
        logoff();
    });
});

async function logoff() {
    const retorno = await fetch("../php/profission_logout.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("volte sempre!")
        window.location.href = "../login/";
    }
}