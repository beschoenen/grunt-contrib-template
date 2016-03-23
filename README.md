# grunt-contrib-template

> Combine JavaScript files based on a template.

> Inspired by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)

## Installing

Install the package from npm
```js
npm install grunt-contrib-concat --save-dev
```

Enable the task in your `gruntfile.js`
```js
grunt.loadNpmTasks('grunt-contrib-concat');
```

## Template task

```js
// Project configuration.
grunt.initConfig({
  template: {
    js: {
      template: "template.js",
      dest: "output.js",
    }
  },
});
```

### Example

#### template.js
```js
var example = function() {
	"<!= example.js !>";
};
```

#### example.js
```js
console.log("This is an example.");
```

#### output.js
```js
var example = function() {
	console.log("This is an example.");
};
```
