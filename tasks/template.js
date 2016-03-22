'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var chalk = require('chalk');

  grunt.registerMultiTask('template', 'Combine files based on a template.', function() {

    if(!this.data.template) {
      console.log(chalk.red("template is required."));
      return false;
    }

    if(!this.data.dest) {
      console.log(chalk.red("dest is required."));
      return false;
    }

    var src = grunt.file.read(this.data.template).replace(/(?:"|')<!=(.+)!>(?:"|')?;/g, function(match) {
      var file = match.match(/(?:"|')<!=(.+)!>(?:"|')?;/)[1].trim();
      return grunt.file.read(file);
    });

    // Write the destination file.
    grunt.file.write(this.data.dest, src);

    // Print a success message.
    grunt.verbose.write('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};
