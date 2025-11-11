<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado."];

// 1. Verifica se quem está logado é um ADMIN
if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm') {

    // 2. Pega os dados do POST
    $nome  = isset($_POST['nome']) ? $_POST['nome'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $senha = isset($_POST['senha']) ? $_POST['senha'] : ''; // Senha em texto puro, como no seu create

    if (empty($nome) || empty($email) || empty($senha)) {
        $retorno = ["status" => "Erro", "mensagem" => "Todos os campos (nome, email, senha) são obrigatórios."];
    } else {
        
        // 3. Insere na tabela 'conta'
        $stmt_conta = $conexao->prepare("INSERT INTO conta (nome, email, senha) VALUES (?, ?, ?)");
        $stmt_conta->bind_param("sss", $nome, $email, $senha);
        
        if ($stmt_conta->execute()) {
            if ($stmt_conta->affected_rows > 0) {
                // 4. Pega o ID da conta que acabamos de criar
                $novo_id_conta = $conexao->insert_id;

                // 5. Insere na tabela 'usuario' com tipo 'adm'
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
            // Verifica se é erro de e-mail duplicado
            if ($conexao->errno == 1062) { // 1062 = Erro de chave única duplicada
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