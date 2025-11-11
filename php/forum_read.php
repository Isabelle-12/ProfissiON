<?php
include_once("conexao.php");

$retorno = [
    "status" => "Ok",
    "mensagem" => "Tópicos carregados",
    "data" => []
];

$sql = "SELECT id_forum, titulo, conteudo_inicial, data_criacao 
        FROM forum
        ORDER BY data_criacao DESC";

$resultado = $conexao->query($sql);

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $retorno["data"][] = $linha;
    }
}

$conexao->close();

header('Content-Type: application/json');
echo json_encode($retorno);
?>