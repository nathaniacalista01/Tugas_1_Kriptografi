interface VigenereInterface{
   isStandard: boolean;
   key?: string;
   plainText: string    
}

export const vigenere = ({isStandard, key = "", plainText}: VigenereInterface) => {
    key = key.toUpperCase()
    plainText = plainText.toUpperCase()
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const keyLength = key.length
    const plainLength = plainText.length
    const isShortKey = keyLength < plainLength
    let newKey = key
    if(isStandard){
        if(isShortKey){
            const x = plainLength - keyLength
            for(let i = 0; i < x; i++){
                newKey += key[i%keyLength]
            }
        }
        console.log('hai')
        
    }else{
        if(isShortKey){
            const x = plainLength - keyLength
            for(let i = 0; i < x; i++){
                newKey += plainText[i%plainLength]
            }
        }
    }
    let encryptedText = ""
    for (let i = 0; i < plainText.length; i++){
        const plainPosition = alphabet.indexOf(plainText[i])
        const keyPosition = alphabet.indexOf(newKey[i])
        const encryptedPos = (plainPosition + keyPosition) % 26
        const newLetter = alphabet[encryptedPos]
        encryptedText += newLetter
    }
    console.log(encryptedText)
    return encryptedText
}
