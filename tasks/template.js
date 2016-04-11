'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var chalk = require('chalk');
  var glob = require('glob');

  grunt.registerMultiTask('template', 'Combine files based on a template.', function() {
    var files = 0;

    var options = this.options({
      separator: '',
      defaultExtension: '.js'
    });

    // get the folder of the template
    var startDir = this.data.template.substring(0, this.data.template.lastIndexOf("/") + 1)

    if(!this.data.template) {
      grunt.fail.warn(chalk.red("template is required."));
    }

    if(!this.data.dest) {
      grunt.fail.warn(chalk.red("dest is required."));
    }

    // Recursively resolve the template
    function getSourceCode(filepath, section) {
      var fileRegex = /(?:["'])<!=\s*(.+)\b\s*!>(?:["'])?;/;
      var fileExtRegex = /\..+$/;

      return grunt.file.read(filepath).replace(new RegExp(fileRegex.source, "g"), function(match) {
        files++; // Log the number of imports we did

        // Get the filename
        var file = match.match(fileRegex)[1];

        // Check if it has an extension
        if(file.match(fileExtRegex) === null) {
          file += options.defaultExtension; // Add it
        }

        // Add the start directory
        file = startDir + file;

        var source = "";

        // Loop through files
        glob.sync(file).forEach(function(filename) {
          // Read file
          var src = grunt.file.read(filename);

          // Check if it has imports too
          source += (function() {
                if(fileRegex.test(src)) {
                  return getSourceCode(filename);
                } else {
                  return src;
                }
              })() + options.separator; // Add separator
        });

        return source;
      });
    }

    // Build the template
    var src = getSourceCode(this.data.template);

    // Write the destination file.
    grunt.file.write(this.data.dest, src);

    // Print a success message.
    console.log(files + ' files imported.');

    grunt.log.ok('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};
