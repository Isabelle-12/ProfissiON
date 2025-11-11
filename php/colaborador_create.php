<?php
include_once("conexao.php");
header('Content-Type: application/json');

$retorno = ["status" => "Erro", "mensagem" => "Falha ao criar."];

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$cargo = $_POST['cargo'] ?? '';
$departamento = $_POST['departamento'] ?? '';
$dataAdmissao = $_POST['dataAdmissao'] ?? '';
$status = $_POST['status'] ?? '';
$nivelAcesso = $_POST['nivelAcesso'] ?? '';

if (empty($nome) || empty($email) || empty($senha) || empty($dataAdmissao)) {
    $retorno["mensagem"] = "Todos os campos obrigatórios devem ser preenchidos.";
    echo json_encode($retorno);
    $conexao->close();
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conexao->prepare("INSERT INTO colaborador 
    (nome_completo, email, senha, cargo, departamento, data_admissao, status_colaborador, nivel_acesso) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssssss", 
    $nome, $email, $senhaHash, $cargo, $departamento, $dataAdmissao, $status, $nivelAcesso
);

if ($stmt->execute()) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Colaborador criado com sucesso!";
} else {
    $retorno["mensagem"] = "Erro ao criar: " . $stmt->error;
}

$stmt->close();
$conexao->close();
echo json_encode($retorno);
?>