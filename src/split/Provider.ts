/**
 * Created by yaoxiaowei on 2015/3/26.
 */
module  split {

    export class    Provider {

        private _system:split.SplitSystem;

        private _isLoop:boolean;

        private _times:number   = 0;

        public  constructor (system:split.SplitSystem, isLoop:boolean = false) {

            this._system    = system;
            this._isLoop    = isLoop;
        }

        public  getBmpList ():Array<egret.Bitmap> {

            ++ this._times;

            return  [];
        }

        public  set system (system:split.SplitSystem) {

            this._system    = system;
        }

        public  get system ():split.SplitSystem {

            return  this._system;
        }

        public  get isLoop ():boolean {

            return  this._isLoop;
        }

        public  get times ():number {

            return  this._times;
        }
    }
}