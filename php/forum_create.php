<?php
// session_start(); // Não precisamos mais de sessão aqui
include_once("conexao.php");

// Pega os dados do POST
$titulo = $_POST['nome'] ?? '';
$conteudo = $_POST['conteudo'] ?? '';

if (empty($titulo) || empty($conteudo)) {
    echo json_encode(["status" => "Erro", "mensagem" => "Nome e conteúdo são obrigatórios"]);
    exit;
}

$retorno = ["status" => "", "mensagem" => ""];

// MODIFICADO: Estamos inserindo NULL no id_usuario
$stmt = $conexao->prepare("INSERT INTO forum (titulo, conteudo_inicial, id_usuario) VALUES (?, ?, NULL)");
$stmt->bind_param("ss", $titulo, $conteudo); // Só bindamos os dois strings

if ($stmt->execute()) {
    $retorno["status"] = "Ok";
    $retorno["mensagem"] = "Tópico criado com sucesso!";
} else {
    $retorno["status"] = "Erro";
    $retorno["mensagem"] = "Erro ao criar tópico: " . $stmt->error;
}

$stmt->close();
$conexao->close();

header('Content-Type: application/json');
echo json_encode($retorno);
?>