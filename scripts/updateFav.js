import { favArray, pastSearchArray, AddPastSearch } from "./app.js";
import { AddFavCity } from "./addFavCity.js";


function updateFav(){
    favInject.innerText = "";
    for(let i = 0; i < favArray.length;i++){
        AddFavCity(favInject, favArray[i]);
    }

    if(favArray.length === 0){
        favInject.innerText = "You Have No Favorite Places";
    }

}

function updatePast(){
    for(let i = pastSearchArray.length -1; i >= 0; i--){
        AddPastSearch(pastSearchInject, pastSearchArray[i]);
    }
}

export { updateFav, updatePast };