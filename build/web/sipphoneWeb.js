class SipphoneWeb {
    constructor() {
        gr.hideWavePageElem = null;
        gr.sipphoneData = {};
        gr.socketRetPrgTbl["tick"] = function (sipphoneData) {
            var keys = Object.keys(sipphoneData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.sipphoneData[keys[i]] = sipphoneData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.sipphoneData[strA[0]][inx0] = sipphoneData[keys[i]];
                    continue;
                }
            }
            gr.sipphoneData.rxed_f = 1;
            console.log("sipphoneData");
        };


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        ws.tick();
        st.watchDataA = ["", "", "", "", ""];
        if (gr.sipphoneData) {
            st.watchDataA[0] = gr.sipphoneData.realSipphoneIp;
            st.watchDataA[1] = gr.sipphoneData.realSipphoneMac;
            st.watchDataA[2] = gr.sipphoneData.sipName;
            st.watchDataA[3] = gr.sipphoneData.sipNo;
            st.watchDataA[4] = gr.sipphoneData.sipServerIp;
        }



    }

    setPrg(title) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];
        opts.ksObjWs = [9999];

        if (title === "電話使用介面") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.key.split('#');
                if (strA[0] === "reDirect") {
                    if (gr.sipphoneData.phoneFlag & 1) {
                        var sipCmd = "Redirect -a off\n";
                        ws.cmd("sipCommandDirect", [sipCmd]);
                        return;
                    }


                    var opts = {};
                    opts.title = "無條件轉接號碼";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (iobj.inputText.length !== 0) {
                                var sipCmd = "Redirect -t always " + iobj.inputText + "\n";
                                ws.cmd("sipCommandDirect", [sipCmd]);
                                return;
                            }
                        }
                        /*
                         sipCommand = "Redirect -t always " + Input.ret_str + "\n";
                         } else {
                         sipCommand = "Redirect -a off\n";
                         */


                    };
                    box.intPadBox(opts);
                    return;
                }
                ws.cmd("phoneCommand", [iobj.key]);
            };
            var kvObj = new Block("phoneBox", "Model~MdbPhoneBox~base.sys0", opts);
            mda.popObj(800, 9999, kvObj);
            return;
        }

        if (title === "電話設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "phoneType"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipNumber"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ipType"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemIpAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemNetMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemGateWay"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ringTime"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "autoAnswer"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "autoAnswerWaitTime"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "earPhoneVolume"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "setPhoneVolume"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "broadcastContext"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "broadcastPort"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipDialNumber"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipDialPushCount"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipCutPushCount"}));
        }

        if (title === "系統設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpAdjTime"}));

        }

        if (title === "快撥鍵設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#8"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#8"}));
            opts.ksObjWsR = {};
            opts.ksObjWsR.r0 = ["0.7rw", 9999];
            opts.ksObjWsR.r1 = ["0.7rw", 9999];
            opts.ksObjWsR.r2 = ["0.7rw", 9999];
            opts.ksObjWsR.r3 = ["0.7rw", 9999];
            opts.ksObjWsR.r4 = ["0.7rw", 9999];
            opts.ksObjWsR.r5 = ["0.7rw", 9999];
            opts.ksObjWsR.r6 = ["0.7rw", 9999];
            opts.ksObjWsR.r7 = ["0.7rw", 9999];
        }


        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            if (!kopts.setOpts.titleWidth)
                kopts.setOpts.titleWidth = 400;
            setObjs.push(ksObj);
        }
        //================================
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var wsA = opts.ksObjWs;
            if (opts.ksObjWsR) {
                if (opts.ksObjWsR["r" + i])
                    wsA = opts.ksObjWsR["r" + i];
            }
            var ksObjs = [];
            for (var j = 0; j < wsA.length; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObj.name = "setLine#" + i + "." + j;
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.title = title;
        opts.w = "0.9rw";
        opts.h = "0.9rh";
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            if (iobj.buttonId !== "ok")
                return;
            mac.saveSetOpts(iobj.ksObjss, gr.paraSet);

        };
        box.setLineBox(opts);
    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 70, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.itemId === "save")
                mac.saveParaSetAll("responseDialogOk");
            if (iobj.kvObj.opts.itemId === "esc")
                window.close();
        };
        mac.setHeadTitleBar(md, cname, "JOSN SIP 電話系統", actionPrg, ["save"]);
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["電話設定", "系統設定", "快撥鍵設定", "電話使用介面"];
        opts.buttonIds = ["sipphoneSet", "sysSet", "hotlineSet", "phoneUi"];
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);


            self.setPrg(iobj.buttonText);
            return;
            gr.appType = "Model~MdaMdTest~base.sys0";
            sys.dispWebPage();
            return;

        };
        opts.buttonAmt = 4;
        opts.fontSize = "0.5rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 2;
        //==============================
        var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.watchDataA";
        var setOptsA = [];
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemName"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "version"}));
        //
        var setOpts = sopt.getParaSetOpts({paraSetName: "systemIpAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#0", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "systemMacAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#1", "editValue", 1]);
        setOptsA.push(setOpts);

        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemId"}));

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipName"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#2", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipNumber"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#3", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipServerAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#4", "editValue", 1]);
        setOptsA.push(setOpts);

        setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpServerAddress"}));
        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.name = "setLine#" + ii;
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            kopts.setOpts.setType = "inputText";
            kopts.setOpts.dataType = "str";
            kopts.setOpts.checkType = "str";
            kopts.setOpts.actButtons = [];
            kopts.setOpts.titleWidth = 400;
            kopts.setOpts.readOnly_f = 1;
            kopts.setOpts.editBaseColor = "#e8e8ff";
            setObjs.push(ksObj);
        }
        //================================
        var opts = {};
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.ksObjWs = [9999];
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        blocks[cname] = {name: "infPanel", type: obj.type, opts: obj.opts};

    }
}




