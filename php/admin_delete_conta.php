<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado ou ID não fornecido."];


if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm' && isset($_POST['id_conta'])) {

    $id_para_excluir = (int)$_POST['id_conta'];

    
    if ($id_para_excluir === (int)$_SESSION['id_conta']) {
        $retorno = ["status" => "Erro", "mensagem" => "Você não pode excluir sua própria conta de administrador."];
    } else {
        
        
        $stmt_quiz = $conexao->prepare("DELETE FROM quiz_vocacional WHERE id_conta = ?");
        $stmt_quiz->bind_param("i", $id_para_excluir);
        $stmt_quiz->execute();
        $stmt_quiz->close();

        $stmt_user = $conexao->prepare("DELETE FROM usuario WHERE id_conta = ?");
        $stmt_user->bind_param("i", $id_para_excluir);
        $stmt_user->execute();
        $stmt_user->close();

        
        $stmt_conta = $conexao->prepare("DELETE FROM conta WHERE id_conta = ?");
        $stmt_conta->bind_param("i", $id_para_excluir);
        $stmt_conta->execute();
        
        if ($stmt_conta->affected_rows > 0) {
            $retorno = ["status" => "Ok", "mensagem" => "Conta (e todos os seus dados associados) excluída com sucesso."];
        } else {
            $retorno = ["status" => "Erro", "mensagem" => "Conta não encontrada ou já excluída."];
        }
        $stmt_conta->close();
    }
} else {
    if (!isset($_SESSION['tipo_usuario']) || $_SESSION['tipo_usuario'] !== 'adm') {
        $retorno = ["status" => "Erro", "mensagem" => "Usuário não é administrador."];
    }
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);