const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SEU_SUPABASE";
const SUPABASE_KEY = "COLE_AQUI_A_CHAVE_ANON_DO_SEU_SUPABASE";

const form = document.getElementById("formAvaliacao");
const lista = document.getElementById("listaAvaliacoes");

// Carregar avaliações quando abrir o site
carregarAvaliacoes();


// ===============================
// ENVIAR AVALIAÇÃO
// ===============================

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;
    const nota = document.getElementById("nota").value;

    try {

        const resposta = await fetch(
            `${SUPABASE_URL}/rest/v1/avaliacoes`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify({
                    nome: nome,
                    comentario: comentario,
                    nota: Number(nota)
                })
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao enviar avaliação.");
        }

        alert("Avaliação enviada com sucesso!");

        form.reset();

        carregarAvaliacoes();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível enviar a avaliação.");
    }

});


// ===============================
// CARREGAR AVALIAÇÕES
// ===============================

async function carregarAvaliacoes() {

    try {

        const resposta = await fetch(
            `${SUPABASE_URL}/rest/v1/avaliacoes?select=*&order=data_avaliacao.desc`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao carregar avaliações.");
        }

        const avaliacoes = await resposta.json();

        lista.innerHTML = "";

        avaliacoes.forEach(avaliacao => {

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
                    ${formatarData(avaliacao.data_avaliacao)}
                </small>
            `;

            lista.appendChild(nova);

        });

    } catch (erro) {

        console.error(erro);

        lista.innerHTML =
            "<p>Não foi possível carregar as avaliações.</p>";
    }

}


// ===============================
// FORMATAR DATA
// ===============================

function formatarData(data) {

    const dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString("pt-BR");
}
