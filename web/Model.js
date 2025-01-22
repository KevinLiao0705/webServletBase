/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global KvLib, Layout, gr, Component, sys, Kext, Test, ani, mac, Md_editOptsLine, us */


//===========================================
class Model {
    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.opts.inputRegs = [];
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.popOnCnt = 0;
        this.watch = {};
        this.stas = {};
        //=============================
        this.fatherMd = null;
        //this.layZinxMap = new Map();
        //this.lyMap = new Map();
        //==============================
        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        // gr.kidMap.set(this.kid, this);
    }

    initOpts() {
        var opts = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        if (this.baseType !== "xxx") {
            this.mdClass = eval("new " + this.baseType + "()");
            opts = this.mdClass.initOpts(this);
        }
        return opts;
    }

    initParas() {
        var paras = {};
        return paras;
    }

    static getOpts(baseType, subType) {
        var opts = {};
        KvLib.deepCoverObject(opts, gr.modelBaseOpts);
        var bopts = gr.modelOpts[baseType];
        if (bopts) {
            KvLib.deepCoverObject(opts, bopts);

            if (bopts["delOpts"]) {
                var delOpts = bopts["delOpts"][subType];
                if (delOpts)
                    KvLib.deleteObjectMenber(opts, delOpts);
            }

            var sopts = bopts["subOpts"][subType];
            if (sopts)
                KvLib.deepCoverObject(opts, sopts);

            if (us.set.optsSet["Model~" + baseType]) {
                var uopts = us.set.optsSet["Model~" + baseType][subType];
                if (uopts)
                    KvLib.deepCoverObject(opts, uopts);
            }


        }
        return opts;
    }

    chkWatch() {
        if (this.models) {
            var modleKeys = Object.keys(this.models);
            for (var i = 0; i < modleKeys.length; i++) {
                var md = this.models[modleKeys[i]];
                if (md.mdClass.chkWatch)
                    md.mdClass.chkWatch();
                md.chkWatch();
            }
        }
        if (this.comps) {
            var compKeys = Object.keys(this.comps);
            for (var i = 0; i < compKeys.length; i++) {
                var comp = this.comps[compKeys[i]];
                comp.chkWatch();
            }
        }
        /*
         var modKeys = Object.keys(this.models);
         for (var i = 0; i < modKeys.length; i++) {
         var mod = this.models[modKeys[i]];
         mod.chkWatch();
         }
         */

    }

    create(fhid, x, y, w, h) {
        this.fhid = fhid;
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        st.fhid = fhid;
        if (x === undefined || x === null)
            x = 0;
        if (y === undefined || y === null)
            y = 0;
        if (w === undefined || w === null) {
            w = felem.clientWidth;
            if (!w)
                w = 0;
        }
        if (h === undefined || h === null) {
            h = felem.clientHeight;
            if (!h)
                h = 0;
        }
        st.fx = x;
        st.fy = y;
        st.fw = w;
        st.fh = h;
        st.fhid = fhid;
        //this.layout.create(fhid, x, y, w, h, 1);
        //self.layouts["c"].create(fhid, x, y, w, h, 1);

        for (var cname in self.layouts) {
            var layout = self.layouts[cname];
            if (cname === "c") {
                var rootLayout = self.layouts[cname];
                rootLayout.opts.zIndex = self.opts.zIndex;
                rootLayout.opts.hidden_f = op.hidden_f;
                st.w = w;
                st.h = h;
                st.x = x;
                st.y = y;
                if (op.whr) {
                    var ww = (h * op.whr);
                    var hh = (w / op.whr);
                    if (ww > w)
                        ww = w;
                    if (hh > h)
                        hh = h;
                    x += ((w - ww) / 2);
                    y += ((h - hh) / 2);
                    w = ww;
                    h = hh;
                }
                st.rx = x;
                st.ry = y;
                st.rw = w;
                st.rh = h;

                //======================================
                var margin = KvLib.transUnit(op.mMargin, 0);
                st.lm = margin;
                st.tm = margin;
                st.rm = margin;
                st.bm = margin;
                if (op.mtm !== null)
                    st.tm = KvLib.transUnit(op.mtm, 0, st.rw, st.rh);
                if (op.mrm !== null)
                    st.rm = KvLib.transUnit(op.mrm, 0, st.rw, st.rh);
                if (op.mbm !== null)
                    st.bm = KvLib.transUnit(op.mbm, 0, st.rw, st.rh);
                if (op.mlm !== null)
                    st.lm = KvLib.transUnit(op.mlm, 0, st.rw, st.rh);
                //================================================    
                st.mx = st.rx + st.lm;
                st.my = st.ry + st.tm;
                //================================================    
                var maxIw = st.rw - (st.lm + st.rm);
                var maxIh = st.rh - (st.tm + st.bm);

                st.mw = KvLib.transUnit(op.mw, 0, st.rw, st.rh);
                st.mh = KvLib.transUnit(op.mh, 0, st.rw, st.rh);
                if (!op.mw)
                    st.mw = maxIw;
                if (!op.mh)
                    st.mh = maxIh;
                if (st.mw > maxIw)
                    st.mw = maxIw;
                if (st.mh > maxIh)
                    st.mh = maxIh;
                if (op.wAlign === "center") {
                    st.mx += (maxIw - st.mw) / 2;
                }
                if (op.wAlign === "right") {
                    st.mx += maxIw - st.mw;
                }
                if (op.hAlign === "center") {
                    st.my += (maxIh - st.mh) / 2;
                }
                if (op.hAlign === "bottom") {
                    st.my += maxIh - st.mh;
                }

                rootLayout.create(fhid, st.mx, st.my, st.mw, st.mh, 1);
                //rootLayout.create(fhid, st.rx, st.ry, st.rw, st.rh, 1);
                continue;
            } else {
                var strA = cname.split("~");
                var fname = "";
                for (var i = 0; i < strA.length - 1; i++) {
                    if (i !== 0)
                        fname += "~";
                    fname += strA[i];
                }
                if (self.layouts[fname]) {
                    var fLayout = self.layouts[fname];
                    if (!fLayout.stas.lyRects)
                        continue;

                    for (var i = 0; i < fLayout.stas.lyRects.length; i++) {
                        if (!fLayout.stas.lyRects)
                            continue;
                        var rect = fLayout.stas.lyRects[i];
                        if (rect.name !== cname)
                            continue;
                        var x = rect.x;
                        var y = rect.y;
                        var w = rect.w;
                        var h = rect.h;
                        var fhid = rect.fhid;

                        for (var key in self.opts.layoutGroups) {
                            if (cname.includes(key)) {
                                if (!self.stas.layoutGroups[key])
                                    continue;
                                var group = self.stas.layoutGroups[key];
                                //fhid=group.fhid;
                                //x=x-group.x;
                                //y=y-group.y;
                                break
                            }
                        }

                        self.layouts[cname].create(fhid, x, y, w, h);
                        break;
                    }
                }
            }
        }

        if (this.mdClass.afterCreate)
            this.mdClass.afterCreate();

    }

    clearAll(cname) {
        var self = this;
        self.clear(cname);
        var keys = Object.keys(self.layouts);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].includes(cname))
                delete self.layouts[keys[i]];
        }
    }

    clear(cname) {
        var self = this;
        var st = self.stas;
        if (cname) {
            var keys = Object.keys(self.comps);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].includes(cname))
                    self.comps[keys[i]].clear();
            }
            var keys = Object.keys(self.models);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].includes(cname))
                    self.models[keys[i]].clear();
            }
            return;
        }
        var child = document.getElementById(self.stas.rootId);
        var parent = document.getElementById(self.stas.fhid);
        if (child)
            parent.removeChild(child);
        var name = self.name;
        if (!this.fatherMd)
            return;
        delete this.fatherMd.models[this.cname];
        delete this.fatherMd.modelRefs[name];
    }

    reCreate(cname, newKvObj) {
        var self = this;
        if (!this.fatherMd && !cname) {
            self = this;
            var kvObj = this;
            var name = kvObj.name;
            var type = kvObj.type;
            var opts = JSON.parse(JSON.stringify(self.opts));
            opts.actionFunc = self.opts.actionFunc;
            opts.clickFunc = self.opts.clickFunc;
            opts.drawFunc = self.opts.drawFunc;
            var paras = JSON.parse(JSON.stringify(self.paras));
            paras.actionFunc = self.paras.actionFunc;
            var cname = kvObj.cname;
            var className = kvObj.constructor.name;
            var fhid = kvObj.stas.fhid;
            var x = kvObj.stas.fx;
            var y = kvObj.stas.fy;
            var w = kvObj.stas.fw;
            var h = kvObj.stas.fh;
            kvObj.clear();
            var kvObj = eval("new " + className + "(name,type,opts,paras);");
            gr.mdMain = kvObj;
            kvObj.build();
            kvObj.create(fhid, x, y, w, h);
            kvObj.cname = null;
            return;
        }

        if (!cname) {
            cname = this.cname;
            self = this.fatherMd;
        }

        if (self.layouts[cname]) {
            var rects = self.layouts[cname].stas.lyRects;
            for (var i = 0; i < rects.length; i++) {
                self.reCreate(cname + "~" + i);
            }
            return;
        }

        if (newKvObj) {
            var kvObj = newKvObj;
        } else {
            if (self.comps[cname])
                var kvObj = self.comps[cname];
            if (self.models[cname])
                var kvObj = self.models[cname];
        }
        if (!kvObj)
            return;
        var strA = cname.split("~");
        var lyCname = "";
        for (var i = 0; i < strA.length - 1; i++) {
            if (i !== 0)
                lyCname += "~";
            lyCname += strA[i];
        }
        if (!self.layouts[lyCname])
            return;
        var rects = self.layouts[lyCname].stas.lyRects;
        for (var i = 0; i < rects.length; i++) {
            if (rects[i].name !== cname)
                continue;
            var rect = rects[i];
            if (!newKvObj) {
                var name = kvObj.name;
                var type = kvObj.type;
                var opts = JSON.parse(JSON.stringify(kvObj.opts));
                opts.actionFunc = kvObj.opts.actionFunc;
                opts.clickFunc = kvObj.opts.clickFunc;
                var paras = JSON.parse(JSON.stringify(kvObj.paras));
                paras.actionFunc = kvObj.paras.actionFunc;

                var cname = kvObj.cname;
                var className = kvObj.constructor.name;
                var mdClass = kvObj.mdClass;
                var fhid = kvObj.stas.fhid;

                kvObj.clear();
                var kvObj = eval("new " + className + "(name,type,opts,paras);");
                if (className === "Component") {
                    self.comps[cname] = kvObj;
                    if (name)
                        self.compRefs[name] = kvObj;
                }
                if (className === "Model") {
                    self.models[cname] = kvObj;
                    if (name)
                        self.modelRefs[name] = kvObj;
                }
                kvObj.fatherMd = self;
                kvObj.cname = cname;
                kvObj.build();
                kvObj.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
                kvObj.cname = cname;
                if (mdClass)
                    mdClass.md = kvObj;
                return kvObj;
            } else {
                if (self.comps[cname])
                    var oldKvObj = self.comps[cname];
                if (self.models[cname])
                    var oldKvObj = self.models[cname];
                if (oldKvObj)
                    oldKvObj.clear();
                var name = newKvObj.name;
                var className = newKvObj.constructor.name;
                if (className === "Component") {
                    self.comps[cname] = newKvObj;
                    if (name)
                        self.compRefs[name] = newKvObj;
                }
                if (className === "Model") {
                    self.models[cname] = newKvObj;
                    if (name)
                        self.modelRefs[name] = newKvObj;
                }
                newKvObj.fatherMd = self;
                newKvObj.build();
                newKvObj.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
                newKvObj.cname = cname;
                return newKvObj;
            }
        }
    }

    build() {
        var md = this;
        md.opts.layouts = {};
        md.opts.comps = {};
        md.opts.models = {};
        md.opts.layoutGroups = {};
        md.lyMap = new Map();
        //======================================================================
        this.mdClass.build(md);
        //======================================================================
        md.layouts = {};
        md.layoutRefs = {};
        for (var cname in md.opts.layouts) {
            var layout = md.opts.layouts[cname];
            md.layouts[cname] = new Layout(layout.name, layout.type, layout.opts, md.paras);
            md.layoutRefs[layout.name] = md.layouts[cname];
            md.layouts[cname].build();
            md.layouts[cname].fatherMd = md;
            md.layouts[cname].cname = cname;
        }
        //======================================================================
        md.comps = {};
        md.compRefs = {};
        for (var cname in md.opts.comps) {
            var cmp = md.opts.comps[cname];
            md.comps[cname] = new Component(cmp.name, cmp.type, cmp.opts, md.paras);
            if (cmp.name)
                md.compRefs[cmp.name] = md.comps[cname];
            md.comps[cname].build();
            md.comps[cname].fatherMd = md;
            md.comps[cname].cname = cname;
        }
        //======================================================================
        md.models = {};
        md.modelRefs = {};
        for (var cname in md.opts.models) {
            var mod = md.opts.models[cname];
            md.models[cname] = new Model(mod.name, mod.type, mod.opts, md.paras);
            if (mod.name)
                md.modelRefs[mod.name] = md.models[cname];
            md.models[cname].build();
            md.models[cname].fatherMd = md;
            md.models[cname].cname = cname;
        }
        //======================================================================
    }

    setFarme(opts) {
        var op = this.opts;
        opts.borderWidth = op.borderWidth;
        opts.outsideShadowBlur = op.outsideShadowBlur;
        opts.outsideShadowOffx = op.outsideShadowOffx;
        opts.outsideShadowOffy = op.outsideShadowOffy;
        opts.outsideShadowColor = op.outsideShadowColor;
        opts.borderColor = op.borderColor;
        opts.color = op.baseColor;
    }

}
//===========================================
class Md_test {
    initOpts(md) {
        var obj = {};
        //obj.pageName = "testComponent_2";
        //obj.pageName = "testComponent_1";
        obj.pageName = "testModel_1";
        return obj;
    }
    buildPage() {
        var self = this;
        if (self.md.opts.pageName === "testComponent_1")
            self.buildPageTestComponent_1();
        if (self.md.opts.pageName === "testComponent_2")
            self.buildPageTestComponent_2();
        if (self.md.opts.pageName === "testModel_1")
            self.buildPageTestModel_1();
    }

    buildPageTestModel_1() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var cname = lyMap.get("body");
        var opts = {};
        models[cname] = {name: "editOptsDialog", type: "Md_editOptsBox~dark", opts: opts};
    }

    buildPageTestComponent_2() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;

        var actionFunc = function (obj) {
            console.log(obj);
        };

        var cname = "c~1";
        layouts[cname] = {name: cname, type: "base", opts: {xc: 3, yc: 1}};
        lyMap.set("body", cname);

        var cname = lyMap.get("body") + "~" + 0;
        layouts[cname] = {name: cname, type: "base", opts: {xc: 1, yc: 28}};
        lyMap.set("body1", cname);


        var cname = lyMap.get("body1") + "~" + 0;
        var opts = {};
        opts.setType = "inputText";
        opts.value = "This is text.";
        models[cname] = {name: "testMdEditOptsLine", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 1;
        var opts = {};
        opts.setType = "inputPassword";
        opts.value = "password";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 2;
        var opts = {};
        opts.setType = "inputDate";
        opts.value = "2018-12-23";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 3;
        var opts = {};
        opts.setType = "inputDatetime";
        opts.value = "2018-12-23T12:34";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 4;
        var opts = {};
        opts.setType = "inputEmail";
        opts.value = "kevin.josn@gmail.com";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 5;
        var opts = {};
        opts.setType = "inputTel";
        opts.value = "0975-801797";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 6;
        var opts = {};
        opts.setType = "inputRadio";
        opts.value = "-1~123~456~ABCD";
        opts.selectHint = "Please Select!";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 7;
        var opts = {};
        opts.setType = "inputCheckbox";
        opts.value = "0~disable~enable";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 8;
        var opts = {};
        opts.setType = "inputColor";
        opts.value = "#0f0";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 9;
        var opts = {};
        opts.setType = "inputNumber";
        opts.value = 12;
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 10;
        var opts = {};
        opts.setType = "inputRange";
        opts.value = 12;
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};


    }

    buildPageTestComponent_1() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;

        var actionFunc = function (obj) {
            console.log(obj);
            if (obj.act === "click") {
                var kvObj = obj.kvObj;
                if (kvObj.name === "lightButton~5") {
                    kvObj.opts.altColorInx ^= 1;
                    sys.setReDraw(kvObj, "altColorInx", kvObj.opts.altColorInx);
                }
            }

        };

        var name = "c~1";
        layouts[name] = {name: name, type: "base", opts: {xc: 5, yc: 1}};
        var name = "c~1~0";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 24, ym: 1, margin: 1}};
        var name = "c~1~1";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 10}};
        var name = "c~1~2";
        layouts[name] = {name: name, type: "base", opts: {xc: 2, yc: 10}};
        var name = "c~1~3";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 3}};
        var name = "c~1~4";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 3}};
        //=====================================
        lyMap.set("mainBody0", "c~1~0");
        lyMap.set("mainBody1", "c~1~1");
        lyMap.set("mainBody2", "c~1~2");
        lyMap.set("mainBody3", "c~1~3");
        lyMap.set("mainBody4", "c~1~4");


        var inx = 0;


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "label~sys";
        comps[cname] = {name: "testLabel", type: "label~sys", opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "label~sys";
        opts.preText = "pre";
        comps[cname] = {name: "testLabel", type: "label~sys", opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "button~sys";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "button~sys";
        opts.preText = "pre";
        comps[cname] = {name: "", type: "button~sys", opts: opts};


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.disable_f = 1;
        opts.innerText = "button~sys,disable";
        opts.maxByte = 20;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~text", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        opts.afterText = "aft";
        comps[cname] = {name: "", type: "input~text", opts: opts};


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~radio", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.editValue = 1;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~radio", opts: opts};


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        opts.preText = "456";
        comps[cname] = {name: "", type: "input~radio", opts: opts};


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~checkbox", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~color", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~number", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~password", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~date", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~datetime-local", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~email", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~month", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~range", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~tel", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~time", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.selectInx = 2;
        opts.options = [];
        opts.options.push("Select 0");
        opts.options.push("Select 1");
        opts.options.push("Select 2");
        opts.options.push("Select 3");
        opts.options.push("Select 4");
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "select~sys", opts: opts};


        //========================================
        var cname = lyMap.get("mainBody1") + "~" + 0;
        var opts = {};
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 1;
        var opts = {};
        opts.afterText = "Sec";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#ccc";
        opts.fontSize = "0.3rh";
        opts.afterTextWidth = 44;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~text", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 2;
        var opts = {};
        opts.innerText = "";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#ccc";
        opts.itemWidth = 0;
        opts.afterTextWidth = 50;
        opts.afterText = "0";
        opts.fontSize = "0.3rh";
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~range", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 3;
        var opts = {};
        opts.altColors = ["#f44", "#400"];
        opts.altColorInx = 0;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 4;
        var opts = {};
        opts.altColors = ["#f44", "#400"];
        opts.altColorInx = 1;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 5;
        var opts = {};
        opts.altColors = ["#4f4", "#030"];
        opts.altColorInx = 0;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 6;
        var opts = {};
        opts.altColors = ["#4f4", "#030"];
        opts.altColorInx = 1;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 7;
        var opts = {};
        opts.altColors = ["#88f", "#005"];
        opts.altColorInx = 0;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 8;
        var opts = {};
        opts.altColors = ["#88f", "#005"];
        opts.altColorInx = 1;
        opts.clickFunc = actionFunc;
        opts.innerText = "button~light";
        opts.maxByte = 15;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "lightButton~5", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 0;
        var opts = {};
        opts.altColorInx = 0;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 1;
        var opts = {};
        opts.altColorInx = 1;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 2;
        var opts = {};
        opts.altColorInx = 2;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 3;
        var opts = {};
        opts.innerText = "button";
        opts.fontSize = "fixWidth";
        opts.lpd = 10;
        opts.rpd = 10;
        opts.background = "linear-gradient(#88f,#fff,#88f)";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 4;
        var opts = {};
        opts.innerText = "buttoncccccccccc123";
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 5;
        var opts = {};
        opts.innerText = "";
        opts.backgroundInx = 0;
        opts.backgroundImageUrls = ['./systemResource/downArrow.png'];
        comps[cname] = {name: "", type: "button~sys", opts: opts};



        var itemClickFunc = function (obj) {
            var scrollTop = obj.scrollTop;
            md.modelRefs["testList"].opts.selectInx = obj.index;
            md.modelRefs["testList"].reCreate();
            md.modelRefs["testList"].mdClass.setScroll(scrollTop);
            console.log(obj);
        };
        var cname = lyMap.get("mainBody3") + "~" + 0;
        var opts = {};
        opts.actionFunc = itemClickFunc;
        opts.borderColor = "#444 #000 #000 #444";
        opts.borderWidth = 1;
        opts.listTexts = [];
        for (var i = 0; i < 20; i++) {
            opts.listTexts.push("item " + i);
        }
        models[cname] = {name: "testList", type: "Md_list~dark", opts: opts};



        var cname = lyMap.get("mainBody3") + "~" + 1;
        var opts = {};
        comps[cname] = {name: "", type: "chart~bar", opts: opts};

        var cname = lyMap.get("mainBody3") + "~" + 2;
        var opts = {};
        comps[cname] = {name: "", type: "chart~line", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 0;
        var opts = {};
        opts.chartType = "doughnut";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 1;
        var opts = {};
        opts.chartType = "pie";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 2;
        var opts = {};
        opts.chartType = "polarArea";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};


    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var mesObj = md.compRefs["message"];
        gr.messageKobj = mesObj;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "ani.dispFs", "innerText");
        var sta2Obj = md.compRefs["status2"];
        sys.setInputWatch(sta2Obj, "directName", "gr.status2", "innerText");
        var sta1Obj = md.compRefs["status1"];
        sys.setInputWatch(sta1Obj, "directName", "gr.status1", "innerText");



    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        //===================================
        var opts = {};
        var name = "c";
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 24;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 24;
        layouts[name] = {name: name, type: "base", opts: opts};
        lyMap.set("topMenu", "c~0");
        lyMap.set("body", "c~1");
        lyMap.set("footBar", "c~2");
        //======================================================================
        self.buildPage();
        var cname = lyMap.get("topMenu");
        mac.setMainMenu(md, cname);
        var cname = lyMap.get("footBar");
        mac.setFootBar(layouts, lyMap, comps, cname);
    }
}
//===========================================
class Md_menu {

