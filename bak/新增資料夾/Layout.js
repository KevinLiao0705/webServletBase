/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global KvLib, gr */

class Layout {
    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.kid = KvLib.genKid();
        this.paras = this.initParas();
        this.opts = this.initOpts();
        this.stas = {};
        KvLib.coverObject(this.paras, _paras);
        KvLib.deepCoverObject(this.opts, _opts);
        // gr.kidMap.set(this.kid, this);
    }

    initParas() {
        var obj = {};
        obj.editColor = "#888";
        obj.mode = "normal";
        return obj;
    }
    initOpts() {
        var obj = {};
        obj.type = "array";
        obj.xc = 1;
        obj.yc = 1;
        obj.wAlign = "center";
        obj.hAlign = "top";
        obj.lm = null;
        obj.tm = null;
        obj.rm = null;
        obj.bm = null;
        obj.xm = 0;
        obj.ym = 0;
        obj.iw = 0;
        obj.ih = 0;
        obj.margin = 0;
        obj.whr = 0;
        obj.xmO = {};
        obj.ymO = {};
        obj.iwO = {};
        obj.ihO = {};
        obj.maxIw = 0;
        obj.maxIh = 0;
        obj.color = gr.baseColor;
        obj.borderWidth = 0;
        obj.borderColor = "#000";
        obj.overflowX = "hidden";
        obj.overflowY = "hidden";
        obj.rootIw = null;
        obj.rootIh = null;
        obj.disEdit_f = 0;
        obj.actionFunc = null;
        //==========================
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        if (this.baseType === "xxxx") {
           if (this.subType === "XX") {
                return;
            }
            return;
        }
        return obj;
    }

    setMargin(_margin) {
        this.opts.margin = _margin;
    }

    addLy(name, opts) {
        var strA = name.split("~");
        if (strA.length < 2)
            return;
        if (strA[0] !== "c")
            return;
        var strB = [];
        for (var i = 1; i < strA.length; i++) {
            strB.push(strA[i]);
        }
        var lyObj = this;
        var objName = "lyObj";
        for (var i = 0; i < strB.length; i++) {
            objName += ".sonLys" + ".c" + strB[i];
        }
        var name = "";
        for (var i = 0; i < strB.length; i++) {
            name += "~" + strB[i];
        }
        var obj = new Layout(lyObj.name + name, lyObj.type, opts, lyObj.paras);
        obj.model = this.model;
        obj.rootLayout = this.rootLayout;
        eval(objName + "=obj;");
        this.sonLys["c" + name] = obj;
    }

    transData() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        st.lyRects = [];
        var margin = KvLib.transUnit(op.margin);
        st.lm = margin;
        st.tm = margin;
        st.rm = margin;
        st.bm = margin;
        if (op.tm !== null)
            st.tm = KvLib.transUnit(op.tm);
        if (op.rm !== null)
            st.rm = KvLib.transUnit(op.rm);
        if (op.bm !== null)
            st.bm = KvLib.transUnit(op.bm);
        if (op.lm !== null)
            st.lm = KvLib.transUnit(op.lm);
        st.xm = KvLib.transUnit(op.xm);
        st.ym = KvLib.transUnit(op.ym);
        st.iw = KvLib.transUnit(op.iw);
        st.ih = KvLib.transUnit(op.ih);
        //=
        st.xmO = {};
        var xmOkeys = Object.keys(op.xmO);
        for (var i = 0; i < xmOkeys.length; i++) {
            st.xmO[xmOkeys[i]] = KvLib.transUnit(op.xmO[xmOkeys[i]]);
        }

        st.ymO = {};
        var ymOkeys = Object.keys(op.ymO);
        for (var i = 0; i < ymOkeys.length; i++) {
            st.ymO[ymOkeys[i]] = KvLib.transUnit(op.ymO[ymOkeys[i]]);
        }

        st.iwO = {};
        var iwOkeys = Object.keys(op.iwO);
        for (var i = 0; i < iwOkeys.length; i++) {
            st.iwO[iwOkeys[i]] = KvLib.transUnit(op.iwO[iwOkeys[i]], 0, st.fw, st.fh);
        }
        st.ihO = {};
        var ihOkeys = Object.keys(op.ihO);
        for (var i = 0; i < ihOkeys.length; i++) {
            st.ihO[ihOkeys[i]] = KvLib.transUnit(op.ihO[ihOkeys[i]], 0, st.fw, st.fh);
        }

    }

    grid(fhid, x, y, fw, fh) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        st.fhid = fhid;
        st.lyRects = [];
        var yst = st.yst;
        var xst = st.xst;
        var fwb = st.fw;
        var fhb = st.fh;
        if (x !== undefined)
            xst = x;
        if (y !== undefined)
            yst = y;
        if (fw !== undefined)
            fwb = fw;
        if (fh !== undefined)
            fhb = fh;


        var tmb = st.tm;
        var rmb = st.rm;
        var bmb = st.bm;
        var lmb = st.lm;
        var ihb = st.ih;
        var iwb = st.iw;
        var xmb = st.xm;
        var ymb = st.ym;
        //var fwb = st.fw;
        //var fhb = st.fh;
        var xc = op.xc;
        var yc = op.yc;

        var yend = 0;
        var xend = 0;
        var y = 0;
        var x = 0;
        var k = 0;
        var yf = 0.0;
        var ihbuf, iwbuf;
        var m = 0;
        var xrf = 0.0;
        var yrf = 0.0;
        var xmax;
        var ymax;
        var wr = 0;
        var hr;

        if (op.whr) {
            var ww = (op.whr * fhb);
            var hh = (fwb / op.whr);
            if (ww > fwb) {
                ww = fwb;
            } else {
                hh = fhb;
            }
            yst = (((fhb - hh) / 2)) + yst;
            xst = (((fwb - ww) / 2)) + xst;
            fhb = hh;
            fwb = ww;
        }
        //================================




        xrf = 0;
        var allXm = lmb + rmb + (xc - 1) * xmb;
        var xmOkeys = Object.keys(op.xmO);
        for (var i = 0; i < xmOkeys.length; i++) {
            allXm += op.xmO[xmOkeys[i]];
        }

        //=====================================
        var iwOkeys = Object.keys(st.iwO);
        var restIw = fwb - allXm;
        if (iwOkeys.length === 14)
            var xxx = 1;
        for (var i = 0; i < iwOkeys.length; i++) {
            if (st.iwO[iwOkeys[i]] === 9999)
                continue;
            restIw -= st.iwO[iwOkeys[i]];
        }
        for (var i = 0; i < iwOkeys.length; i++) {
            if (st.iwO[iwOkeys[i]] === 9999)
                st.iwO[iwOkeys[i]] = restIw;
        }
        //=====================================
        extend = 0;
        if (iwb === 0)
        {
            extend = 1;
            iwb = (fwb - allXm) / xc;
            //wr = (fwb - lmb - rmb - allXm) % xc;
            //xrf = wr / xc;
            if (op.maxIw) {
                if (iwb > op.maxIw) {
                    iwb = op.maxIw;
                    extend = 0;
                }
            }
        }
        if (!extend)
        {
            if (op.wAlign === "center")
            {
                var spare = fwb - iwb * xc - allXm;
                lmb += spare / 2;
                rmb += spare / 2;
            }
            if (op.wAlign === "right")
            {
                var spare = fwb - iwb * xc - allXm;
                lmb += spare;
            }
            if (op.wAlign === "left")
            {
                var spare = fwb - iwb * xc - allXm;
                rmb += spare;
            }


        }
        xrf = 0;//xxx
        yrf = 0;
        var allYm = tmb + bmb + (yc - 1) * ymb;
        var ymOkeys = Object.keys(op.ymO);
        for (var i = 0; i < ymOkeys.length; i++) {
            allYm += op.ymO[ymOkeys[i]];
        }
        //=====================================
        var ihOkeys = Object.keys(st.ihO);
        var restIh = fhb - allYm;
        for (var i = 0; i < ihOkeys.length; i++) {
            if (st.ihO[ihOkeys[i]] === 9999)
                continue;
            restIh -= st.ihO[ihOkeys[i]];
        }
        for (var i = 0; i < ihOkeys.length; i++) {
            if (st.ihO[ihOkeys[i]] === 9999)
                st.ihO[ihOkeys[i]] = restIh;
        }
        //=====================================


        var extend = 0;
        if (ihb === 0)
        {
            extend = 1;
            ihb = (fhb - allYm) / yc;
            if (op.maxIh) {
                if (ihb > op.maxIh) {
                    ihb = op.maxIh;
                    extend = 0;
                }
            }
        }
        if (!extend)
        {
            var spare = fhb - ihb * yc - allYm;
            if (op.hAlign === "center")
            {
                tmb += spare / 2;
                bmb += spare / 2;
            }
            if (op.hAlign === "top")
            {
                bmb += spare;
            }
            if (op.hAlign === "bottom")
            {
                tmb = spare;
            }

        }
        yrf = 0;//xxx
        //================================
        yend = 0;
        y = yst + tmb;
        k = 0;
        yf = yrf;

        var inx = -1;
        if (op.type === "array") {
            yend = 0;
            y = yst + tmb;
            k = 0;
            yf = 0.0;
            for (var i = 0; i < op.yc; i++)
            {
                var n = 0;
                var xf = xrf;
                if (yf >= 1)
                {
                    yf -= 1;
                    n = 1;
                }
                /*
                 if (i === (op.yc - 1)) {
                 if (yf >= 0.001)
                 n += 1;
                 }
                 */

                x = xst + lmb;
                xend = 0;
                ihbuf = ihb;
                if (st.ihO["c" + i] || st.ihO["c" + i] === 0) {
                    ihbuf = st.ihO["c" + i];
                }

                for (var j = 0; j < op.xc; j++)
                {
                    inx++;
                    m = 0;
                    if (xf >= 0.999)
                    {
                        xf -= 1;
                        m = 1;
                    }
                    if (j === (op.xc - 1)) {
                        if (xf >= 0.001)
                            m += 1;
                    }

                    iwbuf = iwb;
                    if (st.iwO["c" + j] || st.iwO["c" + j] === 0) {
                        iwbuf = st.iwO["c" + j];
                    }
                    //console.log(self.paras.layout.opts.userLy);
                    var style = "auto";
                    var xb = x;
                    var yb = y;
                    var wb = iwbuf + m;
                    var hb = ihbuf + n;
                    var zb = 0;
                    if (op.zIndex)
                        zb = op.zIndex;
                    //=============
                    var strA = (self.name + "~" + inx).split("~");
                    var name = "c";
                    for (var ii = 1; ii < strA.length; ii++) {
                        name += "~" + strA[ii];
                    }


                    if (self.fatherMd.opts.userRects) {
                        var userLy = self.fatherMd.opts.userRects;
                        var keys = Object.keys(userLy);
                        if (userLy[name]) {
                            var rootId = self.fatherMd.stas.rootId;
                            var rootElem = document.getElementById(rootId);
                            var fwbb = KvLib.transUnit(rootElem.style.width);
                            var fhbb = KvLib.transUnit(rootElem.style.height);


                            xb = KvLib.transUnit(userLy[name].x, 0, fwbb, fhbb);
                            yb = KvLib.transUnit(userLy[name].y, 0, fwbb, fhbb);
                            wb = KvLib.transUnit(userLy[name].w, 0, fwbb, fhbb);
                            hb = KvLib.transUnit(userLy[name].h, 0, fwbb, fhbb);
                            zb = userLy[name].z;
                            style = "user";
                        }
                    }



                    var rectObj = {x: xb, y: yb, w: wb, h: hb, z: zb, style: style, name: name};
                    st.lyRects.push(rectObj);
                    //self.fatherMd.layZinxMap.set(name, 0);

                    xend = x + iwbuf;
                    x += (xmb + iwbuf + m);
                    if (op.xmO["c" + j])
                        x += op.xmO["c" + j];
                    xf += xrf;
                    k++;
                }
                yend = y + ihbuf;
                y += (ymb + ihbuf + n);
                if (op.ymO["c" + i])
                    y += op.ymO["c" + i];
                yf += yrf;
                if (xend > xmax)
                    xmax = xend;

            }


        }


    }

    editMouseClick(event) {
        var elem = event.target;
        var fhid = elem.kvd.fhid;
        var lyObj = elem.kvd.layout;
        var rectName = elem.kvd.lyRect.name;
        var userRects = elem.kvd.model.opts.userRects;
        var layouts = elem.kvd.model.layouts;
        var op = lyObj.opts;
        var max = 0;
        var min = 0;
        elem.style.cursor = "pointer";

        console.log(event);

        var strA = rectName.split("~");
        var str = "";
        for (var i = 0; i < strA.length - 1; i++) {
            if (i !== 0)
                str += "~";
            str += strA[i];
        }
        var nly = lyObj.stas.lyRects[parseInt(strA[strA.length - 1])];
        var nowz = nly.z;



        var strA = lyObj.name.split("~");
        var str = "";
        for (var i = 0; i < strA.length - 1; i++) {
            if (i !== 0)
                str += "~";
            str += strA[i];
        }
        var fly = layouts[str];
        var felemId = fly.stas.lyRects[parseInt(strA[strA.length - 1])].elemId;
        var felem = document.getElementById(felemId);



        if (!gr.layoutEditElem) {
            if (fly.name !== "c") {
                if (event.shiftKey)
                    elem = felem;
            }
            elem.style.background = "radial-gradient(circle at center,green,black)";
            elem.style.zIndex = "" + (nowz + 1);
            gr.layoutEditElem = elem;
            return;
        }
        if (gr.layoutEditElem.id !== elem.id) {
            if (fly.name !== "c") {
                if (event.shiftKey)
                    elem = felem;
            }
            gr.layoutEditElem.style.background = "radial-gradient(circle at center,blue,black)";
            elem.style.background = "radial-gradient(circle at center,green,black)";
            elem.style.zIndex = "" + (nowz + 1);
            var kvd = elem.kvd;
            gr.layoutEditElem = elem;
            return;
        }

        gr.message = "";

        var callFunc = 0
        if (lyObj.fatherMd.paras.act === "insertObj")
            callFunc = 1;
        if (lyObj.fatherMd.paras.act === "editObj")
            callFunc = 1;
        if (lyObj.fatherMd.paras.act === "deleteObj")
            callFunc = 1;
        if (lyObj.fatherMd.paras.act === "removeLayout")
            callFunc = 1;
        if (lyObj.fatherMd.paras.act === "insertLayout")
            callFunc = 1;
        if (lyObj.fatherMd.paras.act === "editLy")
            callFunc = 1;
        if (callFunc)
        {
            if (lyObj.fatherMd.paras.actionFunc) {
                lyObj.fatherMd.paras.actionFunc(event);
            }
            return;
        }


        for (var key in layouts) {
            if (key === "c") {
                var baseRect = layouts[key].stas.lyRects[0];
                var baseElemId = layouts[key].stas.lyRects[0].elemId;
            }
            var lay = layouts[key];
            var sysRects = lay.stas.lyRects;
            var rectName = elem.kvd.lyRect.name;
            for (var i = 0; i < sysRects.length; i++) {
                var rect = sysRects[i];
                if (userRects[rect.name])
                    rect = userRects[rect.name];
                if (rect.name === rectName)
                    continue;
                if (rect.z < min)
                    min = rect.z;
                if (rect.z > max)
                    max = rect.z;
            }
        }
        max++;
        min--;

        var saveElemData = function () {
            gr.mouseAct.act = lyObj.fatherMd.paras.act;
            gr.mouseAct.mouseDownX = event.clientX;
            gr.mouseAct.mouseDownY = event.clientY;
            gr.mouseAct.elemLeft = KvLib.transUnit(elem.style.left, 0);
            gr.mouseAct.elemTop = KvLib.transUnit(elem.style.top, 0);
            gr.mouseAct.elemWidth = KvLib.transUnit(elem.style.width, 0);
            gr.mouseAct.elemHeight = KvLib.transUnit(elem.style.height, 0);
            gr.mouseAct.elemZIndex = elem.style.zIndex;
            gr.mouseAct.moveX = 0;
            gr.mouseAct.moveY = 0;
            gr.mouseAct.elem = elem;
        };

        if (rectName === "c~0")
            return;

        var zinx = null;
        if (lyObj.fatherMd.paras.act === "moveFront")
            var zinx = max;
        if (lyObj.fatherMd.paras.act === "moveRear")
            var zinx = min - 1;
        if (zinx !== null) {
            elem.style.zIndex = "" + zinx;
            var userRects = elem.kvd.model.opts.userRects;
            var rectName = elem.kvd.lyRect.name;
            userRects[rectName] = {};
            var rectObj = userRects[rectName];
            rectObj.x = KvLib.transUnit(elem.style.left, 0);
            rectObj.y = KvLib.transUnit(elem.style.top, 0);
            rectObj.w = KvLib.transUnit(elem.style.width, 0);
            rectObj.h = KvLib.transUnit(elem.style.height, 0);
            rectObj.z = parseInt(elem.style.zIndex);
            rectObj.fh = elem.kvd.felem.clientHeight;
            rectObj.fw = elem.kvd.felem.clientWidth;
            if (lyObj.fatherMd.paras.act === "moveRear") {
                if (baseRect) {
                    var rectObj = userRects["c~0"] = {};
                    rectObj.x = baseRect.x;
                    rectObj.y = baseRect.y;
                    rectObj.w = baseRect.w;
                    rectObj.h = baseRect.h;
                    rectObj.z = min - 2;
                    rectObj.fh = baseRect.fh;
                    rectObj.fw = baseRect.fw;
                    var baseElem = document.getElementById(baseElemId);
                    baseElem.style.zIndex = "" + rectObj.z;


                }
            }
            if (lyObj.fatherMd.paras.actionFunc)
                lyObj.fatherMd.paras.actionFunc(userRects, rectName,lyObj.fatherMd.paras);
            return;
        }

        if (lyObj.fatherMd.paras.act === "moveLayout" || lyObj.fatherMd.paras.act === "moveWhrLayout") {
            if (!gr.mouseAct.act) {
                saveElemData();
                elem.style.background = "radial-gradient(circle at center,red,black)";
                elem.style.zIndex = "" + max;
                gr.message = "Tip: Press [Shift+ArrowKey] To Snap On The Other Elements.";
                gr.messageTime = 0;
            } else {
                gr.mouseAct.act = null;
                elem.style.background = "radial-gradient(circle at center,green,black)";

                userRects[rectName] = {};
                var rectObj = userRects[rectName];
                rectObj.x = KvLib.transUnit(elem.style.left, 0);
                rectObj.y = KvLib.transUnit(elem.style.top, 0);
                rectObj.w = KvLib.transUnit(elem.style.width, 0);
                rectObj.h = KvLib.transUnit(elem.style.height, 0);
                rectObj.z = parseInt(elem.style.zIndex);
                rectObj.fh = elem.kvd.felem.clientHeight;
                rectObj.fw = elem.kvd.felem.clientWidth;
                if (lyObj.fatherMd.paras.actionFunc)
                    lyObj.fatherMd.paras.actionFunc(userRects, rectName,lyObj.fatherMd.paras);
                return;
            }
        }

        if (lyObj.fatherMd.paras.act === "resizeLayout" || lyObj.fatherMd.paras.act === "resizeWhrLayout") {
            if (!gr.mouseAct.act) {
                saveElemData();
                elem.style.background = "radial-gradient(circle at center,red,black)";
                elem.style.zIndex = "" + max;
                elem.style.cursor = "crosshair";
                gr.message = "Tip: Press [Shift+ArrowKey] To Snap On The Other Elements.";
                gr.messageTime = 0;
            } else if (gr.mouseAct.act === "resizeLayout" || gr.mouseAct.act === "resizeWhrLayout") {
                if (elem.id === gr.mouseAct.elem.id) {
                    saveElemData();
                    gr.mouseAct.act = "resizeStart";
                    elem.style.cursor = "nwse-resize";

                }
            } else {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,green,black)";
                gr.mouseAct.elem = elem;
                gr.mouseAct.elem.style.cursor = "pointer";

                userRects[rectName] = {};
                var rectObj = userRects[rectName];
                rectObj.x = KvLib.transUnit(elem.style.left, 0);
                rectObj.y = KvLib.transUnit(elem.style.top, 0);
                rectObj.w = KvLib.transUnit(elem.style.width, 0);
                rectObj.h = KvLib.transUnit(elem.style.height, 0);
                rectObj.z = parseInt(elem.style.zIndex);
                rectObj.fh = elem.kvd.felem.clientHeight;
                rectObj.fw = elem.kvd.felem.clientWidth;

                if (lyObj.fatherMd.paras.actionFunc)
                    lyObj.fatherMd.paras.actionFunc(userRects, rectName,lyObj.fatherMd.paras);


            }
        }



    }

    feditMouseDown(event) {
        if (event.button !== 0) {
            if (gr.mouseAct.act === "moveLayout" || gr.mouseAct.act === "moveWhrLayout") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.left = gr.mouseAct.elemLeft + "px";
                gr.mouseAct.elem.style.top = gr.mouseAct.elemTop + "px";

            }
            if (gr.mouseAct.act === "resizeLayout" || gr.mouseAct.act === "resizeStart" || gr.mouseAct.act === "resizeWhrLayout") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.width = gr.mouseAct.elemWidth + "px";
                gr.mouseAct.elem.style.height = gr.mouseAct.elemHeight + "px";
                gr.mouseAct.elem.style.cursor = "pointer";

            }
        }
    }

    feditMouseMove(event) {
        if (gr.mouseAct.act === "moveLayout" || gr.mouseAct.act === "moveWhrLayout") {
            var moveX = event.clientX - gr.mouseAct.mouseDownX;
            var moveY = event.clientY - gr.mouseAct.mouseDownY;
            var xx = gr.mouseAct.elemLeft + moveX;
            var yy = gr.mouseAct.elemTop + moveY;
            gr.mouseAct.elem.style.left = (xx) + "px";
            gr.mouseAct.elem.style.top = (yy) + "px";
            gr.mouseAct.moveX = moveX;
            gr.mouseAct.moveY = moveY;
            gr.status1 = "x: " + xx.toFixed(2);
            gr.status2 = "y: " + yy.toFixed(2);



        }
        if (gr.mouseAct.act === "resizeStart") {
            var moveX = event.clientX - gr.mouseAct.mouseDownX;
            var moveY = event.clientY - gr.mouseAct.mouseDownY;
            var width = gr.mouseAct.elemWidth + moveX;
            var height = gr.mouseAct.elemHeight + moveY;
            if (width <= 1) {
                width = 2;
            }
            if (height <= 1) {
                height = 2;
            }

            gr.mouseAct.elem.style.width = (width) + "px";
            gr.mouseAct.elem.style.height = (height) + "px";

            gr.status1 = "w: " + width.toFixed(2);
            gr.status2 = "h: " + height.toFixed(2);



        }


    }

    keypressFunc(event) {
        //console.log(event);
    }
    keydownFunc(event) {
        //console.log(event);

        if (gr.mouseAct.act === "moveLayout" || gr.mouseAct.act === "moveWhrLayout") {
            if (event.key === "Escape") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.left = gr.mouseAct.elemLeft + "px";
                gr.mouseAct.elem.style.top = gr.mouseAct.elemTop + "px";
                return;
            }

            if (event.key === "Enter") {
                gr.mouseAct.act = null;
                var elem = gr.mouseAct.elem;
                elem.style.background = "radial-gradient(circle at center,blue,black)";
                var userRects = elem.kvd.model.opts.userRects;
                var rectName = elem.kvd.lyRect.name;
                userRects[rectName] = {};
                var rectObj = userRects[rectName];
                rectObj.x = KvLib.transUnit(elem.style.left, 0);
                rectObj.y = KvLib.transUnit(elem.style.top, 0);
                rectObj.w = KvLib.transUnit(elem.style.width, 0);
                rectObj.h = KvLib.transUnit(elem.style.height, 0);
                rectObj.z = parseInt(elem.style.zIndex);
                rectObj.fh = elem.kvd.felem.clientHeight;
                rectObj.fw = elem.kvd.felem.clientWidth;
                return;
            }

            var mX = 0.0;
            var mY = 0.0;
            if (!event.shiftKey) {
                if (event.key === "ArrowLeft")
                    mX -= 1;
                if (event.key === "ArrowRight")
                    mX += 1;
                if (event.key === "ArrowUp")
                    mY -= 1;
                if (event.key === "ArrowDown")
                    mY += 1;
            } else {
                if (event.key === "ArrowLeft")
                    mX -= 1;
                if (event.key === "ArrowRight")
                    mX += 1;
                if (event.key === "ArrowUp")
                    mY -= 1;
                if (event.key === "ArrowDown")
                    mY += 1;
                if (mX !== 0 || mY !== 0) {

                    var nowx = KvLib.transUnit(gr.mouseAct.elem.style.left, 0);
                    var nowy = KvLib.transUnit(gr.mouseAct.elem.style.top, 0);
                    var minL = -9999;
                    var minR = 9999;
                    var minT = -9999;
                    var minB = 9999;

                    var elem = gr.mouseAct.elem;
                    var layouts = elem.kvd.model.layouts;
                    for (var key in layouts) {
                        var lay = layouts[key];
                        var sysRects = lay.stas.lyRects;
                        var userRects = elem.kvd.model.opts.userRects;
                        var rectName = elem.kvd.lyRect.name;
                        for (var i = 0; i < sysRects.length; i++) {
                            var rect = sysRects[i];
                            var cname = rect.name;
                            if (cname === rectName)
                                continue;
                            if (userRects[cname])
                                rect = userRects[cname];
                            if ((rect.x - nowx) > 0.1) {
                                if (rect.x < minR)
                                    minR = rect.x;
                            }
                            if ((nowx - rect.x) > 0.1) {
                                if (rect.x > minL)
                                    minL = rect.x;
                            }
                            if ((rect.y - nowy) > 0.1) {
                                if (rect.y < minB)
                                    minB = rect.y;
                            }
                            if ((nowy - rect.y) > 0.1) {
                                if (rect.y > minT)
                                    minT = rect.y;
                            }
                        }
                    }
                }
                while (1) {
                    if (mX < 0) {
                        if (minL === -9999)
                            return;
                        mX = minL - gr.mouseAct.elemLeft - gr.mouseAct.moveX;
                        console.log("elemLeft " + gr.mouseAct.elemLeft);
                        console.log("minL " + minL);
                        console.log("mx " + mX);
                        break;
                    }
                    if (mX > 0) {
                        if (minR === 9999)
                            return;
                        mX = minR - gr.mouseAct.elemLeft - gr.mouseAct.moveX;
                        break;
                    }
                    if (mY > 0) {
                        if (minB === 9999)
                            return;
                        mY = minB - gr.mouseAct.elemTop - gr.mouseAct.moveY;
                        break;
                    }
                    if (mY < 0) {
                        if (minT === -9999)
                            return;
                        mY = minT - gr.mouseAct.elemTop - gr.mouseAct.moveY;
                        break;
                    }
                    break;
                }

            }

            if (mX !== 0 || mY !== 0) {
                gr.mouseAct.moveX += mX;
                gr.mouseAct.moveY += mY;
                var xx = gr.mouseAct.elemLeft + gr.mouseAct.moveX;
                var yy = gr.mouseAct.elemTop + gr.mouseAct.moveY;
                gr.mouseAct.elem.style.left = (xx) + "px";
                gr.mouseAct.elem.style.top = (yy) + "px";
                gr.message = "Move to (x: " + xx.toFixed(2) + ", y: " + yy.toFixed(2) + ")";
                gr.messageTime = 1000;


            }


        }


        if (gr.mouseAct.act === "resizeLayout" || gr.mouseAct.act === "resizeStart" || gr.mouseAct.act === "resizeWhrLayout") {
            if (event.key === "Escape") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.cursor = "pointer";
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.left = gr.mouseAct.elemLeft + "px";
                gr.mouseAct.elem.style.top = gr.mouseAct.elemTop + "px";
                return;
            }

            if (event.key === "Enter") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.cursor = "pointer";
                var elem = gr.mouseAct.elem;
                elem.style.background = "radial-gradient(circle at center,blue,black)";
                var userRects = elem.kvd.model.opts.userRects;
                var rectName = elem.kvd.lyRect.name;
                userRects[rectName] = {};
                var rectObj = userRects[rectName];
                rectObj.x = KvLib.transUnit(elem.style.left, 0);
                rectObj.y = KvLib.transUnit(elem.style.top, 0);
                rectObj.w = KvLib.transUnit(elem.style.width, 0);
                rectObj.h = KvLib.transUnit(elem.style.height, 0);
                rectObj.z = parseInt(elem.style.zIndex);
                rectObj.fh = elem.kvd.felem.clientHeight;
                rectObj.fw = elem.kvd.felem.clientWidth;
                return;
            }



            var mX = 0.0;
            var mY = 0.0;
            if (!event.shiftKey) {
                if (event.key === "ArrowLeft")
                    mX -= 1;
                if (event.key === "ArrowRight")
                    mX += 1;
                if (event.key === "ArrowUp")
                    mY -= 1;
                if (event.key === "ArrowDown")
                    mY += 1;
            } else {
                if (event.key === "ArrowLeft")
                    mX -= 1;
                if (event.key === "ArrowRight")
                    mX += 1;
                if (event.key === "ArrowUp")
                    mY -= 1;
                if (event.key === "ArrowDown")
                    mY += 1;
                if (mX !== 0 || mY !== 0) {

                    var nowx = KvLib.transUnit(gr.mouseAct.elem.style.left, 0);
                    var nowy = KvLib.transUnit(gr.mouseAct.elem.style.top, 0);
                    var width = KvLib.transUnit(gr.mouseAct.elem.style.width);
                    var height = KvLib.transUnit(gr.mouseAct.elem.style.height);
                    var nowxr = nowx + width - 1;
                    var nowyb = nowy + height - 1;

                    var minL = -9999;
                    var minR = 9999;
                    var minT = -9999;
                    var minB = 9999;

                    var elem = gr.mouseAct.elem;
                    var layouts = elem.kvd.model.layouts;
                    for (var key in layouts) {
                        var lay = layouts[key];
                        var sysRects = lay.stas.lyRects;
                        var userRects = elem.kvd.model.opts.userRects;
                        var rectName = elem.kvd.lyRect.name;
                        for (var i = 0; i < sysRects.length; i++) {
                            var rect = sysRects[i];
                            var cname = rect.name;
                            if (cname === rectName)
                                continue;
                            if (userRects[cname])
                                rect = userRects[cname];
                            var rectxr = rect.x + rect.w - 1;
                            var rectyb = rect.y + rect.h - 1;
                            if ((rectxr - nowxr) > 0.1) {
                                if (rectxr < minR)
                                    minR = rectxr;
                            }
                            if ((nowxr - rectxr) > 0.1) {
                                if (rectxr > minL)
                                    minL = rectxr;
                            }
                            if ((rectyb - nowyb) > 0.1) {
                                if (rectyb < minB)
                                    minB = rectyb;
                            }
                            if ((nowyb - rectyb) > 0.1) {
                                if (rectyb > minT)
                                    minT = rectyb;
                            }
                        }
                    }
                }
                while (1) {
                    if (mX < 0) {
                        if (minL === -9999)
                            return;
                        mX = minL - gr.mouseAct.elemLeft - width + 1;
                        console.log("elemLeft " + gr.mouseAct.elemLeft);
                        console.log("minL " + minL);
                        console.log("mx " + mX);
                        break;
                    }
                    if (mX > 0) {
                        if (minR === 9999)
                            return;
                        mX = minR - gr.mouseAct.elemLeft - width + 1;
                        break;
                    }
                    if (mY > 0) {
                        if (minB === 9999)
                            return;
                        mY = minB - gr.mouseAct.elemTop - height + 1;
                        break;
                    }
                    if (mY < 0) {
                        if (minT === -9999)
                            return;
                        mY = minT - gr.mouseAct.elemTop - height + 1;
                        break;
                    }
                    break;
                }

            }

            if (mX !== 0 || mY !== 0) {
                var width = KvLib.transUnit(gr.mouseAct.elem.style.width);
                var height = KvLib.transUnit(gr.mouseAct.elem.style.height);
                width += mX;
                height += mY;
                gr.mouseAct.elem.style.width = (width) + "px";
                gr.mouseAct.elem.style.height = (height) + "px";
                gr.message = "Resize  (Width: " + width.toFixed(2) + ", height: " + height.toFixed(2) + ")";
                gr.messageTime = 1000;



                /*
                 gr.mouseAct.moveX += mX;
                 gr.mouseAct.moveY += mY;
                 var xx = gr.mouseAct.elemLeft + gr.mouseAct.moveX;
                 var yy = gr.mouseAct.elemTop + gr.mouseAct.moveY;
                 gr.mouseAct.elem.style.left = (xx) + "px";
                 gr.mouseAct.elem.style.top = (yy) + "px";
                 gr.message = "Move to (x: " + xx.toFixed(2) + ", y: " + yy.toFixed(2) + ")";
                 gr.messageTime = 1000;
                 * 
                 */


            }


        }


    }
    focusFunc(event) {
        return;
        console.log(event);
        if (gr.layoutEditElem)
            gr.layoutEditElem.style.boxShadow = "";
        var elem = event.target;
        elem.style.boxShadow = "0px 0px 5px #ffffff";
        gr.layoutEditElem = elem;

    }
    blurFunc(event) {
        console.log(event);
        var elem = event.target;
        //elem.style.boxShadow = "";
    }

    build() {
    }

    create(fhid, xst, yst, fw, fh, root) {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var ly = st.ly;
        st.xst = xst;
        st.yst = yst;
        st.fw = fw;
        st.fh = fh;
        st.fhid = fhid;
        if (st.fw === null || st.fw === undefined)
            st.fw = document.getElementById(st.fhid).clientWidth;
        if (st.fh === null || st.fh === undefined)
            st.fh = document.getElementById(st.fhid).clientHeight;
        if (!xst)
            st.xst = 0;
        if (!yst)
            st.yst = 0;
        self.transData();
        st.borderWidth = KvLib.transUnit(op.borderWidth, 0);
        if (op.rootIw) {
            st.xst += (st.fw - op.rootIw) / 2;
            st.fw = op.rootIw;
        }
        if (op.rootIh) {
            st.yst += (st.fh - op.rootIh) / 2;
            st.fh = op.rootIh;
        }

        var felem = document.getElementById(fhid);
        var relem = felem;
        //==============================================
        if (root) {
            var rootElem = document.createElement("div");
            rootElem.id = this.kid + "~" + "root";
            rootElem.style.position = "absolute";
            rootElem.style.backgroundColor = op.color;
            rootElem.style.borderWidth = KvLib.transUnit(op.borderWidth, 0) + "px";
            rootElem.style.borderColor = op.borderColor;
            rootElem.style.borderStyle = "solid";
            rootElem.style.overflowX=op.overflowX;
            rootElem.style.overflowY=op.overflowY;
            rootElem.style.zIndex = "0";
            if (op.hidden_f)
                rootElem.style.visibility = "hidden";
            if (op.zIndex)
                rootElem.style.zIndex = op.zIndex;

            /*
             if (self.paras.mode === "edit" && !self.opts.disEdit_f) {
             rootElem.onmousedown = self.feditMouseDown;
             rootElem.onmousemove = self.feditMouseMove;
             }
             * 
             */
            if (self.paras.mode === "edit") {
                rootElem.onmousedown = self.feditMouseDown;
                rootElem.onmousemove = self.feditMouseMove;
            }


            if (op.outsideShadowBlur) {
                var str = "";
                str += KvLib.transUnit(op.outsideShadowOffx, 0) + "px ";
                str += KvLib.transUnit(op.outsideShadowOffy, 0) + "px ";
                str += KvLib.transUnit(op.outsideShadowBlur, 0) + "px ";
                str += op.outsideShadowColor;
                rootElem.style.boxShadow = str;
            }
            st.fw -= st.borderWidth * 2;
            st.fh -= st.borderWidth * 2;
            rootElem.style.left = st.xst + "px";
            rootElem.style.top = st.yst + "px";
            rootElem.style.width = (st.fw) + "px";
            rootElem.style.height = (st.fh) + "px";
            felem.appendChild(rootElem);
            relem = rootElem;
            st.xst = 0;
            st.yst = 0;
            self.fatherMd.stas.rootId = rootElem.id;
            self.fatherMd.stas.fhid = fhid;
        }
        //==============================================
        self.grid();
        var shrinkX = 0;
        var shrinkY = 0;
        for (var i = 0; i < st.lyRects.length; i++) {
            st.lyRects[i].fhid = relem.id;
            var x = st.lyRects[i].x;
            var y = st.lyRects[i].y;
            var w = st.lyRects[i].w;
            var h = st.lyRects[i].h;
            var z = st.lyRects[i].z;
            var cname = st.lyRects[i].name;


            if (self.fatherMd.opts.layoutGroups[cname]) {
                var group = self.fatherMd.opts.layoutGroups[cname];
                var groupElem = document.createElement("div");
                groupElem.id = this.kid + "~group~" + cname;
                if (!self.fatherMd.stas.layoutGroups)
                    self.fatherMd.stas.layoutGroups = {};
                self.fatherMd.stas.layoutGroups[cname] = {fhid: groupElem.id, x: x, y: y};
                st.lyRects[i].groupHid = groupElem.id;
                groupElem.style.position = "absolute";
                groupElem.style.backgroundColor = group.color;
                groupElem.style.border = group.border;;
                groupElem.style.left = x + "px";
                groupElem.style.top = y + "px";
                groupElem.style.width = (w) + "px";
                groupElem.style.height = (h) + "px";
                groupElem.style.zIndex = "" + z;
                var gelem = document.getElementById(relem.id);
                gelem.appendChild(groupElem);

            }
            if (self.fatherMd.type === "Md_layout~sys") {
                var elem = document.createElement("div");
                elem.id = this.kid + "~" + i;
                var kvd = {};
                elem.style.position = "absolute";
                elem.style.overflow = "hidden";
                elem.style.left = x + "px";
                elem.style.top = y + "px";
                elem.style.width = w + "px";
                elem.style.height = h + "px";
                elem.style.zIndex = z;
                elem.tabIndex = "0";
                var md = this.fatherMd;
                elem.style.background = "radial-gradient(circle at center,white,black)";
                elem.style.outline = "none";
                st.lyRects[i].elemId = elem.id;
                kvd.lyRect = st.lyRects[i];
                kvd.layout = this;
                kvd.layoutInx = i;
                kvd.model = this.fatherMd;
                kvd.fhid = relem.id;
                kvd.felem = relem;
                elem.kvd = kvd;
                relem.appendChild(elem);
                gr.editLayoutElem = null;
                continue;
            }
            if (self.fatherMd.baseType === "Md_userModel") {
                if (self.paras.mode === "edit" && !self.opts.disEdit_f) {
                    var elem = document.createElement("div");
                    elem.id = this.kid + "~" + i;
                    var kvd = {};
                    elem.style.position = "absolute";
                    elem.style.overflow = "hidden";
                    elem.style.left = x + "px";
                    elem.style.top = y + "px";
                    elem.style.width = w + "px";
                    elem.style.height = h + "px";
                    elem.style.zIndex = z;
                    elem.tabIndex = "0";

                    var md = this.fatherMd;
                    var editAble = 1;
                    if (self.paras.act === "insertLayout") {
                        if (md.opts.models[cname])
                            editAble = 0;
                        if (md.opts.comps[cname])
                            editAble = 0;
                        if (md.opts.layouts[cname])
                            editAble = 0;
                    } else {
                        if (cname === "c~0")
                            editAble = 0;
                    }
                    if (self.paras.disEditLayout_f)
                        editAble = 0;
                    if (editAble === 0) {
                        elem.style.background = "radial-gradient(circle at center,white,black)";
                    } else {
                        elem.style.background = "radial-gradient(circle at center,blue,black)";
                        elem.addEventListener('keydown', self.keydownFunc);
                        elem.onclick = self.editMouseClick;
                        elem.style.cursor = "pointer";
                    }
                    elem.style.outline = "none";
                    st.lyRects[i].elemId = elem.id;
                    kvd.lyRect = st.lyRects[i];
                    kvd.layout = this;
                    kvd.layoutInx = i;
                    kvd.model = this.fatherMd;
                    kvd.fhid = relem.id;
                    kvd.felem = relem;
                    elem.kvd = kvd;
                    relem.appendChild(elem);
                    gr.editLayoutElem = null;
                    continue;
                }

                if (self.paras.mode === "editObj" && !self.opts.disEdit_f) {
                    var elem = document.createElement("div");
                    elem.id = this.kid + "~" + i;
                    var kvd = {};
                    elem.style.position = "absolute";
                    elem.style.overflow = "hidden";
                    elem.style.left = x + "px";
                    elem.style.top = y + "px";
                    elem.style.width = w + "px";
                    elem.style.height = h + "px";
                    elem.style.zIndex = z;
                    elem.tabIndex = "0";
                    var md = this.fatherMd;
                    if (self.paras.act === "insertObj") {
                        var editAble = 1;
                        if (md.opts.models[cname])
                            editAble = 0;
                        if (md.opts.comps[cname])
                            editAble = 0;
                        if (md.opts.layouts[cname])
                            editAble = 0;
                    } else {
                        var editAble = 0;
                        if (md.opts.models[cname])
                            editAble = 1;
                        if (md.opts.comps[cname])
                            editAble = 1;

                    }
                    if (editAble) {
                        elem.style.background = "radial-gradient(circle at center,blue,black)";
                        elem.addEventListener('keydown', self.keydownFunc);
                        elem.onclick = self.editMouseClick;
                        elem.style.cursor = "pointer";
                    } else {
                        elem.style.background = "radial-gradient(circle at center,white,black)";
                    }
                    elem.style.outline = "none";
                    st.lyRects[i].elemId = elem.id;
                    kvd.lyRect = st.lyRects[i];
                    kvd.layout = this;
                    kvd.layoutInx = i;
                    kvd.model = this.fatherMd;
                    kvd.fhid = relem.id;
                    kvd.felem = relem;
                    elem.kvd = kvd;
                    relem.appendChild(elem);
                    gr.editLayoutElem = null;
                    continue;
                }
            }


            if (self.fatherMd.comps[cname]) {
                var compObj = self.fatherMd.comps[cname];
                compObj.paras = self.paras;
                if (compObj.opts.shrinkX_f) {
                    compObj.create(relem.id, x - shrinkX, y - shrinkY, w, h);
                    st.lyRects[i].elemId = compObj.stas.elemId;
                    st.lyRects[i].x = x - shrinkX;
                    shrinkX += compObj.stas.shrinkX;
                    continue;
                }
                if (compObj.opts.shrinkY_f) {
                    compObj.create(relem.id, x - shrinkX, y - shrinkY, w, h);
                    st.lyRects[i].elemId = compObj.stas.elemId;
                    st.lyRects[i].y = y - shrinkY;
                    shrinkY += compObj.stas.shrinkY;
                    continue;
                }
                compObj.opts.zIndex = z;
                compObj.create(relem.id, x - shrinkX, y - shrinkY, w, h);
                st.lyRects[i].elemId = compObj.stas.elemId;
                continue;
            }
            if (self.fatherMd.models[cname]) {
                var modelObj = self.fatherMd.models[cname];
                modelObj.paras = self.paras;
                modelObj.opts.zIndex = z;
                modelObj.create(relem.id, x, y, w, h);
                modelObj["cname"] = cname;
            }
        }
    }
}

