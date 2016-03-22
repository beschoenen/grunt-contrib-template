# grunt-contrib-template

> Combine JavaScript files based on a template.

> Inspired by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)



## Template task

### Options

#### template
Type: `String`  

The template JavaScript file.

#### dest
Type: `String` 

The output file location.


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
