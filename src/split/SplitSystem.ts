/**
 * Created by yaoxiaowei on 2015/3/24.
 */
module split {

    /**
     * 切割体系
     */
    export class   SplitSystem extends egret.DisplayObjectContainer{

        /**
         * 目标
         */
        private _target:egret.DisplayObject;

        /**
         * 碎片池
         */
        private _poolClips:Object   = {};

        /**
         * 供应器
         */
        private _provider:split.Provider;

        /**
         * 模型
         */
        private _pattern:split.Pattern;

        /**
         * 切割区域
         */
        private _box:{x:number;y:number;width:number;height:number};

        /**
         * 构造函数
         *
         * @param target    目标
         */
        public  constructor (target:egret.DisplayObject, box:{x:number;y:number;width:number;height:number}) {

            super();
            this._target    = target;
            this._box       = box;

            if (0 == (box.x | box.y | box.width | box.height)) {

                this._box.width = target.width;
                this._box.height = target.height;
            }
        }

        /**
         * 显示池中第一组对象
         */
        public  showFirst ():void {

            for (var attr in this._poolClips) {

                var clip    = this._poolClips[attr].shift();
                this._poolClips[attr].unshift(clip);
                this.addChild(clip);
            }
        }

        /**
         * 获取区域
         *
         * @returns {{x: number, y: number, width: number, height: number}}
         */
        public get box ():{x:number;y:number;width:number;height:number} {

            return  this._box;
        }

        /**
         * 获取目标
         *
         * @returns {egret.DisplayObject}
         */
        public get target ():egret.DisplayObject {

            return  this._target;
        }

        /**
         * 获取池
         *
         * @returns {Object}
         */
        public get pool ():Object {

            return  this._poolClips;
        }

        /**
         * 获取供应器
         *
         * @returns {split.Provider}
         */
        public  get provider ():split.Provider {

            return  this._provider;
        }

        /**
         * 获取发射器
         *
         * @param emitterConfig
         * @returns {split.Emitter}
         */
        public  emit (emitterConfig:{transform:Object;fraquency:number;duration:number}):split.Emitter {

            var emitter = new split.Emitter(
                this,
                emitterConfig.transform,
                emitterConfig.fraquency,
                emitterConfig.duration
            );

            return  emitter;
        }

        /**
         *  配置供应器
         *
         * @param prividerConfig
         */
        public  setProvider (prividerConfig:{name:string;isLoop:boolean}):void {

            if ('undefined' == typeof window['split'].provider[prividerConfig.name]) {

                throw 'provider not exists';
            }

            var provider    = Object.create(window['split'].provider[prividerConfig.name].prototype);
            provider.constructor.apply(provider, [this, prividerConfig.isLoop]);

            this._provider  = provider;
        }

        /**
         * 套用模型
         *
         * @params patternConfig
         */
        public  setPattern (patternConfig:{name:string;width:number;height:number;numClone:number}):void {

            if ('undefined' == typeof window['split'].pattern[patternConfig.name]) {

                throw 'pattern not exists';
            }

            var pattern = Object.create(window['split'].pattern[patternConfig.name].prototype);
            pattern.constructor.apply(pattern, [this, patternConfig.width, patternConfig.height,patternConfig.numClone]);
            this._pattern  = pattern;
            pattern.initPool();
        }
    }
}