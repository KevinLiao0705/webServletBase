/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class MyNewScopeCtr {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#ccc";
        opts.tunerSetInx = -1;
        opts.xm = 30;
        opts.chSelectInx = 0;
        opts.bitSelectInx = 3;

        //=========================
        opts.signalMode = 0;
        opts.signalModeInx = 0;

        opts.chNames = ["測試信號", "脈波信號 A", "脈波信號 B", "輸出功率", "反射功率", "總電流"];
        if (gr.appId === 0)
            opts.chNames = ["關閉", "測試信號", "脈波信號"];
        if (gr.appId === 1)
            opts.chNames = ["關閉", "測試信號", "脈波信號"];
        if (gr.appId === 2)
            opts.chNames = ["關閉", "測試信號", "脈波信號"];
        if (gr.appId === 3)
            opts.chNames = ["關閉", "測試信號", "脈波信號", "功率信號", "電源信號", "放大器信號"];
        if (gr.appId === 4)
            opts.chNames = ["關閉", "測試信號", "脈波信號", "功率信號", "電源信號", "放大器信號"];

        //==============
        opts.xScale = 8;
        opts.xOffset = 0;
        opts.yOffsets = [0, -50, 50, 100];
        opts.yScales = [1, 2, 3, 4];
        opts.gridDispInx = 0;

        opts.typeCnt = 0;
        opts.dispValue = 15;
        //==============
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var scope = md.fatherMd;
        st.signalButtonColors = ["#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf"];
        st.signalButtonColors[op.signalMode ] = "#cfc";
        //===========================================
        var watchDatas = st.watchDatas = ["#ccc", '<i class="gf">&#xe037</i>', "#ccc", 1, 3];
        if (scope.opts.run_f) {
            watchDatas[0] = "#ccf";
            watchDatas[1] = '<i class="gf">&#xe034</i>';
        }
        if (scope.opts.trig_f) {
            watchDatas[2] = "#ccf";
        }
        //====================================
        if (scope.opts.displayType)
            watchDatas[3] = 2;



        var value = 0;
        for (var i = 0; i < scope.opts.lines.length; i++) {
            var line = scope.opts.lines[i];
            if (line.offOn_f) {
                value += 1 << i;
            }
        }
        watchDatas[4] = value;



    }
    afterCreate() {
        this.setChAlign();
    }
    setChAlign() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        var signalAdjust = md.blockRefs["signalAdjust"];
        var scope = md.fatherMd;
        var line = scope.opts.lines[op.chSelectInx];

        var setLine = signalAdjust.blockRefs["mdaSetLine#4"];
        var setOpts = setLine.opts.setOpts;
        setOpts.enum = line.yScaleTbl;
        setOpts.value = line.yScaleSet;
        setLine.reCreate();

        var setLine = signalAdjust.blockRefs["mdaSetLine#5"];
        var setOpts = setLine.opts.setOpts;
        setOpts.value = line.offset;
        setLine.reCreate();
        return;
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
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [180, 200, 300, 9999];
        opts.tm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //=======================================

        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.title = "信號源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.33rh", "0.33rh", 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            ["0.5rw", 9999]
        ];
        //

        var adjustActionPrg = function (iobj) {
            console.log(iobj);
            var sobj = iobj.setOptsObj;
            var strA = sobj.name.split("#");
            var setInx = KvLib.toInt(strA[1], -1);
            if (iobj.act === "mouseClick") {
                var strB = iobj.kvObj.name.split("#");
                var butInx = KvLib.toInt(strB[1], -1);
                if (strA[0] === "mdaSetLine") {
                    if (setInx === 3) {//ch select
                        op.chSelectInx = sobj.opts.setOpts.value;
                        md.mdClass.setChAlign();
                        return;
                    }
                }

            }

            if (iobj.act === "blur") {
                op.tunerSetInx = setInx;
                if (op.tunerSetInx === 0) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.02;
                }
                if (op.tunerSetInx === 2) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.1;
                }
                if (op.tunerSetInx === 5) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.1;
                }
                return;
            }


            if (iobj.act === "valueChanged" || iobj.act === "pressEnter") {
                var obj = {};
                if (setInx === 0)//grid
                    obj.act = "gridValueChanged";
                if (setInx === 1) {//xScale
                    obj.act = "xScaleChanged";
                    obj.valueText = MyNewScope.xScaleTbl[iobj.preValue];
                    var preValue = MyNewScope.transXScale(obj.valueText);
                    obj.valueText = MyNewScope.xScaleTbl[iobj.value];
                    var nowValue = MyNewScope.transXScale(obj.valueText);
                    var scale = preValue / nowValue;
                    var signalAdjust = md.blockRefs["signalAdjust"];
                    var setLine = signalAdjust.blockRefs["mdaSetLine#2"];
                    var setValue = Math.round(setLine.opts.setOpts.value * scale);
                    setLine.opts.setOpts.value = setValue;
                    setLine.reCreate();
                    obj.offsetValue = setValue;
                }
                if (setInx === 2) {//
                    obj.act = "xOffsetChanged";
                }
                if (setInx === 4) {//
                    obj.act = "yScaleChanged";
                }
                if (setInx === 5) {//
                    obj.act = "yOffsetChanged";
                }
                obj.chInx = op.chSelectInx;
                obj.sender = md;
                obj.kvObj = md;
                obj.value = iobj.setOptsObj.opts.setOpts.value;
                KvLib.exe(op.actionFunc, obj);
                return;
            }
        };


        var names = op.chNames;
        var ids = ["signal", "signal1", "signal2", "signal3", "signal4", "signal5"];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.signalButtonColors";




        for (var i = 0; i < 6; i++) {
            var setOpts = sopt.getOptsPara("button");
            setOpts.enum = [names[i]];
            setOpts.enumId = [names[i]];
            setOpts.baseColor = "#008";
            setOpts.borderWidth = 0;
            setOpts.fontSize = "0.6rh";
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", regDatas + "[" + i + "]", "baseColor", 1]);
            setOptss.push(setOpts);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var setSignalPrg = function (selectText) {
                var scope = md.fatherMd;
                scope.mdClass.initLines(scope.opts);
                scope.opts.signalMode = op.signalMode;
                scope.opts.signalModeInx = op.signalModeInx;
                if (op.signalMode === 1) {
                    if (op.signalModeInx === 0) {
                        for (var i = 0; i < 4; i++) {
                            var lineObj = scope.opts.lines[i];
                            lineObj.sampleRate = 200000000;
                            lineObj.offOn_f = 1;
                            scope.opts.xScale = 8;
                            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
                        }
                    }
                    if (op.signalModeInx === 1) {
                        for (var i = 0; i < 4; i++) {
                            var lineObj = scope.opts.lines[i];
                            lineObj.yScaleTbl = MyNewScope.yScaleVoltTbl;
                            lineObj.sampleRate = 2000;
                            scope.opts.xScale = 26;
                            lineObj.yScaleSet = 3;
                            lineObj.offOn_f = 1;
                            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
                        }
                        md = md.reCreate();
                    }
                }
                if (op.signalMode === 2) {
                    for (var i = 0; i < 1; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 1000000;
                        scope.opts.xScale = 18;
                        lineObj.offOn_f = 1;
                        if (i === 0) {
                            lineObj.name = "雷達脈波";
                            lineObj.offset = -10;
                        }
                        if (i === 1) {
                            lineObj.name = "遠端脈波";
                            lineObj.offset = -20;
                        }
                        lineObj.yScaleTbl = MyNewScope.yScaleVoltTbl;
                        lineObj.yScaleSet = 10;
                        lineObj.digit_f = 1;
                    }
                    md = md.reCreate();
                }
                if (op.signalMode === 3) {
                    for (var i = 0; i < 4; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200;
                        scope.opts.xScale = 29;
                        lineObj.offOn_f = 1;
                        if (i === 0) {
                            lineObj.name = "輸入功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 0;
                            op.chSelectInx = 0;
                        }
                        if (i === 1) {
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 2;
                            lineObj.name = "驅動輸出功率";
                        }
                        if (i === 2) {
                            lineObj.name = "順向輸出功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 4;
                        }
                        if (i === 3) {
                            lineObj.name = "反向輸出功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 3;
                        }
                    }
                    md = md.reCreate();
                }
                if (op.signalMode === 4) {
                    for (var i = 0; i < 4; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200000000;
                        scope.opts.xScale = 8;
                        lineObj.offOn_f = 1;
                        if (i === 0)
                            lineObj.name = selectText + " 50V電壓";
                        if (i === 1)
                            lineObj.name = selectText + " 32V電壓";
                        if (i === 2)
                            lineObj.name = selectText + " 32V電流";
                        if (i === 3)
                            lineObj.name = selectText + " 溫度";
                    }
                }

                if (op.signalMode === 5) {
                    for (var i = 0; i < 2; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200000000;
                        scope.opts.xScale = 8;
                        lineObj.offOn_f = 1;
                        if (i === 0)
                            lineObj.name = selectText + " 射頻功率輸出";
                        if (i === 1)
                            lineObj.name = selectText + " 模組溫度";
                    }
                }




                var signalAdjust = md.blockRefs["signalAdjust"];
                var mdaSetLine = signalAdjust.blockRefs["mdaSetLine#1"];
                mdaSetLine.opts.setOpts.value = scope.opts.xScale;
                mdaSetLine.reCreate();

                var obj = {};
                obj.act = "signalChanged";
                obj.sender = md;
                obj.kvObj = md;
                KvLib.exe(op.actionFunc, obj);




            };
            var inx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], 0);
            if (inx === 0) {
                op.signalMode = 0;
                op.signalModeInx = 0;
                setSignalPrg();
                return;
            }
            var opts = {};
            opts.title = "選擇信號源";
            opts.kvTexts = [];
            opts.xc = 1;
            if (inx === 1) {
                opts.yc = 2;
                opts.h = 200;
                opts.w = 500;
                opts.kvTexts.push("測試信號 1");
                opts.kvTexts.push("測試信號 2");
            }
            if (inx === 2) {
                op.signalMode = 2;
                op.signalModeInx = 0;
                setSignalPrg();
                return;
            }
            if (inx === 3) {
                op.signalMode = 3;
                op.signalModeInx = 0;
                setSignalPrg();
                return;
            }
            if (inx === 4 || inx === 5) {
                opts.xc = 4;
                opts.yc = 10;
                opts.w = 1000;
                opts.h = 600;
                var itemInx = 0;
                for (var j = 0; j < 10; j++) {
                    for (var i = 0; i < 4; i++) {
                        if (itemInx === 2 || itemInx === 3 || itemInx === 38 || itemInx === 39) {
                            opts.kvTexts.push(null);
                        } else {
                            if (inx === 4)
                                opts.kvTexts.push("電源模組" + (j + 1) + "-" + (i + 1));
                            else
                                opts.kvTexts.push("放大器模組" + (j + 1) + "-" + (i + 1));
                        }
                        itemInx++;
                    }
                }
            }

            opts.actionFunc = function (iobj) {
                console.log(iobj);
                op.signalMode = inx;
                op.signalModeInx = iobj.selectInx;
                setSignalPrg(iobj.selectText);
                return;
            };
            box.selectBox(opts);
            return;
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#002";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "rotated") {
                if (op.tunerSetInx >= 0) {
                    var signalAdjust = md.blockRefs["signalAdjust"];
                    var setLine = signalAdjust.blockRefs["mdaSetLine#" + op.tunerSetInx];
                    setLine.opts.setOpts.value += iobj.addValue * -1;
                    if (setLine.opts.setOpts.value > setLine.opts.setOpts.max)
                        setLine.opts.setOpts.value = setLine.opts.setOpts.max;
                    if (setLine.opts.setOpts.value < setLine.opts.setOpts.min)
                        setLine.opts.setOpts.value = setLine.opts.setOpts.min;
                    var newSetLine = setLine.reCreate();
                    if (iobj.addValue !== 0) {
                        var obj = {};
                        obj.act = "valueChanged";
                        obj.setOptsObj = newSetLine;
                        adjustActionPrg(obj);
                    }
                    return;
                }
            }

        };
        blocks[cname] = {name: "tuner", type: "Model~MyNewTuner~base.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.title = "調整";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        mac.setXyArr(opts, 6);
        //==========
        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-grid-50.png";
        setOpts.max = 9;
        setOpts.min = 0;
        setOpts.value = op.gridDispInx;
        setOpts.actButtons = ["inc", "dec"];
        setOptss.push(setOpts);
        //==========
        var setOpts = sopt.getOptsPara("incEnum");
        setOpts.enum = MyNewScope.xScaleTbl;
        setOpts.max = setOpts.enum.length;
        setOpts.value = op.xScale;
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-magnifierLR-80.png";
        setOptss.push(setOpts);
        //==========
        var setOpts = sopt.getOptsPara("int");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/xlr-64.png";
        setOpts.max = 1000;
        setOpts.min = -1000;
        setOpts.value = op.xOffset;
        setOptss.push(setOpts);




        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 40;
        setOpts.title = "CH";
        setOpts.fontSize = "0.8rh";
        setOpts.value = op.chSelectInx;
        setOpts.enum = ["1", "2", "3", "4"];
        setOptss.push(setOpts);



        var setOpts = sopt.getOptsPara("incEnum");
        setOpts.enum = MyNewScope.yScaleVoltTbl;
        setOpts.max = setOpts.enum.length;
        setOpts.value = op.yScales[op.chSelectInx];
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-magnifierUD-80.png";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("int");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/yud-64.png";
        setOpts.max = 100;
        setOpts.min = -100;
        setOpts.value = op.yOffsets[op.chSelectInx];
        setOptss.push(setOpts);







        opts.actionFunc = adjustActionPrg;
        blocks[cname] = {name: "signalAdjust", type: "Model~MdaSetGroup~base.sys0", opts: opts};


        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.title = "控制";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        mac.setXyArr(opts, 3);
        opts.xyArr[0] = ["0.5rw", 9999];

        //
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "actButtonClick") {
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "mouseClick") {
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
        };

        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = [""];
        setOpts.enumId = ['runStop'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#0", "baseColor", 1]);
        watchDatas.push(["directReg", regDatas + "#1", "innerText", 1]);
        setOptss.push(setOpts);


        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = ["TRIG"];
        setOpts.enumId = ['trig'];
        setOpts.fontSize = "0.5rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#2", "baseColor", 1]);
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.enum = ['1', '2', '3', '4'];
        setOpts.enumId = ['trigCh1', 'trigCh2', 'trigCh3', 'trigCh4'];
        setOpts.value = 0;
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-rising-edge-64.png";
        setOpts.titleWidth = 0;
        //var watchDatas = setOpts.watchDatas = [];
        //var regDatas = "self.fatherMd.fatherMd.stas.watchDatas";
        //watchDatas.push(["directReg", regDatas + "#3", "setOpts.value", 1]);
        setOpts.fontSize = "0.5rh";
        setOptss.push(setOpts);

        /*
         var setOpts = sopt.getOptsPara("buttonOnOffs");
         setOpts.titleWidth = 60;
         setOpts.title = "TYPE";
         setOpts.enum = ['MAIN', 'ROLL'];
         setOpts.enumId = ['dispTypeMain', 'dispTypeRoll'];
         setOpts.value = 0;
         var watchDatas = setOpts.watchDatas = [];
         var regDatas = "self.fatherMd.fatherMd.stas.watchDatas";
         watchDatas.push(["directReg", regDatas + "#3", "setOpts.value", 1]);
         setOpts.fontSize = "0.5rh";
         setOptss.push(setOpts);
         */

        var setOpts = sopt.getOptsPara("buttonOnOffs");
        //setOpts.titleWidth = 60;
        //setOpts.title = '<i class="gf">&#xe034</i>';
        setOpts.enum = ['CH1', 'CH2', 'CH3', 'CH4'];
        setOpts.enumId = ['ch1', 'ch2', 'ch3', 'ch4'];
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#4", "setOpts.value", 1]);
        setOpts.value = 0;
        setOpts.fontSize = "fixWidth";
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-switch-80.png";
        setOpts.titleWidth = 0;
        setOptss.push(setOpts);


        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "signalCtr", type: "Model~MdaSetGroup~base.sys0", opts: opts};



        return;




    }
}

