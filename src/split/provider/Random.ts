/**
 * Created by yaoxiaowei on 2015/3/26.
 */
module split.provider {

    export class Random extends split.Provider {

        private _poolKeyList:Array<string>;

        public constructor (system:split.SplitSystem, isLoop:boolean = false) {

            super(system, isLoop);
            this._initKeys();
        }

        public getBmpList ():any {

            if (!this.isLoop && this.times == this._poolKeyList.length) {

                return  false;
            }

            super.getBmpList();
            var key:string  = this._poolKeyList.shift(),
                bmp:egret.Bitmap    = this.system.pool[key].shift();
            this.system.pool[key].push(bmp);
            this._poolKeyList.push(key);

            return  [bmp];
        }

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