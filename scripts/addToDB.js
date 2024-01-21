
async function AddToDB(cityName)
{
    const promise = await fetch(`http://localhost:5056/FavoriteCities/AddCity/${cityName}`, {method: "POST"});
    console.log("I freaking work!");
}

async function DeleteFav(cityName)
{
    const promise = await fetch(`http://localhost:5056/FavoriteCities/DeleteCity/${cityName}`);
    console.log("I delted something");
}

export { AddToDB, DeleteFav }
