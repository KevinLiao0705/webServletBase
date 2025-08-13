/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gr, sys */

class InitOpts {
    static getSetObjDsc(dsc){
        dsc.setObj = sys.setOptsSet("setObj", "object", "setObject");
        
        dsc.setObj.sons = [];
        var sobj = sys.setOptsSetFix("dataType", "fontFamily");
        sobj.enum = ["str", "num", "dim", "ratio", "color", "flag", "enum","object",'jsText',
            "str~array", "num~array", "dim~array", "ratio~array", "color~array", "flag~array", 
            "enum~array","object~array",'jsText~array'
        ];
        sobj.readOnly_f=1;
        dsc.setObj.sons.push(sobj);
        
        var sobj = sys.setOptsSetFix("setType", "fontFamily");
        sobj.enum = ["inputText", "inputNumber", "inputFloat", "inputColor", "inputBoolean", "select", "inputSelect",
            "selectEditor", "buttonSelect", "system", "editor", "selectUrl", "inputPassword" 
        ];
        sobj.readOnly_f=1;
        dsc.setObj.sons.push(sobj);
        dsc.setObj.sons.push(sys.setOptsSetFix("max", "max"));
        dsc.setObj.sons.push(sys.setOptsSetFix("min", "min"));
        dsc.setObj.sons.push(sys.setOptsSet("nullOk_f", "flag", "inputBoolean"));
        dsc.setObj.sons.push(sys.setOptsSet("readOnly_f", "flag", "inputBoolean"));
        
        
    }
    static initModelOpts() {
        var initMargin = function (aobj) {
            aobj["group~margin&padding"] = [0];
            aobj.margin = 0;
            aobj.lm = null;
            aobj.tm = null;
            aobj.rm = null;
            aobj.bm = null;
            aobj.padding = 0;
            aobj.lpd = null;
            aobj.rpd = null;
            aobj.tpd = null;
            aobj.bpd = null;
        };

        var initModelMargin = function (aobj) {
            aobj["group~margin&padding"] = [0];
            aobj.mMargin = 0;
            aobj.mlm = null;
            aobj.mtm = null;
            aobj.mrm = null;
            aobj.mbm = null;
        };


        var initLocation = function (aobj) {
            aobj["group~location"] = [0];
            aobj.iw = null;
            aobj.ih = null;
            aobj.whr = 0;
            aobj.wAlign = "center";
            aobj.hAlign = "center";
        };

        var initModelLocation = function (aobj) {
            aobj["group~location"] = [0];
            aobj.mw = null;
            aobj.mh = null;
            aobj.whr = 0;
            aobj.wAlign = "center";
            aobj.hAlign = "center";
        };


        var baseObj = gr.modelBaseOpts = {};
        baseObj.propertyWidth = 300;
        baseObj.propertyHeight = 600;
        baseObj.hidden_f = 0;
        baseObj.userRects = {};
        initModelMargin(baseObj);
        initModelLocation(baseObj);
        //=========================================================================================
        //var bobj = gr.modelOpts["Md_test"] = {};
        Md_list.init();
        Md_menu.init();
        Md_pushButton.init();
        Md_selectBox.init();
        Md_numpad.init();
        Md_keyboard.init();
        Md_inputPad.init();

        Md_setArray.init();
        Md_messageBox.init();
        Md_tuner.init();
        Md_colorPicker.init();
        Md_filePicker.init();
        Md_userModel.init();
        Md_kextEditor.init();
        //Md_keyboardOled.init();
        Md_processBox.init();
        Md_fontImageCreater.init();
        //Md_sync.init();
        //Md_webIcs.init();
        //Md_setNames.init();
        Md_viewBox.init();

        var bobj = gr.modelOpts["Md_editOptsBox"] = {};
        var bobj = gr.modelOpts["Md_optsPanel"] = {};
        var bobj = gr.modelOpts["Md_viewKvObj"] = {};

        if ("Md_layout") {
            var bobj = gr.modelOpts["Md_layout"] = {};
            var dsc = bobj["optsDsc"] = {};
            var sobj = bobj["subOpts"] = {};
            var modelOptsFunc = function (obj) {
                obj.propertyWidth = 0;
                obj.propertyHeight = 0;

            };
            if ("sys") {
                modelOptsFunc(bobj);
                var obj = sobj["sys"] = {};
                obj.xc = 1;
                obj.yc = 1;
                obj.xm = 0;
                obj.ym = 0;
                obj.maxIw = 0;
                obj.maxIh = 0;
                obj.color = gr.baseColor;
                obj.borderWidth = 0;
                obj.borderColor = "#000";
            }


        }














        var bobj = gr.modelOpts["Md_ezKextEditor"] = {};
        var bobj = gr.modelOpts["Md_editorPanel"] = {};






    }

