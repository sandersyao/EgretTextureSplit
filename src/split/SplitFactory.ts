/**
 * Created by yaoxiaowei on 2015/3/31.
 */
module split {

    /**
     * 切割体系工厂类
     */
    export class SplitFactory {

        /**
         * 本类实例
         */
        private static _instance:split.SplitFactory;

        /**
         * 获取实例
         *
         * @returns {split.SplitFactory}
         */
        public static getInstance ():split.SplitFactory {

            if (!(split.SplitFactory._instance instanceof split.SplitFactory)) {

                split.SplitFactory._instance    = new split.SplitFactory;
            }

            return  split.SplitFactory;
        }

        /**
         * 创建
         *
         * @param target
         * @param configData
         */
        public create (target:egret.DisplayObject, configData:any):split.SplitSystem {

            var system  = new split.SplitSystem(target, configData.area);
            system.setProvider(configData.provider);
            system.setPattern(configData.pattern);

            return  system;
        }
    }
}