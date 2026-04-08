"use strict";


/* Predefined Functions */

function isStrictMode() {
	return (eval("var __temp = null"), (typeof __temp === "undefined")) ? 'strict' : 'non-strict';
}

function functionExists(fname) {
  const ctx = (typeof window !== 'undefined' ? window : global)
  if(typeof fname === 'string') fname = ctx[fname]
  return typeof fname === 'function'
}