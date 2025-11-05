<?php
// Inicia a sessão antes de qualquer saída
session_start();
include_once("conexao.php");

$stmt = $conexao->prepare("SELECT * FROM conta WHERE email = ? and senha = ?");
$stmt->bind_param("ss", $_POST['email'], $_POST['senha']);
$stmt->execute();

$resultado = $stmt->get_result();

$tabela = [];

$retorno = [
    "status"    => "",
    "mensagem"  => "",
    "data"      => []
];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }

    // Preenche a sessão com campos específicos (id_conta e email)
    $_SESSION['email'] = $tabela[0]['email'];
    // Alguns registros podem nomear a PK diferente; assumimos 'id_conta' conforme uso em profission_get.php
    if (isset($tabela[0]['id_conta'])) {
        $_SESSION['id_conta'] = (int)$tabela[0]['id_conta'];
    }

    $retorno = [
        "status"    => "Ok",
        "mensagem"  => "Logando",
        "data"      => $tabela
    ];
} else {
    $retorno = [
        "status"    => "Erro",
        "mensagem"  => "Registro não encontrado",
        "data"      => []
    ];
}
$stmt->close();
$conexao->close();

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);
