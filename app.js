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

    const imagem = document.createElement('img');
    imagem.src = anime.attributes.posterImage?.tiny

    const nome = document.createElement('h2')
   nome.textContent = anime.attributes.canonicalTitle



    card.appendChild(imagem)
    card.appendChild(nome)
 
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


document.getElementById('btn')
    .addEventListener('click', preencherFotos)