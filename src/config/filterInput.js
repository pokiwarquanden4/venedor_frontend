export const emailFilter = (email) => {
  const gmailRegex = /^[^\s@]+@gmail\.com$/i;
  return gmailRegex.test(email);
};

export const passwordFilter = (email) => {
  return email.length >= 10 ? true : false;
};

export const decodePrice = (input) => {
  if (!input) return ''; // Handle empty or undefined input
  return input.replace(/[^\d]/g, ''); // Remove all non-numeric characters
};

export const encodePrice = (input) => {
  if (!input) return ''; // Handle empty or undefined input
  const rawValue = String(input).replace(/\D/g, ''); // Loại bỏ ký tự không phải số
  const formattedValue = new Intl.NumberFormat('vi-VN').format(rawValue); // Định dạng VND
  return formattedValue;
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
  if (!input) return ''; // Handle empty or undefined input
  return parseInt(input.replace('%', '').trim(), 10) || 0; // Loại bỏ '%' và chuyển đổi thành số
};

export const encodeSaleOff = (input) => {
  const value = String(input).replace(/\D/g, ''); // Remove non-numeric characters
  if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
    return value
  }
  return null
};
