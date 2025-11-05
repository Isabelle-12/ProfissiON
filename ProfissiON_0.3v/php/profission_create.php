<?php
include_once("conexao.php");

// Inicialização do Array
$retorno = [
    "status"    => "",
    "mensagem"  => "",
    "data"      => []
];

$nome       = $_POST['nome'];
$email      = $_POST['email'];
$senha      = $_POST ['senha'];

$stmt = $conexao -> prepare("INSERT INTO conta (nome,email,senha) values (?,?,?)");
$stmt -> bind_param("sss",$nome,$email,$senha);
$stmt -> execute();

if($stmt ->affected_rows > 0){
    $retorno = [
        "status"    => "Ok",
        "mensagem"  => $stmt->affected_rows."Registro inserido. ",
        "data"      => []
    ];
}else{
    $retorno = [
        "status"    => "No",
        "mensagem"  => "0 registros inseridos",
        "data"      => []
    ];
}

$stmt -> close();


header("Content-type: application/json;charset:utf-8"); 
echo json_encode($retorno);