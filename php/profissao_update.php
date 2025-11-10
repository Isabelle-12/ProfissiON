<?php
include_once('conexao.php');

$retorno = [
    'status'    => '',
    'mensagem'  => '',
    'data'      => []
];


if(isset($_POST['id_profissao'])){

    $id_profissao          = (int) $_POST['id_profissao'];
    $nome_profissao        = $_POST['nome_profissao'];
    $descricao             = $_POST['descricao'];
    $area                  = $_POST['area'];
    $nivel_formacao        = $_POST['nivel_formacao'];
    $salario_medio         = $_POST['salario_medio'];
    $mercado_trabalho      = $_POST['mercado_trabalho'];
    

    $stmt = $conexao->prepare("UPDATE profissao SET nome_profissao = ?, descricao = ?, area = ?, nivel_formacao = ?, salario_medio = ?, mercado_trabalho = ? WHERE id_profissao = ?");
    $stmt->bind_param("ssssssi", $nome_profissao, $descricao, $area, $nivel_formacao, $salario_medio, $mercado_trabalho, $id_profissao);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status'    => 'ok',
            'mensagem'  => 'Registro Alterado com Sucesso',
            'data'      => []
        ];
    } else {
        $retorno = [
            'status'    => 'no',
            'mensagem'  => 'Nenhuma alteração realizada ou ID não encontrado.',
            'data'      => []
        ];
    }

    $stmt->close();

} else {
    $retorno = [
        'status'    => 'no',
        'mensagem'  => 'ID da profissão não informado.',
        'data'      => []
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);
