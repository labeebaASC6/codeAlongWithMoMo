let url = "https://pokeapi.co/api/v2/pokemon/chimchar";

fetch(url)
.then((resp) => resp.json())
.then((data) =>
    console.log(data)
);