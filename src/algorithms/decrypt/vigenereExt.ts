import { space_remover } from "../../utils/remover";

interface vigenereExtDecryptInterface{
    key?: string;
    decryptText: string;
    isFile : boolean
}

export const decryptVigenereExt = ({key= "", decryptText, isFile} : vigenereExtDecryptInterface) => {
    decryptText = space_remover(decryptText)
    let decryptedText = ""
    const keyLength = key.length
    if(!isFile){
        for(let i = 0; i < decryptText.length; i++){
            const charCodeCipherText = decryptText.charCodeAt(i)
            const charCodeKey = key.charCodeAt(i % keyLength)

            const decryptedCharCode = (charCodeCipherText - charCodeKey) % 256
            decryptedText += String.fromCharCode(decryptedCharCode)
        }
    }
    return decryptedText


}