    static init() {
        var op = gr.modelOpts["Md_menu"] = {};
        var dsc = op["optsDsc"] = {};
        var sobj = op["subOpts"] = {};
        op.menuKexts = {};
        var kexts = [];
        var head = "rootMenu";
        kexts.push(new Kext("menu0", "1234"));
        kexts.push(new Kext("menu1", "2345"));
        kexts.push(new Kext("menu2", "3456"));
        //kexts.push(new Kext("sepLineV", "kvd:sepLineV"));
        kexts.push(new Kext("menu4", "abcd"));
        kexts.push(new Kext("menu5", "4567"));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));

        op.menuKexts[head] = kexts;
        dsc.menuKexts = sys.setOptsSet("menuKexts", "object", "setObject");



        op.fontSize = "0.8rh";
        op.lm = 6;
        op.xm = 5;
        op.tm = 6;
        op.ym = 5;
        op.lpd = 8;
        op.rpd = 8;
        op.popOff_f = 1;
        dsc.popOff_f = sys.setOptsSet("popOff_f", "flag", "inputBoolean");

        op.buttonType = "menu";
        dsc.buttonType = sys.setOptsSetFix("buttonType", "textAlign");
        dsc.buttonType.enum = ["sys", "menu", "menuButton"];



        op.iw = null;
        op.ih = 22;
        op.vhMode = "horizontal";
        dsc.vhMode = sys.setOptsSetFix("vhMode", "textAlign");
        dsc.vhMode.enum = ["horizontal", "vertical"];
        op.propertyWidth = 500;
        op.propertyHeight = 40;

        if ("sys") {
            var obj = sobj["sys"] = {};
            obj.vhMode = "horizontal";
            obj.propertyWidth = 500;
            obj.propertyHeight = 40;
        }
        if ("vertical") {
            var obj = sobj["vertical"] = {};
            obj.vhMode = "vertical";
            obj.propertyWidth = 100;
            obj.propertyHeight = 500;
        }


    }
    constructor() {
        this.popOnCnt = 0;
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
        return;
        var op = {};
        op.menuKexts = {};
        var kexts = [];
        var head = "rootMenu";

        /*
         kexts.push(new Kext("menu0", "1234"));
         kexts.push(new Kext("menu1", "2345"));
         kexts.push(new Kext("menu2", "3456"));
         kexts.push(new Kext("sepLineV", "kvd:sepLineV"));
         kexts.push(new Kext("menu4", "abcd"));
         kexts.push(new Kext("menu5", "4567"));
         kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
         kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
         kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
         */

        op.menuKexts[head] = kexts;
        op.fontSize = "0.8rh";
        op.lm = 6;
        op.xm = 5;
        op.tm = 6;
        op.ym = 5;
        op.lpd = 8;
        op.rpd = 8;
        op.popOff_f = 1;
        op.buttonType = "menu";
        op.iw = null;
        op.ih = 30;
        op.vhMode = "horizontal";

        return op;
    }
    build(md) {
        var self = this;
        var op = md.opts;
        var layouts = op.layouts;
        if (!op.menuKexts)
            return;
        if (!op.menuKexts["rootMenu"])
            return;


        var opts = {};
        var name = "c";
        if (op.vhMode === "vertical") {
            opts.yc = op.menuKexts["rootMenu"].length;
            opts.xc = 1;
            opts.tm = op.tm;
            opts.ym = op.ym;
            opts.ih = op.ih;
        } else {
            opts.xc = op.menuKexts["rootMenu"].length;
            opts.yc = 1;
            opts.xm = op.xm;
            opts.lm = op.lm;
        }
        opts.color = "#222";
        //opts.borderWidth = 1;
        layouts[name] = {name: name, type: "base", opts: opts};



        //======================================================================
        md.opts.comps = {};
        var comps = md.opts.comps;
        var menuClickFunc = function (actObj) {
            var kvObj = actObj.kvObj;
            var itemId = kvObj.opts.itemId;
            var opts = {};
            opts.kvObj = actObj.kvObj;
            opts.md = md;
            if (!actObj.kvObj.opts.rootMenu) {
                opts.posType = 1;
            } else {
                opts.posType = 0;
                md.stas.deepCnt = 0;
            }
            opts.kexts = md.opts.menuKexts[itemId];
            opts.lpd = 10;
            opts.actionFunc = menuClickFunc;
            opts.popOff_f = md.opts.popOff_f;
            sys.popList(opts);

        };

        var kexts = op.menuKexts["rootMenu"];
        if (!kexts)
            return;

        for (var i = 0; i < kexts.length; i++) {
            var cname = "c~" + i;
            var opts = {};
            var text = Kext.getText(kexts[i]);
            if (text === "kvd:sepLineV") {
                comps[cname] = {name: "menuLabel~" + i, type: "label~sepLineV", opts};
                continue;
            }
            if (text === "kvd:sepLineH") {
                comps[cname] = {name: "menuLabel~" + i, type: "label~sepLineH", opts};
                continue;
            }

            opts.innerText = text;
            opts.itemId = kexts[i].id;
            if (op.setIdObj) {
                if (op.setIdObj[kexts[i].id])
                    opts.baseColor = op.setIdColor;
            }
            opts.rootMenu = 1;
            opts.hint = Kext.getHint(kexts[i]);
            opts.fontSize = op.fontSize;
            opts.lpd = op.lpd;
            opts.rpd = op.rpd;
            opts.textAlign = "center";
            opts.textOverflow = "hidden";
            if (op.iw)
                opts.iw = op.iw;
            opts.clickFunc = menuClickFunc;
            if (op.vhMode === "vertical") {
                opts.shrinkX_f = 0;
                opts.shrinkY_f = 1;
                opts.iw = 0;
                opts.lpd = 0;
                opts.rpd = 0;
            } else {
                opts.shrinkX_f = 1;
                opts.shrinkY_f = 0;
            }
            comps[cname] = {name: kexts[i].id, type: "button~" + op.buttonType, opts};

        }
    }
}
//===========================================
class Md_list {
    static init() {
        var bobj = gr.modelOpts["Md_list"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.listTexts = [];
            for (var i = 0; i < 50; i++)
                obj.listTexts.push("TestString-" + i);
            obj.listTexts[10] = "kvd:sepLineH";
            obj.preTexts = [];
            obj.afterTexts = [];
            obj.ids = [];
            //========================================================
            obj.ih = 24;
            obj.dispNo_f = 0;
            obj.selectInx = -1;
            obj.selectBaseColor = "#000";
            obj.selectTextColor = "#0f0";
            obj.tm = 10;
            obj.bm = 10;
            obj.rm = 0;
            obj.lpd = 8;
            obj.rpd = 0;
            obj.topScroll = 0;
            obj.baseColor = "#222";
            obj.textColor = "#888";
            obj.borderWidth = 1;
            obj.borderColor = "#000";
            obj.sepLineBorderColor = "#000 #888 #888 #000";
        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
            obj.baseColor = "#bbb";
            obj.textColor = "#000";
            obj.sepLineBorderColor = "#000 #fff #fff #000";
        }
        if ("dark") {
            modelOptsFunc(bobj);
            var obj = sobj["dark"] = {};
            obj.baseColor = "#222";
            obj.textColor = "#888";
            obj.sepLineBorderColor = "#000 #888 #888 #000";
        }


    }

    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    setScroll(pos) {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        rootElem.scrollTop = pos;
    }
    getScroll(pos) {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        return rootElem.scrollTop;
    }

    setScrollEnd() {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        var pos = rootElem.scrollHeight - rootElem.clientHeight;
        rootElem.scrollTop = pos;
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    afterCreate() {
        var self = this;
        var md = this.md;
        var elem = document.getElementById(md.stas.rootId);
        var exist = KvLib.scrollVExist(elem);
        if (md.opts.rm) {
            if (!exist) {
                md.opts.rm = 0;
                md.reCreate();
            }
        } else {
            if (exist) {
                md.opts.rm = gr.scrollWidth;
                md.reCreate();
                self.setScroll(this.md.opts.topScroll);
            }
        }


    }

    build(md) {
        this.md = md;

        var op = md.opts;
        var comps = op.comps;
        var models = op.models;
        //===================
        var lyOpts = {};
        var name = "c";
        lyOpts.xc = 1;
        lyOpts.yc = op.listTexts.length;
        lyOpts.ih = op.ih;
        lyOpts.tm = op.tm;
        lyOpts.bm = op.bm;
        lyOpts.overflowY = "auto";
        md.setFarme(lyOpts);
        lyOpts.ihO = {};
        md.opts.layouts[name] = {name: name, type: "base", opts: lyOpts};

        var itemClick = function (actObj) {
            console.log("md_list:");
            console.log(actObj);
            var kvObj = actObj.kvObj;
            if (md.opts.actionFunc) {
                var obj = {};
                obj.act = "itemClick";
                obj.index = parseInt(kvObj.name.split("~")[1]);
                var rootElem = document.getElementById(md.stas.rootId);
                obj.scrollTop = rootElem.scrollTop;
                obj.scrollHeight = rootElem.scrollHeight - rootElem.clientHeight;
                obj.scrollRate = obj.scrollTop / obj.scrollHeight;
                obj.kvObj = kvObj;
                obj.selectText = kvObj.opts.innerText;
                md.opts.actionFunc(obj);
            }
        };
        var index = 0;
        for (var i = 0; i < op.listTexts.length; i++) {
            var opts = {};
            var cname = "c" + "~" + i;
            var istr = KvLib.getKvText(op.listTexts[i], "");
            if (istr === "kvd:sepLineH") {
                md.opts.layouts["c"].opts.ihO["c" + i] = 10;
                opts.baseColor = op.textColor;
                opts.borderColor = op.sepLineBorderColor;
                comps[cname] = {name: "", type: "label~sepLineH", opts: opts};
                continue;
            }
            opts.innerText = op.listTexts[i];
            if (op.dispNo_f) {
                opts.innerText = "" + (index + 1) + ".  " + opts.innerText;
            }
            if (i === op.selectInx) {
                opts.baseColor = op.selectBaseColor;
                opts.innerTextColor = op.selectTextColor;
            } else {
                opts.baseColor = op.baseColor;
                opts.innerTextColor = op.textColor;
            }
            opts.clickFunc = itemClick;
            opts.fontFamily = "monospace";

            if (op.preTexts[i]) {
                opts.preText = op.preTexts[i];
            }
            if (op.afterTexts[i]) {
                opts.afterText = op.afterTexts[i];
            }
            opts.lpd = op.lpd;
            opts.rpd = op.rpd;
            opts.rm = op.rm;
            opts.lm = op.lm;
            opts.itemId = op.ids[i];
            comps[cname] = {name: "mdList~" + i, type: "button~item", opts: opts};
            index++;
        }
        //======================================================================
    }
}
//===========================================
class Md_system {
    constructor() {
        this.stackCnt = 0;
        this.kvObjs = [];

    }
    initOpts(md) {
        this.md = md;
        var obj = {};
        return obj;
    }

    popMaskOn(op) {
        var maskClickFunc = function () {
            gr.mdSystem.mdClass.popOff(2);
        };
        var opts = {};
        if (op.clickFunc)
            opts.clickFunc = op.clickFunc;
        var comp = new Component("mask" + this.stackCnt, "plate~mask", opts, {});
        var opts = {};
        opts.kvObj = comp;
        gr.mdSystem.mdClass.popOn(opts);
    }

    popOn(_opts) {
        var opts = {
            kvObj: null,
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            shadow_f: 0,
            center_f: 0
        };
        KvLib.coverObject(opts, _opts);

        if (this.stackCnt >= 16) {
            console.error("Pop panel stack over flow !!!");
            return;
        }
        var cname = "c~" + this.stackCnt;
        var rects = this.md.layouts["c"].stas.lyRects;
        for (var i = 0; i < rects.length; i++) {
            if (rects[i].name === cname) {
                rects[i].w = gr.clientW;
                rects[i].h = gr.clientH;
                if (opts.w < 0)
                    rects[i].w += opts.w;
                if (opts.h < 0)
                    rects[i].h += opts.h;
                if (opts.w > 0)
                    rects[i].w = opts.w;
                if (opts.h > 0)
                    rects[i].h = opts.h;
                if (!opts.center_f) {
                    rects[i].x = 1000 + opts.x;
                    rects[i].y = opts.y;
                } else {
                    rects[i].x = 999 + ((gr.clientW - rects[i].w) / 2) | 0;
                    rects[i].y = ((gr.clientH - rects[i].h) / 2) | 0;

                }
                rects[i].z = this.stackCnt;
                rects[i].style = "user";
                if (opts.kvObj) {
                    //opts.kvObj.build();
                    /*
                     var op = {};
                     if (opts.shadow_f) {
                     op.outsideShadowBlur = 10;
                     op.outsideShadowOffx = 10;
                     op.outsideShadowOffy = 10;
                     op.outsideShadowColor = "#000";
                     }
                     op.borderWidth = 1;
                     op.borderColor = "#fff #777 #777 #fff";
                     op.baseColor = opts.kvObj.opts.baseColor;
                     */
                    if (opts.kvObj.constructor.name === "Model") {
                        var lyopts = opts.kvObj.opts;
                        lyopts.borderWidth = opts.kvObj.opts.borderWidth;
                        lyopts.outsideShadowBlur = 5;
                        lyopts.outsideShadowOffx = 10;
                        lyopts.outsideShadowOffy = 10;
                        lyopts.outsideShadowColor = "#000";
                        lyopts.borderColor = "#fff #777 #777 #fff";
                        lyopts.baseColor = opts.kvObj.opts.baseColor;
                        lyopts.zIndex = this.stackCnt;
                    }
                    opts.kvObj.opts.zIndex = this.stackCnt;
                    var mdObj = this.md.reCreate(cname, opts.kvObj);
                    break;
                }
            }

        }
        this.stackCnt++;
        return mdObj;
    }
    getLastKvObj() {
        if (!this.stackCnt)
            return;
        return  this.kvObjs[(this.stackCnt - 1)];

    }

    popOff(times) {
        if (!times)
            times = 1;
        while (times) {
            if (this.stackCnt <= 0) {
                return;
            }
            this.stackCnt--;
            var cname = "c~" + this.stackCnt;
            this.md.clear(cname);
            times--;
        }
    }

