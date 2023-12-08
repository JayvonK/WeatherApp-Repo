import { Search } from "./searchFunctions.js";

function AddPastSearch(inject, search) {
    let li = document.createElement("li");

    let a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.innerText = search;

    li.appendChild(a);

    li.addEventListener('click', function (e) {
        Search(search);
    })

    inject.appendChild(li);
}

export { AddPastSearch }