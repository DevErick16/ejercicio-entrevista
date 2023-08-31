async function getData(param){
    try{                              
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
            if(!response.ok){
                throw new Error('Error al cargar los datos!!!');
            }
        const dataPokemon= await response.json();
        return dataPokemon;
        
    }catch(error){
        throw error;
    }
}
async function searchPokemon(){
    let valueInput = validateInput();

    const data = await getData(valueInput);

    document.getElementById('namePokemon').textContent = data.name + ' #' + data.id;
    document.getElementById('imagePokemon').src = data.sprites.front_default;
    document.getElementById('idInput').value = data.id

    
}
function validateInput(){
    const valueOption = document.getElementById('searchOption').value;
    const valueInput = valueOption == 'id' ? document.getElementById('idInput').value : document.getElementById('nameInput').value;
    return valueInput;
}
function showDetails(){
    const contenedor = document.getElementById('pokemonContainer');
    let valueInput = validateInput();
    getData(valueInput).then(pokemonData => {
        const modal = document.getElementById('modal');
        modal.innerHTML= '';

        const pokemonName = document.createElement('h2');
            pokemonName.textContent = pokemonData.name;

            const typesHeading = document.createElement('h3');
            typesHeading.textContent = 'Tipos:';
            const typesList = document.createElement('ul');
            const types = pokemonData.types.map(typeObj => {
                const typeItem = document.createElement('li');
                typeItem.textContent = typeObj.type.name;
                return typeItem;
            });
            types.forEach(type => typesList.appendChild(type));

            const abilitiesHeading = document.createElement('h3');
            abilitiesHeading.textContent = 'Habilidades:';
            const abilitiesList = document.createElement('ul');
            const abilities = pokemonData.abilities.map(abilityObj => {
                const abilityItem = document.createElement('li');
                abilityItem.textContent = abilityObj.ability.name;
                return abilityItem;
            });
            abilities.forEach(ability => abilitiesList.appendChild(ability));

            const statsHeading = document.createElement('h3');
            statsHeading.textContent = 'Estadísticas:';
            const statsList = document.createElement('ul');
            const stats = pokemonData.stats.map(statObj => {
                const statItem = document.createElement('li');
                statItem.textContent = `${statObj.stat.name}: ${statObj.base_stat}`;
                return statItem;
            });
            stats.forEach(stat => statsList.appendChild(stat));
            // Agregar elementos al modal
            modal.appendChild(pokemonName);
            modal.appendChild(typesHeading);
            modal.appendChild(typesList);
            modal.appendChild(abilitiesHeading);
            modal.appendChild(abilitiesList);
            modal.appendChild(statsHeading);
            modal.appendChild(statsList);
            contenedor.style.height= '1000px';
    })
}
async function addToTable() {
    const contenedor = document.getElementById('pokemonContainer');
    let valueInput = validateInput();
    const data = await getData(valueInput);
    const pokemonName = document.getElementById('namePokemon').textContent;
    const pokemonID = document.getElementById('idInput').value;

    // Verificar si el Pokémon ya existe en la tabla
    const tableRows = document.querySelectorAll('#pokemonTable tbody tr');
    for (const row of tableRows) {
        const existingPokemonName = row.querySelector('td:first-child').textContent;
        if (existingPokemonName === pokemonID) {
            alert('¡Este Pokémon ya está en la tabla!');
            return;
        }
        
    }

    // Si no existe, agregar el Pokémon a la tabla
    if (tableRows.length < 6) {
        const newRow = `<tr><td>${data.id}</td><td>${pokemonName}</td></tr>`;
        const tableBody = document.querySelector('#pokemonTable tbody');
        tableBody.innerHTML += newRow;
    } else {
        alert('¡La tabla ya tiene el máximo de 6 Pokémon!');
    }
    contenedor.style.height= '1100px';
}
