
var assert = require("assert");
var skiperr = undefined;

describe('skiperr', function(){
  
  it('is attached to the function prototype', function(){
    assert.equal(typeof Function.prototype.skiperr, 'undefined', "skiperr should start out undefined");
    skiperr = require('./skiperr');
    assert.equal(Function.prototype.skiperr, skiperr, "skiperr should now be assigned to the function prototype");
  });
  
  it('is a function', function(){
    assert.equal(typeof skiperr, 'function', "skiperr should be a function");
  });
  
  it('skips your function if there is an error', function(){
    var calledDone = 0;
    var calledYou = 0;
    var callback = function () {
      calledDone += 1;
    };
    var yourFunction = function () {
      calledDone += 1;
      callback();
    };
    yourFunction.skiperr(callback)("Error");
    assert.equal(calledDone, 1, "Done should be called once.");
    assert.equal(calledYou, 0, "Your function should never be called.");
  });
  
  it('sends all arguments to the original callback', function(){
    var callbackArguments = null;
    var callback = function () {
      callbackArguments = arguments;
    };
    var yourFunction = function () {};
    yourFunction.skiperr(callback)("Error", 3, 4);
    assert.equal(callbackArguments.length, 3, "Callback should have 3 arguments.");
    assert.equal(callbackArguments[0], "Error");
    assert.equal(callbackArguments[1], 3);
    assert.equal(callbackArguments[2], 4);
  });
  
  it('does not call the callback if there is no error', function(){
    var calledDone = 0;
    var calledYou = 0;
    var callback = function () {
      calledDone += 1;
    };
    var yourFunction = function () {
      calledYou += 1;
      callback();
    };
    yourFunction.skiperr(callback)(null);
    assert.equal(calledDone, 1, "Done should be called once.");
    assert.equal(calledYou, 1, "Your function should be called once.");
  });
  
  it('calls your callback with the error argument removed', function(){
    var yourArguments = null;
    var callback = function () {};
    var yourFunction = function () {
      yourArguments = arguments;
      callback();
    };
    yourFunction.skiperr(callback)(null, 5, 6);
    assert.equal(yourArguments.length, 2, "Your function should receive 2 arguments.");
    assert.equal(yourArguments[0], 5);
    assert.equal(yourArguments[1], 6);
  });
  
});
