(function (global) {
  let module = (global.Helpers = {});
  
  module.mapRange = function(value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
  }
})(this);