function cargarPokedex() {
    const pokedexContainer = document.getElementById('pokedex-container');
    const modalContainer = document.getElementById('modal-container');

    if (!pokedexContainer || !modalContainer) {
        console.error('No se encontraron los elementos necesarios en el DOM.');
        return;
    }

    fetch('/JSON/pokemons.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => mostrarTarjetas(data))
        .catch(error => console.error('Error al cargar el JSON:', error.message));

        modalContainer.style.display = 'none';
}

function mostrarTarjetas(pokemons) {
    const pokedexContainer = document.getElementById('pokedex-container');

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';

        const image = document.createElement('img');
        image.src = pokemon.ThumbnailImage; 
        image.alt = pokemon.name;
        image.class = "imagen";
        card.appendChild(image);


        const text1 = document.createElement('div');
        text1.class = "descripciones";
        text1.id = "descripcion1"
        text1.textContent = `${pokemon.name} - ${pokemon.number}`;
        card.appendChild(text1);
        const text2 = document.createElement('div');
        text2.class = "descripciones";
        text2.textContent = `Tipo: ${pokemon.type}`;
        card.appendChild(text2);

        card.addEventListener('click', () => mostrarDetalle(pokemon));

        pokedexContainer.appendChild(card);
    });
}

function mostrarDetalle(pokemon) {
    const modalContainer = document.getElementById('modal-container');

    if (!modalContainer) {
        console.error('No se encontró el contenedor del modal en el DOM.');
        return;
    }

    modalContainer.innerHTML = `
        <h2>${pokemon.name}</h2>
        <div class="textModal">Numero: ${pokemon.number}</div>
        <div class="textModal">Tipo: ${pokemon.type}</div>
        <div class="textModal">Peso: ${pokemon.weight || 'No disponible'} kg</div>
        <div class="textModal">Altura: ${pokemon.height || 'No disponible'} cm</div>
        <div class="textModal">Habilidades: ${pokemon.abilities ? pokemon.abilities.join(', ') : 'No disponible'}</div>
        <div class="textModal">Debil contra tipo: ${pokemon.weakness ? pokemon.weakness.join(', ') : 'No disponible'}</div>
        <button onclick="cerrarModal()" id="buttonModal">Cerrar</button>
    `;
    modalContainer.style.display = 'flex';
}

function cerrarModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
}

function filtrarPokedex() {
    const inputBusqueda = document.getElementById('busqueda');
    const filtro = inputBusqueda.value.toLowerCase();

    const pokedexContainer = document.getElementById('pokedex-container');
    const cards = pokedexContainer.querySelectorAll('.pokemon-card');

    cards.forEach(card => {
        const nombreTipoNumero = card.querySelector('p').textContent.toLowerCase();

        if (nombreTipoNumero.includes(filtro)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', cargarPokedex);