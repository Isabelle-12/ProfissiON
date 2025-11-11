document.addEventListener("DOMContentLoaded", () => {
    // valida_sessao() é chamado pelo HTML
    
    // Carrega os dados do admin logado (para o card)
    carregarDadosPropriosAdmin();
    
    // Carrega a lista de todos os usuários (para o painel)
    carregarTodasAsContas();

    // Adiciona evento ao botão de sair (que já está no seu 'logado.js', mas é bom garantir)
    document.getElementById("botaoSair").addEventListener("click", () => {
        logoff();
    });

    // (Opcional) Adiciona evento ao botão "Editar Meu Perfil"
    document.getElementById("botaoEditarProprio").addEventListener("click", () => {
        // O admin pode usar a mesma tela de alteração do usuário comum
        window.location.href = "../html/profission_alterar.html"; 
    });
});

// Função para buscar os dados do admin (para o card)
async function carregarDadosPropriosAdmin() {
    // Reutiliza o profission_get.php, que busca pela SESSÃO
    const retorno = await fetch("../php/profission_get.php"); 
    const resposta = await retorno.json();

    if (resposta.status == "Ok" && resposta.data.length > 0) {
        const admin = resposta.data[0];
        document.getElementById("usuario_nome1").textContent = admin.nome;
        document.getElementById("usuario_nome_card").textContent = admin.nome;
        document.getElementById("Email_usuario").textContent = admin.email;
    } else {
        // Se falhar aqui, o valida_sessao.js já deve ter pego
        console.error("Erro ao buscar dados do admin:", resposta.mensagem);
    }
}

// Função para buscar TODAS as contas (para o painel)
async function carregarTodasAsContas() {
    const listaUl = document.getElementById("lista-usuarios-admin");
    listaUl.innerHTML = "<li>Carregando...</li>";

    const retorno = await fetch("../php/admin_get_all_contas.php");
    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        listaUl.innerHTML = ""; // Limpa o "Carregando"
        resposta.data.forEach(conta => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>
                    <strong>${conta.nome}</strong> (ID: ${conta.id_conta})<br>
                    <small>${conta.email}</small>
                </span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editarConta(${conta.id_conta})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="excluirConta(${conta.id_conta}, '${conta.nome}')">
                        Excluir
                    </button>
                </div>
            `;
            listaUl.appendChild(li);
        });
    } else {
        listaUl.innerHTML = `<li class="list-group-item text-danger">${resposta.mensagem}</li>`;
    }
}



function editarConta(id) {
    window.location.href = `../html/admin_edit_conta.html?id_conta=${id}`;
}

async function excluirConta(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir a conta de "${nome}" (ID: ${id})? Esta ação não pode ser desfeita.`)) {
        return;
    }

    const fd = new FormData();
    fd.append("id_conta", id);

    const retorno = await fetch("../php/admin_delete_conta.php", {
        method: "POST",
        body: fd
    });
    
    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        alert("Conta excluída com sucesso!");
        carregarTodasAsContas(); // Recarrega a lista
    } else {
        alert("Erro ao excluir: " + resposta.mensagem);
    }
}


// Função de logoff (copiada do seu logado.js para garantir)
async function logoff() {
    const retorno = await fetch("../php/profission_logout.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("Sessão encerrada.")
        window.location.href = "../html/admin_login.html"; // Manda para o login de admin
    }
}