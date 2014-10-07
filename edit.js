
console.log("edit.js");

Aloha = {
  settings: {
    bundles: {
      edit: "../../../plugins"
    },
    plugins: {
      load: ["common/ui","common/format","common/highlighteditables","common/link","edit/topbar","edit/edit"]
    },
    sidebar: {
      disabled: true
    }
  }
};

var dev = true;

if(dev) {
  add_element("script", {type: "text/javascript", src: "Aloha-Editor/src/lib/require.js"});
  //add_element("script", {type: "text/javascript", src: "Aloha-Editor/src/lib/vendor/jquery-1.7.2.js"});
  //add_element("script", {type: "text/javascript", src: "jquery-2.1.1.min.js"});
  //add_element("script", {type: "text/javascript"}, "define('jquery', function(){ return window.jQuery; });");
  add_element("script", {type: "text/javascript", src: "Aloha-Editor/src/lib/aloha.js"});
  //add_element("script", {type: "text/javascript", src: "edit-main.js"});
  add_element("link",   {rel: "stylesheet", href: "Aloha-Editor/src/css/aloha.css", type: "text/css"});
} else {
  add_element("script", {type: "text/javascript", src: "alohaeditor-1.1.0/aloha/lib/require.js"});
  add_element("script", {type: "text/javascript", src: "alohaeditor-1.1.0/aloha/lib/vendor/jquery-1.7.2.js"});
  //add_element("script", {type: "text/javascript", src: "jquery-2.1.1.min.js"});
  //add_element("script", {type: "text/javascript"}, "Aloha.settings.predefinedModules.jquery = jQuery;");
  add_element("script", {type: "text/javascript", src: "alohaeditor-1.1.0/aloha/lib/aloha.js",
    "data-aloha-plugins": "common/ui,common/format,common/highlighteditables,common/link"});
  add_element("script", {type: "text/javascript", src: "edit-main.js"});
  add_element("link",   {rel: "stylesheet", href: "alohaeditor-1.1.0/aloha/css/aloha.css", type: "text/css"});
}

function add_element(tagName, t, code){
  var e = document.createElement(tagName);
  e.setAttribute("data-generated", "true")
  e.setAttributeNS("tag:mildred.fr,2014:webedit", "generated", "true")
  for(k in t){
    e.setAttribute(k, t[k]);
  }
  if(code) t.innerHTML = code;
  document.getElementsByTagName("head")[0].appendChild(e);
}