class MyNewScope {
    constructor() {



    }
    static  xScaleTbl = [
        "1 nS", "2 nS", "5 nS", "10 nS", "20 nS", "50 nS", "100 nS", "200 nS", "500 nS",
        "1 uS", "2 uS", "5 uS", "10 uS", "20 uS", "50 uS", "100 uS", "200 uS", "500 uS",
        "1 mS", "2 mS", "5 mS", "10 mS", "20 mS", "50 mS", "100 mS", "200 mS", "500 mS",
        "1 S", "2 S", "5 S", "10 S", "20 S", "50 S", "100 S"
    ];

    static yScaleVoltTbl = ["1 mV", "2 mV", "5 mV", "10 mV", "20 mV", "50 mV", "100 mV", "200 mV", "500 mV", "1 V", "2 V", "5 V", "10 V", "20 V", "50 V", "100 V"];
    static yScaleAmpTbl = ["1 mA", "2 mA", "5 mA", "10 mA", "20 mA", "50 mA", "100 mA", "200 mA", "500 mA", "1 A", "2 A", "5 A", "10 A", "20 A", "50 A", "100 A"];
    static yScaleDbTbl = ["10 DB", "20 DB", "30 DB", "40 DB", "50 DB", "60 DB"];
    static yScaleDucTbl = ["20 ℃", "40 ℃", "60 ℃", "80 ℃", "100 ℃ ", "120 ℃", "140 ℃", "160 ℃", "180 ℃", "200 ℃"];

