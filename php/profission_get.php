<?php
session_start(); 
include_once("conexao.php");

$retorno = ["status" => "No", "mensagem" => "Nenhum usuário logado", "data" => []];

if (isset($_SESSION['id_conta']) && !empty($_SESSION['id_conta'])) {

    $id_conta = $_SESSION['id_conta'];

    $stmt = $conexao->prepare("SELECT nome, email, data_nascimento, endereco, telefone FROM conta WHERE id_conta = ?");
    $stmt->bind_param("i", $id_conta);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $dados = $resultado->fetch_all(MYSQLI_ASSOC);
        $retorno = ["status" => "Ok", "mensagem" => "Dados carregados com sucesso", "data" => $dados];
    } else {
        $retorno = ["status" => "No", "mensagem" => "Usuário não encontrado no banco de dados"];
    }
    $stmt->close();
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);
