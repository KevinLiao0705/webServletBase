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
        opts.gg_colorPlate = '#003';
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
        if (this.md.subType === "circle.dark") {
        }
        if (this.md.subType === "line.dark") {
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
        if (this.md.subType === "compass.dark") {
            opts.gg_minValue = 0;
            opts.gg_maxValue = 360;
            opts.gg_majorTicks = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
            opts.gg_minorTicks = 22;
            opts.gg_ticksAngle = 360;
            opts.gg_startAngle = 180;
            opts.gg_highlights = [];
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

        if (this.md.subType === "compass.light") {
            opts.gg_minValue = 0;
            opts.gg_maxValue = 360;
            opts.gg_majorTicks = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
            opts.gg_minorTicks = 22;
            opts.gg_ticksAngle = 360;
            opts.gg_startAngle = 180;
            opts.gg_highlights = [];
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

            opts.gg_colorPlate = '#fff';
            opts.gg_colorMajorTicks = '#000';
            opts.gg_colorMinorTicks = '#000';
            opts.gg_colorTitle = '#000';
            opts.gg_colorUnits = '#000';

            opts.gg_colorNeedle = 'rgba(180, 0, 0, 1)';
            opts.gg_colorNeedleEnd = 'rgba(180, 0, 0, .5)';
            opts.gg_colorNeedleShadowUp = "#400";
            opts.gg_colorNeedleShadowDown = "#400";
            opts.gg_colorNeedleCircleOuter = "#666";
            opts.gg_colorNeedleCircleOuterEnd = "#222";
            opts.gg_colorNeedleCircleInner = "#f00";
            opts.gg_colorNeedleCircleInnerEnd = "#f00";
            opts.gg_colorNumbers = '#000';


            opts.gg_colorBorderOuter = "#ccf";
            opts.gg_colorBorderOuterEnd = "#ccc";
            opts.gg_colorBorderMiddle = "#ddd";
            opts.gg_colorBorderMiddleEnd = "#444";
            opts.gg_colorBorderInner = "#fff";
            opts.gg_colorBorderInnerEnd = "#222";

        }


        if (this.md.subType === "circle.light") {
            opts.gg_colorPlate = '#fff';
            opts.gg_colorMajorTicks = '#000';
            opts.gg_colorMinorTicks = '#000';
            opts.gg_colorTitle = '#000';
            opts.gg_colorUnits = '#000';

            opts.gg_colorNeedle = 'rgba(180, 0, 0, 1)';
            opts.gg_colorNeedleEnd = 'rgba(180, 0, 0, .5)';
            opts.gg_colorNeedleShadowUp = "#400";
            opts.gg_colorNeedleShadowDown = "#400";
            opts.gg_colorNeedleCircleOuter = "#666";
            opts.gg_colorNeedleCircleOuterEnd = "#222";
            opts.gg_colorNeedleCircleInner = "#f00";
            opts.gg_colorNeedleCircleInnerEnd = "#f00";
            opts.gg_colorNumbers = '#000';


            opts.gg_colorBorderOuter = "#ccf";
            opts.gg_colorBorderOuterEnd = "#ccc";
            opts.gg_colorBorderMiddle = "#ddd";
            opts.gg_colorBorderMiddleEnd = "#444";
            opts.gg_colorBorderInner = "#fff";
            opts.gg_colorBorderInnerEnd = "#222";





        }


        if (this.md.subType === "line.light") {
            opts.gg_colorPlate = '#fff';
            opts.gg_colorMajorTicks = '#000';
            opts.gg_colorMinorTicks = '#000';
            opts.gg_colorTitle = '#000';
            opts.gg_colorUnits = '#000';

            opts.gg_colorNeedle = 'rgba(180, 0, 0, 1)';
            opts.gg_colorNeedleEnd = 'rgba(180, 0, 0, .5)';
            opts.gg_colorNeedleShadowUp = "#400";
            opts.gg_colorNeedleShadowDown = "#400";
            opts.gg_colorNeedleCircleOuter = "#666";
            opts.gg_colorNeedleCircleOuterEnd = "#222";
            opts.gg_colorNeedleCircleInner = "#f00";
            opts.gg_colorNeedleCircleInnerEnd = "#f00";
            opts.gg_colorNumbers = '#000';


            opts.gg_colorBorderOuter = "#ccf";
            opts.gg_colorBorderOuterEnd = "#ccc";
            opts.gg_colorBorderMiddle = "#ddd";
            opts.gg_colorBorderMiddleEnd = "#444";
            opts.gg_colorBorderInner = "#fff";
            opts.gg_colorBorderInnerEnd = "#222";


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



class MdbChart {
    constructor() {
        this.testTimeTh = 100;
        this.testTime = 0;
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.barType = "bar";
        opts.indexAxis = 'x';
        opts.margin = 10;
        opts.testValue_f = 1;
        opts.horizontal_f_f = 0;
        opts.title = "Title";
        opts.grid_f = 1;
        opts.chartLabels = ["label1", "label2", "label3", "label4"];
        //==============================
        opts.datasetNames = ["datasetName1"];
        opts.chartBackgroundColorAA = [["#f00", "#0f0", "#00f", "#ff0"]];
        opts.chartBorderColorAA = [["#f00", "#0f0", "#00f", "#ff0"]];
        opts.chartOpacity = 0.5;
        opts.dataAA = [[12, 45, 89, 64]];
        //==============================
        opts.chartMin = 0;
        opts.chartStep = 20;
        opts.chartMax = 100;
        opts.chartAxesFontSize = 10;
        opts.gridColor = "#ccc";
        opts.baseColor = "#fff";
        opts.titleColor = "#0f0";
        opts.xLabelColor = "#444";
        opts.yLabelColor = "#444";
        opts.legendFontSize = 12;
        opts.chartFilter = "if(inData>50) outData='#0f0';else outData='#f00';";
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType1 === "dark") {
            opts.baseColor = "#002";
            opts.titleColor = "#ddd";
            opts.gridColor = "#444";
            opts.chartLineColor = "#fff";
            opts.xLabelColor = "#ccc";
            opts.yLabelColor = "#ccc";
        }
        if (this.md.subType0 === "bar") {
        }
        if (this.md.subType0 === "line") {
            opts.barType = "line";
            opts.datasetNames = ["datasetName1", "datasetName2"];
            opts.chartBackgroundColorAA = [["#f00"], ["#0f0"]];
            opts.chartBorderColorAA = [["#f00"], ["#0f0"]];
            opts.chartOpacity = 0.5;
            opts.dataAA = [[12, 45, 60, 64], [33, 40, 79, 12]];
        }
        if (this.md.subType0 === "moutain") {
            opts.barType = "line";
            opts.fill_f = 1;
            opts.chartBackgroundColorAA = [["#0f0"]];
            opts.chartBorderColorAA = [["#0f0"]];
            opts.chartOpacity = 0.5;
        }
        if (this.md.subType0 === "doughnut") {
            opts.chartOpacity = 1;
            opts.grid_f = 0;
            opts.barType = "doughnut";
            opts.whr = 1;
        }
        if (this.md.subType0 === "pie") {
            opts.chartOpacity = 1;
            opts.grid_f = 0;
            opts.whr = 1;
            opts.barType = "pie";
        }
        if (this.md.subType0 === "polar") {
            opts.chartOpacity = 0.5;
            opts.whr = 1;
            opts.grid_f = 0;
            opts.barType = "polarArea";
        }
        if (this.md.subType0 === "radar") {
            opts.barType = "radar";
            opts.fill_f = 1;
            opts.chartLabels = ["label1", "label2", "label3", "label4", "label5", "label6"];
            opts.chartBackgroundColorAA = [["#0f0"]];
            opts.chartBorderColorAA = [["#0f0"]];
            opts.chartOpacity = 0.5;
            opts.grid_f = 0;
            opts.whr = 1;
            opts.dataAA = [[12, 45, 60, 64, 12, 11]];
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
                var chartObj = md.objs["chart"];
                var datasets = chartObj.data.datasets;
                var len = op.chartMax - op.chartMin;

                for (var i = 0; i < datasets.length; i++) {
                    for (var j = 0; j < datasets[i].data.length; j++) {
                        datasets[i].data[j] = Math.floor(Math.random() * (len)) + op.chartMin;
                    }
                }
                chartObj.update();
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

        var datasets = [];
        for (var i = 0; i < op.datasetNames.length; i++) {
            var dataSet = {};

            var chartBackgroundColors = [];
            var chartBackgroundColorA = op.chartBackgroundColorAA[i];
            for (var j = 0; j < chartBackgroundColorA.length; j++)
                chartBackgroundColors.push(KvLib.setColorRgba(chartBackgroundColorA[j], op.chartOpacity));
            var chartBorderColors = [];
            var chartBorderColorA = op.chartBorderColorAA[i];
            for (var j = 0; j < chartBorderColorA.length; j++)
                chartBorderColors.push(chartBorderColorA[j]);


            dataSet.label = op.datasetNames[i];
            dataSet.data = op.dataAA[i];
            dataSet.backgroundColor = chartBackgroundColors;
            dataSet.borderColor = chartBorderColors;
            dataSet.borderWidth = 1;
            dataSet.fill = KvLib.toBoolean(op.fill_f);
            datasets.push(dataSet);
        }
        var chartData = {
            labels: op.chartLabels,
            datasets: datasets
        };
        var scales = {
            x: {
                display: op.grid_f,
                grid: {
                    display: op.grid_f,
                    color: op.gridColor
                },

                ticks: {
                    display: op.grid_f,
                    fontSize: op.chartAxesFontSize,
                    labelOffset: 10,
                    color: op.xLabelColor,
                    maxRotation: 0
                }
            },
            y: {
                display: op.grid_f,
                grid: {
                    display: op.grid_f,
                    color: op.gridColor
                },
                ticks: {
                    display: op.grid_f,
                    beginAtZero: true,
                    color: op.yLabelColor,
                    max: op.chartMax,
                    min: op.chartMin,
                    stepSize: op.chartStep,
                    fontSize: op.chartAxesFontSize

                }
            }
        };

        var legend = {
            display: true,
            position: 'bottom', //top | bottom | left | right
            align: 'center', //start | center | end
            labels: {
                font: {
                    size: op.legnedFontSize
                }
                //color: 'blue',
                //padding: 20
            },
            title: {
                display: false,
                text: 'MyChartLegend'
                        //color: 'darkgray'
            }
            /*
             onClick: (e, legendItem, legend) => {
             // Custom logic on legend item click
             console.log('Legend item clicked:', legendItem);
             }
             * 
             */
        };


        var ctx = canvasElem.getContext('2d');
        var titleDisp_f = 0;
        if (op.title)
            titleDisp_f = 1;
        md.objs["chart"] = new Chart(ctx, {
            type: op.barType,
            data: chartData,
            options: {
                responsive: true,
                indexAxis: op.indexAxis,
                plugins: {
                    title: {
                        fontColor: op.titleColor,
                        display: titleDisp_f,
                        text: op.title
                    },
                    legend: legend
                },
                scales: scales
            }
        });


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


class PhoneBox {
    constructor() {
        this.flashTime=0;
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";
        opts.lcdLpd = 10;
        opts.lcdMargin = 20;
        opts.lcdMarginTop = 40;
        opts.lcdMarginBottom = 40;
        opts.lcdFontSize = 24;
        opts.hotlines = ["Line 1", "Line 2", "Line 3", "Line 4"];

        return opts;
    }

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;

        var sipData = {};
        sipData.sipName = "";
        sipData.sipNo = "";
        sipData.reDirection_f = 0;
        sipData.nowLine = 0;
        sipData.phoneSta = 0;  //0 no raspberryPi,1:raspberry pi ready,2:linphonec load,3:pbx registed
        sipData.lineFlag = 255;   //0:mute, 1:syssec, 2:nowLine, 3:dtmf, 4:hold, 7:reDirection
        sipData.lineSta = 2;     //0:ready, 1: ring out, 2:ring in, 3:connect, 4:hold  4bit:4bit
        sipData.handSta = 1;     //0:ready, 1: earphone, 2:epeaker  4bit:4bit
        sipData.lineNoA = ["", ""];
        sipData.lineNameA = ["", ""];
        sipData.lineMessageA = ["", ""];
        sipData.lineConnectTimeA = ["", ""];
        sipData.status = "status";
        sipData.action = "action";
        st.sipData=sipData;
        if(st.sipData.nowLine===0){
            st.line1Color="#00f";
            st.line2Color="#000";
        }
        else{
            st.line1Color="#000";
            st.line2Color="#00f";
        }
        if(st.sipData.lineFlag&0x01)
            st.muteColor="#f00";
        else
            st.muteColor="#000";
        if(st.sipData.lineFlag&0x10)
            st.holdColor="#f00";
        else
            st.holdColor="#000";
        if(st.sipData.lineFlag&0x80)
            st.reDirectColor="#f00";
        else
            st.reDirectColor="#000";
        
        
        var nowLine=(st.lineFlag>>2)&1;
        var handSta=st.sipData.handSta&3;
        if(nowLine)
            handSta=(st.sipData.handSta>>4)&3;
        if(handSta===0){
            st.earPhoneColor="#ccf";
            var setPhoneColor="#ccf";
        }    
        if(handSta===1){
            st.earPhoneColor="#ffc";
            st.setPhoneColor="#ccf";
        }    
        if(handSta===2){
            st.earPhoneColor="#ccf";
            st.setPhoneColor="#ff0";
        }    
        var lineSta=st.sipData.lineSta&7;
        if(nowLine)
            lineSta=(st.sipData.lineSta>>4)&7;
        if(++self.flashTime>60)
            self.flashTime=0;
            
        if(lineSta !== 2)
            st.ringLedCnt=0;
        else{
            if(self.flashTime>30)
                st.ringLedCnt=1;
            else
                st.ringLedCnt=0;
        }    
        
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }

    keyClick(iobj) {
        var md = iobj.kvObj.fatherMd;
        if (md.opts.actionFunc) {
            var obj = {};
            obj.act = "phoneKeyClick";
            obj.key = iobj.kvObj.opts.itemId;
            md.opts.actionFunc(obj);
        }
    }

    keyClick(iobj) {
        console.log(iobj);

    }

    build(md) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        //md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //==
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999];
        opts.xyArr = [[9999], [9999, 0]];
        opts.ym = 10;
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var excActionPrg = function (iobj) {
            console.log(iobj);
            MdaPopWin.popOff(2);
            return;

            //iobj.act = "esc";
            //KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, "語音通話", excActionPrg);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.whr = 0.75;
        opts.margin = 20;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["phoneBody"] = cname;


        var cname = lyMaps["phoneBody"] + "~" + 0;
        var opts = {};
        opts.yArr = ["0.2rh", "0.25rh", 9999, "0.1rh", "0.02rh"];
        opts.ym = 10;
        opts.xm = 10;
        opts.margin = 20;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["phoneMainBody"] = cname;

        var cname = lyMaps["phoneMainBody"] + "~" + 0;
        var opts = {};
        opts.yc = 2;
        opts.ym = 2;
        opts.margin = op.lcdMargin;
        opts.tm = op.lcdMarginTop;
        opts.bm = op.lcdMarginBottom;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["lcdLineBody"] = cname;



        var cname = lyMaps["phoneMainBody"] + "~" + 1;
        var opts = {};
        opts.xc = 6;
        opts.yc = 3;
        opts.xm = 6;
        opts.ym = 6;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["functionKeyBody"] = cname;




        var cname = lyMaps["phoneMainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [9999, "0.3rw"];
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;

        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.yc = 4;
        opts.xm = 6;
        opts.ym = 6;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["phoneKeyBody"] = cname;

        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.xc = 1;
        opts.yc = 6;
        opts.ym = 8;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["hotKeyBody"] = cname;


        var cname = lyMaps["phoneMainBody"] + "~" + 3;
        var opts = {};
        opts.xc = 3;
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["handKeyBody"] = cname;

        //==========================================================================
        var cname = lyMaps["phoneBody"] + "~" + 0;
        var opts = {};
        opts.backgroundImageUrls = ['systemResource/metal.bmp'];
        opts.backgroundImagePosition = "extend";
        opts.insideShadowBlur = "0.2rh";
        opts.borderRadius = "20px";
        opts.borderWidth = 2;
        opts.borderColor = "#ccc";
        blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.sys0", opts: opts};
        //============
        var cname = lyMaps["phoneMainBody"] + "~" + 0;
        var opts = {};
        opts.backgroundImageUrls = ['systemResource/lcd1.bmp'];
        opts.backgroundImagePosition = "extend";
        opts.insideShadowBlur = "0.2rh";
        opts.borderRadius = "10px";
        opts.borderWidth = 1;
        opts.borderColor = "#777";
        blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.sys0", opts: opts};

        var cname = lyMaps["lcdLineBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.textAlign = "left";
        opts.lpd = op.lcdLpd;
        opts.fontSize = op.lcdFontSize;
        var watchReg = "self.fatherMd.stas.sipData.status";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);

        blocks[cname] = {name: "lcdLine1", type: "Component~Cp_base~plate.none", opts: opts};
        var cname = lyMaps["lcdLineBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "";
        opts.textAlign = "left";
        opts.lpd = op.lcdLpd;
        opts.fontSize = op.lcdFontSize;
        var watchReg = "self.fatherMd.stas.sipData.action";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
        blocks[cname] = {name: "lcdLine2", type: "Component~Cp_base~plate.none", opts: opts};



        var texts = [
            "✖", '▲', "✔", "♫+", "♫-", '<i class="gf">&#xe0e0</i>'
                    , "◀", "▼︎", "▶︎︎︎", '', '<i class="gf">&#xe61c</i>', '<i class="gf">&#xf233</i>'
                    , "Ⅰ", "Ⅱ", '<i class="gf">&#xe620</i>', '<i class="gf">&#xe02b</i>', '<i class="gf">&#xe9ba</i>', '<i class="gf">&#xebba</i>'
        ];
        var ids = [
            "cancle", "up", "ok", "+", "-", "set"
                    , "left", "down", "right", "meet", "transfer", "meetInf"
                    , "line1", "line2", "hold", "mute", "reDirect", "broadInf"
        ];

        for (var i = 0; i < 18; i++) {
            var cname = lyMaps["functionKeyBody"] + "~" + i;
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = ids[i];
            if(i===12){
                var watchReg = "self.fatherMd.stas.line1Color";
                md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
            }    
            if(i===13){
                var watchReg = "self.fatherMd.stas.line2Color";
                md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
            }    
            if(i===14){
                var watchReg = "self.fatherMd.stas.holdColor";
                md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
            }    
            if(i===15){
                var watchReg = "self.fatherMd.stas.muteColor";
                md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
            }    
            if(i===16){
                var watchReg = "self.fatherMd.stas.reDirectColor";
                md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
            }    
            blocks[cname] = {name: "fnButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
        }


        var texts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
        var inx = 0;
        for (var i = 0; i < 12; i++) {
            var cname = lyMaps["phoneKeyBody"] + "~" + i;
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = texts[i];
            blocks[cname] = {name: "numButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
        }

        var texts = ["hotLine1", "hotLine2", "hotLine3", "hotLine4", "hotLine5", "hotLine6"];
        for (var i = 0; i < 6; i++) {
            var cname = lyMaps["hotKeyBody"] + "~" + i;
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = texts[i];
            ;
            blocks[cname] = {name: "hotLineButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
        }

        var texts = [];
        texts.push('<i class="gf">&#xe0b1</i>');
        texts.push('<i class="gf">&#xe61d</i>');
        texts.push('<i class="gf">&#xe050</i>');
        var ids = ['hangon', 'hangoff', 'speaker'];
        for (var i = 0; i < 3; i++) {
            var cname = lyMaps["handKeyBody"] + "~" + i;
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.actionFunc = self.keyClick;
            opts.buttonId = ids[i];
            if(i===1){
                var watchReg = "self.fatherMd.stas.earPhoneColor";
                md.setInputWatch(opts, "directReg", watchReg, "baseColor", 1);
            }    
            if(i===2){
                var watchReg = "self.fatherMd.stas.setPhoneColor";
                md.setInputWatch(opts, "directReg", watchReg, "baseColor", 1);
            }    
            blocks[cname] = {name: "handKeyButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
        }

        var cname = lyMaps["phoneMainBody"] + "~" + 4;
        var opts = {};
        opts.altColorInx = 0;
        var watchReg = "self.fatherMd.stas.ringLedCnt";
        md.setInputWatch(opts, "directReg", watchReg, "altColorInx", 1);
        blocks[cname] = {name: "ringLed", type: "Component~Cp_base~led.sys2", opts: opts};


    }
}
