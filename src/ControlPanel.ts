/**
 * Created by yaoxiaowei on 2015/4/1.
 */
class ControlPanel extends egret.gui.Group {

    private _listData:egret.gui.ArrayCollection;

    private _list:egret.gui.List;

    private _root:Main;

    private _system:split.SplitSystem;

    private _emitter:split.Emitter;

    private _currentData:any;

    private _currentGraphic:egret.DisplayObject;

    public constructor (root:Main, graphic:egret.DisplayObject, data:Array<any>) {

        super();
        this._root              = root;
        this._currentGraphic    = graphic;
        this._listData          = new egret.gui.ArrayCollection(data);
        this.percentHeight      = 50;
        this.percentWidth       = 100;
        this.layout             = new egret.gui.HorizontalLayout;
    }

    public createChildren ():void {

        super.createChildren();
        this._createList();
        this._createButtonGroup();
    }

    private _createList ():void {

        this._list                      = new egret.gui.List;
        this._list.dataProvider     = this._listData;
        this._list.percentWidth     = 50;
        this._list.percentHeight    = 100;
        this._list.labelField       = 'text_name';
        this._list.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this._toggleCurrentData, this);
        this.addElement(this._list);
    }

    private _createButtonGroup ():void {

        var group:egret.gui.Group       = new egret.gui.Group,
            buttonPlay:egret.gui.Button = new egret.gui.Button,
            buttonStop:egret.gui.Button = new egret.gui.Button;

        group.percentWidth              = 50;
        group.percentHeight             = 100;
        group.layout                    = new egret.gui.VerticalLayout;
        buttonPlay.label                = '播放';
        buttonStop.label                = '停止';
        buttonPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this._play, this);
        buttonStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this._stop, this);
        group.addElement(buttonPlay);
        group.addElement(buttonStop);
        this.addElement(group);
    }

    private _toggleCurrentData (event:egret.gui.IndexChangeEvent):void {

        this._cleanStage();
        this._currentData   = this._listData.getItemAt(event.newIndex);
        this._buildStage();
    }

    private _buildStage ():void {

        var systemData  = RES.getRes(this._currentData.resource_name);

        this._system    = split.SplitFactory.getInstance().create(this._currentGraphic, systemData);
        this._emitter   = this._system.emit({
            transform   : {alpha:0},
            fraquency   : 100,
            duration    : 100
        });
        this._system.x  = (this.stage.stageWidth - this._system.width) / 2;
        this._system.y  = (this.stage.stageHeight / 2) + (this.stage.stageHeight / 4) - (this._system.width / 2);
        this._system.showFirst();
        this._root.gameLayer.addChild(this._system);
    }

    private _play ():void {

        this._emitter.start();
    }

    private _stop ():void {

        this._emitter.stop();
    }

    private _cleanStage ():void {

        if (this._emitter) {

            this._emitter.stop();
        }

        if (this._system && this._system.parent == this._root.gameLayer) {

            this._root.gameLayer.removeChild(this._system);
        }
    }
}