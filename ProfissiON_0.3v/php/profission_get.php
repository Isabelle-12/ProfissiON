<?php
include_once("conexao.php");

if (isset($_GET['id_conta'])){
    $id = $_GET['id_conta'];
    $stmt = $conexao->prepare("SELECT * FROM conta where id_conta =?");
    $stmt->bind_param("i",$id);
}else{
    $stmt = $conexao->prepare("SELECT * FROM conta");
}

$stmt -> execute();
$resultado = $stmt->get_result();

$tabela = [];

$retorno = [
    "status"    => "",
    "mensagem"  =>"",
    "data"      => []
];

if($resultado -> num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] =$linha;
    }
    $retorno = [
        "status"    => "Ok",
        "mensagem"  =>"Registros de usuario carregados com sucesso",
        "data"      => $tabela
    ];
}else{
    $retorno = [
        "status"    => "Erro",
        "mensagem"  =>"Não encontrou nenhum registro de usuario",
        "data"      => []
    ];
}

$stmt->close();
$conexao->close();
    
header("Content-type: application/json;charset:utf-8"); 
echo json_encode($retorno);