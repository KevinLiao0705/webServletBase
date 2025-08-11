/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gr, KvLib, Kext, Component, ani, MyPlot, InitOpts */

//################################################################################
class MySystem {
    constructor() {
    }
    webInit() {
        var gr = window.gr;
        var elem = document.getElementById('rootBody');
        //===========================================================
        elem.style.width = gr.clientW + 'px';
        elem.style.height = gr.clientH + 'px';
        elem.innerHTML = "";
        //============================================================
        gr.mouseFuncPara = null;
        //============================================================
        gr.scrollWidth = KvLib.getScrollbarWidth();
        //=======================================================
    }

    dispWebPage(modelType) {
        var self = this;
        let gr = window.gr;
        if (modelType)
            gr.nowAppType = modelType;
        else
            gr.nowAppType = gr.appType;
        self.webInit();
        gr.mdSystem = new Block("mdSystem", "Model~MdaPopWin~sys0", {});
        gr.mdSystem.create("rootBody", -1000, -1000, 0, 0);
        if (gr.appPageCnt === 0) {
            if (gr.showLogo_f) {
                var opts = {};
                opts.actionFunc = function () {
                    console.log("logoTimeUp");
                    gr.appPageCnt = 1;
                    self.dispWebPage();
                    return;
                };
                gr.mdMain = mac.showLogo(opts);
                gr.mdMain.create("rootBody");
                return;
            }
            gr.appPageCnt = 1;
        }
        if (gr.appPageCnt === 1) {
            if (gr.enabelLogin_f) {
                var opts = {};
                gr.mdMain = mac.loginBox(opts);
                if (gr.mdMain)
                    gr.mdMain.create("rootBody");
                return;

            }
            gr.appPageCnt = 2;
            self.dispWebPage();
            return;
        }
        if (gr.appPageCnt === 2) {
            gr.mdMain = new Block("mdMain", gr.nowAppType, {});
            gr.mdMain.create("rootBody");
            return;
        }


        return;


        if (!gr.appOpened_f) {
            gr.appOpened_f = 1;
            if (gr.showLogo_f) {
                var opts = {};
                opts.actionFunc = function () {
                    console.log("logoTimeUp");
                };
                gr.mdMain = mac.showLogo(opts);
            }
            gr.mdMain = new Block("mdMain", gr.nowApp, {});
        }




        //gr.webPage = "josnPage";
        if (pageName)
            gr.webPage = pageName;
        else
            gr.webPage = gr.systemName + "Page";
        self.webInit();
        console.log("gr.webPage= " + gr.webPage);
        var page = gr.webPage;
        if (gr.showLogo_f) {
            page = "showLogo";
        }
        switch (page) {
            case "showLogo":
                var opts = {};
                opts.actionFunc = function () {
                    console.log("logoTimeUp");
                };
                gr.mdMain = mac.showLogo(opts);
                gr.mdMain.create("rootBody");
                break;



                gr.mdMain = new Block("test", "Model~MdTest~base.sys0", {}, {});
                gr.mdMain.create("rootBody");
                break;


                gr.mdMain = new Model("showLogo", "Md_logoBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;


                gr.mdMain = new Model("showLogo", "Md_logoBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "loginBox":
                gr.mdMain = new Model("loginBox", "Md_loginBox~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "webFramePage":
                gr.mdMain = new Model("mdTest", "Md_test~a", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "syncPage":
                opts = {};
                opts.pageInx = 0;
                opts.engMode_f = 0;
                gr.mdMain = new Model("mdSync", "Md_sync~sys", opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "webIcsPage":
                opts = {};
                opts.pageInx = 0;
                opts.engMode_f = 0;
                gr.mdMain = new Model("mdWebIcs", "Md_webIcs~sys", opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "futuresPage":
                gr.mdMain = new Model("mdFutures", "Md_futures~sys", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
            case "keyboardOledPage":
                var modelSet = "Model";
                var templateSet = "Md_keyboardOled";
                var typeSet = mac.getSaveType(modelSet, templateSet);
                var opts = {};
                opts.keyMode = 0;
                opts.typeSet = typeSet;
                opts.nowPage = 0;
                gr.mdMain = new Model("mdKeyboardOled", "Md_keyboardOled~" + typeSet, opts, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;



        }
        gr.mdSystem = new Block("mdSystem", "Model~MdaPopWin~sys0", {});
        gr.mdSystem.create("rootBody", -1000, -1000, 0, 0);


    }

    repaint(para)
    {
        var self = this;
        var gr = window.gr;
        var repaint_f = gr.repaint_f;
        gr.repaint_f = 0;
        while (1) {
            if (gr.window_innerWidth_old !== window.innerWidth)
            {
                gr.window_innerWidth_old = window.innerWidth;
                repaint_f = 1;
                console.log("window.innerWidth change");
            }
            if (gr.window_innerHeight_old !== window.innerHeight)
            {
                gr.window_innerHeight_old = window.innerHeight;
                repaint_f = 1;
                console.log("window.innerHeight change");
            }
            if (gr.window_innerHeight_old === -1 || gr.window_innerWidth_old === -1)
                repaint_f = 0;
            break;
        }
        gr.clientH = window.innerHeight - 1;
        gr.clientW = window.innerWidth - 1;
        //======================================================
        if (para === 1)
            repaint_f = 1;
        if (repaint_f !== 0)
            self.dispWebPage();

    }

    //period= Animate.period, unit: ms, about 16ms.
    baseTimer() {
        var self = window.sys;
        if(!self.baseTimerCnt)
            self.baseTimerCnt=0;
        self.baseTimerCnt++;
        self.baseTimerFlag = self.baseTimerCnt ^ self.baseTimerBuf;
        self.baseTimerBuf = self.baseTimerCnt;
        if (self.baseTimerFlag & 0x10)
            gr.flash_f ^= 1;
        if (gr.flash_f)
            gr.flashColor0 = "#fff";
        else
            gr.flashColor0 = "#000";

        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log("baseTimer Over 30ms: " + deltaTime.toFixed(2));
        //=================

        if (gr.footBarMessageTime) {
            gr.footBarMessageTime--;
            if (gr.footBarMessageTime === 0) {
                gr.footBarMessageText = "";
            }
        }


        self.repaint(0);
        
        gr.gbcs.timer();
        
        if (gr.mdMain) {
            gr.mdMain.chkWatch();
        }
        if (gr.mdSystem)
            gr.mdSystem.chkWatch();
        ani.check();
        if (this.hintKvObj) {
            var elem = document.getElementById(this.hintKvObj);
            if (!elem) {
                self.delKvHint();
            }
        }
    }

    sysTimer() {
        var self = window.sys;
        self.sysTimerCnt++;
        self.sysTimerFlag = self.sysTimerCnt ^ self.sysTimerBuf;
        self.sysTimerBuf = self.sysTimerCnt;
        if (self.sysTimerFlag & 0x10)
            gr.flash_f ^= 1;
        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log(deltaTime.toFixed(2));
        //if (gr.ws)
        //    gr.ws.send("testData");
    }

    setKvHint(kvObj, hint) {
        var len = ani.animates.length;
        for (var i = len - 1; i >= 0; i--) {
            var aobj = ani.animates[i];
            if (aobj.elemId === "hintId") {
                ani.animates.splice(i, 1);
            }
        }
        var elem = kvObj.elems["base"];
        if (!elem)
            return;
        var pos = KvLib.getPosition(elem);
        var size = KvLib.hint(hint, -9999, pos.y);
        this.hintKvObj = kvObj.elems["base"].id;
        size.w += 4;

        var stx = pos.x + kvObj.stas.rw - size.w;
        var endx = stx + size.w;
        if ((endx + size.w) > gr.clientW) {
            stx = pos.x;
            endx = stx - size.w;
        }

        ani.setT("hintId", "moveX", endx, endx, 200, 1000);
        ani.setT("hintId", "opacity", 0, 1, 200, 1000);
    }
    delKvHint() {
        var hint = document.getElementById("hintId");
        if (hint) {
            document.body.removeChild(hint);
        }
        this.hintKvObj = null;
    }

    indexLoaded() {
        //InitOpts.initModelOpts();
        //InitOpts.initComponentOpts();
        //MyPlot.init();
        var elem = document.getElementById("rootBody");
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        elem.style.backgroundColor = gr.baseColor;
        elem.style.left = "0px";
        elem.style.top = "0px";
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + "px";
        ani.setTimer();
        //gr.googleMapKeys = ["AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q"];
        for (let k = 0; k < gr.googleMapKeys.length; k++) {
            var script = document.createElement('script');
            //script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k];//AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k] + "&callback=initMap";
            document.head.appendChild(script); //or something of the likes            
        }
        //gr.sysTimerId = setInterval(sys.sysTimer, 20);
    }

    setIpObj(type, inputName, optName) {
        var ipObj = {};
        ipObj.type = type;
        ipObj.inputName = inputName;
        ipObj.optName = optName;
        ipObj.period = 1;
        ipObj.cnt = 0;
        return ipObj;
    }

    setWatch(self, optsName, value) {
        //self.watch["_sysReDraw_f"] = 1;
        if (optsName !== "innerText")
            self.watch["_sysReDraw_f"] = 1;
        self.watch[optsName] = 1;
        /*
        if (value !== undefined)
            self.opts[optsName] = value;
        */                            
    }
    setReDraw(self, optsName, value) {
        self.watch["_sysReDraw_f"] = 1;
        if (!optsName)
            return;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }

}


var sys = new MySystem();


class Kext {
    constructor(_id, _title, _chinese, _opts) {
        this.type = "kext";
        this.id = _id;
        this.text = {};
        this.text.english = _title;
        this.text.chinese = _chinese;
        this.sub = {};
        this.dsc = {};
        this.hint = {};
        if (_opts) {
            this.preText = _opts.preText;
            this.afterText = _opts.afterText;
            this.hint["english"] = _opts.enHint;
            this.hint["chinese"] = _opts.chHint;
            this.sub["english"] = _opts.enSub;
            this.sub["chinese"] = _opts.chSub;
            this.dsc["english"] = _opts.enDsc;
            this.dsc["chinese"] = _opts.chDsc;
        }
        /*
         var obj=this.obj={};
         obj.id=this.id;
         obj.type=this.type;
         obj.text=this.text;
         obj.sub=this.sub;
         obj.hint=this.sub;
         obj.desc=this.sub;
         * 
         */



    }
    static newEzStr(en, ch, id) {
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return JSON.stringify(obj);
    }

    static newEzObj(en, ch, id) {
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return obj;
    }

    static chkKextStr(kextStr) {
        try {
            var kextObj = JSON.parse(kextStr);
            if (kextObj.type === "kext")
                return kextObj;
            return;
        } catch (e) {
            return;
        }
    }

    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getSub(kext) {
        var value = kext.sub[gr.language];
        if (!value)
            value = kext.sub["english"];
        if (!value)
            value = "";
        return value;
    }
    static getDsc(kext) {
        var value = kext.dsc[gr.language];
        if (!value)
            value = kext.dsc["english"];
        if (!value)
            value = "";
        return value;
    }
    static getHint(kext) {
        var value = kext.hint[gr.language];
        if (!value)
            value = kext.hint["english"];
        if (!value)
            value = "";
        return value;
    }

}

