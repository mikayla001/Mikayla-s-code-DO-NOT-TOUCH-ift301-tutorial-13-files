"use strict";

function validateEmail(email) {
  let tmp = email.split('@');

  //ends functiohn if there is no @ symbol
  if (tmp.length < 2) return "missing @ symbol";

  let prefixPattern = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")/;

  if (!prefixPattern.test(tmp[0])) return "invalid prefix";

  let domainPattern = /(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!domainPattern.test(tmp[1])) return "invalid domain";

  return "valid";
}

function formatPhoneNumber(phone){
  let tmpPhone = phone.replace(/\D/g, '');

  //holds phone number
  let formattedPhone = '';

  if (tmpPhone.length < 4) {
    formattedPhone = '(' + tmpPhone.substr(0, 3);
  }
  else if (tmpPhone.length < 7) formattedPhone = '(' + tmpPhone.substr(0, 3) + ') ' + tmpPhone.substr(3, 3);
  else if (tmpPhone.length  < 11) formattedPhone = '(' + tmpPhone.substr(0, 3) + ') ' + tmpPhone.substr(3, 3) + '-' + tmpPhone.substr(6, 4);

  document.getElementById('contactPhone').value = formattedPhone;
}

function validatePhoneNumber(phone){
  let tmpPhone = phone.replace(/\D/g, '');

  formatPhoneNumber(phone);

  if (tmpPhone.length < 10) return "too short";
  else if (tmpPhone.length > 10) return "too long";

  //first 3 chars of phone number
  let areaCode = tmpPhone.substr(0, 3);
  let exchangeCode = tmpPhone.substr(3, 3);
  let stationCode = tmpPhone.substr(6, 4);

  if (!areaCode.match(/^[2-9][0-8][0-9]$/)) return "invalid area code";

  if (!exchangeCode.match(/^[2-9][0-9]{2}$/)) return "invalid exchange code";

  if (!stationCode.match(/^[0-9]{4}$/)) return "invalid station code";

  return "valid";
}

function validateState(state){
  const states = ( 
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  );

  if (state.length === 0) return "state is required";

  if (states.indexOf(state) === -1) return "invalid state";

  return "valid";
}

function validateZipCode(zip){
  if (zip.length === 0) return "zip code is required";

  if (zip.search(/\D/) !== -1) return "enter only numbers for zip code";

  if (zip.length < 5) return "zip code is too short";

  if (zip.length > 5) return "zip code is too long";

  return "valid";
}

function validateCityStateZip(){
  let cityEl = document.getElementById('city');
  let stateEl = document.getElementById('state');
  let zipEl = document.getElementById('zip');

  let cityValid;
  if (cityEl.value.length > 0){
    cityValid = 'valid';
  }
  else {
    cityValid = 'city is required';
  }

  let stateValid = validateState(stateEl.value);

  let zipValid = validateZipCode(zipEl.value);

  if (cityValid === 'valid'){
    cityEl.classList.remove('invalid');
    cityEl.classList.add('valid');
  }
  else {
    cityEl.classList.remove('valid');
    cityEl.classList.add('invalid');
  }

  if (stateValid === 'valid'){
    stateEl.classList.remove('invalid');
    stateEl.classList.add('valid');
  }
  else {
    stateEl.classList.remove('valid');
    stateEl.classList.add('invalid');
  }

  if (zipValid === 'valid'){
    zipEl.classList.remove('invalid');
    zipEl.classList.add('valid');
  }
  else {
    zipEl.classList.remove('valid');
    zipEl.classList.add('invalid');
  }

  if (cityValid !== 'valid') return  cityValid;
  else if (stateValid !== 'valid') return stateValid;
  else if (zipValid !== 'valid') return zipValid;
  return "valid";
}

function validatePackages(){
  let packageEls = document.querySelectorAll('.packageLabel input[type="radio"]:checked');

  if (packageEls.length === 0) return "please select only one package";

  return "valid";
}

function getCardType(){
  let cardEls = document.querySelectorAll('.cardLabel input[type="radio"]:checked');

  if (cardEls.length === 0) return "";
  return cardEls[0].value;
}

function formatCardNumber(num, type = ''){
  let tmpNumber = num.replace(/\D/g, '');
  tmpNumber = tmpNumber.slice(0, 17);

  let formattedNum = [];

  if (tmpNumber.length > 0) {
    formattedNum.push(tmpNumber.substr(0, 4))};
  if (type !== 'American Express') {
    if (tmpNumber.length > 4) formattedNum.push(tmpNumber.substr(4, 4));
    if (tmpNumber.length > 8) formattedNum.push(tmpNumber.substr(8, 4));
    if (tmpNumber.length > 12) formattedNum.push(tmpNumber.substr(12, 4));
  }
  else {
    if (tmpNumber.length > 4) formattedNum.push(tmpNumber.substr(4, 6));
    if (tmpNumber.length > 10) formattedNum.push(tmpNumber.substr(10, 5));
  }

  document.getElementById('cardNumber').value = formattedNum.join('-');
}

/* Predefined Functions */

function isStrictMode() {
	return (eval("var __temp = null"), (typeof __temp === "undefined")) ? 'strict' : 'non-strict';
}

function functionExists(fname) {
  const ctx = (typeof window !== 'undefined' ? window : global)
  if(typeof fname === 'string') fname = ctx[fname]
  return typeof fname === 'function'
}