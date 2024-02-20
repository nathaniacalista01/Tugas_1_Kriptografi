import { space_remover } from "../../utils/remover";

interface vigenereExtInterface{
    key?: string;
    plainText: string;
}

export const vigenereExt = ({key = "", plainText}: vigenereExtInterface) =>{
    plainText = space_remover(plainText)
    const keyLength = key.length
    let cipherText = ""
    for(let i = 0; i < plainText.length; i++){
        const charCodePlainText = plainText.charCodeAt(i);
        const charCodeKey = key.charCodeAt(i % keyLength);
    
        const encryptedCharCode = (charCodePlainText + charCodeKey) % 256;
        cipherText += String.fromCharCode(encryptedCharCode);
    }
    

    return cipherText

}