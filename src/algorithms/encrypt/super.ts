import { vigenereExt } from "./vigenereExt";

interface SuperInterface{
    key? : string;
    plainText : string
}

export const superEncryption = ({key = "", plainText} : SuperInterface) =>  {
    const specialChar = 'A'
    const keyLength = key.length
    const key_l = Array.from(key).sort()
    
    // let numPad = plainText.length % keyLength
    while(plainText.length % keyLength != 0){
        plainText += specialChar
    }
    console.log('hai')
    console.log(plainText)
    // const row = plainText.length / keyLength
    const cipherTemp = vigenereExt({key, plainText})
    console.log(cipherTemp)
    // transposition
    const matrix = []
    for(let i = 0; i < cipherTemp.length; i+= keyLength){
        matrix.push(cipherTemp.slice(i, i + keyLength))
    }
    let cipherText = ""
    let kId = 0
    for(let i = 0; i < plainText.length; i++){
        const id = key.indexOf(key_l[kId]);
        for(const row of matrix){
            if(row[i] != undefined){
                cipherText += row[id]
            }
        }
        kId++;
    }
    return cipherText


}


