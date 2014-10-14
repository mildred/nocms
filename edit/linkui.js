define(["jquery", "aloha"], function($, aloha){

  var ui_input = $('<input type="text" placeholder="URL"/>')
    .on('keypress', stopEventPropagation) // FIXME: aloha
    .css('font', 'inherit')
    .css('border-style', 'solid')
    .css('border-width', '1px')
    .css('border-color', 'rgba(0, 0, 0, 0.5)');
  var ui_go = $('<a href="">go</a>');
  var ui = $('<div>')
    .css('background-color', 'white')
    .css('padding', '0.2em')
    .append(document.createTextNode("URL: "))
    .append(ui_input)
    .append(ui_go);
  
  var closeTimeout;
  
  function stopEventPropagation(event){
    event.stopPropagation();
  }
  
  function open(element, linkElement) {
    linkElement = $(linkElement || element)
    var pos = $(element).position();
    var height = $(element).height();
    ui_go
      .attr("href", linkElement.attr('href'));
    ui_input
      .val(linkElement.attr('href'))
      .attr('size', Math.min(Math.max((linkElement.attr('href') || "").length || 0, 25), 75))
      .on('input', function(){
        //console.log("input: " + ui_input.val());
        linkElement.attr('href', ui_input.val());
        ui_input.attr('size', Math.min(Math.max((linkElement.attr('href') || "").length || 0, 25), 75))
        ui_go.attr("href", ui_input.val());
      });
    ui.insertAfter(element)
      .css('position', 'absolute')
      .css('left',     pos.left + 'px')
      .css('top',      (pos.top + height) + 'px')
      .hide()
      .show(300);
    
    ui_input.blur(close);
    ui_input.focus(cancel_close);
    ui_go.click(cancel_close);
    
    if(element.tagName.toLowerCase() != 'input') {
      ui_input.focus();
    }
    
    /*
    var int = setInterval(function(){
      if($(element).has(":focus")) return;
      if(linkElement.has(':focus')) return;
      if(ui_input.has(':focus')) return;
      clearInterval(int);
      ui.hide(300);
    }, 1000);
    */
    /*
    function getHref(){
      linkElement.attr('href') || linkElement.attr('src')
    }
    function setHref(url){
      if(linkElement.attr('src') && linkElement.attr('href') === undefined) {
        linkElement.attr('src', url);
      } else {
        linkElement.attr('href', url);
      }
    }
    */
  }
  
  //var preventClose = false;
  
  function close(){
    //if(preventClose) {
    //  console.log("close prevented");
    //  return;
    //}
    closeTimeout = setTimeout(function(){
      ui.hide(300);
      closeTimeout = undefined;
    }, 500);
  }
  
  function cancel_close(second_time){
    //console.log('cancel close');
    if(closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    //} else if(!second_time) {
    //  setTimeout(cancel_close.bind(this, true), 10)
    }
  }
  
  return {
    open: open,
    close: close
  };
  
});
