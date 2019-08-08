let url = "https://pokeapi.co/api/v2/pokemon/chimchar";

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    console.log(data);
    let name = data.name;
    let number = data.id;
    let types = getTypes(data);
    let moves = getMoves(data);
    let abilities = getAbilities(data);
    let chimchar = new Pokemon(name, number, types, moves , abilities);
    console.log(chimchar);
})
.catch(function(error){});
function getTypes(pokeJSON)
{
    let types = [];
    for(let type of pokeJSON.types)
    {
        types.push(type.type.name);
    }
    return types;
}
function getMoves(pokeJSON)
{
    let moves = [];
    for(let move of pokeJSON.moves)
    {
        moves.push(move.move.name);
    }
    return moves;
}
function getAbilities(pokeJSON)
{
    let abilities = [];
    for(ability of pokeJSON.abilities)
    {
        abilities.push(ability.ability.name);
    }
    return abilities;
}