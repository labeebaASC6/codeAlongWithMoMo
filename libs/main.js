
// proGamerMove();


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
    let sprite = data.sprites.front_default;
    let flavorText = getFlavorText(data);
    let chimchar = new Pokemon(name, number, types, moves , abilities, sprite, flavorText);
    console.log(chimchar);
    createPokeElement(chimchar);
    // document.body.style.backgroundImage = `url(${data.sprites.front_default})`
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
    let img = document.createElement("img");
    img.setAttribute("src", pokemon.sprite);

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
    div.append(img, h1, h2, p, moveUl, ablityUl);
    document.body.appendChild(div);
}
function getFlavorText(pokeJSON)
{
    let flavorURL = pokeJSON.species.url;
    fetch(flavorURL)
    .then((resp) => resp.json())
    .then((data) => {
        let text;
        let flavorTextArray = data.flavor_text_entries;
        for(let flavor_text of flavorTextArray)
        {
            console.log(flavor_text);
        }
    })
    .catch((err) => console.log(err));
}





let urls = "https://pokeapi.co/api/v2/pokemon/";
function proGamerMove()
{
    var max = 800;
for(let i = 0; i < max; i++)
{
    xd(i + 1);
}
}
function xd(pokeID)
{
var thisurl = `${urls}${pokeID}`;
fetch(thisurl)
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
    // document.body.style.backgroundImage = `url(${data.sprites.front_default})`
})
.catch(function(error){ console.log(error)});
}