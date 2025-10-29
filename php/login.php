<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset= utf-8");

$arquivo = "usuarios.json";
$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if (!file_exists($arquivo)) {
    echo json_encode(["status" => "erro", "mensagem" => "Nenhum usuario cadastrado"]);
    exit;
}

$usuarios = json_decode(file_get_contents($arquivo), true);

foreach ($usuarios as $usuario) {
    if ($usuario["email"] == $email && $usuario["senha"] == $senha) {
        echo json_encode(["status" => "Ok", "mensagem" => "Login bem-sucedido", "usuario" => $usuario]);
        exit;
    }
}

echo json_encode(["status" => "erro", "mensagem" => "Usuario ou senha inválidos"]);