    build(md) {

        md.lyMap = new Map();
        var op = md.opts;
        var cs = md.kvCs;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        //===================
        var lyOpts = {};
        var name = "c";

        lyOpts.xc = 4;
        lyOpts.yc = 4;
        lyOpts.overflowX = "visible";
        lyOpts.overflowY = "visible";
        lyOpts.color = "#222";
        lyOpts.borderColor = "#fff #000 #000 #fff";
        lyOpts.borderWidth = 1;
        lyOpts.outsideShadowBlur = 5;
        lyOpts.outsideShadowOffx = 10;
        lyOpts.outsideShadowOffy = 10;
        lyOpts.outsideShadowColor = "#000";
        lyOpts.zIndex = 100;

        md.opts.layouts[name] = {name: name, type: "base", opts: lyOpts};


        for (var i = 0; i < 16; i++) {
            var cname = "c" + "~" + i;
            var opts = {};
            opts.zIndex = i;
            comps[cname] = {name: "", type: "plate~popMenu", opts: opts};
        }
        //======================================================================
    }
}



class Md_setArray {
    static init() {
        var obj = gr.modelOpts["Md_setArray"] = {};
        var dsc = obj["optsDsc"] = {};
        var sobj = obj["subOpts"] = {};

        obj.propertyWidth = 500;
        obj.propertyHeight = 500;
        obj.arrayName = "ArrayName";
        dsc.arrayName = sys.setOptsSet("arrayName", "str", "inputText");
        obj.borderColor = "#fff";
        obj.borderWidth = 1;
        obj.readOnly_f = 0;
        //===================
        obj.menuSelectClear_f = 1;
        dsc.menuSelectClear_f = sys.setOptsSet("menuSelectClear_f", "flag", "inputBoolean");
        obj.menuSelectAll_f = 1;
        dsc.menuSelectAll_f = sys.setOptsSet("menuSelectAll_f", "flag", "inputBoolean");
        obj.menuNew_f = 1;
        dsc.menuNew_f = sys.setOptsSet("menuNew_f", "flag", "inputBoolean");
        obj.menuDelete_f = 1;
        dsc.menuDelete_f = sys.setOptsSet("menuDelete_f", "flag", "inputBoolean");
        obj.menuMoveUp_f = 1;
        dsc.menuMoveUp_f = sys.setOptsSet("menuMoveUp_f", "flag", "inputBoolean");
        obj.menuMoveDown_f = 1;
        dsc.menuMoveDown_f = sys.setOptsSet("menuMoveDown_f", "flag", "inputBoolean");
        obj.newInput_f = 0;
        dsc.newInput_f = sys.setOptsSet("newInput_f", "flag", "inputBoolean");
        obj.setObj = {};
        dsc.setObj = sys.setOptsSet("setObj", "object", "setObject");
        InitOpts.getSetObjDsc(dsc);


        obj.end = 0;

        obj.values = [];


        //var sobj=sys.setOptsSet("offOn_f", "flag", "inputBoolean")
        //dsc.setObj.sons.push(sys.setOptsSet("offOn_f", "flag", "inputBoolean"));





        for (var i = 0; i < 50; i++) {
            obj.values.push("string " + (i + 1));
        }
        //=====================================
        obj.setObj = {};
        var setObj = obj.setObj;
        setObj.name = "title";
        setObj.value = "";
        setObj.dataType = "str";
        setObj.setType = "inputText";



        if ("sys") {
            var xobj = sobj["sys"] = {};
        }


        return;








    }
    constructor()
    {

    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    menuFunc(obj) {
        var itemId = obj.kvObj.opts.itemId;
        var md = obj.kvObj.fatherMd.fatherMd;
        var op = md.opts;
        console.log(obj);
        console.log(itemId);

        var saveToOptsList = function () {
            var optsList = md.modelRefs["optsList"];
            var setObjs = [];
            var keys = Object.keys(optsList.modelRefs);
            for (var i = 0; i < keys.length; i++)
                setObjs.push(0);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("~");
                if (strA[0] !== "mdEditOptsLine")
                    continue;
                var inx = KvLib.toInt(strA[1], -1);
                if (inx < 0)
                    continue;
                var editObj = optsList.modelRefs[keys[i]];
                setObjs[inx] = editObj.opts.setObj;
            }
            optsList.opts.setObjs = setObjs;
        };

        var tag = "";
        switch (itemId) {
            case "selectAll":
                var tag = "✔";
            case "selectClear":
                saveToOptsList();
                var optsList = md.modelRefs["optsList"];
                console.log(optsList);
                optsList.opts.selects = {};
                //mdEditOptsLine
                for (var key in optsList.compRefs) {
                    var strA = key.split("~");
                    if (strA[0] !== "tagButton")
                        continue;
                    var editLine = optsList.modelRefs[key];
                    var nbut = optsList.compRefs[key];
                    if (!nbut)
                        continue;
                    nbut.opts.preText = tag;
                    nbut.opts.preTextLpd = 4;
                    nbut.opts.preTextAlign = "left";
                    nbut.reCreate();
                    if (tag)
                        optsList.opts.selects[strA[1]] = 1;
                }
                break;
            case "new":
                var newFunc = function (sobj) {
                    var optsList = md.modelRefs["optsList"];
                    var scrollPos = optsList.mdClass.getScroll();
                    var keys = Object.keys(optsList.opts.selects);
                    if (keys.length > 1) {
                        sys.setMessage("Selects can only be one or none !!!", "#f00", 3000);
                        return;
                    }
                    var inx = optsList.opts.setObjs.length;
                    if (keys.length === 1)
                        inx = KvLib.toInt(keys[0], -1);
                    if (inx < 0)
                        return;
                    sobj.inGroup_f = 0;
                    sobj.readOnly_f = md.opts.readOnly_f;
                    //optsList.opts.setObjs.push(sobj);
                    optsList.opts.setObjs.splice(inx, 0, sobj);


                    optsList.opts.selects = {};
                    optsList.reCreate();
                    var optsList = md.modelRefs["optsList"];
                    if (keys.length === 0)
                        optsList.mdClass.setScrollEnd();
                    else {
                        var elem = document.getElementById(optsList.stas.rootId);
                        var nowPos = (inx) * optsList.opts.ih;
                        var setPos = nowPos - elem.clientHeight + optsList.opts.ih;
                        if (setPos < 0)
                            setPos = 0;
                        optsList.mdClass.setScroll(setPos);

                    }

                };


                saveToOptsList();
                if (op.newInput_f) {
                    var func = function (iobj) {
                        console.log(iobj);
                        var sobj = iobj.kvObj.opts.setObjs[0];
                        newFunc(sobj);
                    };
                    op.setObj.readOnly_f = 0;
                    mac.inputLineBox("Input", op.setObj, 1000, func);
                    return;
                }
                var sobj = JSON.parse(JSON.stringify(md.opts.setObj));
                newFunc(sobj);
                return;
            case "delete":
                saveToOptsList();
                var deleteAllFunc = function (iobj) {
                    if (iobj.buttonName !== "YES")
                        return;
                    var optsList = md.modelRefs["optsList"];
                    var scrollPos = optsList.mdClass.getScroll();
                    var chg = 0;
                    for (var i = optsList.opts.setObjs.length - 1; i >= 0; i--) {
                        if (optsList.opts.selects["" + i]) {
                            optsList.opts.setObjs.splice(i, 1);
                            chg = 1;
                        }
                    }
                    optsList.opts.selects = {};
                    if (chg) {
                        optsList.reCreate();
                        var optsList = md.modelRefs["optsList"];
                        optsList.mdClass.setScroll(scrollPos);
                    }
                };
                var optsList = md.modelRefs["optsList"];
                var keys = Object.keys(optsList.opts.selects);
                if (keys.length === 0)
                    break;
                sys.mesBox("cy~warn", 500, "Delete all you selected ?", ["NO", "YES"], deleteAllFunc);
                break;

            case "moveUp":
                saveToOptsList();
                var optsList = md.modelRefs["optsList"];
                var scrollPos = optsList.mdClass.getScroll();
                var keys = Object.keys(optsList.opts.selects);
                if (keys.length < 1 || keys.length > 2) {
                    sys.setMessage("Please select one or two line to move !!!", "#f00", 3000);
                    return;
                }
                var inx = KvLib.toInt(keys[0], -1);
                var inx2 = KvLib.toInt(keys[1], -1);
                if (keys.length === 2) {
                    if (inx < inx2) {
                        inx = KvLib.toInt(keys[1], -1);
                        inx2 = KvLib.toInt(keys[0], -1);
                    }
                } else {
                    inx2 = inx - 1;
                }
                if (inx < 0 || inx2 < 0)
                    return;
                var setObj = optsList.opts.setObjs[inx];
                optsList.opts.setObjs.splice(inx, 1);
                optsList.opts.setObjs.splice(inx2, 0, setObj);
                delete optsList.opts.selects["" + inx];
                if (keys.length === 1)
                    optsList.opts.selects["" + (inx2)] = 1;
                else
                    delete optsList.opts.selects["" + (inx2)];

                optsList.reCreate();
                optsList.mdClass.setScroll(scrollPos);

                var optsList = md.modelRefs["optsList"];
                var elem = document.getElementById(optsList.stas.rootId);
                var nowPos = (inx2) * optsList.opts.ih;
                var prePos = nowPos - elem.clientHeight + optsList.opts.ih;
                if (prePos < 0)
                    prePos = 0;
                if ((nowPos) < scrollPos)
                    optsList.mdClass.setScroll(prePos);
                else
                    optsList.mdClass.setScroll(scrollPos);



                break;
            case "moveDown":
                saveToOptsList();
                var optsList = md.modelRefs["optsList"];
                var scrollPos = optsList.mdClass.getScroll();
                var keys = Object.keys(optsList.opts.selects);

                if (keys.length < 1 || keys.length > 2) {
                    sys.setMessage("Please select one or two line to move !!!", "#f00", 3000);
                    return;
                }
                var inx = KvLib.toInt(keys[0], -1);
                var inx2 = KvLib.toInt(keys[1], -1);
                if (keys.length === 2) {
                    if (inx > inx2) {
                        inx = KvLib.toInt(keys[1], -1);
                        inx2 = KvLib.toInt(keys[0], -1);
                    }
                } else {
                    inx2 = inx + 1;
                }
                if (inx < 0 || inx2 < 0)
                    return;



                if (inx2 === optsList.opts.setObjs.length)
                    return;
                var setObj = optsList.opts.setObjs[inx];
                optsList.opts.setObjs.splice(inx, 1);
                optsList.opts.setObjs.splice(inx2, 0, setObj);
                delete optsList.opts.selects["" + inx];

                if (keys.length === 1)
                    optsList.opts.selects["" + (inx2)] = 1;
                else
                    delete optsList.opts.selects["" + (inx2)];


                optsList.reCreate();
                var optsList = md.modelRefs["optsList"];
                var elem = document.getElementById(optsList.stas.rootId);
                var nowPos = (inx2) * optsList.opts.ih;
                if ((nowPos + optsList.opts.ih) > elem.clientHeight + scrollPos)
                    optsList.mdClass.setScroll(nowPos);
                else
                    optsList.mdClass.setScroll(scrollPos);


                break;
            case "save":
                saveToOptsList();
                sys.popOff(2);
                if (md.opts.actionFunc) {
                    var optsList = md.modelRefs["optsList"];
                    var obj = {};
                    obj.act = "save";
                    obj.setObjs = optsList.opts.setObjs;
                    md.opts.actionFunc(obj);
                }
                break;
            case "esc":
                gr.mdSystem.mdClass.popOff(2);
                break;

        }
    }
    actionFunc(obj) {
        console.log(obj);
        if (obj.act === "click") {
            switch (obj.kvObj.name) {
                case "chgModel":
                    break;
            }
        }
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 9999;
        //==============================
        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.menuKexts = {};
        //==================
        var kexts = [];
        var head = "";
        if (op.menuSelectClear_f)
            kexts.push(new Kext("selectClear", '<i class="gf">&#xe835;</i>', "", {enHint: "Clear All Select"}));
        if (op.menuSelectAll_f)
            kexts.push(new Kext("selectAll", '<i class="gf">&#xe834;</i>', "", {enHint: "Select All"}));
        if (op.menuNew_f)
            kexts.push(new Kext("new", '<i class="gf">&#xe145;</i>', "", {enHint: "New"}));
        if (op.menuDelete_f)
            kexts.push(new Kext("delete", '<i class="gf">&#xe15b;</i>', "", {enHint: "Delete"}));
        if (op.menuMoveUp_f)
            kexts.push(new Kext("moveUp", '<i class="gf">&#xeacf;</i>', "", {enHint: "Move Up"}));
        if (op.menuMoveDown_f)
            kexts.push(new Kext("moveDown", '<i class="gf">&#xead0;</i>', "", {enHint: "Move Down"}));
        kexts.push(new Kext("save", '<i class="gf">&#xe161;</i>', "", {enHint: "Save"}));
        kexts.push(new Kext("esc", '<i class="gf">&#xe14c;</i>', "", {enHint: "Esc"}));
        opts.menuKexts["rootMenu"] = kexts;
        //==================
        opts.actionFunc = self.menuFunc;
        opts.popOff_f = 0;
        opts.buttonType = "menuButton";
        opts.fontSize = "1rh";
        models[cname] = {name: "", type: "Md_menu", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        var fontIcon = Md_editOptsLine.getDataIconFont(op.setObj.dataType);
        if (fontIcon) {
            opts.preTextWidth = "1rh";
            opts.preTextFontSize = "0.8rh";
            opts.preText = fontIcon;
            //opts.lpd = 32;
            opts.innerText = op.arrayName;
        }
        opts.fontWeight = "bold";
        opts.textAlign = "center";


        comps[cname] = {name: "arrayName", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.margin = 0;
        opts.setObjs = [];
        for (var i = 0; i < op.values.length; i++) {
            var sobj = JSON.parse(JSON.stringify(op.setObj));
            sobj.name = op.arrayName + "~" + i;
            sobj.value = KvLib.disJsonString(op.values[i]);
            //sobj.value = op.values[i];
            sobj.readOnly_f = op.readOnly_f;
            opts.setObjs.push(sobj);
        }
        opts.rm = gr.scrollWidth;
        opts.selectAble_f = 1;
        opts.dispNo_f = 1;
        opts.tagWidth = 50;

        models[cname] = {name: "optsList", type: "Md_setList~light", opts: opts};




    }
}
//===========================================




class Md_messageBox {
    static init() {

        var bobj = gr.modelOpts["Md_messageBox"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 600;
        bobj.propertyHeight = 150;
        bobj.title = "Title";
        bobj.titleColor = "#2F2";
        dsc.titleColor = sys.setOptsSetFix("titleColor", "color");
        bobj.baseColor = "#222";
        bobj.borderWidth = 1;
        bobj.borderColor = "#fff";


        bobj.buttons = ["ESC"];
        dsc.buttons = sys.setOptsSet("buttons", "str~array", "inputText");
        bobj.messages = [];
        bobj.messages.push("this is a message1");
        bobj.messages.push("this is a message2");
        dsc.messages = sys.setOptsSet("messages", "str~array", "inputText");

        bobj.lm = 10;
        bobj.tm = 10;
        bobj.rm = 10;
        bobj.bm = 10;
        bobj.titleHeight = 36;
        dsc.titleHeight = sys.setOptsSetFix("titleHeight", "nature999");
        bobj.buttonHeight = 40;
        dsc.buttonHeight = sys.setOptsSetFix("buttonHeight", "nature999");
        bobj.buttonWidth = 100;
        dsc.buttonWidth = sys.setOptsSetFix("buttonWidth", "nature999");

        if ("sys") {
            var obj = sobj["sys"] = {};
        }
    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }

    buttonClickFunc(iobj) {
        console.log(iobj);
        sys.popOff(2);
        var kvObj = iobj.kvObj;
        if (kvObj.fatherMd.opts.actionFunc) {
            iobj.buttonName = kvObj.opts.innerText;
            kvObj.fatherMd.opts.actionFunc(iobj);
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = op.titleHeight;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = op.buttonHeight;
        opts.bm = 4;
        md.setFarme(opts);
        opts.color = op.baseColor;
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = 1;
        opts.yc = op.messages.length;
        opts.lm = op.lm;
        opts.rm = op.rm;
        opts.tm = op.tm;
        opts.bm = op.bm;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("main", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        opts.baseColor = op.titleColor;
        comps[cname] = {name: "title", type: "label~message", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.xm = 10;
        opts.iw = op.buttonWidth;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);

        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("buttonPane") + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = self.buttonClickFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }
        //==================================
        for (var i = 0; i < op.messages.length; i++) {
            var cname = lyMap.get("main") + "~" + i;
            var opts = {};
            opts.innerText = op.messages[i];
            opts.innerTextColor = "#ccc";
            comps[cname] = {name: "message~" + i, type: "plate~none", opts: opts};
        }
    }
}


class Md_viewBox {
    static init() {

        var bobj = gr.modelOpts["Md_viewBox"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 600;
        bobj.propertyHeight = 600;
        
        bobj.title = "Title";
        bobj.baseColor = "#222";
        bobj.borderWidth = 1;
        bobj.borderColor = "#fff";


        bobj.buttons = ["ESC"];
        dsc.buttons = sys.setOptsSet("buttons", "str~array", "inputText");
        bobj.context = "";
        bobj.objName="Md_editorPanel~sys";
        bobj.isModel_f=1;
        bobj.lm = 10;
        bobj.tm = 10;
        bobj.rm = 10;
        bobj.bm = 10;
        bobj.titleHeight = 46;
        dsc.titleHeight = sys.setOptsSetFix("titleHeight", "nature999");
        bobj.buttonWidth = 100;
        dsc.buttonWidth = sys.setOptsSetFix("buttonWidth", "nature999");
        bobj.objOpts = {};


        if ("sys") {
            var obj = sobj["sys"] = {};
        }
    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }

    buttonClickFunc(iobj) {
        console.log(iobj);
        sys.popOff(2);
        var kvObj = iobj.kvObj;
        if (kvObj.fatherMd.opts.actionFunc) {
            iobj.buttonName = kvObj.opts.innerText;
            kvObj.fatherMd.opts.actionFunc(iobj);
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = op.titleHeight;
        opts.ihO.c1 = 9999;
        opts.bm = 4;
        md.setFarme(opts);
        opts.color = op.baseColor;
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc=1+op.buttons.length;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        for(var i=0;i<op.buttons.length;i++)
            opts.iwO["c"+(i+1)]=op.buttonWidth;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        opts.margin=4;
        lyMap.set("titlePane", cname);
        //==============================
        var cname = lyMap.get("titlePane") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        opts.baseColor = op.titleColor;
        opts.innerTextColor="#fff";
        opts.textAlign="left";
        opts.fontSize="0.6rh";
        comps[cname] = {name: "title", type: "plane~none", opts: opts};
        //==============================
        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("titlePane") + "~" + (i+1);
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = self.buttonClickFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }
        //==================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = op.objOpts;
        if(op.isModel_f)
            models[cname] = {name: "vewObj", type: op.objName, opts: opts};
        else    
            comps[cname] = {name: "vewObj", type: op.objName, opts: opts};
        
        
        
        
    }
}




class Md_processBox {
    static init() {
        var bobj = gr.modelOpts["Md_processBox"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 600;
        bobj.propertyHeight = 150;
        bobj.title = "Title";
        bobj.titleColor = "#ccf";
        dsc.titleColor = sys.setOptsSetFix("titleColor", "color");
        bobj.baseColor = "#222";
        bobj.borderWidth = 1;
        bobj.borderColor = "#fff";

        bobj.actionStr = "Start....";
        bobj.actionStatus = "";

        bobj.buttons = ["STOP"];
        dsc.buttons = sys.setOptsSet("buttons", "str~array", "inputText");
        bobj.progressNames = [];
        bobj.progressNames.push("");
        dsc.progressNames = sys.setOptsSet("progressNames", "str~array", "inputText");

        bobj.progressValues = [];
        bobj.progressValues.push(20);
        dsc.progressValues = sys.setOptsSet("progressValues", "number~array", "inputNumber");



        bobj.lm = 10;
        bobj.tm = 10;
        bobj.rm = 10;
        bobj.bm = 10;
        bobj.titleHeight = 30;
        dsc.titleHeight = sys.setOptsSetFix("titleHeight", "nature999");
        bobj.buttonHeight = 30;
        dsc.buttonHeight = sys.setOptsSetFix("buttonHeight", "nature999");
        bobj.buttonWidth = 100;
        dsc.buttonWidth = sys.setOptsSetFix("buttonWidth", "nature999");

        if ("sys") {
            var obj = sobj["sys"] = {};
        }
    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.progressValues = [];
        for (var i = 0; i < op.progressValues.length; i++) {
            st.progressValues.push(op.progressValues[i]);
        }
    }

    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;


        if (st.titleColor !== op.titleColor) {
            st.titleColor = op.titleColor;
            var comp = md.compRefs["title"];
            comp.opts.baseColor = op.titleColor;
            comp.reCreate();
        }

        if (st.actionStr !== op.actionStr) {
            st.actionStr = op.actionStr;
            var comp = md.compRefs["action"];
            comp.opts.innerText = op.actionStr;
            comp.reCreate();
        }

        if (st.actionStatus !== op.actionStatus) {
            st.actionStatus = op.actionStatus;
            if (op.actionStatus === "ok") {
                var comp = md.compRefs["button~" + 0];
                comp.opts.innerText = "OK";
                comp.reCreate();
                return;
            }
            if (op.actionStatus === "error") {
                var comp = md.compRefs["button~" + 0];
                comp.opts.innerText = "ESC";
                comp.reCreate();
            }
        }


        if (op.progressValues[i] === 100) {
            var comp = md.compRefs["button~" + 0];
            comp.opts.innerText = "OK";
            comp.reCreate();
        }

        for (var i = 0; i < op.progressValues.length; i++) {
            if (st.progressValues[i] !== op.progressValues[i]) {
                st.progressValues[i] = op.progressValues[i];
                var comp = md.compRefs["progress~" + i];
                comp.opts.progressValue = op.progressValues[i];
                comp.opts.afterText = st.progressValues[i] + "%";
                comp.reCreate();
            }
        }
        st.actionStatus = op.actionStatus;
        st.actionStr = op.actionStr;
    }

    buttonClickFunc(iobj) {
        console.log(iobj);
        sys.popOff(2);
        var kvObj = iobj.kvObj;
        if (kvObj.fatherMd.opts.actionFunc) {
            iobj.buttonName = kvObj.opts.innerText;
            kvObj.fatherMd.opts.actionFunc(iobj);
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = op.titleHeight;
        opts.ihO.c1 = 20;
        opts.ihO.c2 = 9999;
        opts.ihO.c3 = op.buttonHeight;
        opts.bm = 4;
        opts.ym = 4;
        md.setFarme(opts);
        opts.color = op.baseColor;
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 1;
        opts.yc = op.progressNames.length;
        opts.lm = op.lm;
        opts.rm = op.rm;
        opts.tm = op.tm;
        opts.bm = op.bm;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("main", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        opts.baseColor = op.titleColor;
        comps[cname] = {name: "title", type: "label~message", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.innerText = op.actionStr;
        opts.innerTextColor = "#ccc";
        opts.textAlign = "center";
        comps[cname] = {name: "action", type: "platel~sys", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.xm = 10;
        opts.iw = op.buttonWidth;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);


        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("buttonPane") + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = self.buttonClickFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }
        //==================================
        for (var i = 0; i < op.progressNames.length; i++) {
            var cname = lyMap.get("main") + "~" + i;
            var opts = {};
            opts.preText = op.progressNames[i];
            opts.progressValue = op.progressValues[i];
            opts.afterText = opts.progressValue + "%";
            comps[cname] = {name: "progress~" + i, type: "progress~sys", opts: opts};
        }
    }
}



//===========================================
class Md_inputLineBox {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var obj = {};
        obj.title = "Title";
        obj.titleColor = "#222";
        obj.buttons = ['<i class="gf">&#xeacf;</i>', "ESC", "OK", '<i class="gf">&#xead0;</i>'];
        obj.setObjs = [];
        for (var i = 0; i < 8; i++) {
            var setObj = sys.getOptsSet("text", "");
            setObj.name = "TestName " + i;
            setObj.titleWidth = 240;
            obj.setObjs.push(setObj);
        }
        obj.lm = 10;
        obj.tm = 10;
        obj.rm = 10;
        obj.bm = 10;
        obj.rowCount = 12;
        obj.pageCnt = 0;
        obj.titleHeight = 40;
        obj.buttonHeight = 40;
        obj.buttonWidth = 100;
        obj.borderColor = "#ccc";
        obj.borderWidth = 2;
        obj.baseColor = "#ccc";
        obj.ih = 0;
        obj.tagOn_f = 1;
        return obj;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var setList = md.modelRefs["optsList"];
        var editLine0 = setList.modelRefs["mdEditOptsLine~0"];
        if (!editLine0)
            return;
        var inputObj = editLine0.compRefs["input"];
        if (inputObj) {
            var inputElem = inputObj.elems["input"];
            inputElem.focus();
        }



    }
    buttonClickFunc(iobj) {
        console.log(iobj);
        sys.popOff(2);
        var kvObj = iobj.kvObj;
        if (kvObj.fatherMd.opts.actionFunc) {
            iobj.buttonName = kvObj.opts.innerText;
            kvObj.fatherMd.opts.actionFunc(iobj);
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================   
        var pageAll = ((op.setObjs.length - 1) / op.rowCount) | 0;
        pageAll += 1;
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            var strA = name.split("~");
            if (strA[0] === "mdEditOptsLine") {
                var inx = parseInt(strA[1]);
                inx += op.pageCnt * op.rowCount;
                op.setObjs[inx].value = iobj.value;
                if (iobj.act !== "pressEnter")
                    return;
                var setList = md.modelRefs["optsList"];
                var editLine0 = setList.modelRefs["mdEditOptsLine~" + (inx + 1)];
                if (editLine0) {
                    var inputObj = editLine0.compRefs["input"];
                    if (inputObj) {
                        var inputElem = inputObj.elems["input"];
                        inputElem.focus();
                    }
                } else {
                }
                if (op.setObjs.length !== 1)
                    return;
                name = "button~2";
            }
            if (name === "button~3") {//pageDown
                if (op.pageCnt < (pageAll - 1)) {
                    op.pageCnt++;
                    md.reCreate();
                    return;
                }
            }
            if (name === "button~0") {//pageDown
                if (op.pageCnt > 0) {
                    op.pageCnt--;
                    md.reCreate();
                    return;
                }
            }
            if (name === "button~1") {//esc
                sys.popOff(2);
                return;
            }
            if (name === "button~2") {//ok
                var setObjs = md.opts.setObjs;
                sys.popOff(2);
                if (md.opts.actionFunc) {
                    var oobj = {};
                    oobj.act = "valueChange";
                    oobj.kvObj = md;
                    var vobj = {};
                    for (var i = 0; i < md.opts.setObjs.length; i++) {
                        var value=md.opts.setObjs[i]['value'];
                        if(value===null)
                            value="";
                        if (md.opts.setObjs[i]['id'])
                            vobj[md.opts.setObjs[i]['id']] = value;
                        else
                            vobj[md.opts.setObjs[i]['name']] = value;
                    }
                    oobj.value = vobj;
                    md.opts.actionFunc(oobj);
                }
            }
        };
        //=====================================
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        if (op.title)
            opts.ihO.c0 = op.titleHeight;
        else
            opts.ihO.c0 = 0;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = op.buttonHeight;
        opts.margin = 2;
        opts.bm = 4;
        opts.ym = 4;
        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        //opts.textAlign = "center";
        opts.fontWeight = "bold";
        opts.baseColor = "#ccc";
        comps[cname] = {name: "title", type: "plate~sys", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 6;
        opts.xm = 10;
        //opts.iw = op.buttonWidth;
        //opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);


        if (pageAll > 1) {
            var cname = lyMap.get("buttonPane") + "~" + 0;
            var opts = {};
            opts.innerText = "" + (op.pageCnt + 1) + "/" + pageAll;
            comps[cname] = {name: "pageLabel", type: "plate~none", opts: opts};

            var cname = lyMap.get("buttonPane") + "~" + 5;
            var opts = {};
            opts.innerText = "" + (op.pageCnt * op.rowCount + 1) + "/" + op.setObjs.length;
            comps[cname] = {name: "itemLabel", type: "plate~none", opts: opts};
        }

        for (var i = 0; i < op.buttons.length; i++) {
            if (pageAll <= 1) {
                if (i === 0 || i === 3)
                    continue;
            }
            var cname = lyMap.get("buttonPane") + "~" + (i + 1);
            var opts = {};

            if (op.pageCnt === 0 && i === 0)
                opts.disable_f = 1;
            if (op.pageCnt === (pageAll - 1) && i === 3)
                opts.disable_f = 1;

            opts.innerText = op.buttons[i];
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }
        //==================================

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.margin = 0;
        opts.setObjs = [];
        var inx = op.pageCnt * op.rowCount;
        opts.noOffset = inx;
        for (var i = 0; i < op.rowCount; i++) {
            if (inx >= op.setObjs.length)
                break;
            opts.setObjs.push(op.setObjs[inx]);
            inx++;
        }

        //opts.rm = gr.scrollWidth;
        opts.selectAble_f = 0;
        opts.tagOn_f = op.tagOn_f;
        opts.tagWidth = 40;
        opts.ih = op.ih;
        opts.rowCount = op.rowCount;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "optsList", type: "Md_setList~light", opts: opts};






    }
}









//===========================================
class Md_colorPicker {
    static init() {
        var bobj = gr.modelOpts["Md_colorPicker"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 300;
        bobj.propertyHeight = 500;
        bobj.color = "#000";
        bobj.cr = 0;
        dsc.cr = sys.setOptsSetFix("cr", "nature255");
        bobj.cg = 0;
        dsc.cg = sys.setOptsSetFix("cg", "nature255");
        bobj.cb = 0;
        dsc.cb = sys.setOptsSetFix("cb", "nature255");
        bobj.opacity = 1;
        dsc.opacity = sys.setOptsSetFix("opacity", "float01");
        bobj.borderWidth = 1;
        bobj.borderColor = "#fff";
        bobj.end = 0;
        bobj.nullOk_f = 1;
        bobj.colorTable = [
            "#000", "#222", "#444", "#666", "#888", "#999",
            "#aaa", "#bbb", "#ccc", "#ddd", "#eee", "#fff",
            "#400", "#800", "#c00", "#f00", "#440", "#880",
            "#040", "#080", "#0c0", "#0f0", "#cc0", "#ff0",
            "#005", "#008", "#00c", "#00f", "#088", "#0ff"
        ];
        if ("sys") {
            var obj = sobj["sys"] = {};
        }

    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        var kvObj = iobj.kvObj;
        var act = iobj.act;
        var name = kvObj.name;
        var md = kvObj.fatherMd;
        var self = md.mdClass;
        var op = md.opts;
        if (act === "pressEnter") {
            var colorInputObj = md.compRefs["colorInput"];
            var colorInputElem = colorInputObj.elems["input"];
            var colorStr = colorInputElem.value;
            if (colorStr === "" && op.nullOk_f) {
                KvLib.exe(md.opts.actionFunc, colorStr);
                sys.popOff(2);
                return;
            }
            var colorObj = KvLib.transColor(colorStr);
            if (!colorObj) {
                sys.mesBox("cr~Error", 500, "Input Error !!!");
                self.setColor();
                return;
            }
            var colorStr = KvLib.transColorStr(colorObj.r, colorObj.g, colorObj.b, op.opacity);
            KvLib.exe(md.opts.actionFunc, colorStr);
            sys.popOff(2);
        }

        if (act === "click") {
            if (name === "escButton") {
                sys.popOff(2);
                return;
            }
            if (name === "okButton") {
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(md.opts.actionFunc, colorStr);
                sys.popOff(2);
                return;
            }
            var strA = name.split("~");
            if (strA[0] === "colorButton") {
                var inx = KvLib.toInt(strA[1], 0);
                var strColor = md.opts.colorTable[inx];
                self.transColor(strColor);
                self.setColor();
                sys.popOff(2);
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(md.opts.actionFunc, colorStr);
                return;
            }
        }
        if (act === "valueChange") {
            if (name === "colorRed")
                md.opts.cr = KvLib.parseNumber(iobj.value);
            if (name === "colorGreen")
                md.opts.cg = KvLib.parseNumber(iobj.value);
            if (name === "colorBlue")
                md.opts.cb = KvLib.parseNumber(iobj.value);
            if (name === "opacity")
                md.opts.opacity = KvLib.parseNumber(iobj.value);
            if (name === "colorInput") {
                self.transColor(iobj.value);
            }
            self.setColor();
        }
    }

    transColor(colorStr) {
        var md = this.md;
        var op = md.opts;
        var cobj = KvLib.transColor(colorStr);
        op.cr = cobj.r;
        op.cg = cobj.g;
        op.cb = cobj.b;
        if (cobj.a !== undefined)
            op.opacity = cobj.a;
    }
    setColor() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var rgb = "rgb(" + op.cr;
        rgb += "," + op.cg;
        rgb += "," + op.cb + ")";
        var kvObj = md.compRefs["nowColor"];
        var elem = kvObj.elems["base"];
        elem.style.backgroundColor = rgb;
        var kvObj = md.compRefs["colorRed"];
        kvObj.opts.afterText = "" + op.cr;
        sys.setReDraw(kvObj, "editValue", op.cr);
        var kvObj = md.compRefs["colorGreen"];
        kvObj.opts.afterText = "" + op.cg;
        sys.setReDraw(kvObj, "editValue", op.cg);
        var kvObj = md.compRefs["colorBlue"];
        kvObj.opts.afterText = "" + op.cb;
        sys.setReDraw(kvObj, "editValue", op.cb);

        var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb);
        var kvObj = md.compRefs["colorInput"];
        sys.setReDraw(kvObj, "editValue", colorStr);



        //var elem = kvObj.elems["input"];
        //elem.value=op.cr;

    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 7;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 40;
        opts.ihO.c2 = 40;
        opts.ihO.c3 = 40;
        opts.ihO.c4 = 40;
        opts.ihO.c5 = 9999;
        opts.ihO.c6 = 30;
        opts.ymO = {c0: 10};
        opts.ym = 4;
        opts.margin = 2;

        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.iwO = {};
        opts.iwO.c0 = 50;
        opts.iwO.c1 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line0", cname);
        //===
        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        opts.innerText = "color:";
        //opts.baseColor="#222";
        opts.innerTextColor = "#fff";
        //comps[cname] = {name: "colorText", type: "plate~none", opts: opts};


        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        if (!op.color)
            op.color = "#000";
        var cobj = KvLib.transColor(op.color);
        if (!cobj)
            cobj = {r: 0, g: 0, b: 0};
        op.cr = cobj.r;
        op.cg = cobj.g;
        op.cb = cobj.b;
        if (cobj.a === undefined)
            op.opacity = 1;
        else
            op.opacity = cobj.a;
        opts.baseColor = op.color;
        opts.margin = 2;
        comps[cname] = {name: "nowColor", type: "plate~none", opts: opts};



        var cname = lyMap.get("line0") + "~" + 1;
        var opts = {};
        opts.editValue = op.color;
        opts.preText = "";
        opts.actionFunc = self.actionFunc;
        comps[cname] = {name: "colorInput", type: "input~text", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.preText = "Red";
        opts.preTextLine2_f = 1;
        opts.preTextTextColor = "#fff";
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#f00";
        opts.afterTextWidth = 60;
        opts.afterTextFontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cr;
        opts.afterText = "" + opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorRed", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.preText = "Green";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#0f0";
        opts.afterTextWidth = 60;
        opts.afterTextFontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cg;
        opts.afterText = "" + opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorGreen", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.preText = "Blue";
        opts.preTextTextColor = "#fff";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#00f";
        opts.afterTextWidth = 60;
        opts.afterTextFontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cb;
        opts.afterText = "" + opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorBlue", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 4;
        var opts = {};
        opts.preText = "Opacity";
        opts.preTextTextColor = "#fff";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.3rh";
        opts.preTextBackgroundColor = "#888";
        opts.afterTextWidth = 60;
        opts.afterTextFontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.opacity * 100;
        opts.afterText = op.opacity;
        opts.mulRate = 0.01;
        opts.fixed = 2;
        comps[cname] = {name: "opacity", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 5;
        var opts = {};
        opts.xc = 6;
        opts.yc = 5;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line5", cname);
        //===
        for (var i = 0; i < 30; i++) {
            var cname = lyMap.get("line5") + "~" + i;
            var opts = {};
            opts.baseColor = op.colorTable[i];
            opts.insideShadowBlur = 0;
            opts.clickFunc = self.actionFunc;
            opts.innerText = "";
            comps[cname] = {name: "colorButton~" + i, type: "button~sys", opts: opts};
        }

        //===============================
        var cname = lyMap.get("body") + "~" + 6;
        var opts = {};
        opts.xc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line6", cname);
        //===
        var cname = lyMap.get("line6") + "~" + 0;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = self.actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};

        var cname = lyMap.get("line6") + "~" + 1;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = self.actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        //==============================

    }
}





//===========================================
class Md_filePicker {
    static init() {
        var bobj = gr.modelOpts["Md_filePicker"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};

        bobj.propertyWidth = 0;
        bobj.propertyHeight = 0;
        var options = bobj.dirOptions = [];
        //options.push("systemResource");
        options.push("user-keyboardOled");
        dsc.dirOptions = sys.setOptsSet("dirOptions", "str~array", "inputText");


        var options = bobj.filterOptions = [];
        options.push("*jpg, *.bmp, *.png");
        options.push("*.txt");
        options.push("*.pdf");
        options.push("*.*");
        dsc.filterOptions = sys.setOptsSet("filterOptions", "str~array", "inputText");


        bobj.dirInx = 0;
        dsc.dirInx = sys.setOptsSetFix("dirInx", "nature");
        bobj.filterInx = 0;
        dsc.filterInx = sys.setOptsSetFix("filterInx", "nature");

        //obj.kvObjType="txt";
        bobj.urls = [];
        bobj.end = 1;
        bobj.kvObjType = "image";


        if ("sys") {
            var obj = sobj["sys"] = {};
        }

    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var md = this.md;
        var dirObj = md.compRefs["dirButton"];
        var dirName = dirObj.opts.options[dirObj.opts.selectInx];
        var filterObj = md.compRefs["filterButton"];
        var filterName = filterObj.opts.options[filterObj.opts.selectInx];
        var reload = 0;
        if (gr.urlSelectObj.dirName !== dirName)
            reload = 1;
        if (gr.urlSelectObj.filterName !== filterName)
            reload = 1;
        if (reload) {
            gr.urlSelectObj.dirName = dirName;
            gr.urlSelectObj.filterName = filterName;
            this.reloadFileNames(dirName, filterName);
        } else {
            this.reloadFileNames(dirName, filterName, gr.urlSelectObj.urls);
        }
    }
    reloadFileNames(dirName, filterName, urls) {
        var md = this.md;
        var fileLoaded = function (iobj) {
            iobj.sort();
            gr.urlSelectObj.urls = JSON.parse(JSON.stringify(iobj));
            var mdList = md.modelRefs["fileList"];
            mdList.opts.listTexts = [];
            for (var i = 0; i < iobj.length; i++) {
                mdList.opts.listTexts.push(iobj[i]);
            }
            mdList.opts.selectInx = -1;
            mdList.reCreate();
        };
        if (urls) {
            fileLoaded(urls);
            return;
        }
        gr.serverCallBack = fileLoaded;
        Test.server_readFileNames("response error", "exeCallBackFunc", dirName, filterName);
    }

    build(md) {
        var actionFunc = function (iobj) {
            console.log("md_filePicker:");
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "itemClick") {
                var mdList = iobj.kvObj.fatherMd;
                var scrollTop = iobj.scrollTop;
                mdList.opts.selectInx = iobj.index;
                mdList.reCreate();
                mdList.mdClass.setScroll(scrollTop);
                var fileNameObj = md.compRefs["fileName"];
                var dirObj = md.compRefs["dirButton"];
                var dirName = dirObj.opts.options[dirObj.opts.selectInx];
                var path = dirName + "/" + iobj.selectText;
                sys.setReDraw(fileNameObj, "innerText", path);

                var vKvObj = md.modelRefs["viewKvObj"];
                var strA = iobj.selectText.split(".");
                var exName = strA[strA.length - 1];

                var flag = 1;
                while (1) {
                    if (exName === "js" || exName === "css" || exName === "html")
                        break;
                    if (exName === "txt" || exName === "xml" || exName === "json")
                        break;
                    flag = 0;
                    break;
                }
                if (flag) {
                    vKvObj.opts.kvObjType = "w3doc";
                    vKvObj.opts.modelSet = "Component";
                    vKvObj.opts.templateSet = "editor";
                    vKvObj.opts.typeSet = "sys";
                    vKvObj.opts.iw = null;
                    vKvObj.opts.ih = null;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#333";
                    vKvObj.reCreate();
                    return;
                }


                if (exName === "pdf") {
                    vKvObj.opts.kvObjType = "txt";
                    vKvObj.opts.exName = exName;
                    vKvObj.opts.modelSet = "Component";
                    vKvObj.opts.templateSet = "urlReader";
                    vKvObj.opts.typeSet = "sys";

                    vKvObj.opts.iw = null;
                    vKvObj.opts.ih = null;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#fff";
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    vKvObj.reCreate();
                    return;
                }
                if (exName === "mp4") {
                    vKvObj.opts.kvObjType = "video";
                    vKvObj.opts.exName = exName;
                    vKvObj.opts.modelSet = "Component";
                    vKvObj.opts.templateSet = "video";
                    vKvObj.opts.typeSet = "sys";


                    vKvObj.opts.iw = null;
                    vKvObj.opts.ih = null;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#000";
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    vKvObj.reCreate();
                    return;
                }

                if (exName === "bmp" || exName === "jpg" || exName === "png") {
                    var retFunc = function (obj) {
                        console.log(obj);
                        var ly = md.layoutRefs["c~1"];
                        var rect = ly.stas.lyRects["0"];
                        var ww = obj.w;
                        var hh = obj.h;
                        if (ww > rect.w || hh > rect.h) {
                            if (obj.w)
                                var w = rect.w;
                            var h = rect.h;
                            var rate = obj.w / obj.h;
                            ww = h * rate;
                            hh = h;
                            if (ww > w) {
                                ww = w;
                                hh = ww / rate;
                            }
                        }
                        vKvObj.opts.iw = ww | 0;
                        vKvObj.opts.ih = hh | 0;
                        vKvObj.opts.modelSet = "Component";
                        vKvObj.opts.templateSet = "plate";
                        vKvObj.opts.typeSet = "none";



                        vKvObj.opts.kvObjType = "image";
                        var kvObjOpts = vKvObj.opts.kvObjOpts;
                        kvObjOpts.backgroundImageUrls = [path];
                        kvObjOpts.backgroundInx = 0;
                        kvObjOpts.baseColor = "#222";
                        kvObjOpts.borderWidth = 1;
                        kvObjOpts.exName = exName;
                        vKvObj.reCreate();

                        var dirObj = md.compRefs["fileName"];
                        var rate = "" + ((ww * 100 / obj.w) | 0) + "% ";
                        dirObj.opts.afterText = rate + "size: " + obj.w + "x" + obj.h;
                        dirObj.opts.afterTextRpd = 10;
                        dirObj.reCreate();
                        return;
                    };

                    KvLib.getImageSize(path, retFunc);
                }
                return;
            }
            if (iobj.act === "valueChange") {
                var mdList = md.modelRefs["fileList"];
                mdList.opts.listTexts = [];
                mdList.opts.selectInx = -1;
                mdList.reCreate();
                var fileNameObj = md.compRefs["fileName"];
                fileNameObj.opts.innerText = "";
                fileNameObj.opts.afterText = "";
                fileNameObj.reCreate();
                var vKvObj = md.modelRefs["viewKvObj"];
                vKvObj.opts.iw = null;
                vKvObj.opts.ih = null;
                vKvObj.opts.modelSet = "Component";
                vKvObj.opts.templateSet = "plate";
                vKvObj.opts.typeSet = "none";


                vKvObj.opts.kvObjType = "image";
                var kvObjOpts = vKvObj.opts.kvObjOpts;
                kvObjOpts.backgroundImageUrls = [];
                kvObjOpts.backgroundInx = null;
                vKvObj.reCreate();
                return;
            }
            if (iobj.act === "click") {
                sys.popOff(2);
                if (name === "okButton") {
                    var fileNameObj = md.compRefs["fileName"];
                    if (fileNameObj.opts.innerText !== "")
                        KvLib.exe(md.opts.actionFunc, fileNameObj.opts.innerText);
                    return;
                }
                if (name === "clearButton") {
                    KvLib.exe(md.opts.actionFunc, "");
                    return;
                }
            }
            return;
        };

        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 4;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 80;
        opts.iwO.c2 = 80;
        opts.iwO.c3 = 80;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line0", cname);
        //======================================================================
        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.textAlign = "center";
        //opts.preTextWidth = 50;
        opts.preText = "File: ";
        //opts.lpd = 58;
        comps[cname] = {name: "fileName", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("line0") + "~" + 1;
        var opts = {};
        opts.innerText = "Clear";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "clearButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("line0") + "~" + 2;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("line0") + "~" + 3;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 400;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line1", cname);
        //======================================================================
        var cname = lyMap.get("line1") + "~" + 0;
        var opts = {};
        opts.iw = null;
        opts.ih = null;
        var kop = opts.kvObjOpts = {};
        if (op.kvObjType === "image") {
            opts.modelSet = "Component";
            opts.templateSet = "plate";
            opts.typeSet = "none";
            kop.backgroundImageUrls = [];
            kop.baseColor = "rgba(0,0,0,0)";
            kop.borderWidth = 1;
            kop.borderColor = "#888";
        }
        if (op.kvObjType === "txt") {
            opts.modelSet = "Component";
            opts.templateSet = "urlReader";
            opts.typeSet = "sys";
            kop.urls = [];
            kop.urlsInx = 0;
            kop.baseColor = "#fff";
        }

        if (op.kvObjType === "w3doc") {
            opts.modelSet = "Component";
            opts.templateSet = "editor";
            opts.typeSet = "sys";
            kop.baseColor = "#333";
        }
        models[cname] = {name: "viewKvObj", type: "Md_viewKvObj~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("line1") + "~" + 1;
        var opts = {};
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 24;
        opts.ihO.c3 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("filePanel", cname);
        //======================================================================
        var cname = lyMap.get("filePanel") + "~" + 0;
        var opts = {};
        opts.preText = "Folder";
        opts.preTextWidth = 100;
        opts.preTextAlign = "left";
        opts.options = op.dirOptions;
        opts.selectInx = op.dirInx;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "dirButton", type: "select~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("filePanel") + "~" + 1;
        var opts = {};
        opts.preText = "Filter";
        opts.preTextWidth = 100;
        opts.preTextAlign = "left";
        opts.options = op.filterOptions;
        opts.selectInx = op.filterInx;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "filterButton", type: "select~sys", opts: opts};
        //======================================================================
        var menuFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var itemId = kvObj.opts.itemId;
            if (itemId === "loadFiles") {
                var dirObj = md.compRefs["dirButton"];
                var filterObj = md.compRefs["filterButton"];
                var elem = dirObj.elems["select"];
                var dirName = dirObj.opts.options[elem.selectedIndex];
                var dirObj = md.compRefs["filterButton"];
                var elem = dirObj.elems["select"];
                var filterName = filterObj.opts.options[elem.selectedIndex];
                console.log(dirName);
                console.log(filterName);
                md.mdClass.reloadFileNames(dirName, filterName);
                return;
            }
            return;
        };
        var cname = lyMap.get("filePanel") + "~" + 2;
        var opts = {};
        opts.menuKexts = {};
        var kexts = [];
        kexts.push(new Kext("loadFiles", "loadFiles", "", {enHint: "load files"}));
        opts.menuKexts["rootMenu"] = kexts;
        opts.actionFunc = menuFunc;
        opts.popOff_f = 0;
        opts.buttonType = "menuButton";
        models[cname] = {name: "", type: "Md_menu", opts: opts};
        //======================================================================
        var cname = lyMap.get("filePanel") + "~" + 3;
        var opts = {};
        opts.listTexts = [];
        opts.actionFunc = actionFunc;
        models[cname] = {name: "fileList", type: "Md_list~sys", opts: opts};
        //======================================================================
    }
}







//===========================================








//===========================================
class Md_viewKvObj {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.iw = null;
        op.ih = null;
        op.modelSet = "Component";
        op.templateSet = "plate";
        op.typeSet = "none";
        op.title = "";
        op.buttons = [];
        op.buttonWidth = 200;
        op.kvObjOpts = {};
        op.borderWidth = 0;
        op.showFrame_f = 0;
        op.kvObjParas = {};
        return op;
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;

        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (name === "ESC") {
                sys.popOff(2);
                return;
            }
            if (op.actionFunc) {

                kvObj = md.compRefs["kvObj"];
                if (!kvObj)
                    kvObj = md.modelRefs["kvObj"];
                op.actionFunc(kvObj);
            }
            sys.popOff(2);
            return;
        };


        //======================================    

        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        opts.overflowX = "hidden";
        opts.overflowY = "hidden";
        opts.disEdit_f = 1;



        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);



        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.rootIw = op.iw;
        opts.rootIh = op.ih;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 40;
        opts.overflowX = "hidden";
        opts.overflowY = "hidden";

        if (!op.title)
            opts.ihO.c0 = 0;
        if (!op.buttons.length)
            opts.ihO.c2 = 0;

        opts.disEdit_f = 1;
        //==============================


        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyMain", cname);

        //==============================

        var cname = lyMap.get("bodyMain") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        opts.innerTextColor = "#ccc";
        comps[cname] = {name: "title", type: "plate~none", opts: opts};



        if (op.modelSet && op.templateSet && op.typeSet) {
            var cname = lyMap.get("bodyMain") + "~" + 1;
            var opts = op.kvObjOpts;
            if (op.modelSet === "Component")
                comps[cname] = {name: "kvObj", type: op.templateSet + "~" + op.typeSet, opts: opts};
            if (op.modelSet === "Model")
                models[cname] = {name: "kvObj", type: op.templateSet + "~" + op.typeSet, opts: opts};
        }
        if (op.showFrame_f)
            md.opts.layoutGroups[cname] = {color: "#000"};


        var cname = lyMap.get("bodyMain") + "~" + 2;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.xm = 10;
        opts.margin = 2;
        opts.iw = op.buttonWidth;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);


        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("buttonPane") + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }



