/**
 * Created by yaoxiaowei on 2015/3/30.
 */
var split;
(function (split) {
    var Pattern = (function () {
        function Pattern() {
        }
        Pattern.prototype.initPool = function () {
        };
        return Pattern;
    })();
    split.Pattern = Pattern;
    Pattern.prototype.__class__ = "split.Pattern";
})(split || (split = {}));
