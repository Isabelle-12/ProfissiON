const LOGIN = document.querySelector("#login");
const mensagem = document.querySelector("#mensagem");

LOGIN.addEventListener("click", (e) =>{
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const verificacao = usuarios.find(user => user.email === email && user.senha === senha);

    if(verificacao){
        window.location.href = "home.html";

    }else{
        mensagem.textContent = "Usuário não encontrado!";
        mensagem.style.color = "red";

    }

});