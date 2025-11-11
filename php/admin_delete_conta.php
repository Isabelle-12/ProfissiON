<?php
session_start();
include_once("conexao.php");

$retorno = ["status" => "Erro", "mensagem" => "Acesso não autorizado ou ID não fornecido."];

// VERIFICA SE É ADMIN E SE O ID FOI ENVIADO
if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] === 'adm' && isset($_POST['id_conta'])) {

    $id_para_excluir = (int)$_POST['id_conta'];

    // Impede o admin de excluir a si mesmo (segurança mínima)
    if ($id_para_excluir === (int)$_SESSION['id_conta']) {
        $retorno = ["status" => "Erro", "mensagem" => "Você não pode excluir sua própria conta de administrador."];
    } else {
        
        // Excluir da tabela 'usuario' primeiro (devido à Foreign Key)
        $stmt_user = $conexao->prepare("DELETE FROM usuario WHERE id_conta = ?");
        $stmt_user->bind_param("i", $id_para_excluir);
        $stmt_user->execute();
        // Não verificamos o affected_rows aqui, pois a conta pode nem estar em 'usuario'
        $stmt_user->close();

        // Agora, excluir da tabela 'conta'
        $stmt_conta = $conexao->prepare("DELETE FROM conta WHERE id_conta = ?");
        $stmt_conta->bind_param("i", $id_para_excluir);
        $stmt_conta->execute();
        
        if ($stmt_conta->affected_rows > 0) {
            $retorno = ["status" => "Ok", "mensagem" => "Conta excluída com sucesso."];
        } else {
            $retorno = ["status" => "Erro", "mensagem" => "Conta não encontrada ou já excluída."];
        }
        $stmt_conta->close();
    }
} else {
    if (!isset($_SESSION['tipo_usuario']) || $_SESSION['tipo_usuario'] !== 'adm') {
        $retorno = ["status" => "Erro", "mensagem" => "Usuário não é administrador."];
    }
}

$conexao->close();
header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);