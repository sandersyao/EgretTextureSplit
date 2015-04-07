/**
 * Created by yaoxiaowei on 2015/4/1.
 */
class ControlPanel extends egret.gui.Group {

    /**
     * 列表数据
     */
    private _listData:{pattern:egret.gui.ArrayCollection;provider:egret.gui.ArrayCollection;emitter:egret.gui.ArrayCollection}

    /**
     * 花型列表
     */
    private _listPattern:egret.gui.List;

    /**
     * 供应器列表
     */
    private _listProvider:egret.gui.List;

    /**
     * 发射器列表
     */
    private _listEmitter:egret.gui.List;

    /**
     * 列表容器
     */
    private _listContainer:egret.gui.Group;

    /**
     * 低端容器
     */
    private _bottomContainer:egret.gui.Group;

    /**
     * 跟容器
     */
    private _root:Main;

    /**
     * 分割系统
     */
    private _system:split.SplitSystem;

    /**
     * 发射器
     */
    private _emitter:split.Emitter;

    /**
     * 当前数据
     */
    private _currentData:any;

    /**
     * 当前纹理
     */
    private _currentGraphic:egret.DisplayObject;

    /**
     * 构造函数
     *
     * @param root
     * @param graphic
     * @param data
     */
    public constructor (root:Main, graphic:egret.DisplayObject, data:any) {

        super();
        this._currentData                   = {};
        this._root                          = root;
        this._currentGraphic                = graphic;
        this._listData                      = {
            pattern     : new egret.gui.ArrayCollection(data.patterns),
            provider    : new egret.gui.ArrayCollection(data.providers),
            emitter     : new egret.gui.ArrayCollection(data.emitters)
        };
        this.percentHeight                  = 50;
        this.percentWidth                   = 100;
        this.layout                         = new egret.gui.VerticalLayout;
        this._listContainer                 = new egret.gui.Group;
        this._bottomContainer               = new egret.gui.Group;
        this._listContainer.layout          = new egret.gui.HorizontalLayout;
        this._bottomContainer.layout        = new egret.gui.HorizontalLayout;
        this._listContainer.percentWidth    = 100;
        this._listContainer.percentHeight   = 80;
        this._bottomContainer.percentWidth  = 100;
        this._bottomContainer.percentHeight = 20;
        this.addElement(this._listContainer);
        this.addElement(this._bottomContainer);
    }

    /**
     * 创建子元素
     */
    public createChildren ():void {

        super.createChildren();
        this._createListPattern();
        this._createListProvider();
        this._createListEmitter();
        this._createButtonGroup();
    }

    /**
     * 创建花纹列表
     *
     * @private
     */
    private _createListPattern ():void {

        this._listPattern                   = new egret.gui.List;
        this._listPattern.id                = 'list_pattern';
        this._listPattern.dataProvider  = this._listData.pattern;
        this._listPattern.percentWidth  = 30;
        this._listPattern.percentHeight = 100;
        this._listPattern.labelField    = 'text_name';
        this._listPattern.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this._toggleCurrentData, this);
        this._listContainer.addElement(this._listPattern);
    }

    /**
     * 创建供应器列表
     *
     * @private
     */
    private _createListProvider ():void {

        this._listProvider                   = new egret.gui.List;
        this._listProvider.id               = 'list_provider';
        this._listProvider.dataProvider  = this._listData.provider;
        this._listProvider.percentWidth  = 30;
        this._listProvider.percentHeight = 100;
        this._listProvider.labelField    = 'text_name';
        this._listProvider.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this._toggleCurrentData, this);
        this._listContainer.addElement(this._listProvider);
    }

    /**
     * 创建发射器列表
     *
     * @private
     */
    private _createListEmitter ():void {

        this._listEmitter                   = new egret.gui.List;
        this._listEmitter.id                = 'list_emitter';
        this._listEmitter.dataProvider  = this._listData.emitter;
        this._listEmitter.percentWidth  = 30;
        this._listEmitter.percentHeight = 100;
        this._listEmitter.labelField    = 'text_name';
        this._listEmitter.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this._toggleCurrentData, this);
        this._listContainer.addElement(this._listEmitter);
    }

    /**
     * 创建按钮组
     *
     * @private
     */
    private _createButtonGroup ():void {

        var buttonPlay:egret.gui.Button         = new egret.gui.Button,
            buttonStop:egret.gui.Button         = new egret.gui.Button,
            buttonReset:egret.gui.Button        = new egret.gui.Button,
            checkLoop:egret.gui.CheckBox        = new egret.gui.CheckBox,
            checkShowOrigin:egret.gui.CheckBox  = new egret.gui.CheckBox;
        buttonPlay.label                        = '播放';
        buttonStop.label                        = '停止';
        buttonReset.label                       = '重置';
        checkLoop.label                         = '循环';
        checkShowOrigin.label                   = '显示原图';
        buttonPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this._play, this);
        buttonStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this._stop, this);
        buttonReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this._cleanStage, this);
        this._bottomContainer.addElement(buttonPlay);
        this._bottomContainer.addElement(buttonStop);
    }

    /**
     * 切换数据
     *
     * @param event
     * @private
     */
    private _toggleCurrentData (event:egret.gui.IndexChangeEvent):void {

        var key:string          = event.target.id.substr(5);

        this._cleanStage();
        this._currentData[key]  = this._listData[key].getItemAt(event.newIndex);
        this._buildStage();
    }

    /**
     * 判断是否能创建舞台
     *
     * @returns {split.pattern|string|split.provider|split.Provider|any}
     * @private
     */
    private _canBuild ():boolean {

        return  this._currentData.pattern && this._currentData.provider && this._currentData.emitter;
    }

    /**
     * 创建舞台
     *
     * @private
     */
    private _buildStage ():void {

        if (!this._canBuild()) {

            return  ;
        }

        var patternData     = RES.getRes(this._currentData.pattern.resource_name),
            providerData    = RES.getRes(this._currentData.provider.resource_name),
            emitterData     = RES.getRes(this._currentData.emitter.resource_name),
            box             = {x:0,y:0,width:0,height:0};

        this._system    = new split.SplitSystem(this._currentGraphic, box);
        this._system.setPattern(patternData);
        this._system.setProvider(providerData);
        this._emitter   = this._system.emit(emitterData);
        this._system.x  = (this.stage.stageWidth - this._system.width) / 2;
        this._system.y  = (this.stage.stageHeight / 2) + (this.stage.stageHeight / 4) - (this._system.width / 2);
        this._system.showFirst();
        this._root.gameLayer.addChild(this._system);
    }

    /**
     * 播放
     *
     * @private
     */
    private _play ():void {

        if (this._emitter) {

            this._emitter.start();
        }
    }

    /**
     * 停止
     *
     * @private
     */
    private _stop ():void {

        if (this._emitter) {

            this._emitter.stop();
        }
    }

    /**
     * 清理舞台
     *
     * @private
     */
    private _cleanStage ():void {

        this._stop();

        if (this._system && this._system.parent == this._root.gameLayer) {

            this._root.gameLayer.removeChild(this._system);
        }
    }
}