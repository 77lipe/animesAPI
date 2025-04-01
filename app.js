'use strict'

console.log("Buscando dados...");
// fetch("https://kitsu.io/api/edge/anime?filter[categories]=adventure")
//   .then(response => response.json())
//   .then(data => {
//     console.log("Dados recebidos:", data);
//   })
//   .catch(error => console.error("Erro na API:", error));

const barraPesquisa = document.getElementById('input')
const botaoPesquisa = document.getElementById('btn')
const galeria = document.getElementById('galeria')
const content = document.getElementById('full-content')


async function pesquisarAnimes(category) {
    const response = await fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${category}`);
    const dados = await response.json();
    return dados.data; // Retornar os animes encontrados
}


function criarCard(anime) {
    const container = document.getElementById('list-animes')
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.id = anime.id; // Adicionando ID do anime ao card

    const imagem = document.createElement('img');
    imagem.src = anime.attributes.posterImage?.tiny

    const nome = document.createElement('h2')
   nome.textContent = anime.attributes.canonicalTitle


   const link = document.createElement('p');
   link.textContent = "Ver mais..."; // Texto informativo para o usuário
   link.classList.add('link-detalhes'); // Adiciona uma classe para estilização do link
   link.style.color = "blue"; // Define a cor azul para parecer um link
   link.style.cursor = "pointer"; // Define o cursor como 'pointer' para indicar que é clicável

   // Adiciona um evento de clique ao link para exibir detalhes do anime
   link.addEventListener('click', () => exibirDetalhesAnime(anime.id));


    card.appendChild(imagem)
    card.appendChild(nome)
    card.appendChild(link)
    
 
    container.appendChild(card)
}



async function preencherFotos() {
    const nomePersonagem = document.getElementById('input').value.trim();
    if (!nomePersonagem) {
        alert("Digite um nome para buscar!");
        return;
    }

    const personagens = await pesquisarAnimes(nomePersonagem);
    if (!personagens || personagens.length === 0) {
        alert("Nenhum anime encontrado!");
        return;
    }

    const galeria = document.getElementById('list-animes');
    galeria.replaceChildren(); // Limpar a galeria antes de adicionar novos elementos

    personagens.forEach(criarCard); // Corrigindo chamada da função correta
}

/********************************************************************************************/

// Função para exibir detalhes do anime selecionado
async function exibirDetalhesAnime(id) {
    try {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const dados = await response.json();
        const anime = dados.data;
        const detalhesContainer = document.createElement("div");
        detalhesContainer.classList.add("detalhes-container"); 

        // Apaga todo o conteúdo da página
        document.body.innerHTML = "";

        // Criar um novo card grande
        const cardDetalhado = document.createElement('div');
        cardDetalhado.classList.add('card-detalhado');

        const imagem = document.createElement('img');
        imagem.src = anime.attributes.posterImage?.medium || "fallback.jpg";

        const nome = document.createElement('h1');
        nome.textContent = anime.attributes.canonicalTitle;

        const descricao = document.createElement('p');
        descricao.textContent = anime.attributes.synopsis || "Descrição não disponível.";

        const episodios = document.createElement('p');
        episodios.textContent = `Episódios: ${anime.attributes.episodeCount || "Desconhecido"}`;

        // Botão para voltar à pesquisa inicial
        const botaoVoltar = document.createElement('button');
        botaoVoltar.textContent = "Voltar";
        botaoVoltar.addEventListener('click', () => location.reload());

        cardDetalhado.appendChild(imagem);
        cardDetalhado.appendChild(nome);
        cardDetalhado.appendChild(descricao);
        cardDetalhado.appendChild(episodios);
        cardDetalhado.appendChild(botaoVoltar);

        detalhesContainer.appendChild(cardDetalhado);

        document.body.appendChild(detalhesContainer);

    } catch (error) {
        console.error("Erro ao buscar detalhes do anime:", error);
        alert("Erro ao carregar detalhes do anime.");
    }
}

/********************************************************************************************/
document.getElementById('btn')
    .addEventListener('click', preencherFotos)