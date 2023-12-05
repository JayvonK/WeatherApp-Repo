
function CurrentTime(dt) {
    const ms = dt * 1000;
  
    const date = new Date(ms);
  
    return date.toLocaleString(); 
  }

  export { CurrentTime }
  
