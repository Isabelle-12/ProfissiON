<?php
include_once("conexao.php");

$retorno = [
    "status"    => "",
    "mensagem"  =>"",
    "data"      => []
];

if (isset($_GET['id_conta'])){
    $id = $_GET['id_conta'];
    $stmt = $conexao->prepare("DELETE FROM conta where id_conta =?");
    $stmt->bind_param("i",$id);
    $stmt-> execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            "status"    => "Ok",
            "mensagem"  => $stmt->affected_rows."Registros Modificados.",
            "data"      => []
        ];
    }else{
        $retorno = [
            "status"    => "No",
            "mensagem"  => "O registros Modificados.",
            "data"      => []
        ];
    }
    $stmt->close();
}else{
    $retorno = [
        "status"    => "No",
        "mensagem"  =>"Necessario informar um ID para excluir",
        "data"      => []
    ];
}

$conexao->close();
header("Content-type: application/json;charset:utf-8"); 
echo json_encode($retorno);