        return;
    }

}
//===========================================









//===========================================
class Md_plot {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.knobName = "";
        obj.chInx = 0;
        return obj;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "ani.dispFs", "innerText");
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var actionFunc = function (iobj) {
            console.log("md_filePicker:");
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "itemClick") {
                return;
            }
            if (iobj.act === "valueChange") {
                return;
            }
            if (iobj.act === "click") {
                if (name === "exitButton") {
                    sys.popOff(2);
                    return;
                }
                var plot = md.compRefs["plot"];
                if (name === "gridButton") {
                    plot.opts.plot__grid_f ^= 1;
                    sys.setWatch(plot, "plot__grid_f", plot.opts.plot__grid_f);
                    return;
                }
                if (name === "startButton") {
                    plot.opts.plot__run_f ^= 1;
                    sys.setWatch(plot, "plot__run_f", plot.opts.plot__run_f);
                    if (plot.opts.plot__run_f)
                        kvObj.opts.innerText = '<i class="material-icons">&#xe034;</i>';
                    else
                        kvObj.opts.innerText = '▶';
                    kvObj.reCreate();
                    return;
                }
                if (name === "stopButton") {
                    return;
                }
            }
            return;
        };


        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 9999;
        opts.ihO.c1 = 24;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 200;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyUp", cname);
        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 1;
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 100;
        opts.ihO.c1 = 240;
        opts.ihO.c2 = 9999;
        opts.ym = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyRight", cname);
        md.opts.layoutGroups[cname] = {color: "#222"};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.yc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyRight0", cname);
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe3ec;</i>';
        opts.clickFunc = actionFunc;
        opts.hint = "Grid";
        comps[cname] = {name: "gridButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe8ac;</i>';
        opts.hint = "Power";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "exitButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 2;
        var opts = {};
        //opts.innerText = '▶';
        opts.innerText = '<i class="material-icons">&#xe034;</i>';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "startButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight0") + "~" + 3;
        var opts = {};
        opts.clickFunc = actionFunc;
        opts.innerText = "";
        comps[cname] = {name: "spareButton", type: "button~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 1;
        var opts = {};
        opts.title = "";

        models[cname] = {name: "tuner", type: "Md_tuner", opts: opts};
        //======================================================================
        var cname = lyMap.get("bodyRight") + "~" + 2;
        var opts = {};
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 60;
        opts.ihO.c1 = 9999;
        opts.ym = 6;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnR2", cname);



        var cname = lyMap.get("pnR2") + "~" + 0;
        var opts = {};
        opts.xc = 2;
        opts.yc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButtonsA", cname);

        var cname = lyMap.get("pnR2") + "~" + 1;
        var opts = {};
        opts.yc = 8;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButtonsB", cname);




        for (var i = 0; i < 4; i++) {
            var cname = lyMap.get("pnButtonsA") + "~" + i;
            var opts = {};
            opts.maxByte = 12;
            opts.fontSize = "fixWidth";
            switch (i) {
                case 0:
                    opts.innerText = 'X-offset';
                    break;
                case 1:
                    opts.innerText = 'X-scale';
                    break;
                case 2:
                    opts.innerText = 'Y-offset';
                    break;
                case 3:
                    opts.innerText = 'Y-scale';
                    break;
            }
            comps[cname] = {name: "scaleButton~" + i, type: "button~sys", opts: opts};
        }

        for (var i = 0; i < 7; i++) {
            var cname = lyMap.get("pnButtonsB") + "~" + i;
            var opts = {};
            opts.maxByte = 12;
            opts.fontSize = "fixWidth";
            switch (i) {
                case 0:
                    opts.innerText = '脈波';
                    break;
                case 1:
                    opts.innerText = '本機輸入功率';
                    break;
                case 2:
                    opts.innerText = '遙控輸入功率';
                    break;
                case 3:
                    opts.innerText = '前置放大器輸出功率';
                    break;
                case 4:
                    opts.innerText = '驅動放大器輸出功率';
                    break;
                case 5:
                    opts.innerText = '順向輸出功率';
                    break;
                case 6:
                    opts.innerText = '反向輸出功率';
                    break;
            }
            if (op.chInx === i) {
                opts.insideShadowColor = "#00f";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.clickFunc = function (iobj) {
                console.log(iobj);
                var name = iobj.kvObj.name;
                var strA = name.split("~");
                op.chInx = parseInt(strA[1]);
                md.reCreate();


            };
            comps[cname] = {name: "chButton~" + i, type: "button~sys", opts: opts};
        }


        //======================================================================

        var cname = lyMap.get("bodyUp") + "~" + 0;
        var opts = {};
        comps[cname] = {name: "plot", type: "plot~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        mac.setFootBar(layouts, lyMap, comps, cname);
    }
}
//===========================================






//===========================================
class Md_tunerxxx {
    static init() {
        var bobj = gr.modelOpts["Md_tuner"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 210;
            obj.propertyHeight = 250;
            obj.borderWidth = 1;
            obj.baseColor = "#333";
            obj.borderColor = "#fff";
            obj.knobName = "Test";
            dsc.knobName = sys.setOptsSet("knobName", "str", "inputText");
            obj.muls = [0.01, 0.1, 1, 10, 100];
            dsc.muls = sys.setOptsSet("muls", "ratio~array", "inputFloat~array");
            obj.mulInx = 2;
            dsc.mulInx = sys.setOptsSet("mulInx", "num", "inputNumber", 0, 0, 4);
            obj.title = "Test";
            dsc.title = sys.setOptsSet("title", "str", "inputText", 1);
            obj.max = 100;
            dsc.max = sys.setOptsSet("max", "num", "inputNumber");
            obj.value = 0;
            dsc.value = sys.setOptsSet("value", "num", "inputNumber");
            obj.min = -100;
            dsc.min = sys.setOptsSet("min", "num", "inputNumber");
            obj.lineHeight = 30;
            dsc.lineHeight = sys.setOptsSet("lineHeight", "num", "inputNumber", 0, 0);
            obj.buttonHeight = 50;
            dsc.buttonHeight = sys.setOptsSet("buttonHeight", "num", "inputNumber", 0, 0);
            obj.rightWidth = 50;
            dsc.rightWidth = sys.setOptsSet("rightWidth", "num", "inputNumber", 0, 0);
            obj.valueFixed = 2;
            dsc.valueFixed = sys.setOptsSet("valueFixed", "num", "inputNumber", 0, 0);
            obj.end = 0;
            obj.dataType = "num";

        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
        }

    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var valueChangeFunc = function (inputValue) {
            if (op.innerText === "")
                return;
            if (op.value === null || op.value === undefined)
                return;
            //op.value = 0;
            op.value += inputValue * op.muls[op.mulInx];
            if (op.max !== null && op.max !== undefined) {
                if (op.value >= op.max)
                    op.value = op.max;
            }
            if (op.min !== null && op.min !== undefined) {
                if (op.value <= op.min)
                    op.value = op.min;
            }
            var valueStr = op.value.toFixed(op.valueFixed);
            var comp = md.compRefs["setValue"];
            comp.opts.editValue = valueStr;
            comp.reCreate();
            if (op.actionFunc) {
                var oobj = {};
                oobj.act = "valueChange";
                oobj.value = op.value;
                oobj.kvObj = md;
                op.actionFunc(oobj);
            }


        };

        var actionFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "click") {
                var strA = name.split("#");
                if (strA[0] === "mulButton") {
                    op.mulInx = parseInt(strA[1]);
                    for (var i = 0; i < op.muls.length; i++) {
                        var comp = md.compRefs["mulButton" + "#" + i];
                        var opts = comp.opts;
                        if (i === op.mulInx)
                            opts.baseColor = "#ccf";
                        else
                            opts.baseColor = "#ccc";
                        comp.reCreate();
                    }
                    return;
                }
                if (strA[0] === "upButton") {
                    if (op.value === null || op.value === undefined)
                        return;
                    valueChangeFunc(1);
                    return;
                }
                if (strA[0] === "downButton") {
                    if (op.value === null || op.value === undefined)
                        return;
                    valueChangeFunc(-1);
                    return;
                }
                if (strA[0] === "keyboardButton") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        op.value = KvLib.parseNumber(iobj.value);
                        var valueStr = op.value.toFixed(op.valueFixed);
                        var comp = md.compRefs["setValue"];
                        comp.opts.editValue = valueStr;
                        comp.reCreate();
                        if (op.actionFunc) {
                            var oobj = {};
                            oobj.act = "valueChange";
                            oobj.value = op.value;
                            oobj.kvObj = md;
                            op.actionFunc(oobj);
                        }
                    };

                    var setObj = {};
                    setObj.dataType = op.dataType;
                    setObj.setType = "inputNumber";
                    setObj.nullOk_f = 0;
                    setObj.name = op.title;
                    setObj.value = op.value;
                    setObj.max = op.max;
                    setObj.min = op.min;
                    setObj.fixed = op.valueFixed;
                    opts.setObj = setObj;
                    var mod = new Model("", "Md_numpad~sys", opts, {});
                    var popOpts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = 600;
                    popOpts.h = 500;
                    sys.popOnModel(popOpts);
                    /*
                     var self = this;
                     var opts = {};
                     opts.kvObj = null;
                     opts.w = op.w;
                     opts.h = op.h;
                     opts.shadow_f = 1;
                     opts.center_f = 1;
                     opts.maskTouchOff_f = 0;
                     * 
                     */
                }

                return;
            }
            return;
        };
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = op.lineHeight;
        opts.ihO.c1 = op.lineHeight;
        opts.ihO.c2 = op.buttonHeight;
        opts.ihO.c3 = 9999;
        if (!op.muls.length)
            opts.ihO.c2 = 0.1;
        opts.color = op.baseColor;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (op.muls.length) {
            var cname = lyMap.get("body") + "~" + 2;
            var opts = {};
            opts.xc = op.muls.length;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMulButton", cname);
        }
        //======================================================================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = op.rightWidth;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.yc = 3;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnUpDown", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.textAlign = "center";
        opts.innerText = op.title;
        opts.fontSize = 0;
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.preText = "";
        opts.textAlign = "center";
        if (op.value === null)
            opts.editValue = op.value;
        else
            opts.editValue = op.value.toFixed(op.valueFixed);
        comps[cname] = {name: "setValue", type: "input~text", opts: opts};
        //======================================================================
        for (var i = 0; i < op.muls.length; i++) {
            var cname = lyMap.get("pnMulButton") + "~" + i;
            var opts = {};
            opts.innerText = op.muls[i];
            opts.maxByte = 10;
            opts.fontSize = "fixWidth";
            if (i === op.mulInx)
                opts.baseColor = "#ccf";
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "mulButton#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.imageInx = 0;
        opts.imageUrls = ['./systemResource/knob.png'];
        opts.margin = 5;
        opts.whr = 1;

        opts.actionFunc = function (iobj) {
            valueChangeFunc(iobj.value);
        };
        comps[cname] = {name: "knob", type: "image~knob", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe312;</i>';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "keyboardButton", type: "button~iconFont", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 1;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe147;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "upButton", type: "Md_pushButton", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 2;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe15c;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "downButton", type: "Md_pushButton", opts: opts};
        //======================================================================

    }
}
//===========================================


