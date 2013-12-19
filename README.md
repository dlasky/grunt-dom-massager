# grunt-dom-massager

> Manipulate the dom using cheerio via grunt task

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dom-massager --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dom-massager');
```

## The "dom_massager" task

### Overview
In your project's Gruntfile, add a section named `dom_massager` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
read_test: {
    options: {
      writeDom: false,
      selectors: {
        ".read .classy": {
          action: "html",
          output: "dom.read.classy"
        },
        ".read #idface":{
          action:"text",
          output:"dom.read.idface"
        }
      }
    },
    src:'test/fixtures/test.html'
  },
  write_test: {
    options: {
      writeDom:true,
      selectors: {
        ".write #deleteme": {
          action:"remove"
        },
        ".write #after": {
          action:"append",
          input:["<a href='blah'></a>"]
        },
        ".write #before":{
          action:"prepend",
          input:["<a href='zappo'></a>"]
        }
      }
    },
    files: {
      'tmp/': ['test/fixtures/test.html'],
    },
  },
});
```

### Options

#### options.writeDom
Type: `Boolean`
Default value: `false`

A boolean that determines if the dom manipulation should be saved to disk when completed.

#### options.selectors
Type: `Object`
Default value: `{}`

An object containing valid selectors to be used for manipulation actions

```js
{
  action:'attr' //cheerio action to perform
  input:['attrName'] //cheerio method arguments as array (optional)
  output:'dom.attrs.value' //grunt.config key to store any output values in
}```

##### options.selectors.action
Type: `String`
Default value: `''`

The action string denotes what cheerio method to call on a given selector. See [Cheerio Documentation](https://github.com/MatthewMueller/cheerio/blob/master/Readme.md) for more information.

##### options.selectors.input
Type: `Array`
Default value: `[]`

An array containing any arguments to be passed to the cheerio method. Typically this will be chunks of markup for appending optionally including grunt template values

##### options.selectors.output
Type: `String`
Default value: `''`

An string to use for `grunt.config.set` key for any output from the cheerio action. This allows you to read in attributes or dom to a grunt config either for later templating or for pulling paths of script/link embeds for further manipulation

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
