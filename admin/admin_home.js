document.addEventListener("DOMContentLoaded", function () {
    const sessao = JSON.parse(localStorage.getItem("sessao"));
    
    if (!sessao || sessao.tipo !== 'admin') {
        alert("Acesso negado. Redirecionando para login...");
        window.location.href = "Login.html";
        return;
    }

    function loadMasterData(sessao) {
        const fetchUsuarios = fetch('../php/usuarios.json')
            .then(response => {
                if (!response.ok) {
                    console.warn("Não foi possível carregar o usuarios.json do servidor. Tentando localStorage.");
                    return JSON.parse(localStorage.getItem("usuarios")) || [];
                }
                return response.json();
            });

        const fetchAdmins = fetch('../admins.json')
            .then(response => {
                if (!response.ok) {
                    console.warn("Não foi possível carregar o admins.json do servidor. Tentando localStorage.");
                    return JSON.parse(localStorage.getItem("admins")) || [];
                }
                return response.json();
            });

        Promise.all([fetchUsuarios, fetchAdmins])
            .then(([usuariosMaster, adminsMaster]) => {
                localStorage.setItem("usuarios", JSON.stringify(usuariosMaster));
                localStorage.setItem("admins", JSON.stringify(adminsMaster));
                
                iniciarHomeAdmin(sessao, usuariosMaster, adminsMaster);
            })
            .catch(error => {
                console.error("Erro ao carregar arquivos JSON:", error);
                const usuariosFallback = JSON.parse(localStorage.getItem("usuarios")) || [];
                const adminsFallback = JSON.parse(localStorage.getItem("admins")) || [];
                iniciarHomeAdmin(sessao, usuariosFallback, adminsFallback);
                alert("Ocorreu um erro ao buscar os dados mestres. Usando dados locais.");
            });
    }

    function iniciarHomeAdmin(sessao, usuarios, admins) {
        
        if (sessao.nome) {
            document.getElementById("usuario_nome1").textContent = sessao.nome;
            document.getElementById("usuario_nome_card").textContent = sessao.nome;
            document.getElementById("Email_usuario").textContent = sessao.email;
        }

        function salvarUsuarios(novosUsuarios) {
            localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));
            usuarios = novosUsuarios; 
        }
        
        function salvarAdmins(novosAdmins) {
            localStorage.setItem("admins", JSON.stringify(novosAdmins));
            admins = novosAdmins;
        }

        function atualizarUsuario(emailUsuario, novosDados, is_admin = false) {
            const lista = is_admin ? admins : usuarios;
            const index = lista.findIndex(u => u.email === emailUsuario);
            
            if (index !== -1) {
                lista[index] = { ...lista[index], ...novosDados };
                
                if (is_admin) {
                    salvarAdmins(admins);
                    if (emailUsuario === sessao.email) {
                        localStorage.setItem("sessao", JSON.stringify(lista[index]));
                    }
                } else {
                    salvarUsuarios(usuarios);
                }
                
                alert(`Dados de ${emailUsuario} atualizados!`);
                renderizarListaUsuariosAdmin();
            }
        }

        function excluirUsuario(emailUsuario, is_admin = false) {
            const lista = is_admin ? admins : usuarios;
            const novosUsuarios = lista.filter(u => u.email !== emailUsuario);
            
            if (is_admin) {
                salvarAdmins(novosUsuarios);
                if (emailUsuario === sessao.email) {
                    localStorage.removeItem("sessao");
                    alert("Sua conta de ADMIN foi excluída!");
                    window.location.href = "Login.html";
                }
            } else {
                salvarUsuarios(novosUsuarios);
            }

            alert(`Usuário ${emailUsuario} excluído!`);
            renderizarListaUsuariosAdmin();
        }

        document.getElementById("botaoEditarProprio").onclick = function () {
            const novoNome = prompt(`Editar nome de ${sessao.nome}:`, sessao.nome);
            if (novoNome) {
                atualizarUsuario(sessao.email, { nome: novoNome }, true);
                document.getElementById("usuario_nome_card").textContent = novoNome;
                document.getElementById("usuario_nome1").textContent = novoNome;
            }
        };

        document.getElementById("botaoSair").onclick = function () {
            localStorage.removeItem("sessao");
            window.location.href = "Login.html";
        };

        function renderizarListaUsuariosAdmin() {
            const lista = document.getElementById("lista-usuarios-admin");
            lista.innerHTML = ''; 

            const usuariosComuns = usuarios.filter(user => user.tipo !== 'admin' && user.email !== sessao.email); 

            usuariosComuns.forEach(user => {
                const li = document.createElement('li');
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                
                li.innerHTML = `
                    <span>
                        <strong>${user.nome || "Nome Indisponível"}</strong> - ${user.email}
                    </span>
                    <div>
                        <button class="btn btn-sm btn-info me-2 btn-editar-admin" data-email="${user.email}">Editar</button>
                        <button class="btn btn-sm btn-danger btn-excluir-admin" data-email="${user.email}">Excluir</button>
                    </div>
                `;

                li.querySelector('.btn-editar-admin')?.addEventListener('click', (e) => {
                    const emailToEdit = e.currentTarget.dataset.email;
                    const userToEdit = usuarios.find(u => u.email === emailToEdit);
                    const novoNome = prompt(`Editar nome de ${userToEdit.nome}:`, userToEdit.nome);
                    if (novoNome) {
                        atualizarUsuario(emailToEdit, { nome: novoNome }, false); 
                    }
                });

                li.querySelector('.btn-excluir-admin')?.addEventListener('click', (e) => {
                    const emailToDelete = e.currentTarget.dataset.email;
                    if (confirm(`Tem certeza que deseja EXCLUIR o usuário ${emailToDelete}?`)) {
                        excluirUsuario(emailToDelete, false);
                    }
                });

                lista.appendChild(li);
            });
            
            if (usuariosComuns.length === 0) {
                 lista.innerHTML = '<li class="list-group-item">Nenhum usuário comum cadastrado (ou o arquivo usuarios.json está vazio).</li>';
            }
        }
        
        renderizarListaUsuariosAdmin();
    }
    
    loadMasterData(sessao);
});