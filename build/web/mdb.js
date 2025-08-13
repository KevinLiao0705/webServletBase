/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Mdb {
    constructor() {
        this.MdaMenu = "Class";
        this.MdaList = "Class";
        this.MdaListItem = "Class";
        this.MdaContainer = "Class";
        this.MdaScroll = "Class";
        this.MdaPopWin = "Class";
        this.MdaBase = "Class";
        this.MdaBox = "Class";
        this.MdaSelector = "Class";
        this.MdaArray = "Class";
        this.MdaSetLine = "Class";
        this.MdaPad = "Class";
    }

}


class MdbGauge {
    constructor() {
        this.testTimeTh = 100;
        this.testTime = 0;
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);



        opts.baseColor = "#002";
        opts.margin = 10;
        opts.testValue_f = 1;
        opts.gaugeValue = 0;
        opts.whr = 1;


        opts.gg_linear_f = 0;

        opts.gaugeOffset = 10;
        opts.gg_minValue = 0;
        opts.gg_maxValue = 220;
        opts.gg_colorPlate = '#004';
        opts.gg_barWidth = 8;


        opts.gg_animationRule = 'linear';
        //dsc.gg_animationRule.enum = ["linear", "quad", "dequad", "quint", "dequint", "cycle", "decycle", "bounce", "debounce", "elastic", "delastic"];
        opts.gg_animationDuration = 500;
        opts.gg_animatedValue_f = 0;
        opts.gg_animationTarget = "needle";//plate/needle
        opts.gg_colorBarProgress = "rgba(50,200,50,.75)";
        //=======================================


        /*
         opts["group~Ticks"] = [0, "gg_majorTicks", "gg_minorTicks", "gg_colorMajorTicks", "gg_needleEnd", "gg_colorMinorTicks"
         , "gg_colorMinorTicks", "gg_highlights", "gg_ticksAngle", "gg_startAngle"
         ];
         */
        opts.gg_majorTicks = ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'];
        opts.gg_minorTicks = 2;
        opts.gg_colorMajorTicks = '#f5f5f5';
        opts.gg_colorMinorTicks = '#ddd';
        opts.gg_highlights = [
            {from: 0, to: 50, color: "rgba(0,255,0,.15)"},
            {from: 50, to: 100, color: "rgba(255,255,0,.15)"},
            {from: 100, to: 150, color: "rgba(255,30,0,.25)"},
            {from: 150, to: 200, color: "rgba(255,0,225,.25)"},
            {from: 200, to: 220, color: "rgba(0,0,255,.25)"}
        ];
        opts.gg_ticksAngle = 225;
        opts.gg_startAngle = 67.5;
        //=======================================
        /*
         opts["group~Needle"] = [0, "gg_needleType", "gg_needleWidth", "gg_needleStart", "gg_needleEnd", "gg_colorNeedle"
         , "gg_colorNeedleEnd", "gg_colorNeedleShadowUp", "gg_colorNeedleShadowDown", "gg_needleCircleSize", "gg_needleCircleOuter_f"
         , "gg_needleCircleInner_f", "gg_colorNeedleCircleOuter", "gg_colorNeedleCircleOuterEnd", "gg_colorNeedleCircleInner"
         , "gg_colorNeedleCircleInnerEnd"
         ];
         */
        opts.gg_needleType = "arrow";
        //dsc.gg_needleType.enum = ["arrow", "line"];
        opts.gg_needleWidth = 2;
        opts.gg_needleStart = 20;
        opts.gg_needleEnd = 99;
        opts.gg_colorNeedle = 'rgba(240, 128, 128, 1)';
        opts.gg_colorNeedleEnd = 'rgba(255, 160, 122, .9)';
        opts.gg_colorNeedleShadowUp = "#ccc";
        opts.gg_colorNeedleShadowDown = "#333";
        opts.gg_needleCircleSize = 7;
        opts.gg_needleCircleOuter_f = 1;//boolean
        opts.gg_needleCircleInner_f = 1;
        opts.gg_colorNeedleCircleOuter = "#888";
        opts.gg_colorNeedleCircleOuterEnd = "#777";
        opts.gg_colorNeedleCircleInner = "#f00";
        opts.gg_colorNeedleCircleInnerEnd = "#f00";
        //=======================================
        /*
         opts["group~BarGauge"] = [0, "gg_gaugeWidth", "gg_gaugeHeight", "gg_tickSide"
         , "gg_numberSide", "gg_needleSide", "gg_barBeginCircle_f"
         ];
         */

