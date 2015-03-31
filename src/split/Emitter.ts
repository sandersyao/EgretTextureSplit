/**
 * Created by yaoxiaowei on 2015/3/25.
 */
module split {

    /**
     * 发射器
     */
    export  class   Emitter {

        /**
         * 变形
         */
        private _transform:any;

        /**
         * 变形时间
         */
        private _duration:number;

        /**
         * 定时器
         */
        private _timer:egret.Timer;

        /**
         * 所在体系
         */
        private _system:split.SplitSystem;

        /**
         * 碎片池
         *
         * @param system
         * @param transform
         * @param duration
         */
        public  constructor (system:split.SplitSystem, transform:any, frequency:number, duration:number) {

            this._system    = system;
            this._transform = transform;
            this._duration  = duration;
            this._timer     = new egret.Timer(frequency, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        }

        /**
         * 开始
         */
        public  start ():void {

            this._timer.start();
        }

        /**
         * 停止
         */
        public  stop ():void {

            this._timer.stop();
        }

        /**
         * 定时事件监听器
         */
        private update ():void {

            var listClip:Array<egret.Bitmap>    = this._system.provider.getBmpList(),
                me:split.Emitter              = this;

            if (!(listClip instanceof Array)) {

                return  ;
            }

            listClip.forEach(function (clip:egret.Bitmap) {

                if (me._system != clip.parent) {

                    me._system.addChild(clip);
                }

                if ('object' == typeof me._transform) {

                    egret.Tween.get(clip).to(me._transform, me._duration).call(function () {

                        if (me._system == clip.parent) {

                            me._system.removeChild(clip);
                        }
                    }, me);
                } else if ('function' == typeof me._transform) {

                    me._transform.apply(me, [clip]);
                }
            }, this);
        }
    }
}