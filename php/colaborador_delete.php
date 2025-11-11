<?php
include_once("conexao.php");
header('Content-Type: application/json');

$retorno = ["status" => "Erro", "mensagem" => "Falha ao excluir."];

$id = $_POST['id_colaborador'] ?? 0;

if (empty($id)) {
    $retorno["mensagem"] = "ID do colaborador não fornecido.";
    echo json_encode($retorno);
    $conexao->close();
    exit;
}

$stmt = $conexao->prepare("DELETE FROM colaborador WHERE id_colaborador = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Colaborador excluído com sucesso!";
} else {
    $retorno["mensagem"] = "Erro ao excluir: " . $stmt->error;
}

$stmt->close();
$conexao->close();
echo json_encode($retorno);
?>