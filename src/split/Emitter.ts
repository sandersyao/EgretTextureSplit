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
         * 是否循环
         */
        private _loop:boolean;

        /**
         * 定时器
         */
        private _timer:egret.Timer;

        /**
         * 所在体系
         */
        private _system:split.SplitSystem;

        /**
         * 初始化
         */
        private _initial:Object;

        /**
         * 回调方法
         */
        private _callback:any;

        /**
         * 碎片池
         *
         * @param system
         * @param initial
         * @param transform
         * @param loop
         * @param frequency
         * @param callback
         */
        public  constructor (system:split.SplitSystem, initial:any, transform:Array<any>, loop:boolean, frequency:number, callback:any = null) {

            this._system    = system;
            this._initial   = initial;
            this._transform = transform;
            this._loop      = loop;
            this._callback  = callback;
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

                    me._initialize(clip);
                    me._system.addChild(clip);
                }

                if ('object' == typeof me._transform) {

                    egret.Tween.removeTweens(clip)
                    var tween:egret.Tween   = me._getTween(clip);

                    me._transform.forEach(function (transform) {

                        tween.to(transform.attributes, transform.duration)
                    });

                    if (!me._loop) {

                        tween.call(function () {

                            egret.Tween.removeTweens(clip);

                            if (null != me._callback) {

                                me._callback.apply(me, [clip]);
                            }
                        }, me);
                    }
                } else if ('function' == typeof me._transform) {

                    me._transform.apply(me, [clip]);
                }
            }, this);
        }

        /**
         * 获取Tween动画实例
         *
         * @param clip
         * @returns {egret.Tween}
         * @private
         */
        private _getTween (clip:egret.DisplayObject):egret.Tween {

            if (this._loop) {

                return  egret.Tween.get(clip, {"loop":this._loop});
            }

            return  egret.Tween.get(clip);
        }

        /**
         * 目标
         *
         * @param target
         * @private
         */
        private _initialize (target:any):void {

            for (var attr in this._initial) {

                target[attr]    = this._initial[attr];
            }
        }
    }
}