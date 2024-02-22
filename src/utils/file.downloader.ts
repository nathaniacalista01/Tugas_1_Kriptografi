import React from "react";

export const downloadFile = (
  method: string,
  result: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (typeof result !== "string") {
    setErrorMessage("Result is not a string.");
    return;
  }
  const parts = result.split(".");

  let fileName, fileURL, blob;

  // if (method === "encrypt") {
  //   fileName = "data.bin";
  //   blob = new Blob([result], { type: "application/octet-stream" });
  //   fileURL = URL.createObjectURL(blob);
  // } else {
    if (parts.length > 1) {
      const extension = parts[parts.length - 1];
      const content = parts.slice(0, -1).join("");
    
      // Include extension in the content
      const contentWithExtension = `${content}.${extension}`;
    
      fileName = `data.${extension}`;
    
      const out = [];
    
      // Convert each character to its char code and push it to the array
      for (let i = 0; i < contentWithExtension.length; i++) {
        out.push(contentWithExtension.charCodeAt(i));
      }
    
      // Create a new Uint8Array from the array of char codes
      const uint8Array = new Uint8Array(out);
    
      // Create a Blob with the Uint8Array and set the MIME type
      blob = new Blob([uint8Array], {
        type: "application/octet-stream",
      });
    
      // Create a file URL for the Blob
      fileURL = URL.createObjectURL(blob);
    }
    else {
    const content = parts[0];
      fileName = "data.bin";
      const out = [];
      // if(method !== "encrypt"){
      //   for(let i = 0; i < content.length; i++){
      //     out.push(content.charCodeAt(i))
      //   }
      // }else{
      for(let i = 0; i < result.length; i++){
        out.push(content.charCodeAt(i))
      }
      // }
      blob = new Blob([new Uint8Array(out)], { type: "application/octet-stream" });
      fileURL = URL.createObjectURL(blob);

  }
  

  const tempLink = document.createElement("a");
  tempLink.href = fileURL;
  tempLink.setAttribute("download", fileName);
  document.body.appendChild(tempLink);
  tempLink.click();

  URL.revokeObjectURL(fileURL);
  document.body.removeChild(tempLink);
};
