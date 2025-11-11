<?php
include_once("conexao.php");

$id_forum = $_POST['id_forum'] ?? 0;

$retorno = ["status" => "", "mensagem" => ""];

$stmt = $conexao->prepare("DELETE FROM forum WHERE id_forum = ?");
$stmt->bind_param("i", $id_forum);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Tópico excluído com sucesso!";
} else {
    $retorno["status"] = "Erro";
    $retorno["mensagem"] = "Falha ao excluir (tópico não encontrado?).";
}

$stmt->close();
$conexao->close();

header('Content-Type: application/json');
echo json_encode($retorno);
?>