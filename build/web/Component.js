/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Font Test emoje ☀ ☕ 體 SansSerif,monospaced, MS Gothic dilogInput, magical mystery..., meiryo ui, 
/* global KvLib, gr, Kext, sys, us */
//fontFamily
//sans-serif ( 無襯線體 )、serif ( 襯線體 )、monospace ( 等寬體 )、cursive ( 手寫體 ) 和 fantasy ( 幻想體 )
//✉✂✔❌➕➖❓❗➗➡⬅⬆⬇⤴⤵⬛⬜🀄🅰🅱🆎🆗🆖🆕🆔🎧🎵🏠👆👇👈👉👍👨👩📎📈📂📁📞📖📡📢📤📥
//📨📷📶📱🔃🔊🔋🔌🔍🔎🔏🔒🔓🔔🔗🔠🔤🔢🔧🔨🔴🔲🕒
//📊 ⏰ ⏳ ⏳ 📡 ⏪ ⏩ ⏩ ⏫ ⏬ ➡ ➡ ⬆ ⬇ ↕ ↔ ▶
//❎✅💾⚙☑◻🔳🌏
//'<i class="gf">&#xe145;</i>';add Icon
//'<i class="gf">&#xe15b;</i>';sub Icon
//'<i class="gf">&#xeacf;</i>';double arrow up
//'<i class="gf">&#xeacf;</i>';double arrow down


