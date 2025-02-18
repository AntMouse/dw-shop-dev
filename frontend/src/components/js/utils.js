// components/js/utils.js
export const maskPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length >= 4) {
    const maskedPart = phoneNumber.slice(-4).replace(/./g, '*');
    return phoneNumber.slice(0, -4) + maskedPart;
  }
  return phoneNumber;
};
