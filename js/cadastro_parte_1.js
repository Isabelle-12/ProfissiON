const form = document.querySelector("#formulario");

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    
    const lista ={
        nome : document.querySelector("#nome"). value,
        data : document.querySelector("#data"). value,
        sobrenome : document.querySelector("#sobrenome"). value,
        email : document.querySelector("#email"). value,
        celular : document.querySelector("#celular"). value,
        cep : document.querySelector("#cep"). value,
        bairro : document.querySelector("#bairro"). value,
        rua : document.querySelector("#rua"). value

    };
    localStorage.setItem("parcial", JSON.stringify(lista));
    window.location.href = 'cadastro_parte_2.html';
    
});






