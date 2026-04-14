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

//idk why this is not 100
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

//idk why this is not 100
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

  if (packageEls.length === 0) return "please select a package";
  else if (packageEls.length > 1) return 'please select only one package';
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

function validateCardInformation() {
  let cardEl = document.getElementById('cardContainer');
  let cardErrorEl = document.getElementById('cardError');
  let cardNumberEl = document.getElementById('cardNumber');
  let cardNumberErrorEl = document.getElementById('cardNumberError');
  let scEl = document.getElementById('securityCode');
  let scErrorEl = document.getElementById('securityCodeError');
  
  let cardType = getCardType();

  let cardNumberType = '';
  let cnValid = '';
  let ctValid = '';
  let scValid = '';
  let cardValid = '';

  if (cardType === '') ctValid = "please select a card type";
  else ctValid = "valid";

  let tmpNum = cardNumberEl.value.replace(/\D/g, '');

  //here

  if (tmpNum.length === 0) {
    cnValid = 'enter a valid card number';
    formatCardNumber(tmpNum, '');
  } else {
    if (/^4[0-9]{6,}$/.test(tmpNum)) {
      cardNumberType = 'Visa';
      formatCardNumber(tmpNum, 'Visa');
    } else if (/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(tmpNum)) {
      cardNumberType = 'Discover';
      formatCardNumber(tmpNum, 'Discover');
    } else if (/^3[47][0-9]{5,}$/.test(tmpNum)) {
      cardNumberType = 'American Express';
      formatCardNumber(tmpNum, 'American Express');
    } else if (/^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/.test(tmpNum)) {
      cardNumberType = 'Mastercard';
      formatCardNumber(tmpNum, 'Mastercard');
    }
    
    let cEls = document.querySelectorAll('.cardLabel input[type="radio"]');
    for (let i = 0; i < cEls.length; i++) {
      if (cardNumberType !== '' && cEls[i].value === cardNumberType) {
        cEls[i].checked = true;
      } else {
        cEls[i].checked = false;
      }
    }
    
    if (cardNumberType !== '' && checkLuhn(tmpNum) === true) {
      if (cardNumberType !== 'American Express' && tmpNum.length === 16) {
        cnValid = 'valid';
      } else if (cardNumberType === 'American Express' && tmpNum.length === 15) {
        cnValid = 'valid';
      } else {
        cnValid = 'invalid card number';
      }
    } else {
      cnValid = 'invalid card number';
    }
  }
  
  cardType = getCardType();
  
  if (cardType === '') {
    ctValid = 'please select a card type';
  } else if (cardNumberType === '') {
    ctValid = 'card type not accepted';
  } else if (cardType !== cardNumberType) {
    ctValid = 'card type and number do not match';
  } else {
    ctValid = 'valid';
  }
  
  if (ctValid !== 'valid' && cardValid === 'valid' && cnValid === 'valid') {
    cardErrorEl.innerHTML = ctValid;
    cardNumberErrorEl.innerHTML = ctValid;
    cardEl.classList.remove('valid');
    cardNumberEl.classList.remove('valid');
    cardEl.classList.add('invalid');
    cardNumberEl.classList.add('invalid');
  } 
  else {
    if (cardValid !== 'valid') {
      cardErrorEl.innerHTML = cardValid;
      cardEl.classList.remove('valid');
      cardEl.classList.add('invalid');
    } else {
      cardErrorEl.innerHTML = '&nbsp;';
      cardEl.classList.remove('invalid');
      cardEl.classList.add('valid');
    }
    
    if (cnValid !== 'valid') {
      cardNumberErrorEl.innerHTML = cnValid;
      cardNumberEl.classList.remove('valid');
      cardNumberEl.classList.add('invalid');
    } else {
      cardNumberErrorEl.innerHTML = '&nbsp;';
      cardNumberEl.classList.remove('invalid');
      cardNumberEl.classList.add('valid');
    }
  }
  
  let code = scEl.value;
  
  if (/\D/.test(code)) {
    scValid = 'invalid';
  } 
  else if (cardType !== '') {
    if (cardType === 'American Express') {
      if (code.length < 4) {
        scValid = 'too short';
      } else if (code.length > 4) {
        scValid = 'too long';
      } else {
        scValid = 'valid';
      }
    } else {
      if (code.length < 3) {
        scValid = 'too short';
      } else if (code.length > 3) {
        scValid = 'too long';
      } else {
        scValid = 'valid';
      }
    }
  } 
  else {
    scValid = 'required';
  }
  
  if (scValid === 'valid') {
    scErrorEl.innerHTML = '&nbsp;';
    scEl.classList.remove('invalid');
    scEl.classList.add('valid');
  } else {
    scErrorEl.innerHTML = scValid;
    scEl.classList.remove('valid');
    scEl.classList.add('invalid');
  }

}

