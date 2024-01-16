
async function AddToDB(cityName)
{
    const promise = await fetch(`http://localhost:5056/AddCity/${cityName}`);
    const data = await promise.json();

}

export { AddToDB }
