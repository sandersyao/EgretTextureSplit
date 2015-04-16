/**
 * Created by yaoxiaowei on 2015/4/14.
 */
module split.provider {

    /**
     * 顺序供应器
     */
    export class OrderLR extends split.Provider {

        /**
         * 当前横轴下标
         *
         * @type {number}
         * @private
         */
        private _xCurrent:number            = 0;

        /**
         * 当前纵轴下标
         *
         * @type {number}
         * @private
         */
        private _yCurrent:number            = 0;

        /**
         * 键列表
         *
         * @type {Array}
         * @private
         */
        private _keyList:Array<Array<string>>   = [];

        /**
         * 碎片数量
         *
         * @type {number}
         * @private
         */
        private _count:number   = 0;

        /**
         * 一次获取数量
         *
         * @type {number}
         * @private
         */
        private _multi:number   = 1;

        /**
         * 构造函数
         *
         * @param system
         * @param config
         */
        public constructor (system:split.SplitSystem, config:any) {

            super(system, config);
            this._initialize();

            if (config.multi) {

                this._multi = config.multi;
            }
        }

        /**
         * 获取碎片列表
         *
         * @returns {boolean}
         */
        public  getBmpList ():any {

            if (!this.isLoop && this.times >= Math.ceil(this._count / this._multi)) {

                return  false;
            }

            super.getBmpList();

            var list:Array<any> = [];

            for (var offset:number = 0; offset < this._multi; offset++) {

                var key:any = this._next();

                if (false == key) {

                    break;
                }

                var bmp:egret.Bitmap = this.system.pool[key].shift();
                this.system.pool[key].push(bmp);
                list.push(bmp);
            }

            return  list;
        }

        /**
         * 下一个键 没有返回false
         *
         * @returns {*}
         * @private
         */
        private _next ():any {

            if ('undefined' == typeof this._keyList[this._xCurrent]) {

                return  false;
            }

            if ('undefined' == typeof this._keyList[this._xCurrent][this._yCurrent]) {

                ++ this._xCurrent;
                this._yCurrent  = 0;

                return  this._next();
            }

            var key:string  = this._keyList[this._xCurrent][this._yCurrent];
            ++ this._yCurrent;

            return          key;
        }

        /**
         * 初始化
         *
         * @private
         */
        private _initialize ():void {

            var xList:Array<number>             = [],
                yList:Array<number>             = [],
                keyList:Array<string>           = [];

            for (var attr in this.system.pool) {

                var point:{x:number;y:number}   = split.Pattern.getPointByKey(attr);

                if (0 > xList.indexOf(point.x)) {

                    xList.push(point.x);
                }

                if (0 > yList.indexOf(point.y)) {

                    yList.push(point.y);
                }

                keyList.push(attr);
                ++ this._count;
            }

            xList.sort(this._sort);
            yList.sort(this._sort);

            for (var offset:number = 0; offset < keyList.length; offset ++) {

                var point:{x:number;y:number}   = split.Pattern.getPointByKey(keyList[offset]),
                    offsetX:number              = xList.indexOf(point.x),
                    offsetY:number              = yList.indexOf(point.y);
                this._keyList[offsetX]          = 'undefined' == typeof this._keyList[offsetX]
                                                    ? []
                                                    : this._keyList[offsetX];
                this._keyList[offsetX][offsetY] = keyList[offset];
            }
        }

        /**
         * 排序方法
         *
         * @param a
         * @param b
         * @returns {number}
         * @private
         */
        private _sort (a, b) {

            if (a == b) {

                return  0;
            }

            return  a > b   ? 1 : -1;
        }
    }
}