document.addEventListener("DOMContentLoaded", () => {
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = '../html/profissao_novo.html';
});

async function excluir(id_profissao){
    const retorno = await fetch("../php/profissao_excluir.php?id_profissao=" + id_profissao);
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        alert(resposta.mensagem);
        window.location.reload();
    }else{
        alert(resposta.mensagem);
    }
}

async function buscar(){
    const retorno = await fetch("../php/profissao_get.php");
    const resposta = await retorno.json();

    if(resposta.status == "ok"){
        preencherCards(resposta.data);
    }
}

function preencherCards(lista){
    let html = '<div class="row g-3">';

    lista.forEach(item => {
        html += `
            <div class="col-md-4">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.nome_profissao}</h5>
                        <p class="card-text"><strong>Área:</strong> ${item.area}</p>
                        <p class="card-text"><strong>Descrição:</strong> ${item.descricao}</p>
                        <p class="card-text"><strong>Salário Médio:</strong> ${item.salario_medio}</p>
                        <p class="card-text"><strong>Formação:</strong> ${item.nivel_formacao}</p>
                        <p class="card-text"><strong>Mercado:</strong> ${item.mercado_trabalho}</p>
                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-primary btn-sm" onclick="window.location.href='profissao_alterar.html?id_profissao=${item.id_profissao}'">Alterar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluir(${item.id_profissao})">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    document.getElementById("lista").innerHTML = html;
}
