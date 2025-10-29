const form = document.getElementById('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const cargo = document.getElementById('cargo');
const departamento = document.getElementById('departamento');
const dataAdmissao = document.getElementById('dataAdmissao');
const status = document.getElementById('status');
const nivelAcesso = document.getElementById('nivelAcesso');
const tabelaCorpo = document.getElementById('tabela-corpo');

let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
let editIndex = null;

function gerarId() {
    return 'ID-' + Date.now();
}

function renderTabela() {
    tabelaCorpo.innerHTML = '';
    colaboradores.forEach((colaborador, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${colaborador.nome}</td>
      <td>${colaborador.email}</td>
      <td>${colaborador.cargo}</td>
      <td>${colaborador.departamento}</td>
      <td>${colaborador.dataAdmissao}</td>
      <td>${colaborador.status}</td>
      <td>${colaborador.nivelAcesso}</td>
      <td>
        <button class="btn btn-sm btn-outline-success me-1" onclick="editar(${index})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluir(${index})">Excluir</button>
      </td>
    `;
        tabelaCorpo.appendChild(tr);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoColaborador = {
        id: editIndex === null ? gerarId() : colaboradores[editIndex].id,
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        cargo: cargo.value,
        departamento: departamento.value,
        dataAdmissao: dataAdmissao.value,
        status: status.value,
        nivelAcesso: nivelAcesso.value
    };

    if (editIndex === null) {
        colaboradores.push(novoColaborador);
    } else {
        colaboradores[editIndex] = novoColaborador;
        editIndex = null;
    }

    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
    form.reset();
    renderTabela();
});

function editar(index) {
    const colaborador = colaboradores[index];
    nome.value = colaborador.nome;
    email.value = colaborador.email;
    senha.value = colaborador.senha;
    cargo.value = colaborador.cargo;
    departamento.value = colaborador.departamento;
    dataAdmissao.value = colaborador.dataAdmissao;
    status.value = colaborador.status;
    nivelAcesso.value = colaborador.nivelAcesso;
    editIndex = index;
}

function excluir(index) {
    colaboradores.splice(index, 1);
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
    renderTabela();
}

renderTabela();