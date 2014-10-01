
Aloha = {};
Aloha.settings = { sidebar: { disabled: true } };

add_element("script", {type: "text/javascript", src: "jquery-2.1.1.min.js"});
//add_element("link",   {rel: "stylesheet", href: "alohaeditor-1.1.0/aloha/css/aloha.css", type: "text/css"});
//add_element("script", {type: "text/javascript", src: "alohaeditor-1.1.0/aloha/lib/require.js"});
//add_element("script", {type: "text/javascript", src: "alohaeditor-1.1.0/aloha/lib/aloha.js",
//  "data-aloha-plugins": "common/ui,common/format,common/highlighteditables,common/link"});
add_element("script", {type: "text/javascript", src: "edit-main.js"});

function add_element(tagName, t, code){
  var e = document.createElement(tagName);
  e.setAttribute("data-generated", "true")
  for(k in t){
    e.setAttribute(k, t[k]);
  }
  if(code) t.innerHTML = code;
  document.head.appendChild(e);
}