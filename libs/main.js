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
    createPokeElement(chimchar);
})
.catch(function(error){ console.log(error)});
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
function createPokeElement(pokemon)
{

    //do h1 for name
    let h1 = document.createElement("h1");
    h1.innerText = pokemon.name;
    //h2 for nubmer
    let h2 = document.createElement("h2");
    h2.innerText = pokemon.number;
    //type
    let p = document.createElement('p');
    for(let type of pokemon.types)
    {
        p.innerText += `${type} `;
    }
    //ul terior moves
    let moveUl = document.createElement("ul");
    for(move of pokemon.moves)
    {
        moveUl.innerHTML += `<li>${move}</li>`;
    }
    //also abliliteis
    let ablityUl = document.createElement("ul");
    for(abilitirityith of pokemon.abilities)
    {
        ablityUl.innerHTML += `<li>${abilitirityith}</li>`;
    }
    //shove zhe pokymone into a box and post it to html without 'fragile' tag
    let div = document.createElement("div");
    div.append(h1, h2, p, moveUl, ablityUl);
    document.body.appendChild(div);
}