import { Search } from "./searchFunctions.js";
import { favInject, favArray } from "./app.js";
import { updateFav } from "./updateFav.js";


function AddFavCity(inject, city){
    let btn = document.createElement("button");
    btn.className = "btn btn-light mb-3";
    btn.style = "width: 100%; height: 50px";

    let row = document.createElement("div");
    row.className = "row";

    let firstCol = document.createElement("div");
    firstCol.className = "col-10 hov2";
    firstCol.innerText = city;

    let secondCol = document.createElement("div");
    secondCol.className = "col-2";

    let img = document.createElement("img");
    img.src = "./assets/x-letter.svg";
    img.alt = "x button";
    img.style = "width: 15px; height: auto;";
    img.className = "hov3";

    secondCol.appendChild(img);

    row.appendChild(firstCol);
    row.appendChild(secondCol);
    btn.appendChild(row);

    secondCol.addEventListener('click', function(e){
        console.log("hi");
        let index = favArray.indexOf(city);

            favArray.splice(index, 1);

            localStorage.setItem("favorites", JSON.stringify(favArray));
            favInject.innerHTML = "";
            updateFav();

            if(firstCol.innerText.toLowerCase() === currCity.innerText.toLowerCase()){
                heartBtn.src = "./assets/heart.svg";
            }
    })

    firstCol.addEventListener('click', function(e){
        Search(city);
    })
    inject.appendChild(btn);
}

export { AddFavCity };