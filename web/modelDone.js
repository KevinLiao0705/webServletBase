/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gr, Test, KvLib, mac, sys */

//Md_keyboard


//===========================================
class Md_keyboard {
    static init() {
        var bobj = gr.modelOpts["Md_keyboard"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = null;
            obj.propertyHeight = 400;

            obj.borderWidth = 3;
            obj.baseColor = "#ccc";
            obj.title = "title";
            obj.chinese_f = 0;
            dsc.chinese_f = sys.setOptsSet("chinese_f", "str", "system");
            obj.cap_f = 0;
            dsc.cap_f = sys.setOptsSet("cap_f", "str", "system");
            obj.shift_f = 0;
            dsc.shift_f = sys.setOptsSet("shift_f", "str", "system");
            obj.ctr_f = 0;
            dsc.ctr_f = sys.setOptsSet("ctr_f", "str", "system");
            obj.fn_f = 0;
            dsc.fn_f = sys.setOptsSet("fn_f", "str", "system");
            obj.alt_f = 0;
            dsc.alt_f = sys.setOptsSet("alt_f", "str", "system");
            obj.selst = 0;
            dsc.selst = sys.setOptsSet("selst", "str", "system");
            obj.selend = 0;
            dsc.selend = sys.setOptsSet("selend", "str", "system");
            obj.juingStr = "";
            dsc.juingStr = sys.setOptsSet("juingStr", "str", "system");
            dsc.selend = sys.setOptsSet("memo_f", "str", "system");


            var setObj = {};
            setObj.dataType = "str";
            setObj.setType = "inputText";
            setObj.nullOk_f = 0;
            setObj.name = "Title";
            setObj.value = "";
            obj.setObj = setObj;
            dsc.setObj = sys.setOptsSet("setObj", "str", "system");


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
        if (!gr.juingTbl) {
            Test.readServerFileToArray("juing_tbl.txt", "gr.juingTbl");
        }
        var self = this;
        var md = self.md;
        var op = md.opts;
        if (op.setObj.memo_f) {
            var editArea = md.compRefs["editArea"];
            var inputElem = editArea.elems["textarea"];

        } else {
            var editOptsLine = md.modelRefs["editOptsLine"];
            var inputObj = editOptsLine.compRefs["input"];
            var inputElem = inputObj.elems["input"];
        }
        if (!md.opts.inited_f) {
            md.opts.inited_f = 1;
            inputElem.select();
        } else {
            inputElem.setSelectionRange(op.selst, op.selend);
            inputElem.focus();
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
        var ctrTbl = ["", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "Clr", "Exit"];
        var numTb0 = ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
        var numTb0B = [
            'Esc',
            '<i class="gf">&#xf01f</i>',
            '<i class="gf">&#xe04d</i>',
            '<i class="gf">&#xe050</i>',
            '<i class="gf">&#xe04f</i>',
            '<i class="gf">&#xe047</i>',
            '<i class="gf">&#xe045</i>',
            '<i class="gf">&#xe037</i>',
            '<i class="gf">&#xe044</i>',
            '<i class="gf">&#xe0be</i>',
            '<i class="gf">&#xe88a</i>',
            '<i class="gf">&#xe8b6</i>',
            '<i class="gf">&#xe873</i>'
        ];
        var numTb1 = ["\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back<br>Space"];
        var numTb1B = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Back<br>Space"];
        var numTb1C = ["", "ㄅ", "ㄉ", "ˇ", "ˋ", "ㄓ", "ˊ", "˙", "ㄚ", "ㄞ", "ㄢ", "ㄦ", "", "Back<br>Space"];
        var numTb2 = ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"];
        var numTb2B = ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"];
        var numTb2C = ["", "ㄆ", "ㄊ", "ㄍ", "ㄐ", "ㄔ", "ㄗ", "ㄧ", "ㄛ", "ㄟ", "ㄣ", "", "", ""];
        var numTb3 = ["Cap", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"];
        var numTb3B = ["Cap", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter"];
        var numTb3C = ["", "ㄇ", "ㄋ", "ㄎ", "ㄑ", "ㄕ", "ㄘ", "ㄨ", "ㄜ", "ㄠ", "ㄤ", "", "Enter"];
        var numTb4 = ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"];
        var numTb4B = ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift"];
        var numTb4C = ["", "ㄈ", "ㄌ", "ㄏ", "ㄒ", "ㄖ", "ㄙ", "ㄩ", "ㄝ", "ㄡ", "ㄥ", ""];
        var numTb5 = ["Ctr", "Fn", "Alt", " ", "Alt", "Fn", "Ctr"];
        var numTbc = ["", "", "", " ", "", "", ""];

        var cmdTbl = [
            'Print<br>Scr', 'Scroll<br>Lock', "Pause<br>Break",
            'Ins', 'Home', "PgUp", "Del", "End", "PgDn",
            '<i class="gf">&#xe316</i>',
            '<i class="gf">&#xe314</i>',
            '<i class="gf">&#xe313</i>',
            '<i class="gf">&#xe315</i>'
        ];
        var cmdTblLoc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 13, 15, 16, 17];

        //======================================================================
        var reCreate = function () {

            if (op.setObj.memo_f) {
                var editArea = md.compRefs["editArea"];
                var inputElem = editArea.elems["textarea"];

            } else {
                var editOptsLine = md.modelRefs["editOptsLine"];
                var inputObj = editOptsLine.compRefs["input"];
                var inputElem = inputObj.elems["input"];
                op.selst = inputElem.selectionStart;
                op.selend = inputElem.selectionEnd;
                editOptsLine.mdClass.valueToSetObj();
                op.setObj.value = editOptsLine.opts.setObj.value;
                md.reCreate();
            }





        };
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;


            if (op.setObj.memo_f) {
                var editArea = md.compRefs["editArea"];
                var inputElem = editArea.elems["textarea"];

            } else {
                var editOptsLine = md.modelRefs["editOptsLine"];
                var inputObj = editOptsLine.compRefs["input"];
                var inputElem = inputObj.elems["input"];
            }


            var value = inputElem.value;
            var inValue = kvObj.opts.innerText;
            if (iobj.act === "blur") {
                return;
            }
            if (iobj.act === "pressEnter") {
                sys.popOff(2);
                if (op.actionFunc) {
                    var oobj = {};
                    oobj.act = "keypadEnter";
                    oobj.value = inputElem.value;
                    oobj.kvObj = md;
                    op.actionFunc(oobj);
                }
                return;
            }


            var setValue = function (value) {
                inputElem.value = value;
                inputObj.opts.editValue = parseInt(value);
            };
            var addChar = function (char) {
                if (op.chinese_f) {
                    if (char.length === 1 || char === "˙") {
                        var ok = 0;
                        if (char === "˙") {
                            op.juingStr = char + op.juingStr;
                            ok = 1;
                        } else {
                            if (char === " ") {
                                op.juingStr += "-";
                                ok = 1;
                            } else
                                op.juingStr += char;
                        }
                        if (char === "ˇ" || char === "ˋ" || char === "ˊ")
                            ok = 1;
                        if (ok) {
                            var chfonts = [];
                            var len = gr.juingTbl.length;
                            for (var i = 0; i < len; i++) {
                                var strA = gr.juingTbl[i].split("#");
                                if (strA.length !== 2)
                                    continue;
                                if (strA[0] === op.juingStr) {
                                    chfonts.push(strA[1]);
                                }
                            }

                            if (chfonts.length === 0) {
                                op.juingStr = "";
                                var comp = md.compRefs["titleLabel"];
                                comp.opts.innerText = op.juingStr;
                                comp.reCreate();
                                return;
                            }
                            var opts = {};
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                            };
                            opts.xc = 10;
                            opts.yc = 5;
                            opts.selects = chfonts;
                            opts.title = "";
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                op.juingStr = "";
                                if (iobj.act === "selected") {
                                    var selst = inputElem.selectionStart;
                                    var selend = inputElem.selectionEnd;
                                    var pos = KvLib.getCaretPosition(inputElem);
                                    inputElem.value = KvLib.stringSplice(value, selst, selend - selst, iobj.text);
                                    inputElem.focus();
                                    KvLib.setCaretPosition(inputElem, selst + 1);
                                    reCreate();
                                    return;
                                }
                                var comp = md.compRefs["titleLabel"];
                                comp.opts.innerText = op.juingStr;
                                comp.reCreate();
                                return;
                            };
                            mac.selectBox(opts, 600, 300, 0);
                            var comp = md.compRefs["titleLabel"];
                            comp.opts.innerText = op.juingStr;
                            comp.reCreate();
                            return;
                        } else {
                            if (op.juingStr.length > 3)
                                op.juingStr = "";
                        }
                        reCreate();
                        return;
                    }
                    return;
                }


                if (op.cap_f)
                    char = char.toUpperCase();
                if (op.ctr_f || op.alt_f || op.fn_f) {
                    if (op.ctr_f === 1) {
                        op.ctr_f = 0;
                    }
                    if (op.fn_f === 1) {
                        op.fn_f = 0;
                    }
                    if (op.alt_f === 1) {
                        op.alt_f = 0;
                    }
                    reCreate();
                    return;
                } else {
                    var selst = inputElem.selectionStart;
                    var selend = inputElem.selectionEnd;
                    var pos = KvLib.getCaretPosition(inputElem);
                    inputElem.value = KvLib.stringSplice(value, selst, selend - selst, char);
                }
                inputElem.focus();
                KvLib.setCaretPosition(inputElem, selst + 1);

                if (op.shift_f === 1) {
                    op.shift_f = 0;
                }
                reCreate();
                return;
            };
            var subChar = function (char) {
                if (op.chinese_f) {
                    if (op.juingStr.length) {
                        op.juingStr = op.juingStr.substring(0, op.juingStr.length - 1);
                        reCreate();
                        return;
                    }
                }



                var selst = inputElem.selectionStart;
                var selend = inputElem.selectionEnd;
                var len = selend - selst;
                if (len === 0) {
                    if (!selst) {
                        inputElem.focus();
                        return;
                    }
                    inputElem.value = KvLib.stringSplice(value, selst - 1, 1);
                    KvLib.setCaretPosition(inputElem, selst - 1);
                } else {
                    inputElem.value = KvLib.stringSplice(value, selst, len);
                    KvLib.setCaretPosition(inputElem, selst);
                }
                return;


            };


            console.log(name);
            console.log(inValue);
            var strA = name.split('#');
            if (strA[0] === "ctrButton") {
                switch (strA[1]) {
                    case "0":
                        break;
                    case "1"://kext
                        sys.popOff(2);
                        var opts = {};
                        opts.actionFunc = op.actionFunc;
                        opts.kext = inputElem.value;
                        mac.ezKextEditorBox(opts, 1000, 120, 1);
                        break;
                    case "2":
                        op.chinese_f ^= 1;
                        op.cap_f = 0;
                        op.shift_f = 0;
                        op.ctr_f = 0;
                        op.fn_f = 0;
                        op.alt_f = 0;
                        op.juingStr = "";
                        break;
                    case "3":
                        if (op.chinese_f)
                            return;
                        op.cap_f ^= 1;
                        break;
                    case "4":
                        if (op.chinese_f)
                            return;
                        if (op.shift_f)
                            op.shift_f = 0;
                        else
                            op.shift_f = 2;
                        break;
                    case "5":
                        if (op.chinese_f)
                            return;
                        if (op.ctr_f)
                            op.ctr_f = 0;
                        else
                            op.ctr_f = 2;
                        break;
                    case "6":
                        if (op.chinese_f)
                            return;
                        if (op.fn_f)
                            op.fn_f = 0;
                        else
                            op.fn_f = 2;
                        break;
                    case "7":
                        if (op.chinese_f)
                            return;
                        if (op.alt_f)
                            op.alt_f = 0;
                        else
                            op.alt_f = 2;
                        break;
                    case "8":
                        inputElem.value = "";
                        break;
                    case "9":
                        sys.popOff(2);
                        return;
                }
                reCreate();
                return;

            }

            if (strA[0] === "key") {
                var inx = parseInt(strA[2]);
                switch (strA[1]) {
                    case "0":
                        break;
                    case "1":
                        if (inx < 13) {
                            addChar(inValue);
                        }
                        if (inx === 13)
                            subChar();
                        break;
                    case "2":
                        if (inValue === "Tab") {
                            break;
                        }
                        addChar(inValue);
                        break;
                    case "3":
                        if (inValue === "Cap") {
                            op.cap_f ^= 1;
                            reCreate();
                            break;
                        }
                        if (inValue === "Enter") {
                            sys.popOff(2);
                            if (op.actionFunc) {
                                var oobj = {};
                                oobj.act = "keypadEnter";
                                oobj.value = inputElem.value;
                                oobj.kvObj = md;
                                op.actionFunc(oobj);
                            }
                            return;

                        }
                        addChar(inValue);
                        break;
                    case "4":
                        if (inValue === "Shift") {
                            op.shift_f = 1;
                            reCreate();
                            break;
                        }
                        addChar(inValue);
                        break;
                    case "5":
                        if (inx === 3) {
                            addChar(inValue);
                            break;
                        }
                        if (op.chinese_f)
                            break;
                        if (inx === 0)
                            op.ctr_f = 1;
                        if (inx === 1)
                            op.fn_f = 1;
                        if (inx === 2)
                            op.alt_f = 1;
                        if (inx === 4)
                            op.slt_f = 1;
                        if (inx === 5)
                            op.fn_f = 1;
                        if (inx === 6)
                            op.ctr_f = 1;
                        reCreate();
                        break;

                }
                inputElem.focus();
                return;

            }

            if (strA[0] === "ctrKey") {
                var inx = parseInt(strA[1]);
                switch (inx) {
                    case 4://home
                        KvLib.setCaretPosition(inputElem, 0);
                        break;
                    case 6://del
                        var selst = inputElem.selectionStart;
                        var selend = inputElem.selectionEnd;
                        var len = selend - selst;
                        if (selst === value.length) {
                            inputElem.focus();
                            return;
                        }
                        if (len === 0)
                            len = 1;
                        inputElem.value = KvLib.stringSplice(value, selst, len);
                        KvLib.setCaretPosition(inputElem, selst);
                        break;
                    case 7://end
                        KvLib.setCaretPosition(inputElem, value.length);
                        break;
                    case 10://left
                        var pos = KvLib.getCaretPosition(inputElem);
                        if (pos)
                            pos--;
                        KvLib.setCaretPosition(inputElem, pos);
                        break;
                    case 12://right
                        var pos = KvLib.getCaretPosition(inputElem);
                        if (pos < value.length)
                            pos++;
                        KvLib.setCaretPosition(inputElem, pos);
                        break;

                }
                inputElem.focus();
                return;
            }

        };
        var cname = "c";
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 50;
        opts.ihO.c1 = 60;
        opts.ihO.c2 = 9999;
        if (op.setObj.memo_f)
            opts.ihO.c1 = 300;
        opts.margin = 4;
        opts.ym = 8;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = "0.17rw";
        opts.xm = 20;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 6;
        opts.ym = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft", cname);
        //===================
        var cname = lyMap.get("pnLeft") + "~" + 0;
        var opts = {};
        opts.xc = 13;
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft0", cname);
        //====
        var cname = lyMap.get("pnLeft") + "~" + 1;
        var opts = {};
        opts.xc = 14;
        opts.xm = 2;
        opts.iwO = {};
        for (var i = 0; i < 13; i++) {
            opts.iwO["c" + i] = "0.065rw";
        }
        opts.iwO["c13"] = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft1", cname);
        //====
        var cname = lyMap.get("pnLeft") + "~" + 2;
        var opts = {};
        opts.xc = 14;
        opts.xm = 2;
        opts.iwO = {};
        for (var i = 1; i < 13; i++) {
            opts.iwO["c" + i] = "0.065rw";
        }
        opts.iwO["c0"] = "0.094rw";
        ;
        opts.iwO["c13"] = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft2", cname);
        //====
        var cname = lyMap.get("pnLeft") + "~" + 3;
        var opts = {};
        opts.xc = 13;
        opts.xm = 2;
        opts.iwO = {};
        for (var i = 1; i < 12; i++) {
            opts.iwO["c" + i] = "0.065rw";
        }
        opts.iwO["c0"] = "0.13rw";
        ;
        opts.iwO["c12"] = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft3", cname);
        //====
        var cname = lyMap.get("pnLeft") + "~" + 4;
        var opts = {};
        opts.xc = 12;
        opts.xm = 2;
        opts.iwO = {};
        for (var i = 1; i < 11; i++) {
            opts.iwO["c" + i] = "0.065rw";
        }
        opts.iwO["c0"] = "0.165rw";
        ;
        opts.iwO["c11"] = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft4", cname);
        //====
        var cname = lyMap.get("pnLeft") + "~" + 5;
        var opts = {};
        opts.xc = 7;
        opts.xm = 2;
        opts.iwO = {};
        for (var i = 0; i < 7; i++) {
            opts.iwO["c" + i] = "0.09rw";
        }
        opts.iwO["c3"] = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft5", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.xc = 3;
        opts.yc = 6;
        opts.ym = 2;
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnRight", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.iwO = {};
        for (var i = 0; i < 10; i++) {
            opts.iwO["c" + i] = 65;
        }
        if (!op.setObj.kext_f)
            opts.iwO["c1"] = 0;
        opts.iwO["c0"] = 9999;
        opts.xc = 10;
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnTitle", cname);
        //======================================================================
        var cname = lyMap.get("pnTitle") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        if (op.chinese_f)
            opts.innerText = op.juingStr;
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};