//===========================================
class Md_pushButton {
    static init() {
        var bobj = gr.modelOpts["Md_pushButton"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 50;
        bobj.propertyHeight = 50;
        bobj.title = "➕";
        if ("sys") {
            var obj = sobj["sys"] = {};
        }

    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);


        var self = this;
        var obj = {};
        obj.title = "➕";
        return obj;
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var actionFunc = function (iobj) {
            if (op.actionFunc) {
                var obj = {};
                obj.act = "click";
                obj.kvObj = iobj.kvObj;
                op.actionFunc(obj);
            }
        };
        var timerFunc = function (iobj) {
            if (!gr.mouseDown_f)
                return;
            actionFunc(iobj);
            var delay = 50;
            gr.addSubTimer = setTimeout(function () {
                timerFunc(iobj);
            }, delay);
        };
        var setActionTimer = function (iobj) {
            actionFunc(iobj);
            var delay = 500;
            clearTimeout(gr.addSubTimer);
            gr.addSubTimer = setTimeout(function () {
                timerFunc(iobj);
            }, delay);
        };
        var stopTimer = function () {
            clearTimeout(gr.addSubTimer);
        };

        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.mouseDownFunc = setActionTimer;
        opts.mouseUpFunc = stopTimer;
        opts.mouseOutFunc = stopTimer;
        comps[cname] = {name: md.name, type: "button~iconFont", opts: opts};
        //======================================================================

    }
}
//===========================================






