/**
 * Created by yaoxiaowei on 2015/3/30.
 */
module split {

    /**
     * 切割模型基类
     */
    export class    Pattern extends egret.EventDispatcher {

        /**
         * 构造函数
         */
        public constructor () {

            super(this);
        }

        /**
         * 初始化池
         */
        public initPool ():void {}

        /**
         *  获取池键
         *
         * @param x             横轴坐标
         * @param y             纵轴坐标
         * @returns {string}    键
         */
        public static generatePoolKey (x:number, y:number):string {

            return  '_' + x + '_' + y;
        }

        /**
         * 获取坐标
         *
         * @param key
         * @returns {{x: number, y: number}}
         */
        public static getPointByKey (key:string):{x:number;y:number} {

            var point:Array<string> = key.substr(1).split('_');

            return      {
                x   : parseInt(point[0]),
                y   : parseInt(point[1])
            }
        }

        /**
         * 获取矩形旋转后的左上点坐标
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @param rotation
         * @returns {egret.Point}
         */
        public  static getRectangleLeftTop (x:number, y:number, width:number, height:number, rotation:number):egret.Point {

            var rotationCurrent:number  = rotation % 360,
                angleLength:number      = Math.atan2(height, width),
                rotationLength:number   = (angleLength / 360) * Math.PI * 2,
                xCurrent:number         = x,
                yCurrent:number         = y,
                length:number           = Math.sqrt((width * width) + (height * height));

            if (rotationCurrent == 0) {

                return  new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent <= 90) {

                var rotationAgainst:number  = 90 - rotationCurrent;
                xCurrent    -= height * Math.cos((rotationAgainst / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent <= (90 + rotationLength)) {

                var rotationAgainst:number  = rotationCurrent - 90;
                xCurrent    -= length * Math.cos(((rotationCurrent + 90 - rotationLength) / 360) * Math.PI * 2);
                yCurrent    -= width * Math.cos((rotationAgainst / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent <= 180) {

                var rotationAgainst:number  = rotationCurrent - 90;
                xCurrent    -= length * Math.cos(((rotationCurrent + 90 - rotationLength) / 360) * Math.PI * 2);
                yCurrent    -= width * Math.sin((rotationAgainst / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent <= (180 + rotationLength)) {

                var rotationAgainst:number  = rotationCurrent - 180;
                xCurrent    -= height * Math.cos((rotationAgainst / 360) * Math.PI * 2);
                yCurrent    -= length * Math.sin(((rotationAgainst + 90 - rotationLength) / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent <= 270) {

                xCurrent    -= height * Math.cos(((rotationCurrent - 180) / 360) * Math.PI * 2);
                yCurrent    -= length * Math.sin(((270 - rotationCurrent + rotationLength) / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }

            if (rotationCurrent < 360) {

                yCurrent    -= width * Math.sin(((360 - rotationCurrent) / 360) * Math.PI * 2);

                return      new egret.Point(xCurrent, yCurrent);
            }
        }
    }
}