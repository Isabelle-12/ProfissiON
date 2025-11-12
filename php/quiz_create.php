<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];


if (isset($_SESSION['id_conta'])) {

    $id_conta = (int)$_SESSION['id_conta'];
    $resultado = $_POST['resultado'] ?? 'N/A';
    $data_realizacao = date('Y-m-d H:i:s');


    $comentarios_usuario = ""; 

    $stmt = $conexao->prepare(
        "INSERT INTO quiz_vocacional (id_conta, data_realizacao, resultado, comentarios_usuario) 
         VALUES (?, ?, ?, ?)"
    );
    $stmt->bind_param("isss", $id_conta, $data_realizacao, $resultado, $comentarios_usuario);
    
    if ($stmt->execute()) {
        $novo_id = $conexao->insert_id;
        $retorno = [
            "status" => "Ok", 
            "mensagem" => "Resultado do quiz salvo.", 
            "id_quiz_vocacional" => $novo_id
        ];
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "Erro ao salvar: " . $stmt->error];
    }
    $stmt->close();
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);