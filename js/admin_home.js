document.addEventListener("DOMContentLoaded", () => {
    
    
    
    carregarDadosPropriosAdmin();
    
    
    carregarTodasAsContas();

    
    document.getElementById("botaoSair").addEventListener("click", () => {
        logoff();
    });

    
    document.getElementById("botaoEditarProprio").addEventListener("click", () => {
        
        window.location.href = "../html/profission_alterar.html"; 
    });
});


async function carregarDadosPropriosAdmin() {
    
    const retorno = await fetch("../php/profission_get.php"); 
    const resposta = await retorno.json();

    if (resposta.status == "Ok" && resposta.data.length > 0) {
        const admin = resposta.data[0];
        document.getElementById("usuario_nome1").textContent = admin.nome;
        document.getElementById("usuario_nome_card").textContent = admin.nome;
        document.getElementById("Email_usuario").textContent = admin.email;
    } else {
        
        console.error("Erro ao buscar dados do admin:", resposta.mensagem);
    }
}


async function carregarTodasAsContas() {
    const listaUl = document.getElementById("lista-usuarios-admin");
    listaUl.innerHTML = "<li>Carregando...</li>";

    const retorno = await fetch("../php/admin_get_all_contas.php");
    const resposta = await retorno.json();

    if (resposta.status == "Ok") {
        listaUl.innerHTML = ""; 
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
        carregarTodasAsContas(); 
    } else {
        alert("Erro ao excluir: " + resposta.mensagem);
    }
}



async function logoff() {
    const retorno = await fetch("../php/profission_logout.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("Sessão encerrada.")
        window.location.href = "../html/admin_login.html";
    }
}