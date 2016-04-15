'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var chalk = require('chalk');
  var glob = require('glob');

  grunt.registerMultiTask('template', 'Combine files based on a template.', function() {
    // Keep track of the number of files we replace/imported
    var files = 0;

    // Default settings
    var options = this.options({
      separator: '',
      defaultExtension: '.js'
    });

    // Check if the required parameters are filled out
    if(!this.data.template) {
      grunt.fail.fatal(chalk.red("template is required."));
    }

    if(!this.data.dest) {
      grunt.fail.fatal(chalk.red("dest is required."));
    }

    // Recursively resolve the template
    function getSourceCode(filepath) {
      // The current folder
      var dir = filepath.substring(0, filepath.lastIndexOf("/") + 1);

      // Regex for file import
      var fileRegex = /(?:["'])<!=\s*(.+)\b\s*!>(?:["'])?;/;
      // Regex for file extension
      var fileExtRegex = /\..+$/;

      // Read the file and check if anything should be imported into it; loop through them
      return grunt.file.read(filepath).replace(new RegExp(fileRegex.source, "g"), function(match) {
        // Log the number of imports we did
        files += 1;

        // Get the filename
        var file = match.match(fileRegex)[1];

        // Check if it has an extension
        if(file.match(fileExtRegex) === null) {
          file += options.defaultExtension; // Add it
        }

        var source = "";

        // Loop through files
        glob.sync(dir + file).forEach(function(filename) {
          // Read file
          var src = grunt.file.read(filename);

          // Check if it has imports too
          source += (function() {
                return fileRegex.test(src) ? getSourceCode(filename) : src;
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
    grunt.log.writeln(files + ' files imported.');

    // Print final "file created" message
    grunt.log.ok('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};
