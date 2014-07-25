##Overview

`skiperr` is a way to avoid:

```javascript
if (err) return next(err);
```

Using `skiperr` looks like:

```javascript
var getSomething = function (done) {
  db.find(function(result){
    callback(null, parseInt(result));
  }.skiperr(done));
}
```

The callback pattern in node will often leave you checking for errors and passing them along. [Promises](https://www.promisejs.org/) are a way of avoiding this repetition, but they transform your entire code base. This library lets you continue using standard callbacks with a slightly nicer syntax.


##Usage

In NodeJS, it's common to check for an error and pass it along. For example:

```javascript
// without skiperr
var getSomething = function (callback) {
  db.find(function(err, result){
    // error? pass it on
    if (err) return callback(err);

    callback(null, parseInt(result));
  });
}
```

This module lets you automatically pass those errors on without an explicit check:

```javascript
// with skiperr
var getSomething = function (callback) {
  db.find(function(result){
    callback(null, parseInt(result));
  }.skiperr(callback));
}
```


##Examples

```javascript
var done = function (err, result) {
  console.log("Done", arguments);
};

var myCallback = function (result) {
  console.log("MyCallback", arguments);
  done(null, result);
}.skiperr(done);

// when no error happens
myCallback(null, 3);
> MyCallback [3]
> Done [null, 3]

// when an error happens
myCallback('It broke', 4);
> Done ['It broke', 3]
```
    
## How It Works

It's very simple. You call `.skiperr()` on your function and pass the callback.

If `skiperr` receives an error, it will skip your function and just call the callback directly. If `skiperr` does not receive an error, it will call your function.

This means that you don't have to check for errors. If an error happened, your function is skipped.

## Documentation

Install `skiperr` from npm:

    > npm install skiperr --save

When your app starts up, include the `skiperr` module so it can extend `Function.prototype`.

```javascript
require('skiperr');
```

####.skiperr(callback)

Then you call `.skiperr(...)` it on your function.

Generally it's a bad idea to muck with a prototype, but let's be honest - if you don't want to mess with the function prototype then you don't want this module.

####Arguments

 - `callback` - Required. The callback that should receive the error. All arguments are passed to this callback in the case of an error.
 

## Testing

This repository includes tests written in [mocha](http://visionmedia.github.io/mocha/).
 

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
    
    