//===========================================
class Md_selectBox {
    static init() {
        var bobj = gr.modelOpts["Md_selectBox"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 500;
            obj.propertyHeight = 300;
            obj.title = "Title";

            obj.selects = [];
            for (var i = 0; i < 85; i++) {
                obj.selects.push("" + i);
            }
            dsc.selects = sys.setOptsSet("selects", "str~array", "inputText~array");
            obj.xc = 5;
            obj.yc = 5;
            obj.borderWidth = 1;
            obj.borderColor = "#fff";
            obj.page = 0;
            
            obj.textAlign = "left";
            
            
            obj.selectInx = -1;
            obj.selectSet = 0;
            dsc.selectSet = sys.setOptsSet("selectSet", "flag", "inputBoolean");
            obj.selectEsc_f = 1;
            dsc.selectEsc_f = sys.setOptsSet("selectEsc_f", "flag", "inputBoolean");

            //dsc.nowIndex = sys.setOptsSetFix("nowIndex", "number");
        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
        }


    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (name === "escButton") {
                sys.popOff(2);
                var obj = {};
                obj.act = "cancle";
                obj.kvObj = kvObj;
                if (op.actionFunc)
                    op.actionFunc(obj);
                return;
            }
            if (name === "pageUpButton") {
                op.page--;
                md.reCreate();
                return;
            }
            if (name === "pageDownButton") {
                op.page++;
                md.reCreate();
                return;
            }
            if (name === "okButton") {
                sys.popOff(2);
                var obj = {};
                obj.act = "selected";
                obj.inx = op.selectInx;
                obj.selects = op.selects;
                obj.text = kvObj.opts.innerText;
                obj.kvObj = kvObj;
                if (op.actionFunc)
                    op.actionFunc(obj);
                return;
            }


            var strA = name.split("#");
            if (strA[0] === "sel") {
                if (op.selectSet) {
                    op.selectInx = parseInt(strA[1]);
                    md.reCreate();
                    return;
                }
                if (op.selectEsc_f)
                    sys.popOff(2);
                var obj = {};
                obj.act = "selected";
                obj.inx = parseInt(strA[1]);
                obj.selects = op.selects;
                obj.text = kvObj.opts.innerText;
                obj.kvObj = kvObj;
                if (op.actionFunc)
                    op.actionFunc(obj);
                return;
            }
        };
        var cname = "c";
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        if (op.title)
            opts.ihO.c0 = 40;
        else
            opts.ihO.c0 = 0;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 40;
        opts.margin = 4;
        opts.ym = 8;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================



        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = op.xc;
        opts.yc = op.yc;
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);

        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        if (op.selects.length > (op.xc * op.yc))
            if (op.selectSet)
                opts.xc = 5;
            else
                opts.xc = 4;
        else
            opts.xc = 1;
        opts.xm = 4;
        opts.wAlign = "center";
        opts.maxIw = 200;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        comps[cname] = {name: "titleButton", type: "label~sys", opts: opts};

        //======================================================================
        var len = op.xc * op.yc;
        for (var i = 0; i < len; i++) {
            var cname = lyMap.get("pnMain") + "~" + i;
            var inx = i + op.xc * op.yc * op.page;
            if (inx >= op.selects.length)
                continue;
            var opts = {};
            opts.innerText = op.selects[inx];
            opts.textAlign = op.textAlign;
            opts.baseColor = "#aaa";
            if (inx === op.selectInx)
                opts.baseColor = "#aaf";
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "sel#" + inx, type: "button~sys", opts: opts};
        }

        //======================================================================
        if (op.selects.length <= (op.xc * op.yc)) {
            var cname = lyMap.get("pnButton") + "~" + 0;
            var opts = {};
            opts.innerText = '<i class="gf">&#xe5cd</i>';
            opts.clickFunc = actionFunc;
            opts.fontSize = 0;
            comps[cname] = {name: "escButton", type: "button~sys", opts: opts};
            return;
        }

        var pageAll = ((op.selects.length - 1) / (op.xc * op.yc)) | 0;

        var cname = lyMap.get("pnButton") + "~" + 0;
        var opts = {};
        opts.innerText = "Page: " + (op.page + 1) + "/" + (pageAll + 1);
        opts.fontSize = 0;
        comps[cname] = {name: "pageLabel", type: "label~sys", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 1;
        var opts = {};
        opts.innerText = '<i class="gf">&#xeacf</i>';
        opts.clickFunc = actionFunc;
        if (op.page === 0)
            opts.disable_f = 1;
        comps[cname] = {name: "pageUpButton", type: "button~sys", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 2;
        var opts = {};
        opts.innerText = '<i class="gf">&#xead0</i>';
        if (op.selects.length <= ((op.page + 1) * op.xc * op.yc))
            opts.disable_f = 1;
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "pageDownButton", type: "button~sys", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 3;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe5cd</i>';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};

        if (op.selectSet) {
            var cname = lyMap.get("pnButton") + "~" + 4;
            var opts = {};
            opts.innerText = 'OK';
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        }

    }
}
//===========================================




//===========================================
class Md_kextEditor {
    static init() {
        var bobj = gr.modelOpts["Md_kextEditor"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 0;
        bobj.propertyHeight = 400;
        var obj = {};
        obj.language = "chinese";
        var kextObj = new Kext("myId", "test", "中文", {});
        kextObj.sub.english = "english sub";
        kextObj.sub.chinese = "中文 sub";
        kextObj.hint.english = "english hint";
        kextObj.hint.chinese = "中文 hint";
        kextObj.dsc.english = "english dsc";
        kextObj.dsc.chinese = "中文 dsc";
        bobj.kext = JSON.stringify(kextObj);
        bobj.borderWidth = 1;
        bobj.borderColor = "#fff";
        if ("sys") {
            var obj = sobj["sys"] = {};
        }

    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        try {
            st.kext = JSON.parse(op.kext);
        } catch (e) {
            st.kext = {};
        }
        var saveAll = function () {
            var kext = {};
            var setObj = md.modelRefs["id"].opts.setObj;
            st.kext.id = setObj.value;
            var setObj = md.modelRefs["textInput"].opts.setObj;
            st.kext.text[op.language] = setObj.value;
            var setObj = md.modelRefs["subInput"].opts.setObj;
            st.kext.sub[op.language] = setObj.value;
            var setObj = md.modelRefs["hintInput"].opts.setObj;
            st.kext.hint[op.language] = setObj.value;
            var editor = md.compRefs["editor"].objs["editor"];
            st.kext.dsc[op.language] = editor.getSession().getValue();
            op.kext = JSON.stringify(st.kext);

        };

        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (name === "escButton") {
                var obj = {};
                obj.act = "esc";
                obj.kvObj = kvObj;
                if (op.actionFunc)
                    op.actionFunc(obj);
                sys.popOff(2);
                return;
            }
            if (name === "okButton") {
                saveAll();
                var obj = {};
                obj.act = "valueChange";
                obj.kvObj = md;
                obj.value = md.opts.kext;
                if (op.actionFunc) {
                    op.actionFunc(obj);
                }
                sys.popOff(2);
                return;
            }
            if (name === "language") {
                saveAll();
                op.language = iobj.value;
                md.reCreate();



            }
        };
        var cname = "c";
        var opts = {};
        opts.yc = 7;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 30;
        opts.ihO.c3 = 30;
        opts.ihO.c4 = 30;
        opts.ihO.c5 = 0;
        opts.ihO.c6 = 9999;
        opts.margin = 4;
        opts.ym = 4;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================




        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.xm = 4;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 100;
        opts.iwO.c2 = 100;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        //======================================================================

        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = "Kext Editor";
        opts.innerTextColor = "#ccc";
        opts.textAlign = "center";
        comps[cname] = {name: "title", type: "plate~none", opts: opts};


        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = 2;
        opts.xm = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnId", cname);




        var cname = lyMap.get("pnId") + "~" + 0;
        var opts = {};
        var setObj = sys.getOptsSet("text", st.kext.id);
        setObj.name = "ID";
        setObj.titleWidth = 100;
        opts.setObj = setObj;
        models[cname] = {name: "id", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("pnId") + "~" + 1;
        var opts = {};
        var setObj = sys.getOptsSet("inputSelect", op.language);
        setObj.name = "Language";
        setObj.titleWidth = 200;
        setObj.readOnly_f = 1;
        setObj.enum.push("english");
        setObj.enum.push("chinese");
        opts.setObj = setObj;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "language", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        var setObj = sys.getOptsSet("text", KvLib.getKvText(op.kext, op.language, "text"));
        setObj.name = "Text";
        opts.setObj = setObj;
        models[cname] = {name: "textInput", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        var setObj = sys.getOptsSet("text", KvLib.getKvText(op.kext, op.language, "sub"));
        setObj.name = "Sub Text";
        opts.setObj = setObj;
        models[cname] = {name: "subInput", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 4;
        var opts = {};
        var setObj = sys.getOptsSet("text", KvLib.getKvText(op.kext, op.language, "hint"));
        setObj.name = "Hint";
        opts.setObj = setObj;
        models[cname] = {name: "hintInput", type: "Md_editOptsLine~sys", opts: opts};



        //======================================================================

        //======================================================================





        //====
        var cname = lyMap.get("pnButton") + "~" + 1;
        var opts = {};
        opts.innerText = 'OK';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 2;
        var opts = {};
        opts.innerText = 'ESC';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 6;
        var opts = {};
        opts.context = op.kext;
        opts.title = "Description";
        models[cname] = {name: "editor", type: "Md_editorPanel~sys", opts: opts};

    }
}
//===========================================



//===========================================
class Md_ezKextEditor {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.kext = Kext.newEzStr("englis", "中文");
        obj.borderWidth = 1;
        obj.borderColor = "#fff";
        return obj;
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        st.kextObj = Kext.chkKextStr(op.kext);
        if (!st.kextObj) {
            st.kextObj = Kext.newEzObj("", "");
        }
        var saveAll = function () {
            var setObj = md.modelRefs["english"].opts.setObj;
            st.kextObj.text["english"] = setObj.value;
            var setObj = md.modelRefs["chinese"].opts.setObj;
            st.kextObj.text["chinese"] = setObj.value;
            op.kext = JSON.stringify(st.kextObj);

        };

        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (name === "escButton") {
                var obj = {};
                obj.act = "esc";
                obj.kvObj = kvObj;
                if (op.actionFunc)
                    op.actionFunc(obj);
                sys.popOff(2);
                return;
            }
            if (name === "okButton") {
                saveAll();
                var obj = {};
                obj.act = "valueChange";
                obj.kvObj = md;
                obj.value = md.opts.kext;
                if (op.actionFunc) {
                    op.actionFunc(obj);
                }
                sys.popOff(2);
                return;
            }
        };
        var cname = "c";
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 30;
        opts.margin = 4;
        opts.ym = 4;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.xm = 4;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 100;
        opts.iwO.c2 = 100;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        //======================================================================
        var cname = lyMap.get("pnButton") + "~" + 0;
        var opts = {};
        opts.innerText = "Kext Editor";
        opts.innerTextColor = "#ccc";
        opts.textAlign = "left";
        opts.lpd = 6;
        comps[cname] = {name: "title", type: "plate~none", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 1;
        var opts = {};
        opts.innerText = 'OK';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        //====
        var cname = lyMap.get("pnButton") + "~" + 2;
        var opts = {};
        opts.innerText = 'ESC';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};
        //==
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        var setObj = sys.getOptsSet("text", KvLib.getKvText(op.kext, "english"));
        setObj.name = "English";
        opts.setObj = setObj;
        opts.setObj.titleWidth = 120;
        models[cname] = {name: "english", type: "Md_editOptsLine~sys", opts: opts};
        //==
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        var setObj = sys.getOptsSet("text", KvLib.getKvText(op.kext, "chinese"));
        setObj.name = "Chinese";
        opts.setObj = setObj;
        opts.setObj.titleWidth = 120;
        models[cname] = {name: "chinese", type: "Md_editOptsLine~sys", opts: opts};

    }
}
//===========================================


//===========================================
class Md_editorPanel {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.borderWidth = 1;
        obj.borderColor = "#fff";
        obj.context = "";
        obj.title = "";
        obj.dataType = "json";
        obj.fontSize = 16;
        obj.wrapLine = 120;
        obj.readOnly_f = 0;
        return obj;
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================

        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (name === "dataType") {
                var editor = md.compRefs["editor"].objs["editor"];
                op.context = editor.getSession().getValue();
                op.dataType = iobj.value;
                md.reCreate();
                return;
            }
            if (name === "wrapLine") {
                var editor = md.compRefs["editor"].objs["editor"];
                op.context = editor.getSession().getValue();
                op.wrapLine = KvLib.toInt(iobj.value, 120);
                md.reCreate();
                return;
            }
            if (name === "editable") {
                op.readOnly_f ^= 1;
                md.reCreate();
                return;
            }
        };
        var cname = "c";
        var opts = {};
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 9999;
        opts.ym = 2;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 5;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 200;
        opts.iwO.c2 = 200;
        opts.iwO.c3 = 100;
        opts.iwO.c4 = 100;
        opts.margin = 2;
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        //======================================================================


        //======================================================================

        var cname = lyMap.get("pnButton") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.innerTextColor = "#ccc";
        opts.textAlign = "left";
        opts.fontWeight = "bold";
        opts.lpd = 4;
        comps[cname] = {name: "title", type: "plate~none", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnButton") + "~" + 1;
        var opts = {};
        var setObj = sys.getOptsSet("buttonSelect", op.wrapLine);
        setObj.name = "WrapLine";
        setObj.enum.push("80");
        setObj.enum.push("100");
        setObj.enum.push("120");
        setObj.enum.push("140");
        setObj.enum.push("160");
        setObj.titleWidth = 0;
        opts.setObj = setObj;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "wrapLine", type: "Md_editOptsLine~sys", opts: opts};
        //=======================

        var cname = lyMap.get("pnButton") + "~" + 2;
        var opts = {};
        var setObj = sys.getOptsSet("buttonSelect", op.dataType);
        setObj.name = "DataType";
        setObj.enum.push("txt");
        setObj.enum.push("html");
        setObj.enum.push("js");
        setObj.enum.push("css");
        setObj.enum.push("xml");
        setObj.enum.push("json");
        setObj.titleWidth = 0;
        opts.setObj = setObj;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "dataType", type: "Md_editOptsLine~sys", opts: opts};
        //=======================
        var cname = lyMap.get("pnButton") + "~" + 3;
        var opts = {};
        opts.innerText = 'Editable';
        opts.altColorInx = 4 + op.readOnly_f;
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "editable", type: "button~light", opts: opts};


        var cname = lyMap.get("pnButton") + "~" + 4;
        var opts = {};
        opts.innerText = '<i class="gf">&#xe312;</i>';
        opts.clickFunc = function () {
            var retFunc = function (iobj) {
                if (iobj.act === "keypadEnter") {
                    var editor = md.compRefs["editor"].objs["editor"];
                    var position = editor.selection.getCursor();
                    //var position={row:0, column:0};
                    editor.getSession().insert(position, iobj.value);
                }
            };
            mac.keyboard(sys.getOptsSet("text", ""), retFunc);
        };
        comps[cname] = {name: "keyboard", type: "button~iconFont", opts: opts};

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.editValue = op.context;
        opts.exName = op.dataType;
        opts.fontSize = op.fontSize;
        opts.wrapLine = op.wrapLine;
        opts.readOnly_f = op.readOnly_f;
        comps[cname] = {name: "editor", type: "editor~sys", opts: opts};

    }
}
//===========================================





//===========================================
class Md_layout {
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //md.paras={mode:"edit"};
        //======================================================================

        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
        };
        var cname = "c";
        var opts = {};
        opts.xc = op.xc;
        opts.yc = op.yc;
        opts.ym = op.ym;
        opts.xm = op.xm;
        opts.margin = op.margin;
        opts.lm = op.lm;
        opts.rm = op.rm;
        opts.tm = op.tm;
        opts.bm = op.bm;
        opts.wAlign = op.wAlign;
        opts.hAlign = op.hAlign;
        opts.maxIw = op.maxIw;
        opts.maxIh = op.maxIh;
        opts.bm = op.bm;
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================

    }
}
//===========================================



