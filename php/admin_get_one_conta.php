<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];


if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm' && isset($_GET['id_conta'])) {

    $id_para_buscar = (int)$_GET['id_conta'];


    $stmt = $conexao->prepare("SELECT id_conta, nome, email, data_nascimento, endereco, telefone FROM conta WHERE id_conta = ?");
    $stmt->bind_param("i", $id_para_buscar);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $dados = $resultado->fetch_all(MYSQLI_ASSOC);
        $retorno = ["status" => "Ok", "mensagem" => "Dados carregados", "data" => $dados];
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "Usuário não encontrado."];
    }
    $stmt->close();
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);