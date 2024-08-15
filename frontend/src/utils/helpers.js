// src/utils/helpers.js

const USD_TO_KES_RATE = 100.16; // Update this rate as needed

export const convertToKES = (usdPrice) => {
  return (usdPrice * USD_TO_KES_RATE).toFixed(2);
};

export const formatPrice = (price) => {
  const kesPrice = convertToKES(price);
  return `KES ${Number(kesPrice).toLocaleString()}`;
};