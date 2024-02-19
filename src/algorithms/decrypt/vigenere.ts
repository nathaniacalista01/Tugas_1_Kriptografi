interface VigenereDecryptInterface{
    isStandard: boolean;
    key?: string;
    cipherText: string    
 }


export const decryptVigenere = ({isStandard, key = "", cipherText}: VigenereDecryptInterface) => {
    key = key.toUpperCase()
    cipherText = cipherText.toUpperCase()
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const keyLength = key.length
    const cipherLength = cipherText.length
    const isShortKey = keyLength < cipherLength
    let newKey = key
    let decryptedText = ""
    if(isStandard){
        if(isShortKey){
            const x = cipherLength - keyLength
            for(let i = 0; i < x; i++){
                newKey += key[i%keyLength]
            }
        }
        for (let i = 0; i < cipherText.length; i++){
            const plainPosition = alphabet.indexOf(cipherText[i])
            const keyPosition = alphabet.indexOf(newKey[i])
            const encryptedPos = (plainPosition + keyPosition) % 26
            const newLetter = alphabet[encryptedPos]
            decryptedText += newLetter
        }

    }else{
        for (let i = 0; i < cipherLength; i++){
            const char = cipherText[i].toUpperCase();
            const decryptedChar = String.fromCharCode((char.charCodeAt(0) - key[i].toUpperCase().charCodeAt(0) + 26) % 26 + 'A'.charCodeAt(0));
            decryptedText += decryptedChar;
            newKey+=(decryptedChar);
        }
    }

    console.log(decryptedText)
    return decryptedText
}