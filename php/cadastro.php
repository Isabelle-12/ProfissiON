<?php

header("Content-Type: application/json; charset=utf-8");


$arquivo = "usuarios.json";

$novoUsuario = $_POST;
if (file_exists($arquivo)) {
    $dados = json_decode(file_get_contents($arquivo), true);
} else {
    $dados = [];
}
$dados[] = $novoUsuario;

file_put_contents($arquivo, json_encode($dados, JSON_PRETTY_PRINT));

echo json_encode(["status" => "ok", "mensagem" => "Usuario cadastrado com sucesso!"]);
