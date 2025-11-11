<?php
include_once("conexao.php");
header('Content-Type: application/json');

$retorno = ["status" => "Erro", "mensagem" => "Falha ao atualizar."];

$id = $_POST['id_colaborador'] ?? 0;
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$cargo = $_POST['cargo'] ?? '';
$departamento = $_POST['departamento'] ?? '';
$dataAdmissao = $_POST['dataAdmissao'] ?? '';
$status = $_POST['status'] ?? '';
$nivelAcesso = $_POST['nivelAcesso'] ?? '';

if (empty($id)) {
    $retorno["mensagem"] = "ID do colaborador não fornecido.";
    echo json_encode($retorno);
    $conexao->close();
    exit;
}

$stmt = $conexao->prepare("UPDATE colaborador SET 
    nome_completo = ?, email = ?, cargo = ?, departamento = ?, 
    data_admissao = ?, status_colaborador = ?, nivel_acesso = ? 
    WHERE id_colaborador = ?");

$stmt->bind_param("sssssssi", 
    $nome, $email, $cargo, $departamento, $dataAdmissao, $status, $nivelAcesso, $id
);

if ($stmt->execute()) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Colaborador atualizado com sucesso!";
} else {
    $retorno["mensagem"] = "Erro ao atualizar: " . $stmt->error;
}

$stmt->close();
$conexao->close();
echo json_encode($retorno);
?>