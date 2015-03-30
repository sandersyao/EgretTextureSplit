var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yaoxiaowei on 2015/3/24.
 */
var split;
(function (split) {
    var SplitSystem = (function (_super) {
        __extends(SplitSystem, _super);
        /**
         * 构造函数
         *
         * @param target    目标
         */
        function SplitSystem(target, box) {
            _super.call(this);
            /**
             * 碎片池
             */
            this._poolClips = {};
            this._target = target;
            this._box = box;
            if (0 == (this._box.width | this._box.height)) {
                this._box.width = this._target.width;
                this._box.height = this._target.height;
            }
        }
        SplitSystem.prototype.showFirst = function () {
            for (var attr in this._poolClips) {
                var clip = this._poolClips[attr].shift();
                this._poolClips[attr].unshift(clip);
                this.addChild(clip);
            }
        };
        Object.defineProperty(SplitSystem.prototype, "box", {
            get: function () {
                return this._box;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitSystem.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitSystem.prototype, "pool", {
            get: function () {
                return this._poolClips;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitSystem.prototype, "provider", {
            get: function () {
                return this._provider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取发射器
         *
         * @param emitterConfig
         * @returns {split.Emitter}
         */
        SplitSystem.prototype.emit = function (emitterConfig) {
            var emitter = new split.Emitter(this, emitterConfig.transform, emitterConfig.fraquency, emitterConfig.duration);
            return emitter;
        };
        /**
         *  获取供应器
         *
         * @param prividerConfig
         */
        SplitSystem.prototype.setProvider = function (prividerConfig) {
            if ('undefined' == typeof window['split'].provider[prividerConfig.name]) {
                throw 'provider not exists';
            }
            var provider = Object.create(window['split'].provider[prividerConfig.name].prototype);
            provider.constructor.apply(provider, [this, prividerConfig.isLoop]);
            this._provider = provider;
        };
        /**
         * 套用模型
         *
         * @params patternConfig
         */
        SplitSystem.prototype.pattern = function (patternConfig) {
            if ('undefined' == typeof window['split'].pattern[patternConfig.name]) {
                throw 'pattern not exists';
            }
            var pattern = Object.create(window['split'].pattern[patternConfig.name].prototype);
            pattern.constructor.apply(pattern, [this, patternConfig.width, patternConfig.height, patternConfig.numClone]);
            this._pattern = pattern;
            pattern.initPool();
        };
        return SplitSystem;
    })(egret.DisplayObjectContainer);
    split.SplitSystem = SplitSystem;
    SplitSystem.prototype.__class__ = "split.SplitSystem";
})(split || (split = {}));
