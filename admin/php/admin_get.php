<?php
session_start(); // TEM QUE SER A PRIMEIRA LINHA
include_once("conexao.php");

// Define um retorno padrão de erro
$retorno = ["status" => "No", "mensagem" => "Nenhum usuário logado", "data" => []];

// 1. Verifica se o ID do usuário existe na SESSÃO
if (isset($_SESSION['id_conta']) && !empty($_SESSION['id_conta'])) {

    $id_conta = $_SESSION['id_conta']; // Pega o ID da SESSÃO

    // 2. Prepara e executa a busca no banco
    // (Não selecione a senha para enviar ao front-end)
    $stmt = $conexao->prepare("SELECT nome, email, data_nascimento, endereco, telefone FROM conta WHERE id_conta = ?");
    $stmt->bind_param("i", $id_conta);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        // Encontrou o usuário
        $dados = $resultado->fetch_all(MYSQLI_ASSOC);
        $retorno = ["status" => "Ok", "mensagem" => "Dados carregados com sucesso", "data" => $dados];
    } else {
        // O ID da sessão é inválido (raro, mas pode acontecer)
        $retorno = ["status" => "No", "mensagem" => "Usuário não encontrado no banco de dados"];
    }
    $stmt->close();
}
// Se não houver ID na sessão, ele simplesmente retorna a mensagem de erro padrão.

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);
