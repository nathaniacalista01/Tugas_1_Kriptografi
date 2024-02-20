import { space_remover } from "../../utils/remover";
interface VigenereDecryptInterface{
    isStandard: boolean;
    key?: string;
    decryptText: string    
 }


export const decryptVigenere = ({isStandard, key = "", decryptText}: VigenereDecryptInterface) => {
    key = key.toUpperCase()
    decryptText = space_remover(decryptText.toUpperCase())
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
            const encryptedPos = (plainPosition - keyPosition) % 26
            const newLetter = alphabet[encryptedPos]
            decryptedText += newLetter
        }

    }else{
        for (let i = 0; i < cipherLength; i++){
            const char = decryptText[i].toUpperCase();
            const decryptedChar = String.fromCharCode((char.charCodeAt(0) - key[i].toUpperCase().charCodeAt(0) + 26) % 26 + 'A'.charCodeAt(0));
            decryptedText += decryptedChar;
            newKey+=(decryptedChar);
        }
    }

    console.log(decryptedText)
    return decryptedText
}