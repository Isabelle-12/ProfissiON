document.addEventListener("DOMContentLoaded", () =>{
    const url = new URLSearchParams(window.location.search);
    var id = url.get('id_conta');
    if(id){
        fase1(id);
    }else{
        alert("É necessário ao menos informar um ID");
    }
});

async function fase1(id_conta){
    const retorno = await fetch("../php/profission_get.php?id_conta=" + id_conta);
    const resposta = await retorno.json();

    if(resposta.status == "Ok"){
        alert("Sucesso!" + resposta.mensagem);
        const reg = resposta.data[0];
        document.getElementById("nome").value                   =reg.nome;
        document.getElementById("email").value                  =reg.email;
        document.getElementById("senha").value                  =reg.senha;
        document.getElementById("data_nascimento").value        =reg.data_nascimento;
        document.getElementById("endereco").value               =reg.endereco;
        document.getElementById("telefone").value               =reg.telefone;
        document.getElementById("id_conta").value               =id_conta;
    }else{
        alert("Erro!" + resposta.mensagem);
    }
}

document.getElementById("salvar").addEventListener(
    "click", function(){
        fase2();
    }
);

async function fase2(){
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var data_nascimento = document.getElementById("data_nascimento").value;
    var endereco = document.getElementById("endereco").value;
    var telefone = document.getElementById("telefone").value;
    var id_conta = document.getElementById("id_conta").value;

    if(nome.length > 0 && email.length > 0 && senha.length > 0 && data_nascimento.length > 0 && endereco.length > 0 && telefone.length > 0 ){
        const fd = new FormData();
        fd.append("nome",nome);
        fd.append("email",email);
        fd.append("senha",senha);
        fd.append("data_nascimento",data_nascimento);
        fd.append("endereco",endereco);
        fd.append("telefone",telefone);

        const retorno = await fetch("../php/profission_alterar.php?id_conta=" + id_conta,{
            method:"POST",
            body: fd
        });
        const resposta = await retorno.json();
        if(resposta.status == "Ok"){
            alert("Sucesso!" + resposta.mensagem);
            window.location.href = "../html/home_logado.html";
        }else{
            alert("Erro!" + resposta.mensagem);
        }
    }else{
        alert("É necessario preencher todos os campos");
    }
    
}