function validateExpirationDate () {
  let emEl = document.getElementById('expirationMonth');
  let eyEl = document.getElementById('expirationYear');
  
  let m = emEl.options[emEl.selectedIndex].value;
  let y = eyEl.value;
  
  let isValid = '';
  
  if (m === '') {
    isValid = 'select a month';
  } 
  else if (y === '') {
    isValid = 'enter a year';
  } 
  else {
    if (!/^\d{4}$/.test(y)) {
      isValid = 'enter a valid year';
    } 
    else {
      let month = parseInt(m);
      let year = parseInt(y);
      let d = new Date(year, month - 1);
      let thisMonth = new Date().getMonth();
      let thisYear = new Date().getFullYear();
      let t = new Date(thisYear, thisMonth);
      
      if (d < t) {
        isValid = 'card is expired';
      } else {
        isValid = 'valid';
      }
    }
  }
}

function validateField(el){
  let isValid  = null;
  let errorEl = null;
  let addClass = true;
  let showError = true;

  switch (el.id){ 
    case "contactEmail":
      isValid = validateEmail(el.value);
      errorEl  = document.getElementById("contactEmailError");
      break;

    case "contactPhone":
      isValid = validatePhoneNumber(el.value);
      errorEl = document.getElementById("contactPhoneError");
      break;

    case "state":
    case "city":
    case "zip":
      if (isMobile === false){
        addClass = false;
        errorEl = document.getElementById("cityStateZipError");
        isValid = validateCityStateZip();
      }

      if (isMobile === true){
        if (el.id === 'city'){
          errorEl = document.getElementById("cityError");

          if (el.value != '') isValid = "valid";
          else isValid = "city is required";
        }

        if (el.id === 'state'){
          errorEl = document.getElementById("stateError");
          isValid = validateState(el);
        }

        if (el.id === 'zip'){
          errorEl = document.getElementById("zipError");
          isValid = validateZipCode(el);
        }
      }
      break;
      
    case "companyName":
    case "contactPerson":
    case "streetAddress":
      if (el.value != '') isValid = "valid";
      else isValid = "required";

      switch (el.id) {
        case "companyName":
          errorEl = document.getElementById("companyNameError");
          break;
        case "contactPerson":
          errorEl = document.getElementById("contactPersonError");
          break;
        case "streetAddress":
          errorEl = document.getElementById("streetAddressError");
          break;
      }
      break;

      case "cardNumber":
      case "cardContainer":
      case "securityCode":
        showError = false;
        addClass = false;
        validateCardInformation();
        break;
      
    case "expirationMonth":
    case "expirationYear":
      addClass = false;
      errorEl = document.getElementById("expirationDateError");
      isValid = validateExpirationDate();
      break;
    
    case "packageContainer":
      isValid = validatePackages();
      errorEl = document.getElementById("packageError");
  }

  if (addClass === true){
    if (isValid === "valid") {
      el.classList.remove("invalid");
      el.classList.add("valid")
    }
    else {
      el.classList.remove("valid");
      el.classList.add("invalid")
    }
  }

  if (showError){
    if (isValid === "valid") errorEl.innerHTML = "&nbsp;";
    else errorEl.innerHTML = isValid;
  }
}

// global var
let isMobile = false;

function detectMobile(){
  let el = document.getElementById("cityError")

  let style = window.getComputedStyle(el)

  if (style.display === "none") isMobile = false;
  else isMobile = true;
}

let requiredFields = ("companyName",
  "contactPerson",
  "contactEmail",
  "contactPhone",
  "streetAddress",
  "zip",
  "state",
  "city",
  "packageContainer",
  "cardContainer",
  "cardNumber",
  "expirationMonth",
  "expirationYear",
  "securityCode");

function validateForm(e){
  e.preventDefault();

  let submitOK = true;

  for (let i = 0; i < requiredFields.length; i++) {
    const el = document.getElementById(requiredFields[i]);
    if (el.classList.contains("invalid")) submitOK = false;
  }
  if (submitOK === true) document.getElementById("registration").submit();
}

function initializeForm(){
  for (let i = 0; i < requiredFields.length; i++){
    const el = document.getElementById(requiredFields[i]);

    validateField(el);

    if (el.tagName.toLowerCase() === "input") {
      el.addEventListener("input", function() {
        validateField(this);
      });
    }

    else if (el.tagName === "select"){
      el.addEventListener("change", function(){
        validateField(this);
      });
    }
  } //end of for loop

  let els = document.querySelectorAll("packageLabel");
  for (let i = 0; i < els.length; i++){
    els[i].addEventListener("click", function() {
        validateField(document.getElementById("packageContainer"));
    });
  }

  els = document.querySelectorAll("cardLabel");
  for (let i = 0; i < els.length; i++) {
    els[i].addEventListener("click", function() {
      validateField(document.getElementById("cardContainer"));
    });
  }


 document.getElementById("registration").addEventListener("submit", validateForm, false);
}

//event listeners step 19
window.addEventListener("load", function(){
  initializeForm();
  detectMobile();
});

window.addEventListener("resize", function(){
  initializeForm();
  detectMobile();
});

/* Predefined Functions */

function isStrictMode() {
	return (eval("var __temp = null"), (typeof __temp === "undefined")) ? 'strict' : 'non-strict';
}

function functionExists(fname) {
  const ctx = (typeof window !== 'undefined' ? window : global)
  if(typeof fname === 'string') fname = ctx[fname]
  return typeof fname === 'function'
}