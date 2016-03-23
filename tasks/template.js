'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var chalk = require('chalk');
  var parsePath = require('parse-filepath');

  grunt.registerMultiTask('template', 'Combine files based on a template.', function() {

    var options = this.options({
      separator: ''
    });

    if(!this.data.template) {
      grunt.verbose.write(chalk.red("template is required."));
      return false;
    }

    if(!this.data.dest) {
      grunt.verbose.write(chalk.red("dest is required."));
      return false;
    }

    // Recursively resolve the template
    var getSourceCode = function(filepath) {
      var globalRegex = /(?:["'])<!=\s*(.+)\b\s*!>(?:["'])?;/g;

      return grunt.file.read(filepath).replace(globalRegex, function(match) {
        var file = match.match(/(?:["'])<!=\s*(.+)\b\s*!>(?:["'])?;/)[1];

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
    grunt.verbose.write('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};