        for (var i = 1; i < 10; i++) {
            var cname = lyMap.get("pnTitle") + "~" + i;
            var opts = {};
            opts.clickFunc = actionFunc;
            opts.innerText = ctrTbl[i];
            if (opts.innerText === "Kext")
                if (!op.setObj.kext_f)
                    continue;

            opts.fontSize = "0.4rh";
            if (i === 2) {
                if (op.chinese_f)
                    opts.baseColor = "#ccf";
            }
            if (i === 3) {
                if (op.cap_f)
                    opts.baseColor = "#ccf";
            }
            if (i === 4) {
                if (op.shift_f)
                    opts.baseColor = "#ccf";
            }
            if (i === 5) {
                if (op.ctr_f)
                    opts.baseColor = "#ccf";
            }
            if (i === 6) {
                if (op.fn_f)
                    opts.baseColor = "#ccf";
            }
            if (i === 7) {
                if (op.alt_f)
                    opts.baseColor = "#ccf";
            }


            comps[cname] = {name: "ctrButton#" + i, type: "button~sys", opts: opts};
        }

        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        op.setObj.name = "";
        op.setObj.titleWidth = "1.2rh";
        op.setObj.showName_f = 1;
        op.setObj.showDataType_f = 1;
        op.setObj.showKeyboard_f = 0;
        opts.setObj = op.setObj;
        opts.actionFunc = actionFunc;
        op.setObj.inGroup_f = 0;
        opts.checkLegel_f = 0;
        if (op.setObj.memo_f) {
            opts.textValue = op.setObj.value;
            comps[cname] = {name: "editArea", type: "textarea~sys", opts: opts};
        } else
            models[cname] = {name: "editOptsLine", type: "Md_editOptsLine~sys", opts: opts};
        //======================================================================
        for (var i = 0; i < 13; i++) {
            var cname = lyMap.get("pnLeft0") + "~" + i;
            var opts = {};
            if (op.fn_f)
                opts.innerText = numTb0B[i];
            else
                opts.innerText = numTb0[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.5rh";
            comps[cname] = {name: "key#0#" + i, type: "button~sys", opts: opts};
        }

        for (var i = 0; i < 14; i++) {
            var cname = lyMap.get("pnLeft1") + "~" + i;
            var opts = {};
            if (op.shift_f)
                opts.innerText = numTb1B[i];
            else
                opts.innerText = numTb1[i];
            if (op.chinese_f)
                opts.innerText = numTb1C[i];
            opts.fontSize = "0.5rh";
            if (i === 13) {
                opts.fontSize = "0.5rh";
                opts.tpd = 5;
                opts.bpd = 5;
            }
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "key#1#" + i, type: "button~sys", opts: opts};
        }

