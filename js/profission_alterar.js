document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    fase1();
});


async function fase1() {
    
    const retorno = await fetch("../php/profission_get.php");
    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        const reg = resposta.data[0];
        document.getElementById("nome").value = reg.nome;
        document.getElementById("email").value = reg.email;
        document.getElementById("nascimento").value = reg.data_nascimento;
        document.getElementById("endereco").value = reg.endereco;
        document.getElementById("telefone").value = reg.telefone;

        
    } else {
        alert("Erro: " + resposta.mensagem);
        if (resposta.mensagem === "Nenhum usuário logado") {
            window.location.href = "../html/login.html";
        }
    }
}


document.getElementById("salvar").addEventListener("click", function (event) {
    event.preventDefault(); 
    fase2();
});


async function fase2() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var data_nascimento = document.getElementById("nascimento").value;
    var endereco = document.getElementById("endereco").value;
    var telefone = document.getElementById("telefone").value;
    var nova_senha = document.getElementById("nova_senha").value;
    var confirmar_nova_senha = document.getElementById("confirmar_nova_senha").value;

    if (nova_senha.length > 0 && nova_senha !== confirmar_nova_senha) {
        alert("As novas senhas não coincidem!");
        return;
    }


    const fd = new FormData();
    
    fd.append("nome", nome);
    fd.append("email", email);
    fd.append("data_nascimento", data_nascimento);
    fd.append("endereco", endereco);
    fd.append("telefone", telefone);
    fd.append("nova_senha", nova_senha);

    const retorno = await fetch("../php/profission_alterar.php", {
        method: "POST",
        body: fd
    });

    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = "../html/home_logado.html";
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}