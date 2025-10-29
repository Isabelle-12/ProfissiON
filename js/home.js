// filepath: js/home.js
document.addEventListener("DOMContentLoaded", function () {
    const sessao = JSON.parse(localStorage.getItem("sessao"));
    if (!sessao || !sessao.email) {
        alert("Redirecionando para login...");
        window.location.href = "Login.html";
        return;
    }

    // **VERIFICAÇÃO ADMIN:** Se for admin, envia para o painel de admin
    if (sessao.tipo === 'admin') {
        window.location.href = "admin_home.html"; 
        return;
    }
    
    if (sessao.nome) {
        document.getElementById("usuario_nome1").textContent = sessao.nome;
        document.getElementById("usuario_nome_card").textContent = sessao.nome;
        document.getElementById("Email_usuario").textContent = sessao.email;
    }

    const dadosSalvos = localStorage.getItem("usuarios");
    const nomes = JSON.parse(dadosSalvos);

    function atualizarUsuario(novosDados) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u => u.email === sessao.email);
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...novosDados }; 
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            if (novosDados.nome) {
                sessao.nome = novosDados.nome;
                localStorage.setItem("sessao", JSON.stringify(sessao));
            }
            alert("Dados atualizados!");
        }
    }

    function excluirUsuario() {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const novosUsuarios = usuarios.filter(u => u.email !== sessao.email);
        localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));
        localStorage.removeItem("sessao");
        alert("Conta excluída!");
        window.location.href = "Login.html";
    }

    document.getElementById("botaoEditar").onclick = function () {
        const novoNome = prompt("Digite o novo nome:");
        if (novoNome) {
            atualizarUsuario({ nome: novoNome });
            document.getElementById("usuario_nome_card").textContent = novoNome;
            document.getElementById("usuario_nome1").textContent = novoNome;
        }
    };

    document.getElementById("botaoExcluir").onclick = function () {
        if (confirm("Tem certeza que deseja excluir sua conta?")) {
            excluirUsuario();
        }
    };

    document.getElementById("botaoSair").onclick = function () {
        localStorage.removeItem("sessao");
        window.location.href = "Login.html";
    };
});