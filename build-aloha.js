({
  name: 'aloha',
  baseUrl: 'Aloha-Editor/src',
  paths: {
    //'aloha': 'Aloha-Editor/src'
  },
  rawText: {
    //'aloha': 'define(["aloha/aloha"], function(aloha){ return aloha; });'
  },
  onBuildWrite: function(moduleName, path, contents) {
    //console.log(moduleName + ' ' + path);
    //console.log(contents);
    var prefix = "aloha/"
    var parts = contents.match(/^([^]*define\(')([^\']*)(',)(\[[^\]]*\])([^]*)$/);
    if(parts.length) {
      var modName = parts[2] == "aloha" ? parts[2] : prefix + parts[2];
      var arr = (new Function('', 'return ' + parts[4] + ';'))();
      for(var i = 0; i < arr.length; ++i) {
        if(arr[i].match(/^\.\.?\//)) continue;
        arr[i] = prefix + arr[i];
        // make relative
        var modParts = modName.split('/');
        modParts.pop();
        var p = arr[i].split('/');
        while(p.length > 1 && p[0] == modParts[0]) { p.shift(); modParts.shift(); }
        if(modParts.length == 0) p.unshift('.');
        while(modParts.length > 0) { p.unshift('..'); modParts.pop(); }
        arr[i] = p.join('/');
      }
      parts[0] = '';
      parts[2] = modName;
      parts[4] = JSON.stringify(arr);
      //console.log(modName + " " + parts[4]);
      contents = parts.join('');
    } else {
      console.log(moduleName + ": could not rewrite " + contents);
    }
    return contents;
  },
  optimize: "none",
  out: 'aloha.js'
})
