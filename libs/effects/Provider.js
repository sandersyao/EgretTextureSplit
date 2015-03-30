/**
 * Created by yaoxiaowei on 2015/3/26.
 */
var split;
(function (split) {
    var Provider = (function () {
        function Provider(system, isLoop) {
            if (isLoop === void 0) { isLoop = false; }
            this._times = 0;
            this._system = system;
            this._isLoop = isLoop;
        }
        Provider.prototype.getBmpList = function () {
            ++this._times;
            return [];
        };
        Object.defineProperty(Provider.prototype, "system", {
            get: function () {
                return this._system;
            },
            set: function (system) {
                this._system = system;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Provider.prototype, "isLoop", {
            get: function () {
                return this._isLoop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Provider.prototype, "times", {
            get: function () {
                return this._times;
            },
            enumerable: true,
            configurable: true
        });
        return Provider;
    })();
    split.Provider = Provider;
    Provider.prototype.__class__ = "split.Provider";
})(split || (split = {}));
