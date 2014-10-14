define(["jquery"], function($){
  
  function makeInput(text, placeholder, cb, focus){
    var self = this;
    this._element = $("<input>")
      .on('keypress', stopEventPropagation) // FIXME: aloha
      .css('border', 'inherit')
      .css('font', 'inherit')
      .css('background', 'inherit')
      .css('border-bottom-style', 'solid')
      .css('border-bottom-width', '1px')
      .css('border-bottom-color', 'rgba(0, 0, 0, 0.5)')
      .attr('placeholder', placeholder)
      .attr('value',       text)
      .on('input', onInput)
      .on('focus', onFocus)
      .on('blur', onBlur);

    function onInput(){
      text = self._element.val();
      //console.log(text);
      cb(text);
    }
    
    function onFocus(){
      //console.log("focus");
      if(focus) focus(true);
    }
    
    function onBlur(){
      //console.log("blur");
      if(focus) focus(false);
    }
  }
  
  makeInput.prototype.element = function(){
    return this._element[0];
  };
  
  makeInput.prototype.editable_element = function(){
    return this._element[0];
  };
  
  makeInput.prototype.editor_element = function(){
    return this._element[0];
  };
  
  return makeInput;
  
  /*
  function makeInput(text, placeholder, cb){
    var self = this;
    this._element = $("<span>");
    this._element[0].contentEditable = true;
    this._editor = $('<span>')
      .append(this._element)
      .on('input', onInput.bind(this, true))
      .on('change', function(){
        console.log('change');
        if(!text) self._element.text(placeholder);
      });

    onInput(false);
    
    function onInput(focus){
      text = self._element.text();
      console.log(text);
      cb(text);
      if(!focus && !text) self._element.text(placeholder);
    }
  }
  
  makeInput.prototype.editable_element = function(){
    return this._element[0];
  };
  
  makeInput.prototype.editor_element = function(){
    return this._editor[0];
  };
  
  return makeInput;
  */
  
  function stopEventPropagation(event){
    event.stopPropagation();
  }
});
