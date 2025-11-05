document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
});

document.getElementById("cadastrar").addEventListener(
    "click", function(){
        cadastro();
    }
);

async function cadastro(){
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if(nome.length > 0 && email.length > 0 && senha.length){
        const fd = new FormData();
        fd.append('nome',nome);
        fd.append('email',email);
        fd.append('senha',senha);

        const retorno = await fetch("../php/profission_create.php",{
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        if(resposta.status == "Ok"){
            alert("Sucesso!" + resposta.mensagem);
            window.location.href= "home_logado.html";
        }else{
            alert("Erro!"+ resposta.mensagem);
        }
    }else{
        alert("É necessario preencher os campos restantes");
    }
}