function kelvinConvert(temp){
    let farenheit = (temp - 273.15) * (9 / 5) + 32;

    return farenheit;
}

export { kelvinConvert }