        opts.gg_gaugeWidth = 1;
        opts.gg_gaugeHeight = 1;
        opts.gg_tickSide = "both";//"both","left","right";
        opts.gg_numberSide = "left";//"left","right"
        opts.gg_needleSide = "left";//"left","right"
        opts.gg_barBeginCircle_f = 1;
        //=======================================
        /*
         opts["group~Border"] = [0, "gg_borders_f", "gg_borderShadowWidth", "gg_colorBorderOuter", "gg_colorBorderOuterEnd", "gg_colorBorderMiddle"
         , "gg_colorBorderMiddleEnd", "gg_colorBorderInner", "gg_colorBorderInnerEnd", "gg_borderInnerWidth", "gg_borderMiddleWidth"
         , "gg_borderOuterWidth"
         ];
         */
        opts.gg_borders_f = 1;
        opts.gg_borderShadowWidth = 0;
        opts.gg_colorBorderOuter = "#ccf";
        opts.gg_colorBorderOuterEnd = "#ccc";
        opts.gg_colorBorderMiddle = "#008";
        opts.gg_colorBorderMiddleEnd = "#444";
        opts.gg_colorBorderInner = "#004";
        opts.gg_colorBorderInnerEnd = "#222";
        opts.gg_borderInnerWidth = 4;
        opts.gg_borderMiddleWidth = 4;
        opts.gg_borderOuterWidth = 1;
        //=======================================
        /*
         opts["group~ValueBox"] = [0, "gg_valueBox_f", "gg_valueBoxBorderRadius", "gg_colorBorderOuter", "gg_valueTextShadow_f", "gg_valueInt"
         , "gg_valueDec", "gg_colorValueBoxRect", "gg_colorValueBoxRectEnd", "gg_colorValueBoxBackground", "gg_colorValueText"
         , "gg_colorValueTextShadow", "gg_colorValueBoxShadow", "gg_fontValue", "gg_fontValueStyle", "gg_fontValueSize"
         ];
         * 
         */
        opts.gg_valueBox_f = 1;
        opts.gg_valueBoxBorderRadius = 0;//float
        opts.gg_valueTextShadow_f = 1;
        opts.gg_valueInt = 1;
        opts.gg_valueDec = 0;
        opts.gg_colorValueBoxRect = "#222";
        opts.gg_colorValueBoxRectEnd = "#333";
        opts.gg_colorValueBoxBackground = "#fff";
        opts.gg_colorValueText = "#000";
        opts.gg_colorValueBoxShadow = null;
        opts.gg_colorValueTextShadow = null;
        opts.gg_fontValue = "Verdana";
        opts.gg_fontValueStyle = 'italic';
        opts.gg_fontValueSize = 30;
        //============================
        /*
         opts["group~Numbers"] = [0, "gg_fontNumbers", "gg_fontNumbersStyle", "gg_fontNumbersWeight", "gg_fontNumbersSize"
         , "gg_colorNumbers"
         ];
         *  
         */
        opts.gg_fontNumbers = "Verdana";
        opts.gg_fontNumbersStyle = 'italic';
        opts.gg_fontNumbersWeight = 'bold';
        opts.gg_fontNumbersSize = 16;
        opts.gg_colorNumbers = '#eee';
        //============================
        /*
         opts["group~Title&Unit"] = [0, "gg_title", "gg_fontTitle", "gg_fontTitleSize", "gg_colorTitle"
         , "gg_units", "gg_fontUnits", "gg_fontUnitsSize", "gg_colorUnits"
         ];
         * 
         */
        opts.gg_title = 'Speed';
        opts.gg_fontTitle = "Verdana";
        opts.gg_fontTitleSize = 24;
        opts.gg_colorTitle = '#fff';
        opts.gg_units = 'Km/h';
        opts.gg_fontUnits = "Verdana";
        opts.gg_fontUnitsSize = 22;
        opts.gg_colorUnits = '#ccc';
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "circle.sys0") {
        }
        if (this.md.subType === "line.sys0") {
            opts.gg_linear_f = 1;
            opts.whr = 0.4;
            opts.gg_animationRule = 'bounce';
            opts.gg_majorTicks = ['-60', '-40', '-20', '0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'];
            opts.gg_needleWidth = 6;
            opts.gg_title = "Temperatur";
            opts.gg_fontTitleSize = 24;
            opts.gg_fontNumbersSize = 24;
            opts.gg_fontValueSize = 34;
            opts.gg_fontUnitsSize = 24;
            opts.gg_units = '°C';
            opts.gg_minValue = -60;

        }
        if (this.md.subType === "compass.sys0") {
            opts.gg_minValue = 0;
            opts.gg_maxValue = 360;
            opts.gg_majorTicks = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
            opts.gg_minorTicks = 22;
            opts.gg_ticksAngle = 360;
            opts.gg_startAngle = 180;
            opts.gg_highlights = [];
            //opts.gg_colorPlate = "#33a";
            opts.gg_colorMajorTicks = "#f5f5f5";
            opts.gg_colorMinorTicks = "#ddd";
            opts.gg_colorNumbers = "#ccc";
            opts.gg_colorNeedle = "rgba(240, 128, 128, 1)";
            opts.gg_colorNeedleEnd = "rgba(255, 160, 122, .9)";
            opts.gg_valueBox_f = 0;
            opts.gg_valueTextShadow_f = 0;
            opts.gg_colorNeedleCircleOuter = "#ccc";
            opts.gg_needleCircleSize = 0;
            opts.gg_needleCircleOuter_f = 0;
            opts.gg_animationRule = "linear";
            opts.gg_needleType = "line";
            opts.gg_needleStart = 75;
            opts.gg_needleEnd = 99;
            opts.gg_needleWidth = 3;
            opts.gg_colorBorderOuter = "#ccf";
            opts.gg_colorBorderOuterEnd = "#ccc";
            opts.gg_animationTarget = "plate";
            //gg_animationTarget: "needle";
            opts.gg_units = "";
            opts.gg_title = "DIRECTION";
            opts.gg_fontTitleSize = 19;
            opts.gg_colorTitle = "#f5f5f5";
            opts.gg_animationDuration = 1500;
        }

        if (this.md.subType === "test.sys0") {
            opts.gg_needleType = "";
            opts.gg_needleCircleOuter_f = 0;
            opts.gg_needleWidth = 0;
        }

    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        if (op.testValue_f) {
            this.testTime++;
            if (this.testTime >= this.testTimeTh) {
                this.testTime = 0;
                md.objs["guage"].value = Math.floor(Math.random() * 220);
            }
        }
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //=======================================================
        var canvasObj = md.blockRefs["canvas"];
        var canvasElem = canvasObj.elems["canvas"];


        var gaugeWidth = canvasObj.stas.cw;
        var gaugeHeight = canvasObj.stas.ch;
        var id = canvasElem.id;
        var opts = {

            renderTo: canvasElem.id,
            width: gaugeWidth,
            height: gaugeHeight,
            value: op.gaugeValue,
            units: op.gg_units,
            title: op.gg_title, //false
            minValue: op.gg_minValue,
            maxValue: op.gg_maxValue,
            majorTicks: op.gg_majorTicks,
            minorTicks: op.gg_minorTicks,
            ticksAngle: op.gg_ticksAngle,
            startAngle: op.gg_startAngle,
            strokeTicks: true,
            highlights: op.gg_highlights,
            colorPlate: op.gg_colorPlate,
            colorMajorTicks: op.gg_colorMajorTicks,
            colorMinorTicks: op.gg_colorMinorTicks,
            colorTitle: op.gg_colorTitle,
            colorUnits: op.gg_colorUnits,
            colorNumbers: op.gg_colorNumbers,
            colorNeedle: op.gg_colorNeedle,
            colorNeedleEnd: op.gg_colorNeedleEnd,
            valueBox: op.gg_valueBox_f,
            valueTextShadow: op.gg_valueTextShadow_f,
            colorValueBoxRect: op.gg_colorValueBoxRect,
            colorValueBoxRectEnd: op.gg_colorValueBoxRectEnd,
            colorValueBoxBackground: op.gg_colorValueBoxBackground,
            animationRule: op.gg_animationRule,
            //=============================
            borderShadowWidth: op.gg_borderShadowWidth,
            borders: op.gg_borders_f,
            needleType: op.gg_needleType,
            needleWidth: op.gg_needleWidth,
            needleStart: op.gg_needleStart,
            needleEnd: op.gg_needleEnd,

            needleCircleSize: op.gg_needleCircleSize,
            needleCircleOuter: op.gg_needleCircleOuter_f,
            needleCircleInner: op.gg_needleCircleInner_f,
            colorBorderOuter: op.gg_colorBorderOuter,
            colorBorderOuterEnd: op.gg_colorBorderOuterEnd,
            colorBorderMiddle: op.gg_colorBorderMiddle,
            colorBorderMiddleEnd: op.gg_colorBorderMiddleEnd,
            colorBorderInner: op.gg_colorBorderInner,
            colorBorderInnerEnd: op.gg_colorBorderInnerEnd,
            colorNeedleShadowDown: op.gg_colorNeedleShadowDown,
            colorNeedleCircleOuter: op.gg_colorNeedleCircleOuter,
            colorNeedleCircleOuterEnd: op.gg_colorNeedleCircleOuterEnd,
            colorNeedleCircleInner: op.gg_colorNeedleCircleInner,
            colorNeedleCircleInnerEnd: op.gg_colorNeedleCircleInnerEnd,
            valueBoxBorderRadius: op.gg_valueBoxBorderRadius,

            //=============================
            valueInt: op.gg_valueInt,
            valueDec: op.gg_valueDec,
            colorValueText: op.gg_colorValueText,
            colorValueBoxShadow: op.gg_colorValueBoxShadow,
            colorValueTextShadow: op.gg_colorValueTextShadow,
            colorNeedleShadowUp: op.gg_colorNeedleShadowUp,
            borderInnerWidth: op.gg_borderInnerWidth,
            borderMiddleWidth: op.gg_borderMiddleWidth,
            borderOuterWidth: op.gg_borderOuterWidth,
            fontNumbers: op.gg_fontNumbers,
            fontTitle: op.gg_fontTitle,
            fontUnits: op.gg_fontUnits,
            fontValue: op.gg_fontValue,
            fontValueStyle: op.gg_fontValueStyle,
            fontNumbersSize: op.gg_fontNumbersSize,
            fontNumbersStyle: op.gg_fontNumbersStyle,
            fontNumbersWeight: op.gg_fontNumbersWeight,
            fontTitleSize: op.gg_fontTitleSize,
            fontUnitsSize: op.gg_fontUnitsSize,
            fontValueSize: op.gg_fontValueSize,
            animatedValue: op.gg_animatedValue_f,
            animationTarget: op.gg_animationTarget,
            //=============================
            barWidth: op.gg_barWidth,
            colorBarProgress: op.gg_colorBarProgress,
            animationDuration: op.gg_animationDuration
        };

        if (op.gg_linear_f)
            md.objs["guage"] = new LinearGauge(opts);
        else
            md.objs["guage"] = new RadialGauge(opts);
        md.objs["guage"].draw();


        //===============
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.baseColor = op.baseColor;
        opts.whr = op.whr;
        opts.margin = op.margin;
        blocks[cname] = {name: "canvas", type: "Component~Cp_base~canvas.sys0", opts: opts};
        return;
    }
}
