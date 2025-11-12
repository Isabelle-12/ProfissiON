
async function valida_sessao_admin(){

    const retorno = await fetch ("../php/valida_sessao_admin.php");
    const resposta = await retorno.json();

    if(resposta.status == "No"){
        window.location.href = "../html/admin_login.html";
    }
};

valida_sessao_admin();