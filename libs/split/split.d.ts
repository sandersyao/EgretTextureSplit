/**
 * Created by yaoxiaowei on 2015/3/24.
 */
declare module split {
    class SplitSystem extends egret.DisplayObjectContainer {
        /**
         * 目标
         */
        private _target;
        /**
         * 碎片池
         */
        private _poolClips;
        /**
         * 供应器
         */
        private _provider;
        /**
         * 模型
         */
        private _pattern;
        /**
         * 切割区域
         */
        private _box;
        /**
         * 构造函数
         *
         * @param target    目标
         */
        constructor(target: egret.DisplayObject, box: {
            x: number;
            y: number;
            width: number;
            height: number;
        });
        showFirst(): void;
        box: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        target: egret.DisplayObject;
        pool: Object;
        provider: split.Provider;
        /**
         * 获取发射器
         *
         * @param emitterConfig
         * @returns {split.Emitter}
         */
        emit(emitterConfig: {
            transform: Object;
            fraquency: number;
            duration: number;
        }): split.Emitter;
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
         * 套用模型
         *
         * @params patternConfig
         */
        pattern(patternConfig: {
            name: string;
            width: number;
            height: number;
            numClone: number;
        }): void;
    }
}
/**
 * Created by yaoxiaowei on 2015/3/25.
 */
declare module split {
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
        constructor(system: split.SplitSystem, transform: any, frequency: number, duration: number);
        start(): void;
        stop(): void;
        private update();
    }
}
/**
 * Created by yaoxiaowei on 2015/3/30.
 */
declare module split {
    class Pattern {
        initPool(): void;
    }
}
/**
 * Created by yaoxiaowei on 2015/3/30.
 */
declare module split.pattern {
    class Rectangle extends split.Pattern {
        private _system;
        private _rectangle;
        private _clipWidth;
        private _clipHeight;
        private _numClone;
        /**
         * 构造函数
         *
         * @param system
         * @param width
         * @param height
         * @param numClone
         */
        constructor(system: split.SplitSystem, width?: number, height?: number, numClone?: number);
        /**
         * 初始化池
         */
        initPool(): void;
        /**
         * 向池灌入数据
         *
         * @param x
         * @param y
         * @param texture
         * @private
         */
        private _setPool(x, y, texture);
        /**
         * 校验内容是否全部透明
         *
         * @param texture       纹理
         * @returns {boolean}   非透明true|否则false
         * @private
         */
        private _validateTextureTransparent(texture);
        /**
         *  获取池键
         *
         * @param x             横轴坐标
         * @param y             纵轴坐标
         * @returns {string}    键
         * @private
         */
        private _generatePoolKey(x, y);
    }
}
/**
 * Created by yaoxiaowei on 2015/3/26.
 */
declare module split {
    class Provider {
        private _system;
        private _isLoop;
        private _times;
        constructor(system: split.SplitSystem, isLoop?: boolean);
        getBmpList(): Array<egret.Bitmap>;
        system: split.SplitSystem;
        isLoop: boolean;
        times: number;
    }
}
/**
 * Created by yaoxiaowei on 2015/3/26.
 */
declare module split.provider {
    class Random extends split.Provider {
        private _poolKeyList;
        constructor(system: split.SplitSystem, isLoop?: boolean);
        getBmpList(): any;
        private _initKeys();
    }
}