//===========================================
class Md_userModel {
    static init() {
        var bobj = gr.modelOpts["Md_userModel"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 0;
            obj.propertyHeight = 0;
            obj.borderWidth = 1;
            obj.borderColor = "#fff";
        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
            obj.kvObjs = [];
            var skvobj = {};
            skvobj.cname = "c~0";
            skvobj.modelSet = "Layout";
            skvobj.templateSet = "base";
            skvobj.typeSet = "sys";
            skvobj.opts = {};
            skvobj.opts.xc = 4;
            skvobj.opts.yc = 3;
            obj.kvObjs.push(skvobj);

            var skvobj = {};
            skvobj.cname = "c~0~2";
            skvobj.modelSet = "Layout";
            skvobj.templateSet = "base";
            skvobj.typeSet = "sys";
            skvobj.opts = {};
            skvobj.opts.yc = 5;
            obj.kvObjs.push(skvobj);


            var skvobj = {};
            skvobj.cname = "c~0~1";
            skvobj.modelSet = "Component";
            skvobj.templateSet = "button";
            skvobj.typeSet = "sys";
            var op = skvobj.opts = {};
            op.fontSize = 0;
            obj.kvObjs.push(skvobj);

            var skvobj = {};
            skvobj.cname = "c~0~2~3";
            skvobj.modelSet = "Component";
            skvobj.templateSet = "button";
            skvobj.typeSet = "sys";
            var op = skvobj.opts = {};
            op.fontSize = 0;
            op.innerText = "111";
            obj.kvObjs.push(skvobj);

            var skvobj = {};
            skvobj.cname = "c~0~4";
            skvobj.modelSet = "Model";
            skvobj.templateSet = "Md_list";
            skvobj.typeSet = "sys";
            var op = skvobj.opts = {};
            obj.kvObjs.push(skvobj);


        }
    }

    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {

    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var cname = "c";
        var opts = {};
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        //opts.disEdit_f = 1;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        for (var i = 0; i < op.kvObjs.length; i++) {
            var kvobj = op.kvObjs[i];
            if (kvobj.modelSet === "Layout")
                layouts[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
            if (kvobj.modelSet === "Component")
                comps[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
            if (kvobj.modelSet === "Model")
                models[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
        }
    }
}
//===========================================



//===========================================
class Md_buttons {
    constructor() {
    }
    initOpts(md) {
        var op = {};
        op.menuKexts = {};
        var head = "rootMenu";
        var kexts = [];
        kexts.push(new Kext("menu0", "1234"));
        kexts.push(new Kext("menu1", "2345"));
        kexts.push(new Kext("menu2", "3456"));
        kexts.push(new Kext("menu4", "abcd"));
        kexts.push(new Kext("menu5", "4567"));
        kexts.push(new Kext("menu6", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu7", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu8", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        op.menuKexts[head] = kexts;

        op.fontSize = "0.8rh";
        op.popOff_f = 1;
        op.buttonType = "sys";//menu | menuButton | sys
        op.xm = 10;
        op.ym = 4;
        op.lm = 10;
        op.rm = 10;
        op.tm = 2;
        op.bm = 2;
        op.xc = 8;
        op.yc = 1;
        op.setIdColor = "#00f";
        op.setIdObj = {'menu0': 1};
        op.actionFunc = null;

        return op;
    }
    build(md) {
        var self = this;
        var op = md.opts;
        var layouts = op.layouts;
        if (!op.menuKexts)
            return;
        if (!op.menuKexts["rootMenu"])
            return;
        var opts = {};
        var name = "c";
        opts.xc = op.xc;
        opts.yc = op.yc;
        opts.xm = op.xm;
        opts.ym = op.ym;
        opts.lm = op.lm;
        opts.tm = op.tm;
        opts.rm = op.rm;
        opts.bm = op.bm;
        opts.color = "#222";
        layouts[name] = {name: name, type: "base", opts: opts};
        //======================================================================
        md.opts.comps = {};
        var comps = md.opts.comps;
        var buttonClickFunc = function (actObj) {
            var kvObj = actObj.kvObj;
            var itemId = kvObj.opts.itemId;
            var kexts = op.menuKexts["rootMenu"];
            var obj = {};
            obj.act = "buttonClick";
            obj.id = itemId;
            obj.text = kvObj.opts.innerText;
            if (md.opts.actionFunc)
                md.opts.actionFunc(obj);
        };

        var kexts = op.menuKexts["rootMenu"];
        if (!kexts)
            return;

        for (var i = 0; i < kexts.length; i++) {
            var cname = "c~" + i;
            var opts = {};
            var text = Kext.getText(kexts[i]);
            opts.innerText = text;
            opts.itemId = kexts[i].id;
            if (op.setIdObj) {
                if (op.setIdObj[kexts[i].id]) {
                    opts.insideShadowColor = "#00f";
                    opts.insideShadowBlur = "0.5rh";
                }
            }
            opts.rootMenu = 1;
            opts.hint = Kext.getHint(kexts[i]);
            opts.fontSize = op.fontSize;
            opts.lpd = op.lpd;
            opts.rpd = op.rpd;
            opts.textAlign = "center";
            opts.textOverflow = "hidden";
            opts.clickFunc = buttonClickFunc;
            comps[cname] = {name: kexts[i].id, type: "button~" + op.buttonType, opts};

        }
    }
}


class Md_logoBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        opts.width = 0;
        opts.height = 0;
        opts.margin = 100;
        opts.url = gr.logoUrl;
        opts.showTime = gr.showLogoTime;
        opts.nextPage = "webFramePage";
        opts.verText = "Ver: "+gr.version;
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var retFunc = function (iobj) {
            var logoObj = md.compRefs["logo"];
            logoObj.opts.backgroundInx = 0;
            logoObj.opts.backgroundImageUrls = [];
            logoObj.opts.backgroundImageUrls.push(md.opts.url);
            logoObj.opts.whr = iobj.w / iobj.h;
            logoObj.reCreate();
            if (md.opts.verText) {
                var verObj = md.compRefs["ver"];
                verObj.reCreate();
            }

            var timerFunc = function () {


                var loginPrg = function (responseType, userName, password) {
                    var loginReturn = function (valueObj, mes) {
                        if (valueObj) {
                            us.set = valueObj;
                            gr.paraSet = JSON.parse(mes.opts.paras);
                            gr.webIp = mes.opts.webIp;
                            gr.showLogo_f = 0;
                            gr.repaint_f = 1;
                            document.cookie = 'userName=' + userName + "; max-age=3600";
                            document.cookie = 'password=' + password + "; max-age=3600";
                            gr.userName = userName;
                            gr.password = password;
                            gr.paras = JSON.parse(mes.opts.paras);
                        } else {
                            if (responseType === "response error")
                                return;
                            loginBoxPrg();

                        }
                    };
                    gr.serverCallBack = loginReturn;
                    Test.server_login("response error", "exeCallBackFunc", userName, password);
                    return;
                };
                //==================================================
                var loginBoxPrg = function () {
                    var retFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "buttonOk") {
                            loginPrg("response error", iobj.userName, iobj.password);
                            return;
                        }
                        sys.popOff(2);
                        if (iobj.act === "buttonEsc") {
                            window.close();
                            return;
                        }
                    };
                    var opts = {};
                    opts.actionFunc = retFunc;
                    if (gr.webPage === "webIcsPage")
                        var mod = new Model("selectBox", "Md_icsLoginBox~sys", opts, {});
                    else
                        var mod = new Model("selectBox", "Md_loginBox~sys", opts, {});
                    var popOpts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = 600;
                    popOpts.h = 210;
                    sys.popOnModel(popOpts);
                };

                if (!gr.enabelLogin_f) {
                    loginPrg("response none", gr.defaultUserName, gr.defaultUserPassword);
                    return;
                }


                var cookieObj = KvLib.anaString(document.cookie, ";", "=");
                console.log(cookieObj); // cookie1=value1; cookie2=value2;
                if (gr.clearCookie_f)
                    cookieObj = {};
                if (cookieObj.userName) {
                    if (cookieObj.password) {
                        loginPrg("response none", cookieObj.userName, cookieObj.password);
                        return;
                    }
                }
                loginBoxPrg();
            };
            setTimeout(timerFunc, md.opts.showTime);

        };
        KvLib.getImageSize(md.opts.url, retFunc);


    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        opts.margin = op.margin;
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================




        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        //=================================================
        // to fix google font first load position error
        opts.innerText = '<i class="gf">&#xe7ef;</i>';
        opts.innerTextColor = "rgba(0,0,0,0)";
        //=================================================
        comps[cname] = {name: "logo", type: "plate~sys", opts: opts};

        if (op.verText) {
            var cname = lyMap.get("body") + "~" + 0;
            var opts = {};
            opts.xc = 11;
            opts.yc = 20;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pn1", cname);


            var cname = lyMap.get("pn1") + "~" + (11 * 19 + 5);
            var opts = {};
            opts.innerText = op.verText;
            opts.fontSize="0.5rh";
            comps[cname] = {name: "ver", type: "plate~dark", opts: opts};
        }



    }
}


class Md_loginBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        opts.width = 500;
        opts.height = 120;
        opts.margin = 10;
        opts.nextPage = "webFramePage";
        opts.actionFunc = null;
        opts.borderWidth = 1;
        opts.baseColor = "#222";
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        //opts.iw = op.width;
        //opts.ih = op.height;
        opts.hAlign = "center";
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 40;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 40;
        opts.margin = 10;

        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("mainBody", cname);
        //layoutGroups[cname] = {color: "#222",border:"1px solid #fff"};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 0;
        var opts = {};
        opts.innerText = "Login";
        opts.innerTextColor = "#fff";
        comps[cname] = {name: "", type: "plate~none", opts: opts};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 1;
        var opts = {};
        opts.setObjs = [];
        var setObj = sys.getOptsSet("userName", "");
        setObj.showDataType_f = 1;
        setObj.name = "User Name";
        opts.setObjs.push(setObj);
        var setObj = sys.getOptsSet("password", "");
        setObj.showDataType_f = 1;
        setObj.name = "Password";
        opts.setObjs.push(setObj);
        opts.tagOn_f = 0;
        opts.ih = 35;
        opts.ym = 10;
        opts.margin = 10;
        models[cname] = {name: "setList", type: "Md_setList~light", opts: opts};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.xm = 10;
        opts.iw = 100;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);
        var buttonClickFunc = function (iobj) {
            var oobj = {};
            oobj.act = iobj.kvObj.name;
            var setListObj = md.modelRefs['setList'];
            oobj.userName = setListObj.modelRefs["mdEditOptsLine~0"].opts.setObj.value;
            oobj.password = setListObj.modelRefs["mdEditOptsLine~1"].opts.setObj.value;
            if (op.actionFunc)
                op.actionFunc(oobj);

        };
        var cname = lyMap.get("buttonPane") + "~" + 0;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = buttonClickFunc;
        comps[cname] = {name: "buttonEsc", type: "button~sys", opts: opts};
        var cname = lyMap.get("buttonPane") + "~" + 1;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = buttonClickFunc;
        comps[cname] = {name: "buttonOk", type: "button~sys", opts: opts};


    }
}


//===========================================
class Md_fontImageCreater {
    static init() {
        var obj = gr.modelOpts["Md_fontImageCreater"] = {};
        var dsc = obj["optsDsc"] = {};
        var sobj = obj["subOpts"] = {};
        obj.chInx = 0;
        obj.borderWidth = 1;
        obj.borderColor = "#fff";
        obj.fontFamily = "monospace";
        obj.fontSize = 64;
        obj.fontWeight = "bold";
        obj.textColor = "#fff";
        obj.imageBaseColor = "#000";
        obj.imageText = "AB";
        obj.widthPixel = 128;
        obj.heightPixel = 128;
        obj.linePadding = 0;
        obj.xOffset = 0;
        obj.yOffset = 0;
        obj.buttons = ["ESC", "OK"];
        obj.title = "Font Image Creater";
        dsc.buttons = sys.setOptsSet("buttons", "str~array", "inputText");
        return obj;

    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    constructor() {
        this.tickTimeK = 200;
        this.tickTime = -20;
        this.webSocketConnetCnt = 0;
        this.webSocketConnectCntK = 10;
        this.webSocketConnect_f = 0;
        this.futuresBuf = [];
        this.futuresBufEnd = 0;
        this.futuresBufLen = 0;
        this.futuresBufMax = 1000;
    }

    afterCreate() {
        var self = this;
        //self.draw();

    }

    chkWatch() {



    }
    draw(kvObj) {
        var canvasObj = kvObj;
        var md = kvObj.fatherMd;
        var op = md.opts;
        var ww = canvasObj.stas.cw;
        var hh = canvasObj.stas.ch;
        var elemCanvas = canvasObj.elems['canvas'];
        var ctx = elemCanvas.getContext('2d');

        ctx.fillStyle = op.imageBaseColor;
        ctx.fillRect(0, 0, ww, hh);

        var fontSize = op.fontSize;
        var fontFamily = op.fontFamily;
        var fontWeight = op.fontWeight;

        ctx.font = fontWeight + " " + fontSize + "px " + fontFamily;

        ctx.fillStyle = op.textColor;
        ctx.strokeStyle = op.textColor;
        var strB = op.imageText.split(",");
        if (strB.length === 1) {
            var size = KvLib.measureText(op.imageText, fontSize, fontWeight, fontFamily);
            size.h = size.h / 2;
            var xx = (ww - size.w) / 2;
            var yy = (hh - size.h) / 2;
            ctx.fillText(op.imageText, xx + op.xOffset, hh - yy + op.yOffset);
        }
        if (strB.length === 2) {
            var size = KvLib.measureText(strB[0], fontSize, fontWeight, fontFamily);
            size.h = size.h / 2;
            var xx = (ww - size.w) / 2;
            var yy = ((hh / 2) - size.h) / 2;
            ctx.fillText(strB[0], xx + op.xOffset, hh - yy - hh / 2 + op.linePadding + op.yOffset);

            var size = KvLib.measureText(strB[1], fontSize, fontWeight, fontFamily);
            size.h = size.h / 2;
            var xx = (ww - size.w) / 2;
            var yy = (hh / 2 - size.h) / 2;
            ctx.fillText(strB[1], xx + op.xOffset, hh - yy - op.linePadding + op.yOffset);

        }





    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================

        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 40;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 40;
        opts.ym = 10;
        md.setFarme(opts);
        opts.margin = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        comps[cname] = {name: "title", type: "label~message", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 300;
        opts.ihO.c1 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyUp", cname);
        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 11;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft", cname);
        //==============================================
        var valueChange = function (iobj) {
            if (!iobj.valueChange)
                return;
            var name = iobj.kvObj.name;
            var strA = name.split("~");
            if (strA[1] === '0') {
                op.widthPixel = iobj.value;
            }
            if (strA[1] === '1') {
                op.heightPixel = iobj.value;
            }
            if (strA[1] === '2') {
                op.fontFamily = iobj.value;
            }
            if (strA[1] === '3') {
                op.fontWeight = iobj.value;
            }
            if (strA[1] === '4') {
                op.fontSize = iobj.value;
            }
            if (strA[1] === '5') {
                op.textColor = iobj.value;
            }
            if (strA[1] === '6') {
                op.imageBaseColor = iobj.value;
            }
            if (strA[1] === '7') {
                op.yOffset = iobj.value;
            }
            if (strA[1] === '8') {
                op.xOffset = iobj.value;
            }
            if (strA[1] === '9') {
                op.linePadding = iobj.value;
            }
            if (strA[1] === '10') {
                op.imageText = iobj.value;
            }
            var canvasObj = md.compRefs['canvas'];
            canvasObj.opts.baseColor = op.imageBaseColor;
            canvasObj.opts.iw = op.widthPixel;
            canvasObj.opts.ih = op.heightPixel;
            canvasObj.reCreate();
        };
        var serInx = 0;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Width Pixels", "nature999");
        setObj.value = op.widthPixel;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Height Pixels", "nature999");
        setObj.value = op.heightPixel;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Font Family", "fontFamily");
        setObj.value = op.fontFamily;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        setObj.name = "Font Family";
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Font Weight", "fontWeight");
        setObj.value = op.fontWeight;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Font Size", "nature999");
        setObj.value = op.fontSize;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Text Color", "color");
        setObj.value = op.textColor;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Background Color", "color");
        setObj.value = op.imageBaseColor;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Y Offset", "num");
        setObj.value = op.yOffset;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("X Offset", "num");
        setObj.value = op.xOffset;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Line Padding", "num");
        setObj.value = op.linePadding;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;
        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};
        //==============================================
        serInx++;
        var cname = lyMap.get("pnLeft") + "~" + serInx;
        var opts = {};
        var setObj = sys.setOptsSetFix("Text", "str");
        setObj.value = op.imageText;
        setObj.titleWidth = 200;
        setObj.preTextWidth = 200;

        opts.setObj = setObj;
        opts.actionFunc = valueChange;
        models[cname] = {name: "mdEditOptsLine~" + serInx, type: "Md_editOptsLine~sys", opts: opts};







        //======================================================================
        var cname = lyMap.get("bodyUp") + "~" + 1;
        var opts = {};
        opts.margin = 10;
        opts.whr = 1.5;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("imagePane", cname);

        var cname = lyMap.get("imagePane") + "~" + 0;
        var opts = {};
        opts.drawFunc = self.draw;
        opts.baseColor = op.imageBaseColor;
        opts.iw = op.widthPixel;
        opts.ih = op.heightPixel;
        opts.wAlign = "center";
        opts.hAlign = "center";
        comps[cname] = {name: "canvas", type: "canvas~sys", opts: opts};
        //======================================================================

        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.xm = 10;
        opts.iw = 200;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);


        var buttonClickFunc = function (iobj) {
            var canvasObj = md.compRefs['canvas'];
            var ww = canvasObj.stas.cw;
            var hh = canvasObj.stas.ch;
            var elemCanvas = canvasObj.elems['canvas'];
            var ctx = elemCanvas.getContext('2d');
            var imgd = ctx.getImageData(0, 0, ww, hh);
            var pix = imgd.data;
            var obj = {};
            obj.width = ww;
            obj.height = hh;
            obj.data = pix;
            console.log(iobj);
            sys.popOff(2);
            var kvObj = iobj.kvObj;
            if (kvObj.opts.innerText === "OK") {
                if (kvObj.fatherMd.opts.actionFunc) {
                    kvObj.fatherMd.opts.actionFunc(obj);
                }
            }
        };

        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("buttonPane") + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = buttonClickFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }




    }
}
//===========================================


