<?php

// Declaração das variáveis do Servidor
$servidor = "localhost:3306";
$usuario  = "root";
$senha    = "familiaisabelle";
$nome_banco = "profission";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);

if($conexao->connect_error){
    echo $conexao->connect_error;
}