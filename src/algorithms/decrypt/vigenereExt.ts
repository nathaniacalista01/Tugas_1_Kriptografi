import { space_remover } from "../../utils/remover";

interface vigenereExtDecryptInterface{
    key?: string;
    decryptText: string;
    extension?: string
}

export const decryptVigenereExt = ({key= "", decryptText, extension } : vigenereExtDecryptInterface) => {
    decryptText = space_remover(decryptText)
    let decryptedText = ""
    const ext = "." +extension
    decryptText = decryptText.split(ext)[0]
    const keyLength = key.length
    for(let i = 0; i < decryptText.length; i++){
        const charCodeCipherText = decryptText.charCodeAt(i)
        const charCodeKey = key.charCodeAt(i % keyLength)

        const decryptedCharCode = (charCodeCipherText - charCodeKey) % 256
        decryptedText += String.fromCharCode(decryptedCharCode)
    }
    if(extension){
        return decryptedText + "." + extension
    }else{
        return decryptedText
    }


}