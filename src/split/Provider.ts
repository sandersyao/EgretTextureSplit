/**
 * Created by yaoxiaowei on 2015/3/26.
 */
module  split {

    /**
     * 供应器基类
     */
    export class    Provider {

        /**
         * 所在体系
         */
        private _system:split.SplitSystem;

        /**
         * 是否循环提供
         */
        private _isLoop:boolean;

        /**
         * 当前运行次数
         *
         * @type {number}
         * @private
         */
        private _times:number   = 0;

        /**
         * 构造函数
         *
         * @param system
         * @param config
         */
        public  constructor (system:split.SplitSystem, config:{isLoop:boolean}) {

            this._system    = system;
            this._isLoop    = null === config.isLoop    ? false : config.isLoop;
        }

        /**
         * 获取列表
         *
         * @returns {Array}
         */
        public  getBmpList ():Array<egret.Bitmap> {

            ++ this._times;

            return  [];
        }

        /**
         * 配置所在系统
         *
         * @param system
         */
        public  set system (system:split.SplitSystem) {

            this._system    = system;
        }

        /**
         * 获取所在系统
         *
         * @returns {split.SplitSystem}
         */
        public  get system ():split.SplitSystem {

            return  this._system;
        }

        /**
         * 获取是否循环
         *
         * @returns {boolean}
         */
        public  get isLoop ():boolean {

            return  this._isLoop;
        }

        /**
         * 获取运行次数
         *
         * @returns {number}
         */
        public  get times ():number {

            return  this._times;
        }
    }
}