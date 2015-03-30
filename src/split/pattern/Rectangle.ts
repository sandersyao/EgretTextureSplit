/**
 * Created by yaoxiaowei on 2015/3/30.
 */
module split.pattern {

    export class Rectangle  extends split.Pattern {

        private _system:split.SplitSystem;

        private _rectangle:any;

        private _clipWidth:number;

        private _clipHeight:number;

        private _numClone:number;

        /**
         * 构造函数
         *
         * @param system
         * @param width
         * @param height
         * @param numClone
         */
        public constructor (system:split.SplitSystem, width:number = 0, height:number = 0, numClone:number = 1) {

            super();
            this._rectangle     = new egret.Rectangle;
            this._system        = system;
            this._clipWidth     = width;
            this._clipHeight    = height;
            this._numClone      = numClone;
        }

        /**
         * 初始化池
         */
        public  initPool ():void {

            for (var offsetX:number = this._system.box.x; offsetX < this._system.box.width; offsetX += this._clipWidth) {

                for (var offsetY:number = this._system.box.y; offsetY < this._system.box.height; offsetY += this._clipHeight) {

                    var texture:egret.RenderTexture = new egret.RenderTexture;
                    texture.drawToTexture(
                        this._system.target,
                        this._rectangle.initialize(offsetX, offsetY, this._clipWidth, this._clipHeight),
                        1
                    );

                    if (!this._validateTextureTransparent(texture)) {

                        continue;
                    }

                    this._setPool(offsetX, offsetY, texture);
                }
            }
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

            var key:string = this._generatePoolKey(x, y);

            if (!(this._system.pool[key] instanceof Array)) {

                this._system.pool[key]    = [];
            }

            for (var offset = 0; offset <  this._numClone; offset ++) {

                var bmp:egret.Bitmap = new egret.Bitmap(texture);
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

        /**
         *  获取池键
         *
         * @param x             横轴坐标
         * @param y             纵轴坐标
         * @returns {string}    键
         * @private
         */
        private _generatePoolKey (x:number, y:number):string {

            return  '_' + x + '_' + y;
        }
    }
}