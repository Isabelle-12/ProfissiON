const form = document.querySelector("#formulario");

form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const nomeinput = document.querySelector("#nome");
    const datainput = document.querySelector("#data");
    const sobrenomeinput = document.querySelector("#sobrenome");
    const emailinput = document.querySelector("#email");
    const celularinput = document.querySelector("#celular");
    const opcaoinput = document.querySelector("#opcao");
    const cepinput = document.querySelector("#cep");
    const bairroinput = document.querySelector("#bairro");
    const ruainput = document.querySelector("#rua");
    

    localStorage.setItem("name",nomeinput.value);
    localStorage.setItem("data",datainput.value);
    localStorage.setItem("sobrenome",sobrenomeinput.value);
    localStorage.setItem("email",emailinput.value);
    localStorage.setItem("celular",celularinput.value);
    localStorage.setItem("opcao",opcaoinput.value);
    localStorage.setItem("cep",cepinput.value);
    localStorage.setItem("bairro",bairroinput.value);
    localStorage.setItem("rua",ruainput.value);

    nomeinput.value= "";
    datainput.value= "";
    sobrenomeinput.value= "";
    emailinput.value= "";
    celularinput.value= "";
    opcaoinput.value= "";
    cepinput.value= "";
    bairroinput.value= "";
    ruainput.value= "";
    

});

