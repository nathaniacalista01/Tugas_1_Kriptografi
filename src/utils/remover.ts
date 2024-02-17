export const duplicate_remover = (key: string) => {
  return [...new Set(key)].join("");
};

export const space_remover = (key: string) => {
  return key.replace(/\s/g, "");
};
