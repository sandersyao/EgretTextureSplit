/**
 * Created by yaoxiaowei on 2015/3/26.
 */
module split.provider {

    /**
     * 供应器 随机
     */
    export class Random extends split.Provider {

        /**
         * 对象池键列表
         */
        private _poolKeyList:Array<string>;

        /**
         * 数量
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
            this._initKeys();

            if (config.multi) {

                this._multi = config.multi;
            }
        }

        /**
         * 获取对象列表
         *
         * @returns {*}
         */
        public getBmpList ():any {

            if (!this.isLoop && this.times >= Math.ceil(this._poolKeyList.length / this._multi)) {

                return  false;
            }

            super.getBmpList();

            var list:Array<any> = [];

            for (var offset:number = 0; offset < this._multi; offset++) {

                var key:string = this._poolKeyList.shift(),
                    bmp:egret.Bitmap = this.system.pool[key].shift();
                this.system.pool[key].push(bmp);
                this._poolKeyList.push(key);
                list.push(bmp);
            }

            return  list;
        }

        /**
         * 初始化池键列表
         *
         * @private
         */
        private _initKeys ():void {

            var keyList:Array<string> = [];

            for (var attr in this.system.pool) {

                keyList.push(attr);
            }

            this._poolKeyList   = [];

            while (keyList.length > 0) {

                var offset = Math.floor(Math.random() * keyList.length);

                if (0 != offset) {

                    var temp        = keyList[offset];
                    keyList[offset]  = keyList[0];
                    keyList[0]      = temp;
                };

                this._poolKeyList.push(keyList.shift());
            }
        }
    }
}