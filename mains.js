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
    const valueOption = document.getElementById('searchOption').value;
    const valueInput = valueOption == 'id' ? document.getElementById('idInput').value : document.getElementById('nameInput').value;
    const data = await getData(valueInput);

    document.getElementById('namePokemon').textContent = data.name;
    document.getElementById('imagePokemon').src = data.sprites.front_default;

    
}

function showDetails(){
    const namePokemon = document.getElementById('namePokemon');
    const imagePokemon = document.getElementById('imagePokemon');
    const moreInormation = document.getElementById('moreInformation');
}
console.log(getData(25));