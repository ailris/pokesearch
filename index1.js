$(document).ready(function () {
    const pokeListContainer = $(".poke-card-container");

    // Fetch Pokemon data from the API
    $.get("https://pokeapi.co/api/v2/pokemon?limit=20", function (data) {
        const pokemonList = data.results;

        // Display Pokemon cards
        pokemonList.forEach(function (pokemon) {
            displayPokemonCard(pokemon);
        });
    });

    function displayPokemonCard(pokemon) {
        // Fetch additional details for each Pokemon
        $.get(pokemon.url, function (details) {
            const card = `
        <div class="poke-card">
          <img src="${details.sprites.front_default}" alt="${details.name}">
          <h3>${capitalizeFirstLetter(details.name)}</h3>
        </div>
      `;

            pokeListContainer.append(card);
        });
    }

    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
