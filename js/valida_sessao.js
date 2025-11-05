async function valida_sessao(){
    const retorno = await fetch ("../php/valida_sessao.php");
    const resposta = await retorno.json();
    if(resposta.status == "No"){
        // Ajuste para o nome real do arquivo na pasta html
        window.location.href = "../html/Login.html";
    }
};