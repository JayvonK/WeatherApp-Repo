import { favArray } from "./app.js";
import { AddFavCity } from "./addFavCity.js";


function updateFav(){
    favInject.innerText = "";
    for(let i = 0; i < favArray.length;i++){
        AddFavCity(favInject, favArray[i]);
    }
}

export { updateFav };