        for (var i = 0; i < 14; i++) {
            var cname = lyMap.get("pnLeft2") + "~" + i;
            var opts = {};
            if (op.shift_f)
                opts.innerText = numTb2B[i];
            else
                opts.innerText = numTb2[i];
            if (op.chinese_f)
                opts.innerText = numTb2C[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.5rh";
            comps[cname] = {name: "key#2#" + i, type: "button~sys", opts: opts};
        }
        for (var i = 0; i < 13; i++) {
            var cname = lyMap.get("pnLeft3") + "~" + i;
            var opts = {};
            if (op.shift_f)
                opts.innerText = numTb3B[i];
            else
                opts.innerText = numTb3[i];
            if (op.chinese_f)
                opts.innerText = numTb3C[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.5rh";
            comps[cname] = {name: "key#3#" + i, type: "button~sys", opts: opts};
        }
        for (var i = 0; i < 12; i++) {
            var cname = lyMap.get("pnLeft4") + "~" + i;
            var opts = {};
            if (op.shift_f)
                opts.innerText = numTb4B[i];
            else
                opts.innerText = numTb4[i];
            if (op.chinese_f)
                opts.innerText = numTb4C[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.5rh";
            comps[cname] = {name: "key#4#" + i, type: "button~sys", opts: opts};
        }
        for (var i = 0; i < 7; i++) {
            var cname = lyMap.get("pnLeft5") + "~" + i;
            var opts = {};
            opts.innerText = numTb5[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.5rh";
            comps[cname] = {name: "key#5#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        for (var i = 0; i < 13; i++) {
            var cname = lyMap.get("pnRight") + "~" + cmdTblLoc[i];
            var opts = {};
            opts.innerText = cmdTbl[i];
            opts.clickFunc = actionFunc;
            opts.fontSize = "0.4rh";
            if (i < 3) {
                opts.fontSize = "0.4rh";
                opts.tpd = 8;
                opts.bpd = 8;
            }
            comps[cname] = {name: "ctrKey#" + i, type: "button~sys", opts: opts};
        }
        return;
    }
}
//===========================================


//===========================================
class Md_inputPad {
    static init() {
        var bobj = gr.modelOpts["Md_inputPad"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        var modelOptsFunc = function (obj) {
            obj.propertyWidth = 800;
            obj.propertyHeight = 600;
            obj.borderWidth = 3;
            obj.baseColor = "#ccc";
            obj.title = "title";
            obj.chinese_f = 0;
            dsc.chinese_f = sys.setOptsSet("chinese_f", "str", "system");
            obj.cap_f = 0;
            dsc.cap_f = sys.setOptsSet("cap_f", "str", "system");
            obj.shift_f = 0;
            dsc.shift_f = sys.setOptsSet("shift_f", "str", "system");
            obj.ctr_f = 0;
            dsc.ctr_f = sys.setOptsSet("ctr_f", "str", "system");
            obj.fn_f = 0;
            dsc.fn_f = sys.setOptsSet("fn_f", "str", "system");
            obj.alt_f = 0;
            dsc.alt_f = sys.setOptsSet("alt_f", "str", "system");
            obj.selst = 0;
            dsc.selst = sys.setOptsSet("selst", "str", "system");
            obj.selend = 0;
            dsc.selend = sys.setOptsSet("selend", "str", "system");
            obj.juingStr = "";
            dsc.juingStr = sys.setOptsSet("juingStr", "str", "system");
            obj.ctrButtonWidth = 200;


            var setObj = {};
            setObj.dataType = "str";
            setObj.setType = "inputText";
            setObj.nullOk_f = 0;
            setObj.name = "Title";
            setObj.value = "";
            obj.setObj = setObj;
            dsc.setObj = sys.setOptsSet("setObj", "str", "system");
            //nameText<>id<>row,column<>fontSize
            //============================================
            obj.sysTbl = [
                "Enter<>enter"
                        , "Exit<>exit"
            ];
            obj.inpTbl = [
                "1<>1<>0,0"
                        , "2<>2<>0,1"
                        , "3<>3<>0,2"
                        , "4<>4<>1,0"
                        , "5<>5<>1,1"
                        , "6<>6<>1,2"
                        , "4<>4<>2,0"
                        , "5<>5<>2,1"
                        , "6<>6<>2,2"
                        , ".<>.<>3,0"
                        , "0<>0<>3,1"
                        , "-<>-<>3,2"
            ];
            obj.ctrTbl = [
                "Back<>back<>0,0<>0.4rh"
                        , "Del<>del<>1,0<>0.4rh"
                        , "Clr<>clr<>2,0<>0.4rh"
                        , "Home<>home<>0,2<>0.4rh"
                        , "End<>end<>2,2<>0.4rh"
                        , '<i class="gf">&#xe316</i><>up<>1,2'
                        , '<i class="gf">&#xe314</i><>left<>0,3'
                        , '<i class="gf">&#xe313</i><>down<>1,3'
                        , '<i class="gf">&#xe315</i><>right<>2,3'
            ];
            obj.sysButtonWidth = 100;
            obj.inpRows = [3, 4];
            obj.ctrRows = [3, 4];
            obj.ctrWidthRate = "0.4rw";
            obj.ctrXm = 20;
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
        var op = md.opts;
        if (op.setObj.memo_f) {
            var editArea = md.compRefs["editArea"];
            var inputElem = editArea.elems["textarea"];

        } else {
            var editOptsLine = md.modelRefs["editOptsLine"];
            var inputObj = editOptsLine.compRefs["input"];
            var inputElem = inputObj.elems["input"];
        }
        if (!md.opts.inited_f) {
            md.opts.inited_f = 1;
            inputElem.select();
        } else {
            inputElem.setSelectionRange(op.selst, op.selend);
            inputElem.focus();
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

        op.sysTbl = [
            "Enter<>enter"
                    , "Exit<>exit"
        ];
        op.inpTbl = [
            "1<>1<>0,0"
                    , "2<>2<>0,1"
                    , "3<>3<>0,2"
                    , "4<>4<>1,0"
                    , "5<>5<>1,1"
                    , "6<>6<>1,2"
                    , "4<>4<>2,0"
                    , "5<>5<>2,1"
                    , "6<>6<>2,2"
                    , ".<>.<>3,0"
                    , "0<>0<>3,1"
                    , "-<>-<>3,2"
        ];
        op.ctrTbl = [
            "Back<>back<>0,0<>0.4rh"
                    , "Del<>del<>1,0<>0.4rh"
                    , "Clr<>clr<>2,0<>0.4rh"
                    , "Home<>home<>0,2<>0.4rh"
                    , "End<>end<>2,2<>0.4rh"
                    , '<i class="gf">&#xe316</i><>up<>1,2'
                    , '<i class="gf">&#xe314</i><>left<>0,3'
                    , '<i class="gf">&#xe313</i><>down<>1,3'
                    , '<i class="gf">&#xe315</i><>right<>2,3'
        ];
        op.sysButtonWidth = 100;
        op.inpRows = [3, 4];
        op.ctrRows = [3, 4];
        op.ctrWidthRate = "0.4rw";
        op.ctrXm = 20;
        if (op.setObj.padType === "phoneNumber") {
            op.inpTbl[9] = "*<>*<>3,0";
            op.inpTbl[11] = "<><>3,0";
        }
        if (op.setObj.padType === "phoneNumberArray") {
            op.inpTbl[9] = "*<>*<>3,0";
            op.inpTbl[11] = ",<>,<>3,0";
        }
        if (op.setObj.padType === "ipAddress") {
            op.inpTbl[11] = "<><>3,0";
        }
        if (op.setObj.padType === "nature") {
            op.inpTbl[9] = "<><>3,0";
            op.inpTbl[11] = "<><>3,0";
        }
        if (op.setObj.padType === "ipAddressArray") {
            op.inpTbl[11] = ",<>,<>3,0";
        }

        //======================================================================
        var reCreate = function () {
            if (op.setObj.memo_f) {
                var editArea = md.compRefs["editArea"];
                var inputElem = editArea.elems["textarea"];

            } else {
                var editOptsLine = md.modelRefs["editOptsLine"];
                var inputObj = editOptsLine.compRefs["input"];
                var inputElem = inputObj.elems["input"];
                op.selst = inputElem.selectionStart;
                op.selend = inputElem.selectionEnd;
                editOptsLine.mdClass.valueToSetObj();
                op.setObj.value = editOptsLine.opts.setObj.value;
                md.reCreate();
            }
        };
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;
            var strA = name.split('#');
            var inValue = kvObj.opts.innerText;
            var itemId = kvObj.opts.itemId;
            if (op.setObj.memo_f) {
                var editArea = md.compRefs["editArea"];
                var inputElem = editArea.elems["textarea"];

            } else {
                var editOptsLine = md.modelRefs["editOptsLine"];
                var inputObj = editOptsLine.compRefs["input"];
                var inputElem = inputObj.elems["input"];
            }
            var elemValue = inputElem.value;
            var inValue = kvObj.opts.innerText;
            //=================================================
            if (iobj.act === "blur") {
                return;
            }
            if (iobj.act === "pressEnter") {
                sys.popOff(2);
                if (op.actionFunc) {
                    var oobj = {};
                    oobj.act = "keypadEnter";
                    oobj.value = inputElem.value;
                    oobj.kvObj = md;
                    op.actionFunc(oobj);
                }
                return;
            }
            var setValue = function (value) {
                inputElem.value = value;
                if (inputObj)
                    inputObj.opts.editValue = value;
            };
            var addChar = function (char) {
                var selst = inputElem.selectionStart;
                var selend = inputElem.selectionEnd;
                var pos = KvLib.getCaretPosition(inputElem);
                inputElem.value = KvLib.stringSplice(elemValue, selst, selend - selst, char);
                inputElem.focus();
                KvLib.setCaretPosition(inputElem, selst + 1);
                reCreate();
                return;
            };
            var subChar = function () {
                var selst = inputElem.selectionStart;
                var selend = inputElem.selectionEnd;
                var len = selend - selst;
                if (len === 0) {
                    if (!selst) {
                        inputElem.focus();
                        return;
                    }
                    inputElem.value = KvLib.stringSplice(elemValue, selst - 1, 1);
                    KvLib.setCaretPosition(inputElem, selst - 1);
                } else {
                    inputElem.value = KvLib.stringSplice(elemValue, selst, len);
                    KvLib.setCaretPosition(inputElem, selst);
                }
                return;
            };

            if (strA[0] === "inpButton") {
                addChar(inValue);
                return;
            }
            if (strA[0] === "sysButton") {
                switch (itemId) {
                    case "enter":
                        sys.popOff(2);
                        if (op.actionFunc) {
                            var oobj = {};
                            oobj.act = "keypadEnter";
                            oobj.value = inputElem.value;
                            oobj.kvObj = md;
                            op.actionFunc(oobj);
                        }
                        return;
                    case "exit"://home
                        sys.popOff(2);
                        break;
                }
                return;
            }
            if (strA[0] === "ctrButton") {
                switch (itemId) {
                    case "back"://back
                        subChar();
                        break;
                    case "home"://home
                        KvLib.setCaretPosition(inputElem, 0);
                        break;
                    case "clr"://clr
                        setValue("");
                        reCreate();
                        break;
                    case "del"://del
                        var selst = inputElem.selectionStart;
                        var selend = inputElem.selectionEnd;
                        var len = selend - selst;
                        if (selst === elemValue.length) {
                            inputElem.focus();
                            return;
                        }
                        if (len === 0)
                            len = 1;
                        inputElem.value = KvLib.stringSplice(elemValue, selst, len);
                        KvLib.setCaretPosition(inputElem, selst);
                        break;
                    case "end"://end
                        KvLib.setCaretPosition(inputElem, elemValue.length);
                        break;
                    case "left"://left
                        var pos = KvLib.getCaretPosition(inputElem);
                        if (pos)
                            pos--;
                        KvLib.setCaretPosition(inputElem, pos);
                        break;
                    case "right"://right
                        var pos = KvLib.getCaretPosition(inputElem);
                        if (pos < elemValue.length)
                            pos++;
                        KvLib.setCaretPosition(inputElem, pos);
                        break;

                }
                inputElem.focus();
                return;
            }

        };
        var cname = "c";
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 50;
        opts.ihO.c1 = 60;
        opts.ihO.c2 = 9999;
        if (op.setObj.memo_f)
            opts.ihO.c1 = 300;
        opts.margin = 4;
        opts.ym = 8;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================


        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = op.ctrWidthRate;
        opts.xm = op.ctrXm;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = op.sysTbl.length + 1;
        opts.iwO = {};
        opts.iwO["c0"] = 9999;
        for (var i = 0; i < op.sysTbl.length; i++) {
            opts.iwO["c" + (i + 1)] = op.sysButtonWidth;
        }
        opts.xm = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnTitle", cname);
        //======================================================================
        var cname = lyMap.get("pnTitle") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};

        for (var i = 0; i < op.sysTbl.length; i++) {
            var cname = lyMap.get("pnTitle") + "~" + (i + 1);
            var opts = {};
            opts.clickFunc = actionFunc;
            opts.innerText = op.sysTbl[i].split("<>")[0];
            opts.itemId = op.sysTbl[i].split("<>")[1];
            opts.fontSize = "0.6rh";
            comps[cname] = {name: "sysButton#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        op.setObj.name = "";
        op.setObj.titleWidth = "1.2rh";
        op.setObj.showName_f = 1;
        op.setObj.showDataType_f = 1;
        op.setObj.showKeyboard_f = 0;
        opts.setObj = op.setObj;
        opts.actionFunc = actionFunc;
        op.setObj.inGroup_f = 0;
        opts.checkLegel_f = 0;

        if (op.setObj.memo_f) {
            opts.textValue = op.setObj.value;
            comps[cname] = {name: "editArea", type: "textarea~sys", opts: opts};
        } else
            models[cname] = {name: "editOptsLine", type: "Md_editOptsLine~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.xc = op.inpRows[0];
        opts.yc = op.inpRows[1];
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnInp", cname);
        for (var i = 0; i < op.inpTbl.length; i++) {
            var strA = op.inpTbl[i].split("<>");
            var cname = lyMap.get("pnInp") + "~" + (i);
            var opts = {};
            opts.clickFunc = actionFunc;
            opts.innerText = op.inpTbl[i].split("<>")[0];
            opts.itemId = op.inpTbl[i].split("<>")[1];
            if (strA[3]) {
                opts.fontSize = strA[3];
            }
            comps[cname] = {name: "inpButton#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.xc = op.ctrRows[0];
        opts.yc = op.ctrRows[1];
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnCtr", cname);
        for (var i = 0; i < op.ctrTbl.length; i++) {
            var strA = op.ctrTbl[i].split("<>");
            var xPos = parseInt(strA[2].split(",")[0]);
            var yPos = parseInt(strA[2].split(",")[1]);
            var pos = yPos * op.ctrRows[0] + xPos;
            var cname = lyMap.get("pnCtr") + "~" + (pos);
            var opts = {};
            opts.clickFunc = actionFunc;
            opts.innerText = op.ctrTbl[i].split("<>")[0];
            opts.itemId = op.ctrTbl[i].split("<>")[1];
            //opts.fontSize = "0.6rh";
            if (strA[3]) {
                opts.fontSize = strA[3];
            }
            comps[cname] = {name: "ctrButton#" + i, type: "button~sys", opts: opts};
        }
    }
}
//===========================================



//===========================================
class Md_numpad {
    static init() {
        var bobj = gr.modelOpts["Md_numpad"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 600;
        bobj.propertyHeight = 400;
        bobj.title = "Title";
        bobj.borderWidth = 3;
        bobj.baseColor = "#ccc";
        bobj.selected_f = 1;
        bobj.phonePad_f = 0;

        dsc.selected_f = sys.setOptsSet("selected_f", "flag", "inputBoolean");


        var setObj = {};
        setObj.dataType = "num";
        setObj.setType = "inputNumber";
        setObj.nullOk_f = 0;
        setObj.name = "Title";
        setObj.value = 0;
        setObj.max = 9999999999;
        setObj.min = -9999999999;
        setObj.fixed = 0;
        bobj.setObj = setObj;
        InitOpts.getSetObjDsc(dsc);

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
        var self = this;
        var md = self.md;
        var op = md.opts;


        if (op.setObj.memo_f) {
            var editArea = md.compRefs["editArea"];
            var inputElem = editArea.elems["textarea"];

        } else {
            var editOptsLine = md.modelRefs["editOptsLine"];
            var inputObj = editOptsLine.compRefs["input"];
            var inputElem = inputObj.elems["input"];
        }


        if (md.opts.selected_f)
            inputElem.select();
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
        if (!op.setObj.phonePad_f)
            var numTbl = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "+-", "0", "."];
        else
            var numTbl = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
        //======================================================================
        var actionFunc = function (iobj) {
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;


            if (op.setObj.memo_f) {
                var editArea = md.compRefs["editArea"];
                var inputElem = editArea.elems["textarea"];

            } else {
                var editOptsLine = md.modelRefs["editOptsLine"];
                var inputObj = editOptsLine.compRefs["input"];
                var inputElem = inputObj.elems["input"];
            }


            var value = inputElem.value;
            var inValue = kvObj.opts.innerText;

            var enterPrg = function () {
                var errStr = editOptsLine.mdClass.checkLegel(value);
                if (errStr) {
                    //md.opts.disBlurOne_f = 1;
                    sys.mesBox("cr~Error", 500, errStr);
                    //var kvObj=md.reCreate();
                    //kvObj.opts.disBlurOne_f = 0;
                    return;
                }


                if (op.actionFunc) {
                    var oobj = {};
                    oobj.act = "keypadEnter";
                    oobj.value = inputElem.value;
                    oobj.kvObj = md;
                    sys.popOff(2);
                    op.actionFunc(oobj);
                    return;
                }
                sys.popOff(2);
                return;


            };

            if (iobj.act === "pressEnter") {
                enterPrg();
                return;
            }


            var setValue = function (value) {
                inputElem.value = value;
                var nn = parseInt(value);
                inputObj.opts.editValue = parseInt(value);
            };
            if (!inValue)
                return;






            var strA = name.split("#");
            if (strA[0] === "number") {

                if (md.opts.selected_f) {
                    md.opts.selected_f = 0;
                    value = "";
                }
                if (inValue === ".") {
                    if (value.includes("."))
                        return;
                }



                if (value === "0") {
                    if (inValue === ".") {
                        value += inValue;
                        setValue(value);
                        return;
                    }
                }
                if (inValue === "+-") {
                    var strB = value.split("");
                    if (strB[0] === "0" && strB.length === 1)
                        return;
                    if (strB[0] === "-") {
                        value = value.substring(1, value.length);
                    } else {
                        value = "-" + value;
                    }
                    setValue(value);
                    return;
                } else {
                    if (value === "0") {
                        value = inValue;
                    } else {
                        value += inValue;
                    }
                    setValue(value);
                    return;
                }
            }
            if (strA[0] === "command") {
                switch (strA[1]) {
                    case "0":
                        if (md.opts.selected_f) {
                            md.opts.selected_f = 0;
                            inputElem.blur();
                            return;
                        }
                        if (value.length)
                            value = value.substring(0, value.length - 1);
                        if (value === "") {
                            if (!op.setObj.nullOk_f)
                                value = "0";
                        }
                        setValue(value);

                        break;
                    case "1":
                        if (op.setObj.nullOk_f)
                            setValue("");
                        else
                            setValue("0");
                        break;
                    case "2":
                        sys.popOff(2);
                        break;
                    case "3":
                        enterPrg();
                        break;

                }
            }
        };
        var cname = "c";
        var opts = {};
        opts.yc = 3;
        opts.ihO = {};
        if (op.title)
            opts.ihO.c0 = 60;
        else
            opts.ihO.c0 = 0;
        opts.ihO.c1 = 80;
        opts.ihO.c2 = 9999;
        opts.margin = 4;
        opts.ym = 8;
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = "0.3rw";
        opts.xm = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMain", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.yc = 4;
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft", cname);
        //======================================================================
        var cname = lyMap.get("pnMain") + "~" + 1;
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ym = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnRight", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        comps[cname] = {name: "titleLabel", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        op.setObj.name = "";
        op.setObj.titleWidth = "1.1rh";
        op.setObj.showName_f = 1;
        op.setObj.showDataType_f = 1;
        op.setObj.buttonWidth = "1.2rh";
        op.setObj.showKeyboard_f = 0;
        op.setObj.inGroup_f = 0;
        opts.setObj = op.setObj;
        opts.checkLegel_f = 1;
        opts.setObj.disSetButton_f = 1;
        opts.setObj.showKeyboard_f = 0;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "editOptsLine", type: "Md_editOptsLine~sys", opts: opts};
        //======================================================================
        for (var i = 0; i < 12; i++) {
            var cname = lyMap.get("pnLeft") + "~" + i;
            var opts = {};
            opts.innerText = numTbl[i];
            if (opts.innerText === ".") {
                if (op.setObj.dataType !== "ratio")
                    opts.innerText = "";
            }

            opts.clickFunc = actionFunc;
            comps[cname] = {name: "number#" + i, type: "button~sys", opts: opts};
        }
        //======================================================================
        var cmdTbl = [
            '<i class="material-icons">&#xe14a;</i>',
            '<i class="material-icons">&#xe0e9;</i>',
            "Esc",
            "Ent"
                    //'<i class="material-icons">&#xe0e9;</i>',
                    //'<i class="material-icons">&#xe31b;</i>'
        ];
        for (var i = 0; i < 4; i++) {
            var cname = lyMap.get("pnRight") + "~" + i;
            var opts = {};
            opts.innerText = cmdTbl[i];
            opts.clickFunc = actionFunc;
            comps[cname] = {name: "command#" + i, type: "button~sys", opts: opts};
        }
        return;



    }
}
//===========================================
