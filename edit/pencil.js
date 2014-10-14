define([], function(){

  function Pencil(on_click){
    on_click = on_click.bind(this);

    this.toolbar = $('<div></div>')
      .css('position', 'fixed')
      .css('right', 0)
      .css('top', 0);

    this.pencil = $(' <a href="#">&#10000;</a> ')
      .css('text-decoration', 'none')
      .appendTo(this.toolbar)
      .click(function(){
        on_click();
        return false;
      });
  }

  Pencil.prototype.show = function(body){
      this.toolbar.prependTo($(body || 'body'));
  };

  Pencil.prototype.hide = function(){
      this.toolbar.detach();
  };

  return Pencil;

});
