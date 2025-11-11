document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const tabelaCorpo = document.getElementById("tabela-corpo");
    const submitButton = form.querySelector('button[type="submit"]');
    const formSubmitWrapper = submitButton.parentElement;
    const senhaInput = document.getElementById('senha');


    async function listarColaboradores() {
        try {

            const response = await fetch("../php/colaborador_read.php");
            const result = await response.json();

            tabelaCorpo.innerHTML = "";

            if (result.status === "Ok" && result.dados.length > 0) {
                result.dados.forEach(col => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${col.nome_completo}</td>
                        <td>${col.email}</td>
                        <td>${col.cargo}</td>
                        <td>${col.departamento}</td>
                        <td>${formatarData(col.data_admissao)}</td>
                        <td>${col.status_colaborador}</td>
                        <td>${col.nivel_acesso}</td>
                        <td>
                            <button class="btn btn-sm btn-warning btn-editar" 
                                data-id="${col.id_colaborador}"
                                data-nome="${col.nome_completo}"
                                data-email="${col.email}"
                                data-cargo="${col.cargo}"
                                data-depto="${col.departamento}"
                                data-admissao="${col.data_admissao}"
                                data-status="${col.status_colaborador}"
                                data-nivel="${col.nivel_acesso}"
                            >Editar</button>
                            <button class="btn btn-sm btn-danger btn-excluir" data-id="${col.id_colaborador}">Excluir</button>
                        </td>
                    `;
                    tabelaCorpo.appendChild(tr);
                });
            } else {
                tabelaCorpo.innerHTML = '<tr><td colspan="8" class="text-center">Nenhum colaborador cadastrado.</td></tr>';
            }

        } catch (error) {
            console.error("Erro ao listar:", error);
            alert("Falha ao carregar dados da tabela.");
        }
    }


    async function criarColaborador(formData) {
        try {

            const response = await fetch("../php/colaborador_create.php", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            alert(result.mensagem);

            if (result.status === "Ok") {
                resetarFormulario();
                listarColaboradores();
            }
        } catch (error) {
            console.error("Erro em ../php/colaborador_create.php:", error);
            alert("Falha na comunicação com o servidor ao criar.");
        }
    }


    async function atualizarColaborador(formData) {
        try {
            const response = await fetch("../php/colaborador_update.php", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            alert(result.mensagem);

            if (result.status === "Ok") {
                resetarFormulario();
                listarColaboradores();
            }
        } catch (error) {
            console.error("Erro em ../php/colaborador_update.php:", error);
            alert("Falha na comunicação com o servidor ao atualizar.");
        }
    }


    async function excluirColaborador(id) {
        if (!confirm("Tem certeza que deseja excluir este colaborador?")) {
            return;
        }

        const formData = new FormData();
        formData.append('id_colaborador', id);

        try {

            const response = await fetch("../php/colaborador_delete.php", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            alert(result.mensagem);

            if (result.status === "Ok") {
                listarColaboradores();
            }
        } catch (error) {
            console.error("Erro em ../php/colaborador_delete.php:", error);
            alert("Falha na comunicação com o servidor ao excluir.");
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const hiddenId = form.querySelector('input[name="id_colaborador"]');

        if (hiddenId && hiddenId.value) {
            atualizarColaborador(formData);
        } else {
            criarColaborador(formData);
        }
    });

    tabelaCorpo.addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("btn-excluir")) {
            excluirColaborador(target.dataset.id);
        }


        if (target.classList.contains("btn-editar")) {
            const data = target.dataset;
            document.getElementById('nome').value = data.nome;
            document.getElementById('email').value = data.email;
            document.getElementById('cargo').value = data.cargo;
            document.getElementById('departamento').value = data.depto;
            document.getElementById('dataAdmissao').value = data.admissao;
            document.getElementById('status').value = data.status;
            document.getElementById('nivelAcesso').value = data.nivel;

            let idField = form.querySelector('input[name="id_colaborador"]');
            if (!idField) {
                idField = document.createElement('input');
                idField.type = 'hidden';
                idField.name = 'id_colaborador';
                form.appendChild(idField);
            }
            idField.value = data.id;

            senhaInput.style.display = 'none';
            senhaInput.required = false;
            submitButton.innerText = "Atualizar Colaborador";

            let cancelButton = form.querySelector('#btn-cancelar-edicao');
            if (!cancelButton) {
                cancelButton = document.createElement('button');
                cancelButton.type = 'button';
                cancelButton.id = 'btn-cancelar-edicao';
                cancelButton.innerText = 'Cancelar';
                cancelButton.className = 'btn btn-secondary ms-2';
                cancelButton.addEventListener('click', resetarFormulario);
                formSubmitWrapper.appendChild(cancelButton);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });


    function resetarFormulario() {
        form.reset();
        senhaInput.style.display = 'block';
        senhaInput.required = true;
        submitButton.innerText = "Criar Colaborador";

        const idField = form.querySelector('input[name="id_colaborador"]');
        if (idField) idField.remove();

        const cancelButton = form.querySelector('#btn-cancelar-edicao');
        if (cancelButton) cancelButton.remove();
    }

    function formatarData(dataDB) {
        if (!dataDB) return '';
        const [ano, mes, dia] = dataDB.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    listarColaboradores();
});