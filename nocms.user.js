// ==UserScript==
// @name          No CMS
// @namespace     tag:mildred.fr,2014:nocms.user.js
// @description   No CMS includes an editor to edit any page you visit
// @include       *
// @require       require.js
// @require       nocms.deps.js
// @version       1.0
// @grant         none
// ==/UserScript==

try {

console.log("nocms.user.js");

requirejs(['edit/main'], function(aloha){
  console.log("main loaded");
});


} catch(e) {
  console.log(e);
}

