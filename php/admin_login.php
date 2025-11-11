<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Credenciais inválidas"];

if (isset($_POST['email']) && isset($_POST['senha'])) {
    
    $email = $_POST['email'];
    $senha = $_POST['senha']; // Lembre-se, estamos comparando em texto puro

    // 1. Prepara a query com JOIN
    // Nós buscamos a 'conta' E o 'tipo_usuario' na mesma query.
    $stmt = $conexao->prepare(
        "SELECT c.id_conta, c.email, c.nome, u.tipo_usuario 
         FROM conta c 
         LEFT JOIN usuario u ON c.id_conta = u.id_conta 
         WHERE c.email = ? AND c.senha = ?"
    );
    
    $stmt->bind_param("ss", $email, $senha);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $linha = $resultado->fetch_assoc();

        // 2. Verifica se o tipo de usuário é 'adm'
        if ($linha['tipo_usuario'] === 'adm') {
            
            // 3. Usuário é um admin. Criamos a sessão.
            $_SESSION['id_conta'] = (int)$linha['id_conta'];
            $_SESSION['email'] = $linha['email'];
            $_SESSION['nome'] = $linha['nome']; // Útil para o painel
            $_SESSION['tipo_usuario'] = 'adm'; // O mais importante!

            $retorno = ["status" => "Ok", "mensagem" => "Login de admin bem-sucedido"];
            
        } else {
            // Encontrou a conta, mas não é admin
            $retorno = ["status" => "Erro", "mensagem" => "Acesso negado. Esta conta não é de administrador."];
        }
    } else {
        // Não encontrou a conta (email/senha errados)
        $retorno = ["status" => "Erro", "mensagem" => "E-mail ou senha incorretos."];
    }
    $stmt->close();
} else {
    $retorno = ["status" => "Erro", "mensagem" => "Dados de login não fornecidos."];
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);