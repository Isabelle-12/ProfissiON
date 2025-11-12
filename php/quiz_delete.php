<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];


if (isset($_SESSION['id_conta']) && isset($_POST['id_quiz_vocacional'])) {

    $id_conta = (int)$_SESSION['id_conta'];
    $id_quiz = (int)$_POST['id_quiz_vocacional'];

    $stmt = $conexao->prepare(
        "DELETE FROM quiz_vocacional 
         WHERE id_quiz_vocacional = ? AND id_conta = ?"
    );
    $stmt->bind_param("ii", $id_quiz, $id_conta);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $retorno = ["status" => "Ok", "mensagem" => "Resultado do quiz excluído."];
        } else {
            $retorno = ["status" => "No", "mensagem" => "Nenhum registro encontrado ou ID inválido/não pertencente ao usuário."];
        }
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "Erro de execução: " . $stmt->error];
    }
    $stmt->close();
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);