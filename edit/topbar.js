define(['jquery', './colorcycle'], function($, ColorCycle) {
    'use strict';

    function TopBar(start_opened){
        this._start_opened = start_opened || false
        this._topbar = $('<div>')
                .addClass("aloha-edit-topbar")
                .css('background-image', 'linear-gradient(to top, rgba(255, 255, 255, 192) 0, transparent 8px)')
                .css('padding-bottom', '16px')
                //.css('transition', 'background-color 15s')
                .css('background-color', '#54c8eb');
        if(this._start_opened) this.open();
	      //this._colorcycle();
	      //setInterval(this._colorcycle.bind(this), 15000);
	      this._colors = new ColorCycle(this._topbar);
    }

    /*
    var lastColor;
    TopBar.prototype._colorcycle = function(){
      var colors = [
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
		  var color = false;
		  while(color !== lastColor)
		    color = colors[parseInt(Math.random() * (colors.length - 1), 10)];
		  lastColor = color;
		  this._topbar.css('background-color', color);
    }
    */

    TopBar.prototype.open = function(container, cb){
        if (typeof container == "function") {
          cb = container;
          container = void 0;
        }
        container = $(container || "body");
        this._topbar.prependTo(container).hide().slideDown(cb);
    };

    TopBar.prototype.close = function(cb){
        this._topbar.slideUp(function(){
            $(this).detach();
            if(cb) cb();
        });
    };

    TopBar.prototype.element = function(){
        return this._topbar;
    };

    return TopBar;
});
