export  const checkIfRomanNumberIsValid = (rn, newHash) => {

    let sameNumberTogether = 0;
    let smallLeftNumber = 0;
    
    rn = rn.toUpperCase();

  let salt = true;
  for(let i = 0; i < rn.length; i++)
  {

      if(!newHash.get(rn[i])) 
      {
        return {
            isValid: false,
            message: 'Only the following letters are allowed: M, D, C, L, X, V, I'
        };
      }
      if(rn[i-1])
      {
          if(newHash.get(rn[i])[1] > newHash.get(rn[i-1])[1] )
          {
            if(rn[i-2])
            {
              if(newHash.get(rn[i])[1] > newHash.get(rn[i-2])[1] )
              {
                return {
                    isValid: false,
                    message: 'A letter can´t have two or more letters of lower value to its left'
                };
              }
            }
          }
      }
      else if( newHash.get(rn[0])[1] < newHash.get(rn[i])[1] ){
        smallLeftNumber++;
        if(smallLeftNumber >= 2)
        {
            return {
                isValid: false,
                message: 'smaller'
            };
        }
      }
      else if( false ){
        //newHash.get(rn[i])[1] === newHash.get(rn[i-1])[1]
        sameNumberTogether++;
        if(sameNumberTogether >= 3)
        {
          salt = false;
          break;
        }
      }
      else{
      }
  }
  return {
    isValid: true
  }
}

const R_N = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    M: 1000
}

export const isValidNumber = (rn) => { // verify that there isn´t more than three equals letters 
          
    for (const property in R_N) {
       let regex1 = new RegExp( property, 'gi' );
      if(rn.match(regex1)?.length > 3  )
        return {
            isValid: false,
            message: 'A letter can´t be repeated more than 3 times'
        };
    }
    return {
        isValid: true
    }
  }


  export const romanNToDecimal = (rn, newHash) => {

    rn = rn.toUpperCase();

    console.log('newHash.get(rn[i+1])[1]', newHash.get(rn[0+1]))
    let totalSum = 0;

    for(let i = 0; i < rn.length; i++)
    { 
        if(rn[i+1])
        {              
          if(newHash.get(rn[i+1])[1] > newHash.get(rn[i])[1] )
          {
              continue;
          }
          else if(rn[i-1])
          { 
            if(( newHash.get(rn[i])[1] > newHash.get(rn[i-1])[1] ))
            {
              let auxSum = (newHash.get(rn[i])[1] - newHash.get(rn[i-1])[1] );
              totalSum += auxSum;
            }
            else{
              totalSum += newHash.get(rn[i])[1];
            }
          }
          else{
            totalSum += newHash.get(rn[i])[1];
          }
        }
        else{               
          if(rn[i-1])
          { 
            if(( newHash.get(rn[i])[1] > newHash.get(rn[i-1])[1] ))
            {
              let auxSum = (newHash.get(rn[i])[1] - newHash.get(rn[i-1])[1] );
              totalSum += auxSum;
            }
            else{
              totalSum += newHash.get(rn[i])[1];
            }
          }
          else{
            totalSum += newHash.get(rn[i])[1];
          }
        }

    }

    return totalSum.toString();
  }

  export const decimalNToRoman = (num, romanLettersHash) => {

    const decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]; 

    let romanNumber = '';

    for (var index = 0; index < decimalValue.length; index++) {
        while ( decimalValue[index] <= num) {
          romanNumber += romanLettersHash.get( decimalValue[index].toString() )[1];
          num -= decimalValue[index];
        }
      }
      return romanNumber;
  }
