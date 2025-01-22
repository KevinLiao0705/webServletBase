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
        opts.tunerSetInx=-1;
        opts.xm = 30;
        opts.chSelectInx = 0;
        opts.bitSelectInx = 3;
        opts.xScaleTbl = [
            "1 nS", "2 nS", "5 nS", "10 nS", "20 nS", "50 nS", "100 nS", "200 nS", "500 nS",
            "1 uS", "2 uS", "5 uS", "10 uS", "20 uS", "50 uS", "100 uS", "200 uS", "500 uS",
            "1 mS", "2 mS", "5 mS", "10 mS", "20 mS", "50 mS", "100 mS", "200 mS", "500 mS", "1 S"
        ];

        //=========================
        opts.signalCnt = 1;
        opts.chNames = ["測試信號", "脈波信號 A", "脈波信號 B", "輸出功率", "反射功率", "總電流"];
        //==============
        opts.xScale = 3;
        opts.xOffset = 0;
        opts.yOffsets = [0, -50, 50, 100];
        opts.yScales = [1, 2, 3, 4];
        opts.yScaleTbl = ["1 mV", "2 mV", "5 mV", "10 mV", "20 mV", "50 mV", "100 mV", "200 mV", "500 mV", "1 V", "2 V", "5 V", "10 V"];
        //
        opts.gridDispInx = 0;

        opts.run_f = 1;
        opts.typeCnt = 0;
        opts.trig_f = 0;
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
        st.signalButtonColors = ["#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf"];
        if (op.signalCnt) {
            st.signalButtonColors[op.signalCnt - 1] = "#cfc";
        }
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
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
                    op.chSelectInx = sobj.opts.setOpts.value;
                    var signalAdjust = md.blockRefs["signalAdjust"];
                    if (setInx === 3) {//ch select
                        var setLine = signalAdjust.blockRefs["mdaSetLine#4"];
                        var setOpts = setLine.opts.setOpts;
                        setOpts.enum = op.yScaleTbl;
                        setOpts.value = op.yScales[op.chSelectInx];
                        setLine.reCreate();

                        var setLine = signalAdjust.blockRefs["mdaSetLine#5"];
                        var setOpts = setLine.opts.setOpts;
                        setOpts.value = op.yOffsets[op.chSelectInx];
                        setLine.reCreate();


                        return;
                    }
                }

            }
            
            if (iobj.act === "blur") {
                op.tunerSetInx=setInx;
                if(op.tunerSetInx===0){
                    var tuner=md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.02;
                }
                return;
            }
            
            
            if (iobj.act === "valueChanged" || iobj.act === "pressEnter") {
                var obj = {};
                if (setInx === 0)//grid
                    obj.act = "gridValueChanged";
                if (setInx === 1) {//xScale
                    obj.act = "xScaleChanged";
                    obj.valueText = op.xScaleTbl[iobj.setOptsObj.opts.setOpts.value];
                }
                if (setInx === 2) {//
                    obj.act = "xOffsetChanged";
                }
                if (setInx === 4) {//
                    obj.act = "yScaleChanged";
                    obj.valueText = op.yScaleTbl[iobj.setOptsObj.opts.setOpts.value];
                }
                if (setInx === 5) {//
                    obj.act = "yOffsetChanged";
                    obj.valueText = op.yScaleTbl[iobj.setOptsObj.opts.setOpts.value];
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
            var inx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], 0);
            inx++;
            if (op.signalCnt === inx)
                op.signalCnt = 0;
            else
                op.signalCnt = inx;
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#006";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if(iobj.act==="rotated"){
                if(op.tunerSetInx>=0){
                    var signalAdjust=md.blockRefs["signalAdjust"];                    
                    var setLine=signalAdjust.blockRefs["mdaSetLine#"+op.tunerSetInx];                    
                    setLine.opts.setOpts.value+=iobj.addValue*-1;
                    if(setLine.opts.setOpts.value>setLine.opts.setOpts.max)
                        setLine.opts.setOpts.value=setLine.opts.setOpts.max;
                    if(setLine.opts.setOpts.value<setLine.opts.setOpts.min)
                        setLine.opts.setOpts.value=setLine.opts.setOpts.min;
                    var newSetLine=setLine.reCreate();
                    if(iobj.addValue!==0){
                        var obj={};
                        obj.act="valueChanged";
                        obj.setOptsObj=newSetLine;
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
        //

        var setOpts = sopt.getOptsPara("nature");
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-grid-50.png";
        setOpts.max = 9;
        setOpts.min = 0;
        setOpts.value = op.gridDispInx;
        setOpts.actButtons = ["inc", "dec"];
        setOptss.push(setOpts);


        var setOpts = sopt.getOptsPara("incEnum");
        setOpts.enum = op.xScaleTbl;
        setOpts.max = setOpts.enum.length;
        setOpts.value = op.xScale;
        setOpts.iconWidth = 40;
        setOpts.image = "systemResource/icons8-magnifierLR-80.png";
        setOptss.push(setOpts);


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
        setOpts.enum = op.yScaleTbl;
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
        mac.setXyArr(opts, 4);
        //
        var actionPrg = function (iobj) {
            console.log(iobj);
            KvLib.exe(op.actionFunc, iobj);
        };

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title = "RUN";
        setOpts.enum = ['<i class="gf">&#xe034</i>', '<i class="gf">&#xe037</i>'];
        setOpts.enumId = ['pause', 'run'];
        setOpts.selectColor = "#cfc";
        setOpts.value = op.run_f;
        setOpts.fontSize = "0.9rh";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title = "TRIG";
        setOpts.enum = ['OFF', 'ON'];
        setOpts.selectColor = "#cfc";
        setOpts.value = op.trig_f;
        setOpts.fontSize = "0.7rh";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.titleWidth = 60;
        setOpts.title = "TYPE";
        setOpts.enum = ['MAIN', 'ROLL'];
        setOpts.selectColor = "#cfc";
        setOpts.value = op.typeCnt;
        setOpts.fontSize = "0.7rh";
        setOptss.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonOnOffs");
        setOpts.titleWidth = 60;
        setOpts.title = "DISP";
        setOpts.enum = ['CH1', 'CH2', 'CH3', 'CH4'];
        setOpts.enumId = ['ch1', 'ch2', 'ch3', 'ch4'];
        setOpts.selectColor = "#cfc";
        setOpts.value = op.dispValue;
        setOpts.fontSize = "0.6rh";
        setOptss.push(setOpts);


        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "signalCtr", type: "Model~MdaSetGroup~base.sys0", opts: opts};



        return;




    }
}

