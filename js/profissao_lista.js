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
        preencherTabela(resposta.data);
    }
}

function preencherTabela(tabela){
    var html = `
        <table class="tabela-profissao">
            <thead>
                <tr>
                    <th> Nome </th>
                    <th> Área </th>
                    <th> Descrição </th>
                    <th> Salário Médio </th>
                    <th> Formação </th>
                    <th> Mercado </th>
                    <th> # </th>
                </tr>
            </thead>
            <tbody>`;

    for(var i = 0; i < tabela.length; i++){
        html += `
            <tr>
                <td>${tabela[i].nome_profissao}</td>
                <td>${tabela[i].area}</td>
                <td>${tabela[i].descricao}</td>
                <td>${tabela[i].salario_medio}</td>
                <td>${tabela[i].nivel_formacao}</td>
                <td>${tabela[i].mercado_trabalho}</td>
                <td>
                    <button class="btn-acao btn-alterar" onclick="window.location.href='profissao_alterar.html?id=${tabela[i].id_profissao}'">Alterar</button>
                    <button class="btn-acao btn-excluir" onclick="excluir(${tabela[i].id_profissao})">Excluir</button>
                </td>
            </tr>`;
    }

    html += `
            </tbody>
        </table>`;

    document.getElementById("lista").innerHTML = html;
}
