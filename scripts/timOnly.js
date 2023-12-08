function TimeOnly(time){
    let newTime = "";
    for(let i = 0; i < time.length; i++){
        if(time[i] === ","){
            for(let j = i + 1; j < time.length -2; j++){
                newTime += time[j];
            }
        }
    }
    return newTime;
}

export { TimeOnly }