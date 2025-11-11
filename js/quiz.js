// Estrutura do Quiz (10 Perguntas)
const perguntas = [
    {
        pergunta: "1. Você se sente mais motivado(a) por...",
        opcoes: {
            A: { texto: "A) Lidar com o sofrimento e a saúde das pessoas.", area: "Medicina" },
            B: { texto: "B) Argumentar e resolver conflitos por meio da lógica.", area: "Direito" },
            C: { texto: "C) Criar softwares, aplicativos e solucionar problemas digitais.", area: "Tecnologia da Informação" },
            D: { texto: "D) Projetar estruturas físicas e organizar grandes projetos.", area: "Engenharia Civil" }
        }
    },
    {
        pergunta: "2. Em um dia livre, você prefere...",
        opcoes: {
            A: { texto: "A) Fazer trabalho voluntário ou visitar amigos/família.", area: "Psicologia" },
            B: { texto: "B) Ler um livro sobre história, política ou filosofia.", area: "Direito" },
            C: { texto: "C) Aprender sobre uma nova tecnologia ou linguagem de programação.", area: "Tecnologia da Informação" },
            D: { texto: "D) Desenhar, pintar ou trabalhar em um projeto visual.", area: "Design Gráfico" }
        }
    },
    {
        pergunta: "3. Qual disciplina escolar você mais se destacava?",
        opcoes: {
            A: { texto: "A) Biologia e Química.", area: "Medicina" },
            B: { texto: "B) Sociologia e História.", area: "Direito" },
            C: { texto: "C) Matemática e Física.", area: "Tecnologia da Informação" },
            D: { texto: "D) Geometria e Artes.", area: "Engenharia Civil" }
        }
    },
    {
        pergunta: "4. Qual a sua reação ao ver um problema complexo?",
        opcoes: {
            A: { texto: "A) Busco entender as emoções envolvidas e confortar.", area: "Psicologia" },
            B: { texto: "B) Analiso as regras, busco precedentes e defino o culpado.", area: "Direito" },
            C: { texto: "C) Divido o problema em pequenas partes e busco um algoritmo.", area: "Tecnologia da Informação" },
            D: { texto: "D) Visualizo a solução final e planejo os passos para chegar lá.", area: "Engenharia Civil" }
        }
    },
    {
        pergunta: "5. Se você fosse iniciar um projeto, qual seria sua principal preocupação?",
        opcoes: {
            A: { texto: "A) O bem-estar das pessoas afetadas.", area: "Medicina" },
            B: { texto: "B) A legalidade e os contratos do projeto.", area: "Direito" },
            C: { texto: "C) A eficiência e a funcionalidade do código.", area: "Tecnologia da Informação" },
            D: { texto: "D) A estética e a usabilidade visual.", area: "Design Gráfico" }
        }
    }
    // Para 10 perguntas, adicione mais 5 objetos de pergunta aqui
];

const pontos = {
    "Medicina": 0,
    "Direito": 0,
    "Tecnologia da Informação": 0,
    "Psicologia": 0,
    "Engenharia Civil": 0,
    "Design Gráfico": 0
};

let resultadoFinalArea = "";
let resultadoIdSalvo = null; // ID do registro recém-criado para salvar o comentário

document.addEventListener("DOMContentLoaded", () => {
    // valida_sessao() é chamado no HTML
    iniciarQuiz();
    carregarResultadosAnteriores();

    document.getElementById("btn-finalizar-quiz").addEventListener("click", finalizarQuiz);
    document.getElementById("btn-salvar-comentario").addEventListener("click", salvarComentario);
});

// =========================================================
// LÓGICA DO QUIZ
// =========================================================

