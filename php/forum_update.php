<?php
// session_start(); // Não precisamos mais de sessão
include_once("conexao.php");

$id_forum = $_POST['id_forum'] ?? 0;
$titulo = $_POST['nome'] ?? '';
$conteudo = $_POST['conteudo'] ?? '';

$retorno = ["status" => "", "mensagem" => ""];

// MODIFICADO: Removemos a checagem 'AND id_usuario = ?'
$stmt = $conexao->prepare("UPDATE forum SET titulo = ?, conteudo_inicial = ? WHERE id_forum = ?");
$stmt->bind_param("ssi", $titulo, $conteudo, $id_forum);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Tópico atualizado com sucesso!";
} else {
    $retorno["status"] = "Erro";
    $retorno["mensagem"] = "Falha ao atualizar (tópico não encontrado?).";
}

$stmt->close();
$conexao->close();

header('Content-Type: application/json');
echo json_encode($retorno);
?>