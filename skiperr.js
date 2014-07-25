
/**
 * MIT License
 */
 
(function(exporter){  

  var skiperr = function(callback, context){
    //keep track of the original function
    var origFunction = this;
  
    //return a function that passes errors along
    return function (err) {
      //error? directly call the callback
      if (err) {
        callback.apply(this, arguments);
        return;
      }
    
      //no error, so shift the arguments
      var shiftedArgs = [].slice.call(arguments);
      shiftedArgs.shift();
    
      //call the middle callback
      origFunction.apply(this, shiftedArgs);
    };
  };

  //assign it to the Function prototype
  Function.prototype.skiperr = skiperr;
  
  //export skiperr according to the environment
  exporter(skiperr);

})(function(x){ 
  typeof module == 'undefined' ? window.skiperr = x : module.exports = x; 
});
