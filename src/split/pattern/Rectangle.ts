/**
 * Created by yaoxiaowei on 2015/3/30.
 */
module split.pattern {

    /**
     * 切割模型 矩形
     */
    export class Rectangle  extends split.Pattern {

        /**
         * 所在系统
         */
        private _system:split.SplitSystem;

        /**
         * 矩形
         */
        private _rectangle:any;

        /**
         * 宽度
         */
        private _clipWidth:number;

        /**
         * 高度
         */
        private _clipHeight:number;

        /**
         * 复制个数
         */
        private _numClone:number;

        /**
         * 角度
         */
        private _rotation:number;

        /**
         * 构造函数
         *
         * @param system
         * @param config
         */
        public constructor (system:split.SplitSystem, config:{width:number;height:number;numClone:number;rotation:number}) {

            super();
            this._rectangle     = new egret.Rectangle;
            this._system        = system;
            this._clipWidth     = 0 == config.width     ? system.box.width  : config.width;
            this._clipHeight    = 0 == config.height    ? system.box.height : config.height;
            this._numClone      = config.numClone;
            this._rotation      = config.rotation;
        }

        /**
         * 初始化池
         */
        public  initPool ():void {

            this._rotate();
            var boxWidth    = 0 === this._system.box.width
                            ? this._system.targetContainer.measuredWidth
                            : this._system.box.width,
                boxHeight   = 0 ===  this._system.box.height
                            ? this._system.targetContainer.measuredHeight
                            : this._system.box.height,
                initPoint   = split.Pattern.getRectangleLeftTop(this._system.box.x, this._system.box.y, boxWidth, boxHeight, this._rotation);

            for (var offsetX:number = initPoint.x; offsetX < boxWidth; offsetX += this._clipWidth) {

                for (var offsetY:number = initPoint.y; offsetY < boxHeight; offsetY += this._clipHeight) {

                    var texture:egret.RenderTexture = new egret.RenderTexture;

                    texture.drawToTexture(
                        this._system.targetContainer,
                        this._rectangle.initialize(offsetX, offsetY, this._clipWidth, this._clipHeight),
                        1
                    );

                    if (!this._validateTextureTransparent(texture)) {

                        continue;
                    }

                    this._setPool(offsetX, offsetY, texture);
                }
            }

            this._rotateRevert();
        }

        /**
         * 旋转
         *
         * @private
         */
        private _rotate () {

            this._system.target.rotation = this._rotation;
        }

        /**
         * 恢复角度
         *
         * @private
         */
        private _rotateRevert () {

            this._system.target.rotation = 0;
        }

        /**
         * 向池灌入数据
         *
         * @param x
         * @param y
         * @param texture
         * @private
         */
        private _setPool (x:number, y:number, texture:egret.Texture):void {

            var key:string = split.Pattern.generatePoolKey(x, y);

            if (!(this._system.pool[key] instanceof Array)) {

                this._system.pool[key]    = [];
            }

            for (var offset = 0; offset <  this._numClone; offset ++) {

                var bmp:egret.Bitmap = new egret.Bitmap(texture);
                bmp.rotation    = 0 - this._rotation;
                this._system.pool[key].push(bmp);
            }
        }

        /**
         * 校验内容是否全部透明
         *
         * @param texture       纹理
         * @returns {boolean}   非透明true|否则false
         * @private
         */
        private _validateTextureTransparent (texture:egret.Texture):boolean {

            for (var offsetX = 0; offsetX < texture.textureWidth; offsetX ++) {

                for (var offsetY = 0;offsetY < texture.textureHeight; offsetY ++) {

                    var color   = texture.getPixel32(offsetX, offsetY);

                    if (color[3] > 0) {

                        return  true;
                    }
                }
            }
            return  false;
        }
    }
}