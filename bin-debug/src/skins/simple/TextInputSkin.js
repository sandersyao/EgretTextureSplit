var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TextInputSkin = (function (_super) {
            __extends(TextInputSkin, _super);
            function TextInputSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [30, 100]);
                this.elementsContent = [this.__3_i(), this.textDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("textDisplay", "textColor", 0xAAAAAA)
                    ])
                ];
            }
            Object.defineProperty(TextInputSkin.prototype, "skinParts", {
                get: function () {
                    return TextInputSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            TextInputSkin.prototype.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "textbox_png", 100]);
                return t;
            };
            TextInputSkin.prototype.textDisplay_i = function () {
                var t = new egret.gui.EditableText();
                this.textDisplay = t;
                this.__s(t, ["bottom", "percentHeight", "left", "right", "size", "textColor", "top", "percentWidth"], [8, 100, 10, 10, 20, 0x000000, 8, 100]);
                return t;
            };
            TextInputSkin._skinParts = ["textDisplay"];
            return TextInputSkin;
        })(egret.gui.Skin);
        simple.TextInputSkin = TextInputSkin;
        TextInputSkin.prototype.__class__ = "skins.simple.TextInputSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
