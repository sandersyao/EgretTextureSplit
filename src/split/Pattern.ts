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
    }
}