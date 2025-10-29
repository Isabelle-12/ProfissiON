const formProf = document.getElementById('form-profissao');
const container = document.getElementById('cards-profissoes');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const formEdit = document.getElementById('form-edit-profissao');

let profissoes = JSON.parse(localStorage.getItem('profissoes')) || [];

const salvar = () => localStorage.setItem('profissoes', JSON.stringify(profissoes));

const criarCard = (prof) => {
    const card = document.createElement('div');
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
        <div class="card h-100 shadow-sm">
            ${prof.imagem ? `<img src="${prof.imagem}" class="card-img-top">` : ''}
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${prof.nome_profissao}</h5>
                <p class="card-text">${prof.descricao}</p>
                <p><strong>Área:</strong> ${prof.area}</p>
                <p><strong>Salário Médio:</strong> ${prof.salario_medio}</p>
                <p><strong>Mercado:</strong> ${prof.mercado_trabalho}</p>
                <div class="mt-auto d-flex justify-content-end">
                    <button class="btn btn-outline-secondary btn-sm me-2 btn-editar">Editar</button>
                    <button class="btn btn-outline-danger btn-sm btn-excluir">Excluir</button>
                </div>
            </div>
        </div>
    `;

    card.querySelector('.btn-editar').addEventListener('click', () => abrirEdicao(prof));
    card.querySelector('.btn-excluir').addEventListener('click', () => {
        if(confirm('Deseja excluir esta profissão?')) {
            profissoes = profissoes.filter(p => p.id !== prof.id);
            salvar();
            render();
        }
    });

    return card;
};

const render = () => {
    container.innerHTML = '';
    profissoes.forEach(prof => container.appendChild(criarCard(prof)));
};

const abrirEdicao = (prof) => {
    formEdit['edit-profissao-id'].value = prof.id;
    formEdit['edit-nome'].value = prof.nome_profissao;
    formEdit['edit-descricao'].value = prof.descricao;
    formEdit['edit-area'].value = prof.area;
    formEdit['edit-salario'].value = prof.salario_medio;
    formEdit['edit-mercado'].value = prof.mercado_trabalho;
    editModal.show();
};

const lerImagem = (input) => new Promise(resolve => {
    if(input.files[0]){
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(input.files[0]);
    } else resolve('');
});

formProf.addEventListener('submit', async e => {
    e.preventDefault();
    const imagem = await lerImagem(formProf.imagem);
    profissoes.push({
        id: Date.now(),
        nome_profissao: formProf.nome_profissao.value,
        descricao: formProf.descricao.value,
        area: formProf.area.value,
        salario_medio: formProf.salario_medio.value,
        mercado_trabalho: formProf.mercado_trabalho.value,
        imagem
    });
    salvar();
    formProf.reset();
    render();
});

formEdit.addEventListener('submit', async e => {
    e.preventDefault();
    const id = Number(formEdit['edit-profissao-id'].value);
    const prof = profissoes.find(p => p.id === id);
    if(prof){
        prof.nome_profissao = formEdit['edit-nome'].value;
        prof.descricao = formEdit['edit-descricao'].value;
        prof.area = formEdit['edit-area'].value;
        prof.salario_medio = formEdit['edit-salario'].value;
        prof.mercado_trabalho = formEdit['edit-mercado'].value;
        const novaImg = await lerImagem(formEdit['edit-imagem']);
        if(novaImg) prof.imagem = novaImg;
        salvar();
        render();
        editModal.hide();
    }
});

render();
