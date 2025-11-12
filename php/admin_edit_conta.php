<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado ou dados incompletos."];


if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm') {

    
    $id_conta_para_alterar = isset($_POST['id_conta']) ? (int)$_POST['id_conta'] : 0;
    $nome = isset($_POST['nome']) ? $_POST['nome'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $data_nascimento = isset($_POST['data_nascimento']) ? $_POST['data_nascimento'] : '';
    $endereco = isset($_POST['endereco']) ? $_POST['endereco'] : '';
    $telefone = isset($_POST['telefone']) ? $_POST['telefone'] : '';

    if ($id_conta_para_alterar > 0) {
        
       
        $stmt_check = $conexao->prepare("SELECT id_conta FROM conta WHERE email = ? AND id_conta != ?");
        $stmt_check->bind_param("si", $email, $id_conta_para_alterar);
        $stmt_check->execute();
        $resultado_check = $stmt_check->get_result();
        
        if ($resultado_check->num_rows > 0) {
            
            $retorno = ["status" => "Erro", "mensagem" => "Erro: O e-mail '$email' já está em uso por outra conta."];
            $stmt_check->close();
        } else {
            
            $stmt_check->close();

            
            $stmt_update = $conexao->prepare(
                "UPDATE conta SET nome = ?, email = ?, data_nascimento = ?, endereco = ?, telefone = ? 
                 WHERE id_conta = ?"
            );
            $stmt_update->bind_param("sssssi", $nome, $email, $data_nascimento, $endereco, $telefone, $id_conta_para_alterar);

            if ($stmt_update->execute()) {
                if ($stmt_update->affected_rows > 0) {
                    $retorno = ["status" => "Ok", "mensagem" => "Perfil alterado com sucesso! (Incluindo o e-mail)"];
                } else {
                    $retorno = ["status" => "No", "mensagem" => "Nenhum dado foi modificado."];
                }
            } else {
                
                $retorno = ["status" => "Erro", "mensagem" => "Erro ao executar a atualização: " . $stmt_update->error];
            }
            $stmt_update->close();
        }
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "ID da conta para alterar não foi fornecido."];
    }
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);