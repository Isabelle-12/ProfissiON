<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '', 
        'mensagem'  => '', 
        'data'      => []
    ];

    $nome_profissao         = $_POST['nome_profissao'];
    $descricao              = $_POST['descricao'];
    $area                   = $_POST['area'];
    $nivel_formacao         = $_POST['nivel_formacao'];
    $salario_medio          = $_POST['salario_medio'];
    $mercado_trabalho       = $_POST['mercado_trabalho'];

    $stmt = $conexao->prepare("INSERT INTO profissao(nome_profissao,descricao,area,nivel_formacao,salario_medio,mercado_trabalho) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("ssssss",$nome_profissao,$descricao,$area,$nivel_formacao,$salario_medio,$mercado_trabalho);
    $stmt->execute();

    if($stmt -> affected_rows > 0){
        $retorno = [
            'status'    => 'ok', 
            'mensagem'  => 'Registro inserido com sucesso', 
            'data'      => []
        ];
    }else{
        $retorno = [
            'status'    => 'No', 
            'mensagem'  => 'Falha ao inserir registro', 
            'data'      => []
        ];
    }

    $stmt -> close();
    $conexao -> close();
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);