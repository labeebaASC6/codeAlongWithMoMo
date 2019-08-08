
// proGamerMove();


let url = `https://pokeapi.co/api/v2/pokemon/chimchar`;

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
    let flavorText = data.species.url;
    let chimchar = new Pokemon(name, number, types, moves, abilities, sprite, flavorText);
    console.log(chimchar);
    createPokeElement(chimchar);
    // document.body.style.backgroundImage = `url(${data.sprites.front_default})`
    createCarouselItem(chimchar);
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
    //flavor
    var flavorDiv = document.createElement('div');
    getFlavorText(pokemon.flavorText, function(flavorText)  //this anon func is execd when callback is been done did
    {
        flavorDiv.innerHTML = flavorText;

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
        div.append(img, h1, h2, flavorDiv, p, moveUl, ablityUl);
        document.getElementById("poke_container").appendChild(div);
    });
}
function getFlavorText(flavorURL, callback)
{
    fetch(flavorURL)
    .then((resp) => resp.json())
    .then((data) => {
        let flavorTextArray = data.flavor_text_entries;
        for(let flavorText of flavorTextArray)
        {
            if(flavorText.language.name == "en" && flavorText.version.name == "diamond")
            {
                callback(flavorText.flavor_text);   //this apparently returns the results when the thing is loaded, this seems to be a rule for parameters :thonk:
            }
        }
    })
    .catch((err) => console.log(err));
}
function createCarouselItem(pokemon)
{
    //div with carousel-item classs and make img with d-block and w-100
    let carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item active");

    carouselImage = document.createElement("img");
    carouselImage.setAttribute("class", "d-block w-100");
    carouselImage.setAttribute("src", pokemon.sprite);
    carouselItem.appendChild(carouselImage);

    document.getElementById("carousel_items").appendChild(carouselItem);
}




// function proGamerMove()
// {
//     var max = 800;
//     for(let i = 0; i < max; i++)
//     {
//         xd(i + 1);
//     }
// }
// function xd(pokeID)
// {
//     let urls = "https://pokeapi.co/api/v2/pokemon/" + pokeID;
// fetch()
// .then((resp) => resp.json())
// .then(function(data) {
//     console.log(data);
//     let name = data.name;
//     let number = data.id;
//     let types = getTypes(data);
//     let moves = getMoves(data);
//     let abilities = getAbilities(data);
//     let sprite = data.sprites.front_default;
//     let flavorText = data.species.url;
//     let chimchar = new Pokemon(name, number, types, moves , abilities, sprite, flavorText);
//     console.log(chimchar);
//     createPokeElement(chimchar);
//     // document.body.style.backgroundImage = `url(${data.sprites.front_default})`
// })
// .catch(function(error){ console.log(error)});
// }