class MyNewScope {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);

        opts.title = "OSCILLOSCOPE";
        opts.baseColor = "#222";
        opts.bufferSize = 2000;
        opts.powerOn_f = 1;
        opts.grid_f = 1;
        opts.run_f = 1;
        opts.testSinWave_f = 1;
        opts.centerLine_f = 1;
        opts.axeWidth = 0.5;
        //===
        opts.mainAxeColor = "#aaa";
        opts.subAxeColorTbl = ["#000", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999"];
        opts.gridDispInx = 4;

        opts.centerLineColor = "#fff";
        //===============
        opts.xAxeOffs = 0;
        opts.xScaleTbl = [
            "1 nS", "2 nS", "5 nS", "10 nS", "20 nS", "50 nS", "100 nS", "200 nS", "500 nS",
            "1 uS", "2 uS", "5 uS", "10 uS", "20 uS", "50 uS", "100 uS", "200 uS", "500 uS",
            "1 mS", "2 mS", "5 mS", "10 mS", "20 mS", "50 mS", "100 mS", "200 mS", "500 mS", "1 S"
        ];
        opts.xScale = 8;//unit=ns;
        opts.xyOffx = 10;    //total 1000    //origin point x 
        opts.xAxeLen = 980;  //total 1000    //x axile len rate    
        opts.xAxeGridAmt = 10;
        opts.xSubAxeGridAmt = 5;
        //===============
        opts.yScaleTbl = ["1 mV", "2 mV", "5 mV", "10 mV", "20 mV", "50 mV", "100 mV", "200 mV", "500 mV", "1 V", "2 V", "5 V", "10 V"];

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
        opts.sampleAmt = 1000;
        opts.sampleSize = 2000;
        opts.ySubAxeGridAmt = 5;
        opts.lines = [];
        opts.bufs = [0, 0, 0, 0];
        //===============
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 50);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH1";
        lineObj.color = "#f00";
        lineObj.offset = 0;//1=main grid len 
        lineObj.yScaleSet = 4;//
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 75);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH2";
        lineObj.color = "#0f0";
        lineObj.offset = 10;//1=main grid len 
        lineObj.yScaleSet = 4;//
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 25);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH3";
        lineObj.color = "#ff0";
        lineObj.offset = -10;//1=main grid len 
        lineObj.yScaleSet = 4;//
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        var lineObj = {};
        var buffer = [];
        for (var i = 0; i < opts.sampleSize; i++) {
            var sin = Math.sin(Math.PI * 2 * i / 100);
            buffer.push(sin * 12);
        }
        lineObj.offOn_f = 1;
        lineObj.name = "CH4";
        lineObj.color = "#0ff";
        lineObj.offset = 20;//1=main grid len 
        lineObj.yScaleSet = 4;//
        lineObj.stInx = 0;
        lineObj.buffer = buffer;
        opts.lines.push(lineObj);
        //=======================
        return opts;
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
        self.drawClear();
        if (!op.testSinWave_f) {
            var opts = op.lines[0];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[1];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[2];
            self.drawBufs(opts, op.bufs[0]);
            var opts = op.lines[3];
            self.drawBufs(opts, op.bufs[0]);
            return;
        }

        //=========================================
        var opts = op.lines[0];
        opts.stInx += 1;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[1];
        opts.stInx += 2;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[2];
        opts.stInx += 3;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================
        var opts = op.lines[3];
        opts.stInx += 4;
        if (opts.stInx >= 2000)
            opts.stInx -= 2000;
        self.drawLine(opts);
        //=========================================

    }

    createScope(editObj) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ctx = st.ctx;
        self.drawAxe(1);
        self.drawClear();
        if (op.testSinWave_f) {
            for (var i = 0; i < op.lines.length; i++) {
                var opts = op.lines[i];
                self.drawLine(opts);
            }
        } else {
            for (var i = 0; i < op.bufs.length; i++) {
                var opts = op.lines[i];
                self.drawBufs(opts, op.bufs[i]);
            }
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

    drawLine(opts, clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var xzero = st.xyOffx;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 100;
        //============================================
        var maxY = st.containerHeight - st.xyOffy;
        var minY = st.containerHeight - st.xyOffy - st.yAxeLen;
        if (!st.sampleTime)
            st.sampleTime = st.xScale * op.xAxeGridAmt / op.sampleAmt;
        var stepLen = st.xAxeLen * st.sampleTime / (st.xScale * 10);
        //=================================================
        var first_f = 0;
        var timev = 0;
        var halfSamples = parseInt(op.sampleAmt / 2) + 1;
        var first_f = 0;
        var xOffset = (st.xScale * 10) * op.xAxeOffs / 100;
        //================================================
        var offx = st.xAxeLen * xOffset / (st.xScale * 10);
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.yScale;
            var realY = ycen + ylen - yOffset;
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
            inx++;
            if (inx >= op.sampleSize)
                inx -= op.sampleSize;
            xlen += stepLen;
            if (xlen > st.xAxeLen)
                break;
        }

        var first_f = 0;
        var xlen = st.xAxeLen / 2 + offx;
        var inx = opts.stInx - halfSamples - 1;
        if (inx < 0)
            inx += op.sampleSize;
        for (var i = 0; i < halfSamples; i++) {
            var vv = opts.buffer[inx];
            var ylen = vv * yGridLen / opts.yScale;
            var realY = ycen + ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;


            if (xlen <= st.xAxeLen) {
                if (!first_f)
                    ctx.moveTo(xzero + xlen, realY);
                else
                    ctx.lineTo(xzero + xlen, realY);
                first_f = 1;
            }

            inx--;
            if (inx < 0)
                inx += op.sampleSize;
            xlen -= stepLen;
            if (xlen < 0)
                break;
        }
        ctx.stroke();
        return;
    }

    drawBufs(opts, bufObj, clr) {
        return;
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx1;
        var vrate = st.yAxeStrokePeriod / op.yAxePeriodV;
        if (clr)
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        if (!opts.offOn_f)
            return;
        ctx.strokeStyle = opts.color;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var inx;

        var maxLen = parseInt(op.xAxeTotalV / st.xScale);
        if (bufObj.bufLen < maxLen)
            var backLen = bufObj.bufLen;
        else
            var backLen = maxLen;

        for (var i = 0; i < bufObj.bufLen; i++) {

            if ((i * st.xScale) >= op.xAxeTotalV)
                break;
            var inxSt = bufObj.bufEnd - backLen;
            if (inxSt < 0)
                inxSt += bufObj.bufMax;
            inx = inxSt + i;
            if (inx >= bufObj.bufMax)
                inx -= bufObj.bufMax;
            var vv = bufObj.buffer[inx][bufObj.bufName];
            vv -= opts.offset;
            vv *= opts.yScale;
            if (vv < op.yAxeOffsV)
                vv = op.yAxeOffsV;
            if (vv > op.yAxeTotalV + op.yAxeOffsV)
                vv = op.yAxeTotalV + op.yAxeOffsV;
            var vlen = vv - op.yAxeOffsV;
            var xv = i * st.xScale;

            var xOffset = (st.xScale * 10) * op.xAxeOffs / 100;
            if (xv > (op.xAxeTotalV + xOffset))
                break;
            if (i === 0)
                ctx.moveTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
            else
                ctx.lineTo(x + xv * st.xPixelDivUnit, y - vlen * st.yPixelDivUnit);
        }
        ctx.stroke();
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

        var xOffset = (st.xScale * 10) * op.xAxeOffs / 100;
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
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
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
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
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
            var vStr = op.yScaleTbl[opts.yScaleSet];
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen;
            mesObj.text = (i + 1) + ":" + vStr + "/";
            mesObj.color = opts.color;
            mesObj.font = "12px sans-serif";
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 20;
        }






        if (op.messages) {
            for (var i = 0; i < op.messages.length; i++) {
                var mesObj = op.messages[i];
                ctx.fillStyle = mesObj.color;
                ctx.font = mesObj.font;
                ctx.fillText(mesObj.text, mesObj.x, mesObj.y * st.hRate);
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
    transXScale() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var str = op.xScaleTbl[op.xScale];
        var strA = str.split(" ");
        st.xScale = 500;
        if (strA.length !== 2)
            return;
        var ii = KvLib.toInt(strA[0], null);
        if (ii === null)
            return;
        if (strA[1] === "nS") {
            st.xScale = ii;
            return;
        }
        if (strA[1] === "uS") {
            st.xScale = ii * 1000;
            return;
        }
        if (strA[1] === "mS") {
            st.xScale = ii * 1000000;
            return;
        }
        if (strA[1] === "S") {
            st.xScale = ii * 1000000000;
            return;
        }
    }

    transYScale() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        for (var i = 0; i < op.lines.length; i++) {
            var str = op.yScaleTbl[op.lines[i].yScaleSet];
            var strA = str.split(" ");
            var yScale = 1000;
            op.lines[i].yScale = yScale;
            if (strA.length !== 2)
                continue;
            var ii = KvLib.toInt(strA[0], null);
            if (ii === null)
                continue;
            ;
            if (strA[1] === "mV") {
                op.lines[i].yScale = ii;
                continue;
            }
            if (strA[1] === "V") {
                op.lines[i].yScale = ii * 1000;
                continue;
            }
        }
    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        self.transXScale();
        self.transYScale();
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
            if (iobj.act === "gridValueChanged") {
                op.gridDispInx = iobj.value;
                self.drawAxe(1);
                return;
            }
            if (iobj.act === "xScaleChanged") {
                op.xScale = iobj.value;
                self.transXScale();
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
                self.transYScale();
                self.createScope();
                return;
            }
            if (iobj.act === "yOffsetChanged") {
                op.lines[iobj.chInx].offset = iobj.value;
                self.transYScale();
                self.createScope();
                return;
            }


            if (iobj.act === "mouseClick") {
                if (iobj.buttonId === "run") {
                    md.opts.run_f = 1;
                    return;
                }
                if (iobj.buttonId === "pause") {
                    md.opts.run_f = 0;
                    return;
                }
                if (iobj.buttonId === "ch1") {
                    if (iobj.setOptsObj.opts.setOpts.value & 1)
                        op.lines[0].offOn_f = 1;
                    else
                        op.lines[0].offOn_f = 0;
                    return;
                }
                if (iobj.buttonId === "ch2") {
                    if (iobj.setOptsObj.opts.setOpts.value & 2)
                        op.lines[1].offOn_f = 1;
                    else
                        op.lines[1].offOn_f = 0;
                    return;
                }
                if (iobj.buttonId === "ch3") {
                    if (iobj.setOptsObj.opts.setOpts.value & 4)
                        op.lines[2].offOn_f = 1;
                    else
                        op.lines[2].offOn_f = 0;
                    return;
                }
                if (iobj.buttonId === "ch4") {
                    if (iobj.setOptsObj.opts.setOpts.value & 8)
                        op.lines[3].offOn_f = 1;
                    else
                        op.lines[3].offOn_f = 0;
                    return;
                }

            }
        };
        //=========================
        opts.signalCnt = 1;
        opts.chNames = ["測試信號", "脈波信號 A", "脈波信號 B", "輸出功率", "反射功率", "總電流"];
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
        opts.yScaleTbl = op.yScaleTbl;
        //
        opts.gridDispInx = op.gridDispInx;

        opts.run_f = op.run_f;
        opts.typeCnt = 0;
        opts.trig_f = 0;
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
        opts.baseColor = "#222";
        opts.xm = 30;
        opts.signalCnt = 3;
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
