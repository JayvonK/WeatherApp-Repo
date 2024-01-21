
async function AddToDB()
{
    const promise = await fetch(`http://localhost:5056/FavoriteCities/GetFavorites`);
    console.log(promise);
}

async function DeleteFav(cityName)
{
    const promise = await fetch(`http://localhost:5056/FavoriteCities/DeleteCity/${cityName}`);
    console.log("I delted something");
}

export { AddToDB, DeleteFav }
