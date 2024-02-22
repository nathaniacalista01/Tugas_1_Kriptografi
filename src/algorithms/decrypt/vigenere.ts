import { space_remover } from "../../utils/remover";
interface VigenereDecryptInterface{
    isStandard: boolean;
    key?: string;
    decryptText: string;
    extension?: string
 }


export const decryptVigenere = ({isStandard, key = "", decryptText, extension}: VigenereDecryptInterface) => {
    key = key.toUpperCase()
    decryptText = space_remover(decryptText.toUpperCase().replace(/[^a-zA-Z]/g, ''))
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const keyLength = key.length
    const cipherLength = decryptText.length
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
        for (let i = 0; i < decryptText.length; i++){
            const plainPosition = alphabet.indexOf(decryptText[i])
            const keyPosition = alphabet.indexOf(newKey[i])
            const encryptedPos = (plainPosition - keyPosition + 26) % 26
            console.log(encryptedPos)
            const newLetter = alphabet[encryptedPos]
            decryptedText += newLetter
    
            console.log(newLetter)
        }

    }else{
        for (let i = 0; i < cipherLength; i++){
            // const char = decryptText[i].toUpperCase();
            const plainPosition = alphabet.indexOf(decryptText[i])
            const keyPosition = alphabet.indexOf(newKey[i])
            const decryptedChar = alphabet[((plainPosition - keyPosition + 26) % 26)];
            decryptedText += decryptedChar;
            newKey+=(decryptedChar);
        }
    }

    if(extension){
        console.log('ada')
        return decryptedText + "." + extension
    }else{
        console.log('gaada')
        return decryptedText
    }

}