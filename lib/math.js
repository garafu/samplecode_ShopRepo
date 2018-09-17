var round = function (number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

var padding = function (number, precision) {
  var str = ("" + number).split(".");
  var integer = str[0];
  var decimal = str[1] || "";
  var count = precision - decimal.length;
  if (count > 0) {
    while (count--) {
      decimal += "0";
    }
  }
  return integer + "." + decimal;
};

module.exports = {
  round,
  padding
};