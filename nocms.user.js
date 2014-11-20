// ==UserScript==
// @name          No CMS
// @namespace     tag:mildred.fr,2014:nocms.user.js
// @description   No CMS includes an editor to edit any page you visit
// @include       *
// @require       require.js
// @require       nocms.deps.js
// @require       jquery-2.1.1.js
// @version       1.0
// @grant         none
// ==/UserScript==

try {

  console.log("nocms.user.js");

  var $ = jQuery.noConflict(true);
  define("jquery", [], function($){ return $; });

  requirejs(['edit/main'], function(aloha){
    console.log("main loaded");
  });


} catch(e) {
  console.log(e);
}

