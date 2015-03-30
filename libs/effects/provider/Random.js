var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yaoxiaowei on 2015/3/26.
 */
var split;
(function (split) {
    var provider;
    (function (provider) {
        var Random = (function (_super) {
            __extends(Random, _super);
            function Random(system, isLoop) {
                if (isLoop === void 0) { isLoop = false; }
                _super.call(this, system, isLoop);
                this._initKeys();
            }
            Random.prototype.getBmpList = function () {
                if (!this.isLoop && this.times == this._poolKeyList.length) {
                    return false;
                }
                _super.prototype.getBmpList.call(this);
                var key = this._poolKeyList.shift(), bmp = this.system.pool[key].shift();
                this.system.pool[key].push(bmp);
                this._poolKeyList.push(key);
                return [bmp];
            };
            Random.prototype._initKeys = function () {
                var keyList = [];
                for (var attr in this.system.pool) {
                    keyList.push(attr);
                }
                this._poolKeyList = [];
                while (keyList.length > 0) {
                    var offset = Math.floor(Math.random() * keyList.length);
                    if (0 != offset) {
                        var temp = keyList[offset];
                        keyList[offset] = keyList[0];
                        keyList[0] = temp;
                    }
                    ;
                    this._poolKeyList.push(keyList.shift());
                }
            };
            return Random;
        })(split.Provider);
        provider.Random = Random;
        Random.prototype.__class__ = "split.provider.Random";
    })(provider = split.provider || (split.provider = {}));
})(split || (split = {}));
