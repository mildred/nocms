define([
  'jquery',
  'aloha/plugin',
  'aloha/ephemera'
], function (
  $,
  Plugin,
  Ephemera
) {
  'use strict';

  Ephemera.classes('aloha-topbar');

  return Plugin.create('topbar', {
    defaults: {
      start_opened: false
    },

    init: function () {
      this._topbar = $('<div>')
        .addClass("aloha-topbar")
        .css('background-image', 'linear-gradient(to top, #000000 0, #EEEEEE 8px)')
        .css('padding-top', '1em')
        .css('padding-left', '1em')
        .css('padding-right', '1em')
        .css('padding-bottom', '16px');
      if(this.settings.start_opened) this.open();
    },

    element: function() {
      return this._topbar;
    },

    open: function(cb) {
      this._topbar.prependTo($(document.body)).hide().slideDown(cb);
    },

    close: function(cb) {
      this._topbar.slideUp(function(){
        $(this).detach();
        if(cb) cb();
      });
    }
  });
});