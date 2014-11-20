({
    baseUrl: ".",
    xhtml: true,
    /*
    rawText: {
      'jquery': 'define(["jquery-2.1.1"], function($){ return $.noConflict(true); });'
    },
    onBuildWrite: function(moduleName, path, contents) {
      if(moduleName == 'jquery') contents = '';
      return contents;
    },
    stubModules: ["jquery"],
    */
    name: "edit/main",
    optimize: "uglify2",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    useSourceUrl: true,
    out: "stdout"
})