class SipphoneUiWeb {
    constructor() {
        gr.hideWavePageElem = null;
        gr.socketRetPrgTbl["tick"] = function (radarData) {
            var keys = Object.keys(radarData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.radarData[keys[i]] = radarData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.radarData[strA[0]][inx0] = radarData[keys[i]];
                    continue;
                }
            }
            if (gr.viewDatas_f) {
                for (var i = 0; i < 8; i++) {
                    gr.viewDatas[i] = KvLib.trsIntToHexStr(gr.radarData.viewDatas[i]);
                }
            }
            console.log("radarData");
        };


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (gr.paraSet.emulate !== 1)
            ws.tick();




    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];
        opts.ksObjWs = [9999];
        if (id === "電話使用介面") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.key.split('#');
                if (strA[0] === "reDirect") {
                    if (gr.sipphoneData.phoneFlag & 1) {
                        var sipCmd = "Redirect -a off\n";
                        ws.cmd("sipCommandDirect", [sipCmd]);
                        return;
                    }


                    var opts = {};
                    opts.title = "無條件轉接號碼";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (iobj.inputText.length !== 0) {
                                var sipCmd = "Redirect -t always " + iobj.inputText + "\n";
                                ws.cmd("sipCommandDirect", [sipCmd]);
                                return;
                            }
                        }
                        /*
                         sipCommand = "Redirect -t always " + Input.ret_str + "\n";
                         } else {
                         sipCommand = "Redirect -a off\n";
                         */


                    };
                    box.intPadBox(opts);
                    return;
                }
                ws.cmd("phoneCommand", [iobj.key]);
            };
            var kvObj = new Block("phoneBox", "Model~MdbPhoneBox~base.sys0", opts);
            mda.popObj(800, 9999, kvObj);
            return;
        }


        if (id === "車型設定") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "save") {
                    gr.paraSet.carTypeNames = iobj.names;
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", null, fileName, content);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;

                }
                if (iobj.senderName === "setHeadTitleBar") {
                    if (iobj.act === "mouseClick") {
                        if (iobj.kvObj.opts.itemId === "esc")
                            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    }
                }
            };
            opts.names = gr.paraSet.carTypeNames;
            opts.title = id;
            opts.itemName = "車型名稱";
            var kvObj = new Block("mdaBox", "Model~NamesMenu~base.sys0", opts);
            mda.popObj(800, 600, kvObj);
            return;

        }

        if (id === "車號設定") {
            var opts = {};
            opts.kvTexts = gr.paraSet.carTypeNames;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "selected") {
                    var carTypeNos = "carTypeNos#" + iobj.selectText;
                    var carTypeName = iobj.selectText;
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "actButtonClick") {
                            var carNo = iobj.kvObj.opts.setOpts.value;
                            self.setPrg("車號內容設定", "content#"+carTypeName + "#" + carNo);
                            return;
                        }
                        if (iobj.act === "save") {
                            gr.paraSet[carTypeNos] = iobj.names;
                            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                            return;
                        }
                        if (iobj.senderName === "setHeadTitleBar") {
                            if (iobj.act === "mouseClick") {
                                if (iobj.kvObj.opts.itemId === "esc")
                                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                            }
                        }
                    };
                    opts.names = gr.paraSet[carTypeNos];
                    opts.title = iobj.selectText + " 車號設定";
                    opts.itemName = "車號名稱";
                    opts.actAble_f = 1;
                    var kvObj = new Block("mdaBox", "Model~NamesMenu~base.sys0", opts);
                    mda.popObj(800, 600, kvObj);
                    return;




                }
            };
            box.selectBox(opts);
            return;


        }

        if (id === "系統設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemIpAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipphoneIpAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchIpAddress"}));


            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpAdjTime"}));
        }

        if (id === "車號內容設定") {
            var values = gr.paraSet[setId];
            if (!values)
                values = ["100", "192.168.0.0", "192.168.0.0", "192.168.0.0", "192.168.0.0", "192.168.0.0"];

            var setOpts = sopt.getOptsPara("natureStr");
            setOpts.title = ["電話號碼"];
            setOpts.value = values[0];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = ["本機 IP"];
            setOpts.value = values[1];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = ["SIP電話 IP"];
            setOpts.value = values[2];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = ["閘道器 IP"];
            setOpts.value = values[3];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = ["SIP Server IP"];
            setOpts.value = values[4];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = ["NTP Server IP"];
            setOpts.value = values[5];
            setOptsA.push(setOpts);


        }

        if (id === "快撥鍵設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#8"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#8"}));
            opts.ksObjWsR = {};
            opts.ksObjWsR.r0 = ["0.7rw", 9999];
            opts.ksObjWsR.r1 = ["0.7rw", 9999];
            opts.ksObjWsR.r2 = ["0.7rw", 9999];
            opts.ksObjWsR.r3 = ["0.7rw", 9999];
            opts.ksObjWsR.r4 = ["0.7rw", 9999];
            opts.ksObjWsR.r5 = ["0.7rw", 9999];
            opts.ksObjWsR.r6 = ["0.7rw", 9999];
            opts.ksObjWsR.r7 = ["0.7rw", 9999];
        }

        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            if (!kopts.setOpts.titleWidth)
                kopts.setOpts.titleWidth = 400;
            setObjs.push(ksObj);
        }
        //================================
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var wsA = opts.ksObjWs;
            if (opts.ksObjWsR) {
                if (opts.ksObjWsR["r" + i])
                    wsA = opts.ksObjWsR["r" + i];
            }
            var ksObjs = [];
            for (var j = 0; j < wsA.length; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObj.name = "setLine#" + i + "." + j;
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.title = id;
        opts.w = "0.9rw";
        opts.h = "0.9rh";
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            if (iobj.buttonId !== "ok")
                return;
            if (id === "車號內容設定") {
                var values = [];
                for (var i = 0; i < iobj.ksObjss.length; i++) {
                    var ksObjs = iobj.ksObjss[i];
                    for (var j = 0; j < ksObjs.length; j++) {
                        var ksObj = ksObjs[j];
                        var setOpts = ksObj.opts.setOpts;
                        values.push(setOpts.value);
                    }
                }
                gr.paraSet[setId]=values;
            } else
                mac.saveSetOpts(iobj.ksObjss, gr.paraSet);

        };
        box.setLineBox(opts);


    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 70, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);

        };
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.itemId === "save")
                var keys=Object.keys(gr.paraSet);
                for(var i=0;i<keys.length;i++){
                    var strA=keys[i].split("#");
                    if(strA[0]!=="content")
                        continue;
                    var names=gr.paraSet["carTypeNames"];
                    var yes_f=0;
                    for(var j=0;j<names.length;j++){
                        if(names[j]===strA[1]){
                            yes_f=1;
                            break;
                        }
                    }
                    if(!yes_f){
                        delete gr.paraSet[keys[i]];
                        continue;
                    }    
                    
                    var names=gr.paraSet["carTypeNos#"+strA[1]];
                    var yes_f=0;
                    for(var j=0;j<names.length;j++){
                        if(names[j]===strA[2]){
                            yes_f=1;
                            break;
                        }
                    }
                    if(!yes_f){
                        delete gr.paraSet[keys[i]];
                        continue;
                    }    
                }
                
                mac.saveParaSetAll("responseDialogOk");
            if (iobj.kvObj.opts.itemId === "esc")
                window.close();
        };
        mac.setHeadTitleBar(md, cname, "車載二合一 電話系統", actionPrg, ["save"]);

        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["系統設定", "車型設定", "車號設定", "快撥鍵設定", "電話使用介面"];
        opts.buttonIds = ["sipphoneSet", "sysSet", "hotlineSet", "phoneUi"];
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);
            self.setPrg(iobj.buttonText);
            return;

        };
        opts.buttonAmt = 5;
        opts.fontSize = "0.5rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 2;
        //==============================
        var setOptsA = [];
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemName"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "version"}));
        //===============
        var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.watchDataA";
        var setOpts = sopt.getParaSetOpts({paraSetName: "systemMacAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#1", "editValue", 1]);
        setOptsA.push(setOpts);




        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemId"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "nowCarTypeName"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "nowCarTypeNo"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemIpAddress"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipphoneIpAddress"}));
        var setOpts = sopt.getParaSetOpts({paraSetName: "sipName"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#2", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipNumber"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#3", "editValue", 1]);
        setOptsA.push(setOpts);



        setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerAddress"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchIpAddress"}));
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpServerAddress"}));
        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.name = "setLine#" + ii;
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            kopts.setOpts.setType = "inputText";
            kopts.setOpts.dataType = "str";
            kopts.setOpts.checkType = "str";
            kopts.setOpts.actButtons = [];
            kopts.setOpts.titleWidth = 400;
            kopts.setOpts.readOnly_f = 1;
            kopts.setOpts.editBaseColor = "#e8e8ff";
            setObjs.push(ksObj);
        }
        //================================
        var opts = {};
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.ksObjWs = [9999];
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        blocks[cname] = {name: "infPanel", type: obj.type, opts: obj.opts};

    }
}





