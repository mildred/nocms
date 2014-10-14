define(['jquery'], function($) {
  
  function ColorCycle(element){
    this._element = $(element)
	    .css('transition', 'background-color 15s');
    this._lastColor = null;
    this._colors = [
		  '#54c8eb', // light blue
		  '#4ea9de', // med blue
		  '#4b97d2', // dark blue
		  '#92cc8f', // light green
		  '#41bb98', // mint green
		  '#c9de83', // yellowish green
		  '#dee569', // yellowisher green
		  '#c891c0', // light purple
		  '#9464a8', // med purple
		  '#7755a1', // dark purple
		  '#f069a1', // light pink
		  '#f05884', // med pink
		  '#e7457b', // dark pink
		  '#ffd47e', // peach
		  '#f69078' // salmon
	  ];
    this.cycle();
    setTimeout(this.cycle.bind(this), 10);
    setInterval(this.cycle.bind(this), 15000);
  }
  
  ColorCycle.prototype.cycle = function(){
      var colorIdx = parseInt(Math.random() * (this._colors.length - 1), 10)
		  var color = this._colors[colorIdx];
		  if(color == this._lastColor) color = this._colors[(colorIdx+1) % this._colors.length];
		  this._lastColor = color;
		  this._element.css('background-color', color);
  };
  
  return ColorCycle;
  
});
