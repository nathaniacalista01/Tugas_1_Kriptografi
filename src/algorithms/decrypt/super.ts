import { decryptVigenereExt } from "./vigenereExt";

interface superDecryptionInterface{
    key?: string;
    decryptText: string
    extension?: string
}

export const superDecryption = ({key = "", decryptText, extension} : superDecryptionInterface) => {
    let tempResult = "";
    let kId = 0;
    let dId = 0;
    const keyLength = key.length
    const decryptLength = decryptText.length
    const decryptL = Array.from(decryptText)

    const row = Math.ceil(decryptLength/ keyLength)

    const keyL = Array.from(key).sort()

    const matrix = []
    for(let _ = 0; _ < row; _++){
        matrix.push(Array(keyLength).fill(null))
    }
    for (let _ = 0; _ < keyLength; _++) {
        const id = key.indexOf(keyL[kId]);
 
        for (let j = 0; j < row; j++) {
            matrix[j][id] = decryptL[dId];
            dId++;
        }
        kId++;
    }
 
    // convert decrypted msg matrix into a string
    try {
        tempResult = matrix.flat().join('');
    } catch (err) {
        throw new Error("This program cannot handle repeating words.");
    }
 
    const null_count = (tempResult.match(/_/g) || []).length;
 
    if (null_count > 0) {
        tempResult = tempResult.slice(0, -null_count);
    }
    decryptText = tempResult
    const result = decryptVigenereExt({key, decryptText, extension})
    if(extension){
        return result + "." + extension
    }else{
        return result
    }



}
