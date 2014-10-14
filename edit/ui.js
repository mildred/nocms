define(["jquery", "aloha", "./linkui"],
function($, aloha, linkui){
  
  var link_data_uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEU"+
         "gAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCan"+
         "BgAAAAHdElNRQfeCg0MGB4tNEvdAAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpd"+
         "GggR0lNUGQuZQcAAADySURBVCjPbdE/K8QBHMfxl1hNUsfgT8rG0Q2egkG5ZLDYpHsGN"+
         "k+BLiUPwAOQssvgMNiMUtxwSU7Heh8DRz/ns77f9enz/dKfGUcu1U36N4s6IuLdUj8ui"+
         "2i70RYfpoq4pCVejaCiLQ6KQlU0lc0ZQEM0hgrCqFc7Lgybd6+E2x4as2bbrHXR1TGhL"+
         "t5Mf+GKZ3FuQ1dXrDgVsdgbFnFiWXRFVV08q3zhaW9iz+oPHlazZqzXfige8CRiy75ac"+
         "VpDXGNXy4KmqBaFA/FoHAPaoqVUFKZ8iEdXXkSU+++/5P37PZ3esN8MounYoDiz6e6v8"+
         "An9CmFPyeXSGgAAAABJRU5ErkJggg==";
  
  var Dom = aloha.dom;
	var Keys = aloha.keys;
	var Editor = aloha.editor;
	var Events = aloha.events;
	var Editing = aloha.editing;
	var Overrides = aloha.overrides;
	var Selections = aloha.selections;
	var Boundaries = aloha.boundaries;
	var Arrays = aloha.arrays;
	
	function ButtonBlock(name, id, tagname) {
	  var label = $(tagname);
	  var inner = label;
	  while(inner.children().length > 0) inner = inner.children().first();
	  inner.text("Aa")
	  var btn = $("<div>")
      .addClass('aloha-edit-style')
	    .append($('<div>')
	      .append($("<div>")
	        .append(label
	          /*
	          .css('position', 'absolute')
	          .css('bottom', '0')
	          .css('left', '0')
	          .css("margin", '0')*/)
	         /*
	        .css('position', 'relative')
	        .css('background-color', 'white')
	        .css('height', '2.7em')*/)
        .append($("<div>")
          .append($('<span>')
            .text(name)
            //.css('font-size', '0.7em')
            )
          /*
      	  .css('height', '1em')
          .css('overflow', 'hidden')
          .css('margin-top', '0.2em')
          .css('padding-bottom', '0.2em')*/)
        /*
        .css('position', 'absolute')
        .css('bottom', '0')
    	  .css('width', '6em')
        .css('overflow', 'hidden')*/)
      /*
      .css('display', 'inline-block')
      .css('cursor', 'pointer')
	    .css('background-color', 'rgba(255, 255, 255, 0.5)')
	    .css('text-align', 'left')
	    .css('border-style', 'solid')
	    .css('border-width', '1px')
	    .css('border-color', 'rgba(0, 0, 0, 0.5)')
	    .css('height', '4em')
	    .css('width', '6em')
	    .css('vertical-align', 'top')
	    .css('position', 'relative')
      .css('overflow', 'hidden')
      .css('padding', '0.2em')
      .css('margin', '1px')*/
	    .attr('title', name);
    addAlohaButtonHandler(btn, id, false);
    return btn;
	}
	
	function buttonBlockIsStyle(btn, styleElem){
	  return styleElem && btn.firstChild.firstChild.firstChild.tagName == styleElem.tagName;
	}

	function ButtonInline(icon, name, id) {
	  var btn = $('<button>')
	    .addClass('aloha-edit-toolbar-smallbtn')
      /*
      .css('cursor', 'pointer')
      .css('height', 'calc(2em + 5.5px)') // FIXME: find correct expression
      .css('width', 'calc(2em + 5.5px)')
      .css('overflow', 'hidden')
      .css('border-style', 'solid')
      .css('border-width', '1px')
      .css('border-color', 'rgba(0, 0, 0, 0.5)')
      .css('vertical-align', 'top')
      .css('background-color', 'rgba(255, 255, 255, 0.5)')
      .css('margin', '1px')
      */
      .html(icon)
      .attr('title', name);
	  addAlohaButtonHandler(btn, id, true);
	  return btn;
	}
	
	function addAlohaButtonHandler(btn, formatting, inline) {
	  btn.click(function(){
      if(Editor.selection) {
        var boundaries = Editor.selection.boundaries;
        if(formatting == "unformat") {
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "STRONG");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "EM");
        } else if(formatting == "nostyle") {
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "P");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H1");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H2");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H3");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H4");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H5");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "H6");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "PRE");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "UL");
          boundaries = Editing.unformat(boundaries[0], boundaries[1], "OL");
        } else {
          boundaries = Editing.format(boundaries[0], boundaries[1], formatting);
          if(formatting == 'A') {
            var anchor = boundaries[0][0].childNodes[boundaries[0][1]];
            // schedule after selection change
            setTimeout(openLinkIfNeeded.bind(this, anchor), 0);
          }
        }
        Editor.selection = Selections.select(
			    Editor.selection,
			    boundaries[0],
			    boundaries[1]
		    );
      }
      updateToolbarFromSelection();
    });
	}
	
	var styles = $('<span>')
	    .css('vertical-align', 'top')
      .append(ButtonBlock("Paragraph",      "P",       "<p>"))
      .append(ButtonBlock("Header 1",       "H1",      "<h1>"))
      .append(ButtonBlock("Header 2",       "H2",      "<h2>"))
      .append(ButtonBlock("Header 3",       "H3",      "<h3>"))
      .append(ButtonBlock("Header 4",       "H4",      "<h4>"))
      .append(ButtonBlock("Header 5",       "H5",      "<h5>"))
      .append(ButtonBlock("Header 6",       "H6",      "<h6>"))
      .append(ButtonBlock("Preformat",      "PRE",     "<pre>"))
      .append(ButtonBlock("Ordered List",   "OL",      "<ol><li></li></ol>"))
      .append(ButtonBlock("Unordered List", "UL",      "<ul><li></li></ul>"));

  var i = 0;
  styles.children().each(function(){
    this.setAttribute("data-index", "" + (i++));
  });
      
  function StyleExpandButton(text){
    return $("<div>")
        .addClass("aloha-edit-styles-expand-collapse")
        /*
        .css('display', 'inline-block')
        .css('cursor', 'pointer')
	      .css('height', '4em')
	      .css('padding', '0.2em')
	      .css('border-style', 'solid')
	      .css('border-width', '1px')
	      .css('border-color', 'rgba(0, 0, 0, 0.5)')
	      .css('background-color', 'rgba(255, 255, 255, 0.5)')
        .css('margin', '1px')
        .css('line-height', '4em')
        */
	      .text(text);
  }
  
  var expandButton = StyleExpandButton("\u00BB");
  var shrinkButton = StyleExpandButton("\u00AB");
  
  expandButton.click(function(){
    expandButton.hide();
    shrinkButton.show();
    styles.show(300);
  });
  
  shrinkButton.click(function(){
    shrinkButton.hide();
    expandButton.show();
    styles.hide(300);
  });
  
	var styleSelector = $('<span>')
	    .addClass('aloha-edit-styles')
	    .append(styles.children().first().detach())
	    .append(styles.hide())
	    .append(expandButton)
	    .append(shrinkButton.hide());
    
  var toolbar = $('<div>')
      //.css('top', '0')
      //.css('left', '0')
      //.css('right', '0')
      .addClass('aloha-edit-toolbar')
      .css('position', 'relative')
      .css('background-color', 'inherit')
      .append(styleSelector)
      //.append(ButtonBlock("No Style",       "nostyle", "<div>"))
      .append($('<div>')
        .addClass('aloha-edit-toolbar-2row')
        .append($('<div>')
          .append(ButtonInline("<em>T</em><sub>X</sub>", "Clear Format",    "unformat"))
          .append(ButtonInline('<img src="'+link_data_uri+'" alt="Link"/>', "Link", "A"))
          )
        .append($('<div>')
          .append(ButtonInline("<em>I</em>",             "Light Emphasis",  "EM"))
          .append(ButtonInline("<strong>B</strong>",     "Strong Emphasis", "STRONG"))
          )
      );
        
        
  $(document).scroll(function() {
      var top = $(document).scrollTop();
      if (top > 0) {
        toolbar.css('position', 'fixed')
      } else {
        toolbar.css('position', 'relative')
      }
  });
  
  var toolbar_container = $('<div>')
    .append(toolbar)
    .css('height', '4em')
    .css('margin', '1px')
    .css('background-color', 'inherit');
  
  aloha.selectionchange.addHandler(document, function(){
    //console.log("selection has changed");
    updateToolbarFromSelection();
  });
  
  function parentElementFromSelection(bounds){
    if(!bounds) bounds = Editor.selection.boundaries;
    if(!bounds) return;
    var parentNode = aloha.boundaries.commonContainer(bounds[0], bounds[1]);
    while(parentNode.nodeType != Node.ELEMENT_NODE) parentNode = parentNode.parentNode;
    return parentNode;
  }
  
  function updateToolbarFromSelection(){
    var parentNode = parentElementFromSelection();
    //console.log(parentNode);
    if(!parentNode) return;
    openLinkIfNeeded(parentNode);
    setCurrentStyle(parentNode);
  }
  
  function isElementEditable(elem){
    while(elem) {
      elem = elem.parentNode;
      if(elem.classList && elem.classList.contains("aloha-editable")) return true;
    }
    return false;
  }
  
  //var linkOpened = false;
  
  function openLinkIfNeeded(linkElem){
    if(!linkElem) return;
    if(linkElem.tagName.toLowerCase() == 'a') {
      linkui.open(linkElem);
    //  linkOpened = true;
    //} else if(linkOpened /*isElementEditable(linkElem)*/) {
    //  console.log("close link (opened by us in aloha)");
    //  linkOpened = false;
    //  linkui.close();
    }
  }
  
  function setCurrentStyle(elem) {
    var curStyle = styleSelector.children()[0];
    if(buttonBlockIsStyle(curStyle, elem)) return;
    var otherStyles = styles.children();
    for(var i = 0; i < otherStyles.length; ++i) {
      if(buttonBlockIsStyle(otherStyles[i], elem)) {
        var currentStyleIndex = parseInt(curStyle.getAttribute('data-index')) || 0;
        if(currentStyleIndex == 0) {
          $(curStyle).detach().insertBefore(otherStyles[0]);
        } else {
          $(curStyle).detach().insertAfter(otherStyles[currentStyleIndex-1]);
        }
        //$(curStyle).detach().prependTo(styles);
        $(otherStyles[i]).detach().prependTo(styleSelector);
        return;
      }
    }
    return setCurrentStyle(elem.parentElement);
  }
  
  return {
    toolbar: toolbar_container
  };
  
});