class Component {
    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.stas = {};
        this.elems = {};
        this.objs = {};
        this.watch = {};
        //=============================
        this.fatherMd = null;
        //==============================
        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        // gr.kidMap.set(this.kid, this);
    }
    initOpts() {
        var self = this;
        var obj = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        this.s0Type = strA[2];
        this.s1Type = strA[3];
        this.s2Type = strA[4];
        if (this.baseType === "button" && this.subType === "sys")
            var xxx = 0;
        return Component.getOpts(this.baseType, this.subType);
    }

    static getOpts(baseType, subType) {
        var opts = {};
        KvLib.deepCoverObject(opts, gr.compBaseOpts);
        var bopts = gr.compOpts[baseType];
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
            if (us.set.optsSet["Component~" + baseType]) {
                var uopts = us.set.optsSet["Component~" + baseType][subType];
                if (uopts)
                    KvLib.deepCoverObject(opts, uopts);
            }
        }
        return opts;

    }

    initParas() {
        var paras = {};
        return paras;
    }
    build() {
    }

    chkWatch() {
        var self = this;
        sys.inputWatch(self);
        sys.checkWatch(self);
        if (self.stas.frameTimer)
            self.stas.frameTimer(self);

        if (self.opts.mousePushDown_f) {
            if (!gr.mouseDown_f) {
                self.opts.mousePushDown_f = 0;
                var baseElem = self.elems["base"];
                baseElem.style.fontSize = (self.stas.fontSize) + "px";
            }
        }



        var keys = Object.keys(self.watch);
        if (keys.length === 0)
            return;
        for (var i = 0; i < keys.length; i++) {
            var strA = keys[i].split("__");
            if (strA[1]) {
                var cobj = self.objs[strA[0]];
                cobj.opts[strA[1]] = self.opts[keys[i]];
                cobj.chkWatch(strA[1]);
            }
        }

        if (self.watch["innerText"]) {
            var elem = self.elems["base"];
            elem.innerHTML = self.opts.innerText;
            delete self.watch["innerText"];
        }
        if (self.watch["innerTextColor"]) {
            var elem = self.elems["base"];
            elem.style.color = self.opts.innerTextColor;
            delete self.watch["innerTextColor"];
        }
        self.watch = {};
        return;
    }

    clickFunc(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;


        if (self.opts.clickFunc) {
            var obj = {};
            obj.act = "click";
            obj.kvObj = self;
            self.opts.clickFunc(obj);
            return;
        }




    }
    mouseOver(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        if (op.mouseOnBorderColor)
            baseElem.style.borderColor = op.mouseOnBorderColor;
        if (op.mouseOnColor)
            baseElem.style.backgroundColor = op.mouseOnColor;
        if (op.mouseOnTextColor)
            baseElem.style.color = op.mouseOnTextColor;

        if (op.hint) {
            if (op.hint !== "kvd:disable") {
                sys.setKvHint(self, op.hint);
            }
        }


    }

    mouseOut(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        if (self.opts.mousePushDown_f) {
            self.opts.mousePushDown_f = 0;
            baseElem.style.fontSize = (self.stas.fontSize) + "px";
        }
        var st = self.stas;
        var op = self.opts;
        baseElem.style.borderColor = self.getBorderColor();
        self.setBackground(baseElem);
        baseElem.style.boxShadow = self.getShadowStr();
        baseElem.style.color = self.getInnerTextColor();
        if (op.hint) {
            if (op.hint !== "kvd:disable") {
                sys.delKvHint();
            }
        }
        if (self.opts.mouseOutFunc) {
            var obj = {};
            obj.act = "mouseOut";
            obj.kvObj = self;
            self.opts.mouseOutFunc(obj);
            return;
        }
    }
    getBorderColor() {
        var self = this;
        var op = self.opts;
        if (op.altColors)
            return op.altColors[op.altColorInx];
        return op.borderColor;
    }

    getInnerTextColor() {
        var self = this;
        var op = self.opts;
        if (op.altColors)
            return op.altColors[op.altColorInx];
        return op.innerTextColor;
    }

    setBackground(elem) {
        var self = this;
        var op = self.opts;
        if (op.backgroundInx === undefined || op.backgroundInx === null || op.backgroundInx < 0) {
            elem.style.backgroundColor = op.baseColor;
            if (op.background) {
                elem.style.background = op.background;
            }
            return;
        } else {
            if (op.backgroundImageUrls.length) {
                elem.style.backgroundColor = op.baseColor;
                if (op.background) {
                    elem.style.background = op.background;
                }
                elem.style.backgroundRepeat = op.backgroundRepeat;
                elem.style.backgroundImage = "url('" + op.backgroundImageUrls[op.backgroundInx] + "')";
                switch (op.backgroundImagePosition) {
                    case "fit":
                        elem.style.backgroundSize = "contain";
                        elem.style.backgroundPosition = "center";
                        break;
                    case "center":
                        elem.style.backgroundPosition = "center";
                        break;
                    case "extend":
                    default:
                        elem.style.backgroundSize = this.stas.cw + "px " + this.stas.ch + "px";
                        break;
                }
                return;
            }
            if (op.backgroundColors.length) {
                elem.style.backgroundColor = op.backgroundColors[op.backgroundInx];
                return;
            }
        }
    }

    setPreTextBackground(elem) {
        var self = this;
        var op = self.opts;
        if (op.preTextBackgroundColor) {
            elem.style.backgroundColor = op.preTextBackgroundColor;
        }
        if (op.preTextBackground) {
            elem.style.background = op.preTextBackground;
        }
        if (op.preTextBackgroundImageUrl) {
            elem.style.backgroundRepeat = op.backgroundRepeat;
            elem.style.backgroundImage = "url('" + op.preTextBackgroundImageUrl + "')";
            switch (op.preTextBackgroundImagePosition) {
                case "fit":
                    elem.style.backgroundSize = "contain";
                    elem.style.backgroundPosition = "center";
                    break;
                case "center":
                    elem.style.backgroundPosition = "center";
                    break;
                case "extend":
                default:
                    elem.style.backgroundSize = this.stas.preTextWidth + "px " + this.stas.ch + "px";
                    break;
            }
            return;
        }
    }

    mouseDown(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        self.opts.mousePushDown_f = 1;
        baseElem.style.fontSize = (self.stas.fontSize * 0.9) + "px";
        baseElem.style.boxShadow = "";

        if (self.opts.mouseDownFunc) {
            var obj = {};
            obj.act = "mouseDown";
            obj.button=event.button;
            obj.kvObj = self;
            self.opts.mouseDownFunc(obj);
            return;
        }



    }
    mouseUp(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        baseElem.style.boxShadow = self.getShadowStr();
        baseElem.style.fontSize = (self.stas.fontSize) + "px";

        if (self.opts.mouseUpFunc) {
            var obj = {};
            obj.act = "mouseUp";
            obj.button=event.button;
            obj.kvObj = self;
            self.opts.mouseUpFunc(obj);
            return;
        }


    }
    
    
    getOutsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var color = op.outsideShadowColor;
        if (op.altColors){
            color = op.altColors[op.altColorInx];
            if(!op.altColorInx)
                st.outsideShadowBlur=0;
        }    

        var str = "";
        if (st.outsideShadowBlur) {
            str += st.outsideShadowOffx + "px ";
            str += st.outsideShadowOffy + "px ";
            str += st.outsideShadowBlur + "px ";
            str += color;

        }
        return str;
    }
    getInsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;

        var color = op.insideShadowColor;
        if (op.altColors){
            color = op.altColors[op.altColorInx];
            if(!op.altColorInx)
                st.insideShadowBlur=0;
        }    

        var str = "";
        if (st.insideShadowBlur) {
            str += st.insideShadowOffx + "px ";
            str += st.insideShadowOffy + "px ";
            str += st.insideShadowBlur + "px ";
            str += color;
            str += " inset";

        }
        return str;
    }
    getShadowStr() {
        var str0 = this.getInsideShadowStr();
        var str1 = this.getOutsideShadowStr();
        if (str0.length !== 0 && str1.length !== 0)
            return str0 + "," + str1;
        else
            return str0 + str1;
    }
    
    
    
    clear() {
        var self = this;
        if (!self.stas.fhid)
            return;
        var child = document.getElementById(self.kid);
        var parent = document.getElementById(self.stas.fhid);
        if (child && parent)
            parent.removeChild(child);
        var name = self.name;
        var rect = {};
        rect.fhid = self.stas.fhid;
        rect.x = self.stas.fx;
        rect.y = self.stas.fy;
        rect.w = self.stas.fw;
        rect.h = self.stas.fh;
        if (this.fatherMd.comps[this.cname])
            delete this.fatherMd.comps[this.cname];
        if (this.fatherMd.compRefs[this.cname])
            delete this.fatherMd.compRefs[name];
        return rect;
    }

    reCreate() {
        var self = this;
        var name = self.name;
        var type = self.type;
        var opts = JSON.parse(JSON.stringify(self.opts));
        opts.actionFunc = self.opts.actionFunc;
        opts.clickFunc = self.opts.clickFunc;
        opts.drawFunc = self.opts.drawFunc;
        opts.mouseDownFunc = self.opts.mouseDownFunc;
        opts.mouseUpFunc = self.opts.mouseUpFunc;
        var paras = JSON.parse(JSON.stringify(self.paras));
        var rect = self.clear();
        var fatherMd = self.fatherMd;
        var cname = self.cname;
        if (!rect)
            return;
        self.clear();
        var comp = new Component(name, type, opts, paras);
        if (fatherMd) {
            fatherMd.comps[cname] = comp;
            if (name)
                fatherMd.compRefs[name] = comp;
            comp.fatherMd = fatherMd;
        }
        comp.cname = cname;
        comp.build();
        comp.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
    }

    //return chg_f
    inputToValue() {
        var self = this;
        if (self.type === "input~text" || self.type === "input~password") {
            var inputElem = self.elems["input"];
            var value = inputElem.value;
            if (value === self.opts.editValue) {
                return 0;
            }
            self.opts.editValue = value;
            return 1;
        }
    }

    getValue() {
        var self = this;
        if (self.type === "input~text" || self.type === "input~password") {
            return self.opts.editValue;
        }
        return self.opts.innerText;
    }

    blurFunc(event) {
        var elem = event.target;
        var self = elem.kvd.kvObj;
        var chg = self.inputToValue();
        if (!self.opts.actionFunc)
            return;
        var reto = {};
        reto.act = "blur";
        if (chg)
            reto.valueChange = 1;
        reto.kvObj = self;
        reto.value = self.getValue();
        self.opts.actionFunc(reto);
    }

    keypressFunc(event) {
        var elem = event.target;
        var self = elem.kvd.kvObj;
        if (event.keyCode === 13) {
            var chg = self.inputToValue();
            if (!self.opts.actionFunc)
                return;
            var reto = {};
            reto.act = "pressEnter";
            if (chg)
                reto.valueChange = 1;
            reto.kvObj = self;
            reto.value = self.getValue();
            self.opts.actionFunc(reto);
        }
    }

    changeFunc(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;


        var reto = {};
        reto.act = "valueChange";
        reto.kvObj = self;

        if (self.type === "input~range") {
            var inputElem = self.elems["input"];
            var afterTextElem = self.elems["afterText"];

            if (self.opts.mulRate) {
                var num = KvLib.toNumber(inputElem.value);
                if (num === null)
                    num = 0;
                var value = (num * self.opts.mulRate).toFixed(self.opts.fixed);
            } else
                var value = inputElem.value;
            if (afterTextElem) {
                afterTextElem.innerHTML = value;
            }
            reto.value = value;
        }

        if (self.type === "select~sys") {
            reto.index = elem.options[elem.selectedIndex];
            reto.value = elem.options[elem.selectedIndex].innerHTML;
        }
        if (!self.opts.actionFunc)
            return;
        self.opts.actionFunc(reto);
        return;

        //===========================================
        while (1) {
            if (self.baseType === "input") {
                if (self.type === "input~checkbox") {
                    if (inputElem.checked)
                        reto.value = 1;
                    else
                        reto.value = 0;
                    break
                }
                reto.value = inputElem.value;
            }
            if (self.baseType === "select") {
                var selectElem = self.elems["select"];
                reto.value = selectElem.options[selectElem.selectedIndex].value;
            }
            break;
        }




    }

    transData(x, y, w, h) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        //======================================
        st.w = w;
        st.h = h;
        st.x = x;
        st.y = y;
        if (op.whr) {
            var ww = (h * op.whr) | 0;
            var hh = (w / op.whr) | 0;
            if (ww > w)
                ww = w;
            if (hh > h)
                hh = h;
            x += ((w - ww) / 2) | 0;
            y += ((h - hh) / 2) | 0;
            w = ww;
            h = hh;
        }
        st.rx = x;
        st.ry = y;
        st.rw = w;
        st.rh = h;
        //======================================
        st.innerText = KvLib.getKvText(op.innerText, "");
        //======================================
        var margin = KvLib.transUnit(op.margin, 0);
        st.lm = margin;
        st.tm = margin;
        st.rm = margin;
        st.bm = margin;
        if (op.tm !== null)
            st.tm = KvLib.transUnit(op.tm, 0, st.rw, st.rh);
        if (op.rm !== null)
            st.rm = KvLib.transUnit(op.rm, 0, st.rw, st.rh);
        if (op.bm !== null)
            st.bm = KvLib.transUnit(op.bm, 0, st.rw, st.rh);
        if (op.lm !== null)
            st.lm = KvLib.transUnit(op.lm, 0, st.rw, st.rh);
        //================================================    
        st.ix = st.rx + st.lm;
        st.iy = st.ry + st.tm;
        //================================================    
        var maxIw = st.rw - (st.lm + st.rm);
        var maxIh = st.rh - (st.tm + st.bm);
        st.iw = KvLib.transUnit(op.iw, 0, st.rw, st.rh);
        st.ih = KvLib.transUnit(op.ih, 0, st.rw, st.rh);

        if (!op.iw)
            st.iw = maxIw;
        if (!op.ih)
            st.ih = maxIh;
        if (st.iw > maxIw)
            st.iw = maxIw;
        if (st.ih > maxIh)
            st.ih = maxIh;
        if (op.wAlign === "center") {
            st.ix += (maxIw - st.iw) / 2;
        }
        if (op.wAlign === "right") {
            st.ix += maxIw - st.iw;
        }
        if (op.hAlign === "center") {
            st.iy += (maxIh - st.ih) / 2;
        }
        if (op.hAlign === "bottom") {
            st.iy += maxIh - st.ih;
        }
        st.cx = st.ix;
        st.cy = st.iy;
        st.cw = st.iw;
        st.ch = st.ih;
        //======================================
        var padding = KvLib.transUnit(op.padding, 0, st.iw, st.ih);
        st.lpd = padding;
        st.tpd = padding;
        st.rpd = padding;
        st.bpd = padding;
        if (op.tpd !== null)
            st.tpd = KvLib.transUnit(op.tpd, 0, st.iw, st.ih);
        if (op.rpd !== null)
            st.rpd = KvLib.transUnit(op.rpd, 0, st.iw, st.ih);
        if (op.bpd !== null)
            st.bpd = KvLib.transUnit(op.bpd, 0, st.iw, st.ih);
        if (op.lpd !== null)
            st.lpd = KvLib.transUnit(op.lpd, 0, st.iw, st.ih);
        st.borderWidth = KvLib.transUnit(op.borderWidth, 0, st.iw, st.ih);

        st.xw = st.cw - st.borderWidth * 2;
        st.xh = st.ch - st.borderWidth * 2;
        var ccw = st.cw - st.borderWidth * 2 - st.lpd - st.rpd;
        var cch = st.ch - st.borderWidth * 2 - st.tpd - st.bpd;
        if (ccw < 0) {
            st.lpd = (st.cw - st.borderWidth * 2) / 2;
            st.rpd = (st.cw - st.borderWidth * 2) / 2;
            ccw = st.cw - st.borderWidth * 2 - st.lpd - st.rpd;
        }
        if (cch < 0) {
            st.tpd = (st.ch - st.borderWidth * 2) / 2;
            st.bpd = (st.ch - st.borderWidth * 2) / 2;
            cch = st.ch - st.borderWidth * 2 - st.tpd - st.bpd;
        }
        st.cw = ccw;
        st.ch = cch;


        if (st.cw < 0)
            st.cw = 0;
        if (st.ch < 0)
            st.ch = 0;

        //======================================
        st.preTextLpd = KvLib.transUnit(op.preTextLpd, 0, st.iw, st.ih);
        st.preTextRpd = KvLib.transUnit(op.preTextRpd, 0, st.iw, st.ih);
        st.preTextTpd = KvLib.transUnit(op.preTextTpd, 0, st.iw, st.ih);
        st.preTextBpd = KvLib.transUnit(op.preTextBpd, 0, st.iw, st.ih);
        st.preTextBorderWidth = KvLib.transUnit(op.preTextBorderWidth, 0, st.xw, st.xh);
        st.preTextWidth = KvLib.transUnit(op.preTextWidth, 0, st.iw, st.ih);
        st.afterTextLpd = KvLib.transUnit(op.afterTextLpd, 0, st.iw, st.ih);
        st.afterTextRpd = KvLib.transUnit(op.afterTextRpd, 0, st.iw, st.ih);
        st.afterTextTpd = KvLib.transUnit(op.afterTextTpd, 0, st.iw, st.ih);
        st.afterTextBpd = KvLib.transUnit(op.afterTextBpd, 0, st.iw, st.ih);
        st.afterTextBorderWidth = KvLib.transUnit(op.afterTextBorderWidth, 0, st.iw, st.ih);
        st.afterTextWidth = KvLib.transUnit(op.afterTextWidth, 0, st.iw, st.ih);



        //======================================
        if (op.preText || st.preTextWidth) {
            st.preTextFontSize = KvLib.transUnit(op.preTextFontSize, 20, st.xw, st.xh);
            st.preTextFontSize = KvLib.minMax(st.preTextFontSize, gr.minFontSize, gr.maxFontSize);
            st.preTextFontSizeObj = KvLib.measureText(op.preText, st.preTextFontSize, op.fontWeight, op.fontFamily);
            if (st.preTextWidth) {
            } else {
                st.preTextWidth = st.preTextFontSizeObj.w + st.preTextLpd + st.preTextRpd + st.preTextBorderWidth * 2;
            }
            st.preTextHeight = st.xh;
            if (!op.preTextLine2_f) {
                st.cw -= st.preTextWidth;
                st.lpd += st.preTextWidth;
            }
        }
        if (this.subType === "color")
            var kk = 0;

        if (op.afterText || st.afterTextWidth) {
            st.afterTextFontSize = KvLib.transUnit(op.afterTextFontSize, st.fontSize, st.xw, st.xh);
            st.afterTextFontSize = KvLib.minMax(st.afterTextFontSize, gr.minFontSize, gr.maxFontSize);
            st.afterTextFontSizeObj = KvLib.measureText(op.afterText, st.afterTextFontSize, op.fontWeight, op.fontFamily);
            if (st.afterTextWidth) {
            } else {
                st.afterTextWidth = st.afterTextFontSizeObj.w + st.afterTextLpd + st.afterTextRpd + st.afterTextBorderWidth * 2;
            }
            st.afterTextHeight = st.xh;
            st.cw -= st.afterTextWidth;
            st.rpd += st.afterTextWidth;
        }







        var ww = st.iw;
        var hh = st.ih;
        st.insideShadowBlur = KvLib.transUnit(op.insideShadowBlur, 0, ww, hh);
        st.insideShadowOffx = KvLib.transUnit(op.insideShadowOffx, 0, ww, hh);
        st.insideShadowOffy = KvLib.transUnit(op.insideShadowOffy, 0, ww, hh);
        st.outsideShadowBlur = KvLib.transUnit(op.outsideShadowBlur, 0, ww, hh);
        st.outsideShadowOffx = KvLib.transUnit(op.outsideShadowOffx, 0, ww, hh);
        st.outsideShadowOffy = KvLib.transUnit(op.outsideShadowOffy, 0, ww, hh);
        //==============================================
        if (!op.fontSize)
            op.fontSize = "fixWidth";
        if (op.fontSize === "fixWidth") {
            st.fontSize = KvLib.transUnit("0.9rh", 10, st.cw, st.ch);
            var testText = st.innerText;
            if (op.maxByte) {
                testText = 0;
                for (var i = 0; i < op.maxByte; i++) {
                    testText += "W";
                }
            }
            st.fontSizeObj = KvLib.measureText(testText, st.fontSize, op.fontWeight, op.fontFamily);
            if (st.fontSizeObj.w > st.cw) {
                st.fontSize = (st.fontSize * st.cw / st.fontSizeObj.w) | 0;
                st.fontSize--;
                st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
            }
        } else {
            st.fontSize = KvLib.transUnit(op.fontSize, 10, st.cw, st.ch);
            st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
            if (st.innerText.length > 20)
                st.innerText = KvLib.getKvText("" + st.innerText, "");
            st.fontSizeObj = KvLib.measureText(st.innerText, st.fontSize, op.fontWeight, op.fontFamily);
        }

        if (op.shrinkX_f) {
            st.cw = st.fontSizeObj.w;
            var ws = st.cw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
            if (st.iw) {
                //ws = st.iw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
                //st.cw = st.iw;
            }
            st.shrinkX = st.w - ws;
            st.rw = ws;
        }

        if (op.shrinkY_f) {
            var hs = st.ih + st.tm + st.bm + st.tpd + st.bpd;
            st.ch = st.ih;
            st.shrinkY = st.h - hs;
            st.cy -= 0;
            st.rh = hs;
        }


        st.dy = 0;
        st.dh = st.ch;
        st.dx = st.preTextWidth;
        st.dw = st.cw;

        st.itemHeight = KvLib.transUnit(op.itemHeight, 20, st.cw, st.ch);
        st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
        if (st.itemWidth === 0) {
            st.itemWidth = st.iw - st.preTextWidth - st.afterTextWidth - st.borderWidth * 2;
        }

    }

    create(fhid, x, y, w, h) {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        st.fhid = fhid;
        st.fx = x;
        st.fy = y;
        st.fw = w;
        st.fh = h;
        //==============================
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        //==============================
        if ("setStxywh") {
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
            if (w === 0)
                w = felem.clientWidth;
            if (h === 0)
                w = felem.clientHeight;
            st.x = x;
            st.y = y;
            st.w = w;
            st.h = h;
        }
        //=====================================
        self.transData(st.x, st.y, st.w, st.h);
        //=====================================
        if ("setBaseElem") {

            if (this.baseType === "button") {
                if (this.subType === "check") {
                    if (op.checked_f) {
                        st.innerText = '<i class="gf">&#xe5ca</i>';
                    } else {
                        st.innerText = "";
                    }
                }
            }
            var elem = document.createElement("div");
            elem.id = this.kid;
            st.elemId = elem.id;
            elem.style.position = "absolute";
            elem.style.overflow = "hidden";
            //=====================================
            elem.style.left = (st.cx) + "px";
            elem.style.top = (st.cy) + "px";
            elem.style.width = (st.cw) + "px";
            elem.style.height = (st.ch) + "px";
            elem.style.paddingLeft = (st.lpd) + "px";
            elem.style.paddingRight = st.rpd + "px";
            elem.style.paddingTop = st.tpd + "px";
            elem.style.paddingBottom = st.bpd + "px";

            if (op.preText || op.preTextWidth) {
                if (op.preTextLine2_f) {//adh preTextHeight,fontSize,and paddingBottom
                    st.preTextHeight = KvLib.transUnit(op.preTextHeight, 12, st.cw, st.ch);
                    elem.style.paddingTop = (st.tpd + st.preTextHeight) + "px";
                    elem.style.height = (st.ch - st.preTextHeight) + "px";
                }
            }



            //if (st.cw < 0 || st.ch < 0)
            //    elem.style.visibility = "hidden";
            if (op.hidden_f)
                elem.style.visibility = "hidden";
            //=====================================
            var lines = st.innerText.split("<br>").length;
            if(!op.writingMode)
                elem.style.lineHeight = (st.ch / lines) + "px";
            elem.style.verticalAlign = "center";
            elem.style.userSelect = "none";
            if (op.textOverflow)
                elem.style.textOverflow = op.textOverflow;
            else
                elem.style.textOverflow = "ellipsis";
            //=====================================
            if (op.cursor) {
                if (!op.disable_f)
                    elem.style.cursor = op.cursor;
            }
            /*
             if (op.hint) {
             if (op.hint !== "kvd:disable") {
             elem.title = op.hint;
             }
             } else {
             if ((st.fontSizeObj.w) >= st.cw)
             elem.title = st.innerText;
             }
             */
            //=====================================
            if (op.borderRadius)
                elem.style.borderRadius = KvLib.transUnit(op.borderRadius, 10, st.cw, st.ch) + "px";
            elem.style.borderWidth = st.borderWidth + "px";
            elem.style.borderStyle = "solid";
            elem.style.fontFamily = op.fontFamily;
            elem.style.fontWeight = op.fontWeight;
            elem.style.fontStyle = op.fontStyle;
            elem.style.fontSize = st.fontSize + "px";
            elem.style.whiteSpace = op.whiteSpace;
            elem.style.textAlign = op.textAlign;
            if (op.zIndex)
                elem.style.zIndex = "" + op.zIndex;
            if (op.textShadow)
                elem.style.textShadow = op.textShadow;
            //=====================================
            elem.style.borderColor = self.getBorderColor();
            if (op.boxShadows) {
                elem.style.boxShadow = op.boxShadows[op.backgroundInx];
                self.setBackground(elem);

            } else {
                self.setBackground(elem);
                var str = self.getShadowStr();
                if (str.length)
                    elem.style.boxShadow = str;
            }
            //=====================================
            if (!op.disable_f) {
                elem.style.color = self.getInnerTextColor();
                if (op.onMouseOn) {
                    elem.addEventListener("mouseover", self.mouseOver);
                    elem.addEventListener("mouseout", self.mouseOut);
                }
                if (op.onMousePress) {
                    elem.addEventListener("mousedown", self.mouseDown);
                    elem.addEventListener("mouseup", self.mouseUp);
                }
                if (op.clickFunc)
                    elem.addEventListener("click", self.clickFunc);
            } else {
                if (op.disableTextColor)
                    elem.style.color = op.disableTextColor;
                else
                    elem.style.color = op.innerTextColor;
            }
            //=====================================
            if (st.innerText === null)
                var xxx = 1;

             if(op.writingMode){
                elem.style.writingMode=op.writingMode;
                elem.style.lineHeight=(st.cw-8)+"px";
             }    
            elem.innerHTML = st.innerText;
            var kvd = {};
            kvd.kvObj = self;
            elem.kvd = kvd;

            felem.appendChild(elem);
            self.elems["base"] = elem;

        }
        //=====================================
        if ("setPreText") {
            if (this.baseType === "button") {
                if (this.subType === "checkName") {
                    if (op.checked_f) {
                        op.preText = '<i class="gf">&#xe5ca</i>';
                    } else {
                        op.preText = "";
                    }
                }
            }



            if (op.preText || op.preTextWidth) {
                if (op.preTextLine2_f) {
                    st.preTextHeight = KvLib.transUnit(op.preTextHeight, 12, st.cw, st.ch);
                    st.dy += st.preTextHeight;
                    st.dh = st.ch - st.preTextHeight;
                    st.dx = 0;
                    st.dw = st.iw - st.borderWidth * 2 - st.afterTextWidth;
                    st.itemWidth += st.preTextWidth;
                    var selem = document.createElement("div");
                    selem.id = this.kid + "_preText";
                    selem.style.position = "absolute";
                    selem.style.overflow = "hidden";
                    selem.style.left = 0 + "px";
                    selem.style.top = 0 + "px";
                    selem.style.width = (st.iw - st.borderWidth * 2 - st.preTextBorderWidth * 2) + "px";
                    selem.style.height = st.preTextHeight + "px";
                    selem.style.borderWidth = st.preTextBorderWidth + "px";
                    selem.style.borderStyle = "solid";
                    selem.style.borderColor = op.preTextBorderColor;
                    selem.style.fontSize = st.preTextFontSize + "px";
                    self.setPreTextBackground(selem);
                    if (op.preTextTextColor)
                        selem.style.color = op.preTextTextColor;
                    selem.style.verticalAlign = "center";
                    selem.style.lineHeight = (st.preTextHeight) + "px";
                    selem.style.fontSize = KvLib.transUnit("0.8rh", 10, st.cw, st.preTextHeight) + "px";
                    selem.style.textAlign = "center";
                    selem.innerHTML = op.preText;
                    selem.kvd = kvd;
                    elem.appendChild(selem);
                    self.elems["preText"] = selem;


                } else {
                    var selem = document.createElement("div");
                    selem.id = this.kid + "_preText";
                    selem.style.position = "absolute";
                    selem.style.overflow = "hidden";
                    selem.style.left = 0 + "px";
                    selem.style.top = 0 + "px";
                    selem.style.width = (st.preTextWidth - st.preTextLpd - st.preTextRpd - st.preTextBorderWidth * 2) + "px";
                    selem.style.height = (st.preTextHeight - st.preTextTpd - st.preTextBpd - st.preTextBorderWidth * 2) + "px";
                    selem.style.color = op.preTextColor;
                    selem.style.paddingLeft = st.preTextLpd + "px";
                    selem.style.paddingRight = st.preTextRpd + "px";
                    selem.style.paddingTop = st.preTextTpd + "px";
                    selem.style.paddingBottom = st.preTextBpd + "px";
                    selem.style.textAlign = op.preTextAlign;
                    selem.style.lineHeight = (st.preTextHeight - st.preTextTpd - st.preTextBpd - st.preTextBorderWidth * 2) + "px";
                    selem.style.fontSize = st.preTextFontSize + "px";
                    selem.style.fontFamily = op.fontFamily;
                    self.setPreTextBackground(selem);
                    if (op.preTextTextColor)
                        selem.style.color = op.preTextTextColor;
                    selem.style.borderWidth = st.preTextBorderWidth + "px";
                    selem.style.borderStyle = "solid";
                    selem.style.borderColor = op.preTextBorderColor;
                    ;
                    selem.innerHTML = op.preText;
                    selem.kvd = kvd;
                    elem.appendChild(selem);
                    self.elems["preText"] = selem;
                }
            }
        }
        //=====================================



        if ("setAfterText") {
            if (op.afterText) {
                var selem = document.createElement("div");
                selem.id = this.kid + "_afterText";
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                if (op.afterTextPos === "end") //1:end 
                    selem.style.left = (st.iw - st.afterTextWidth) + "px";
                else
                    selem.style.left = (st.dx + st.itemWidth) + "px";
                selem.style.top = st.dy + "px";
                selem.style.borderWidth = st.afterTextBorderWidth + "px";
                selem.style.borderStyle = "solid";
                selem.style.borderColor = "#000";
                selem.style.width = (st.afterTextWidth - st.afterTextLpd - st.afterTextRpd - st.afterTextBorderWidth * 2) + "px";
                selem.style.height = (st.afterTextHeight - st.afterTextTpd - st.afterTextBpd - st.afterTextBorderWidth * 2 - st.dy) + "px";
                selem.style.color = op.afterTextColor;
                selem.style.fontSize = st.afterTextFontSize + "px";
                selem.style.paddingLeft = st.afterTextLpd + "px";
                selem.style.paddingRight = st.afterTextRpd + "px";
                selem.style.backgroundColor = op.afterTextBackgroundColor;
                selem.style.verticalAlign = "center";
                selem.style.lineHeight = (st.afterTextHeight - st.afterTextTpd - st.afterTextBpd - st.afterTextBorderWidth * 2 - st.dy) + "px";
                selem.style.textAlign = op.afterTextAlign;
                selem.innerHTML = op.afterText;
                selem.kvd = kvd;
                elem.appendChild(selem);
                self.elems["afterText"] = selem;

            }
        }
        //=====================================
        if ("setObject") {
            if (this.baseType === "textarea") {
                var selem = document.createElement("textarea");
                selem.id = this.kid + "_" + this.type;
                self.elems["textarea"] = selem;
                selem.spellcheck = null;
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.textAlign = op.textAlign;
                selem.style.fontSize = st.fontSize + "px";
                selem.style.fontFamily = op.fontFamily;
                selem.style.fontWeight = op.fontWeight;
                selem.style.fontStyle = op.fontStyle;


                selem.style.color = op.innerTextColor;
                selem.style.backgroundColor = op.baseColor;



                if (op.readOnly_f) {
                    selem.readOnly = true;
                    selem.style.backgroundColor = "#ddd";
                }
                selem.style.fontFamily = "monospace";
                selem.style.left = st.dx + "px";
                selem.style.top = st.dy + "px";
                selem.style.width = (st.dw) + "px";
                selem.style.height = st.dh + "px";
                selem.style.resize = "none";
                selem.style.overflowY = op.scrollY;
                if (op.editValue === null)
                    op.editValue = "";
                selem.value = op.textValue;
                st.textValue = op.textValue;
                selem.kvd = kvd;
                elem.appendChild(selem);

            }

            if (this.baseType === "input") {
                var selem = document.createElement("input");
                selem.id = this.kid + "_" + this.type;
                self.elems["input"] = selem;
                selem.spellcheck = null;
                if (op.maxCharLength !== undefined && op.maxCharLength !== null)
                    selem.maxLength = op.maxCharLength;
                if (op.minCharLength !== undefined && op.minCharLength !== null)
                    selem.minLength = op.minCharLength;

                if (op.max !== undefined && op.max !== null)
                    selem.max = op.max;
                if (op.min !== undefined && op.min !== null)
                    selem.min = op.min;
                if (op.pattern !== undefined && op.pattern !== null)
                    selem.pattern = op.pattern;



                selem.type = this.subType;
                //selem.type = "text";
                //selem.style.autocomplete="off";
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.lineHeight = st.ch + "px";
                selem.style.textAlign = op.textAlign;
                selem.style.fontSize = st.fontSize + "px";

                //st.itemHeight = KvLib.transUnit(op.itemHeight, 20, st.cw, st.ch);
                //st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
                //if (st.itemWidth === 0)
                //    st.itemWidth = st.iw - st.preTextWidth - st.afterTextWidth - st.borderWidth * 2;



                var editLineText = 1;
                var widthSubK = 8;
                while (1) {
                    if (this.subType === "text")
                        break;
                    if (this.subType === "password")
                        break;
                    if (this.subType === "date") {
                        widthSubK = 5;
                        break;
                    }
                    if (this.subType === "month") {
                        widthSubK = 5;
                        break;
                    }
                    if (this.subType === "datetime-local") {
                        widthSubK = 5;
                        break;
                    }
                    if (this.subType === "email")
                        break;
                    if (this.subType === "tel")
                        break;
                    if (this.subType === "time") {
                        widthSubK = 5;
                        break;
                    }
                    editLineText = 0;
                    break;
                }


                if (editLineText) {
                    if (op.readOnly_f)
                        selem.readOnly = true;
                    selem.style.fontFamily = "monospace";
                    selem.style.left = st.dx + "px";
                    selem.style.top = st.dy + "px";
                    selem.style.width = (st.dw - widthSubK) + "px";
                    selem.style.height = st.dh - op.heightSubK + "px";
                    selem.style.fontSize = st.fontSize + "px";
                    if (op.editValue === null)
                        op.editValue = "";
                    selem.value = op.editValue;
                    st.editValue = op.editValue;
                    //selem.addEventListener('change', self.changeFunc);
                    if (op.readOnly_f)
                        selem.style.backgroundColor = "#ddd";
                    selem.addEventListener('blur', self.blurFunc);
                    selem.addEventListener('keypress', self.keypressFunc);
                    selem.kvd = kvd;
                    elem.appendChild(selem);



                }
                if (this.subType === "radio") {
                    selem.name = op.groupName;
                    selem.style.left = st.preTextWidth + "px";
                    selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                    selem.style.width = (st.itemWidth) + "px";
                    selem.style.height = (st.itemHeight) + "px";
                    selem.addEventListener('change', self.changeFunc);
                    if (op.editValue)
                        selem.checked = "checked";
                    selem.kvd = kvd;
                    elem.appendChild(selem);

                }

                if (this.subType === "checkbox") {
                    selem.style.left = st.preTextWidth + "px";
                    selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                    selem.style.width = (st.itemWidth) + "px";
                    selem.style.height = (st.itemHeight) + "px";
                    selem.addEventListener('change', self.changeFunc);
                    if (op.editValue)
                        selem.checked = "checked";
                    selem.kvd = kvd;
                    elem.appendChild(selem);

                    if (self.opts.enums) {
                        if (!op.editValue)
                            op.afterText = self.opts.enums[0];
                        else
                            op.afterText = self.opts.enums[1];
                    }



                }

                if (this.subType === "color") {
                    selem.style.left = st.preTextWidth + "px";
                    selem.style.top = (st.ch - st.itemHeight) / 2 - 1 + "px";
                    selem.style.width = (st.itemWidth) + "px";
                    selem.style.height = (st.itemHeight) + "px";
                    selem.addEventListener('change', self.changeFunc);
                    selem.kvd = kvd;
                    selem.value = op.editValue;
                    elem.appendChild(selem);
                    op.afterText = op.editValue;

                }

                if (this.subType === "number") {
                    selem.value = op.editValue;
                    selem.style.left = (st.preTextWidth) + "px";
                    selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                    selem.style.width = (st.itemWidth - 8) + "px";
                    selem.style.height = (st.itemHeight) + "px";
                    selem.addEventListener('change', self.changeFunc);
                    selem.addEventListener('keypress', self.keypressFunc);
                    selem.kvd = kvd;
                    elem.appendChild(selem);

                }

                if (this.subType === "range") {
                    selem.value = op.editValue;
                    selem.style.left = st.dx + "px";
                    selem.style.top = st.dy + (st.dh - st.itemHeight) / 2 + "px";
                    selem.style.width = (st.itemWidth - 4) + "px";
                    selem.style.height = (st.itemHeight - 4) + "px";
                    selem.style.verticalAlign = "center";
                    selem.style.lineHeight = (st.itemHeight - 4) + "px";
                    selem.kvd = kvd;
                    selem.addEventListener('change', self.changeFunc);
                    elem.appendChild(selem);
                }

            }
            if (this.baseType === "select") {
                var selem = document.createElement("select");
                selem.id = this.kid + "_" + this.type;
                self.elems["select"] = selem;
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.textAlign = op.textAlign;

                if (this.subType === "sys") {
                    selem.style.left = st.dx + "px";
                    selem.style.top = st.dy + "px";
                    selem.style.width = (st.dw) + "px";
                    selem.style.height = st.dh + "px";
                    selem.style.fontSize = st.fontSize + "px";
                    if (op.selectHint && op.selectInx < 0) {
                        var opti = new Option(op.selectHint, "-1");
                        opti.selected = "selected";
                        opti.disabled = "disabled";
                        opti.hidden = "hidden";
                        selem.options.add(opti);
                    }

                    for (var i = 0; i < op.options.length; i++) {
                        selem.options.add(new Option(op.options[i], i));
                    }
                    if (op.selectInx >= 0)
                        selem.selectedIndex = op.selectInx;
                    selem.addEventListener('change', self.changeFunc);
                    selem.kvd = kvd;
                    elem.appendChild(selem);
                    self.elems["item"] = selem;

                }
            }

            if (this.baseType === "progress") {
                var kelem = document.createElement("div");
                kelem.style.position = "absolute";
                kelem.style.overflow = "hidden";
                kelem.style.borderRadius = "4px";   /* 圓角 */
                kelem.style.backgroundColor = "#777";
                kelem.style.left = st.dx + "px";
                kelem.style.top = st.dy + "px";
                kelem.style.width = (st.dw) + "px";
                kelem.style.height = (st.dh) + "px";
                elem.appendChild(kelem);

                var len = st.dw * (op.progressValue + op.min) / (op.max - op.min);
                if (len > st.dw)
                    len = st.dw;
                if (len < 0)
                    len = 0;
                var barColor = "#0f0";
                if (op.progressValue < op.limitLow)
                    barColor = "#f66";
                if (op.progressValue > op.limitHigh)
                    barColor = "#f66";
                if (!op.load_f)
                    barColor = "#44f";

                var selem = document.createElement("div");
                selem.id = this.kid + "_" + this.type;
                self.elems["progress"] = selem;
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.borderRadius = "4px";   /* 圓角 */
                selem.style.backgroundColor = barColor;
                selem.style.left = st.dx + "px";
                selem.style.top = st.dy + "px";
                selem.style.width = (len) + "px";
                selem.style.height = (st.dh) + "px";
                selem.style.textAlign = "center";
                if (op.dispValue_f) {
                    selem.innerHTML = op.progressValue.toFixed(op.fixed);
                }
                elem.appendChild(selem);


                return;

            }

            if (this.baseType === "canvas") {
                self.setCanvas();
                if (self.opts.drawFunc)
                    self.opts.drawFunc(self);
                return;
            }

            if (this.baseType === "image") {
                self.setCanvas();
                var canvas = self.elems["canvas"];
                canvas.width = st.cw;
                canvas.height = st.ch;
                canvas.style.pointerEvents = "none";
                self.stas.ctx = canvas.getContext('2d');
                self.stas.img = new Image();
                self.stas.img.src = self.opts.imageUrls[self.opts.imageInx];
                self.stas.img.onload = function () {
                    var img = self.stas.img;
                    self.stas.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, st.cw, st.ch);
                    self.stas.imageLoaded_f = 1;
                };
                if (self.subType === "knob") {
                    var knobPressFunc = function (event) {
                        var kvObj = event.target.kvd.kvObj;
                        var xx = event.offsetX - (st.cw / 2);
                        var yy = (st.ch / 2) - event.offsetY;
                        var rr = st.cw / 2;
                        var dd2 = xx * xx + yy * yy;
                        if (dd2 > (rr * rr))
                            return;
                        if (dd2 < (10 * 10))
                            return;
                        kvObj.stas.actionOn_f = 1;
                        var checkMouseUpFunc = function () {
                            if (gr.mouseDown_f) {
                                setTimeout(checkMouseUpFunc, 100);
                                return;
                            }
                            kvObj.stas.actionOn_f = 0;
                        };
                        setTimeout(checkMouseUpFunc, 100, kvObj);
                        var ang = KvLib.atan(xx, yy);
                        self.stas.preAngle = ang;
                        self.stas.addTmp = 0;
                        if (self.stas.rotateAng) {
                            ang = ang - self.stas.rotateAng;
                            if (ang < 0)
                                ang += 360;
                        }
                        self.stas.nowAngle = ang;
                        //console.log("" + xx + "," + yy + "," + ang);
                    };
                    var knobUpFunc = function (event) {
                        var kvObj = event.target.kvd.kvObj;
                        kvObj.stas.actionOn_f = 0;
                    };
                    var knobMoveFunc = function (event) {
                        var kvObj = event.target.kvd.kvObj;
                        if (!kvObj.stas.actionOn_f)
                            return;
                        if (!gr.mouseDown_f)
                            return;
                        var xx = event.offsetX - (st.cw / 2);
                        var yy = (st.ch / 2) - event.offsetY;
                        var dd2 = xx * xx + yy * yy;
                        if (dd2 < (10 * 10))
                            return;
                        var ang = KvLib.atan(xx, yy);
                        //console.log("" + xx + "," + yy + "," + ang);
                        var addAngle = ang - self.stas.preAngle;
                        self.stas.preAngle = ang;
                        if (addAngle > 180)
                            addAngle = addAngle - 360;
                        if (addAngle < -180)
                            addAngle = 360 + addAngle;
                        self.stas.addTmp += (addAngle) * op.addAngleMul;
                        var intTmp = 0;
                        if (self.stas.addTmp >= 1 || self.stas.addTmp <= 1) {
                            intTmp = self.stas.addTmp | 0;
                            self.stas.addValue = intTmp;
                            self.stas.addTmp -= intTmp;
                        }
                        if (intTmp) {
                            if (self.opts.actionFunc) {
                                var obj = {};
                                obj["act"] = "addValue";
                                obj.value = 0 - intTmp;
                                obj.kvObj = self;
                                self.opts.actionFunc(obj);
                            }
                        }




                        var rotateAng = ang - self.stas.nowAngle;
                        self.stas.rotateAng = rotateAng;
                        //self.stas.nowAngle = ang;
                        KvLib.drawRotated(rotateAng, self.elems["canvas"], self.stas.ctx, self.stas.img, "ccw");


                    };
                    elem = self.elems["base"];
                    elem.addEventListener("mousedown", knobPressFunc);
                    elem.addEventListener("mouseup", knobUpFunc);
                    elem.addEventListener("mousemove", knobMoveFunc);
                }

                return;
            }
            
            
            if (this.baseType === "plot") {
                var opts = {};
                opts.width = st.cw;
                opts.height = st.ch;
                opts.baseId = this.kid;
                KvLib.deepCoverObject(op, opts);
                var plot = new MyPlot("", "plot~sys", op);
                plot.build();
                plot.create();
                self.objs["plot"] = plot;
                self.stas.frameTimer = plot.frameTimer;
                self.stas.chkWatch = plot.chkWatch;
            }

            if (this.baseType === "scope") {
                var opts = {};
                opts.width = st.cw;
                opts.height = st.ch;
                opts.baseId = this.kid;
                KvLib.deepCoverObject(op, opts);
                var scope = new MyScope("", "scope~sys", op);
                scope.build();
                scope.create();
                self.objs["scope"] = scope;
                self.stas.frameTimer = scope.frameTimer;
                self.stas.chkWatch = scope.chkWatch;
            }




            if (this.baseType === "gauge") {
                self.setCanvas();

                var objA = [];
                var strA;
                var obj;
                for (let i = 0; i < op.gg_highlights.length; i++)
                    objA.push(op.gg_highlights[i]);

                var wMore_f = false;
                var radis = st.cw;
                if (radis > st.ch) {
                    radis = st.ch;
                    wMore_f = true;
                }
                if (op.gaugeOffset)
                    radis = radis - op.gaugeOffset * 2;
                var gaugeWidth;
                var gaugeHeight;
                if (wMore_f) {
                    gaugeWidth = radis;
                    gaugeHeight = radis + op.gaugeOffset * 2;
                } else {
                    gaugeWidth = radis;
                    gaugeHeight = st.ch;
                }

                var gaugeWidth = st.cw;
                var gaugeHeight = st.ch;

                var opts = {

                    renderTo: self.opts.canvasId,
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
                    self.opts.chartObj = new LinearGauge(opts);
                else
                    self.opts.chartObj = new RadialGauge(opts);
                self.opts.chartObj.draw();



            }


            if (this.baseType === "chart") {
                self.setCanvas();
                var chartData = {labels: [], datasets: []};
                for (let i = 0; i < op.chartLabels.length; i++)
                    chartData.labels.push(op.chartLabels[i]);
                var xAxe = {
                    gridLines: {
                        offsetGridLines: true,
                        display: true,
                        borderDash: [6, 2],
                        tickMarkLength: 5
                    },
                    ticks: {
                        fontSize: op.chartAxesFontSize,
                        labelOffset: 10,
                        maxRotation: 0
                    }
                };
                var yAxe = {
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true,
                        max: op.chartMax,
                        min: op.chartMin,
                        stepSize: op.chartStep,
                        fontSize: op.chartAxesFontSize
                    }
                };
                switch (self.subType) {
                    case "bar":
                        var dispLegend = false;
                        var opts = {
                            label: op.datasetName,
                            borderColor: op.chartLineColor,
                            borderWidth: 1,
                            backgroundColor: [],
                            data: []
                        };
                        if (op.chartFilter) {
                            for (let i = 0; i < op.chartLabels.length; i++) {
                                var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                                opts.backgroundColor.push(valueObj);
                            }
                        } else {
                            for (let i = 0; i < op.chartBackgroundColors.length; i++)
                                opts.backgroundColor.push(op.chartBackgroundColors[i]);
                        }

                        for (let i = 0; i < op.chartLabels.length; i++) {
                            opts.data.push(op.chartDatas[i]);
                        }
                        chartData.datasets.push(opts);

                        var barScales = {xAxes: [xAxe], yAxes: [yAxe]};
                        var barType = "bar";
                        if (op.yAxe_f) {
                            barType = "horizontalBar";
                            barScales = {xAxes: [yAxe], yAxes: [xAxe]};
                        }
                        break;
                    case "line":
                        var barType = "line";
                        var dispLegend = false;
                        var opts = {
                            label: op.datasetName,
                            borderColor: op.chartLineColor,
                            borderWidth: 1,
                            pointBackgroundColor: [],
                            fill: KvLib.toBoolean(op.chartFill_f),
                            data: []
                        };
                        if (op.chartFilter) {
                            for (let i = 0; i < op.chartLabels.length; i++) {
                                var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                                opts.pointBackgroundColor.push(valueObj);
                            }
                        } else {
                            for (let i = 0; i < op.chartBackgroundColors.length; i++)
                                opts.pointBackgroundColor.push(op.chartBackgroundColors[i]);
                        }
                        for (let i = 0; i < op.chartLabels.length; i++) {
                            opts.data.push(op.chartDatas[i]);
                        }
                        chartData.datasets.push(opts);
                        var barScales = {xAxes: [xAxe], yAxes: [yAxe]};
                        break;
                    case "doughnut":
                    case "pie":
                        var barType = self.subType;
                        var dispLegend = true;
                        var opts = {
                            label: op.datasetName,
                            borderColor: "#000",
                            borderWidth: 1,
                            backgroundColor: [],
                            data: []
                        };
                        if (op.chartFilter) {
                            for (let i = 0; i < op.chartLabels.length; i++) {
                                var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                                opts.backgroundColor.push(valueObj);
                            }
                        } else {
                            for (let i = 0; i < op.chartBackgroundColors.length; i++)
                                opts.backgroundColor.push(op.chartBackgroundColors[i]);
                        }
                        for (let i = 0; i < op.chartLabels.length; i++) {
                            opts.data.push(op.chartDatas[i]);
                        }
                        chartData.datasets.push(opts);
                        var barScales = {};
                        break;
                }
                //========================================
                var ctx = document.getElementById(self.opts.canvasId).getContext('2d');
                self.opts.chartObj = new Chart(ctx, {
                    type: barType,
                    data: chartData,
                    options: {
                        responsive: true,
                        legend: {
                            display: dispLegend,
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: op.title
                        },
                        scales: barScales
                    }
                });
            }


            if (this.baseType === "googleMap") {

                function initialize() {
                    var mapOptions = {
                        center: {lat: op.gm_centerLat, lng: op.gm_centerLng},
                        zoom: op.gm_zoom
                    };
                    var map = new google.maps.Map(
                            self.elems["base"],
                            mapOptions);
                    self.objs["googleMap"] = map;
                }

                try {
                    initialize();
                } catch (e) {
                    console.log(e.toString())
                }
                self.setGoogleMapMarker();
            }


            if (this.baseType === "youtube") {
                if (self.opts.wwwUrls[self.opts.urlsInx]) {
                    var url = self.opts.wwwUrls[self.opts.urlsInx];
                    if (op.autoPlay_f)
                        url += "?autoplay=1";
                    if (!op.controls_f)
                        url += "&controls=0";
                    if (op.loop_f)
                        url += "&loop=1";

                    self.setIframe(url);
                }
            }


            if (this.baseType === "urlReader") {
                if (self.opts.urls[self.opts.urlsInx]) {
                    self.setIframe(self.opts.urls[self.opts.urlsInx]);
                }
            }
            if (this.baseType === "grid") {
                self.setGrid();
            }


            if (this.baseType === "video") {
                self.setVideo();
            }
            if (this.baseType === "editor") {
                //=========================
                /*
                 define('ace/mode/custom', [], function (require, exports, module) {
                 var oop = require("ace/lib/oop");
                 var TextMode = require("ace/mode/text").Mode;
                 var Tokenizer = require("ace/tokenizer").Tokenizer;
                 var CustomHighlightRules = require("ace/mode/custom_highlight_rules").CustomHighlightRules;
                 var Mode = function () {
                 this.HighlightRules = CustomHighlightRules;
                 };
                 oop.inherits(Mode, TextMode);
                 (function () {}).call(Mode.prototype);
                 exports.Mode = Mode;
                 }
                 );
                 */









                var self = this;
                var op = this.opts;
                var selem = document.createElement("div");
                selem.id = this.kid + "_editorDiv";
                selem.style.position = "absolute";
                selem.style.left = 0;
                selem.style.top = 0;
                selem.style.right = 0;
                selem.style.bottom = 0;
                selem.style.backgroundColor = op.baseColor;
                selem.kvd = self;
                self.elems["editor"] = selem;
                self.elems["base"].appendChild(selem);

                var retFunc = function (data) {
                    if (!data)
                        data = "";
                    var elem = self.elems["editor"];
                    //elem.innerHTML = data;
                    if (op.exName === "js")
                        var mode = "ace/mode/javascript";
                    if (op.exName === "css")
                        var mode = "ace/mode/css";
                    if (op.exName === "html")
                        var mode = "ace/mode/html";
                    if (op.exName === "txt")
                        var mode = "ace/mode/text";
                    if (op.exName === "xml")
                        var mode = "ace/mode/xml";
                    if (op.exName === "json")
                        var mode = "ace/mode/json";

                    var hideNo = true;
                    if (op.hideNo_f)
                        hideNo = false;
                    var editor = ace.edit(elem.id, {
                        //maxLines: 30, // 最大行数，超过会自动出现滚动条
                        //minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
                        fontSize: st.fontSize, // 编辑器内字体大小
                        theme: "ace/theme/monokai", // 默认设置的主题
                        mode: mode, // 默认设置的语言模式
                        //value: data.toString(),
                        wrap: op.wrapLine,
                        //useWrapMode: true,   // wrap text to view
                        indentedSoftWrap: true,
                        behavioursEnabled: false, // disable autopairing of brackets and tags
                        showLineNumbers: hideNo, // hide the gutter                        

                        tabSize: 4 // 制表符设置为 4 个空格大小
                    });

                    //editor.session.setMode("ace/mode/custom");
                    //var kkk = editor.session.getMode("ace/mode/custom");
                    //var modes = ace.require('ace/ext/modelist');
                    if (op.readOnly_f)
                        editor.setReadOnly(true);
                    else
                        editor.setReadOnly(false);
                    editor.setShowPrintMargin(false);
                    //editor.getSession().getValue();
                    editor.getSession().setValue(data.toString());
                    self.objs["editor"] = editor;

                    //var Range = ace.require('ace/range').Range;
                    //editor.session.addMarker(new Range(0, 0, 1, 1), "myRedMarker", "fullLine");


                };
                if (op.urls)
                    KvLib.getTextFileFromServer(op.urls[op.urlsInx], retFunc);
                else {
                    retFunc(self.opts.editValue);
                }

                /*
                 selem.src = op.urls[op.urlsInx];
                 selem.kvd = self;
                 self.elems["base"].appendChild(selem);
                 var editor = ace.edit(selem.id);
                 editor.setTheme("ace/theme/monokai");
                 if(op.exName==="js")
                 editor.session.setMode("ace/mode/javascript");
                 if(op.exName==="css")
                 editor.session.setMode("ace/mode/css");
                 if(op.exName==="html")
                 editor.session.setMode("ace/mode/html");
                 */
            }
        }

    }

    setCanvas() {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("canvas");
        selem.id = self.kid + "_canvas";
        selem.width = self.stas.cw;
        selem.height = self.stas.ch;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["canvas"] = selem;
        self.opts.canvasId = selem.id;




    }
    setIframe(url) {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("iframe");
        selem.id = this.kid + "_iframe";
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        selem.src = url;
        selem.allow = "autoplay";
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["iframe"] = selem;
    }

    setVideo() {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("video");
        selem.id = this.kid + "_video";
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        selem.type = "video/mp4";
        selem.autoplay = op.autoPlay_f;
        selem.loop = op.loop_f;
        selem.controls = op.controls_f;
        if (self.opts.urls[self.opts.urlsInx])
            selem.src = self.opts.urls[self.opts.urlsInx];
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["video"] = selem;
    }

    setGoogleMapMarker() {
        var self = this;
        let op = this.opts;
        var marker;
        //=================
        if (!op.mapMarker)
            op.mapMarker = [];
        for (let i = 0; i < op.mapMarker.length; i++)
            op.mapMarker[i].setMap(null);
        op.mapMarker = [];
        op.mapInfWindow = [];

        var googleMapObj = self.objs["googleMap"];
        if (op.gm_markers.length === 0) {
            marker = {
                id: "10005",
                title: '九晟電子股份有限公司',
                lat: 25.061962,
                lng: 121.451209,
                iconIndex: 0,
                inf: '<h2>九晟電子股份有限公司</h2>'
            };
            op.gm_markers.push(marker);
        }
        //=================
        op.gm_makerClickFunc = function (para) {
            for (let i = 0; i < op.gm_markers.length; i++) {
                if (op.gm_markers[i].lat !== para.latLng.lat())
                    continue;
                if (op.gm_markers[i].lng !== para.latLng.lng())
                    continue;
                console.log("Yes " + i);
            }
        };
        for (let i = 0; i < op.gm_markers.length; i++) {
            marker = op.gm_markers[i];
            var tObj = {
                position: {lat: marker.lat, lng: marker.lng},
                map: googleMapObj,
                icon: op.gm_markerIconUrls[marker.iconIndex],
                title: marker.title
            };
            if (marker.id === op.gm_nowMarkerId) {
                tObj.animation = google.maps.Animation.BOUNCE;
                //var latLng = marker.getPosition(); // returns LatLng object
                googleMapObj.setCenter(tObj.position);
            }
            op.mapMarker[i] = new google.maps.Marker(tObj);
            op.mapMarker[i].setMap(googleMapObj);
            op.mapInfWindow[i] = new google.maps.InfoWindow({content: marker.inf});
            op.mapMarker[i].addListener('click', function (para) {
                op.gm_makerClickFunc(para);
                op.mapInfWindow[i].open(googleMapObj, op.mapMarker[i]);
            });
        }
    }

    setGrid() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        //url:https://od.moi.gov.tw/od/data/api/EA28418E-8956-4790-BAF4-C2D3988266CC?$format=json

        /*
         op.gd_headObjs = [
         {field: 'personid', caption: '單位', width: 100},
         {field: 'fname', caption: '網址', width: 100},
         {field: 'lname', caption: 'TgosTWD_Y', width: 100},
         {field: 'email', caption: '地 址', width: 100}
         ];
         */

        /*
         op.gd_records = [
         {'personid': 1, 'fname': 'Sophia', 'lname': 'Hill', 'email': 'sophia_hill@example.com'},
         {'personid': 2, 'fname': 'Aubrey', 'lname': 'Martin', 'email': 'aubrey_martin@example.com'},
         {'personid': 3, 'fname': 'Avery', 'lname': 'Jones', 'email': 'avery_jones@example.com'},
         {'personid': 4, 'fname': 'Joseph', 'lname': 'Rodriguez', 'email': 'joseph_rodriguez@example.com'},
         {'personid': 5, 'fname': 'Samuel', 'lname': 'Campbell', 'email': 'samuel_campbell@example.com'},
         {'personid': 6, 'fname': 'Joshua', 'lname': 'Ortiz', 'email': 'joshua_ortiz@example.com'},
         {'personid': 7, 'fname': 'Mia', 'lname': 'Foster', 'email': 'mia_foster@example.com'},
         {'personid': 8, 'fname': 'Landon', 'lname': 'Lopez', 'email': 'landon_lopez@example.com'},
         {'personid': 9, 'fname': 'Audrey', 'lname': 'Cox', 'email': 'audrey_cox@example.com'},
         {'personid': 10, 'fname': 'Anna', 'lname': 'Ramirez', 'email': 'anna_ramirez@example.com'}
         ];
         */
        st.gdRecords = [];

        var recordFirst = 0;
        if (op.gd_recordsType === "normal")
            recordFirst = 0;
        if (op.gd_recordsType === "headFirst")
            recordFirst = 1;
        if (op.gd_headType === "auto") {
            var headObj = [];
            if (Array.isArray(op.gd_records)) {
                if (op.gd_records.length > 0) {
                    var keys = Object.keys(op.gd_records[0]);
                    switch (op.gd_recordsType) {
                        case "headFirst":
                            var fieldObj = {};
                            for (let k = 0; k < keys.length; k++) {
                                fieldObj["field"] = keys[k];
                                fieldObj["caption"] = op.gd_records[0][keys[k]];
                                fieldObj["width"] = 100;
                                headObj.push(JSON.parse(JSON.stringify(fieldObj)));
                            }
                            break;
                        case "normal":
                        default:
                            var fieldObj = {};
                            for (let k = 0; k < keys.length; k++) {
                                fieldObj["field"] = keys[k];
                                fieldObj["caption"] = keys[k];
                                fieldObj["width"] = 100;
                                headObj.push(JSON.parse(JSON.stringify(fieldObj)));
                            }
                            break;
                    }

                }
            }

        } else {
            var headObj = JSON.parse(JSON.stringify(op.gd_headObjs));
            for (let inx = 0; inx < headObj.length; inx++) {

                if (headObj[inx].style && headObj[inx].style.functionStr) {
                    var styleObj = "";
                    try {
                        eval("styleObj=" + headObj[inx].style);
                    } catch (exception) {
                        console.error(exception);
                        continue;
                    }
                    headObj[inx].style = styleObj;
                }
                if (headObj[inx].columnType) {
                    var astr = headObj[inx].columnType.trim();
                    var strA = astr.split("~");
                    if (strA.length >= 2 && strA[0] === "button") {
                        headObj[inx].columnType = "new cheetahGrid.columns.type.ButtonColumn({ caption: '" + strA[1] + "'});";
                        try {
                            headObj[inx].columnType = eval(headObj[inx].columnType);
                        } catch (exception) {
                            console.error(exception);
                            continue;
                        }
                    } else {
                        headObj[inx].columnType = headObj[inx].columnType;
                    }
                }


                if (headObj[inx].actionStr) {
                    var astr = headObj[inx].actionStr.trim();
                    var strA = astr.split(":");
                    if (strA.length >= 2 && strA[0] === "kvd") {
                        if (astr === "kvd:lineInput") {
                            astr = "new cheetahGrid.columns.action.InlineInputEditor()";
                        }
                        headObj[inx].action = astr;
                        try {
                            headObj[inx].action = eval(headObj[inx].action);
                        } catch (exception) {
                            console.error(exception);
                            continue;
                        }
                    } else {
                        headObj[inx].action = headObj[inx].actionStr;
                    }
                }


            }
        }

        var recordSize = op.gd_records.length - recordFirst;
        var recordStart = op.gd_recordStart + recordFirst;
        var recordLength = recordSize;
        if (op.gd_recordLength) {
            recordLength = op.gd_recordLength;
            if (recordLength > recordSize) {
                recordLength = recordSize;
            }
        }
        for (let k = 0; k < recordLength; k++) {
            var inx = k + recordStart;
            if (inx >= op.gd_records.length)
                break;
            st.gdRecords.push(op.gd_records[inx]);
        }



        st.headObj = headObj;
        var grid = new cheetahGrid.ListGrid({
            parentElement: self.elems["base"],
            header: headObj,
            records: st.gdRecords,
            frozenColCount: op.gd_frozenColCount
        });
        const {
            CLICK_CELL,
            DBLCLICK_CELL,
            DBLTAP_CELL,
            MOUSEDOWN_CELL,
            MOUSEUP_CELL,
            SELECTED_CELL,
            KEYDOWN,
            MOUSEMOVE_CELL,
            MOUSEENTER_CELL,
            MOUSELEAVE_CELL,
            MOUSEOVER_CELL,
            MOUSEOUT_CELL,
            INPUT_CELL,
            PASTE_CELL,
            RESIZE_COLUMN,
            SCROLL,
            CHANGED_VALUE
        } = cheetahGrid.ListGrid.EVENT_TYPE;

        for (var i = 0; i < op.gd_events.length; i++) {
            var funcStr = op.gd_events[i].functionStr;
            if (funcStr && op.gd_events[i].eventType) {
                var etype = op.gd_events[i].eventType;
                var eventFunc = function (args) {
                    var func = null;
                    eval(funcStr);
                    args[0]["eventType"] = etype;
                    func(args[0]);
                };
                grid.listen(op.gd_events[i].eventType, (...args) => eventFunc(args));

                /*
                 try {
                 var func = null;
                 eval(funcStr);
                 grid.listen(op.gd_events[i].eventType, (...args) => eventFunc(args));
                 } catch (exception) {
                 console.error(exception);
                 continue;
                 }
                 * 
                 */

            }
        }

        //grid.listen(CLICK_CELL, (...args) => log(CLICK_CELL, args));

    }

}
