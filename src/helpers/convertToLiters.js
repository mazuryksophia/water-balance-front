export const convertToLiters = (ml) => {
  if (ml >= 1000) {
    return { value: ml / 1000, text: 'л' };
  } else {
    return { value: ml, text: 'мл' };
  }
};
