// Este JS é quase idêntico ao seu, mas chama o PHP de admin
async function valida_sessao_admin(){
    // Chama o novo PHP
    const retorno = await fetch ("../php/valida_sessao_admin.php");
    const resposta = await retorno.json();

    if(resposta.status == "No"){
        // Se não for admin, expulsa para o LOGIN DE ADMIN
        window.location.href = "../html/admin_login.html";
    }
};

// Executa a validação assim que o script é carregado
valida_sessao_admin();