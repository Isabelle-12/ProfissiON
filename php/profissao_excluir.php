<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '', 
        'mensagem'  => '', 
        'data'      => []
    ];

    if(isset($_GET['id_profissao'])){
        $stmt = $conexao->prepare("DELETE FROM profissao WHERE id_profissao = ?");
        $stmt->bind_param('i',$_GET['id_profissao']);
        $stmt->execute();

        if($stmt -> affected_rows > 0){
            $retorno = [
                'status'    => 'ok', 
                'mensagem'  => 'Registro Excluido', 
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'No', 
                'mensagem'  => 'Registro não excluido', 
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'No', 
            'mensagem'  => 'Informe um ID', 
            'data'      => []
        ];
    }
    $conexao->close();
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);