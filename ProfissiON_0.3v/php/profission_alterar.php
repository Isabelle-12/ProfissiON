<?php
include_once("conexao.php");

// Inicialização do Array
$retorno = [
    "status"    => "",
    "mensagem"  => "",
    "data"      => []
];

if (isset($_GET['id_conta'])){

    $nome       = $_POST['nome'];
    $email       = $_POST['email'];
    $senha       = $_POST['senha'];
    $data_nascimento    = $_POST['data_nascimento'];
    $endereco       = $_POST['endereco'];
    $telefone       = $_POST['telefone'];
    $id_conta       =$_GET['id_conta'];

    $stmt = $conexao->prepare("UPDATE conta SET nome = ?, email = ?,senha = ?,data_nascimento = ?, endereco =?, telefone =? WHERE id_conta = ?");
    $stmt->bind_param("ssssssi", $nome, $email, $senha, $data_nascimento, $endereco, $telefone, $id_conta);
    $stmt ->execute();

    if($stmt -> affected_rows > 0){
        $retorno = [
            "status"    => "Ok",
            "mensagem"  => $stmt->affected_rows."Registro Alterado",
            "data"      => []
        ];
    }else{
        $retorno = [
            "status"    => "No",
            "mensagem"  => "O Registros Alterados",
            "data"      => []
        ];
    }

    $stmt -> close();
}else{
    $retorno = [
        "status"    => "No",
        "mensagem"  => "É necessario informar um ID",
        "data"      => []
    ];
}

$conexao->close();

header("Content-type: application/json;charset:utf-8"); 
echo json_encode($retorno);