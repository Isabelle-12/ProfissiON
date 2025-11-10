document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();

    document.getElementById("form-profissao").addEventListener("submit", (e) => {
        e.preventDefault();     
        profissao();
    });
});



async function profissao(){
    var nome_profissao      = document.getElementById("nome_profissao").value;
    var descricao           = document.getElementById("descricao").value;
    var area                = document.getElementById("area").value;
    var salario_medio       = document.getElementById("salario_medio").value;
    var nivel_formacao      = document.getElementById("nivel_formacao").value;
    var mercado_trabalho    = document.getElementById("mercado_trabalho").value;
    
    const fd = new FormData();
    fd.append("nome_profissao",nome_profissao);
    fd.append("descricao",descricao);
    fd.append("area",area);
    fd.append("salario_medio",salario_medio);
    fd.append("nivel_formacao",nivel_formacao);
    fd.append("mercado_trabalho",mercado_trabalho);

    const retorno = await fetch("../php/profissao_novo.php",{
            method: 'POST',
            body: fd
        });

    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = '../html/profissao.html';
    }else{
        alert("ERRO: " + resposta.mensagem);
    }
}