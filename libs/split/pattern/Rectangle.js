var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yaoxiaowei on 2015/3/30.
 */
var split;
(function (split) {
    var pattern;
    (function (pattern) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            /**
             * 构造函数
             *
             * @param system
             * @param width
             * @param height
             * @param numClone
             */
            function Rectangle(system, width, height, numClone) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (numClone === void 0) { numClone = 1; }
                _super.call(this);
                this._rectangle = new egret.Rectangle;
                this._system = system;
                this._clipWidth = width;
                this._clipHeight = height;
                this._numClone = numClone;
            }
            /**
             * 初始化池
             */
            Rectangle.prototype.initPool = function () {
                for (var offsetX = this._system.box.x; offsetX < this._system.box.width; offsetX += this._clipWidth) {
                    for (var offsetY = this._system.box.y; offsetY < this._system.box.height; offsetY += this._clipHeight) {
                        var texture = new egret.RenderTexture;
                        texture.drawToTexture(this._system.target, this._rectangle.initialize(offsetX, offsetY, this._clipWidth, this._clipHeight), 1);
                        if (!this._validateTextureTransparent(texture)) {
                            continue;
                        }
                        this._setPool(offsetX, offsetY, texture);
                    }
                }
            };
            /**
             * 向池灌入数据
             *
             * @param x
             * @param y
             * @param texture
             * @private
             */
            Rectangle.prototype._setPool = function (x, y, texture) {
                var key = this._generatePoolKey(x, y);
                if (!(this._system.pool[key] instanceof Array)) {
                    this._system.pool[key] = [];
                }
                for (var offset = 0; offset < this._numClone; offset++) {
                    var bmp = new egret.Bitmap(texture);
                    this._system.pool[key].push(bmp);
                }
            };
            /**
             * 校验内容是否全部透明
             *
             * @param texture       纹理
             * @returns {boolean}   非透明true|否则false
             * @private
             */
            Rectangle.prototype._validateTextureTransparent = function (texture) {
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
             *  获取池键
             *
             * @param x             横轴坐标
             * @param y             纵轴坐标
             * @returns {string}    键
             * @private
             */
            Rectangle.prototype._generatePoolKey = function (x, y) {
                return '_' + x + '_' + y;
            };
            return Rectangle;
        })(split.Pattern);
        pattern.Rectangle = Rectangle;
        Rectangle.prototype.__class__ = "split.pattern.Rectangle";
    })(pattern = split.pattern || (split.pattern = {}));
})(split || (split = {}));
