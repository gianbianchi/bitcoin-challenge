export const isNameValid = (name: string): boolean => {
  const nameRegex = /^[a-zA-Zà-úÀ-Ú]{2,50}([ '-][a-zA-Zà-úÀ-Ú]{2,50})*$/;
  return nameRegex.test(name);
};
