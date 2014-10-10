define(['jquery'], function($) {
    'use strict';

    function TopBar(start_opened){
        this._start_opened = start_opened || false
        this._topbar = $('<div>')
                .addClass("aloha-topbar")
                .css('background-image', 'linear-gradient(to top, #000000 0, #EEEEEE 8px)')
                .css('padding-top', '1em')
                .css('padding-left', '1em')
                .css('padding-right', '1em')
                .css('padding-bottom', '16px');
        if(this._start_opened) this.open();
    }

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