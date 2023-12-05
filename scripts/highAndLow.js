//Function for finding lowest temp
function LowestTemp(n1, n2, n3, n4, n5, n6, n7, n8){
    let numArray = [];
    let min = numArray[0];
    numArray.push(n1, n2, n3, n4, n5, n6, n7, n8);
    
    for(let i = 0; i < numArray.length; i++){
        if(numArray[0] >= numArray[i]){
            numArray[0] = numArray[i];
            min = numArray[0];
        }
    }
    return min;
}

//Function for finding highest temp
function HighTemp(n1, n2, n3, n4, n5, n6, n7, n8){
    let numArray = [];
    let maxx = numArray[0];
    numArray.push(n1, n2, n3, n4, n5, n6, n7, n8);
    
    for(let i = 0; i < numArray.length; i++){
        if(numArray[0] <= numArray[i]){
            numArray[0] = numArray[i];
            maxx = numArray[0];
        }
    }
    return maxx;
}

export { LowestTemp, HighTemp }