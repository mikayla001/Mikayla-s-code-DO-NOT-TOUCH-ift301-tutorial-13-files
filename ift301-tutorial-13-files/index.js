"use strict";

function validateEmail(email) {
  let tmp = email.split('@');

  //ends functiohn if there is no @ symbol
  if (tmp.length < 2) return "missing the @ symbol";

  let prefixPattern = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")/;

  if (!prefixPattern.test(tmp[0])) return "invalid prefix";

  let domainPattern = /(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!domainPattern.test(tmp[1])) return "invalid domain";

  return "valid";
}

function formatPhoneNumber(phone){
  
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