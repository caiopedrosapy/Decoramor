const form = document.getElementById("formAvaliacao");
const lista = document.getElementById("listaAvaliacoes");


// ==============================
// CARREGAR AVALIAÇÕES
// ==============================

function carregarAvaliacoes() {

    const avaliacoes =
        JSON.parse(localStorage.getItem("avaliacoes")) || [];

    lista.innerHTML = "";

    avaliacoes.forEach(avaliacao => {

        mostrarAvaliacao(avaliacao);

    });
}


// ==============================
// MOSTRAR AVALIAÇÃO
// ==============================

function mostrarAvaliacao(avaliacao) {

    const nova = document.createElement("div");

    nova.className = "avaliacao";

    nova.innerHTML = `
        <h4>${avaliacao.nome}</h4>

        <p>
            ${"⭐".repeat(avaliacao.nota)}
        </p>

        <p>
            ${avaliacao.comentario}
        </p>

        <small>
            ${avaliacao.data}
        </small>
    `;

    lista.appendChild(nova);
}


// ==============================
// ENVIAR AVALIAÇÃO
// ==============================

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const nome =
        document.getElementById("nome").value;

    const comentario =
        document.getElementById("comentario").value;

    const nota =
        Number(document.getElementById("nota").value);


    const novaAvaliacao = {

        nome: nome,

        comentario: comentario,

        nota: nota,

        data: new Date().toLocaleDateString("pt-BR")

    };


    // Buscar avaliações existentes

    const avaliacoes =
        JSON.parse(localStorage.getItem("avaliacoes")) || [];


    // Adicionar nova avaliação

    avaliacoes.unshift(novaAvaliacao);


    // Salvar no navegador

    localStorage.setItem(
        "avaliacoes",
        JSON.stringify(avaliacoes)
    );


    // Atualizar tela

    carregarAvaliacoes();


    // Limpar formulário

    form.reset();


    alert("Avaliação enviada com sucesso!");

});


// ==============================
// INICIAR
// ==============================

carregarAvaliacoes();
