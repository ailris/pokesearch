$(document).ready(function () {
    const searchButton = $("#search-button");
    const searchInput = $("#search-input");
    const pokeList = $("#poke-list");

    searchButton.on("click", function () {
        const searchTerm = searchInput.val();
        searchPokemon(searchTerm);
    });

    $('#search-input').on('keyup', function (e) {
        if (e.keyCode === 13) {
            const searchTerm = searchInput.val();
            searchPokemon(searchTerm);
        }
    });

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to handle Pokemon search
    function searchPokemon(searchTerm) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;

        $.get(apiUrl, function (data) {
            console.log("Response from API:", data);
            displayPokemon(data);
        }).fail(function () {
            // Handle errors or display a message to the user
            console.error("Error fetching Pokemon data.");
            // You can add an alert or other UI feedback here if needed
        });
    }

    // Function to display Pokemon details
    function displayPokemon(pokemon) {
        const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

        const card = `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${capitalizedPokemonName}</h5>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-pokemon-name="${pokemon.name}">Details</button>
                </div>
            </div>
        </div>
    `;

        pokeList.append(card);

        const detailsButton = $(`[data-pokemon-name="${pokemon.name}"]`);
        detailsButton.on("click", function () {
            showPokemonDetails(pokemon);
        });
    }


    // Function to show Pokemon details in a modal
    function showPokemonDetails(pokemon) {
        const modalBody = $(".modal-body");
        const details = `
        <div class="text-center">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="max-width: 100%; max-height: 200px;">
        </div>
        <p><b>Name:</b> ${pokemon.name}</p>
        <p><b>Height:</b> ${pokemon.height}</p>
        <p><b>Weight:</b> ${pokemon.weight}</p>
        <p><b>Abilities:</b> ${pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
    `;

        modalBody.html(details);
    }
});
