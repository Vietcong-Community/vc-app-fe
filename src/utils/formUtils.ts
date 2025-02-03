export const removeWhiteSpaces = (fieldValue: string) => {
  if (!fieldValue) {
    return '';
  }

  return fieldValue.replace(/\s+/g, '');
};

export const parseToLowerCase = (fieldValue: string) => {
  if (!fieldValue) {
    return '';
  }

  return fieldValue.toLowerCase();
};
