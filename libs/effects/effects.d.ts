/**
 * Created by yaoxiaowei on 2015/3/24.
 */
declare module effects {
    class SplitSystem extends egret.DisplayObjectContainer {
        /**
         * 分割区
         */
        private _box;
        /**
         * 碎片倍数
         */
        private _multiple;
        /**
         * 目标
         */
        private _target;
        /**
         * 碎片尺寸
         */
        private _clipBox;
        /**
         * 碎片池
         */
        private _poolClips;
        private _provider;
        /**
         * 构造函数
         *
         * @param target    目标
         * @param multiple  倍数
         * @param box       区域
         * @param clipBox   碎片尺寸
         */
        constructor(target: egret.DisplayObject, multiple?: number, box?: egret.Rectangle, clipBox?: {
            width: number;
            height: number;
        });
        showFirst(): void;
        pool: Object;
        provider: effects.Provider;
        /**
         * 获取发射器
         *
         * @param emitterConfig
         * @returns {effects.Emitter}
         */
        emit(emitterConfig: {
            transform: Object;
            fraquency: number;
            duration: number;
        }): effects.Emitter;
        /**
         *  获取供应器
         *
         * @param prividerConfig
         */
        setProvider(prividerConfig: {
            name: string;
            isLoop: boolean;
        }): void;
        /**
         * 初始化
         */
        initialize(): void;
        /**
         * 校验内容是否全部透明
         *
         * @param texture       纹理
         * @returns {boolean}   非透明true|否则false
         * @private
         */
        private _validateTextureTransparent(texture);
        /**
         * 演示 （非正式方法）
         */
        demo(distance: number, duration: number): void;
        /**
         *  获取池键
         *
         * @param x             横轴坐标
         * @param y             纵轴坐标
         * @returns {string}    键
         * @private
         */
        private _generatePoolKey(x, y);
        private _getPointByKey(key);
    }
}
/**
 * Created by yaoxiaowei on 2015/3/25.
 */
declare module effects {
    class Emitter {
        private _transform;
        private _duration;
        private _timer;
        private _system;
        /**
         * 碎片池
         *
         * @param system
         * @param transform
         * @param duration
         */
        constructor(system: effects.SplitSystem, transform: any, frequency: number, duration: number);
        start(): void;
        stop(): void;
        private update();
    }
}
/**
 * Created by yaoxiaowei on 2015/3/26.
 */
declare module effects {
    class Provider {
        private _system;
        private _isLoop;
        private _times;
        constructor(system: effects.SplitSystem, isLoop?: boolean);
        getBmpList(): Array<egret.Bitmap>;
        system: effects.SplitSystem;
        isLoop: boolean;
        times: number;
    }
}
/**
 * Created by yaoxiaowei on 2015/3/26.
 */
declare module effects.provider {
    class Random extends effects.Provider {
        private _poolKeyList;
        constructor(system: effects.SplitSystem, isLoop?: boolean);
        getBmpList(): any;
        private _initKeys();
    }
}
