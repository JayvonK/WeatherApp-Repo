import { favArray, pastSearchArray } from "./app.js";
import { AddFavCity } from "./addFavCity.js";
import { AddPastSearch } from "./addPastSearch.js";


function updateFav(){
    favInject.innerText = "";
    for(let i = 0; i < favArray.length;i++){
        AddFavCity(favInject, favArray[i]);
    }
}

function updatePast(){
    for(let i = 0; i < pastSearchArray.length; i++){
        AddPastSearch(pastSearchInject, pastSearchArray[i]);
    }
}

export { updateFav, updatePast };