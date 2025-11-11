<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado.", "data" => []];

// VERIFICA SE O USUÁRIO LOGADO É ADMIN
if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm') {
    
    // Se é admin, busca TODAS as contas
    // Selecionamos apenas dados não sensíveis (sem senha)
    $stmt = $conexao->prepare(
        "SELECT id_conta, nome, email, data_nascimento, endereco, telefone 
         FROM conta 
         ORDER BY nome ASC"
    );
    
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $dados = $resultado->fetch_all(MYSQLI_ASSOC);
        $retorno = ["status" => "Ok", "mensagem" => "Contas carregadas", "data" => $dados];
    } else {
        $retorno = ["status" => "No", "mensagem" => "Nenhuma conta encontrada", "data" => []];
    }
    $stmt->close();

} else {
    // Se não for admin, retorna o erro padrão
    $retorno = ["status" => "Erro", "mensagem" => "Usuário não é administrador."];
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);