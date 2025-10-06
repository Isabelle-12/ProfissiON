const form2 = document.querySelector("#formulario_2");

form2.addEventListener("submit", (e)=> {
    e.preventDefault();

    const senha = document.querySelector("#senha").value;
    const confirmar = document.querySelector("#confirmar_senha").value;


    const dadosparciais = JSON.parse(localStorage.getItem("parcial"));
    dadosparciais.senha = senha;

    const listausuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listausuarios.push(dadosparciais);

    localStorage.setItem("usuarios", JSON.stringify(listausuarios));

    localStorage.removeItem("usuario")
    window.location.href = 'home.html';

});