# grunt-contrib-template

> Combine JavaScript files based on a template.

> Inspired by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)

#### Now supports recursive templating!

## Installing

Install the package from npm
```js
npm install grunt-contrib-template --save-dev
```

Enable the task in your `gruntfile.js`
```js
grunt.loadNpmTasks('grunt-contrib-template');
```

## Template task

### Options

#### Separator
Type: `String`

Default: `''`

### Setup

```js
// Project configuration.
grunt.initConfig({
  template: {
    js: {
      template: "template.js",
      dest: "output.js",
      options: {
        separator: '\n'
      }
    }
  },
});
```


### Example

#### template.js
```js
var example = function() {
	"<!= foo.js !>";
};
```

#### foo.js
```js
console.log("This is foo.");
"<!= bar.js !>";
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
