const form = document.getElementById("formAvaliacao");
const lista = document.getElementById("listaAvaliacoes");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;
    const nota = document.getElementById("nota").value;

    const nova = document.createElement("div");

    nova.className = "avaliacao";

    nova.innerHTML = `
        <h4>${nome}</h4>
        <p>${nota}</p>
        <p>${comentario}</p>
    `;

    lista.prepend(nova);

    form.reset();

});
