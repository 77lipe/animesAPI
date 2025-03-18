'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const gridAnime = document.querySelector('.anime-grid');

    const animes = [
        { 
            title: "Naruto", 
            image: "https://via.placeholder.com/200x200?text=Naruto", 
            description: "Naruto é um ninja com o sonho de se tornar o Hokage."
        },
        { 
            title: "Dragon Ball", 
            image: "https://via.placeholder.com/200x200?text=Dragon+Ball", 
            description: "A história de Goku e seus amigos em busca das esferas do dragão."
        },
        { 
            title: "One Piece", 
            image: "https://via.placeholder.com/200x200?text=One+Piece", 
            description: "Monkey D. Luffy e sua jornada para encontrar o One Piece."
        },
        { 
            title: "Attack on Titan", 
            image: "https://via.placeholder.com/200x200?text=Attack+on+Titan", 
            description: "Humanidade luta contra gigantes devoradores de humanos."
        },
        { 
            title: "My Hero Academia", 
            image: "https://via.placeholder.com/200x200?text=My+Hero+Academia", 
            description: "Jovens heróis treinam para combater vilões em um mundo com superpoderes."
        }
    ];

    // Função para criar um card
    function createCard(anime) {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = anime.image;
        card.appendChild(img);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = anime.title;
        cardContent.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-description');
        description.textContent = anime.description;
        cardContent.appendChild(description);

        card.appendChild(cardContent);

        return card;
    }

    // Adicionando os cards à grid
    animes.forEach(anime => {
        const card = createCard(anime);
        gridAnime.appendChild(card);
    });
});



/*---------------------------------------------------------------------------*/


async function fetchAnime(category) {
    const url = `https://kitsu.io/api/edge/anime?filter[categories]=${category}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const animeList = document.getElementById("anime-list");
        animeList.innerHTML = ""; // Limpa a lista anterior

        data.data.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-card");

            animeCard.innerHTML = `
                <img src="${anime.attributes.posterImage.medium}" alt="${anime.attributes.canonicalTitle}">
                <h3>${anime.attributes.canonicalTitle}</h3>
                <p>${anime.attributes.synopsis.substring(0, 100)}...</p>
            `;

            animeList.appendChild(animeCard);
        });

    } catch (error) {
        console.error("Erro ao buscar animes:", error);
    }
}




document.getElementById("search-btn").addEventListener("click", () => {
    const genre = document.getElementById("search-input").value.trim();
    if (genre) {
        fetchAnime(genre);
    }
});


