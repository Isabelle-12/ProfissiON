document.addEventListener("DOMContentLoaded", () => {
    // Não precisamos mais verificar a URL.
    // Apenas carregamos os dados do usuário que está logado (via sessão no PHP).
    fase1();
});

// FASE 1 - Buscar dados
async function fase1() {
    // Chama o PHP sem enviar ID. O PHP vai usar a SESSÃO.
    const retorno = await fetch("../php/profission_get.php");
    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        const reg = resposta.data[0];
        document.getElementById("nome").value = reg.nome;
        document.getElementById("email").value = reg.email;
        // O nome do campo no HTML é "nascimento"
        document.getElementById("nascimento").value = reg.data_nascimento;
        document.getElementById("endereco").value = reg.endereco;
        document.getElementById("telefone").value = reg.telefone;

        // NÃO preenchemos o ID em lugar nenhum, nem a senha.
    } else {
        alert("Erro: " + resposta.mensagem);
        // Se não houver sessão, o usuário é expulso
        if (resposta.mensagem === "Nenhum usuário logado") {
            window.location.href = "../html/login.html";
        }
    }
}

// Evento do botão salvar
document.getElementById("salvar").addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    fase2();
});

// FASE 2 - Salvar dados
async function fase2() {
    // Pega todos os dados do formulário
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var data_nascimento = document.getElementById("nascimento").value; // ID correto
    var endereco = document.getElementById("endereco").value;
    var telefone = document.getElementById("telefone").value;
    var nova_senha = document.getElementById("nova_senha").value;
    var confirmar_nova_senha = document.getElementById("confirmar_nova_senha").value;

    if (nova_senha.length > 0 && nova_senha !== confirmar_nova_senha) {
        alert("As novas senhas não coincidem!");
        return;
    }

    // Monta o FormData
    const fd = new FormData();
    // NÃO enviamos o id_conta, o PHP vai pegar da SESSÃO
    fd.append("nome", nome);
    fd.append("email", email);
    fd.append("data_nascimento", data_nascimento);
    fd.append("endereco", endereco);
    fd.append("telefone", telefone);
    fd.append("nova_senha", nova_senha); // Opcional

    // Chama o PHP sem enviar ID. O PHP vai usar a SESSÃO.
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