    static initComponentOpts() {
        var baseObj = gr.compBaseOpts = {};
        if ("base") {
            baseObj.propertyWidth = 0;
            baseObj.propertyHeight = 0;
            baseObj.hidden_f = 0;
            baseObj.whiteSpace = "nowrap";
            baseObj.inputRegs = [];
        }

        var initOutBase = function (aobj) {
            aobj.baseColor = gr.baseColor;
            aobj.borderWidth = 0;
            aobj.borderColor = "#000";
            aobj.margin = 0;
            aobj.lm = null;
            aobj.tm = null;
            aobj.rm = null;
            aobj.bm = null;
        };
        var initBase = function (aobj) {
            aobj["group~base"] = [0];
            aobj.innerText = "";
            aobj.innerTextColor = "#000";
            aobj.baseColor = gr.baseColor;
            aobj.borderWidth = 0;
            aobj.borderColor = "#000";
            aobj.hint = "";
        };
        var initMargin = function (aobj) {
            aobj["group~margin&padding"] = [0];
            aobj.margin = 0;
            aobj.lm = null;
            aobj.tm = null;
            aobj.rm = null;
            aobj.bm = null;
            aobj.padding = 0;
            aobj.lpd = null;
            aobj.rpd = null;
            aobj.tpd = null;
            aobj.bpd = null;
        };
        var initLocation = function (aobj) {
            aobj["group~location"] = [0];
            aobj.iw = null;
            aobj.ih = null;
            aobj.whr = 0;
            aobj.wAlign = "center";
            aobj.hAlign = "center";
        };
        var initPreText = function (aobj) {
            aobj["group~preText"] = [0];
            aobj.preText = "";
            aobj.preTextWidth = 0;
            aobj.preTextHeight = "0.5rh";

            aobj.preTextFontSize = "0.6rh";
            aobj.preTextAlign = "left";
            aobj.preTextLpd = 4;
            aobj.preTextRpd = 4;
            aobj.preTextBackgroundColor = "#ccd";
            aobj.preTextTextColor = "#222";
            aobj.preTextBorderWidth = 1;
            aobj.preTextAlign = "left";
            aobj.preTextLine2_f = 0;
            aobj.preTextBorderColor = "#000";
        };
        var initAfterText = function (aobj) {
            aobj["group~afterText"] = [0];
            aobj.afterText = "";
            aobj.afterTextWidth = 0;
            aobj.afterTextFontSize = "0.6rh";
            aobj.afterTextAlign = "left";
            aobj.afterTextLpd = 4;
            aobj.afterTextRpd = 4;
            aobj.afterTextBackgroundColor = "#ccd";
            aobj.afterTextBorderWidth = 1;
            aobj.afterTextPos = "end";//end,follow
            aobj.afterTextAlign = "center";
        };
        var initShadow = function (aobj) {
            aobj["group~shadow"] = [0];
            aobj.insideShadowBlur = 0;
            aobj.insideShadowColor = "#000";
            aobj.insideShadowOffx = 0;
            aobj.insideShadowOffy = 0;
            aobj.outsideShadowColor = "#000";
            aobj.outsideShadowBlur = 0;
            aobj.outsideShadowOffx = 10;
            aobj.outsideShadowOffy = 10;
        };
        var initBackground = function (aobj) {
            aobj["group~background"] = [0];
            aobj.background = "";
            aobj.backgroundInx = null;
            aobj.backgroundColors = [];
            aobj.backgroundImageUrls = [];
            aobj.backgroundRepeat = "no-repeat"; //repeat/repeat-x,repeat-y/no-repeat;
            aobj.backgroundImagePosition = "fit"; //extend,center,fit
        };
        var initFont = function (aobj) {
            aobj["group~font"] = [0];
            aobj.fontSize = "0.6rh";
            aobj.fontFamily = "monospace";
            aobj.fontWeight = "normal";//normal,bold
            aobj.fontStyle = "normal";//normal,italic
            aobj.maxByte = 0;
            aobj.textAlign = "center";
            aobj.textShadow = null;
        };
        var initButton = function (aobj) {
            aobj.onMouseOn = "mouseOnType0";
            aobj.onMousePress = "mousePressType0";
            aobj.mouseOnBorderColor = "#fff";
            aobj.mouseOnTextColor = "";
            aobj.mouseOnColor = "";
            aobj.cursor = "pointer";
            aobj.fontSize = 0;
            aobj.disableTextColor = "#aaa";
            aobj.disable_f = 0;
            aobj.propertyWidth = 200;
            aobj.propertyHeight = 50;
            aobj.innerText = "Title";
        };
        //==================================================
        `
        gr.compOpts["button"]
        gr.compOpts["button"]["subOpts"]
        gr.compOpts["button"]["subOpts"]['sys']
        gr.compOpts["button"]["subOpts"]['icon']
        gr.compOpts["button"]["subOpts"]['simple']
        gr.compOpts["button"]["subOpts"]['light']
        gr.compOpts["button"]["subOpts"]['menu']
        gr.compOpts["button"]["subOpts"]['menuButton']
        gr.compOpts["button"]["subOpts"]['item']
        ...
        ...
        gr.compOpts["button"]["delOpts"]
        gr.compOpts["button"]["delOpts"]['light']
        ...
        ...
`;

        if ("button") {
            var bobj = gr.compOpts["button"] = {};
            var sobj = bobj["subOpts"] = {};
            var delobj = bobj["delOpts"] = {};

            if ("button") {
                var buttonOpts = function (bobj) {
                    initBase(bobj);
                    initMargin(bobj);
                    initLocation(bobj);
                    initPreText(bobj);
                    initAfterText(bobj);
                    initShadow(bobj);
                    initBackground(bobj);
                    initFont(bobj);
                    initButton(bobj);
                };
                buttonOpts(bobj);
            }
            //==============
            var obj = sobj["sys"] = {};
            if ("button~sys") {
                obj.baseColor = "#ccc";
                obj.borderWidth = 1;
                obj.insideShadowBlur = "0.2rh";
                obj.textShadow = "1px 1px 1px #fff";
                obj.fontWeight = "bold";
                obj.padding = 4;
                obj.borderRadius = "0.15rh";
            }

            var obj = sobj["check"] = {};
            if ("button~check") {
                obj.baseColor = "#eef";
                obj.borderWidth = 2;
                obj.insideShadowBlur = "0.1rh";
                obj.textShadow = "1px 1px 1px #fff";
                obj.fontWeight = "bold";
                obj.fontSize="0.8rh";
                obj.innerTextColor="#080";
                obj.padding = 4;
                //obj.borderRadius = "0.15rh";
                obj.checked_f = 0;
            }
            
            
            var obj = sobj["checkName"] = {};
            if ("button~checkName") {
                obj.baseColor = "#ccc";
                obj.borderWidth = 1;
                obj.insideShadowBlur = "0.2rh";
                obj.textShadow = "1px 1px 1px #fff";
                obj.fontWeight = "bold";
                obj.padding = 4;
                obj.borderRadius = "0.15rh";
                obj.preText ='<i class="gf">&#xe5ca</i>';
                obj.preTextTextColor ="#080";
                obj.preTextAlign="center";
                obj.preTextWidth = 50;
                obj.fontSize = "0.5rh";
                obj.checked_f = 0;
                
                
                
            }
            
            
            
            //==============
            var obj = sobj["icon"] = {};
            if ("button~icon") {
                obj.baseColor = "#ccc";
                obj.borderWidth = 1;
                obj.innerText = "";
                obj.insideShadowBlur = "0.2rh";
                obj.fontWeight = "bold";
                obj.backgroundInx = 0;
                obj.backgroundImageUrls = ['./systemResource/set.png'];

            }
            var obj = sobj["iconFont"] = {};
            if ("button~icon") {
                obj.baseColor = "#ccc";
                obj.borderWidth = 1;
                obj.innerText = "";
                obj.insideShadowBlur = "0.2rh";
                obj.fontWeight = "bold";

            }
            
            
            
            var obj = sobj["simple"] = {};
            if ("button~simple") {
                obj.baseColor = "#ccc";
                obj.borderWidth = 1;
                obj.textShadow = "1px 1px 1px #fff";
                obj.fontWeight = "bold";
            }
            var obj = sobj["light"] = {};
            if ("button~light") {
                var dobj = delobj["light"] = {};
                dobj.innerTextColor = 1;
                dobj.baseColor = 1;
                dobj.borderColor = 1;
                dobj["group~background"] = [1];
                dobj.background = 1;
                dobj.backgroundInx = 1;
                dobj.backgroundColors = 1;
                dobj.backgroundImageUrls = 1;
                dobj.backgroundRepeat = 1; //repeat/repeat-x,repeat-y/no-repeat;
                dobj.backgroundImagePosition = 1;

                obj.altColors = ["#f55", "#400", "#4f4", "#030", "#88f", "#00a"];
                obj.altColorInx = 0;
                obj.end = 1;
                var altColor = obj.altColors[obj.altColorInx];
                obj.margin = 2;
                obj.baseColor = "#000";
                obj.disableTextColor = "#aaa";
                obj.borderWidth = 2;
                obj.borderColor = altColor;
                obj.innerTextColor = altColor;
                obj.insideShadowBlur = "0.2rh";
                obj.insideShadowColor = altColor;
            }
            //==============
            var obj = sobj["menu"] = {};
            if ("button~menu") {
                obj.shrinkX_f = 1;
                obj.fontSize = "0.5rh";
                obj.fontWeight = "normal";
                obj.baseColor = "#222";
                obj.mouseOnColor = "#666";
                obj.mouseOnTextColor = "#ddd";
                obj.innerTextColor = "#aaa";
                obj.insideShadowBlur = 0;
                obj.outsideShadowBlur = 0;
                obj.textShadow = "2px 2px 2px #000";
                obj.lpd = 6;
                obj.rpd = 6;
            }

            //==============
            var obj = sobj["menuButton"] = {};
            if ("button~menuButton") {
                obj.shrinkX_f = 1;
                obj.lpd = 4;
                obj.rpd = 4;
                obj.fontWeight = "normal";
                obj.margin = 1;
                obj.baseColor = "#ccc";
                obj.disableTextColor = "#aaa";
                obj.borderWidth = 1;
                obj.insideShadowBlur = "0.2rh";
                obj.textShadow = "1px 1px 1px #fff";
            }


            //==============
            var obj = sobj["item"] = {};
            if ("button~item") {
                obj.fontWeight = "normal";
                obj.textAlign = "left";
                obj.baseColor = "#222";
                obj.disableTextColor = "#444";
                obj.mouseOnColor = "#666";
                obj.mouseOnTextColor = "#ddd";
                obj.innerTextColor = "#888";
                obj.insideShadowBlur = 0;
                obj.outsideShadowBlur = 0;
                obj.lpd = 4;
                obj.preText = "";
                obj.preTextLpd = 10;
                obj.preTextRpd = 10;
            }
        }
        //==================================================
        if ("label") {
            var bobj = gr.compOpts["label"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("label") {
                initBase(bobj);
                initMargin(bobj);
                initLocation(bobj);
                initPreText(bobj);
                initAfterText(bobj);
                initShadow(bobj);
                initBackground(bobj);
                initFont(bobj);
                bobj.fontWeight = "normal";
                bobj.propertyWidth = 200;
                bobj.propertyHeight = 50;
                bobj.textAlign = "left";
                bobj.lpd = 4;
            }
            //==============
            var obj = sobj["sys"] = {};
            if ("label~sys") {
                obj.baseColor = "#ccd";
                obj.borderWidth = 1;
                obj.fontWeight="bold";
                obj.textShadow = "1px 1px 1px #fff";
                obj.innerText = "labelText";
            }
            //==============
            var obj = sobj["namePanel"] = {};
            if ("label~namePanel") {
                obj.baseColor = "#bbd";
                obj.borderWidth = 1;
                obj.fontWeight = "bold";
                obj.textAlign = "center";
                obj.innerText = "labelText";
                obj.textShadow = "1px 1px 1px #fff";
            }

            var obj = sobj["valuePanel"] = {};
            if ("label~valuePanel") {
                obj.baseColor = "#fff";
                obj.borderWidth = 1;
                obj.fontWeight = "bold";
                obj.textAlign = "center";
                obj.innerText = "labelText";
            }


            //==============
            var obj = sobj["light"] = {};
            if ("label~light") {
                obj.altColors = ["#f55", "#400", "#4f4", "#030", "#88f", "#00a"];
                obj.altColorInx = 0;
                obj.margin = 2;
                obj.baseColor = "#000";
                obj.borderWidth = 2;
                obj.borderColor = altColor;
                obj.innerTextColor = altColor;
                obj.insideShadowBlur = "0.2rh";
                obj.insideShadowColor = altColor;
                obj.textAlign = "center";
                obj.innerText = "labelText";
            }










            var obj = sobj["led"] = {};
            if ("label~led") {
                obj.propertyWidth = 100;
                obj.propertyHeight = 100;
                obj.baseColor = "#bbb";
                obj.borderWidth = 1;
                obj.textShadow = "1px 1px 1px #fff";
                obj.borderRadius = "0.5rh";
                obj.whr = 1;

                obj.backgroundInx = 0;
                obj.backgroundImageUrls = [];
                obj.backgroundImageUrls.push('./systemResource/led_base.png');
                obj.backgroundImageUrls.push('./systemResource/led_green.png');
                obj.backgroundImageUrls.push('./systemResource/led_red1.png');
                obj.backgroundImageUrls.push('./systemResource/led_yellow.png');
                obj.backgroundImageUrls.push('./systemResource/led_blue.png');
                obj.end = 1;
                obj.boxShadows = [];
                obj.boxShadows.push("");//none
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, rgba(0, 255, 0, 0.5) 0 2px 12px");//green
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px");//red
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, rgba(255, 255, 0, 0.5) 0 2px 12px");//yellow
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, rgba(0, 0, 255, 0.5) 0 2px 12px");//blue
                obj.boxShadows.push("");
                obj.boxShadows.push("");
                obj.boxShadows.push("");
                obj.margin = 10;
            }
            
            var obj = sobj["ledBar"] = {};
            if ("label~ledBar") {
                obj.propertyWidth = 100;
                obj.propertyHeight = 20;
                obj.baseColor = "#888";
                obj.borderWidth = 0;
                obj.borderRadius = "0.5rh";
                obj.backgroundInx = 0;
                obj.backgroundColors = [];
                obj.backgroundColors.push('#444');
                obj.backgroundColors.push('#f00');
                obj.backgroundColors.push('#4f4');
                obj.backgroundColors.push('#44f');
                obj.backgroundColors.push('#ff4');
                obj.end = 1;
                obj.boxShadows = [];
                obj.boxShadows.push("");//none
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px");//green
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(0, 255, 0, 0.5) 0 2px 12px");//red
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, rgba(0, 0, 255, 0.5) 0 2px 12px");//blue
                obj.boxShadows.push("rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, rgba(255, 255, 0, 0.5) 0 2px 12px");//yellow
                obj.boxShadows.push("");
                obj.boxShadows.push("");
                obj.boxShadows.push("");
                obj.margin = 0;
            }
            
            
            //==============
            var obj = sobj["message"] = {};
            if ("label~message") {
                obj.baseColor = "#ccc";
                obj.borderColor = "#000 #fff #fff #000";
                obj.borderWidth = 1;
                obj.innerText = "messageText";
            }
            //==============
            var obj = sobj["meter"] = {};
            if ("label~meter") {
                obj.altColors = ["#f55", "#4f4", "#88f"];
                obj.altColorInx = 0;
                var altColor = obj.altColors[obj.altColorInx];
                obj.fontFamily = "digital_3";
                obj.textAlign = "center";
                obj.innerText = "1234";
                obj.fontSize = 0;
                obj.margin = 2;
                obj.baseColor = "#000";
                obj.borderWidth = 2;
                obj.borderColor = altColor;
                obj.innerTextColor = altColor;
                obj.insideShadowBlur = "0.2rh";
                obj.insideShadowColor = altColor;
                obj.outsideShadowBlur = 10;
                obj.outsideShadowOffx = 0;
                obj.outsideShadowOffy = 0;
                obj.outsideShadowColor = altColor;
            }
            //==============
            var obj = sobj["sepLineV"] = {};
            if ("label~sepLineV") {
                obj.tm = 2;
                obj.bm = 2;
                obj.baseColor = "#777";
                obj.borderColor = "#777";
                obj.wAlign = "left";
                obj.lpd = 1;
                obj.end = 1;
                obj.shrinkX_f = 1;
            }
            //==============
            var obj = sobj["sepLineH"] = {};
            if ("label~sepLineH") {
                obj.margin = 0;
                obj.tm = 4;
                obj.bm = 6;
                obj.lm = 4;
                obj.rm = 4;
                obj.iw = null;
                obj.ih = 1;
                obj.whr = 0;
                obj.tpd = 0;
                obj.bpd = 0;
                obj.innerText = "";
                obj.baseColor = "#ccc";
                obj.borderColor = "#000 #fff #fff #000";
                obj.borderWidth = 1;
                obj.hAlign = "top";
                obj.end = 1;
                obj.shrinkY_f = 1;
            }
        }
        //==================================================
        if ("textarea") {
            var bobj = gr.compOpts["textarea"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("textarea") {
                initBase(bobj);
                initMargin(bobj);
                initLocation(bobj);
                initFont(bobj);
                delete bobj.hint;
                delete bobj.innerText;
                delete bobj.padding;
                delete bobj.lpd;
                delete bobj.rpd;
                delete bobj.tpd;
                delete bobj.bpd;
                delete bobj.maxByte;
                delete bobj.textShadow;

                bobj.propertyWidth = 600;
                bobj.propertyHeight = 400;
                bobj.fontSize = "14";
                bobj.scrollY = "none";
                bobj.readOnly_f = 0;

            }
            //==============
            var obj = sobj["sys0"] = {};
            if ("textarea~sys0") {
                obj.baseColor = "#eef";
                obj.textAlign = "left";
                obj.textValue = "editValue";
            }
        }
        //==================================================
        if ("input") {
            var bobj = gr.compOpts["input"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("input") {
                initBase(bobj);
                initMargin(bobj);
                initLocation(bobj);
                initPreText(bobj);
                initAfterText(bobj);
                initShadow(bobj);
                initBackground(bobj);
                initFont(bobj);
                bobj.preTextBorderWidth = 1;
                bobj.propertyWidth = 300;
                bobj.propertyHeight = 40;


            }
            //==============
            var obj = sobj["text"] = {};
            if ("input~text") {
                obj.baseColor = "#eef";
                obj.minCharLength = 0;
                obj.maxCharLength = 32;
                obj.preText = "pre";
                obj.editValue = "editValue";
                obj.heightSubK = 6;
            }
            //==============
            var obj = sobj["password"] = {};
            if ("input~password") {
                obj.baseColor = "#eef";
                obj.minCharLength = 0;
                obj.maxCharLength = 32;
                obj.preText = "pre";
                obj.editValue = "editValue";
                obj.heightSubK = 6;
            }
            //==============
            var obj = sobj["radio"] = {};
            if ("input~radio") {
                obj.baseColor = "#eef";
                obj.disableTextColor = "#444";
                obj.groupName = "foo";
                obj.editValue = 0;
                obj.preText = "No.";
                obj.itemWidth = 30;
                obj.itemHeight = 20;
                obj.afterText = "";
                obj.lpd = 40;
                obj.innerText = "item";
            }
            //==============
            var obj = sobj["checkbox"] = {};
            if ("input~checkbox") {
                obj.baseColor = "#eef";
                obj.disableTextColor = "#444";
                obj.editValue = 0;
                obj.preText = "No.";
                obj.itemWidth = 30;
                obj.itemHeight = 20;
                obj.afterText = "";
                obj.lpd = 40;
                obj.innerText = "item";
            }
            //==============
            var obj = sobj["color"] = {};
            if ("input~color") {
                obj.baseColor = "#eef";
                obj.preText = "pre";
                obj.itemHeight = "0.8rh";
                obj.afterText = "aft";
                obj.afterTextPos = "follow";

            }
            //==============
            var obj = sobj["number"] = {};
            if ("input~number") {
                obj.editValue = "0";
                obj.baseColor = "#eef";
                obj.preText = "pre";
                obj.itemHeight = "0.8rh";
                obj.min = 0;
                obj.max = 100;
                obj.afterText = "aft";
            }
            //==============
            var obj = sobj["range"] = {};
            if ("input~range") {
                obj.editValue = "0";
                obj.baseColor = "#eef";
                obj.preText = "pre";
                obj.itemHeight = "0.8rh";
                obj.min = 0;
                obj.max = 100;
                obj.afterText = "aft";
                obj.mulRate = null;
                obj.fixed = 2;
            }
        }
        //==================================================
        if ("progress") {
            var bobj = gr.compOpts["progress"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("progress") {
                initBase(bobj);
                initMargin(bobj);
                initLocation(bobj);
                initPreText(bobj);
                initAfterText(bobj);
                bobj.propertyWidth = 400;
                bobj.propertyHeight = 50;
                bobj.margin = 0;
            }
            var obj = sobj["sys"] = {};
            if ("progress~sys") {
                obj.baseColor = "rgba(0,0,0,0)";
                obj.min = 0;
                obj.max = 100;
                obj.limitLow = 20;
                obj.limitHigh = 80;
                obj.progressValue = 50;
                obj.dispValue_f=1;
                obj.load_f=0; 
                obj.fixed=0; 
                
                
                /*    
                obj.progressColor = "#00f";
                obj.progressValue = 0;
                obj.preTextBackgroundColor="#222";
                obj.preTextTextColor="#fff";
                obj.preTextBorderWidth=0;
                obj.afterText=obj.progressValue+"%";
                obj.afterTextBackgroundColor="#222";
                obj.afterTextColor="#fff";
                obj.afterTextBorderWidth=0;
                obj.afterTextWidth=50;
                 * 
                 */
                
            }
        }
        //==================================================
        if ("select") {
            var bobj = gr.compOpts["select"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("select") {
                initBase(bobj);
                initMargin(bobj);
                initLocation(bobj);
                initPreText(bobj);
                initAfterText(bobj);
                initFont(bobj);
                bobj.propertyWidth = 400;
                bobj.propertyHeight = 50;
            }
            var obj = sobj["sys"] = {};
            if ("select~sys") {
                obj.textAlign = "left";
                obj.borderWidth = 1;
                obj.preText = "pre";
                obj.selectHint = "Input Your Select.";
                obj.selectInx = -1;
                obj.options = ["abc", "def"];
            }
        }
        //==================================================
        if ("gauge") {
            var bobj = gr.compOpts["gauge"] = {};
            var sobj = bobj["subOpts"] = {};
            var dsc = bobj["optsDsc"] = {};
            if ("gauge") {
                bobj.propertyWidth = 400;
                bobj.propertyHeight = 400;
                initOutBase(bobj);
                bobj.gg_linear_f = 0;
                dsc.gg_linear_f = sys.setOptsSet("gg_linear_f", "flag", "inputBoolean");

                bobj.gaugeOffset = 10;
                dsc.gaugeOffset = sys.setOptsSet("gaugeOffset", "num", "inputNumber");
                bobj.gaugeValue = 100;
                dsc.gaugeValue = sys.setOptsSet("gaugeValue", "num", "inputNumber");
                bobj.gg_minValue = 0;
                dsc.gg_minValue = sys.setOptsSet("gg_minValue", "num", "inputNumber");
                bobj.gg_maxValue = 220;
                dsc.gg_maxValue = sys.setOptsSet("gg_maxValue", "num", "inputNumber");
                bobj.gg_colorPlate = '#222';
                dsc.gg_colorPlate = sys.setOptsSet("gg_colorPlate", "color", "selectColor");
                bobj.gg_barWidth = 4;
                dsc.gg_barWidth = sys.setOptsSet("gg_barWidth", "num", "inputNumber");


                bobj.gg_animationRule = 'bounce';
                dsc.gg_animationRule = sys.setOptsSetFix("gg_animationRule", "textAlign");
                dsc.gg_animationRule.enum = ["linear", "quad", "dequad", "quint", "dequint", "cycle", "decycle", "bounce", "debounce", "elastic", "delastic"];
                bobj.gg_animationDuration = 500;
                dsc.gg_animationDuration = sys.setOptsSet("gg_animationDuration", "num", "inputNumber");
                bobj.gg_animatedValue_f = 0;
                dsc.gg_animatedValue_f = sys.setOptsSet("gg_animatedValue_f", "flag", "inputBoolean");
                bobj.gg_animationTarget = "needle";//plate/needle
                dsc.gg_animationTarget = sys.setOptsSetFix("gg_animationTarget", "textAlign");
                dsc.gg_animationTarget.enum = ["needle", "plate"];

                bobj.gg_colorBarProgress = "rgba(50,200,50,.75)";
                dsc.gg_colorBarProgress = sys.setOptsSet("gg_colorBarProgress", "color", "selectColor");
                //=======================================



                bobj["group~Ticks"] = [0, "gg_majorTicks", "gg_minorTicks", "gg_colorMajorTicks", "gg_needleEnd", "gg_colorMinorTicks"
                            , "gg_colorMinorTicks", "gg_highlights", "gg_ticksAngle", "gg_startAngle"
                ];



                bobj.gg_majorTicks = ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'];
                dsc.gg_majorTicks = sys.setOptsSet("gg_majorTicks", "str~array", "inputText~array");

                bobj.gg_minorTicks = 2;
                dsc.gg_minorTicks = sys.setOptsSet("gg_minorTicks", "num", "inputNumber");
                bobj.gg_colorMajorTicks = '#f5f5f5';
                dsc.gg_colorMajorTicks = sys.setOptsSet("gg_colorMajorTicks", "color", "selectColor");
                bobj.gg_colorMinorTicks = '#ddd';
                dsc.gg_colorMinorTicks = sys.setOptsSet("gg_colorMinorTicks", "color", "selectColor");
                bobj.gg_highlights = [
                    {from: 0, to: 50, color: "rgba(0,255,0,.15)"},
                    {from: 50, to: 100, color: "rgba(255,255,0,.15)"},
                    {from: 100, to: 150, color: "rgba(255,30,0,.25)"},
                    {from: 150, to: 200, color: "rgba(255,0,225,.25)"},
                    {from: 200, to: 220, color: "rgba(0,0,255,.25)"}
                ];
                dsc.gg_highlights = sys.setOptsSet("gg_highlights", "object~array", "setObject~array");
                dsc.gg_highlights.sons = [];
                dsc.gg_highlights.sons.push(sys.setOptsSet("from", "ratio", "inputFloat"));
                dsc.gg_highlights.sons.push(sys.setOptsSet("to", "ratio", "inputFloat"));
                dsc.gg_highlights.sons.push(sys.setOptsSet("color", "color", "selectColor"));
                bobj.gg_ticksAngle = 225;
                dsc.gg_ticksAngle = sys.setOptsSet("gg_ticksAngle", "ratio", "inputFloat");
                bobj.gg_startAngle = 67.5;
                dsc.gg_startAngle = sys.setOptsSet("gg_startAngle", "ratio", "inputFloat");
                //=======================================
                bobj["group~Needle"] = [0, "gg_needleType", "gg_needleWidth", "gg_needleStart", "gg_needleEnd", "gg_colorNeedle"
                            , "gg_colorNeedleEnd", "gg_colorNeedleShadowUp", "gg_colorNeedleShadowDown", "gg_needleCircleSize", "gg_needleCircleOuter_f"
                            , "gg_needleCircleInner_f", "gg_colorNeedleCircleOuter", "gg_colorNeedleCircleOuterEnd", "gg_colorNeedleCircleInner"
                            , "gg_colorNeedleCircleInnerEnd"
                ];
                bobj.gg_needleType = "arrow";
                dsc.gg_needleType = sys.setOptsSetFix("gg_needleType", "textAlign");
                dsc.gg_needleType.enum = ["arrow", "line"];



                bobj.gg_needleWidth = 2;
                dsc.gg_needleWidth = sys.setOptsSet("gg_needleWidth", "num", "inputNumber");
                bobj.gg_needleStart = 20;
                dsc.gg_needleStart = sys.setOptsSet("gg_needleStart", "num", "inputNumber");
                bobj.gg_needleEnd = 99;
                dsc.gg_needleEnd = sys.setOptsSet("gg_needleEnd", "num", "inputNumber");
                bobj.gg_colorNeedle = 'rgba(240, 128, 128, 1)';
                dsc.gg_colorNeedle = sys.setOptsSet("gg_colorNeedle", "color", "selectColor");
                bobj.gg_colorNeedleEnd = 'rgba(255, 160, 122, .9)';
                dsc.gg_colorNeedleEnd = sys.setOptsSet("gg_colorNeedleEnd", "color", "selectColor");
                bobj.gg_colorNeedleShadowUp = "#ccc";
                dsc.gg_colorNeedleShadowUp = sys.setOptsSet("gg_colorNeedleShadowUp", "color", "selectColor");
                bobj.gg_colorNeedleShadowDown = "#333";
                dsc.gg_colorNeedleShadowDown = sys.setOptsSet("gg_colorNeedleShadowDown", "color", "selectColor");
                bobj.gg_needleCircleSize = 7;
                dsc.gg_needleCircleSize = sys.setOptsSet("gg_needleCircleSize", "num", "inputNumber");
                bobj.gg_needleCircleOuter_f = 1;//boolean
                dsc.gg_needleCircleOuter_f = sys.setOptsSet("gg_needleCircleOuter_f", "flag", "inputBoolean");
                bobj.gg_needleCircleInner_f = 1;
                dsc.gg_needleCircleInner_f = sys.setOptsSet("gg_needleCircleInner_f", "flag", "inputBoolean");
                bobj.gg_colorNeedleCircleOuter = "#888";
                dsc.gg_colorNeedleCircleOuter = sys.setOptsSet("gg_colorNeedleCircleOuter", "color", "selectColor");
                bobj.gg_colorNeedleCircleOuterEnd = "#777";
                dsc.gg_colorNeedleCircleOuterEnd = sys.setOptsSet("gg_colorNeedleCircleOuterEnd", "color", "selectColor");
                bobj.gg_colorNeedleCircleInner = "#f00";
                dsc.gg_colorNeedleCircleInner = sys.setOptsSet("gg_colorNeedleCircleInner", "color", "selectColor");
                bobj.gg_colorNeedleCircleInnerEnd = "#f00";
                dsc.gg_colorNeedleCircleInnerEnd = sys.setOptsSet("gg_colorNeedleCircleInnerEnd", "color", "selectColor");
                //=======================================
                bobj["group~BarGauge"] = [0, "gg_gaugeWidth", "gg_gaugeHeight", "gg_tickSide"
                            , "gg_numberSide", "gg_needleSide", "gg_barBeginCircle_f"
                ];


                bobj.gg_gaugeWidth = 1;
                dsc.gg_gaugeWidth = sys.setOptsSet("gg_gaugeWidth", "num", "inputNumber");
                bobj.gg_gaugeHeight = 1;
                dsc.gg_gaugeHeight = sys.setOptsSet("gg_gaugeHeight", "num", "inputNumber");
                bobj.gg_tickSide = "both";
                dsc.gg_tickSide = sys.setOptsSetFix("gg_tickSide", "bothLeftRight");
                bobj.gg_numberSide = "left";
                dsc.gg_numberSide = sys.setOptsSetFix("gg_numberSide", "leftRight");
                bobj.gg_needleSide = "left";
                dsc.gg_needleSide = sys.setOptsSetFix("gg_needleSide", "leftRight");
                bobj.gg_barBeginCircle_f = 1;
                dsc.gg_barBeginCircle_f = sys.setOptsSet("gg_barBeginCircle_f", "flag", "inputBoolean");
                //=======================================
                bobj["group~Border"] = [0, "gg_borders_f", "gg_borderShadowWidth", "gg_colorBorderOuter", "gg_colorBorderOuterEnd", "gg_colorBorderMiddle"
                            , "gg_colorBorderMiddleEnd", "gg_colorBorderInner", "gg_colorBorderInnerEnd", "gg_borderInnerWidth", "gg_borderMiddleWidth"
                            , "gg_borderOuterWidth"
                ];
                bobj.gg_borders_f = 1;
                dsc.gg_borders_f = sys.setOptsSet("gg_borders_f", "flag", "inputBoolean");
                bobj.gg_borderShadowWidth = 0;
                dsc.gg_borderShadowWidth = sys.setOptsSet("gg_borderShadowWidth", "num", "inputNumber");
                bobj.gg_colorBorderOuter = "#ccc";
                dsc.gg_colorBorderOuter = sys.setOptsSet("gg_colorBorderOuter", "color", "selectColor");
                bobj.gg_colorBorderOuterEnd = "#aaa";
                dsc.gg_colorBorderOuterEnd = sys.setOptsSet("gg_colorBorderOuterEnd", "color", "selectColor");
                bobj.gg_colorBorderMiddle = "#222";
                dsc.gg_colorBorderMiddle = sys.setOptsSet("gg_colorBorderMiddle", "color", "selectColor");
                bobj.gg_colorBorderMiddleEnd = "#111";
                dsc.gg_colorBorderMiddleEnd = sys.setOptsSet("gg_colorBorderMiddleEnd", "color", "selectColor");
                bobj.gg_colorBorderInner = "#111";
                dsc.gg_colorBorderInner = sys.setOptsSet("gg_colorBorderInner", "color", "selectColor");
                bobj.gg_colorBorderInnerEnd = "#333";
                dsc.gg_colorBorderInnerEnd = sys.setOptsSet("gg_colorBorderInnerEnd", "color", "selectColor");
                bobj.gg_borderInnerWidth = 0;
                dsc.gg_borderInnerWidth = sys.setOptsSet("gg_borderInnerWidth", "num", "inputNumber");
                bobj.gg_borderMiddleWidth = 0;
                dsc.gg_borderMiddleWidth = sys.setOptsSet("gg_borderMiddleWidth", "num", "inputNumber");
                bobj.gg_borderOuterWidth = 5;
                dsc.gg_borderOuterWidth = sys.setOptsSet("gg_borderOuterWidth", "num", "inputNumber");
                //=======================================
                bobj["group~ValueBox"] = [0, "gg_valueBox_f", "gg_valueBoxBorderRadius", "gg_colorBorderOuter", "gg_valueTextShadow_f", "gg_valueInt"
                            , "gg_valueDec", "gg_colorValueBoxRect", "gg_colorValueBoxRectEnd", "gg_colorValueBoxBackground", "gg_colorValueText"
                            , "gg_colorValueTextShadow", "gg_colorValueBoxShadow", "gg_fontValue", "gg_fontValueStyle", "gg_fontValueSize"
                ];
                bobj.gg_valueBox_f = 1;
                dsc.gg_valueBox_f = sys.setOptsSet("gg_valueBox_f", "flag", "inputBoolean");
                bobj.gg_valueBoxBorderRadius = 0;
                dsc.gg_valueBoxBorderRadius = sys.setOptsSet("gg_valueBoxBorderRadius", "ratio", "inputFloat");
                bobj.gg_valueTextShadow_f = 1;
                dsc.gg_valueTextShadow_f = sys.setOptsSet("gg_valueTextShadow_f", "flag", "inputBoolean");
                bobj.gg_valueInt = 1;
                dsc.gg_valueInt = sys.setOptsSet("gg_valueInt", "num", "inputNumber");
                bobj.gg_valueDec = 0;
                dsc.gg_valueDec = sys.setOptsSet("gg_valueDec", "num", "inputNumber");
                bobj.gg_colorValueBoxRect = "#222";
                dsc.gg_colorValueBoxRect = sys.setOptsSet("gg_colorValueBoxRect", "color", "selectColor");
                bobj.gg_colorValueBoxRectEnd = "#333";
                dsc.gg_colorValueBoxRectEnd = sys.setOptsSet("gg_colorValueBoxRectEnd", "color", "selectColor");
                bobj.gg_colorValueBoxBackground = "#fff";
                dsc.gg_colorValueBoxBackground = sys.setOptsSet("gg_colorValueBoxBackground", "color", "selectColor");
                bobj.gg_colorValueText = "#000";
                dsc.gg_colorValueText = sys.setOptsSet("gg_colorValueText", "color", "selectColor");
                bobj.gg_colorValueBoxShadow = null;
                dsc.gg_colorValueBoxShadow = sys.setOptsSet("gg_colorValueBoxShadow", "color", "selectColor");
                bobj.gg_colorValueTextShadow = null;
                dsc.gg_colorValueTextShadow = sys.setOptsSet("gg_colorValueTextShadow", "color", "selectColor");
                bobj.gg_fontValue = "Verdana";
                dsc.gg_fontValue = sys.setOptsSetFix("gg_fontValue", "fontFamily");
                bobj.gg_fontValueStyle = 'italic';
                dsc.gg_fontValueStyle = sys.setOptsSetFix("gg_fontValueStyle", "fontStyle");
                bobj.gg_fontValueSize = 30;
                dsc.gg_fontValueSize = sys.setOptsSet("gg_fontValueSize", "num", "inputNumber");
                //============================
                bobj["group~Numbers"] = [0, "gg_fontNumbers", "gg_fontNumbersStyle", "gg_fontNumbersWeight", "gg_fontNumbersSize"
                            , "gg_colorNumbers"
                ];
                bobj.gg_fontNumbers = "Verdana";
                dsc.gg_fontNumbers = sys.setOptsSetFix("gg_fontNumbers", "fontFamily");
                bobj.gg_fontNumbersStyle = 'italic';
                dsc.gg_fontNumbersStyle = sys.setOptsSetFix("gg_fontNumbersStyle", "fontStyle");
                bobj.gg_fontNumbersWeight = 'bold';
                dsc.gg_fontNumbersWeight = sys.setOptsSetFix("gg_fontNumbersWeight", "fontWeight");
                bobj.gg_fontNumbersSize = 20;
                dsc.gg_fontNumbersSize = sys.setOptsSet("gg_fontNumbersSize", "num", "inputNumber");
                bobj.gg_colorNumbers = '#eee';
                dsc.gg_colorNumbers = sys.setOptsSet("gg_colorNumbers", "color", "selectColor");
                //============================
                bobj["group~Title&Unit"] = [0, "gg_title", "gg_fontTitle", "gg_fontTitleSize", "gg_colorTitle"
                            , "gg_units", "gg_fontUnits", "gg_fontUnitsSize", "gg_colorUnits"
                ];
                bobj.gg_title = 'Speed';
                dsc.gg_title = sys.setOptsSet("gg_title", "str", "inputText", 1);
                bobj.gg_fontTitle = "Verdana";
                dsc.gg_fontTitle = sys.setOptsSetFix("gg_fontTitle", "fontFamily");
                bobj.gg_fontTitleSize = 24;
                dsc.gg_fontTitleSize = sys.setOptsSet("gg_fontTitleSize", "num", "inputNumber");
                bobj.gg_colorTitle = '#fff';
                dsc.gg_colorTitle = sys.setOptsSet("gg_colorTitle", "color", "selectColor");
                bobj.gg_units = 'Km/h';
                dsc.gg_units = sys.setOptsSet("gg_units", "str", "inputText", 1);
                bobj.gg_fontUnits = "Verdana";
                dsc.gg_fontUnits = sys.setOptsSetFix("gg_fontUnits", "fontFamily");
                bobj.gg_fontUnitsSize = 22;
                dsc.gg_fontUnitsSize = sys.setOptsSet("gg_fontUnitsSize", "num", "inputNumber");
                bobj.gg_colorUnits = '#ccc';
                dsc.gg_colorUnits = sys.setOptsSet("gg_colorUnits", "color", "selectColor");


            }
            var obj = sobj["sys"] = {};
            if ("gauge~sys") {
            }

            var obj = sobj["compass"] = {};
            if ("gauge~compass") {

                obj.gg_minValue = 0;
                obj.gg_maxValue = 360;
                obj.gg_majorTicks = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
                obj.gg_minorTicks = 22;
                obj.gg_ticksAngle = 360;
                obj.gg_startAngle = 180;
                obj.gg_highlights = [];
                obj.gg_colorPlate = "#33a";
                obj.gg_colorMajorTicks = "#f5f5f5";
                obj.gg_colorMinorTicks = "#ddd";
                obj.gg_colorNumbers = "#ccc";
                obj.gg_colorNeedle = "rgba(240, 128, 128, 1)";
                obj.gg_colorNeedleEnd = "rgba(255, 160, 122, .9)";
                obj.gg_valueBox_f = 0;
                obj.gg_valueTextShadow_f = 0;
                obj.gg_colorNeedleCircleOuter = "#ccc";
                obj.gg_needleCircleSize = 15;
                obj.gg_needleCircleOuter_f = 0;
                obj.gg_animationRule = "linear";
                obj.gg_needleType = "line";
                obj.gg_needleStart = 75;
                obj.gg_needleEnd = 99;
                obj.gg_needleWidth = 3;
                obj.gg_borders_f = 0;
                obj.gg_borderInnerWidth = 0;
                obj.gg_borderMiddleWidth = 0;
                obj.gg_borderOuterWidth = 10;
                obj.gg_colorBorderOuter = "#ccc";
                obj.gg_colorBorderOuterEnd = "#ccc";
                obj.gg_colorNeedleShadowDown = "#222";
                obj.gg_borderShadowWidth = 0;
                obj.gg_animationTarget = "plate";
                //gg_animationTarget: "needle";
                obj.gg_units = "g";
                obj.gg_title = "DIRECTION";
                obj.gg_fontTitleSize = 19;
                obj.gg_colorTitle = "#f5f5f5";
                obj.gg_animationDuration = 1500;

            }
            ;

            var obj = sobj["linear"] = {};
            if ("gauge~linear") {
                obj.propertyWidth = 300;
                obj.propertyHeight = 600;
                obj.gg_linear_f = 1;
                obj.gg_majorTicks = ['-60', '-40', '-20', '0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'];
                obj.gg_needleWidth = 6;
                obj.gg_title = "Temperatur";
                obj.gg_fontTitleSize = 18;
                obj.gg_fontNumbersSize = 14;
                obj.gg_fontValueSize = 16;
                obj.gg_fontUnitsSize = 18;
                obj.gg_units = '°C';
                obj.gg_minValue = -60;
                obj.gg_barWidth = 10;


            }
        }
        //==================================================
        if ("canvas") {
            var bobj = gr.compOpts["canvas"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("canvas") {
                bobj.propertyWidth = 512;
                bobj.propertyHeight = 512;
            }
            var obj = sobj["sys"] = {};
            if ("canvas~sys") {
                obj.baseColor = "rgba(0,0,0,1)";
                obj.cursor = "pointer";
                obj.end = 1;

            }
        }
        //==================================================
        if ("image") {
            var bobj = gr.compOpts["image"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("image") {
                bobj.propertyWidth = 512;
                bobj.propertyHeight = 512;
            }
            var obj = sobj["knob"] = {};
            if ("image~knob") {
                obj.baseColor = "rgba(0,0,0,0)";
                obj.cursor = "pointer";
                obj.end = 1;
                obj.imageInx = 0;
                obj.addAngleMul=0.1;
                obj.imageUrls = ["./systemResource/knob.png"];

            }
        }
        //==================================================
        if ("plot") {
            //MyPlot.init();
        }
        if ("scope") {
            //MyScope.init();
        }
        //==================================================
        if ("urlReader") {
            var bobj = gr.compOpts["urlReader"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("urlReader") {
                bobj.propertyWidth = 0;
                bobj.propertyHeight = 0;
                initOutBase(bobj);
            }
            var obj = sobj["sys"] = {};
            if ("urlReader~sys") {
                obj.baseColor = "rgba(0,0,0,0)";
                obj.urlsInx = 0;
                obj.urls = ["./systemResource/knob.png"];

            }
        }
        //==================================================
        if ("video") {
            var bobj = gr.compOpts["video"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("video") {
                bobj.propertyWidth = 400;
                bobj.propertyHeight = 400;
                initOutBase(bobj);
                bobj.autoPlay_f = 1;
                bobj.loop_f = 1;
                bobj.controls_f = 1;
            }
            var obj = sobj["sys"] = {};
            if ("video~sys") {
                obj.baseColor = "rgba(0,0,0,0)";
                obj.urlsInx = 0;
                obj.urls = ["./systemResource/test.mp4"];
            }



        }
        //==================================================
        if ("youtube") {
            var bobj = gr.compOpts["youtube"] = {};
            var dsc = bobj["optsDsc"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("youtube") {
                bobj.propertyWidth = 640;
                bobj.propertyHeight = 480;
                initOutBase(bobj);
                bobj.autoPlay_f = 1;
                bobj.loop_f = 1;
                bobj.controls_f = 1;
            }
            var obj = sobj["sys"] = {};
            if ("youtube~sys") {
                obj.baseColor = "rgba(0,0,0,0)";
                obj.urlsInx = 0;
                obj.wwwUrls = ["https://www.youtube.com/embed/tgbNymZ7vqY"];
                dsc.wwwUrls = sys.setOptsSet("wwwUrls", "str~array", "inputText~array");

            }



        }
        //==================================================
        if ("googleMap") {
            var bobj = gr.compOpts["googleMap"] = {};
            var dsc = bobj["optsDsc"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("googleMap") {
                bobj.propertyWidth = 0;
                bobj.propertyHeight = 0;
                initOutBase(bobj);
            }
            var obj = sobj["sys"] = {};
            if ("googleMape~sys") {
                obj.gm_nowMarkerId = "ID000";
                dsc.gm_nowMarkerId = sys.setOptsSet("gm_nowMarkerId", "str", "inputText", 1);
                obj.gm_markerIconUrls = [];
                dsc.gm_markerIconUrls = sys.setOptsSetFix("gm_markerIconUrls", "urls");
                obj.gm_markers = [];

                var marker = {
                    id: "ID000",
                    title: 'ID000',
                    lat: 25.061962,
                    lng: 121.451209,
                    iconIndex: 0,
                    inf: '<h2>九晟電子股份有限公司</h2>'
                };
                obj.gm_markers.push(marker);

                var marker = {
                    id: "ID001",
                    title: 'ID001',
                    lat: 25.062962,
                    lng: 121.452209,
                    iconIndex: 1,
                    inf: '<h2>test</h2>'
                };
                obj.gm_markers.push(marker);




                dsc.gm_markers = sys.setOptsSet("gm_markers", "object~array", "setObject~array");
                dsc.gm_markers.sons = [];
                dsc.gm_markers.sons.push(sys.setOptsSet("id", "str", "inputText", 1));
                dsc.gm_markers.sons.push(sys.setOptsSet("title", "str", "inputText", 1));
                dsc.gm_markers.sons.push(sys.setOptsSet("lat", "ratio", "inputFloat"));
                dsc.gm_markers.sons.push(sys.setOptsSet("lng", "ratio", "inputFloat"));
                dsc.gm_markers.sons.push(sys.setOptsSet("iconIndex", "num", "inputNumber", 1));
                dsc.gm_markers.sons.push(sys.setOptsSet("inf", "str", "inputText", 1));

                obj.gm_apiKey = "AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q";
                dsc.gm_apiKey = sys.setOptsSet("gm_apiKey", "str", "inputText");
                obj.gm_centerLat = 25.061962;
                dsc.gm_centerLat = sys.setOptsSet("gm_centerLat", "ratio", "inputFloat");
                obj.gm_centerLng = 121.451209;
                dsc.gm_centerLng = sys.setOptsSet("gm_centerLng", "ratio", "inputFloat");
                obj.gm_zoom = 18;
                dsc.gm_zoom = sys.setOptsSet("gm_zoom", "num", "inputNumber");

            }
            ;



        }
        //==================================================
        if ("grid") {
            var bobj = gr.compOpts["grid"] = {};
            var dsc = bobj["optsDsc"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("grid") {
                bobj.propertyWidth = 0;
                bobj.propertyHeight = 0;
                initOutBase(bobj);
            }
            var obj = sobj["sys"] = {};
            if ("grid~sys") {
                obj.gd_headObjs = [
                    {field: 'personid', caption: 'ID', width: 100},
                    {field: 'fname', caption: 'First Name', width: 100},
                    {field: 'lname', caption: 'Last Name', width: 100},
                    {field: 'email', caption: 'Email', width: 100},
                    {field: 'check', caption: 'Check', width: 100, 'columnType': "check", 'action': "check"},
                    {field: 'but', caption: 'Button', width: 100, 'columnType': "button"}
                ];




                dsc.gd_headObjs = sys.setOptsSet("gd_headObjs", "object~array", "setObject~array");
                dsc.gd_headObjs.sons = [];
                dsc.gd_headObjs.sons.push(sys.setOptsSet("field", "str", "inputText", 1));
                dsc.gd_headObjs.sons.push(sys.setOptsSet("caption", "str", "inputText", 1));
                dsc.gd_headObjs.sons.push(sys.setOptsSet("width", "num", "inputNumber", 1));
                dsc.gd_headObjs.sons.push(sys.setOptsSet("minWidth", "num", "inputNumber", 1));
                dsc.gd_headObjs.sons.push(sys.setOptsSet("maxWidth", "num", "inputNumber", 1));
                var setObj = sys.setOptsSetFix("columnType", "fontFamily");
                setObj.enum = ["none", "number", "check", "button~buttonName", "image", "multilinetext", "radio"];
                dsc.gd_headObjs.sons.push(setObj);
                var newDsc = sys.setOptsSet("style", "object", "setObject");
                newDsc.sons = [];
                newDsc.sons.push(sys.setOptsSet("color", "color", "selectColor"));
                newDsc.sons.push(sys.setOptsSetFix("textAlign", "textAlign"));
                var dobj = sys.setOptsSetFix("textBaseline", "textAlign");
                dobj.enum = ["top", "bottom"];
                newDsc.sons.push(dobj);
                newDsc.sons.push(sys.setOptsSet("bgColor", "color", "selectColor"));


                var dobj = sys.setOptsSetFix("textBaseline", "textAlign");
                dobj.enum = ["14px sans-serif", "14px monospace", "14px digital_3"];
                newDsc.sons.push(dobj);


                newDsc.sons.push(sys.setOptsSet("padding", "num", "inputNumber"));
                var dobj = sys.setOptsSetFix("textOverflow", "textAlign");
                dobj.enum = ["clip", "ellipsis"];
                newDsc.sons.push(dobj);
                newDsc.sons.push(sys.setOptsSet("functionStr", "str", "inputText"));
                dsc.gd_headObjs.sons.push(newDsc);
                var dscset = sys.setOptsSetFix("actionStr", "selectEditor");
                dscset.enum = [];
                dscset.enum.push("");
                dscset.enum.push("kvd:lineInput");
                dscset.enum.push("check");
                dscset.enum.push("input");
                dsc.gd_headObjs.sons.push(dscset);


                //========================
                obj.gd_frozenColCount = 0;
                dsc.gd_frozenColCount = sys.setOptsSetFix("gd_frozenColCount", "natureNumber");
                obj.gd_recordSource = null;
                dsc.gd_recordSource = sys.setOptsSet("gd_recordSource", "str", "inputText", 1);
                obj.gd_records = [];
                obj.gd_recordStart = 0;
                dsc.gd_recordStart = sys.setOptsSetFix("gd_recordStart", "natureNumber");
                obj.gd_recordLength = 0;
                dsc.gd_recordLength = sys.setOptsSetFix("gd_recordLength", "natureNumber");
                obj.gd_recordsType = "type1"; //type1:type2
                dsc.gd_recordsType = sys.setOptsSetFix("gd_recordsType", "textAlign");
                dsc.gd_recordsType.enum = ["normal", "headFirst"];
                obj.gd_recordsChange_f = 0;
                dsc.gd_recordsChange_f = sys.setOptsSet("gd_recordsChange_f", "flag", "inputBoolean");
                obj.gd_headType = "user"; //user/auto
                dsc.gd_headType = sys.setOptsSetFix("gd_headType", "textAlign");
                dsc.gd_headType.enum = ["auto", "user"];

                obj.gd_records = [
                    {'personid': 1, 'fname': 'Sophia', 'lname': 'Hill', 'email': 'sophia_hill@example.com', 'check': 0},
                    {'personid': 2, 'fname': 'Aubrey', 'lname': 'Martin', 'email': 'aubrey_martin@example.com', 'check': "1"},
                    {'personid': 3, 'fname': 'Anna', 'lname': 'Ramirez', 'email': 'anna_ramirez@example.com', 'check': true},
                    {'personid': 4, 'fname': 'Anna', 'lname': 'Ramirez', 'email': 'anna_ramirez@example.com', 'check': "false"}
                ];
                dsc.gd_records = sys.setOptsSet("gd_records", "object~array", "setObject~array");

                obj.gd_events = [];
                dsc.gd_events = sys.setOptsSet("gd_events", "object~array", "setObject~array");
                var sons = dsc.gd_events.sons = [];
                var dscset = sys.setOptsSetFix("eventType", "fontFamily");
                dscset.enum = [
                    "click_cell",
                    'dblclick_cell',
                    'dbltap_cell',
                    'mousedown_cell',
                    'mouseup_cell',
                    'selected_cell',
                    'keydown',
                    'mousemove_cell',
                    'mouseenter_cell',
                    'mouseleave_cell',
                    'mouseover_cell',
                    'mouseout_cell',
                    'input_cell',
                    'paste_cell',
                    'resize_column',
                    'scroll',
                    'changed_value'
                ];
                sons.push(dscset);
                var dscset = sys.setOptsSetFix("functionStr", "jsEditor");
                dscset.enum = [];
                dscset.enum.push("");
                var funcStr = `func = function(args){\n\tconsole.log(args);\n}`;
                dscset.enum.push(funcStr);
                sons.push(dscset);

            }
            ;




        }
        //==================================================
        if ("editor") {
            var bobj = gr.compOpts["editor"] = {};
            var sobj = bobj["subOpts"] = {};
            bobj.fontSize = 20;
            bobj.readOnly_f = 0;
            bobj.hideNo_f = 0;
            if ("editor") {
                initOutBase(bobj);
                bobj.propertyWidth = 0;
                bobj.propertyHeight = 0;
                bobj.baseColor = "#333";
            }
            var obj = sobj["sys"] = {};
            if ("editor~sys") {
                obj.urlsInx = 0;
                obj.urls = ["./systemResource/space.txt"];

            }


        }
        //==================================================
        if ("plate") {
            var bobj = gr.compOpts["plate"] = {};
            var sobj = bobj["subOpts"] = {};

            initBase(bobj);
            initLocation(bobj);
            initFont(bobj);


            if ("plate") {
                bobj.propertyWidth = 200;
                bobj.propertyHeight = 200;
            }
            //==============
            var obj = sobj["sys"] = {};
            if ("plate~sys") {
                obj.innerText = "";
                obj.baseColor = "#ccc";
            }
            //==============
            var obj = sobj["dark"] = {};
            if ("plate~dark") {
                obj.innerText = "";
                obj.baseColor = "rgba(0,0,0,0)";
                obj.innerTextColor = "#aaa";
                obj.textShadow = "1px 1px 1px #000";
            }


            //==============
            var obj = sobj["mask"] = {};
            if ("plate~mask") {
                obj.iw = null;
                obj.ih = null;
                obj.whr = 0;
                obj.innerText = "";
                obj.baseColor = "rgba(0,0,0,0.3)";
            }
            //==============
            var obj = sobj["none"] = {};
            if ("plate~none") {
                obj.innerText = "";
                obj.baseColor = "rgba(0,0,0,0)";
            }
            //==============
            var obj = sobj["popMenu"] = {};
            if ("plate~popMenu") {
                obj.innerText = "";
                obj.baseColor = "#ccc";
                obj.borderColor = "#fff #000 #000 #fff";
                obj.borderWidth = 1;
                obj.outsideShadowBlur = 5;
                obj.outsideShadowOffx = 10;
                obj.outsideShadowOffy = 10;
                obj.outsideShadowColor = "#000";
            }
        }
        //==================================================
        if ("chart") {
            var bobj = gr.compOpts["chart"] = {};
            var dsc = bobj["optsDsc"] = {};
            var sobj = bobj["subOpts"] = {};
            if ("chart") {
                initOutBase(bobj);
                bobj.baseColor = "#222";
            }
            var obj = sobj["bar"] = {};
            if ("chart~bar") {
                obj.title = "Title";
                obj.yAxe_f = 0;
                dsc.yAxe_f = sys.setOptsSet("yAxe_f", "flag", "inputBoolean");
                obj.datasetName = "datasetName";
                dsc.datasetName = sys.setOptsSetFix("datasetName", "str");
                obj.chartDatas = [70, 89];
                dsc.chartDatas = sys.setOptsSetFix("chartDatas", "integerArray");
                obj.chartLabels = ["label1", "label2"];
                dsc.chartLabels = sys.setOptsSetFix("chartLabels", "stringArray");
                obj.chartMin = 0;
                dsc.chartMin = sys.setOptsSetFix("chartMin", "float");
                obj.chartStep = 20;
                dsc.chartStep = sys.setOptsSetFix("chartStep", "float");
                obj.chartMax = 100;
                dsc.chartMax = sys.setOptsSetFix("chartMax", "float");
                obj.chartAxesFontSize = 10;
                dsc.chartAxesFontSize = sys.setOptsSetFix("chartAxesFontSize", "integer");
                obj.chartLineColor = "#000";
                dsc.chartLineColor = sys.setOptsSetFix("chartLineColor", "color");
                obj.chartBackgroundColors = ["#0f0", "#f00"];
                dsc.chartBackgroundColors = sys.setOptsSetFix("chartBackgroundColors", "colorArray");
                obj.chartFilter = "if(inData>50) outData='#0f0';else outData='#f00';";
                dsc.chartFilter = sys.setOptsSetFix("chartFilter", "jsText");
            }
            //==============
            var obj = sobj["line"] = {};
            if ("chart~line") {
                obj.title = "Title";
                obj.datasetName = "datasetName";
                obj.chartDatas = [10, 32, 5, 65, 44, 70, 89, 24, 100, 23];
                obj.chartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                obj.chartMin = 0;
                obj.chartMax = 100;
                obj.chartStep = 20;
                obj.chartAxesFontSize = 10;
                obj.chartLineColor = "#fff";
                obj.chartBackgroundColors = ["#0f0", "#f00"];
                obj.chartFilter = "if(inData>50) outData='#0f0';else outData='#f00';";
            }
            //==============
            var obj = sobj["doughnut"] = {};
            if ("chart~doughnut") {
                obj.title = "Title";
                obj.chartDatas = [10, 32, 5, 65, 44];
                obj.chartLabels = ["1", "2", "3", "4", "5"];
                obj.chartBackgroundColors = ["#f00", "#0f0", '#00f', '#ff0', '#0ff'];
            }

            var obj = sobj["pie"] = {};
            if ("chart~pie") {
                obj.title = "Title";
                obj.chartDatas = [10, 32, 5, 65, 44];
                obj.chartLabels = ["1", "2", "3", "4", "5"];
                obj.chartBackgroundColors = ["#f00", "#0f0", '#00f', '#ff0', '#0ff'];
            }


        }
        //==================================================
    }

}

