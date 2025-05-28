//generate transaction ID
function transactionID(length){
    let idLength = length;
    let output = '';

    if(idLength){
        for(i=1; i<= idLength; i++){
             const possibleCharacters = 'ABCDEFIJKLMNOPQRSTWVXYZ1234567890'
             let randomCharacters = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
             output += randomCharacters
        }
        return output;
    }else{
        return false;
    }
}

module.exports = transactionID;