function iniciarQuiz() {
    const quizArea = document.getElementById("quiz-area");
    quizArea.innerHTML = ''; // Limpa a área

    perguntas.forEach((p, index) => {
        const divPergunta = document.createElement('div');
        divPergunta.className = 'mb-4 p-3 border rounded';
        divPergunta.innerHTML = `<p class="fw-bold">${p.pergunta}</p>`;

        Object.entries(p.opcoes).forEach(([chave, info]) => {
            const inputId = `p${index}-${chave}`;
            divPergunta.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="pergunta-${index}" id="${inputId}" data-area="${info.area}">
                    <label class="form-check-label" for="${inputId}">
                        ${info.texto}
                    </label>
                </div>
            `;
        });
        quizArea.appendChild(divPergunta);
    });
    
    // Adiciona o listener para contar as respostas
    quizArea.addEventListener('change', verificarRespostas);
}

function verificarRespostas() {
    const todasRespondidas = perguntas.every((_, index) => {
        return document.querySelector(`input[name="pergunta-${index}"]:checked`);
    });

    const btnFinalizar = document.getElementById("btn-finalizar-quiz");
    if (todasRespondidas) {
        btnFinalizar.style.display = 'block';
    } else {
        btnFinalizar.style.display = 'none';
    }
}

function calcularResultado() {
    // Zera os pontos
    Object.keys(pontos).forEach(area => pontos[area] = 0); 
    
    // Conta os pontos
    perguntas.forEach((_, index) => {
        const resposta = document.querySelector(`input[name="pergunta-${index}"]:checked`);
        if (resposta) {
            const areaVotada = resposta.dataset.area;
            pontos[areaVotada]++;
        }
    });

    // Encontra a área com a maior pontuação
    let areaVencedora = "Indefinida";
    let maxPontos = -1;
    
    for (const area in pontos) {
        if (pontos[area] > maxPontos) {
            maxPontos = pontos[area];
            areaVencedora = area;
        } else if (pontos[area] === maxPontos) {
            // Caso de empate (mantém a área já definida)
            areaVencedora = "Empate/Múltiplas Áreas"; 
        }
    }
    
    return areaVencedora;
}

async function finalizarQuiz() {
    resultadoFinalArea = calcularResultado();
    
    // 1. Salva o resultado preliminar (sem comentário)
    const fd = new FormData();
    fd.append("resultado", resultadoFinalArea);
    
    const retorno = await fetch("../php/quiz_create.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status === "Ok") {
        resultadoIdSalvo = resposta.id_quiz_vocacional; // Pega o ID para o comentário
        document.getElementById("resultado-final-modal").textContent = resultadoFinalArea;
        
        // Exibe o modal para o comentário
        const modal = new bootstrap.Modal(document.getElementById('modalComentario'));
        modal.show();
    } else {
        alert("Erro ao salvar resultado: " + resposta.mensagem);
    }
}

async function salvarComentario() {
    const comentario = document.getElementById("inputComentario").value;

    if (!resultadoIdSalvo) {
        alert("Erro: Resultado não foi salvo. Tente refazer o quiz.");
        return;
    }

    const fd = new FormData();
    fd.append("id_quiz_vocacional", resultadoIdSalvo);
    fd.append("comentarios_usuario", comentario);

    // Usa o script de UPDATE do CRUD
    const retorno = await fetch("../php/quiz_update_comment.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status === "Ok") {
        alert("Comentário salvo com sucesso!");
        // Oculta o modal e recarrega a lista
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalComentario'));
        modal.hide();
        carregarResultadosAnteriores();
        
        // Reinicia o quiz (opcional)
        iniciarQuiz();
        document.getElementById("btn-finalizar-quiz").style.display = 'none';

    } else {
        alert("Erro ao salvar comentário: " + resposta.mensagem);
    }
}

// =========================================================
// LÓGICA DO CRUD (READ, UPDATE, DELETE)
// =========================================================

async function carregarResultadosAnteriores() {
    const listaUl = document.getElementById("lista-resultados");
    listaUl.innerHTML = '<li class="list-group-item text-center text-muted">Buscando resultados...</li>';

    const retorno = await fetch("../php/quiz_get_all.php");
    const resposta = await retorno.json();

    if (resposta.status === "Ok") {
        listaUl.innerHTML = "";
        resposta.data.forEach(reg => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="badge bg-primary">${reg.resultado}</span>
                        <br>
                        <small class="text-muted">${formatarData(reg.data_realizacao)}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-info me-2" 
                                onclick="iniciarEdicaoComentario(${reg.id_quiz_vocacional}, '${reg.comentarios_usuario}')">
                            Editar Comentário
                        </button>
                        <button class="btn btn-sm btn-danger" 
                                onclick="excluirResultado(${reg.id_quiz_vocacional})">
                            Excluir
                        </button>
                    </div>
                </div>
                <p class="mt-2 mb-0 border-top pt-2">
                    Comentário: <span id="comentario-${reg.id_quiz_vocacional}">${reg.comentarios_usuario || 'Nenhum comentário.'}</span>
                </p>
            `;
            listaUl.appendChild(li);
        });
    } else if (resposta.status === "No") {
        listaUl.innerHTML = '<li class="list-group-item text-center text-info">Nenhum quiz realizado ainda.</li>';
    } else {
        listaUl.innerHTML = `<li class="list-group-item text-danger">Erro ao carregar: ${resposta.mensagem}</li>`;
    }
}

function formatarData(data) {
    const d = new Date(data);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

// UPDATE: Inicia a Edição do Comentário
function iniciarEdicaoComentario(id, comentarioAtual) {
    const novoComentario = prompt("Edite seu comentário para o resultado:", comentarioAtual);
    
    if (novoComentario !== null) { // Se o usuário não clicou em cancelar
        salvarNovoComentario(id, novoComentario);
    }
}

async function salvarNovoComentario(id, novoComentario) {
    const fd = new FormData();
    fd.append("id_quiz_vocacional", id);
    fd.append("comentarios_usuario", novoComentario);

    const retorno = await fetch("../php/quiz_update_comment.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status === "Ok") {
        alert("Comentário atualizado com sucesso!");
        // Atualiza o texto na lista sem recarregar tudo (UX)
        document.getElementById(`comentario-${id}`).textContent = novoComentario || 'Nenhum comentário.';
    } else {
        alert("Erro ao atualizar: " + resposta.mensagem);
    }
}

// DELETE: Excluir Resultado
async function excluirResultado(id) {
    if (!confirm("Tem certeza que deseja excluir este resultado do quiz?")) {
        return;
    }

    const fd = new FormData();
    fd.append("id_quiz_vocacional", id);

    const retorno = await fetch("../php/quiz_delete.php", {
        method: "POST", // DELETE via POST
        body: fd
    });
    
    const resposta = await retorno.json();

    if (resposta.status === "Ok") {
        alert("Resultado excluído com sucesso!");
        carregarResultadosAnteriores(); // Recarrega a lista
    } else {
        alert("Erro ao excluir: " + resposta.mensagem);
    }
}