//===========================================
class Md_vsetPanel {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 1;
        op.borderColor = "#fff";
        op.heads = ["名稱", "偏移", "放大", "輸入", "輸出"];
        op.valueObjs = [];
        op.dataChanged_f = 0;
        for (var i = 0; i < 20; i++) {
            var obj = {};
            obj.name = "testName" + i;
            obj.id = "testId" + i;
            obj.offset = 100 + i;
            obj.scale = 2.5 + 0.1 * i;
            obj.input = 20 + i;
            obj.output = 0;
            obj.fixeds = [0, 2, 0, 0];
            obj.min = [0, 0, 0, 0];
            obj.max = [1000, 120, 120, 1000];
            op.valueObjs.push(obj);
        }
        op.wr0 = [9999, 300];
        op.wr1 = [9999, 100, 100, 80, 80];
        op.title = "";
        op.setyInx = -1;
        op.setxInx = 0;
        op.head_f = 0;
        op.rowCnt = 10;
        op.dispNo_f = 1;
        op.pageCnt = 0;
        return op;
    }

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        st.itemOffsets = [];
        st.itemScales = [];
        st.itemInputs = [];
        st.itemOutputs = [];
        for (var i = 0; i < op.valueObjs.length; i++) {
            var vobj = op.valueObjs[i];
            st.itemOffsets.push(vobj.offset.toFixed(vobj.fixeds[0]));
            st.itemScales.push(vobj.scale.toFixed(vobj.fixeds[1]));
            st.itemInputs.push(vobj.input.toFixed(vobj.fixeds[2]));
            vobj.output = (vobj.input - vobj.offset) * vobj.scale;
            st.itemOutputs.push(vobj.output.toFixed(vobj.fixeds[3]));
        }
        sys.inputWatch(self.md);
        sys.checkWatch(self.md);
    }

    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var nowInx = op.pageCnt * op.rowCnt;
        for (var i = 0; i < op.rowCnt; i++) {
            if (nowInx >= op.valueObjs.length)
                break
            var obj = md.compRefs["itemOffset~" + i];
            if (obj)
                sys.setInputWatch(obj, "fatherStas", "itemOffsets#" + nowInx, "innerText");
            var obj = md.compRefs["itemScale~" + i];
            if (obj)
                sys.setInputWatch(obj, "fatherStas", "itemScales#" + nowInx, "innerText");
            var obj = md.compRefs["itemInput~" + i];
            if (obj)
                sys.setInputWatch(obj, "fatherStas", "itemInputs#" + nowInx, "innerText");
            var obj = md.compRefs["itemOutput~" + i];
            if (obj)
                sys.setInputWatch(obj, "fatherStas", "itemOutputs#" + nowInx, "innerText");
            nowInx++;
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var cname = "c";
        var opts = {};
        opts.xc = 2;
        opts.xm = 4;
        opts.iwO = {};
        opts.iwO.c0 = op.wr0[0];
        opts.iwO.c1 = op.wr0[1];
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.yc = op.heads.length;
        opts.xm = 4;
        opts.ihO = {};
        opts.ihO.c0 = 40;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 50;
        if (!op.title) {
            opts.ihO.c0 = 0;
        }
        if (op.valueObjs.length <= op.rowCnt) {
            opts.ihO.c2 = 0;
        }
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft", cname);
        //======================================================================
        if (op.title) {
            var cname = lyMap.get("pnLeft") + "~" + 0;
            var opts = {};
            opts.innerText = op.title;
            opts.textAlign = "center";
            opts.lpd = 10;
            comps[cname] = {name: "pageButton~" + i, type: "plate~dark", opts: opts};
        }
        var cname = lyMap.get("pnLeft") + "~" + 1;
        var opts = {};
        opts.yc = op.rowCnt + 1;
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnItems", cname);
        //======================================================================
        for (var i = 0; i < (op.rowCnt + 1); i++) {
            var cname = lyMap.get("pnItems") + "~" + i;
            var opts = {};
            opts.xc = op.wr1.length;
            opts.xm = 4;
            opts.iwO = {};
            for (var j = 0; j < op.wr1.length; j++)
                opts.iwO["c" + j] = op.wr1[j];
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnItems~" + i, cname);
        }
        for (var i = 0; i < op.heads.length; i++) {
            var cname = lyMap.get("pnItems~" + 0) + "~" + i;
            var opts = {};
            opts.innerText = op.heads[i];
            opts.insideShadowColor = "#44f";
            opts.insideShadowBlur = "0.5rh";
            comps[cname] = {name: "headName~" + i, type: "label~namePanel", opts: opts};
        }

        var nowInx = op.pageCnt * op.rowCnt;
        for (var i = 0; i < op.rowCnt; i++) {
            if (nowInx >= op.valueObjs.length)
                break
            var vobj = op.valueObjs[nowInx];
            var cname = lyMap.get("pnItems~" + (i + 1)) + "~" + 0;
            var opts = {};
            if (op.dispNo_f) {
                opts.innerText = "" + (nowInx + 1) + ". " + vobj.name;
            } else
                opts.innerText = vobj.name;
            opts.insideShadowColor = "#ddf";
            opts.insideShadowBlur = "0.5rh";
            opts.textAlign = "left";
            opts.lpd = 10;


            comps[cname] = {name: "itemName~" + i, type: "label~namePanel", opts: opts};
            //============================================================================
            var cname = lyMap.get("pnItems~" + (i + 1)) + "~" + 1;
            var opts = {};
            if (vobj.fixeds[0] !== null && vobj.fixeds[0] !== undefined)
                opts.innerText = vobj.offset.toFixed(vobj.fixeds[0]);
            else
                opts.innerText = "" + vobj.offset;
            if (nowInx === op.setyInx && op.setxInx === 0) {
                opts.insideShadowColor = "#4f4";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.clickFunc = function (event) {
                var name = event.kvObj.name;
                var strA = name.split("~");
                var inx = parseInt(strA[1]);
                op.setyInx = op.pageCnt * op.rowCnt + inx;
                op.setxInx = 0;
                md.reCreate();
            };
            comps[cname] = {name: "itemOffset~" + i, type: "button~sys", opts: opts};
            //============================================================================
            var cname = lyMap.get("pnItems~" + (i + 1)) + "~" + 2;
            var opts = {};
            if (vobj.fixeds[1] !== null && vobj.fixeds[1] !== undefined)
                opts.innerText = vobj.scale.toFixed(vobj.fixeds[1]);
            else
                opts.innerText = "" + vobj.scale;
            if (nowInx === op.setyInx && op.setxInx === 1) {
                opts.insideShadowColor = "#4f4";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.clickFunc = function (event) {
                var name = event.kvObj.name;
                var strA = name.split("~");
                var inx = parseInt(strA[1]);
                op.setyInx = op.pageCnt * op.rowCnt + inx;
                op.setxInx = 1;
                md.reCreate();
            };
            comps[cname] = {name: "itemScale~" + i, type: "button~sys", opts: opts};
            //============================================================================
            var cname = lyMap.get("pnItems~" + (i + 1)) + "~" + 3;
            var opts = {};
            if (vobj.fixeds[2] !== null && vobj.fixeds[2] !== undefined)
                opts.innerText = vobj.input.toFixed(vobj.fixeds[2]);
            else
                opts.innerText = "" + vobj.input;
            comps[cname] = {name: "itemInput~" + i, type: "label~valuePanel", opts: opts};
            //============================================================================
            var cname = lyMap.get("pnItems~" + (i + 1)) + "~" + 4;
            var opts = {};
            if (vobj.fixeds[3] !== null && vobj.fixeds[3] !== undefined)
                opts.innerText = vobj.output.toFixed(vobj.fixeds[3]);
            else
                opts.innerText = "" + vobj.output;
            comps[cname] = {name: "itemOutput~" + i, type: "label~valuePanel", opts: opts};


            nowInx++;
        }




        var cname = lyMap.get("pnLeft") + "~" + 2;
        var opts = {};
        opts.xc = 4;
        opts.xm = 4;
        opts.tm = 5;
        opts.bm = 5;
        opts.lm = 10;
        opts.rm = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeftD", cname);
        //======================================================================
        var allPage = ((op.valueObjs.length - 0.5) / op.rowCnt) | 0;
        allPage += 1;
        var cname = lyMap.get("pnLeftD") + "~0";
        var opts = {};
        opts.innerText = "Page: " + (op.pageCnt + 1) + " / " + allPage;
        opts.textAlign = "left";
        comps[cname] = {name: "pageButton~" + i, type: "plate~dark", opts: opts};
        //
        var cname = lyMap.get("pnLeftD") + "~1";
        var opts = {};
        opts.innerText = '<i class="gf">&#xeacf</i>';
        if (op.pageCnt <= 0)
            opts.disable_f = 1;
        opts.clickFunc = function (event) {
            if (op.pageCnt)
                op.pageCnt--;
            op.setyInx = -1;
            op.setxInx = 0;
            md.reCreate();
        };
        comps[cname] = {name: "pageButton~" + i, type: "button~sys", opts: opts};
        //
        var cname = lyMap.get("pnLeftD") + "~2";
        var opts = {};
        opts.innerText = '<i class="gf">&#xead0</i>';
        if (op.pageCnt >= (allPage - 1))
            opts.disable_f = 1;
        opts.clickFunc = function (event) {
            if (op.pageCnt < (allPage - 1))
                op.pageCnt++;
            op.setyInx = -1;
            op.setxInx = 0;
            md.reCreate();
        };
        comps[cname] = {name: "pageButton~" + i, type: "button~sys", opts: opts};

        var cname = lyMap.get("pnLeftD") + "~3";
        var opts = {};
        opts.innerText = "No: " + (op.pageCnt * op.rowCnt + 1) + " / " + op.valueObjs.length;
        opts.textAlign = "right";
        comps[cname] = {name: "pageButton~" + i, type: "plate~dark", opts: opts};


        //===========================================================================
        var cname = lyMap.get("body") + "~1";
        var opts = {};
        opts.rightWidth = 100;
        opts.buttonHeight = 60;
        opts.lineHeight = 60;
        opts.muls = [0.01, 0.1, 1, 10, 100];
        if (op.setyInx < 0) {
            opts.title = "";
            opts.value = null;
        } else {
            var vobj = op.valueObjs[op.setyInx];
            opts.title = vobj.name;
            if (op.setxInx === 0) {
                opts.title += "  偏移";
                opts.value = vobj.offset;
                opts.valueFixed = vobj.fixeds[0];
            }
            if (op.setxInx === 1) {
                opts.title += "  放大";
                opts.value = vobj.scale;
                opts.valueFixed = vobj.fixeds[1];
            }
            opts.max = null;
            opts.min = null;
            /*
             opts.min = op.limits[op.setInx].min;
             opts.max = op.limits[op.setInx].max;
             opts.muls = op.limits[op.setInx].muls;
             */
        }
        opts.dataType = "ratio";
        opts.actionFunc = function (iobj) {
            if (op.setyInx < 0)
                return;
            op.dataChanged_f = 1;
            vobj = op.valueObjs[op.setyInx];
            if (op.setxInx === 0)
                vobj.offset = iobj.value;
            if (op.setxInx === 1)
                vobj.scale = iobj.value;


        };

        models[cname] = {name: "tuner", type: "Md_tuner~sys", opts: opts};

    }
}
//===========================================


//===========================================
class Md_tuner {
    static init() {
        var bobj = gr.modelOpts["Md_tuner"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 210;
            obj.propertyHeight = 250;
            obj.borderWidth = 1;
            obj.baseColor = "#333";
            obj.borderColor = "#fff";
            obj.knobName = "Test";
            dsc.knobName = sys.setOptsSet("knobName", "str", "inputText");
            obj.muls = [0.01, 0.1, 1, 10, 100];
            dsc.muls = sys.setOptsSet("muls", "ratio~array", "inputFloat~array");
            obj.mulInx = 2;
            dsc.mulInx = sys.setOptsSet("mulInx", "num", "inputNumber", 0, 0, 4);
            obj.title = "Test";
            dsc.title = sys.setOptsSet("title", "str", "inputText", 1);
            obj.max = 100;
            dsc.max = sys.setOptsSet("max", "num", "inputNumber");
            obj.value = 0;
            dsc.value = sys.setOptsSet("value", "num", "inputNumber");
            obj.min = -100;
            dsc.min = sys.setOptsSet("min", "num", "inputNumber");
            obj.lineHeight = 30;
            dsc.lineHeight = sys.setOptsSet("lineHeight", "num", "inputNumber", 0, 0);
            obj.buttonHeight = 50;
            dsc.buttonHeight = sys.setOptsSet("buttonHeight", "num", "inputNumber", 0, 0);
            obj.rightWidth = 50;
            dsc.rightWidth = sys.setOptsSet("rightWidth", "num", "inputNumber", 0, 0);
            obj.valueFixed = 2;
            dsc.valueFixed = sys.setOptsSet("valueFixed", "num", "inputNumber", 0, 0);

            var setObj = obj.setObj = {};
            setObj.name = "";
            setObj.showDataType_f = 0;
            setObj.titleWidth = 0;
            setObj.setType = "inputText";
            setObj.dataType = "str";
            setObj.nullOk_f = 1;
            dsc.setObj = sys.setOptsSet("setObj", "object", "setObject");
            InitOpts.getSetObjDsc(dsc);


            obj.end = 0;
            obj.dataType = "num";

        };
        if ("sys") {
            modelOptsFunc(bobj);
            var obj = sobj["sys"] = {};
        }

    }
    constructor() {
    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================================================
        var valueChangeFunc = function (kvObj, inputValue) {

            if (kvObj.fatherMd.name === "tuner")
                var tunerObj = kvObj.fatherMd;
            else
                var tunerObj = kvObj.fatherMd.fatherMd;

            var op = tunerObj.opts;
            if (op.setObj.name === "")
                return;
            if (op.setObj.value === null || op.setObj.value === undefined)
                return;
            //op.value = 0;
            if (op.setObj.mulFixA_f) {
                var value = op.setObj.value;
                var mul = 1;
                for (var i = 0; i < 15; i++) {
                    var valueInt = parseInt(value / 10);
                    if (!valueInt)
                        break;
                    mul *= 10;
                    value = valueInt;
                }
                if (inputValue === 1) {
                    if (value < 2)
                        value = 2;
                    else if (value < 5)
                        value = 5;
                    else {
                        value = 1;
                        mul *= 10;
                    }
                } else {
                    if (value >= 5)
                        value = 2;
                    else if (value > 1)
                        value = 1;
                    else {
                        value = 5;
                        mul *= 0.1;
                    }
                }
                op.setObj.value = value * mul;
                if (op.setObj.value < op.setObj.min)
                    op.setObj.value = op.setObj.min;
            } else {
                var addValue = inputValue;
                if (op.setObj.muls)
                    addValue = addValue * op.setObj.muls[op.setObj.mulInx];
                op.setObj.value += addValue;
                if (op.setObj.max !== null && op.setObj.max !== undefined) {
                    if (op.setObj.value >= op.setObj.max)
                        op.setObj.value = op.setObj.max;
                }
                if (op.setObj.min !== null && op.setObj.min !== undefined) {
                    if (op.setObj.value <= op.setObj.min)
                        op.setObj.value = op.setObj.min;
                }
                var valueStr = op.setObj.value.toFixed(op.setObj.fixed);
                op.setObj.value = KvLib.parseNumber(valueStr);
            }
            var mobj = tunerObj.modelRefs["setValue"];
            mobj.opts.setObj = op.setObj;
            mobj.reCreate();
            if (op.actionFunc) {
                var oobj = {};
                oobj.act = "valueChange";
                oobj.kvObj = tunerObj;
                op.actionFunc(oobj);
            }
        };

        var actionFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            if (iobj.act === "click") {
                var strA = name.split("#");
                if (strA[0] === "mulButton") {
                    var md = kvObj.fatherMd;
                    var op = md.opts;
                    op.setObj.mulInx = parseInt(strA[1]);
                    for (var i = 0; i < op.setObj.muls.length; i++) {
                        var comp = md.compRefs["mulButton" + "#" + i];
                        var opts = comp.opts;
                        if (i === op.setObj.mulInx)
                            opts.baseColor = "#ccf";
                        else
                            opts.baseColor = "#ccc";
                        comp.reCreate();
                    }
                    return;
                }
                var md = kvObj.fatherMd.fatherMd;
                var op = md.opts;

                if (strA[0] === "upButton") {
                    if (op.setObj.value === null || op.setObj.value === undefined)
                        return;
                    valueChangeFunc(kvObj, 1);
                    return;
                }
                if (strA[0] === "downButton") {
                    if (op.setObj.value === null || op.setObj.value === undefined)
                        return;
                    valueChangeFunc(kvObj, -1);
                    return;
                }
                if (strA[0] === "keyboardButton") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        op.value = KvLib.parseNumber(iobj.value);
                        var valueStr = op.value.toFixed(op.valueFixed);
                        var comp = md.compRefs["setValue"];
                        comp.opts.editValue = valueStr;
                        comp.reCreate();
                        if (op.actionFunc) {
                            var oobj = {};
                            oobj.act = "valueChange";
                            oobj.value = op.value;
                            oobj.kvObj = md;
                            op.actionFunc(oobj);
                        }
                    };

                    var setObj = {};
                    setObj.dataType = op.dataType;
                    setObj.setType = "inputNumber";
                    setObj.nullOk_f = 0;
                    setObj.name = op.title;
                    setObj.value = op.value;
                    setObj.max = op.max;
                    setObj.min = op.min;
                    setObj.fixed = op.valueFixed;
                    opts.setObj = setObj;
                    var mod = new Model("", "Md_numpad~sys", opts, {});
                    var popOpts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = 600;
                    popOpts.h = 500;
                    sys.popOnModel(popOpts);
                    /*
                     var self = this;
                     var opts = {};
                     opts.kvObj = null;
                     opts.w = op.w;
                     opts.h = op.h;
                     opts.shadow_f = 1;
                     opts.center_f = 1;
                     opts.maskTouchOff_f = 0;
                     * 
                     */
                }

                return;
            }
            return;
        };
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = op.lineHeight;
        opts.ihO.c1 = op.lineHeight;
        opts.ihO.c2 = op.buttonHeight;
        opts.ihO.c3 = 9999;
        var muls = op.setObj.muls;
        if (!muls) {
            opts.ihO.c2 = 0;
            muls = [];
        }

        opts.color = op.baseColor;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (muls.length) {
            var cname = lyMap.get("body") + "~" + 2;
            var opts = {};
            opts.xc = muls.length;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMulButton", cname);
        }
        //======================================================================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = op.rightWidth;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.yc = 3;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnUpDown", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.textAlign = "center";
        opts.innerText = op.setObj.name;
        opts.fontSize = 0;
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.setObj = op.setObj;
        models[cname] = {name: "setValue", type: "Md_editOptsLine~sys", opts: opts};
        //======================================================================
        for (var i = 0; i < muls.length; i++) {
            var cname = lyMap.get("pnMulButton") + "~" + i;
            var opts = {};
            opts.innerText = muls[i];
            opts.maxByte = 10;
            opts.fontSize = "fixWidth";
            if (i === op.setObj.mulInx)
                opts.baseColor = "#ccf";
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "mulButton#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.imageInx = 0;
        opts.imageUrls = ['./systemResource/knob.png'];
        opts.margin = 5;
        opts.whr = 1;
        if (op.setObj.mulFixA_f)
            opts.addAngleMul = 0.01;
        opts.actionFunc = function (iobj) {
            valueChangeFunc(iobj.kvObj, iobj.value);
        };
        comps[cname] = {name: "knob", type: "image~knob", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 0;
        var opts = {};
        opts.innerText = '<i class="material-icons">&#xe312;</i>';
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "keyboardButton", type: "button~iconFont", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 1;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe147;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "upButton", type: "Md_pushButton", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnUpDown") + "~" + 2;
        var opts = {};
        opts.title = '<i class="material-icons">&#xe15c;</i>';
        opts.actionFunc = actionFunc;
        models[cname] = {name: "downButton", type: "Md_pushButton", opts: opts};
        //======================================================================

    }
}
//===========================================


