<?php
session_start(); // TEM QUE SER A PRIMEIRA LINHA
include_once("conexao.php");

$retorno = ["status" => "No", "mensagem" => "Ocorreu um erro inesperado"];

// 1. Verifica se o usuário está logado (via SESSÃO)
if (isset($_SESSION['id_conta'])) {

    $id_conta = $_SESSION['id_conta']; // Pega o ID da SESSÃO

    // Pega os dados do formulário
    $nome = isset($_POST['nome']) ? $_POST['nome'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $data_nascimento = isset($_POST['data_nascimento']) ? $_POST['data_nascimento'] : '';
    $endereco = isset($_POST['endereco']) ? $_POST['endereco'] : '';
    $telefone = isset($_POST['telefone']) ? $_POST['telefone'] : '';
    $nova_senha = isset($_POST['nova_senha']) ? $_POST['nova_senha'] : '';

    // Opcional: verifique se o usuário existe
    $stmt_exist = $conexao->prepare("SELECT id_conta FROM conta WHERE id_conta = ?");
    $stmt_exist->bind_param("i", $id_conta);
    $stmt_exist->execute();
    $res_exist = $stmt_exist->get_result();
    if ($res_exist->num_rows === 0) {
        $retorno = ["status" => "No", "mensagem" => "Usuário não encontrado."];
        $stmt_exist->close();
    } else {
        $stmt_exist->close();

        // 2. Monta a query de atualização conforme alteração de senha
        if (!empty($nova_senha)) {
            $nova_senha_hash = password_hash($nova_senha, PASSWORD_DEFAULT);
            $stmt_update = $conexao->prepare("UPDATE conta SET nome = ?, email = ?, data_nascimento = ?, endereco = ?, telefone = ?, senha = ? WHERE id_conta = ?");
            $stmt_update->bind_param("ssssssi", $nome, $email, $data_nascimento, $endereco, $telefone, $nova_senha_hash, $id_conta);
        } else {
            $stmt_update = $conexao->prepare("UPDATE conta SET nome = ?, email = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id_conta = ?");
            $stmt_update->bind_param("sssssi", $nome, $email, $data_nascimento, $endereco, $telefone, $id_conta);
        }

        // 3. Executa a atualização
        if ($stmt_update->execute()) {
            if ($stmt_update->affected_rows > 0) {
                $retorno = ["status" => "Ok", "mensagem" => "Perfil alterado com sucesso!"];
            } else {
                $retorno = ["status" => "No", "mensagem" => "Nenhum dado foi modificado."];
            }
        } else {
            $retorno = ["status" => "No", "mensagem" => "Erro ao executar a atualização: " . $stmt_update->error];
        }
        $stmt_update->close();
    }
} else {
    // Não está logado
    $retorno = ["status" => "No", "mensagem" => "Usuário não logado."];
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);
