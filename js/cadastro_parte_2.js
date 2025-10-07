const form2 = document.querySelector("#formulario_2");

form2.addEventListener("submit", async (e)=> {
    e.preventDefault();

    const senha = document.querySelector("#senha").value;
    const confirmar = document.querySelector("#confirmar_senha").value;


    if (senha !== confirmar){
        alert("As senhas não coincidem");
        return;
    }

    const dadosparciais = JSON.parse(localStorage.getItem("parcial"));
    dadosparciais.senha = senha;

    const fd = new FormData();
    for (let chave in dadosparciais){
        fd.append(chave,dadosparciais[chave]);
    }

    const resposta = await fetch("php/cadastro.php",{
        method: "POST",
        body: fd

    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    localStorage.removeItem("parcial");
    window.location.href = 'Login.html';

});