    static transXScale(inStr) {
        var strA = inStr.split(" ");
        if (strA.length !== 2)
            return 500;
        var ii = KvLib.toInt(strA[0], null);
        if (ii === null)
            return 500;
        if (strA[1] === "nS") {
            return ii;
        }
        if (strA[1] === "uS") {
            return ii * 1000;
        }
        if (strA[1] === "mS") {
            return ii * 1000000;
        }
        if (strA[1] === "S") {
            return ii * 1000000000;
        }
        return 500;
    }

    static transYScale(op) {
        for (var i = 0; i < op.lines.length; i++) {
            var str = op.lines[i].yScaleTbl[op.lines[i].yScaleSet];
            var strA = str.split(" ");
            var yScale = 1000;
            op.lines[i].yScale = yScale;
            if (strA.length !== 2)
                continue;
            var ii = KvLib.toInt(strA[0], null);
            if (ii === null)
                continue;
            if (strA[1] === "mV" || strA[1] === "mA") {
                op.lines[i].yScale = ii;
                continue;
            }
            if (strA[1] === "V" || strA[1] === "A") {
                op.lines[i].yScale = ii * 1000;
                continue;
            } else {
                op.lines[i].yScale = ii;
            }
        }
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);

        opts.title = "OSCILLOSCOPE";
        opts.baseColor = "#222";
        opts.powerOn_f = 1;
        opts.grid_f = 1;
        opts.run_f = 1;
        opts.trig_f = 0;
        opts.trigInx = 0;
        opts.signalMode = 0;
        opts.signalCnt = 0;
        opts.displayType = 0;//main|roll

