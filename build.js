({
    baseUrl: ".",
    //baseUrl: "Aloha-Editor/src",
    xhtml: true,
    paths: {
        //'aloha':          "Aloha-Editor/src/aloha",
        'jquery':         "jquery-2.1.1",
        'jquery-private': "jquery-private"
        //'text':           "../../text",
        //'jquery':         "../../jquery-2.1.1",
        //'jquery-private': "../../jquery-private"
    },
    map: {
      // '*' means all modules will get 'jquery-private'
      // for their 'jquery' dependency.
      '*': { 'jquery': 'jquery-private'/*, 'aloha': 'aloha-private'*/ },

      // 'jquery-private' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      //'aloha-private': { 'aloha': 'aloha' },
      'jquery-private': { 'jquery': 'jquery' }
    },
    name: "edit/main",
    //name: "../../edit/main",
    optimize: "uglify2",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    useSourceUrl: true,
    /*wrap: {
      startFile: ["require.js"],
      endFile: ["nocms.user.js"]
    },*/
    out: "stdout"
})
