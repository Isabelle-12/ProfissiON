<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado.", "data" => []];


if (isset($_SESSION['id_conta'])) {
    
    $id_conta = (int)$_SESSION['id_conta'];

 
    $stmt = $conexao->prepare(
        "SELECT id_quiz_vocacional, data_realizacao, resultado, comentarios_usuario 
         FROM quiz_vocacional 
         WHERE id_conta = ? 
         ORDER BY data_realizacao DESC"
    );
    $stmt->bind_param("i", $id_conta);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $dados = $resultado->fetch_all(MYSQLI_ASSOC);
        $retorno = ["status" => "Ok", "mensagem" => "Resultados carregados", "data" => $dados];
    } else {
        $retorno = ["status" => "No", "mensagem" => "Nenhum resultado encontrado", "data" => []];
    }
    $stmt->close();

}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);