        opts.centerLine_f = 1;
        opts.axeWidth = 0.5;
        //===
        opts.mainAxeColor = "#aaa";
        opts.subAxeColorTbl = ["#000", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999"];
        opts.gridDispInx = 4;

        opts.centerLineColor = "#fff";
        //===============
        opts.xAxeOffs = 0;
        opts.xScale = 8;//unit=ns;
        //=====================
        opts.xyOffx = 30;    //total 1000    //origin point x 
        opts.xAxeLen = 940;  //total 1000    //x axile len rate    
        //=====================
        opts.xAxeGridAmt = 10;
        opts.xSubAxeGridAmt = 5;
        opts.xAxeOffsAmt = 400;
        //===============

        opts.xAxeTotalV = 500;
        opts.yAxeOffsV = -100;
        opts.yAxeTotalV = 200;


        opts.xyOffy = 30;    //total 1000    //origin point y 
        opts.yAxeLen = 940;
        opts.yAxeGridAmt = 10;
        opts.ySubAxeGridAmt = 5;
        //===============
        opts.messages = [];
        var mesObj = {};
        mesObj.x = 500;
        mesObj.y = 20;
        mesObj.text = "title";
        mesObj.color = "#0f0";
        mesObj.font = "20px monospace";
        opts.messages.push(mesObj);
        //===============
        opts.sampleUnit = "ns";
        opts.sampleAmt = 10000;
        opts.sampleBufSize = 20000;

        opts.ySubAxeGridAmt = 5;
        self.initLines(opts);
        //=======================
        return opts;
    }
    initLines(opts) {
        opts.lines = [];
        //===============
        var colorTbl = ["#f66", "#8f8", "#ff0", "#0ff"];
        for (var i = 0; i < 4; i++) {
            var lineObj = {};
            var buffer = [];
            for (var j = 0; j < opts.sampleBufSize; j++) {
                buffer.push(0);
            }
            lineObj.name = "CH" + (i + 1);
            lineObj.color = colorTbl[i];
            lineObj.offset = -40 + 20 * i;
            lineObj.offOn_f = 0;
            lineObj.digit_f = 0;
            lineObj.yScaleSet = 4;//
            lineObj.yScaleTbl = MyNewScope.yScaleVoltTbl;
            lineObj.stInx = 0;
            lineObj.recordLen = 0;
            lineObj.buffer = buffer;
            lineObj.sampleRate = 200000000;
            lineObj.lineWidth = 1.5;

            opts.lines.push(lineObj);
        }
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //==
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;
        //=======================================================
        st.wRate = st.containerWidth / 1000.0;
        st.hRate = st.containerHeight / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;
        //==
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);
        //==
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);
        //==========================================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvas";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvas = selem;
        if (!op.powerOn_f)
            return;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy1";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy1 = selem;
        //=========================================
        if (!st.canvas.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        st.ctx = st.canvas.getContext('2d');
        st.ctx1 = st.canvasLy1.getContext('2d');
        this.createScope();
        //===
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }

    chkWatch(optName) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (optName === "grid_f") {
            this.drawAxe(1);
        }
        this.frameTimer();
        gr.footBarStatus2 = ani.dispFs;
    }

    frameTimer() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!op.run_f)
            return;
        if (st.drawed_f)
            self.drawClear();
        st.drawed_f = 0;
        if (!st.phaseSpeed)
            st.phaseSpeed = 0;
        st.phaseSpeed += 2;
        if (st.phaseSpeed >= 1000)
            st.phaseSpeed -= 1000;
        gr.signalMode=op.signalMode ;
        gr.signalModeInx=op.signalModeInx ;

        if (op.signalMode === 2) {
            st.drawed_f = 1;
            var totalTime = st.xScale;
            var sampleTime = (totalTime * 10) / op.sampleAmt;

            var lineObj = op.lines[op.trigInx];
            lineObj.sampleRate = 1000000000 / sampleTime;
            lineObj.stInx = 0;
            var nowPinx = gr.pulseFormInxA[op.trigInx];
            var nextLen = gr.pulseFormAA[op.trigInx][nowPinx];
            var level = gr.pulseLevelAA[op.trigInx][nowPinx];
            var allTime = 0;
            var trigRestTime = 0;
            if (op.trig_f) {
                var pinx = gr.pulseFormInxA[op.trigInx];
                var helfTime = totalTime * 5;
                while (true) {
                    if (gr.pulseFormAA[op.trigInx][pinx] === 0)
                        break;
                    if (allTime < helfTime) {
                        allTime += gr.pulseFormAA[op.trigInx][pinx];
                        pinx--;
                        if (pinx < 0)
                            pinx = gr.pulseFormAA[op.trigInx].length - 1;
                        continue;
                    }
                    if (gr.pulseLevelAA[op.trigInx][pinx] > 0) {
                        allTime += gr.pulseFormAA[op.trigInx][pinx];
                    }
                    trigRestTime = allTime - helfTime;
                    break;
                }
            }


            for (var k = 0; k < 1; k++) {
                var lineObj = op.lines[k];
                lineObj.sampleRate = 1000000000 / sampleTime;
                lineObj.stInx = 0;

                var nowPinx = gr.pulseFormInxA[k];
                var nextLen = gr.pulseFormAA[k][nowPinx];
                var allTime = 0;
                var restTime = trigRestTime;

                pinx = gr.pulseFormInxA[k];
                while (restTime >= gr.pulseFormAA[k][pinx]) {
                    if (gr.pulseFormAA[k][pinx] === 0)
                        break;
                    restTime -= gr.pulseFormAA[k][pinx];
                    pinx--;
                    if (pinx < 0)
                        pinx = gr.pulseFormAA[k].length - 1;
                }
                nowPinx = pinx;
                nextLen = gr.pulseFormAA[k][pinx] - restTime;

                //==============================================
                var nowTime = 0;
                var len = 0;
                for (var j = op.sampleAmt - 1; j > 0; j--) {
                    if (nextLen === 0)
                        break;
                    if (len >= gr.pulseFormLenA[k])
                        break;
                    var level = gr.pulseLevelAA[k][nowPinx];
                    var inx = lineObj.stInx + j;
                    if (inx >= op.sampleBufSize)
                        inx -= op.sampleBufSize;
                    lineObj.buffer[inx] = level;
                    nowTime += sampleTime;
                    if (nowTime < nextLen)
                        continue;
                    nowTime -= nextLen;
                    nowPinx--;
                    if (nowPinx < 0)
                        nowPinx = gr.pulseFormAA[k].length - 1;
                    nextLen = gr.pulseFormAA[k][nowPinx];
                    len++;
                }
                lineObj.recordLen = op.sampleAmt;
            }

        }


        if (op.signalMode === 1) {
            for (var i = 0; i < 4; i++) {
                var lineObj = op.lines[i];
                if (!lineObj.offOn_f)
                    continue;
                st.drawed_f = 1;
                if (op.signalModeInx === 0) {
                    var angOff = Math.PI * 2 * st.phaseSpeed * (i + 2) * 4 / 1000;
                    lineObj.stInx += 1 + i;
                    if (lineObj.stInx >= op.sampleBufSize)
                        lineObj.stInx -= op.sampleBufSize;
                    for (var j = 0; j < op.sampleAmt; j++) {
                        var sin = Math.sin((Math.PI * 2 * j * (i + 1) / 2000) + angOff);
                        var inx = lineObj.stInx + j;
                        if (inx >= op.sampleBufSize)
                            inx -= op.sampleBufSize;
                        lineObj.buffer[inx] = sin * 10 * (i + 1);
                    }
                    lineObj.recordLen = op.sampleAmt;
                }
                if (op.signalModeInx === 1) {
                    if (!lineObj.sampleRest)
                        lineObj.sampleRest = 0;
                    var timef = lineObj.sampleRate / 62;
                    var timei = timef | 0;
                    lineObj.sampleRest += timef - timei;
                    if (lineObj.sampleRest >= 1) {
                        lineObj.sampleRest - 1;
                        timei++;
                    }
                    var buf = [];
                    for (var j = 0; j < timei; j++) {
                        buf.push(Math.round(10 * Math.random()-5)+10);
                    }
                    self.addLineBuf(buf, i);
                }
            }
        }

        if (op.signalMode === 3) {
            for (var i = 0; i < 4; i++) {
                var lineObj = op.lines[i];
                if (!lineObj.offOn_f)
                    continue;
                st.drawed_f = 1;
                if (op.signalModeInx === 0) {
                    if (!lineObj.sampleRest)
                        lineObj.sampleRest = 0;
                    var timef = lineObj.sampleRate / 62;
                    var timei = timef | 0;
                    lineObj.sampleRest += timef - timei;
                    if (lineObj.sampleRest >= 1) {
                        lineObj.sampleRest - 1;
                        timei++;
                    }
                    var buf = [];
                    for (var j = 0; j < timei; j++) {
                        buf.push(gr.plotValue[i]);
                    }
                    self.addLineBuf(buf, i);
                }
            }
        }




        var opts = op.lines[0];
        self.drawBufs(opts);
        var opts = op.lines[1];
        self.drawBufs(opts);
        var opts = op.lines[2];
        self.drawBufs(opts);
        var opts = op.lines[3];
        self.drawBufs(opts);
        return;

    }
    addLineBuf(buf, inx) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.drawed_f = 1;
        var lineObj = op.lines[inx];
        for (var j = 0; j < buf.length; j++) {
            if (lineObj.recordLen >= (op.sampleAmt+1)) {
                lineObj.stInx++;
                if (lineObj.stInx >= op.sampleBufSize)
                    lineObj.stInx -= op.sampleBufSize;
                var inx = lineObj.stInx + lineObj.recordLen;
            } else {
                var inx = lineObj.stInx + lineObj.recordLen;
                lineObj.recordLen++;
            }
            if (inx >= op.sampleBufSize)
                inx -= op.sampleBufSize;
            if(buf[j]===0)
                var debugV=0;
            lineObj.buffer[inx] = buf[j];
        }
    }

    createScope(editObj) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ctx = st.ctx;

        st.xScale = MyNewScope.transXScale(MyNewScope.xScaleTbl[op.xScale]);
        MyNewScope.transYScale(op);
        self.drawAxe(1);
        self.drawClear(1);
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            self.drawBufs(opts);
        }

    }

    clearScr() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearAll() {
        var st = this.md.stas;
        var ctx1 = st.ctx1;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx1.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawClear() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawBufs(opts, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.lineWidth = opts.lineWidth;
        ctx.beginPath();
        var xzero = st.xyOffx;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 100;
        //============================================
        var maxY = st.containerHeight - st.xyOffy;
        var minY = st.containerHeight - st.xyOffy - st.yAxeLen;

        st.preStInx = opts.stInx;
        st.zoomCenterInx = opts.stInx + parseInt(op.sampleAmt / 2);
        var sampleTime = 1000000000 / opts.sampleRate;
        st.zoomSize = (st.xScale * op.xAxeGridAmt / sampleTime) | 0;
        var stepLenPerSamp = st.xAxeLen / st.zoomSize;//every sample pixel length
        //=================================================
        var xOffSetTime = (-1) * st.xScale * op.xAxeGridAmt * op.xAxeOffs / op.xAxeOffsAmt;
        var xOffSetSamp = (xOffSetTime / sampleTime) | 0;
        var zoomCenterInx = st.zoomCenterInx - xOffSetSamp;
        //================================================
        var viewSize = st.zoomSize;
        var inx = zoomCenterInx - ((viewSize / 2) | 0);
        var first_f = 0;
        var xlen = 0;
        var loopLim = 1;
        var loopCnt = 0;
        var vvBuf = 0;
        if (viewSize > 2000)
            loopLim = (viewSize / 2000) | 0;
        var maxV = 0;
        var minV = 0;
        var preV = 0;
        var chgCnt = 0;
        var preLevel = 0;


        for (var i = 0; i < viewSize; i++) {
            if (inx < opts.stInx) {
                var delta = opts.stInx - inx;
                inx += delta;
                xlen += stepLenPerSamp * delta;
                if (xlen > st.xAxeLen)
                    break;
            }
            if (inx >= opts.stInx + opts.recordLen)
                break;
            if (inx >= opts.stInx + op.sampleAmt) {
                break;
            }
            /*
             loopCnt++;
             if ((opts.stInx + i) % loopLim) {
             inx++;
             xlen += stepLenPerSamp;
             if (xlen >= st.xAxeLen)
             break;
             continue;
             }
             //vv=vvBuf/loopCnt;    
             loopCnt = 0;
             //vvBuf=0;
             */

            var rinx = inx;
            for (; ; ) {
                if (rinx < 0) {
                    rinx += op.sampleBufSize;
                    continue;
                }
                if (rinx >= op.sampleBufSize) {
                    rinx -= op.sampleBufSize;
                    continue;
                }
                break;
            }


            var vv = opts.buffer[rinx];
            if (opts.digit_f) {
                if (preV !== vv)
                    chgCnt++;
                preV = vv;
                if (vv >= maxV)
                    maxV = vv;
            }

            if ((rinx % loopLim) === 0) {
                if (opts.digit_f) {
                    if (chgCnt !== 0) {
                        if (preLevel == 0)
                            vv = maxV
                        else
                            vv = 0;
                        preLevel = vv;
                    }
                    chgCnt = 0;
                    maxV = 0;
                    minV = 0;
                }
                var ylen = vv * yGridLen / opts.yScale;
                if(vv===0)
                    var tt=0;

                var realY = ycen - ylen - yOffset;
                if (realY > maxY)
                    realY = maxY;
                if (realY < minY)
                    realY = minY;
                if (xlen >= 0) {
                    if (!first_f)
                        ctx.moveTo(xzero + xlen, realY);
                    else
                        ctx.lineTo(xzero + xlen, realY);
                    first_f = 1;
                }

            }
            inx++;
            xlen += stepLenPerSamp;
            if (xlen > st.xAxeLen)
                break;
        }
        ctx.stroke();
        return;
    }

    drawAxe(clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx;
        if (clr) {
            st.axe_drawed_f = 0;
            st.gripOn_f = 0;
            st.xAxe_drawed_f = 0;
            st.yAxe_drawed_f = 0;
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);

        }

        if (st.axe_drawed_f)
            return;
        st.axe_drawed_f = 1;


        op.messages = [];
        var mesObj = {};

        var xOffset = (-1) * (st.xScale * 10) * op.xAxeOffs / op.xAxeOffsAmt;
        var unit = "ns";
        var value = xOffset * -1;


        var mstr = "";
        if (value < 0) {
            value *= -1;
            mstr = "-";
        }


        if (value >= 1000) {
            unit = "us";
            value = value / 1000;
            if (value >= 1000) {
                unit = "ms";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "s";
                    value = value / 1000;
                }
            }
        }
        if (value < 10)
            var vStr = value.toFixed(2);
        else if (value < 100)
            var vStr = value.toFixed(1);
        else
            var vStr = value.toFixed(0);
        mesObj.x = st.xyOffx + st.xAxeLen / 2;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
        mesObj.text = mstr + vStr + " " + unit;
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        var mesObj = {};
        var unit = "ns";
        var value = st.xScale;
        if (value >= 1000) {
            unit = "us";
            value = value / 1000;
            if (value >= 1000) {
                unit = "ms";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "s";
                    value = value / 1000;
                }
            }
        }
        if (value < 10)
            var vStr = value.toFixed(2);
        else if (value < 100)
            var vStr = value.toFixed(1);
        else
            var vStr = value.toFixed(0);
        mesObj.x = st.xyOffx + st.xAxeLen * 6 / 10;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
        mesObj.text = vStr + " " + unit + "/";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);


        x = st.xyOffx;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            if (!opts.offOn_f)
                continue
            var mesObj = {};
            var vStr = op.lines[i].yScaleTbl[opts.yScaleSet];
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
            mesObj.text = (i + 1) + ":" + vStr + "/";
            mesObj.color = opts.color;
            mesObj.font = "12px sans-serif";
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 20;
        }



        x = st.xyOffx;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            if (!opts.offOn_f)
                continue
            var mesObj = {};
            var vStr = opts.name;
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy + 16;
            mesObj.text = (i + 1) + ":" + vStr;
            mesObj.color = opts.color;
            mesObj.font = "14px sans-serif";
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 30;
        }







        if (op.messages) {
            for (var i = 0; i < op.messages.length; i++) {
                var mesObj = op.messages[i];
                ctx.fillStyle = mesObj.color;
                ctx.font = mesObj.font;
                ctx.fillText(mesObj.text, mesObj.x, mesObj.y);
            }
        }

        ctx.strokeStyle = op.subAxeColorTbl[op.gridDispInx ];

        //===============================
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;

        var xSubAmt = op.xAxeGridAmt * op.xSubAxeGridAmt;
        var ySubAmt = op.yAxeGridAmt * op.ySubAxeGridAmt;

        var xadd = st.xAxeLen / xSubAmt;
        var yadd = st.yAxeLen / ySubAmt;
        if (op.grid_f) {
            for (var i = 0; i < ySubAmt + 1; i++) {
                ctx.moveTo(x, y - i * yadd);
                ctx.lineTo(x + st.xAxeLen, y - i * yadd);
            }
            for (var i = 0; i < xSubAmt + 1; i++) {
                ctx.moveTo(x + xadd * i, y);
                ctx.lineTo(x + xadd * i, y - st.yAxeLen);
            }



        }
        ctx.stroke();
        //===============================


        ctx.strokeStyle = op.mainAxeColor;
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var xadd = st.xAxeLen / op.xAxeGridAmt;
        var yadd = st.yAxeLen / op.yAxeGridAmt;
        for (var i = 0; i < op.xAxeGridAmt + 1; i++) {
            ctx.moveTo(x + xadd * i, y);
            ctx.lineTo(x + xadd * i, y - st.yAxeLen);
        }
        for (var i = 0; i < op.yAxeGridAmt + 1; i++) {
            ctx.moveTo(x, y - i * yadd);
            ctx.lineTo(x + st.xAxeLen, y - i * yadd);
        }
        ctx.stroke();
        //===============================
        if (op.centerLine_f) {
            ctx.strokeStyle = op.centerLineColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = st.containerHeight - st.xyOffy;
            var xadd = st.xAxeLen / 2;
            var yadd = st.yAxeLen / 2;
            ctx.moveTo(x + xadd * 1, y);
            ctx.lineTo(x + xadd * 1, y - st.yAxeLen);
            ctx.moveTo(x, y - 1 * yadd);
            ctx.lineTo(x + st.xAxeLen, y - 1 * yadd);
            ctx.stroke();
        }
        //===============================
        for (var i = 0; i < 4; i++) {
            if (op.lines[i].offOn_f) {
                var fontSize = 12;
                ctx.font = "" + fontSize + "px monospace";
                ctx.fillStyle = op.lines[i].color;
                var str = (i + 1) + "\u27a4";
                var size = ctx.measureText(str);
                var offset = op.lines[i].offset;
                if (offset > 50)
                    offset = 50;
                if (offset < -50)
                    offset = -50;
                ctx.fillText(str, x - size.width - 2, y - st.yAxeLen / 2 + fontSize / 2 - 2 - offset * st.yAxeLen / 100);
            }
        }

        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#ccc";
        var str = "▼";
        var x = -3 + st.xyOffx + st.xAxeLen / 2;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);

        var xoff = st.xAxeLen * xOffset / (st.xScale * 10);

        xoff += st.xAxeLen * 5 / 10;
        if (xoff < 0)
            xoff = 0;
        if (xoff > st.xAxeLen)
            xoff = st.xAxeLen;
        var fontSize = 12;
        ctx.font = "" + fontSize + "px monospace";
        ctx.fillStyle = "#fff";
        var str = "▼";
        var x = -3 + st.xyOffx + xoff;
        var y = st.containerHeight - st.xyOffy - st.yAxeLen + 7;
        ctx.fillText(str, x, y);



        return;









    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        st.xScale = MyNewScope.transXScale(MyNewScope.xScaleTbl[op.xScale]);
        MyNewScope.transYScale(op);
        gr.wavePageObj = md;
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 200];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["upBody"] = cname;

        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [9999, 300];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;

        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};

        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#222";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "signalChanged") {
                self.createScope();
                return;
            }
            if (iobj.act === "gridValueChanged") {
                op.gridDispInx = iobj.value;
                self.drawAxe(1);
                return;
            }
            if (iobj.act === "xScaleChanged") {
                op.xScale = iobj.value;
                op.xAxeOffs = iobj.offsetValue;
                self.createScope();
                return;
            }
            if (iobj.act === "xOffsetChanged") {
                op.xAxeOffs = iobj.value;
                self.createScope();
                return;
            }
            if (iobj.act === "yScaleChanged") {
                op.lines[iobj.chInx].yScaleSet = iobj.value;
                self.createScope();
                return;
            }
            if (iobj.act === "yOffsetChanged") {
                op.lines[iobj.chInx].offset = iobj.value;
                self.createScope();
                return;
            }


            if (iobj.act === "actButtonClick") {
                if (iobj.buttonId === "runStop") {
                    md.opts.run_f ^= 1;
                    return;
                }
                if (iobj.buttonId === "trig") {
                    md.opts.trig_f ^= 1;
                    return;
                }
            }
            if (iobj.act === "mouseClick") {
                if (iobj.buttonId === "dispTypeMain") {
                    md.opts.displayType = 0;
                    return;
                }
                if (iobj.buttonId === "dispTypeRoll") {
                    md.opts.displayType = 1;
                    return;
                }
                if (iobj.buttonId.includes("trigCh")) {
                    md.opts.trigInx = iobj.buttonInx;
                    return;
                }
                if (iobj.buttonId === "ch1") {
                    if (iobj.setOptsObj.opts.setOpts.value & 1)
                        op.lines[0].offOn_f = 1;
                    else
                        op.lines[0].offOn_f = 0;
                    self.drawAxe(1);
                    return;
                }
                if (iobj.buttonId === "ch2") {
                    if (iobj.setOptsObj.opts.setOpts.value & 2)
                        op.lines[1].offOn_f = 1;
                    else
                        op.lines[1].offOn_f = 0;
                    self.drawAxe(1);
                    return;
                }
                if (iobj.buttonId === "ch3") {
                    if (iobj.setOptsObj.opts.setOpts.value & 4)
                        op.lines[2].offOn_f = 1;
                    else
                        op.lines[2].offOn_f = 0;
                    self.drawAxe(1);
                    return;
                }
                if (iobj.buttonId === "ch4") {
                    if (iobj.setOptsObj.opts.setOpts.value & 8)
                        op.lines[3].offOn_f = 1;
                    else
                        op.lines[3].offOn_f = 0;
                    self.drawAxe(1);
                    return;
                }

            }
        };
        //=========================
        opts.signalMode = 0;
        opts.chNames = op.chNames;
        //==============
        opts.xScale = op.xScale;
        opts.yOffsets = [0, -50, 50, 100];

        opts.xOffset = op.xAxeOffs;


        //
        opts.yScales = [];
        opts.yOffsets = [];
        for (var i = 0; i < op.lines.length; i++) {
            opts.yScales.push(op.lines[i].yScaleSet);
            opts.yOffsets.push(op.lines[i].offset);
        }
        opts.gridDispInx = op.gridDispInx;
        opts.run_f = op.run_f;
        opts.typeCnt = 0;
        opts.trig_f = 0;
        opts.trigInx = 0;
        opts.dispValue = 15;


        blocks[cname] = {name: "scopeCtr", type: "Model~MyNewScopeCtr~base.sys0", opts: opts};


        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);
        var cname = lyMaps["mainBody"] + "~" + 2;
        mac.setFootBar(md, cname);


    }
}

