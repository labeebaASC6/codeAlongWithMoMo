var inputSearch = document.getElementById("pokesearch");
var search = document.getElementById("search_button");
search.addEventListener("click", function(){
    callPokemonAPI(inputSearch.value);
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function callPokemonAPI(name)
{
    if(typeof name != "string" || name.charAt(0) == 0)
    {
        name = parseInt(name);
    }
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
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
        let pokemon = new Pokemon(name, number, types, moves, abilities, sprite, flavorText);
        console.log(pokemon);
        //createPokeElement(pokemon);
        createCarouselItem(pokemon);
    })
    .catch(function(error){ console.log(error)});
}
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
function createPokeElement(pokemon, targetNode)
{
    //do h1 for name
    let nameEl = document.createElement("h1");
    nameEl.innerText = pokemon.name;
    //h2 for nubmer
    let numberEl = document.createElement("h4");
    numberEl.innerText = `Id no. ${pokemon.number}`;
    //flavor
    var flavorDiv = document.createElement('div');
    getFlavorText(pokemon.flavorText, function(flavorText)  //this anon func is execd when callback is been done did
    {
        flavorDiv.innerHTML = flavorText;

        let typeEl = document.createElement('h3');
        for(let type of pokemon.types)
        {
            typeEl.innerText += `${type} type pokemon`;
        }
        //ul terior moves
        // let moveUl = document.createElement("ul");
        // moveUl.innerHTML = "Moves:"
        // for(move of pokemon.moves)
        // {
        //     moveUl.innerHTML += `<li>${move}</li>`;
        // }
        //also abliliteis
        let ablityUl = document.createElement("ul");
        ablityUl.innerHTML = "Abilities:"
        for(abilitirityith of pokemon.abilities)
        {
            ablityUl.innerHTML += `<li>${abilitirityith}</li>`;
        }
        //shove zhe pokymone into a box and post it to html without 'fragile' tag
        let div = document.createElement("div");
        div.append(nameEl, numberEl, flavorDiv, typeEl, ablityUl);
        div.setAttribute("class", "container");
        targetNode.appendChild(div);
    });
}

function createCarouselItem(pokemon)    //pokemon is object
{
    //div with carousel-item classs and make img with d-block and w-100
    let carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");

    carouselImage = document.createElement("img");
    carouselImage.setAttribute("class", "d-block w-50");
    carouselImage.setAttribute("src", pokemon.sprite);
    carouselItem.appendChild(carouselImage);
    createPokeElement(pokemon, carouselItem);

    var carouselInner = document.getElementsByClassName("carousel-inner")[0];
    carouselInner.appendChild(carouselItem);
    for(let i = 1; i < carouselInner.childNodes.length; i++)
    {
        carouselInner.childNodes[i].classList.remove("active");
    }
    carouselInner.childNodes[1].classList.add("active");
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
//     let chimchar = new Pokemon(name, number, types, moves, abilities, sprite, flavorText);
//     console.log(chimchar);
//     createPokeElement(chimchar);
//     document.body.style.backgroundImage = `url(${data.sprites.front_default})`;
//     createCarouselItem(chimchar);
// })
// .catch(function(error){ console.log(error)});
// }