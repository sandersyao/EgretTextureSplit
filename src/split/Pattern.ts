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
    }
}