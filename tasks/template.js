'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var chalk = require('chalk');
  var parsePath = require('parse-filepath');

  grunt.registerMultiTask('template', 'Combine files based on a template.', function() {
    var files = 0;

    var options = this.options({
      separator: ''
    });

    if(!this.data.template) {
      grunt.fail.warn(chalk.red("template is required."));
    }

    if(!this.data.dest) {
      grunt.fail.warn(chalk.red("dest is required."));
    }

    // Recursively resolve the template
    var getSourceCode = function(filepath, section) {
      var fileRegex = /(?:["'])<!=\s*(.+)\b\s*!>(?:["'])?;/;

      return grunt.file.read(filepath).replace(RegExp(fileRegex.source, "g"), function(match) {
        files++;
        var file = match.match(fileRegex)[1];

        var fileObject = parsePath(filepath);
        var newFile = (fileObject.dirname + "/" + file).replace(/^\/|\/$/g, '');

        var src = grunt.file.read(newFile);

        return (function() {
          if(globalRegex.test(src)) {
            return getSourceCode(newFile);
          } else {
            return src;
          }
        })() + options.separator;
      });
    };

    // Make the template
    var src = getSourceCode(this.data.template);

    // Write the destination file.
    grunt.file.write(this.data.dest, src);

    // Print a success message.
    console.log(files + ' files imported.');

    grunt.log.ok('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};
