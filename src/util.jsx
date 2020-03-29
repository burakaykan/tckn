import React from 'react'

const validateIdNumber = idNumber => {
  let odd = 0,
   even = 0,
    result = 0,
    total = 0,
    i = 0;

  if (idNumber.length != 11) return false;
  if (isNaN(idNumber)) return false;
  if (idNumber[0] == 0) return false;

  odd =
    parseInt(idNumber[0]) +
    parseInt(idNumber[2]) +
    parseInt(idNumber[4]) +
    parseInt(idNumber[6]) +
    parseInt(idNumber[8]);
  even =
    parseInt(idNumber[1]) +
    parseInt(idNumber[3]) +
    parseInt(idNumber[5]) +
    parseInt(idNumber[7]);

  odd = odd * 7;
  result = Math.abs(odd - even);
  if (result % 10 != idNumber[9]) return false;

  for (let i = 0; i < 10; i++) {
    total += parseInt(idNumber[i]);
  }

  if (total % 10 != idNumber[10]) return false;

  return true;
};

const randomDigit = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateIdNumber = () => {
  var digits = [];
  var idNumber = "";
  digits[0] = randomDigit(1, 9);
  for (let i = 1; i < 9; i++) {
    digits[i] = randomDigit(0, 9);
  }
  digits[9] =
    ((digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7 -
      (digits[1] + digits[3] + digits[5] + digits[7])) %
    10;
  digits[10] =
    (digits[0] +
      digits[1] +
      digits[2] +
      digits[3] +
      digits[4] +
      digits[5] +
      digits[6] +
      digits[7] +
      digits[8] +
      digits[9]) %
    10;

  idNumber =
    digits[0].toString() +
    digits[1].toString() +
    digits[2].toString() +
    digits[3].toString() +
    digits[4].toString() +
    digits[5].toString() +
    digits[6].toString() +
    digits[7].toString() +
    digits[8].toString() +
    digits[9].toString() +
    digits[10].toString();

  return idNumber;
};

export {validateIdNumber, generateIdNumber};