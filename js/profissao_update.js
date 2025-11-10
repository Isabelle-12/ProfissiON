document.addEventListener("DOMContentLoaded", () =>{
    valida_sessao();

    const url = new URLSearchParams(window.location.search);
    const id_profissao = url.get("id_profissao") || url.get("id");

    
    if (!id_profissao) {
        alert("ID da profissão não informado!");
        window.location.href = "../html/profissao.html"; 
        return;
    }

    document.getElementById("edit-profissao-id").value = id_profissao;
    buscar(id_profissao);

})

async function buscar(id_profissao){
    const retorno = await fetch("../php/profissao_get.php?id_profissao="+id_profissao);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso: " + resposta.mensagem);
        var registro = resposta.data[0];
        document.getElementById("edit_nome").value      = registro.nome_profissao;
        document.getElementById("edit_descricao").value = registro.descricao;
        document.getElementById("edit_area").value      = registro.area;
        document.getElementById("edit_salario").value   = registro.salario_medio;
        document.getElementById("edit_formacao").value  = registro.nivel_formacao;
        document.getElementById("edit_mercado").value   = registro.mercado_trabalho;
        document.getElementById("edit-profissao-id").value = id_profissao;

    }else{
        alert("ERRO: " + resposta.mensagem);
        window.location.href = "../html/profissao.html";
    }
}

document.getElementById("salvar").addEventListener("click", alterar);

async function alterar() {
    var edit_nome       = document.getElementById("edit_nome").value;
    var edit_descricao  = document.getElementById("edit_descricao").value;
    var edit_area       = document.getElementById("edit_area").value;
    var edit_salario    = document.getElementById("edit_salario").value;
    var edit_formacao   = document.getElementById("edit_formacao").value;
    var edit_mercado    = document.getElementById("edit_mercado").value;
    var id_profissao    = document.getElementById("edit-profissao-id").value;

    const fd = new FormData();
    fd.append("nome_profissao", edit_nome);
    fd.append("descricao", edit_descricao);
    fd.append("area", edit_area);
    fd.append("salario_medio", edit_salario);
    fd.append("nivel_formacao", edit_formacao);
    fd.append("mercado_trabalho", edit_mercado);
    fd.append("id_profissao", id_profissao); 


    const retorno = await fetch("../php/profissao_update.php", {
        method: "POST",
        body: fd
    });

    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = '../html/profissao.html';
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
