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
    private _rightContainer:egret.gui.Group;

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
     * 原图容器
     */
    private _originContainer:egret.DisplayObjectContainer;

    /**
     * 分割系统容器
     */
    private _systemContainer:egret.DisplayObjectContainer;

    /**
     * 当前纹理
     */
    private _currentGraphic:egret.DisplayObject;

    /**
     * 是否首次显示
     */
    private _showFist:boolean;

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
        this._originContainer               = new egret.DisplayObjectContainer;
        this._systemContainer               = new egret.DisplayObjectContainer;
        this._listData                      = {
            pattern     : new egret.gui.ArrayCollection(data.patterns),
            provider    : new egret.gui.ArrayCollection(data.providers),
            emitter     : new egret.gui.ArrayCollection(data.emitters)
        };
        this.percentHeight                  = 50;
        this.percentWidth                   = 100;
        this.layout                         = new egret.gui.HorizontalLayout;
        this._listContainer                 = new egret.gui.Group;
        this._rightContainer               = new egret.gui.Group;
        this._listContainer.layout          = new egret.gui.HorizontalLayout;
        this._rightContainer.layout        = new egret.gui.VerticalLayout;
        this._listContainer.percentWidth    = 75;
        this._listContainer.percentHeight   = 100;
        this._rightContainer.percentWidth  = 25;
        this._rightContainer.percentHeight = 100;
        this.addElement(this._listContainer);
        this.addElement(this._rightContainer);
        this._root.gameLayer.addChild(this._originContainer);
        this._root.gameLayer.addChild(this._systemContainer);
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
            checkShowOrigin:egret.gui.CheckBox  = new egret.gui.CheckBox,
            checkShowFirst:egret.gui.CheckBox   = new egret.gui.CheckBox;
        buttonPlay.label                        = '播放';
        buttonPlay.width                        = 100;
        buttonStop.label                        = '停止';
        buttonStop.width                        = 100;
        buttonReset.label                       = '重置';
        buttonReset.width                       = 100;
        checkShowOrigin.label                   = '显示原图';
        checkShowFirst.label                    = '首次显示';
        checkShowFirst.addEventListener(egret.Event.CHANGE, this._toggleShowFirst, this)
        checkShowOrigin.addEventListener(egret.Event.CHANGE, this._toggleShowOrigin, this);
        buttonPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this._play, this);
        buttonStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this._stop, this);
        buttonReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this._cleanStage, this);
        this._rightContainer.addElement(checkShowOrigin);
        this._rightContainer.addElement(checkShowFirst);
        this._rightContainer.addElement(buttonPlay);
        this._rightContainer.addElement(buttonStop);
        this._rightContainer.addElement(buttonReset);
    }

    /**
     * 切换首次显示
     *
     * @param event
     * @private
     */
    private _toggleShowFirst (event:egret.Event):void {

        this._showFist  = event.target.selected;
    }

    /**
     * 切换显示原图
     *
     * @param event
     * @private
     */
    private _toggleShowOrigin (event:egret.Event):void {

        this._currentGraphic.x  = (this.stage.stageWidth - this._currentGraphic.width) / 2;
        this._currentGraphic.y  = (this.stage.stageHeight / 2) + (this.stage.stageHeight / 4) - (this._currentGraphic.width / 2);

        if (event.target.selected && this._currentGraphic.parent != this._originContainer) {

            this._originContainer.addChild(this._currentGraphic);

        } else if (!event.target.selected && this._currentGraphic.parent == this._originContainer) {

            this._originContainer.removeChild(this._currentGraphic);
        }
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

        if (this._showFist) {

            this._system.showFirst();
        }

        this._systemContainer.addChild(this._system);
    }

    /**
     * 播放
     *
     * @private
     */
    private _play ():void {

        this._buildStage();

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

        if (this._system && this._system.parent == this._systemContainer) {

            this._systemContainer.removeChild(this._system);
        }
    }
}