export const emailFilter = (email) => {
  const gmailRegex = /^[^\s@]+@gmail\.com$/i;
  return gmailRegex.test(email);
};

export const passwordFilter = (email) => {
  return email.length >= 10 ? true : false;
};

export const decodePrice = (input) => {
  return input.replace(/\./g, '').replace('$', '');
};

export const quantityFilter = (input) => {
  const numberPattern = /^\d+$/;
  return numberPattern.test(input) && parseInt(input) > 0;
};

export const saleOffFilter = (input) => {
  const numberPattern = /^(100|[1-9]?\d)%$/;
  return numberPattern.test(input);
};

export const decodeSaleOff = (input) => {
  if (!input) {
    return 0;
  }
  return input.replace('%', '');
};

export const encodeSaleOff = (input) => {
  return input + '%';
};
