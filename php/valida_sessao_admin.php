<?php
    session_start();

    // A mágica está aqui: verifica o TIPO de usuário
    if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm') {
        $retorno = [
            'status'        => 'ok',
            'mensagem'      => 'Admin logado.',
            'data'          => []
        ];

    } else {
        // Se não for 'adm', manda sair
        $retorno = [
            'status'        => 'No',
            'mensagem'      => 'Acesso não autorizado.',
            'data'          => []
        ];

    }

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);