class MyNewTuner {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#002";
        opts.xm = 30;
        opts.addAngleMul = 10;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //=======================================================
        st.nowAngle = 0;
        st.preAngle = 0;

        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;

        //==========================================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvas";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        var canvas = st.canvas = selem;
        canvas.style.pointerEvents = "none";
        st.ctx = canvas.getContext('2d');
        st.img = new Image();
        st.img.src = "systemResource/knob.png";
        st.img.onload = function () {
            var img = st.img;
            st.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, st.containerWidth, st.containerHeight);
            st.imageLoaded_f = 1;
        };


        var knobPressFunc = function (event) {
            var xx = event.offsetX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - event.offsetY;
            var rr = st.containerWidth / 2;
            var dd2 = xx * xx + yy * yy;
            if (dd2 > (rr * rr))
                return;
            if (dd2 < (10 * 10))
                return;
            md.stas.actionOn_f = 1;
            var checkMouseUpFunc = function () {
                if (gr.mouseDown_f) {
                    setTimeout(checkMouseUpFunc, 100);
                    return;
                }
                md.stas.actionOn_f = 0;
            };
            setTimeout(checkMouseUpFunc, 100, md);
            var ang = KvLib.atan(xx, yy);
            md.stas.preAngle = ang;
            md.stas.addTmp = 0;
            if (md.stas.rotateAng) {
                ang = ang - st.rotateAng;
                if (ang < 0)
                    ang += 360;
            }
            md.stas.nowAngle = ang;
            //console.log("" + xx + "," + yy + "," + ang);
        };
        var knobUpFunc = function (event) {
            md.stas.actionOn_f = 0;
        };
        var knobMoveFunc = function (event) {
            if (!md.stas.actionOn_f)
                return;
            if (!gr.mouseDown_f)
                return;
            var xx = event.offsetX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - event.offsetY;
            var dd2 = xx * xx + yy * yy;
            if (dd2 < (10 * 10))
                return;
            var ang = KvLib.atan(xx, yy);
            //console.log("" + xx + "," + yy + "," + ang);
            var addAngle = ang - md.stas.preAngle;
            md.stas.preAngle = ang;
            if (addAngle > 180)
                addAngle = addAngle - 360;
            if (addAngle < -180)
                addAngle = 360 + addAngle;
            md.stas.addTmp += (addAngle) * op.addAngleMul;
            var intTmp = 0;
            if (md.stas.addTmp >= 1 || md.stas.addTmp <= 1) {
                intTmp = md.stas.addTmp | 0;
                md.stas.addValue = intTmp;
                md.stas.addTmp -= intTmp;
            }
            if (intTmp) {
                var obj = {};
                obj.act = "addValue";
                obj.value = 0 - intTmp;
                obj.sender = md;
                KvLib.exe(op.actionFunc, iobj);
            }
            var rotateAng = ang - md.stas.nowAngle;
            md.stas.rotateAng = rotateAng;
            //self.stas.nowAngle = ang;
            KvLib.drawRotated(rotateAng, st.canvas, st.ctx, st.img, "ccw");
            var obj = {};
            obj.act = "rotated";
            if (rotateAng < 0)
                rotateAng += 360;
            obj.angle = rotateAng | 0;
            obj.addValue = md.stas.addValue;
            KvLib.exe(op.actionFunc, obj);


        };
        plotElem.addEventListener("mousedown", knobPressFunc);
        plotElem.addEventListener("mouseup", knobUpFunc);
        plotElem.addEventListener("mousemove", knobMoveFunc);



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
        md.setPns(opts);
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
        opts.whr = 1;
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};
        return;
    }
}
