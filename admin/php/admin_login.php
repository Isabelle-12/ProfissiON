<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset= utf-8");

$arquivo = "admin.json"; 
$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if (!file_exists($arquivo)) {
    echo json_encode(["status" => "erro", "mensagem" => "Arquivo de administradores não encontrado."]);
    exit;
}

$admins_json = file_get_contents($arquivo);
if ($admins_json === false) {
    echo json_encode(["status" => "erro", "mensagem" => "Não foi possível ler o arquivo de administradores."]);
    exit;
}

$admins = json_decode($admins_json, true);

if ($admins === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao decodificar JSON de administradores."]);
    exit;
}

foreach ($admins as $admin) {
    if ($admin["email"] == $email && $admin["senha"] == $senha) {
        echo json_encode(["status" => "Ok", "mensagem" => "Login de Admin bem-sucedido", "usuario" => $admin]);
        exit;
    }
}

echo json_encode(["status" => "erro", "mensagem" => "E-mail ou senha de funcionário inválidos"]);
?>