/**
 * Created by yaoxiaowei on 2015/3/25.
 */
module split {

    export  class   Emitter {

        private _transform:any;

        private _duration:number;

        private _timer:egret.Timer;

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

        public  start () {

            this._timer.start();
        }

        public  stop () {

            this._timer.stop();
        }

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