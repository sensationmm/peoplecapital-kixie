export const phoneNumber = (phoneNumber) => {
  const PHONE_NUMBER = /^\+[1-9]\d{10,14}$/; // E.164

  return PHONE_NUMBER.test(phoneNumber);
}

export const message = (message) => {
  return message !== '';
}