'use strict'

console.log("Buscando dados...");
fetch("https://kitsu.io/api/edge/anime?filter[categories]=adventure")
  .then(response => response.json())
  .then(data => {
    console.log("Dados recebidos:", data);
  })
  .catch(error => console.error("Erro na API:", error));

const barraPesquisa = document.getElementById('input')
const botaoPesquisa = document.getElementById('btn')

async function pesquisarAnimes(category) {
    const container = document.getElementById('container')

    const response = await fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${category}`)
    const data = await response.json()

    if (data.response === "success" && data.results.length > 0) {
        return data.results //Return dos resultados da busca pelo nome
    }

}

async function criarCards(anime) {
    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
}

botaoPesquisa.addEventListener('click', () => pesquisarAnimes(barraPesquisa.value));