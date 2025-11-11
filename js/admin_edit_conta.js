document.addEventListener("DOMContentLoaded", () => {
    // valida_sessao() é chamado pelo HTML
    
    // Assim que a página carrega, busca os dados do usuário
    carregarDadosParaEdicao();
});

// FASE 1: Buscar dados do usuário para preencher o formulário
async function carregarDadosParaEdicao() {
    // Pega o ID da conta da URL (ex: ...?id_conta=123)
    const urlParams = new URLSearchParams(window.location.search);
    const id_conta = urlParams.get('id_conta');

    if (!id_conta) {
        alert("ID do usuário não encontrado na URL.");
        window.location.href = "../html/admin_home.html";
        return;
    }

    // Chama o PHP que busca os dados desse ID específico
    const retorno = await fetch(`../php/admin_get_one_conta.php?id_conta=${id_conta}`);
    const resposta = await retorno.json();

    if (resposta.status == "Ok" && resposta.data.length > 0) {
        const reg = resposta.data[0];
        
        // Preenche o formulário
        document.getElementById("id_conta").value = reg.id_conta; // O campo oculto
        document.getElementById("nome").value = reg.nome;
        document.getElementById("email").value = reg.email;
        document.getElementById("email-usuario-editado").textContent = reg.email;
        document.getElementById("nascimento").value = reg.data_nascimento;
        document.getElementById("endereco").value = reg.endereco;
        document.getElementById("telefone").value = reg.telefone;
    } else {
        alert("Erro: " + resposta.mensagem);
        window.location.href = "../html/admin_home.html";
    }
}

// FASE 2: Salvar os dados
document.getElementById("form-editar").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão
    salvarAlteracoesAdmin();
});

async function salvarAlteracoesAdmin() {
    const fd = new FormData();
    
    // Pega os dados do formulário
    fd.append("id_conta", document.getElementById("id_conta").value); // O ID a ser alterado
    fd.append("nome", document.getElementById("nome").value);
    fd.append("email", document.getElementById("email").value); // Mesmo estando readonly, enviamos
    fd.append("data_nascimento", document.getElementById("nascimento").value);
    fd.append("endereco", document.getElementById("endereco").value);
    fd.append("telefone", document.getElementById("telefone").value);

    // Chama o PHP de edição do admin
    const retorno = await fetch("../php/admin_edit_conta.php", {
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