<?php
include_once("conexao.php");

$stmt = $conexao->prepare ("SELECT * FROM conta WHERE email = ? and senha = ?");
$stmt -> bind_param ("ss",$_POST['email'], $_POST['senha']);
$stmt->execute();

$resultado = $stmt->get_result();

$tabela = [];

$retorno = [
    "status"    => "",
    "mensagem"  => "",
    "data"      => []
];

if($resultado->num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }

    $retorno = [
        "status"    => "Ok",
        "mensagem"  => "Logadando",
        "data"      => $tabela
    ];

    session_start();
    $_SESSION['email'] = $tabela[0];

}else{
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