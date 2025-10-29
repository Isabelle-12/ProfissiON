const formForum = document.getElementById('form-forum');
const inputNome = document.getElementById('forum-nome');
const inputConteudo = document.getElementById('forum-conteudo');
const listaForums = document.getElementById('lista-forums');
const mensagemVazio = document.getElementById('mensagem-vazio');
const editModalElement = document.getElementById('editModal');
const editModal = new bootstrap.Modal(editModalElement);
const formEditForum = document.getElementById('form-edit-forum');
const inputEditId = document.getElementById('edit-forum-id');
const inputEditNome = document.getElementById('edit-forum-nome');
const inputEditConteudo = document.getElementById('edit-forum-conteudo');

let foruns = JSON.parse(localStorage.getItem('foruns')) || [];

function salvarForuns() {
    localStorage.setItem('foruns', JSON.stringify(foruns));
}
function carregarForuns() {
    listaForums.innerHTML = '';

    if (foruns.length === 0) {
        mensagemVazio.style.display = 'block';
    } else {
        mensagemVazio.style.display = 'none';

        foruns.forEach(forum => {
            const card = document.createElement('div');
            card.className = 'card shadow-sm mb-3';
            card.innerHTML = ` 
                <div class="card-header">${forum.nome}</div>
                <div class="card-body">
                    <p class="card-text">${forum.conteudo}</p>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-outline-secondary btn-sm me-2 btn-editar">Editar</button>
                        <button class="btn btn-outline-danger btn-sm btn-excluir">Excluir</button>
                    </div>
                </div>
            `;
            const btnEditar = card.querySelector('.btn-editar');
            btnEditar.addEventListener('click', () => {
                inputEditId.value = forum.id;
                inputEditNome.value = forum.nome;
                inputEditConteudo.value = forum.conteudo;
                editModal.show();
            });
            const btnExcluir = card.querySelector('.btn-excluir');
            btnExcluir.addEventListener('click', () => {
                deletarForum(forum.id);
            });

            listaForums.appendChild(card);
        });
    }
}
function criarForum(nome, conteudo) {
    const novoForum = {
        id: Date.now(),
        nome: nome,
        conteudo: conteudo
    };
    foruns.push(novoForum);
    salvarForuns();
    carregarForuns();
}
function editarForum(id, novoNome, novoConteudo) {
    const forumParaEditar = foruns.find(f => f.id == id);
    if (forumParaEditar) {
        forumParaEditar.nome = novoNome;
        forumParaEditar.conteudo = novoConteudo;
    }
    salvarForuns();
    carregarForuns();
}
function deletarForum(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este tópico?');
    if (confirmar) {
        foruns = foruns.filter(f => f.id != id);
        salvarForuns();
        carregarForuns();
    }
}

formForum.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = inputNome.value;
    const conteudo = inputConteudo.value;
    if (nome.trim() && conteudo.trim()) {
        criarForum(nome, conteudo);
        formForum.reset();
    }
});

formEditForum.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const id = inputEditId.value;
    const nome = inputEditNome.value;
    const conteudo = inputEditConteudo.value;
    if (id && nome.trim() && conteudo.trim()) {
        editarForum(id, nome, conteudo);
        editModal.hide();
    }
});

function irParaPagina(url) {
    window.location.href = url;
}

carregarForuns();