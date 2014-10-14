define(["jquery", "require", "aloha", "./spinner", "./topbar", "./pencil", "./ui", "./input", './linkui'],
function($, require, aloha, spinner, TopBar, Pencil, ui, Input, linkui){

  'use strict';
  
  // FIXME: text is not refreshed after ui change style
  // FIXME: cannot edit document again after closing the editor

  var topbar = new TopBar();
  var pencil = new Pencil(function(){
    show_edit_header();
    start_edit();
  });
  pencil.show();

  var save_button = $('<button class="save">Save</button>');
  var close_button = $('<button class="close">Close Without Saving</button>');
  
  var title = $('head > title');
  if(title.length == 0) {
    title = $('<title>').prependTo($('head'));
  }
  var title_input = new Input(title.text(), "Untitled Document", function(text){
    title.text(text);
  }/*, stop_restart_edit*/); // FIXME: workaround aloha bug
  
  var link_list = $('<ul>')
    .css('list-style-image', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEU"+
         "gAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCan"+
         "BgAAAAHdElNRQfeCg0MGB4tNEvdAAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpd"+
         "GggR0lNUGQuZQcAAADySURBVCjPbdE/K8QBHMfxl1hNUsfgT8rG0Q2egkG5ZLDYpHsGN"+
         "k+BLiUPwAOQssvgMNiMUtxwSU7Heh8DRz/ns77f9enz/dKfGUcu1U36N4s6IuLdUj8ui"+
         "2i70RYfpoq4pCVejaCiLQ6KQlU0lc0ZQEM0hgrCqFc7Lgybd6+E2x4as2bbrHXR1TGhL"+
         "t5Mf+GKZ3FuQ1dXrDgVsdgbFnFiWXRFVV08q3zhaW9iz+oPHlazZqzXfige8CRiy75ac"+
         "VpDXGNXy4KmqBaFA/FoHAPaoqVUFKZ8iEdXXkSU+++/5P37PZ3esN8MounYoDiz6e6v8"+
         "An9CmFPyeXSGgAAAABJRU5ErkJggg==')")
    .append($('<li>')
      .append($('<a href="">add link</a>')
        .click(function(){
          addLink('rel');
          return false;
        }))
      .append(document.createTextNode(", "))
      .append($('<a href="">add backlink</a>')
        .click(function(){
          addLink('rev');
          return false;
        })));

  function addLink(relrev){
    $('head').append(
      $('<link>')
        .attr(relrev, "link"))
    refreshLinkList();
  }

  function refreshLinkList(){
    $(link_list[0]).children().filter(':not(:last)').remove();
    var relrevlist = [];
    $('head > link')
      .each(function(){
        var link = $(this);
        var rel  = link.attr('rel');
        var rev  = link.attr('rev');
        var relrev = (rel !== undefined) ? rel : rev;
        if(relrevlist.indexOf(relrev)) relrevlist.push(relrev);
      })
      .each(function(){
        var link = $(this);
        var rel = link.attr('rel');
        var rev = link.attr('rev');
        var text   = (rel !== undefined) ? "link" : "backlink";
        var relrev = (rel !== undefined) ? rel : rev;
        var in_href  = new Input(link.attr('href'),  "URL",   setHref/*,  stop_restart_edit*/);
        var in_title = new Input(link.attr('title'), "Title", setTitle, function(focus) {
          //stop_restart_edit(focus);
          if(focus) linkui.open(in_title.element(), link[0]);
          else      linkui.close();
          //if(focus) $(in_href.element()).show()
          //else      setTimeout(10, function(){ $(in_href.element()).filter(':not(:focus)').hide(); });
        });
        var li = $("<li>")
          .append(document.createTextNode(text + ": "))
          .append(makeSelect(relrevlist, text, setRel).val(relrev))
          .append(document.createTextNode(" "))
          .append($(in_title.element())
            .attr('title', link.attr('href')))
          .append(document.createTextNode(" "))
          .append($(in_href.element()).hide())
          .insertBefore(link_list.children().last())
          .append($('<a>')
            .text('X')
            .attr('title', 'delete')
            .attr('href', '')
            .click(remove));
        
        function setHref(href) {
          link.attr('href', href);
          $(in_title.element()).attr('title', href);
        }
        function setTitle(title) {
          link.attr('title', title);
        }
        function setRel(rel) {
          link.attr((rel !== undefined) ? 'rel' : 'rev', rel);
        }
        function remove() {
          link.remove();
          li.remove();
          return false;
        }
      });
    
    function makeSelect(list, text, cb){
      var select = $('<select>')
        .css('cursor', 'pointer')
        .css('border', 'inherit')
        .css('font', 'inherit')
        .css('background', 'inherit');
      for(var i = 0; i < list.length; i++){
        select.append($('<option>').text(list[i]));
      }
      var lastOpt = $('<option>')
        .text('...')
        .attr('value', '')
        .appendTo(select);
      select.change(function(){
        if(select.val() == "") {
          var value = prompt(text + " type");
          $('<option>').text(value).insertBefore(lastOpt);
          select.val(value);
        }
        cb(select.val());
        return true;
      });
      return select;
    }
  }
  
  refreshLinkList();

  topbar.element()
    //.append($(aloha_toolbar))
    .append(ui.toolbar)
    .append($('<div>')
      .css('padding-left', '1em')
      .css('padding-right', '1em')
      .append($('<h1>')
        /*.append($('<input>')
          .css('border', 'inherit')
          .css('font', 'inherit')
          .css('background', 'inherit')
          .css('border-bottom-style', 'solid')
          .css('border-bottom-width', '1px')
          .css('border-bottom-color', 'rgba(0, 0, 0, 0.5)')
          .attr('placeholder', 'Document Title')
          .attr('value',       $('head>title').text()))*/
        .append(title_input.editor_element()))
    .append(link_list)
    .append(save_button)
    .append(close_button));

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
    if(!list) list = $('body > :not([class*="aloha"])');
    for(var i = 0; i < list.length; ++i) {
      aloha(list[i]);
    }
  }

  function stop_edit(save){
    for(var i = 0; i < list.length; ++i) {
      aloha.mahalo(list[i]);
    }
  }
  
  /*
  function stop_restart_edit(stop) {
    if(stop) {
      stop_edit(false);
    } else {
      start_edit();
    }
  }
  */
  
  var stylesheet = $('<link>')
    .attr('rel', 'stylesheet')
    .attr('type', 'text/css')
    .attr('href', require.toUrl("./style.css"));

  function show_edit_header(){
    pencil.hide();
    topbar.open();
    stylesheet.appendTo($('head'));
    console.log(stylesheet);
  }

  function hide_edit_header(){
    stylesheet.detach();
    topbar.close();
    pencil.show();
  }

});
