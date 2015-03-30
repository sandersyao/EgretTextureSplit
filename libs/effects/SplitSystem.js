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
         * @param multiple  倍数
         * @param box       区域
         * @param clipBox   碎片尺寸
         */
        function SplitSystem(target, multiple, box, clipBox) {
            if (multiple === void 0) { multiple = 1; }
            if (box === void 0) { box = new egret.Rectangle; }
            if (clipBox === void 0) { clipBox = { width: box.width, height: box.height }; }
            _super.call(this);
            /**
             * 碎片池
             */
            this._poolClips = {};
            this._target = target;
            this._multiple = multiple;
            this._box = box;
            this._clipBox = clipBox;
            if (0 == (this._box.width | this._box.height)) {
                this._box.width = this._target.width;
                this._box.height = this._target.height;
            }
            this.initialize();
        }
        SplitSystem.prototype.showFirst = function () {
            for (var attr in this._poolClips) {
                var clip = this._poolClips[attr].shift();
                this._poolClips[attr].unshift(clip);
                this.addChild(clip);
            }
        };
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
         * 初始化
         */
        SplitSystem.prototype.initialize = function () {
            var boxProp = {
                x: this._box.x,
                y: this._box.y,
                width: this._box.width,
                height: this._box.height
            };
            for (var offsetX = 0; offsetX < boxProp.width; offsetX += this._clipBox.width) {
                for (var offsetY = 0; offsetY < boxProp.height; offsetY += this._clipBox.height) {
                    var texture = new egret.RenderTexture;
                    texture.drawToTexture(this._target, this._box.initialize(offsetX, offsetY, this._clipBox.width, this._clipBox.height), 1);
                    if (!this._validateTextureTransparent(texture)) {
                        continue;
                    }
                    var bmp = new egret.Bitmap(texture);
                    var key = this._generatePoolKey(offsetX, offsetY);
                    if (!(this._poolClips[key] instanceof Array)) {
                        this._poolClips[key] = [];
                    }
                    this._poolClips[key].push(bmp);
                    this._box.initialize(boxProp.x, boxProp.y, boxProp.width, boxProp.height);
                }
            }
        };
        /**
         * 校验内容是否全部透明
         *
         * @param texture       纹理
         * @returns {boolean}   非透明true|否则false
         * @private
         */
        SplitSystem.prototype._validateTextureTransparent = function (texture) {
            for (var offsetX = 0; offsetX < texture.textureWidth; offsetX++) {
                for (var offsetY = 0; offsetY < texture.textureHeight; offsetY++) {
                    var color = texture.getPixel32(offsetX, offsetY);
                    if (color[3] > 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * 演示 （非正式方法）
         */
        SplitSystem.prototype.demo = function (distance, duration) {
            for (var key in this._poolClips) {
                var point = this._getPointByKey(key);
                for (var offset = 0; offset < this._poolClips[key].length; offset++) {
                    this.addChild(this._poolClips[key][offset]);
                    egret.Tween.get(this._poolClips[key][offset]).to({
                        x: point.x * distance,
                        y: point.y * distance
                    }, duration);
                }
            }
        };
        /**
         *  获取池键
         *
         * @param x             横轴坐标
         * @param y             纵轴坐标
         * @returns {string}    键
         * @private
         */
        SplitSystem.prototype._generatePoolKey = function (x, y) {
            return '_' + x + '_' + y;
        };
        SplitSystem.prototype._getPointByKey = function (key) {
            var clips = key.split('_');
            return new egret.Point(clips[1], clips[2]);
        };
        return SplitSystem;
    })(egret.DisplayObjectContainer);
    split.SplitSystem = SplitSystem;
    SplitSystem.prototype.__class__ = "split.SplitSystem";
})(split || (split = {}));
