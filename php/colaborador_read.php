<?php
include_once("conexao.php");
header('Content-Type: application/json');

$retorno = ["status" => "Ok", "dados" => []];

$sql = "SELECT id_colaborador, nome_completo, email, cargo, departamento, data_admissao, status_colaborador, nivel_acesso 
        FROM colaborador ORDER BY nome_completo";

$resultado = $conexao->query($sql);

$colaboradores = [];
if ($resultado && $resultado->num_rows > 0) {
    while($linha = $resultado->fetch_assoc()) {
        $colaboradores[] = $linha;
    }
    $retorno["dados"] = $colaboradores;
} else {
    $retorno["status"] = "Aviso";
    $retorno["mensagem"] = "Nenhum colaborador encontrado.";
}

$conexao->close();
echo json_encode($retorno);
?>