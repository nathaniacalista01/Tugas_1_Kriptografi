import React from "react";

export const downloadFile = (
  result: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (typeof result !== "string") {
    setErrorMessage("Result is not a string.");
    return;
  }
  const parts = result.split(".");
  let fileName, fileURL, blob;
  if (parts.length > 1) {
    const extension = parts[parts.length-1];
    const content = parts.slice(0, -1).join("")

    fileName = `data.${extension}`;

    blob = new Blob([content], {
      type: "application/octet-stream",
    });

    fileURL = URL.createObjectURL(blob);
  } else {
    fileName = "data.bin";
    blob = new Blob([result], { type: "application/octet-stream" });
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
