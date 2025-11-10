<?php
    session_start();

    if (isset($_SESSION['email'])) {
        $retorno = [
            'status'        => 'ok',
            'mensagem'      => '',
            'data'          => []
        ];

    } else {
        $retorno = [
            'status'        => 'No',
            'mensagem'      => '',
            'data'          => []
        ];

    }

    header("Content-type: application/json;charset=utf-8");
    echo json_encode($retorno);
