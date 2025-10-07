const LOGIN = document.querySelector("#login");
const mensagem = document.querySelector("#mensagem");

LOGIN.addEventListener("click",  async(e) =>{
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    const fd = new FormData();
    fd.append("email", email);
    fd.append("senha", senha);

    const resposta = await fetch("php/login.php", {
        method: "POST",
        body: fd
    });

    const resultado = await resposta.json();

    if(resultado.status === "Ok"){
        localStorage.setItem("sessao", JSON.stringify(resultado.usuario));
        window.location.href = "home.html";

    }else{
        mensagem.textContent = resultado.mensagem;
        mensagem.style.color = "red";

    }

});