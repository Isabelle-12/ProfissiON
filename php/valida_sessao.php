<?php
    session_start();

    if(isset($_SESSION['email'])){
        $status = "Ok";
    }else{
        $status = "No";
    }

    $retorno = [
        'status'        => $status,
        'mensagem'      => '',
        'data'          => []
    ];

    header("Content-type: application/json;charset:utf-8"); 
    echo json_encode($retorno);