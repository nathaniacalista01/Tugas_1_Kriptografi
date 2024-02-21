import { space_remover } from "../../utils/remover";
interface VigenereInterface{
   isStandard: boolean;
   key?: string;
   plainText: string    
   extension? : string
}

export const vigenere = ({isStandard, key = "", plainText, extension}: VigenereInterface) => {
    key = key.toUpperCase()
    plainText = space_remover(plainText.toUpperCase().replace(/[^a-zA-Z]/g, ''))
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
    if(extension){
        return encryptedText + "." + extension
    }else{
        return encryptedText
    }
}
