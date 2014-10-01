jQuery(function( $ ) {

  $("head script[data-requirecontext='aloha'][data-requiremodule='jquery']").attr("data-generated", "true")
  $(":not([data-generated])").attr("data-generated", "false")

  var spinner = '<img class="spinner" src="data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKio'+
                'tzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fO'+
                'Li4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+Nb'+
                'W1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq'+
                '6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQE'+
                'AwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h'+
                'pDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSs'+
                'vgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
                'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAP'+
                'BhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPx'+
                'dSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQk'+
                'KE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH'+
                '0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AA'+
                'IKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2'+
                'zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACw'+
                'AAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdC'+
                'anWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBA'+
                'CH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG'+
                '9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpT'+
                'Z8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oV'+
                'gjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz'+
                '2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIy'+
                'pOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakx'+
                'NXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA"/ alt="please wait">';

  var centered_spinner = '<div style="position: fixed; top: 50%; left: 50%; margin-left: -8px; margin-top: -8px">' + spinner + '</div>';

  var overlay = $("<div></div>")
    .css("position", "absolute")
    .css("left", 0)
    .css("right", 0)
    .css("top", 0)
    .css("bottom", 0);

  var topbar = $('<div><h1>Editing document</h1>'+
      '<button class="save">Save</button>'+
      '<button class="close">Close Without Saving</button>'+
    '</div>')
    .css('background-image', 'linear-gradient(to top, #000000 0, #EEEEEE 8px)')
    .css('padding-top', '1em')
    .css('padding-left', '1em')
    .css('padding-right', '1em')
    .css('padding-bottom', '16px');
  topbar.children().filter(":first").css("margin-top", 0);

  var iframe;

  var toolbar = $('<div></div>')
    .css('position', 'absolute')
    .css('right', 0)
    .css('top', 0);

  var pencil = $(' <a href="#">&#10000;</a> ')
    .css('text-decoration', 'none')
    .appendTo(toolbar)
    .click(function(){
      start_edit();
      return false;
    });

  var clean = $(' <a href="#">clean</a> ')
    .css('text-decoration', 'none')
    //.appendTo(toolbar)
    .click(function(){
      $(":not([data-generated='false'])").remove();
      $("*").removeAttr("data-generated");
      return false;
    });

  var save_button = topbar.find("button.save");
  save_button
    .click(function(){
      stop_edit();
      save_button.prepend(spinner).prop("disabled", true)

      var page = $(":root").clone();
      $(":not([data-generated='false'])", page).remove();
      $("*", page).removeAttr("data-generated");
      page.removeAttr("data-generated");
      console.log(page[0].outerHTML);

      setTimeout(function(){
        alert("Document not saved, not yet implemented");
        hide_edit_header();
        save_button.prop("disabled", false).find(".spinner").remove();
      }, 2500);
    });

  topbar.find("button.close")
    .click(function(){
      stop_edit();
      hide_edit_header();
    });

  var close = $(' <a href="#">&#10005;</a> ')
    .css('text-decoration', 'none')
    //.appendTo(toolbar)
    .click(uninstall);

  install();

  function install(){
    toolbar.prependTo($('body'));
  }

  function uninstall(){
    toolbar.detach();
  }

  var editing;

  function start_edit(){
    show_overlay();
    var iframe_doc;
    $.get(window.location.href, function(data){
      iframe = $("<iframe></iframe>")
        .css("border", "none")
        .css("width", "100%")
        .css("overflow", "none")
        .attr("scrolling", "no")
        .attr("src", window.location.href)
        .height(document.documentElement.scrollHeight - topbar.height())
        .replaceAll(iframe);

      var win = iframe[0].contentWindow;
      win.location = location;
      iframe_doc = iframe.contents()[0];
      iframe_doc.write(data);
      setTimeout(resizeIframe, 1000);

      var loaded = false;
      editing = $();

      var observer = new MutationObserver(function(mutations) {
        if(editing.length == 0) {
          editing = $(iframe_doc.body).children().filter(":visible").filter(":not(.aloha)");
          if(editing.length != 0) {

            /*
            $.get("jquery-2.1.1.min.js", function(data){
              $('<script type="text/javascript"></script>')
                .text(data)
                .appendTo(iframe_doc.head);
            }, "text");
            $.get("alohaeditor-1.1.0/aloha/css/aloha.css", function(data){
              $('<style type="text/css"></style>')
                .text(data)
                .appendTo(iframe_doc.head);
            }, "text");
            $.get("alohaeditor-1.1.0/aloha/lib/require.js", function(data){
              $('<script type="text/javascript"></script>')
                .text(data)
                .appendTo(iframe_doc.head);
            }, "text");
            $.get("alohaeditor-1.1.0/aloha/lib/aloha.js", function(data){
              $('<script type="text/javascript"></script>')
                .attr("data-aloha-plugins",  "common/ui,common/format,common/highlighteditables,common/link")
                .text(data)
                .appendTo(iframe_doc.head);
            }, "text");
            */

            var base = location.href.replace(/\/[^\/]*$/, "/");
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .text("Aloha = {}; Aloha.settings = { sidebar: { disabled: true } };")
              .appendTo(iframe_doc.head);
            $(iframe_doc.createElement("link"))
              .attr("rel", "stylesheet")
              .attr("type", "text/css")
              .attr("href",  base + "alohaeditor-1.1.0/aloha/css/aloha.css")
              .appendTo(iframe_doc.head);
            /*
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .attr("src",  base + "jquery-2.1.1.min.js")
              .appendTo(iframe_doc.head);
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .attr("src",  base + "alohaeditor-1.1.0/aloha/lib/require.js")
              .appendTo(iframe_doc.head);
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .attr("src",  base + "alohaeditor-1.1.0/aloha/lib/aloha.js")
              .attr("data-aloha-plugins",  "common/ui,common/format,common/highlighteditables,common/link")
              .appendTo(iframe_doc.head);
            */
            /*
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .attr("src",  base + "alohaeditor-1.1.0/aloha/lib/aloha-full.js")
              .attr("data-aloha-plugins",  "common/ui,common/format,common/highlighteditables,common/link")
              .appendTo(iframe_doc.head);
            */
            $(iframe_doc.createElement("script"))
              .attr("type", "text/javascript")
              .text('"$(iframe_doc.body).children().filter(":visible").filter(":not(.aloha)").each(function(){ win.Aloha.jQuery(this).aloha(); })')
              .appendTo(iframe_doc.head);

            /*editing.each(function(){
              win.Aloha.jQuery(this).aloha();
            });*/
          }
        }
        if(!loaded && $(iframe_doc.body).height() != 0) {
          loaded = true;
          resizeIframe();
        }
      });
      observer.observe(iframe_doc, {attributes: true, childList: true, characterData: true, subtree: true});

      show_edit_header(overlay);
    }, "text");

    function resizeIframe(){
      iframe.attr("scrolling", "auto")
      iframe.height($(iframe_doc.body).height()+16);
    }
  }

  function stop_edit(){
    /*
    editing.each(function(){
      Aloha.jQuery(this).mahalo().removeClass('aloha-editable-highlight');
    });
    */
  }

  function show_overlay(){
    $("body > *").hide();
    overlay
      .show()
      .prependTo($('body'));
    iframe = $('<iframe sandbox=""></iframe>')
      .prependTo(overlay)
      .css("border", "none")
      .css("width", "100%")
      .css("height", "100%")
      .attr("srcdoc", centered_spinner);
  }

  function show_edit_header(container){
    topbar.prependTo(container || $('body')).hide().slideDown();
  }

  function hide_edit_header(){
    topbar.slideUp(function(){
      topbar.detach();
      iframe.detach();
      overlay.detach();
      $("body > *").show();
      toolbar.prependTo($('body'));
    });
  }
});
