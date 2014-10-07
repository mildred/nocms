define([
  'jquery',
  'aloha/plugin',
  'aloha/ephemera',
  './spinner'
], function (
  $,
  Plugin,
  Ephemera,
  spinner
) {
  'use strict';

  Ephemera.classes('aloha-edit');

  return Plugin.create('edit', {
    dependencies: ['topbar'],

    init: function () {
      var self = this;

      this._toolbar = $('<div class="aloha-edit"></div>')
        .css('position', 'absolute')
        .css('right', 0)
        .css('top', 0)
        .prependTo(document.body);

      this._pencil = $(' <a href="#">&#10000;</a> ')
        .css('text-decoration', 'none')
        .appendTo(this._toolbar)
        .click(function(){
          self.start_edit();
          return false;
        });

      this._save_button = $('<button class="save">Save</button>')
        .click(function(){
          self.stop_edit(true);
          $(this).prepend(spinner.html).prop("disabled", true)

          var text = '<?xml version="1.0" encoding="' + document.characterSet + '"?>\n';
          var serializer = new XMLSerializer();
          for(var i = 0; i < document.childNodes.length; ++i) {
            var node = document.childNodes[i];
            if (node == document.documentElement) {
              node = Ephemera.prune($(document.documentElement).clone()[0]);
              node.removeAttribute('class');
            }
            text += serializer.serializeToString(node) + '\n';
          }
          console.log(text);

          setTimeout(function(){
            alert("Document not saved, not yet implemented");
            self.hide_edit_header();
            self._save_button.prop("disabled", false).find(".spinner").remove();
          }, 2500);
        });

      this._close_button = $('<button class="close">Close Without Saving</button>')
        .click(function(){
          self.stop_edit(false);
          self.hide_edit_header();
        });

      Aloha.require(["topbar/topbar-plugin"], function(TopBar) {
        TopBar.element()
          .append(self._save_button)
          .append(self._close_button);
      });
    },

    hide_edit_header: function(){
      var self = this;
      Aloha.require(["topbar/topbar-plugin"], function(TopBar) {
        TopBar.close(function(){
          self._toolbar.prependTo(document.body);
        });
      });
    },

    start_edit: function(){
      this._toolbar.detach();
      Aloha.require(["topbar/topbar-plugin"], function(TopBar) {
        TopBar.open();
      });

      this._aloha_elems = $("body > :not(.aloha-edit):not(.aloha-topbar):not(#aloha-ui-context):not(.aloha-surface)");
      this._aloha_elems.aloha();
      // :not(.aloha-cleanme):not(aloha-ephemera):not()
      /*
      var popover = $("<div>")
        .css("position", "fixed")
        .css("width", "50%")
        .css("height", "50%")
        .css("top", "25%")
        .css("left", "25%")
        .css("text-align", "center")
        .css("padding", "1em")
        .css("background-color", "white")
        .css("border-radius", "1em")
        .prependTo(document.body)
        .append($("<p>").text("Downloading original version of the page..."))
        .append($(spinner.html));
      $.get(location.href, function(data){
        popover.detach();
        rawdocument = parser.parseFromString(data, "text/html");
        var tagname = rawdocument.documentElement.tagName.toUpperCase();
        var i = data.toUpperCase().indexOf("<" + tagname);
        var j = data.toUpperCase().lastIndexOf("</" + tagname + ">");
        if (i == -1) {
          alert("Did not find <" + tagname + " in " + data);
        } else if(j == -1) {
          alert("Did not find </" + tagname + "> in " + data);
        } else {
          rawdocheader = data.substr(0, i);
          rawdocfooter = data.substr(j + tagname.length + 3);
          var imported_elems = $(rawdocument.body).children();
          var elems = $(document.body).children().filter("[data-generated='false']");
          if (imported_elems.length != elems.length) {
            alert("Cannot read original file");
            console.log(rawdocument);
            console.log(imported_elems);
            console.log(elems);
          } else {
            for(var i = 0; i < elems.length; ++i) {
              var new_elem = $(imported_elems[i]).clone();
              new_elem[0].__editor_backup__ = elems[i];
              new_elem
                .replaceAll($(elems[i]))
                .attr("data-generated", "false");
              $(":not([data-generated])", new_elem).attr("data-generated", "false")
              Aloha.jQuery(new_elem).aloha();
              new_elem[0].__editor_source__ = imported_elems[i];
            }
            show_edit_header();
            $(":not([data-generated])").attr("data-generated", "true")
          }
        }
      }, "text");
      */
    },

    stop_edit: function(save){
      this._aloha_elems.mahalo();
      if(save) {
      }
       /*$(document.body).children().filter("[data-generated='false']").each(function(){
         Aloha.jQuery(this).mahalo().removeClass('aloha-editable-highlight');
         if(save) {
           var new_elem = $(this).clone();
           $("[data-generated]", new_elem).removeAttr("data-generated");
           $(new_elem).replaceAll(this.__editor_source__);
         } else {
           $(this.__editor_backup__).replaceAll(this);
         }
       });*/
     }
  });
});