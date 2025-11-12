<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];


if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm') {

   
    $nome  = isset($_POST['nome']) ? $_POST['nome'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $senha = isset($_POST['senha']) ? $_POST['senha'] : ''; 

    if (empty($nome) || empty($email) || empty($senha)) {
        $retorno = ["status" => "Erro", "mensagem" => "Todos os campos (nome, email, senha) são obrigatórios."];
    } else {
        
       
        $stmt_conta = $conexao->prepare("INSERT INTO conta (nome, email, senha) VALUES (?, ?, ?)");
        $stmt_conta->bind_param("sss", $nome, $email, $senha);
        
        if ($stmt_conta->execute()) {
            if ($stmt_conta->affected_rows > 0) {
               
                $novo_id_conta = $conexao->insert_id;

                
                $stmt_usuario = $conexao->prepare("INSERT INTO usuario (tipo_usuario, id_conta) VALUES ('adm', ?)");
                $stmt_usuario->bind_param("i", $novo_id_conta);
                
                if ($stmt_usuario->execute()) {
                    $retorno = ["status" => "Ok", "mensagem" => "Novo administrador criado com sucesso!"];
                } else {
                    $retorno = ["status" => "Erro", "mensagem" => "Conta criada, mas falha ao definir como admin: " . $stmt_usuario->error];
                }
                $stmt_usuario->close();

            } else {
                $retorno = ["status" => "Erro", "mensagem" => "Nenhum registro inserido na tabela conta."];
            }
        } else {
            
            if ($conexao->errno == 1062) { 
                $retorno = ["status" => "Erro", "mensagem" => "Erro: Este e-mail já está cadastrado."];
            } else {
                $retorno = ["status" => "Erro", "mensagem" => "Erro ao inserir na conta: " . $stmt_conta->error];
            }
        }
        $stmt_conta->close();
    }
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);