
const LOGIN_BTN = document.querySelector("#admin-login-btn");
const mensagem = document.querySelector("#mensagem-admin");

LOGIN_BTN.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#admin-email").value.trim();
    const senha = document.querySelector("#admin-senha").value.trim();

    const fd = new FormData();
    fd.append("email", email);
    fd.append("senha", senha);

    const resposta = await fetch("../php/admin_login.php", {
        method: "POST",
        body: fd
    });

    const resultado = await resposta.json();

    if (resultado.status === "Ok") {
        localStorage.setItem("sessao", JSON.stringify(resultado.usuario));
        window.location.href = "admin_home.html";
    } else {
        mensagem.textContent = resultado.mensagem;
        mensagem.style.color = "red";
    }

});