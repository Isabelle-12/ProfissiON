<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];

// Verifica se o usuário está logado e se o ID e o comentário foram enviados
if (isset($_SESSION['id_conta']) && isset($_POST['id_quiz_vocacional']) && isset($_POST['comentarios_usuario'])) {

    $id_conta = (int)$_SESSION['id_conta'];
    $id_quiz = (int)$_POST['id_quiz_vocacional'];
    $comentario = $_POST['comentarios_usuario'];

    // Garante que APENAS o dono da conta possa alterar o registro
    $stmt = $conexao->prepare(
        "UPDATE quiz_vocacional 
         SET comentarios_usuario = ? 
         WHERE id_quiz_vocacional = ? AND id_conta = ?"
    );
    $stmt->bind_param("sii", $comentario, $id_quiz, $id_conta);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $retorno = ["status" => "Ok", "mensagem" => "Comentário atualizado."];
        } else {
            $retorno = ["status" => "No", "mensagem" => "Nenhum dado modificado ou ID inválido/não pertencente ao usuário."];
        }
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "Erro de execução: " . $stmt->error];
    }
    $stmt->close();
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);