class NamesMenu {
    constructor() {


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.itemName = "itemName";
        opts.names = [];
        for (var i = 0; i < 33; i++)
            opts.names.push("name " + (i + 1));
        opts.titleWidth = 200;
        opts.dispNo_f = 1;
        opts.editAble_f = 1;
        opts.actAble_f = 0;
        opts.col = 1;
        opts.wsA = [9999];
        opts.checkWidth = 40;
        opts.noWidth = 40;
        return opts;
    }

    chkWatch() {

    }

    newSetOpts(value, no) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var sopts = sopt.getOptsPara("str");
        sopts.title = op.itemName;
        sopts.value = value;
        sopts.titleWidth = op.titleWidth;
        sopts.readOnly_f = 1;
        sopts.nullErr_f = 1;
        sopts.checkWidth = op.checkWidth;
        if (op.dispNo_f) {
            sopts.noWidth = op.noWidth;
            sopts.no = no;
        }
        sopts.editBaseColor = "#e8e8ff";
        sopts.actButtons = [];
        if (op.editAble_f)
            sopts.actButtons.push("edit");
        if (op.actAble_f)
            sopts.actButtons.push("act");
        return sopts;

    }

    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 60, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            iobj.senderName = "setHeadTitleBar";
            iobj.sender = md;
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 1;


        var opts = {};
        opts.buttons = [];
        opts.buttonIds = [];
        opts.buttons.push('<i class="gf">&#xe834</i>');
        opts.buttonIds.push("selectAll");
        opts.buttons.push('<i class="gf">&#xe835</i>');
        opts.buttonIds.push("selectClear");
        opts.buttons.push('<i class="gf">&#xe5d8</i>');
        opts.buttonIds.push("selectUp");
        opts.buttons.push('<i class="gf">&#xe5db</i>');
        opts.buttonIds.push("selectDown");
        opts.buttons.push('<i class="gf">&#xe145</i>');
        opts.buttonIds.push("add");
        opts.buttons.push('<i class="gf">&#xe15b</i>');
        opts.buttonIds.push("sub");
        opts.buttons.push('<i class="gf">&#xe161</i>');
        opts.buttonIds.push("save");
        opts.iw = 60;
        opts.xm = 10;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var setLineBoxObj = md.blockRefs["setLineBox"];
                var containerObj = setLineBoxObj.blockRefs["mainMd"];
                var ksObjss = containerObj.opts.ksObjss;
                var oobj = {};
                oobj.act = "checkPreChange";
                oobj.sender = setLineBoxObj;
                var errStr = setLineBoxObj.opts.actionFunc(oobj);
                if (errStr)
                    return;
                setLineBoxObj.opts.ksObj.opts.ksObjss = containerObj.opts.ksObjss;

                if (iobj.buttonId === "selectAll" || iobj.buttonId === "selectClear") {
                    var ksObjAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    for (var i = 0; i < ksObjAA.length; i++) {
                        var ksObjA = ksObjAA[i];
                        for (var j = 0; j < ksObjA.length; j++) {
                            var ksObj = ksObjA[j];
                            if (ksObj) {
                                if (iobj.buttonId === "selectAll")
                                    ksObj.opts.setOpts.checked_f = 1;
                                else
                                    ksObj.opts.setOpts.checked_f = 0;
                            }
                        }
                    }
                    setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.rowStart;
                    //setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.allLine - containerObj.stas.pageElemAmt + 1;
                    setLineBoxObj.reCreate();


                    return;
                }
                if (iobj.buttonId === "selectClear") {
                    for (var i = 0; i < ksObjss.length; i++) {
                        ksObjs = ksObjss[i];
                        for (var j = 0; j < ksObjs.length; j++) {
                            var setLineObj = containerObj.blockRefs[ksObjs[j].name];
                            setLineObj.opts.setOpts.checked_f = 0;
                            setLineObj.reCreate();
                        }
                    }
                    return;
                }
                var checkAmt = 0;
                var iCnt = 0;
                var jCnt = 0;
                if (iobj.buttonId === "selectUp" || iobj.buttonId === "selectDown") {
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    for (var i = 0; i < setLineAA.length; i++) {
                        var setLineA = setLineAA[i];
                        for (var j = 0; j < setLineA.length; j++) {
                            var setLineObj = setLineA[j];
                            if (setLineObj.opts.setOpts.checked_f) {
                                checkAmt++;
                                iCnt = i;
                                jCnt = j;
                            }
                        }
                    }
                    if (checkAmt !== 1)
                        return;
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    var obj1 = setLineAA[iCnt][jCnt];
                    if (iobj.buttonId === "selectUp")
                        var nextI = iCnt - 1;
                    else
                        var nextI = iCnt + 1;
                    if (nextI < 0)
                        return;
                    if (!setLineAA[nextI])
                        return;
                    var obj2 = setLineAA[nextI][jCnt];
                    if (!obj1 || !obj2)
                        return;
                    var obj1Opts = JSON.parse(JSON.stringify(obj1.opts.setOpts));
                    var obj1No = obj1.opts.setOpts.no;
                    var obj2Opts = JSON.parse(JSON.stringify(obj2.opts.setOpts));
                    var obj2No = obj2.opts.setOpts.no;
                    obj1.opts.setOpts = obj2Opts;
                    obj2.opts.setOpts = obj1Opts;
                    obj1.opts.setOpts.no = obj1No;
                    obj2.opts.setOpts.no = obj2No;
                    if (nextI < setLineBoxObj.opts.ksObj.opts.rowStart)
                        setLineBoxObj.opts.ksObj.opts.rowStart = nextI;
                    if (nextI >= containerObj.stas.rowStart + containerObj.stas.pageElemAmt)
                        setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.rowStart + 1;
                    setLineBoxObj.reCreate();
                    return;
                }
                if (iobj.buttonId === "save") {
                    var oobj = {};
                    oobj.act = "checkPreChange";
                    oobj.sender = setLineBoxObj;
                    var errStr = setLineBoxObj.opts.actionFunc(oobj);
                    if (errStr)
                        return;


                    oobj = {};
                    oobj.act = "save";
                    oobj.sender = md;
                    oobj.kvObj = iobj.kvObj;
                    oobj.names = [];
                    var ksObjAA = containerObj.opts.ksObjss;
                    for (var i = 0; i < ksObjAA.length; i++)
                        oobj.names.push(ksObjAA[i][0].opts.setOpts.value);
                    KvLib.exe(op.actionFunc, oobj);
                    return;

                }
                if (iobj.buttonId === "add") {
                    var opts = {};
                    opts.title = "新增";
                    opts.setOpts = sopt.getOptsStr({});
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (!iobj.inputText.trim()) {
                                box.errorBox({kvTexts: ["Input Format Error !!!"]});
                                return;

                            }
                            var ksObjAA = containerObj.opts.ksObjss;
                            for (var i = 0; i < ksObjAA.length; i++) {
                                var ksObjA = ksObjAA[i];
                                for (var j = 0; j < ksObjA.length; j++) {
                                    if (ksObjA[j].opts.setOpts.value === iobj.inputText) {
                                        box.errorBox({kvTexts: ["Input Name Is Existed !!!"]});
                                        return;
                                    }
                                }
                            }

                            var ksObj = {};
                            ksObj.type = "Model~MdaSetLine~base.sys0";
                            ksObj.name = "setLine#" + containerObj.opts.ksObjss.length + ".0";
                            ksObj.opts = {};
                            ksObj.opts.setOpts = self.newSetOpts(iobj.inputText, containerObj.opts.ksObjss.length + 1);


                            containerObj.opts.ksObjss.push([ksObj]);
                            setLineBoxObj.opts.ksObj.opts.ksObjss = containerObj.opts.ksObjss;
                            var rowStart = containerObj.stas.allLine - containerObj.stas.pageElemAmt + 1;
                            if (rowStart < 0)
                                rowStart = 0;
                            setLineBoxObj.opts.ksObj.opts.rowStart = rowStart;
                            setLineBoxObj.reCreate();
                        }
                    };
                    box.keyboardBox(opts);
                    return;



                }
                if (iobj.buttonId === "sub") {
                    var ksObjss = [];
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    var inx = 0;
                    for (var i = 0; i < setLineAA.length; i++) {
                        var setLine = setLineAA[i][0];
                        if (!setLine.opts.setOpts.checked_f) {
                            var newSetLine = {};
                            newSetLine.name = "setLine#" + inx + ".0";
                            newSetLine.opts = setLine.opts;
                            newSetLine.type = setLine.type;
                            newSetLine.opts.setOpts.no = (inx + 1);
                            inx++;
                            ksObjss.push([newSetLine]);
                        }
                    }
                    if (ksObjss.length === setLineAA.length)
                        return;
                    var opts = {};
                    opts.kvTexts = ["Delete All Selection ?"];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.kvObj.name === "ok") {
                            setLineBoxObj.opts.ksObj.opts.ksObjss = ksObjss;
                            setLineBoxObj.reCreate();
                        }
                    };
                    box.checkBox(opts);
                    return;


                }
            }

        };
        opts.buttonAmt = 7;
        opts.fontSize = "0.9rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};

        //============================================================

        var cname = lyMaps["mainBody"] + "~" + 2;
        var row = Math.ceil(op.names.length / op.col);
        var setOptsAA = [];
        var inx = 0;
        for (var i = 0; i < row; i++) {
            var setOptsA = [];
            for (var j = 0; j < op.col; j++) {
                setOptsA.push(self.newSetOpts(op.names[inx], inx + 1));
                inx++;
            }
            setOptsAA.push(setOptsA);
        }
        //==============================================================
        var opts = {};
        opts.ksObjWs = op.wsA;
        opts.ksObjss = [];
        for (var i = 0; i < setOptsAA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < setOptsAA[i].length; j++) {
                var ksObj = {};
                ksObj.type = "Model~MdaSetLine~base.sys0";
                ksObj.name = "setLine#" + i + "." + j;
                ksObj.opts = {};
                ksObj.opts.setOpts = setOptsAA[i][j];
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            KvLib.exe(op.actionFunc, iobj);

        };
        blocks[cname] = {name: "setLineBox", type: obj.type, opts: obj.opts};
    }
}



