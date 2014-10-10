define(["jquery", "aloha", "./spinner", "./topbar", "./pencil",
        "./aloha-ui"],
function($, aloha, spinner, TopBar, Pencil, aloha_ui){

  'use strict';

  var topbar = new TopBar();
  var pencil = new Pencil(function(){
    this.hide();
    topbar.open();
    //aloha_ui();
    start_edit();
  });
  pencil.show();
  
  var aloha_toolbar=$(
    '<div class="aloha-ui btn-toolbar" role="toolbar">\n'+
		'  <div class="btn-group">\n'+
		'	  <button type="button" class="aloha-action-B btn btn-default" title="Bold"><b>B</b></button>\n'+
		'	  <button type="button" class="aloha-action-I btn btn-default" title="Italic"><i>I</i></button>\n'+
		'	  <button type="button" class="aloha-action-unformat btn btn-default" title="Remove formatting"><span class="glyphicon glyphicon-remove"></span></button>\n'+
		'  </div>\n'+
		'  <div class="btn-group">\n'+
		'	  <button type="button" class="aloha-action-OL btn btn-default" title="Ordered List"><span class="glyphicon glyphicon-list"></span></button>\n'+
		'	  <button type="button" class="aloha-action-UL btn btn-default" title="Unordered List"><span class="glyphicon glyphicon-list"></span></button>\n'+
		'  </div>\n'+
		'  <!--div class="btn-group">\n'+
		'	  <button type="button" class="aloha-action-undo btn btn-default" title="Undo"><span class="glyphicon glyphicon-step-backward"></span></button>\n'+
		'	  <button type="button" class="aloha-action-redo btn btn-default" title="Redo"><span class="glyphicon glyphicon-step-forward"></span></button>\n'+
		'  </div-->\n'+
		'  <div class="btn-group">\n'+
		'	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n'+
		'		  Paragraph <span class="caret"></span>\n'+
		'	  </button>\n'+
		'	  <ul class="dropdown-menu funky" role="menu">\n'+
		'		  <li><a href="#" class="aloha-action-H2">Heading 2</a></li>\n'+
		'		  <li><a href="#" class="aloha-action-H3">Heading 3</a></li>\n'+
		'		  <li><a href="#" class="aloha-action-H4">Heading 4</a></li>\n'+
		'		  <li><a href="#" class="aloha-action-P">Paragraph</a></li>\n'+
		'		  <li><a href="#" class="aloha-action-PRE">Preformatted</a></li>\n'+
		'	  </ul>\n'+
		'  </div>\n'+
		'  <div class="btn-group">\n'+
		'	  <button type="button" data-activeon="a" title="Create Link"	class="aloha-action-A btn btn-default">\n'+
		'		  <span class="glyphicon glyphicon-link"></span>\n'+
		'	  </button>\n'+
		'  </div>\n'+
	  '</div>'
  );

  var save_button = $('<button class="save">Save</button>');
  var close_button = $('<button class="close">Close Without Saving</button>');
  topbar.element()
    //.append($(aloha_toolbar))
    .append($('<h1>Editing document</h1>'))
    .append($('<ul class="links"><li><button class="add">Add</button></li></ul>'))
    .append(save_button)
    .append(close_button);

  save_button
    .click(function(){
      stop_edit(true);
      save_button.prepend(spinner).prop("disabled", true)

      var text = (new XMLSerializer()).serializeToString(document);
      console.log(text);

      setTimeout(callback.bind(this, new Error("Document not saved, not yet implemented")), 2500);

      function callback(err){
        save_button.prop("disabled", false).find(".spinner").remove();
        if(err) {
          alert(err.toString());
          start_edit();
        } else {
          hide_edit_header();
        }
      }
    });

  close_button
    .click(function(){
      stop_edit(false);
      hide_edit_header();
    });

  var list;

  function start_edit(){
    list = $('body > :not([class*="aloha"])');
    for(var i = 0; i < list.length; ++i) {
      aloha(list[i]);
    }
  }

  function stop_edit(save){
    for(var i = 0; i < list.length; ++i) {
      aloha.mahalo(list[i])
    }
  }

  function hide_edit_header(){
    topbar.close();
    pencil.show();
  }

});
