/**
 * Created by yaoxiaowei on 2015/3/25.
 */
var split;
(function (split) {
    var Emitter = (function () {
        /**
         * 碎片池
         *
         * @param system
         * @param transform
         * @param duration
         */
        function Emitter(system, transform, frequency, duration) {
            this._system = system;
            this._transform = transform;
            this._duration = duration;
            this._timer = new egret.Timer(frequency, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        }
        Emitter.prototype.start = function () {
            this._timer.start();
        };
        Emitter.prototype.stop = function () {
            this._timer.stop();
        };
        Emitter.prototype.update = function () {
            var listClip = this._system.provider.getBmpList(), me = this;
            if (!(listClip instanceof Array)) {
                return;
            }
            listClip.forEach(function (clip) {
                if (me._system != clip.parent) {
                    me._system.addChild(clip);
                }
                if ('object' == typeof me._transform) {
                    egret.Tween.get(clip).to(me._transform, me._duration).call(function () {
                        if (me._system == clip.parent) {
                            me._system.removeChild(clip);
                        }
                    }, me);
                }
                else if ('function' == typeof me._transform) {
                    me._transform.apply(me, [clip]);
                }
            }, this);
        };
        return Emitter;
    })();
    split.Emitter = Emitter;
    Emitter.prototype.__class__ = "split.Emitter";
})(split || (split = {}));
