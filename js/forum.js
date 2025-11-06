document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    const formCriar = document.getElementById('form-forum');
    const listaForums = document.getElementById('lista-forums');
    const msgVazio = document.getElementById('mensagem-vazio');

    const modalEdicao = new bootstrap.Modal(document.getElementById('editModal'));
    const formEdicao = document.getElementById('form-edit-forum');
    const inputEditId = document.getElementById('edit-forum-id');
    const inputEditNome = document.getElementById('edit-forum-nome');
    const inputEditConteudo = document.getElementById('edit-forum-conteudo');

    // --- FUNÇÕES PRINCIPAIS ---

    /**
     * Carrega e exibe todos os tópicos do fórum (Estilo solicitado)
     */
    async function carregarForums() {
        try {
            const retorno = await fetch('../php/forum_read.php');
            const resposta = await retorno.json();

            if (resposta.status == "Ok") {
                var html = ``;

                if (resposta.data.length > 0) {
                    msgVazio.style.display = 'none';

                    for (var i = 0; i < resposta.data.length; i++) {
                        var forum = resposta.data[i];

                        const dataFormatada = new Date(forum.data_criacao).toLocaleString('pt-BR');

                        // Mostra os botões SEMPRE (versão simplificada)
                        const botoesAcao = `
                            <div class="mt-3">
                                <button class="btn btn-sm btn-outline-primary btn-editar" 
                                        data-id="${forum.id_forum}" data-nome="${forum.titulo}" data-conteudo="${forum.conteudo_inicial}"
                                        data-bs-toggle="modal" data-bs-target="#editModal">
                                    Editar
                                </button>
                                <button class="btn btn-sm btn-outline-danger btn-excluir" data-id="${forum.id_forum}">
                                    Excluir
                                </button>
                            </div>
                        `;

                        html += `
                            <div class="card mb-3 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">${forum.titulo}</h5>
                                    <p class="card-text">${forum.conteudo_inicial.replace(/\n/g, '<br>')}</p>
                                    <hr>
                                    <small class="text-muted">
                                        Postado em ${dataFormatada}
                                    </small>
                                    ${botoesAcao}
                                </div>
                            </div>
                        `;
                    }
                } else {
                    msgVazio.style.display = 'block';
                }

                listaForums.innerHTML = html;

            } else {
                alert(" erro " + resposta.mensagem);
            }
        } catch (error) {
            console.error('Erro ao carregar fóruns:', error);
            alert('Falha na comunicação com o servidor.');
        }
    }

    // --- FUNÇÕES DE AÇÃO (Com lógica fetch repetida) ---

    async function criarForum(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome', document.getElementById('forum-nome').value);
        formData.append('conteudo', document.getElementById('forum-conteudo').value);

        try {
            const response = await fetch('../php/forum_create.php', {
                method: 'POST',
                body: formData
            });
            const resultado = await response.json();

            alert(resultado.mensagem);

            if (resultado.status === 'Ok') {
                formCriar.reset(); // Limpa o form de criação
                carregarForums(); // Recarrega a lista
            }
        } catch (error) {
            console.error(`Erro em forum_create.php:`, error);
            alert('Falha na comunicação com o servidor.');
        }
    }

    async function editarForum(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_forum', inputEditId.value);
        formData.append('nome', inputEditNome.value);
        formData.append('conteudo', inputEditConteudo.value);

        try {
            const response = await fetch('../php/forum_update.php', {
                method: 'POST',
                body: formData
            });
            const resultado = await response.json();

            alert(resultado.mensagem);

            if (resultado.status === 'Ok') {
                modalEdicao.hide(); // Fecha o modal
                carregarForums(); // Recarrega a lista
            }
        } catch (error) {
            console.error(`Erro em forum_update.php:`, error);
            alert('Falha na comunicação com o servidor.');
        }
    }

    async function excluirForum(idForum) {
        if (!confirm('Tem certeza que deseja excluir este tópico?')) {
            return;
        }
        const formData = new FormData();
        formData.append('id_forum', idForum);

        try {
            const response = await fetch('../php/forum_delete.php', {
                method: 'POST',
                body: formData
            });
            const resultado = await response.json();

            alert(resultado.mensagem);

            if (resultado.status === 'Ok') {
                carregarForums(); // Recarrega a lista
            }
        } catch (error) {
            console.error(`Erro em forum_delete.php:`, error);
            alert('Falha na comunicação com o servidor.');
        }
    }

    // --- EVENT LISTENERS (Sem alterações) ---

    carregarForums(); // Carga inicial

    formCriar.addEventListener('submit', criarForum);
    formEdicao.addEventListener('submit', editarForum);

    listaForums.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-excluir')) {
            // Note que aqui chamamos a função async, que vai cuidar de tudo
            excluirForum(event.target.dataset.id);
        }
    });

    document.getElementById('editModal').addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        if (button && button.classList.contains('btn-editar')) {
            inputEditId.value = button.dataset.id;
            inputEditNome.value = button.dataset.nome;
            inputEditConteudo.value = button.dataset.conteudo;
        }
    });
});