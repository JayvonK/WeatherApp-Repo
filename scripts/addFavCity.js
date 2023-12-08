import { Search } from "./searchFunctions.js";

function AddFavCity(inject, city){
    let btn = document.createElement("button");
    btn.className = "btn btn-light";
    btn.style = "width: 100%; height: 50px";
    btn.innerText = city;

    btn.addEventListener('click', function(e){
        Search(city);
    })
    inject.appendChild(btn);
}


export { AddFavCity };