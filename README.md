# grunt-contrib-template

> Combine JavaScript files based on a template.

Inspired by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)

Running a beautifier after the process is recommended

## Installing

Install the package from npm

`npm install grunt-contrib-template --save-dev`

Enable the task in your `gruntfile.js`

`grunt.loadNpmTasks('grunt-contrib-template');`

## Template task

### Options

#### separator
Type: `String`

Default: `''`

#### defaultExtension
Type `String`

Default `'.js'`

### Setup

```js
// Project configuration.
grunt.initConfig({
  template: {
    js: {
      template: "template.js",
      dest: "output.js",
      options: {
        separator: '',
        defaultExtension: '.js'
      }
    }
  },
});
```


### Example

Folder structure
```
-- template.js
-- app
    |-- foo.js
    |-- bar.js
```

#### template.js
```js
var example = function() {
	"<!= app/foo.js !>";
};
```

#### foo.js
```js
console.log("This is foo.");
"<!= bar !>";
```

#### bar.js
```js
console.log("This is bar.");
```

#### output.js
```js
var example = function() {
	console.log("This is foo.");
	console.log("This is bar.");
};
```
