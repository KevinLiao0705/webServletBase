/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gr, sys */



//===========================================
class Md_sync {
    static init() {
        var bobj = gr.modelOpts["Md_sync"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 0;
        bobj.propertyHeight = 0;
        if ("sys") {
            var obj = sobj["sys"] = {};

            obj.readyTime = 9999;
            obj.radiation_f = 0;
            obj.load_f = 0;
            obj.pageInx = 0;
            obj.engMode_f = 0;
            obj.viewMode_f = 0;

            //=======================
            obj.systemStatus = {};
            var sta = obj.systemStatus;
            sta.load_f = 1;
            sta.readyTime = 9999;
            sta.powerOn_f = 0;
            sta.radiation_f = 0;
            //========================
            obj.powerSuplyStatus = {};
            var sta = obj.powerSuplyStatus;
            sta.load_f = 1;
            sta.limitLows = [0, 0, 0];
            sta.limitHighs = [11, 12, 34];
            sta.valueA = [];
            sta.errA = [];
            for (var i = 0; i < 36; i++) {
                var values = [12 + i, 13 + i, 14 + i, 15 + i, 12 + i, 13 + i, 14 + i];
                sta.valueA.push(values);
                sta.errA.push(0);
            }


            obj.sspaStatus = {};
            sta = obj.sspaStatus;
            sta.load_f = 1;
            sta.limitLows = [0, 0, 0];
            sta.limitHighs = [11, 12, 34];
            sta.valueA = [];
            sta.errA = [];
            //values:rfin,rfout,rftemp,angle,flag
            for (var i = 0; i < 36; i++) {
                var values = [0, 0, 0, 0, 0];
                sta.valueA.push(values);
                sta.errA.push(0);
            }




            obj.meterStatus = {};
            var sta = obj.meterStatus;
            sta.load_f = 1;
            sta.valueA = [];
            for (var i = 0; i < 6; i++) {
                var sobj = {};
                sobj.name = "";
                sobj.id = "";
                sobj.input = 1234;
                sobj.output = 0;
                //=======================
                sobj.offset = 0;
                sobj.scale = 1.0;
                sobj.fixed = 1;
                sobj.max = null;
                sobj.min = null;
                sta.valueA.push(sobj);
            }
            sta.valueA[0].name = "本機輸入功率";
            sta.valueA[0].id = "localInputPower";
            sta.valueA[1].name = "遙控輸入功率";
            sta.valueA[1].id = "remoteInputPower";
            sta.valueA[2].name = "前置放大器輸出功率";
            sta.valueA[2].id = "preAmpOutputPower";
            sta.valueA[3].name = "驅動放大器輸出功率";
            sta.valueA[3].id = "driveAmpOutputPower";
            sta.valueA[4].name = "順向輸出功率";
            sta.valueA[4].id = "cwOutputPower";
            sta.valueA[5].name = "反向輸出功率";
            sta.valueA[5].id = "ccwOutputPower";
            //========================================================
            var sobj = {};
            sobj.name = "衰減器";
            sobj.id = "fader";
            sobj.input = 0;
            sobj.output = 0;
            sobj.offset = 1;
            sobj.scale = 0.5;
            sobj.fixed = 1;
            sobj.max = 63;
            sobj.min = 0;
            sta.valueA.push(sobj);

            obj.enviStatus = {};
            sta = obj.enviStatus;
            sta.load_f = 1;
            sta.valueA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            sta.airFlowLeftErr_f = 1;
            sta.airFlowMiddleErr_f = 0;
            sta.airFlowRightErr_f = 0;
            sta.waterTemprErr_f = 0;
            sta.waterFlowErrA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            obj.pulseGenStatus = {};
            sta = obj.pulseGenStatus;
            sta.load_f = 1;
            sta.localRemote_f = 0;
            sta.localRandomFixed_f = 0;
            sta.pulseStart_f = 0;
            sta.freq = 0;//0:2.9~3.5

            sta.pulseObjA = [];

            for (var i = 0; i < 30; i++) {
                var sobj = {};
                sobj.enable_f = 0;
                sobj.width = 100;
                sobj.duty = 60;
                sobj.times = 1;
                sta.pulseObjA.push(sobj);
            }




            obj.pulseStatus = {};
            sta = obj.pulseStatus;
            sta.load_f = 1;
            sta.disableErr_f = 0;
            sta.overDutyErr_f = 0;
            sta.overPulseWidthErr_f = 0;
            sta.overReflectErr_f = 0;
            sta.radiationTotalTime = 100;
            sta.radiationTime = 10;

            obj.fiberStatus = {};
            var sta = obj.fiberStatus;
            sta.load_f = 1;
            sta.txFlags = [];
            sta.rxFlags = [];
            for (var i = 0; i < 12; i++) {
                sta.txFlags.push(0);
                sta.rxFlags.push(0);
            }


            obj.testStatus = {};
            sta = obj.testStatus;
            sta.testMode = "";
            sta.testStep = 0;
            sta.testStaA = []; //0: stop, 1: start, 2: test Ok, 3: test error 
            sta.selfTestAllStart_f = 0;
            sta.selfTestAllSta = 0;
            sta.testLedA = [];
            for (var i = 0; i < 20; i++) {
                sta.testLedA.push(0);
            }

            obj.emuObj = {};
            sta = obj.emuObj;
            sta.testMode = 1;
            sta.emuData_f = 0;

        }


















    }

    transErrLed(sta, flag) {
        if (!sta.load_f)
            return 0;
        if (flag)
            return 2;
        return 1;
    }
    transSyncData() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var pageInx = op.pageInx;


        if (op.pageInx === 0) {
            if (op.readyTime) {
                st.readyTimeStr = "" + op.readyTime;
                st.readyLedInx = 0;
            } else {
                st.readyTimeStr = "";
                st.readyLedInx = 1;
            }

            if (op.radiation_f)
                st.radiationLed = 3;
            else
                st.radiationLed = 0;
            return;
        }



        if (op.pageInx === 1) {
            st.testStatus = {};
            var stas = op.testStatus;
            var bufs = st.testStatus;

            if (stas.selfTestAllStart_f)
                bufs.selfTestAllStart_f = 1;
            else
                bufs.selfTestAllStart_f = 0;
            bufs.testLedA = [];
            for (var i = 0; i < 16; i++) {
                bufs.testLedA.push(self.setTestLed(op.testStatus.testStaA[i], self.flashTime));
            }
        }


        if (pageInx === 2) {
            st.meterStatus = {};
            var stas = op.meterStatus;
            var bufs = st.meterStatus;
            bufs.valueStrA = [];


            bufs.altColorInxA = [];
            for (var i = 0; i < 7; i++) {
                var value = stas.valueA[i].input;
                value -= stas.valueA[i].offset;
                value *= stas.valueA[i].scale;
                stas.output = value;
                bufs.valueStrA.push(value.toFixed(stas.valueA[i].fixed));
                var colorInx = 1;//g
                if (value > stas.valueA[i].max)
                    colorInx = 0;
                if (value < stas.valueA[i].min)
                    colorInx = 0;
                bufs.altColorInxA.push(colorInx);//0:r, 1:g, 2:b
            }

            var sta = op.enviStatus;
            var buf = st.enviStatus = {};
            buf.valueA = [];
            for (var i = 0; i < 15; i++) {
                buf.valueA.push(self.transErrLed(sta, sta.valueA[i]));
            }
            /*
             buf.airFlowLeftLed = self.transErrLed(sta, sta.airFlowLeftErr_f);
             buf.airFlowMiddleLed = self.transErrLed(sta, sta.airFlowMiddleErr_f);
             buf.airFlowRightLed = self.transErrLed(sta, sta.airFlowRightErr_f);
             buf.waterTemprLed = self.transErrLed(sta, sta.waterTemprErr_f);
             buf.waterFlowLedA = [];
             for (var i = 0; i < 11; i++) {
             buf.waterFlowLedA.push(self.transErrLed(sta, sta.waterFlowErrA[i]));
             }
             */

            var sta = op.pulseStatus;
            var buf = st.pulseStatus = {};



            buf.disableLed = self.transErrLed(sta, sta.disableErr_f);
            buf.overDutyLed = self.transErrLed(sta, sta.overDutyErr_f);
            buf.overPulseWidthLed = self.transErrLed(sta, sta.overPulseWidthErr_f);
            buf.overReflectLed = self.transErrLed(sta, sta.overReflectErr_f);
            if (!sta.load_f) {
                buf.radiationTotalTimeStr = "----";
                buf.radiationTimeStr = "----";
            } else {
                buf.radiationTotalTimeStr = "" + sta.radiationTotalTime;
                buf.radiationTimeStr = "" + sta.radiationTime;
            }
            gr.message = "輻射總時數:" + buf.radiationTotalTimeStr + "小時";
            gr.message += "  輻射時間:" + buf.radiationTimeStr + "小時";



            var sta = op.pulseGenStatus;

            var buf = st.systemStatus = {};
            if (sta.localRemote_f) {
                buf.localButtonStr = "遙控";
                buf.localButtonColor = "#ff0";
                buf.remote_f = 1;
            } else {
                buf.localButtonStr = "本地";
                buf.localButtonColor = "#ccc";
                buf.remote_f = 0;
            }

            var sta = op.systemStatus;
            if (sta.powerOn_f) {
                buf.powerButtonStr = "電源 ON";
                buf.powerButtonColor = "#ff0";
            } else {
                buf.powerButtonStr = "電源 OFF";
                buf.powerButtonColor = "#ccc";
            }

            var sta = op.pulseGenStatus;
            if (sta.pulseStart_f) {
                buf.radiationLabelColor = "#ff0";
            } else {
                buf.radiationLabelColor = "#444";
            }


            var sta = op.powerSuplyStatus;
            var buf = st.powerSuplyStatus = {};
            buf.errA = [];
            for (var i = 0; i < 36; i++) {
                if (!sta.load_f) {
                    buf.errA.push(0);
                    continue;
                }
                buf.errA.push(self.transErrLed(sta, sta.errA[i]));
            }

            var sta = op.sspaStatus;
            var buf = st.sspaStatus = {};
            buf.errA = [];
            for (var i = 0; i < 36; i++) {
                if (!sta.load_f) {
                    st.errA.push(0);
                    continue;
                }
                buf.errA.push(self.transErrLed(sta, sta.errA[i]));
            }


            var sta = op.fiberStatus;
            var buf = st.fiberStatus = {};
            buf.txFlags = [];
            buf.rxFlags = [];
            for (var i = 0; i < 12; i++) {
                buf.txFlags.push(self.transErrLed(sta, sta.txFlags[i]));
                buf.rxFlags.push(self.transErrLed(sta, sta.rxFlags[i]));
            }



        }


        if (pageInx === 3) {
            st.powerSuplyStatus = {};
            var stas = op.powerSuplyStatus;
            var bufs = st.powerSuplyStatus;

            var highs = bufs.limitHighs = [null, null, null, null, null, null];
            var lows = bufs.limitLows = [null, null, null, null, null, null];
            highs[2] = parseInt(gr.paraSet["powerSuplyVoltLimitHigh"]);
            lows[2] = parseInt(gr.paraSet["powerSuplyVoltLimitLow"]);
            highs[3] = parseInt(gr.paraSet["powerSuplyCurrentLimitHigh"]);
            highs[4] = parseInt(gr.paraSet["powerSuplyTemperatureLimitHigh"]);

            bufs.valueA = [];
            bufs.loadA = [];

            var v50Gain = KvLib.toNumber(gr.paraSet["powerSuplyV50vGain"], 1);
            var v50Offset = KvLib.toNumber(gr.paraSet["powerSuplyV50vOffset"], 0);
            var i50Gain = KvLib.toNumber(gr.paraSet["powerSuplyI50vGain"], 1);
            var i50Offset = KvLib.toNumber(gr.paraSet["powerSuplyI50vtOffset"], 0);
            var t50Gain = KvLib.toNumber(gr.paraSet["powerSuplyT50vGain"], 1);
            var t50Offset = KvLib.toNumber(gr.paraSet["powerSuplyT50vOffset"], 0);

            var v32Gain = KvLib.toNumber(gr.paraSet["powerSuplyV32vGain"], 1);
            var v32Offset = KvLib.toNumber(gr.paraSet["powerSuplyV32vOffset"], 0);
            var i32Gain = KvLib.toNumber(gr.paraSet["powerSuplyI32vGain"], 1);
            var i32Offset = KvLib.toNumber(gr.paraSet["powerSuplyI32vtOffset"], 0);
            var t32Gain = KvLib.toNumber(gr.paraSet["powerSuplyT32vGain"], 1);
            var t32Offset = KvLib.toNumber(gr.paraSet["powerSuplyT32vOffset"], 0);


            bufs.valueA = [];
            bufs.loadA = [];
            bufs.errA = [];
            for (var i = 0; i < stas.valueA.length; i++) {
                var AA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                //stas.valueA[i][0] = 100;
                //stas.valueA[i][1] = 200;
                //stas.valueA[i][2] = 300;
                //stas.valueA[i][3] = 400;
                //stas.valueA[i][4] = 500;
                //stas.valueA[i][5] = 600;


                AA[2] = (stas.valueA[i][0] - v50Offset) * v50Gain;
                AA[3] = (stas.valueA[i][1] - i50Offset) * i50Gain;
                AA[4] = (stas.valueA[i][2] - t50Offset) * t50Gain;
                AA[5] = (stas.valueA[i][3] - v32Offset) * v32Gain;
                AA[6] = (stas.valueA[i][4] - i32Offset) * i32Gain;
                AA[7] = (stas.valueA[i][5] - t32Offset) * t32Gain;





                AA[1] = 0;
                var v50en = stas.valueA[i][6] & 0x02;
                var v32en = stas.valueA[i][6] & 0x04;
                var faultF = stas.valueA[i][6] & 0x01;
                if(v50en)
                    AA[1] = 3;
                if(v32en)
                    AA[1] = 1;
                if (faultF)
                    AA[1] = 2;
                bufs.valueA.push(AA);
                if ((stas.valueA[i][6] & 0x8000) !== 0)
                    bufs.loadA.push(1);
                else
                    bufs.loadA.push(0);

            }
        }

        if (pageInx === 4) {

            st.meterStatus = {};
            var stas = op.meterStatus;
            var bufs = st.meterStatus;
            bufs.valueStrA = [];
            for (var i = 0; i < 7; i++) {
                var value = stas.valueA[i].input;
                value -= stas.valueA[i].offset;
                value *= stas.valueA[i].scale;
                bufs.valueStrA.push(value.toFixed(stas.valueA[i].fixed));
            }
            gr.syncTmp.stas = st;


            st.sspaStatus = {};
            var stas = op.sspaStatus;
            var bufs = st.sspaStatus;

            var highs = self.md.stas.sspaStatus.limitHighs = [null, null, null, null, null, null, null, null];
            var lows = self.md.stas.sspaStatus.limitLows = [null, null, null, null, null, null, null, null];
            highs[5] = parseInt(gr.paraSet["sspaOutputPowerLimitHigh"]);
            lows[5] = parseInt(gr.paraSet["sspaOutputPowerLimitLow"]);
            highs[6] = parseInt(gr.paraSet["sspaTemperatureLimitHigh"]);
            bufs.limitHighs = highs;
            bufs.limitLows = lows;
            bufs.valueA = [];
            bufs.loadA = [];
            var sspaRfoutGain = KvLib.toNumber(gr.paraSet["sspaRfoutGain"], 1);
            for (var i = 0; i < stas.valueA.length; i++) {
                var AA = [0, 1, 1, 1, 1, 0, 0, 0];
                if ((stas.valueA[i][3] & 0x01) !== 0)
                    AA[1] = 2;
                if ((stas.valueA[i][3] & 0x02) !== 0)
                    AA[2] = 2;
                if ((stas.valueA[i][3] & 0x04) !== 0)
                    AA[3] = 2;
                if ((stas.valueA[i][3] & 0x08) !== 0)
                    AA[4] = 2;
                AA[5] = stas.valueA[i][1] * sspaRfoutGain;//rf out
                AA[6] = stas.valueA[i][2];//rf temp
                bufs.valueA.push(AA);
                if ((stas.valueA[i][3] & 0x8000) !== 0)
                    bufs.loadA.push(1);
                else
                    bufs.loadA.push(0);
            }

        }

        if (pageInx === 5) {
            st.meterStatus = {};
            var stas = op.meterStatus;
            var bufs = st.meterStatus;
            bufs.valueStrA = [];
            for (var i = 0; i < 7; i++) {
                var value = stas.valueA[i].input;
                value -= stas.valueA[i].offset;
                value *= stas.valueA[i].scale;
                bufs.valueStrA.push(value.toFixed(stas.valueA[i].fixed));
            }
        }

        if (pageInx === 6) {
            st.pulseGenStatus = {};
            stas = op.pulseGenStatus;
            bufs = st.pulseGenStatus;
            if (!stas.localRemote_f) {
                bufs.operateMode = "操控模式: 本機";
                bufs.operateModeColor = "#0f0";
                bufs.disStartButton_f = 0;
                if (stas.pulseStart_f) {
                    bufs.startButtonColor = "#cfc";
                    bufs.startButtonText = "停止";
                } else {
                    bufs.startButtonColor = "#ccc";
                    bufs.startButtonText = "開始";
                }
            } else {
                bufs.operateMode = "操控模式: 遙控";
                bufs.operateModeColor = "#ff0";
                bufs.disStartButton_f = 1;
                bufs.startButtonColor = "#ccc";
            }
            if (!stas.localRandomFixed_f) {
                bufs.randomChecked_f = 1;
                bufs.fixedChecked_f = 0;
            } else {
                bufs.randomChecked_f = 0;
                bufs.fixedChecked_f = 1;
            }

            var freq = 290 + stas.freq;
            if (freq % 10)
                bufs.freqStr = "頻率:" + (freq / 100).toFixed(2) + "G";
            else
                bufs.freqStr = "頻率:" + (freq / 100).toFixed(1) + "G";

            var va = st.pulseGenStatus.pulseObjA = [];
            for (var i = 0; i < 30; i++) {
                var dobj = op.pulseGenStatus.pulseObjA[i];
                var bobj = {};
                bobj.checked_f = dobj.enable_f;
                bobj.widthStr = (dobj.width / 10).toFixed(1);
                bobj.dutyStr = (dobj.duty / 10).toFixed(1);
                bobj.timesStr = dobj.times.toFixed(0);
                va.push(bobj);
            }

        }



    }

    systemParaSet(modeInx) {
        var self = this;
        var actionFunc = function (iobj) {
            var keys = Object.keys(iobj.value);
            for (var i = 0; i < keys.length; i++)
                gr.paraSet[keys[i]] = iobj.value[keys[i]];
            gr.serverCallBack = function (valueObj, mes) {
                if (mes.opts.status === "OK") {
                    self.loadParas();
                    var opts;
                    var obj = {};
                    obj["name"] = "loadUserParaMap";
                    obj["type"] = "";
                    obj["opts"] = {};
                    opts = obj["opts"];
                    opts["responseType"] = "response error";
                    opts["userName"] = gr.userName;
                    sv.callServer(JSON.stringify(obj));
                }
            };

            //self.saveParas();
            //return;

            var str = "{\n";
            var keys = Object.keys(gr.paraSet);
            for (var i = 0; i < keys.length; i++) {
                if (i === 0)
                    str += " ";
                else
                    str += ",";
                str += "\"" + keys[i] + "\" : ";
                str += "\"" + gr.paraSet[keys[i]] + "\"\n";
            }
            str += "}\n";
            Test.server_saveStringToFile("response error", "exeCallBackFunc", str, "user-" + gr.userName + "/paraSet.json");
        };



        var paraSet = gr.paraSet;
        var keys = Object.keys(paraSet);
        var setObjs = [];
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i];
            var id = keys[i];
            var strA = name.split("#");
            if (modeInx === 0) {
                if (strA[0] === "pulseGenParaA")
                    continue;
                switch (id) {
                    case "localInputPowerMeterA":
                        name = "[本機輸入功率表 參數]";
                        break;
                    case "remoteInputPowerMeterA":
                        name = "[本機輸入功率表 參數]";
                        break;
                    case "preAmpPowerMeterA":
                        name = "[前置放大器功率表 參數]";
                        break;
                    case "driveAmpPowerMeterA":
                        name = "[驅動放大器功率表 參數]";
                        break;
                    case "cwOutputPowerMeterA":
                        name = "[順向輸出功率表 參數]";
                        break;
                    case "ccwOutputPowerMeterA":
                        name = "[反向輸出功率表 參數]";
                        break;
                    case "attenuaterA":
                        name = "[衰減器表 參數]";
                        break;

                    case "pulseDutyLimitHigh":
                        name = "脈波週期上限(%)";
                        break;
                    case "pulseWidthLimitHigh":
                        name = "脈波寬度上限(us)";
                        break;
                    case "powerReflectLimitHigh":
                        name = "功率反射上限(DB)";
                        break;
                    case "powerSuplyVoltLimitHigh":
                        name = "電源供應器 電壓上限(V)";
                        break;
                    case "powerSuplyVoltLimitLow":
                        name = "電源供應器 電壓下限(V)";
                        break;
                    case "powerSuplyCurrentLimitHigh":
                        name = "電源供應器 電流上限(A)";
                        break;
                    case "powerSuplyTemperatureLimitHigh":
                        name = "電源供應器 溫度上限(°C)";
                        break;
                    case "sspaInputPowerLimitHigh":
                        name = "固態放大器 輸入功率上限(DB)";
                        break;
                    case "sspaInputPowerLimitLow":
                        name = "固態放大器 輸入功率上限(DB)";
                        break;
                    case "sspaOutputPowerLimitHigh":
                        name = "固態放大器 輸出功率下限(DB)";
                        break;
                    case "sspaOutputPowerLimitLow":
                        name = "固態放大器 輸出功率下限(DB)";
                        break;
                    case "sspaTemperatureLimitHigh":
                        name = "固態放大器 溫度上限(°C)";
                        break;
                    case "pulseGenMode":
                        name = "本機脈波模式";
                        break;
                    case "airFlowForceA":
                        name = "[環控氣流強制]";
                        break;
                    case "waterTemperatureForceA":
                        name = "[環控水流溫度強制]";
                        break;
                    case "waterFlowForceA":
                        name = "[環控水流強制]";
                        break;

                }
            }
            if (modeInx === 1) {
                if (strA[0] !== "pulseGenParaA")
                    continue;
                name = "[脈波編號 " + strA[1] + "]";
            }
            var setObj = sys.setOptsSetFix(name, "str");
            setObj.value = paraSet[keys[i]];
            setObj.id = id;
            setObj.textAlign = "left";
            setObj.titleWidth = 400;
            setObj.nameFontSize = "0.6rh";
            setObjs.push(setObj);
        }

        var opts = {};
        opts.title = "系統參數設定";
        opts.pageItems = 12;
        opts.actionFunc = actionFunc;
        opts.tagOn_f = 1;
        opts.setObjs = setObjs;
        var height = 12 * 40 + 100;
        var mod = new Model("", "Md_inputLineBox~sys", opts, {});
        sys.popModel(mod, 1000, height);
        //mac.setBox("系統參數設定", setObjs, 1000, 12, actionFunc);
        return;




    }
    debugMode() {
        var self = this;
        var timeOutPrg = function () {
            sys.mesBox("cr~ERROR", 600, "Response Time Out !!!");
        };
        var obj = {};
        obj.selects = [];
        obj.selects.push("Test Response");
        obj.selects.push("List Uart");
        obj.selects.push("Open Uart0");
        obj.selects.push("Close Uart0");
        obj.yc = 14;
        obj.xc = 2;
        obj.selectEsc_f = 0;
        obj.title = "除錯模式";
        obj.actionFunc = function (iobj) {
            if (iobj.inx === 0) {
                var sobj = {};
                sobj.sonprgName = "Sync";
                sobj.act = "testResponse";
                var jsonStr = JSON.stringify(sobj);
                gr.serverCallBack = function (iiobj, mes) {
                    KvLib.deleteObjsId(self.timeOutObjs, sobj.act);
                    if (iiobj) {
                        console.log(iiobj);
                        if (iiobj.status === "OK") {
                            sys.mesBox("cg~OK", 600, "Test Response OK.");
                        }
                    }
                };
                self.timeOutObjs.push({id: sobj.act, time: 2 * 60, timeOutPrg: timeOutPrg});
                Test.server_sonprg("response error", "exeCallBackFunc", jsonStr);
                return;
            }

            if (iobj.inx === 2) {
                var sobj = {};
                sobj.sonprgName = "Sync";
                sobj.act = "openUart0";
                var jsonStr = JSON.stringify(sobj);
                gr.serverCallBack = function (iiobj, mes) {
                    KvLib.deleteObjsId(self.timeOutObjs, sobj.act);
                    if (iiobj) {
                        console.log(iiobj);
                        if (iiobj.status === "OK") {
                            sys.mesBox("cg~OK", 600, "Open Uart OK.");
                        }
                    }
                };
                self.timeOutObjs.push({id: sobj.act, time: 2 * 60, timeOutPrg: timeOutPrg});
                Test.server_sonprg("response error", "exeCallBackFunc", jsonStr);
                return;
            }
            if (iobj.inx === 1) {
                var sobj = {};
                sobj.sonprgName = "Sync";
                sobj.act = "listUart";
                var jsonStr = JSON.stringify(sobj);
                gr.serverCallBack = function (iiobj, mes) {
                    KvLib.deleteObjsId(self.timeOutObjs, sobj.act);
                    if (iiobj) {
                        if (iiobj.status === "OK") {
                            sys.mesBox("cg~OK", 600, iiobj.message);
                        }
                    }
                };
                self.timeOutObjs.push({id: sobj.act, time: 2 * 60, timeOutPrg: timeOutPrg});
                Test.server_sonprg("response error", "exeCallBackFunc", jsonStr);
                return;
            }



            if (iobj.inx === 3) {
                var sobj = {};
                sobj.sonprgName = "Sync";
                sobj.act = "closeUart0";
                var jsonStr = JSON.stringify(sobj);
                gr.serverCallBack = function (iiobj, mes) {
                    KvLib.deleteObjsId(self.timeOutObjs, sobj.act);
                    if (iiobj) {
                        console.log(iiobj);
                        if (iiobj.status === "OK") {
                            sys.mesBox("cg~OK", 600, "Close Uart OK.");
                        }
                    }
                };
                self.timeOutObjs.push({id: sobj.act, time: 2 * 60, timeOutPrg: timeOutPrg});
                Test.server_sonprg("response error", "exeCallBackFunc", jsonStr);
                return;
            }



        };
        var mod = new Model("", "Md_selectBox", obj, {});
        sys.popModel(mod, 1000, 800);







    }
    constructor() {
        this.tickTimeK = 5;
        this.tickTime = -20;
        this.webSocketConnetCnt = 0;
        this.webSocketConnectCntK = 10;
        this.webSocketConnect_f = 0;


        this.flashTime = 0;
        this.timeActObjs = [];
        this.timeOutObjs = [];

        this.testNames = [];
        this.testNames.push("selfTest#powerSuplyModule#電源模組");
        this.testNames.push("selfTest#fpgaModule#主控模組");
        this.testNames.push("selfTest#ipcModule#IPC模組");
        this.testNames.push("selfTest#laModule#LA模組");
        this.testNames.push("selfTest#rs422Module#RS422模組");
        this.testNames.push("selfTest#fiberModuleA#光纖模組A");
        this.testNames.push("selfTest#fiberModuleB#光纖模組B");
        this.testNames.push("selfTest#fiberModuleC#光纖模組C");
        this.testNames.push("selfTest#fiberModule1#光纖模組1");
        this.testNames.push("selfTest#fiberModule2#光纖模組2");
        this.testNames.push("selfTest#fiberModule3#光纖模組3");
        this.testNames.push("selfTest#fiberModule4#光纖模組4");
        this.testNames.push("selfTest#fiberModule5#光纖模組5");
        this.testNames.push("selfTest#fiberModule6#光纖模組6");
        this.testNames.push("selfTest#fiberModule7#光纖模組7");
        this.testNames.push("selfTest#fiberModule8#光纖模組8");

    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }

    socketPrg() {
        var md = gr.syncMd;
        var self = md.mdClass;
        var op = self.md.opts;
        if (gr.wsok)
            return;
        //gr.ws = new WebSocket('ws://' + gr.webIp + ':' + gr.webSocketPort + '/websocket');
        gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://192.168.0.10:80/websocket');
        gr.wsok = null;
        gr.ws.onopen = function ()
        {
            gr.wsok = gr.ws;
            console.log("WebSocket on Open");
        };
        gr.ws.onclose = function ()
        {
            gr.wsok = null;
            console.log("WebSocket Disconnect...");
        };
        gr.ws.onmessage = function (evt)
        {
           
            var md = gr.syncMd;
            var self = md.mdClass;
            var op = self.md.opts;
            if (self.webSocketConnect_f === 0) {
                self.webSocketConnect_f = 1;
            }
            self.webSocketConnectCnt = 0;
            var received_msg = evt.data;
            var recObj = JSON.parse(received_msg);

            if (recObj.sockValue) {
                var sockObj = JSON.parse(recObj.sockValue);

                if (md.stas.processBox) {
                    if (sockObj.progressValue) {
                        md.stas.processBox.opts.progressValues[0] = sockObj.progressValue;
                    }
                    if (sockObj.progressAction) {
                        md.stas.processBox.opts.actionStr = sockObj.progressAction;
                        if (sockObj.progressAction === "OK") {
                            md.stas.processBox.opts.titleColor = "#8f8";
                            md.stas.processBox.opts.progressValues[0] = 100;
                        }
                        if (sockObj.progressAction === "ERROR") {
                            md.stas.processBox.opts.titleColor = "#f88";
                        }

                    }
                }
            }
            //console.log(received_msg);
            var wsSysObj = JSON.parse(recObj.wsSysJson);



            gr.status1 = "Connected " + (wsSysObj.serialTime % 10);
            if (recObj.act !== "tick~react")
                var yy = 0;
            if (gr.socketRetPrgTbl[recObj.act])
                gr.socketRetPrgTbl[recObj.act](recObj);
            if (recObj.fpgaDatas) {
                var fpgaDatas = JSON.parse(recObj.fpgaDatas);
                op.readyTime = KvLib.toInt(fpgaDatas.readyTime, 9999);
                op.radiation_f = KvLib.toInt(fpgaDatas.radiation_f, 9999);
                op.pulseGenStatus.pulseStart_f = KvLib.toInt(fpgaDatas.pulseStart_f, 0);




                var meterStrA = fpgaDatas.meterAd.split(",");
                for (var i = 0; i < meterStrA.length; i++) {
                    op.meterStatus.valueA[i].input = KvLib.toInt(meterStrA[i]);
                }
                var enviFlagsStrA = fpgaDatas.enviFlags.split(",");
                for (var i = 0; i < enviFlagsStrA.length; i++) {
                    op.enviStatus.valueA[i] = KvLib.toInt(enviFlagsStrA[i]);
                }
                var pulseFlagsStrA = fpgaDatas.pulseFlags.split(",");
                op.pulseStatus.disableErr_f = KvLib.toInt(pulseFlagsStrA[0], 0);
                op.pulseStatus.overDutyErr_f = KvLib.toInt(pulseFlagsStrA[1], 0);
                op.pulseStatus.overPulseWidthErr_f = KvLib.toInt(pulseFlagsStrA[2], 0);
                op.pulseStatus.overReflectErr_f = KvLib.toInt(pulseFlagsStrA[0], 3);
                //===============================
                var strA = fpgaDatas.sspaMoniDatas.split("~");
                for (var i = 0; i < strA.length; i++) {
                    var strB = strA[i].split(",");
                    op.sspaStatus.valueA[i][0] = 0; //rfin
                    op.sspaStatus.valueA[i][1] = KvLib.toInt(strB[0]) + KvLib.toInt(strB[1]) * 256; //rfout
                    op.sspaStatus.valueA[i][2] = KvLib.toInt(strB[2]) + KvLib.toInt(strB[3]) * 256; //temp
                    op.sspaStatus.valueA[i][3] = KvLib.toInt(strB[4]) + KvLib.toInt(strB[5]) * 256; //flag

                    op.powerSuplyStatus.valueA[i][0] = KvLib.toInt(strB[6]) + KvLib.toInt(strB[7]) * 256; //v50v_adi
                    op.powerSuplyStatus.valueA[i][1] = KvLib.toInt(strB[8]) + KvLib.toInt(strB[9]) * 256; //i50v_adi
                    op.powerSuplyStatus.valueA[i][2] = KvLib.toInt(strB[10]) + KvLib.toInt(strB[11]) * 256; //t60v_adi
                    op.powerSuplyStatus.valueA[i][3] = KvLib.toInt(strB[12]) + KvLib.toInt(strB[13]) * 256; //v32v_adi
                    op.powerSuplyStatus.valueA[i][4] = KvLib.toInt(strB[14]) + KvLib.toInt(strB[15]) * 256; //i32v_adi
                    op.powerSuplyStatus.valueA[i][5] = KvLib.toInt(strB[16]) + KvLib.toInt(strB[17]) * 256; //t32v_adi
                    op.powerSuplyStatus.valueA[i][6] = KvLib.toInt(strB[18]) + KvLib.toInt(strB[19]) * 256; //ps flas,b0 fault, b1 p50v_en, b2 p2v_en 



                }




                /*
                 var psVoltStrA = fpgaDatas.psVolt.split(",");
                 for (var i = 0; i < psVoltStrA.length; i++) {
                 op.powerSuplyStatus.valueA[i][0] = KvLib.toInt(psVoltStrA[i]) / 10;
                 }
                 var psCurrentStrA = fpgaDatas.psCurrent.split(",");
                 for (var i = 0; i < psCurrentStrA.length; i++) {
                 op.powerSuplyStatus.valueA[i][1] = KvLib.toInt(psCurrentStrA[i]) / 10;
                 }
                 var psTemperatureStrA = fpgaDatas.psTemperature.split(",");
                 for (var i = 0; i < psTemperatureStrA.length; i++) {
                 op.powerSuplyStatus.valueA[i][2] = KvLib.toInt(psTemperatureStrA[i]);
                 }
                 var psFlagsStrA = fpgaDatas.psFlags.split(",");
                 for (var i = 0; i < psFlagsStrA.length; i++) {
                 op.powerSuplyStatus.errA[i] = KvLib.toInt(psFlagsStrA[i]);
                 }
                 
                 
                 
                 var sspaInputStrA = fpgaDatas.sspaInput.split(",");
                 for (var i = 0; i < sspaInputStrA.length; i++) {
                 op.sspaStatus.valueA[i][0] = KvLib.toInt(sspaInputStrA[i]) / 10;
                 }
                 var sspaOutputStrA = fpgaDatas.sspaOutput.split(",");
                 for (var i = 0; i < sspaOutputStrA.length; i++) {
                 op.sspaStatus.valueA[i][1] = KvLib.toInt(sspaOutputStrA[i]) / 10;
                 }
                 var sspaTemperatureStrA = fpgaDatas.sspaTemperature.split(",");
                 for (var i = 0; i < sspaTemperatureStrA.length; i++) {
                 op.sspaStatus.valueA[i][2] = KvLib.toInt(sspaTemperatureStrA[i]);
                 }
                 var sspaAngleStrA = fpgaDatas.sspaAngle.split(",");
                 for (var i = 0; i < sspaTemperatureStrA.length; i++) {
                 op.sspaStatus.valueA[i][3] = KvLib.toInt(sspaAngleStrA[i]);
                 }
                 
                 */


                var sspaFlagsStrA = fpgaDatas.sspaFlags.split(",");
                for (var i = 0; i < sspaFlagsStrA.length; i++) {
                    op.sspaStatus.errA[i] = KvLib.toInt(sspaFlagsStrA[i]);
                }


                var fiberTxFlagsStrA = fpgaDatas.fiberTxFlags.split(",");
                for (var i = 0; i < op.fiberStatus.txFlags.length; i++) {
                    op.fiberStatus.txFlags[i] = KvLib.toInt(fiberTxFlagsStrA[i], 0);
                }

                var fiberRxFlagsStrA = fpgaDatas.fiberRxFlags.split(",");
                for (var i = 0; i < op.fiberStatus.rxFlags.length; i++) {
                    op.fiberStatus.rxFlags[i] = KvLib.toInt(fiberRxFlagsStrA[i], 0);
                }



                //========================================================
                var testMode = KvLib.toInt(fpgaDatas.testMode, 0);
                var testItem = KvLib.toInt(fpgaDatas.testItem, 0);
                var testResult = KvLib.toInt(fpgaDatas.testResult, 0);
                if (testMode === 1) {
                    if (op.testStatus.testMode !== testMode) {
                        op.testStatus.testMode = testMode;
                        op.testStatus.testStaA[testItem] = 1;
                        KvLib.setObjsIdTime(self.timeActObjs, "selfTest", 3 * 60);
                    }
                }
                if (testMode === 0) {
                    if (op.testStatus.testMode !== testMode) {
                        op.testStatus.testMode = testMode;
                        if (testResult === 0) {
                            op.testStatus.testStaA[testItem] = 0;
                        } else if (testResult === 1) {
                            self.cmdPrg({act: "insertEditor", text: "\n" + " 測試成功"});
                            self.cmdPrg({act: "setMaker", color: "green"});
                            self.cmdPrg({act: "gotoEnd"});
                            op.testStatus.testStaA[testItem] = 2;
                        } else {
                            self.cmdPrg({act: "insertEditor", text: "\n" + " 測試失敗"});
                            self.cmdPrg({act: "setMaker", color: "red"});
                            self.cmdPrg({act: "gotoEnd"});
                            op.testStatus.testStaA[testItem] = 3;
                        }
                        if (!op.testStatus.selfTestAllStart_f) {
                            KvLib.deleteObjsId(self.timeActObjs, "selfTest");
                        } else {
                            KvLib.setObjsIdTime(self.timeActObjs, "selfTest", 1, "done");
                        }

                    }
                }

            }
        };
        return;
    }
    closeSocket() {
        if (gr.wsok) {
            gr.wsok.close();
        }

    }

    sendSocket(obj) {

        var self = this;
        if (!gr.wsok) {
            self.socketPrg();
            return;
        }
        obj.deviceId = "syncUi";
        gr.wsok.send(JSON.stringify(obj));

    }

    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        gr.syncMd = md;

        var mesObj = md.compRefs["message"];
        gr.messageKobj = mesObj;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "gr.status3", "innerText");
        var sta2Obj = md.compRefs["status2"];
        sys.setInputWatch(sta2Obj, "directName", "gr.status2", "innerText");
        var sta1Obj = md.compRefs["status1"];
        sys.setInputWatch(sta1Obj, "directName", "gr.status1", "innerText");

        self.loadParas();

        self.socketPrg();





        if (op.pageInx === 0) {
            var readyTimeObj = md.compRefs["readyTime"];
            if (readyTimeObj)
                sys.setInputWatch(readyTimeObj, "directName", "self.fatherMd.stas.readyTimeStr", "innerText");
            //
            var p0led0Obj = md.compRefs["p0led0"];
            if (p0led0Obj)
                sys.setInputWatch(p0led0Obj, "directName", "self.fatherMd.stas.readyLedInx", "backgroundInx", 1);
            //
            var p0led1Obj = md.compRefs["p0led1"];
            if (p0led1Obj)
                sys.setInputWatch(p0led1Obj, "directName", "self.fatherMd.stas.radiationLed", "backgroundInx", 1);
            //
            return;
        }
        if (op.pageInx === 1) {
            var p1buttonObj0 = md.compRefs["p1button~0"];
            if (p1buttonObj0)
                sys.setInputWatch(p1buttonObj0, "directName", "self.fatherMd.stas.testStatus.selfTestAllStart_f", "disable_f", 1);
            //
            for (var i = 0; i < 16; i++) {
                var p1LedObj = md.compRefs["p1TestLed~" + i];
                var str = "self.fatherMd.stas.testStatus.testLedA[" + i + "]";
                if (p1LedObj)
                    sys.setInputWatch(p1LedObj, "directName", str, "backgroundInx", 1);
            }
        }
        if (op.pageInx === 2) {

            var mdObj = md.modelRefs["localInputPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (0) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (0) + "]", "altColorInx", 1);

            var mdObj = md.modelRefs["remoteInputPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (1) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (1) + "]", "altColorInx", 1);

            var mdObj = md.modelRefs["preAmpPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (2) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (2) + "]", "altColorInx", 1);

            var mdObj = md.modelRefs["driveAmpPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (3) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (3) + "]", "altColorInx", 1);


            var mdObj = md.modelRefs["outCwPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (4) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (4) + "]", "altColorInx", 1);

            var mdObj = md.modelRefs["outCcwPowerValue"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (5) + "]", "innerText");
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.altColorInxA[" + (5) + "]", "altColorInx", 1);

            var ledLineObj = md.modelRefs["airFlowLeft"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.enviStatus.valueA[0]", "backgroundInx", 1);
            }

            var ledLineObj = md.modelRefs["airFlowCenter"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.enviStatus.valueA[1]", "backgroundInx", 1);
            }
            var ledLineObj = md.modelRefs["airFlowRight"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.enviStatus.valueA[2]", "backgroundInx", 1);
            }

            var ledLineObj = md.modelRefs["waterTemperature"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.enviStatus.valueA[3]", "backgroundInx", 1);
            }

            for (var i = 0; i < 11; i++) {
                var ledLineObj = md.modelRefs["waterFlow" + (i + 1)];
                if (ledLineObj) {
                    var ledObj = ledLineObj.compRefs["led"];
                    sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.enviStatus.valueA[" + (i + 4) + "]", "backgroundInx", 1);
                }
            }

            var ledLineObj = md.modelRefs["pulseDisable"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.pulseStatus.disableLed", "backgroundInx", 1);
            }


            var ledLineObj = md.modelRefs["pulseDutyOver"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.pulseStatus.overDutyLed", "backgroundInx", 1);
            }

            var ledLineObj = md.modelRefs["pulseWidthOver"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.pulseStatus.overPulseWidthLed", "backgroundInx", 1);
            }

            var ledLineObj = md.modelRefs["reflectOver"];
            if (ledLineObj) {
                var ledObj = ledLineObj.compRefs["led"];
                sys.setInputWatch(ledObj, "directName", "self.fatherMd.fatherMd.stas.pulseStatus.overReflectLed", "backgroundInx", 1);
            }

            for (var i = 0; i < 36; i++) {
                var ledObj = md.compRefs["powerSuplyLed#" + (i)];
                if (ledObj) {
                    sys.setInputWatch(ledObj, "directName", "self.fatherMd.stas.powerSuplyStatus.errA[" + i + "]", "backgroundInx", 1);
                }
            }

            for (var i = 0; i < 36; i++) {
                var ledObj = md.compRefs["sspaLed#" + (i)];
                if (ledObj) {
                    sys.setInputWatch(ledObj, "directName", "self.fatherMd.stas.sspaStatus.errA[" + i + "]", "backgroundInx", 1);
                }
            }

            for (var i = 0; i < 12; i++) {
                var ledObj = md.compRefs["txFiberLed#" + (i)];
                if (ledObj) {
                    sys.setInputWatch(ledObj, "directName", "self.fatherMd.stas.fiberStatus.txFlags[" + (i) + "]", "backgroundInx", 1);
                }
                var ledObj = md.compRefs["rxFiberLed#" + (i)];
                if (ledObj) {
                    sys.setInputWatch(ledObj, "directName", "self.fatherMd.stas.fiberStatus.rxFlags[" + (i) + "]", "backgroundInx", 1);
                }
            }


            var textObj = md.compRefs["localButton"];
            if (textObj) {
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.localButtonStr", "innerText");
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.localButtonColor", "baseColor", 1);
            }

            var textObj = md.compRefs["powerButton"];
            if (textObj) {
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.powerButtonStr", "innerText");
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.powerButtonColor", "baseColor", 1);
            }

            var textObj = md.compRefs["pulseOnButton"];
            if (textObj) {
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.remote_f", "disable_f");
            }

            var textObj = md.compRefs["pulseOffButton"];
            if (textObj) {
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.remote_f", "disable_f");
            }



            var textObj = md.compRefs["radiationLabel"];
            if (textObj) {
                sys.setInputWatch(textObj, "directName", "self.fatherMd.stas.systemStatus.radiationLabelColor", "baseColor", 1);
            }


        }

        if (op.pageInx === 3) {
            var obj = md.compRefs["voltLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["powerSuplyVoltLimitHigh"]', "innerText");
            var obj = md.compRefs["voltLimitLow"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["powerSuplyVoltLimitLow"]', "innerText");
            var obj = md.compRefs["currentLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["powerSuplyCurrentLimitHigh"]', "innerText");
            var obj = md.compRefs["temprLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["powerSuplyTemperatureLimitHigh"]', "innerText");
            for (var i = 0; i < 36; i++) {
                var mdObj = md.modelRefs["Md_lineCtr#" + i];
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.powerSuplyStatus.valueA[" + (i) + "]", "values", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.powerSuplyStatus.limitLows", "limitLows", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.powerSuplyStatus.limitHighs", "limitHighs", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.powerSuplyStatus.loadA[" + i + "]", "load_f", 1);
            }
        }

        if (op.pageInx === 4) {
            var obj = md.compRefs["inputPowerLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["sspaInputPowerLimitHigh"]', "innerText");
            var obj = md.compRefs["inputPowerLimitLow"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["sspaInputPowerLimitLow"]', "innerText");
            var obj = md.compRefs["outputPowerLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["sspaOutputPowerLimitHigh"]', "innerText");
            var obj = md.compRefs["outputPowerLimitLow"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["sspaOutputPowerLimitLow"]', "innerText");
            var obj = md.compRefs["temprLimitHigh"];
            sys.setInputWatch(obj, "directName", 'gr.paraSet["sspaTemperatureLimitHigh"]', "innerText");


            var mdObj = md.modelRefs["wtOutCw"];
            if (mdObj) {
                var meterObj = mdObj.compRefs["meter"];
                sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (4) + "]", "innerText");
            }
            var mdObj = md.modelRefs["wtOutCcw"];
            if (mdObj) {
                var meterObj = mdObj.compRefs["meter"];
                sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (5) + "]", "innerText");
            }

            for (var i = 0; i < 36; i++) {
                var mdObj = md.modelRefs["Md_lineCtr#" + i];
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.sspaStatus.valueA[" + (i) + "]", "values", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.sspaStatus.limitLows", "limitLows", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.sspaStatus.limitHighs", "limitHighs", 1);
                sys.setInputWatch(mdObj, "directName", "self.fatherMd.stas.sspaStatus.loadA[" + i + "]", "load_f", 1);
            }



        }

        if (op.pageInx === 5) {
            var mdObj = md.modelRefs["wtInLocal"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (0) + "]", "innerText");
            var mdObj = md.modelRefs["wtInRemote"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (1) + "]", "innerText");

            var mdObj = md.modelRefs["wtOutPre"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (2) + "]", "innerText");
            var mdObj = md.modelRefs["wtOutDrive"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (3) + "]", "innerText");

            var mdObj = md.modelRefs["wtOutCw"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (4) + "]", "innerText");
            var mdObj = md.modelRefs["wtOutCcw"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (5) + "]", "innerText");

            var mdObj = md.modelRefs["wtFade"];
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "self.fatherMd.fatherMd.stas.meterStatus.valueStrA[" + (6) + "]", "innerText");



        }

        if (op.pageInx === 6) {
            var cobj = md.compRefs["operateModeButton"];
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.operateMode", "innerText");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.operateModeColor", "baseColor");
            var cobj = md.compRefs["startButton"];
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.disStartButton_f", "disable_f");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.startButtonColor", "baseColor");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.startButtonText", "innerText");
            var cobj = md.compRefs["randomPulseButton"];
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.disStartButton_f", "disable_f");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.randomChecked_f", "checked_f");
            var cobj = md.compRefs["fixedPulseButton"];
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.disStartButton_f", "disable_f");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.fixedChecked_f", "checked_f");
            var cobj = md.compRefs["freqButton"];
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.disStartButton_f", "disable_f");
            sys.setInputWatch(cobj, "directName", "self.fatherMd.stas.pulseGenStatus.freqStr", "innerText");


            for (var i = 0; i < 30; i++) {
                var mobj = md.modelRefs["Md_linePulseGen~" + i];
                var cobj = mobj.compRefs["valueCheck"];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].checked_f", "checked_f");
                }

                var cobj = mobj.compRefs["value~" + 1];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].widthStr", "innerText");
                }
                var cobj = mobj.compRefs["valueButton~" + 1];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].widthStr", "innerText");
                }
                var cobj = mobj.compRefs["value~" + 2];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].dutyStr", "innerText");
                }
                var cobj = mobj.compRefs["valueButton~" + 2];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].dutyStr", "innerText");
                }

                var cobj = mobj.compRefs["value~" + 3];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].timesStr", "innerText");
                }
                var cobj = mobj.compRefs["valueButton~" + 3];
                if (cobj) {
                    sys.setInputWatch(cobj, "directName", "self.fatherMd.fatherMd.stas.pulseGenStatus.pulseObjA[" + i + "].timesStr", "innerText");
                }


            }


        }

    }

    cmdPrg(cmd) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        if (cmd.act === "clearEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.clearEditorMaker(editor);
            editor.getSession().setValue("");
            return;
        }
        if (cmd.act === "insertEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            editor.insert(cmd.text);
            return;
        }
        if (cmd.act === "setMaker") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.setEditorMaker(editor, cmd.color);
            return;
        }

        if (cmd.act === "gotoEnd") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            var row = editor.session.getLength() - 1;
            var column = editor.session.getLine(row).length; // or simply Infinity
            editor.gotoLine(row + 1, column);
        }
    }

    timeOutObjsPrg() {
        var self = this;
        for (var i = 0; i < self.timeOutObjs.length; i++) {
            var tobj = self.timeOutObjs[i];
            if (tobj.time) {
                tobj.time--;
                if (!tobj.time) {
                    tobj.timeOutPrg(self, tobj);
                }
            }
            if (!tobj.time)
                self.timeOutObjs.splice(i, 1);
        }
    }

    timeActObjsPrg() {
        var self = this;
        for (var i = 0; i < self.timeActObjs.length; i++) {
            var tobj = self.timeActObjs[i];
            if (tobj.time) {
                tobj.time--;
                if (!tobj.time) {
                    tobj.timeActPrg(self, tobj);
                    if (!tobj.time)
                        self.timeActObjs.splice(i, 1);
                }
            }
        }
    }

    selfTest_tact(self, tobj) {
        var md = self.md;
        var op = md.opts;

        if (tobj.step === 0) {
            var sockOutobj = {};
            var strA = self.testNames[tobj.inx].split('#');
            sockOutobj.act = strA[0] + "#" + strA[1] + "#" + tobj.inx;
            gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                var str = " 測試開始";
                self.cmdPrg({act: "insertEditor", text: str});
                op.testStatus.testStaA[tobj.inx] = 1;
                console.log(mesObj);
            };
            self.sendSocket(sockOutobj);
            var str = "\n\n" + (tobj.inx + 1) + ". " + strA[2] + "測試";
            self.cmdPrg({act: "insertEditor", text: str});
            tobj.step = 1;
            tobj.time = 3 * 60;
            return;
        }
        if (tobj.step === 1) {
            if (tobj.time !== 0) {

                return;
            }
            if (!tobj.status) {
                op.testStatus.testStaA[tobj.inx] = 3;
                self.printSystemNoAnswer();
            }
            if (op.testStatus.selfTestAllStart_f) {
                tobj.inx += 1;
                tobj.time = 1;
                tobj.step = 0;
                if (tobj.inx >= self.testNames.length) {
                    tobj.time = 0;
                    op.testStatus.selfTestAllStart_f = 0;
                }
            }
            return;
        }
    }

    selfTestAll_tact(self, tobj) {
        var md = self.md;
        var op = md.opts;
        if (tobj.step === 0) {
            tobj.inx = 0;
            var sockOutobj = {};
            var strA = self.testNames[tobj.inx].split('#');
            sockOutobj.act = strA[0] + "#" + strA[1] + "#" + tobj.inx;
            gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                var str = " 測試開始";
                self.cmdPrg({act: "insertEditor", text: str});
                op.testStatus.testStaA[tobj.inx] = 1;
                console.log(mesObj);
            };
            self.sendSocket(sockOutobj);
            var str = "\n\n" + (tobj.inx + 1) + ". " + strA[2] + "測試";
            self.cmdPrg({act: "insertEditor", text: str});
            tobj.step = 1;
            tobj.time = 3 * 60;
            return;
        }

        if (tobj.step === 1) {
            op.testStatus.testStaA[tobj.inx] = 3;
            self.printSystemNoAnswer();
            return;

            tobj.inx += 1;
            tobj.time = 1;
            tobj.step = 0;
            if (tobj.inx >= self.testNames.length) {
                tobj.time = 0;
                op.testStatus.selfTestAllStart_f = 0;
            }



        }


    }
    clearSelfTest() {
        var self = this;
        var op = self.md.opts;
        //
        self.sendSocket({act: "selfTestAllStop"});
        //
        self.cmdPrg({act: "clearEditor"});
        op.testStatus.selfTestAllStart_f = 0;
        KvLib.deleteObjsId(self.timeOutObjs, "selfTestAllStart");
        KvLib.deleteObjsId(self.timeActObjs, "selfTestAll_tact");
        for (var i = 0; i < 20; i++) {
            op.testStatus.testStaA[i] = 0;
        }


    }
    printSystemNoAnswer = function () {
        var self = this;
        var str = "\n系統無回應 !!!";
        self.cmdPrg({act: "insertEditor", text: str});
        self.cmdPrg({act: "setMaker", color: "red"});
        self.cmdPrg({act: "gotoEnd"});
    }

    printInfColor = function (str, color) {
        var self = this;
        self.cmdPrg({act: "insertEditor", text: str});
        self.cmdPrg({act: "setMaker", color: "color"});
        self.cmdPrg({act: "gotoEnd"});
    }

    setTestLed(status, flashTime) {
        if (!status) {
            return 0;
        }
        if (status === 1) {
            if (flashTime > 10)
                return 0;
            else {
                return 3;
            }
            return;
        }
        if (status === 2) {
            return 1;
        }
        if (status === 3) {
            return 2;
        }
    }
    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        //=============================
        var self = this;
        if (++self.tickTime >= self.tickTimeK) {
            self.tickTime = 0;
            var obj = {};
            obj.act = "tick";
            self.sendSocket(obj);
        }

        //=============================
        gr.status3 = ani.dispFs;

        this.flashTime++;
        if (this.flashTime > 20)
            this.flashTime = 0;
        //self.syncConnectTx();
        if (op.emuObj.emuData_f) {
            self.emuPrg();
        }
        self.timeOutObjsPrg();
        self.timeActObjsPrg();
        self.transSyncData();
        return;

    }

    loadParas() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var paraSet = gr.paraSet;
        var nameA = [];
        nameA.push("localInputPowerMeterA");
        nameA.push("remoteInputPowerMeterA");
        nameA.push("preAmpPowerMeterA");
        nameA.push("driveAmpPowerMeterA");
        nameA.push("cwOutputPowerMeterA");
        nameA.push("ccwOutputPowerMeterA");
        nameA.push("attenuaterA");
        for (var i = 0; i < op.meterStatus.valueA.length; i++) {
            var strA = paraSet[nameA[i]].split(",");
            op.meterStatus.valueA[i].offset = KvLib.toInt(strA[0], 0);
            op.meterStatus.valueA[i].scale = KvLib.toNumber(strA[1], 1);
            op.meterStatus.valueA[i].fixed = KvLib.toInt(strA[2], 0);
            op.meterStatus.valueA[i].max = KvLib.toInt(strA[3], 100);
            op.meterStatus.valueA[i].min = KvLib.toInt(strA[4], 0);
        }


        var keys = Object.keys(paraSet);
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i];
            var id = keys[i];
            var strA = name.split("#");
            if (strA[0] !== "pulseGenParaA")
                continue;
            var inx = KvLib.toInt(strA[1], 0);
            var strB = paraSet[name].split(",");
            if (strB.length !== 4)
                continue;
            var ibuf = KvLib.toInt(strB[0], 0);
            op.pulseGenStatus.pulseObjA[inx].enable_f = ibuf;
            var ibuf = KvLib.toInt(strB[1], 100);
            op.pulseGenStatus.pulseObjA[inx].width = ibuf;
            var ibuf = KvLib.toInt(strB[2], 6);
            op.pulseGenStatus.pulseObjA[inx].duty = ibuf;
            var ibuf = KvLib.toInt(strB[3], 1);
            op.pulseGenStatus.pulseObjA[inx].times = ibuf;


        }



        var str = paraSet.localInputPowerMeterA;
        //op.meterStatus.valueA[0].offset = JSON.parse(paraSet["meterOffsetA#" + i]);
        //op.meterStatus.valueA[0].scale = JSON.parse(paraSet["meterScaleA#" + i]);


        /*
         var self = this;
         var md = self.md;
         var op = md.opts;
         var paraSet = us.set.paraSet;
         for (var i = 0; i < op.meterStatus.valueA.length; i++) {
         op.meterStatus.valueA[i].offset = JSON.parse(paraSet["meterOffsetA#" + i]);
         op.meterStatus.valueA[i].scale = JSON.parse(paraSet["meterScaleA#" + i]);
         }
         */
    }

    saveParas(callBack) {
        var str = "{\n";
        var keys = Object.keys(gr.paraSet);
        for (var i = 0; i < keys.length; i++) {
            if (i === 0)
                str += " ";
            else
                str += ",";
            str += "\"" + keys[i] + "\" : ";
            str += "\"" + gr.paraSet[keys[i]] + "\"\n";
        }
        str += "}\n";
        if (callBack)
            Test.server_saveStringToFile("response error", "exeCallBackFunc", str, "user-" + gr.userName + "/paraSet.json");
        else
            Test.server_saveStringToFile("response error", "", str, "user-" + gr.userName + "/paraSet.json");
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
        var opts = {};
        var cname = "c";
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 100;
        opts.ihO.c1 = 9999;
        opts.baseColor = "#222";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("headBar", "c~0");
        lyMap.set("mainBody", "c~1");
        //======================================================================
        self.transSyncData();
        var pageInx = op.pageInx;
        if (pageInx === 0) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.yc = 2;
            opts.ihO = {};
            opts.ihO.c0 = 9999;
            opts.ihO.c1 = 200;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //======================================================================
            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.innerText = "";
            opts.backgroundInx = 0;
            opts.whr = 1.3;
            opts.backgroundImageUrls = ['./systemResource/ncsist1.png'];
            comps[cname] = {name: "", type: "plate~none", opts: opts};


            var cname = lyMap.get("pnMain") + "~1";
            var opts = {};
            opts.xc = 3;
            opts.yc = 2;
            opts.iw = 200;
            opts.xm = 20;
            opts.ym = 0;
            opts.tm = 10;
            opts.bm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnP0a", cname);

            var cname = lyMap.get("pnP0a") + "~0";
            var opts = {};
            opts.backgroundInx = 0;
            comps[cname] = {name: "p0led0", type: "label~led", opts: opts};

            var cname = lyMap.get("pnP0a") + "~1";
            var opts = {};
            opts.innerTextColor = "#aaf";
            opts.fontSize = "0.5rh";
            opts.textShadow = "1px 1px 1px #fff";
            comps[cname] = {name: "readyTime", type: "plate~none", opts: opts};





            var cname = lyMap.get("pnP0a") + "~2";
            var opts = {};
            opts.backgroundInx = 0;
            comps[cname] = {name: "p0led1", type: "label~led", opts: opts};

            var cname = lyMap.get("pnP0a") + "~3";
            var opts = {};
            opts.innerText = "備便";
            opts.innerTextColor = "#aaf";
            opts.fontSize = 0;
            opts.maxByte = 4;
            opts.textShadow = "1px 1px 1px #fff";
            comps[cname] = {name: "p0led0Lb", type: "plate~none", opts: opts};

            var cname = lyMap.get("pnP0a") + "~5";
            var opts = {};
            opts.innerText = "輻射";
            opts.innerTextColor = "#aaf";
            opts.fontSize = 0;
            opts.maxByte = 4;
            opts.textShadow = "1px 1px 1px #fff";
            comps[cname] = {name: "p0led1Lb", type: "plate~none", opts: opts};

        }

        if (pageInx === 1) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.yc = 2;
            opts.ihO = {};
            opts.ihO.c0 = 9999;
            opts.ihO.c1 = 80;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);

            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.xc = 3;
            opts.iwO = {};
            opts.iwO.c0 = 60;
            opts.iwO.c1 = 200;
            opts.iwO.c2 = 9999;
            opts.tm = 10;
            opts.bm = 10;

            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp", cname);

            //======================================================================
            var cname = lyMap.get("pnUp") + "~2";
            var opts = {};
            opts.hideNo_f = 1;
            opts.readOnly_f = 1;
            opts.wrapLine = 100;
            comps[cname] = {name: "editor", type: "editor~sys", opts: opts};


            var cname = lyMap.get("pnUp") + "~0";
            var opts = {};
            opts.xc = 1;
            opts.yc = self.testNames.length;
            opts.ym = 5;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp0", cname);

            for (var i = 0; i < self.testNames.length; i++) {
                var cname = lyMap.get("pnUp0") + "~" + i;
                var opts = {};
                opts.backgroundInx = 0;
                opts.margin = 6;
                comps[cname] = {name: "p1TestLed~" + i, type: "label~led", opts: opts};
            }

            var cname = lyMap.get("pnUp") + "~1";
            var opts = {};
            opts.xc = 1;
            opts.yc = self.testNames.length;
            opts.ym = 5;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            var itemTestClick = function (obj) {
                if (op.testStatus.selfTestAllStart_f)
                    return;
                var name = obj.kvObj.name;
                var strA = name.split("~");
                var inx = parseInt(strA[1]);
                self.timeActObjs.push({id: "selfTest", time: 1, name: name, inx: inx, step: 0, timeActPrg: self.selfTest_tact});
                op.testStatus.testStaA[inx] = 1;

            };
            lyMap.set("pnUp1", cname);
            for (var i = 0; i < self.testNames.length; i++) {
                var cname = lyMap.get("pnUp1") + "~" + i;
                var opts = {};
                opts.innerText = self.testNames[i].split("#")[2];
                opts.clickFunc = itemTestClick;
                comps[cname] = {name: "p1TestBut~" + i, type: "button~sys", opts: opts};
            }


            var cname = lyMap.get("pnMain") + "~1";
            var opts = {};
            opts.xc = 3;
            opts.yc = 1;
            opts.iw = 200;
            opts.xm = 20;
            opts.ym = 0;
            opts.bm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnP1a", cname);
            //==================================================================    
            var cname = lyMap.get("pnP1a") + "~0";
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = "開始測試";
            opts.clickFunc = function () {
                var name = self.testNames[0].split("#")[2];
                var inx = 0;
                self.timeActObjs.push({id: "selfTest", time: 1, name: name, inx: inx, step: 0, timeActPrg: self.selfTest_tact});
                op.testStatus.testStaA[inx] = 1;
                self.cmdPrg({act: "clearEditor"});
                var str = "全系統測試開始";
                str += "\n==========================================";
                self.cmdPrg({act: "insertEditor", text: str});
                for (var i = 0; i < 20; i++) {
                    op.testStatus.testStaA[i] = 0;
                }
                op.testStatus.selfTestAllStart_f = 1;

            };
            comps[cname] = {name: "p1button~0", type: "button~sys", opts: opts};
            //===========
            var cname = lyMap.get("pnP1a") + "~1";
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = "停止測試";
            opts.clickFunc = function () {
                self = md.mdClass;
                self.sendSocket({act: "selfTestAllStop"});
                var str = "\n\n================ 測試停止 ================";
                self.cmdPrg({act: "insertEditor", text: str});
                op.testStatus.selfTestAllStart_f = 0;
                KvLib.deleteObjsId(self.timeActObjs, "selfTest");
                for (var i = 0; i < 20; i++) {
                    if (op.testStatus.testStaA[i] === 1)
                        op.testStatus.testStaA[i] = 0;
                }
            };
            comps[cname] = {name: "p1button~2", type: "button~sys", opts: opts};
            //=====
            var cname = lyMap.get("pnP1a") + "~2";
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = "清除測試";
            opts.clickFunc = function () {
                var self = md.mdClass;
                self.clearSelfTest();
            };
            comps[cname] = {name: "p1button~3", type: "button~sys", opts: opts};

        }


        if (pageInx === 2) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.yc = 3;
            opts.ihO = {};
            opts.ihO.c0 = 9999;
            opts.ihO.c1 = 60;
            opts.ihO.c2 = 24;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //==============================================================================================
            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.yc = 3;
            opts.ihO = {};
            opts.ihO.c0 = "0.2rh";
            opts.ihO.c1 = "0.3rh";
            opts.ihO.c2 = 9999;
            opts.tm = 10;
            opts.bm = 10;
            opts.ym = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp", cname);
            //======================================================================
            if ("wtIn") {
                var cname = lyMap.get("pnUp") + "~0";
                var opts = {};
                opts.xc = 3;
                opts.lm = 10;
                opts.rm = 10;
                opts.xm = 10;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp0", cname);
                //======================================================================
                var cname = lyMap.get("pnUp0") + "~0";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp0a", cname);
                //=======================
                var cname = lyMap.get("pnUp0a") + "~0";
                var opts = {};
                opts.innerText = "輸入功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtInTitle", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp0a") + "~1";
                var opts = {};
                opts.title = "本機";
                opts.unit = "dBm";
                models[cname] = {name: "localInputPowerValue", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp0a") + "~2";
                var opts = {};
                opts.title = "遙控";
                opts.unit = "dBm";
                models[cname] = {name: "remoteInputPowerValue", type: "Md_lineView~sys", opts: opts};
            }
            //======================================================================
            if ("wtOut0") {
                var cname = lyMap.get("pnUp0") + "~1";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp0b", cname);
                //=======================
                var cname = lyMap.get("pnUp0b") + "~0";
                var opts = {};
                opts.innerText = "輸出功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtOutTitle0", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp0b") + "~1";
                var opts = {};
                opts.title = "前置放大器";
                opts.wr = ["0.4rw", 9999, "0.2rw"];
                opts.unit = "dBm";
                models[cname] = {name: "preAmpPowerValue", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp0b") + "~2";
                var opts = {};
                opts.title = "驅動放大器";
                opts.wr = ["0.4rw", 9999, "0.2rw"];
                opts.unit = "dBm";
                models[cname] = {name: "driveAmpPowerValue", type: "Md_lineView~sys", opts: opts};
            }
            //======================================================================
            if ("wtOut1") {
                var cname = lyMap.get("pnUp0") + "~2";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp0c", cname);
                //=======================
                var cname = lyMap.get("pnUp0c") + "~0";
                var opts = {};
                opts.innerText = "輸出功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtOutTitle1", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp0c") + "~1";
                var opts = {};
                opts.title = "順向";
                opts.unit = "dBm";
                models[cname] = {name: "outCwPowerValue", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp0c") + "~2";
                var opts = {};
                opts.title = "反向";
                opts.unit = "dBm";
                models[cname] = {name: "outCcwPowerValue", type: "Md_lineView~sys", opts: opts};
            }
            //==============================================================================================
            var cname = lyMap.get("pnUp") + "~1";
            var opts = {};
            opts.xc = 2;
            opts.iwO = {};
            opts.iwO.c0 = "0.6rw";
            opts.iwO.c1 = 9999;
            opts.lm = 10;
            opts.rm = 10;
            opts.xm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp1", cname);

            var cname = lyMap.get("pnUp") + "~2";
            var opts = {};
            opts.xc = 3;
            opts.lm = 10;
            opts.rm = 10;
            opts.xm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp2", cname);


            if ("envCtr") {
                var cname = lyMap.get("pnUp1") + "~0";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp1U", cname);
                //======================================================================
                var cname = lyMap.get("pnUp1U") + "~1";
                var opts = {};
                opts.yc = 4;
                opts.xc = 7;
                //opts.xm = 10;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp1U1", cname);
                //=======================

                var cname = lyMap.get("pnUp1U") + "~0";
                var opts = {};
                opts.innerText = "環控狀態";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "envCtrTitle", type: "label~namePanel", opts: opts};
                if ("envCtr0") {
                    var cname = lyMap.get("pnUp1U1") + "~0";
                    var opts = {};
                    opts.innerText = "氣流";
                    opts.innerTextColor = "#ffa";
                    comps[cname] = {name: "envCtr0Title", type: "plate~none", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~1";
                    var opts = {};
                    opts.title = "AF左";
                    models[cname] = {name: "airFlowLeft", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~2";
                    var opts = {};
                    opts.title = "AF中";
                    models[cname] = {name: "airFlowCenter", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~3";
                    var opts = {};
                    opts.title = "AF右";
                    models[cname] = {name: "airFlowRight", type: "Md_ledLine~sys", opts: opts};
                }
                if ("envCtr1") {
                    var cname = lyMap.get("pnUp1U1") + "~7";
                    var opts = {};
                    opts.innerText = "水溫";
                    opts.innerTextColor = "#ffa";
                    comps[cname] = {name: "envCtr1Title", type: "plate~none", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~8";
                    var opts = {};
                    opts.title = "WT";
                    models[cname] = {name: "waterTemperature", type: "Md_ledLine~sys", opts: opts};
                    //
                }
                if ("envCtr2") {
                    var cname = lyMap.get("pnUp1U1") + "~14";
                    var opts = {};
                    opts.innerText = "水流";
                    opts.innerTextColor = "#ffa";
                    comps[cname] = {name: "envCtr2Title", type: "plate~none", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~15";
                    var opts = {};
                    opts.title = "WF1";
                    models[cname] = {name: "waterFlow1", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~16";
                    var opts = {};
                    opts.title = "WF2";
                    models[cname] = {name: "waterFlow2", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~17";
                    var opts = {};
                    opts.title = "WF3";
                    models[cname] = {name: "waterFlow3", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~18";
                    var opts = {};
                    opts.title = "WF4";
                    models[cname] = {name: "waterFlow4", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~19";
                    var opts = {};
                    opts.title = "WF5";
                    models[cname] = {name: "waterFlow5", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~20";
                    var opts = {};
                    opts.title = "WF6";
                    models[cname] = {name: "waterFlow6", type: "Md_ledLine~sys", opts: opts};
                    //
                }
                if ("envCtr3") {
                    var cname = lyMap.get("pnUp1U1") + "~21";
                    var opts = {};
                    opts.innerText = "水流";
                    opts.innerTextColor = "#ffa";
                    comps[cname] = {name: "envCtr3Title", type: "plate~none", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~22";
                    var opts = {};
                    opts.title = "WF7";
                    models[cname] = {name: "waterFlow7", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~23";
                    var opts = {};
                    opts.title = "WF8";
                    models[cname] = {name: "waterFlow8", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~24";
                    var opts = {};
                    opts.title = "WF9";
                    models[cname] = {name: "waterFlow9", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~25";
                    var opts = {};
                    opts.title = "WF10";
                    models[cname] = {name: "waterFlow10", type: "Md_ledLine~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnUp1U1") + "~26";
                    var opts = {};
                    opts.title = "WF11";
                    models[cname] = {name: "waterFlow11", type: "Md_ledLine~sys", opts: opts};
                    //
                }

            }
            //======================================================================
            if ("pulseSta") {
                var cname = lyMap.get("pnUp1") + "~1";
                var opts = {};
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                opts.yc = 2;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp1b", cname);

                var cname = lyMap.get("pnUp1b") + "~1";
                var opts = {};
                opts.yc = 4;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp1bD", cname);

                //=======================
                var cname = lyMap.get("pnUp1b") + "~0";
                var opts = {};
                opts.innerText = "脈波狀態";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "pulseStaTitle", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp1bD") + "~0";
                var opts = {};
                opts.title = "脈波除能";
                models[cname] = {name: "pulseDisable", type: "Md_ledLine~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp1bD") + "~1";
                var opts = {};
                opts.title = "週期過大";
                models[cname] = {name: "pulseDutyOver", type: "Md_ledLine~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp1bD") + "~2";
                var opts = {};
                opts.title = "脈波過寬";
                models[cname] = {name: "pulseWidthOver", type: "Md_ledLine~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp1bD") + "~3";
                var opts = {};
                opts.title = "反射過大";
                models[cname] = {name: "reflectOver", type: "Md_ledLine~sys", opts: opts};
                //


            }
            //======================================================================
            if ("powSuply") {
                var cname = lyMap.get("pnUp2") + "~0";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2a", cname);

                var cname = lyMap.get("pnUp2a") + "~1";
                var opts = {};
                opts.xc = 11;
                opts.yc = 6;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2aD", cname);


                //=======================
                var cname = lyMap.get("pnUp2a") + "~0";
                var opts = {};
                opts.innerText = "電源供應器";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "pulseStaTitle", type: "label~namePanel", opts: opts};
                //
                for (var i = 0; i < 10; i++) {
                    var cname = lyMap.get("pnUp2aD") + "~" + (1 + i);
                    var opts = {};
                    opts.innerText = "" + (1 + i);
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "powSuplyTop", type: "plate~none", opts: opts};
                    //
                }
                for (var i = 0; i < 4; i++) {
                    var cname = lyMap.get("pnUp2aD") + "~" + (11 * (i + 1));
                    var opts = {};
                    opts.innerText = "" + (1 + i);
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "powSuplyLeft", type: "plate~none", opts: opts};
                    //
                }
                var ledTbl = [
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                    35, 36, 37, 38, 39, 40, 41, 42,
                    46, 47, 48, 49, 50, 51, 52, 53
                ];
                for (var i = 0; i < 36; i++) {
                    var cname = lyMap.get("pnUp2aD") + "~" + ledTbl[i];
                    var opts = {};
                    opts.backgroundInx = 3;
                    opts.margin = 6;
                    comps[cname] = {name: "powerSuplyLed#" + i, type: "label~led", opts: opts};
                    //
                }



            }

            if ("sspa") {
                var cname = lyMap.get("pnUp2") + "~1";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2b", cname);

                var cname = lyMap.get("pnUp2b") + "~1";
                var opts = {};
                opts.xc = 11;
                opts.yc = 6;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2bD", cname);


                //=======================
                var cname = lyMap.get("pnUp2b") + "~0";
                var opts = {};
                opts.innerText = "固態放大器";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "sspaTitle", type: "label~namePanel", opts: opts};
                //
                for (var i = 0; i < 10; i++) {
                    var cname = lyMap.get("pnUp2bD") + "~" + (1 + i);
                    var opts = {};
                    opts.innerText = "" + (1 + i);
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "sspaTop", type: "plate~none", opts: opts};
                    //
                }
                for (var i = 0; i < 4; i++) {
                    var cname = lyMap.get("pnUp2bD") + "~" + (11 * (i + 1));
                    var opts = {};
                    opts.innerText = "" + (1 + i);
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "sspaLeft", type: "plate~none", opts: opts};
                    //
                }
                var ledTbl = [
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                    35, 36, 37, 38, 39, 40, 41, 42,
                    46, 47, 48, 49, 50, 51, 52, 53
                ];
                for (var i = 0; i < 36; i++) {
                    var cname = lyMap.get("pnUp2bD") + "~" + ledTbl[i];
                    var opts = {};
                    opts.backgroundInx = 3;
                    opts.margin = 6;
                    comps[cname] = {name: "sspaLed#" + i, type: "label~led", opts: opts};
                    //
                }



            }

            var cname = lyMap.get("pnUp2") + "~2";
            var opts = {};
            opts.yc = 2;
            opts.ym = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp2c", cname);



            if ("fiber") {
                var cname = lyMap.get("pnUp2c") + "~1";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c0", cname);

                var cname = lyMap.get("pnUp2c0") + "~1";
                var opts = {};
                opts.xc = 11;
                opts.yc = 3;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c0D", cname);


                //=======================
                var cname = lyMap.get("pnUp2c0") + "~0";
                var opts = {};
                opts.innerText = "SSPA光纖介面";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "fiberTitle", type: "label~namePanel", opts: opts};
                //
                for (var i = 0; i < 10; i++) {
                    var cname = lyMap.get("pnUp2c0D") + "~" + (1 + i);
                    var opts = {};
                    opts.innerText = "" + (1 + i);
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "fiberTop", type: "plate~none", opts: opts};
                    //
                }
                for (var i = 0; i < 2; i++) {
                    var cname = lyMap.get("pnUp2c0D") + "~" + (11 * (i + 1));
                    var opts = {};
                    opts.innerText = "TX";
                    if (i === 1)
                        opts.innerText = "RX";
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "sspaLeft", type: "plate~none", opts: opts};
                    //
                }
                var ledTbl = [
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    23, 24, 25, 26, 27, 28, 29, 30, 31, 32
                ];
                for (var i = 0; i < 20; i++) {
                    var cname = lyMap.get("pnUp2c0D") + "~" + ledTbl[i];
                    var opts = {};
                    opts.backgroundInx = 3;
                    opts.margin = 6;
                    if (i < 10)
                        comps[cname] = {name: "txFiberLed#" + parseInt(i), type: "label~led", opts: opts};
                    else
                        comps[cname] = {name: "rxFiberLed#" + parseInt(i - 10), type: "label~led", opts: opts};
                    //
                }



            }

            var cname = lyMap.get("pnUp2c") + "~0";
            var opts = {};
            opts.xc = 2;
            opts.xm = 10;
            layoutGroups[cname] = {color: "#222"};
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp2c1", cname);

            if ("remote") {
                //=========================================
                var cname = lyMap.get("pnUp2c1") + "~0";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c10", cname);

                var cname = lyMap.get("pnUp2c10") + "~1";
                var opts = {};
                opts.xc = 4;
                opts.yc = 3;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c10D", cname);


                //=======================
                var cname = lyMap.get("pnUp2c10") + "~0";
                var opts = {};
                opts.innerText = "遙控光纖介面";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "remoteTitle", type: "label~namePanel", opts: opts};
                //
                for (var i = 0; i < 2; i++) {
                    var cname = lyMap.get("pnUp2c10D") + "~" + (4 * (i));
                    var opts = {};
                    opts.innerText = "TX";
                    if (i === 1)
                        opts.innerText = "RX";
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "remoteLeft~" + i, type: "plate~none", opts: opts};
                    //
                }
                var ledTbl = [
                    1,
                    5
                ];
                for (var i = 0; i < 2; i++) {
                    var cname = lyMap.get("pnUp2c10D") + "~" + ledTbl[i];
                    var opts = {};
                    opts.backgroundInx = 3;
                    opts.margin = 6;
                    if (i === 0)
                        comps[cname] = {name: "txFiberLed#" + (10), type: "label~led", opts: opts};
                    else
                        comps[cname] = {name: "rxFiberLed#" + (10), type: "label~led", opts: opts};
                    //
                }



            }

            if ("powerMeter") {
                //=========================================
                var cname = lyMap.get("pnUp2c1") + "~1";
                var opts = {};
                opts.yc = 2;
                opts.ihO = {};
                opts.ihO.c0 = 40;
                opts.ihO.c1 = 9999;
                layoutGroups[cname] = {color: "#222"};
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c11", cname);

                var cname = lyMap.get("pnUp2c11") + "~1";
                var opts = {};
                opts.xc = 4;
                opts.yc = 3;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2c11D", cname);


                //=======================
                var cname = lyMap.get("pnUp2c11") + "~0";
                var opts = {};
                opts.innerText = "功率表光纖介面";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "powerMeterTitle", type: "label~namePanel", opts: opts};
                //
                for (var i = 0; i < 2; i++) {
                    var cname = lyMap.get("pnUp2c11D") + "~" + (4 * (i));
                    var opts = {};
                    opts.innerText = "TX";
                    if (i === 1)
                        opts.innerText = "RX";
                    opts.innerTextColor = "#fff";
                    opts.textAlign = "center";
                    comps[cname] = {name: "powerMeterLeft~" + i, type: "plate~none", opts: opts};
                    //
                }
                var ledTbl = [
                    1,
                    5
                ];
                for (var i = 0; i < 2; i++) {
                    var cname = lyMap.get("pnUp2c11D") + "~" + ledTbl[i];
                    var opts = {};
                    opts.backgroundInx = 3;
                    opts.margin = 6;
                    if (i === 0)
                        comps[cname] = {name: "txFiberLed#" + (11), type: "label~led", opts: opts};
                    else
                        comps[cname] = {name: "rxFiberLed#" + (11), type: "label~led", opts: opts};
                    //
                }



            }

            //==============================================================================================
            if ("ctrBar") {
                var cname = lyMap.get("pnMain") + "~1";
                var opts = {};
                opts.xc = 6;
                opts.lm = 10;
                opts.rm = 10;
                opts.xm = 20;
                opts.ym = 0;
                opts.bm = 10;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnP2a", cname);

                var cname = lyMap.get("pnP2a") + "~0";
                var opts = {};
                var opts = {};
                opts.fontSize = "0.5rh";
                opts.innerText = "本地";

                opts.clickFunc = function (iobj) {
                    obj = {};
                    obj.sonprgName = "Sync";
                    if (op.pulseGenStatus.localRemote_f)
                        obj.act = "setLocal";
                    else
                        obj.act = "setRemote";
                    op.pulseGenStatus.localRemote_f ^= 1;
                    var jsonStr = JSON.stringify(obj);
                    Test.server_sonprg("response none", "", jsonStr);

                };
                comps[cname] = {name: "localButton", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnP2a") + "~1";
                var opts = {};
                var opts = {};
                opts.fontSize = "0.5rh";
                opts.innerText = "電源 OFF";
                opts.clickFunc = function (iobj) {
                    op.systemStatus.powerOn_f ^= 1;
                };
                comps[cname] = {name: "powerButton", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnP2a") + "~4";
                var opts = {};
                var opts = {};
                opts.fontSize = "0.5rh";
                opts.innerText = "輻射中";
                opts.textAlign = "center";
                opts.baseColor = "#222";

                opts.clickFunc = function (iobj) {
                    op.systemStatus.radiation_f ^= 1;
                };
                comps[cname] = {name: "radiationLabel", type: "label~sys", opts: opts};



                var cname = lyMap.get("pnP2a") + "~2";
                var opts = {};
                opts.innerText = "啟動脈波";
                opts.fontSize = "0.5rh";


                opts.clickFunc = function (iobj) {
                    //op.pulseGenStatus.pulseStart_f = 1;
                    obj = {};
                    obj.sonprgName = "Sync";
                    obj.act = "pulseGenStart";
                    obj.trigAfterSetTime = gr.paraSet["pgTrigAfterSetTime"];
                    obj.rfAfterTrigTime = gr.paraSet["pgRfAfterTrigTime"];
                    obj.trigAfterRfTime = gr.paraSet["pgTrigAfterRfTime"];
                    obj.pulseGenRandom = "1";
                    var str = "";
                    for (var i = 0; i < 30; i++) {
                        if (i !== 0)
                            str += "~";
                        str += op.pulseGenStatus.pulseObjA[i].enable_f;
                        str += ",";
                        str += op.pulseGenStatus.pulseObjA[i].width;
                        str += ",";
                        str += op.pulseGenStatus.pulseObjA[i].duty;
                        str += ",";
                        str += op.pulseGenStatus.pulseObjA[i].times;
                    }
                    obj.pulseGenValues = str;
                    var jsonStr = JSON.stringify(obj);
                    Test.server_sonprg("response none", "", jsonStr);
                };

                comps[cname] = {name: "pulseOnButton", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnP2a") + "~3";
                var opts = {};
                opts.innerText = "停止脈波";
                opts.fontSize = "0.5rh";


                opts.clickFunc = function (iobj) {
                    //op.pulseGenStatus.pulseStart_f = 0;
                    obj = {};
                    obj.sonprgName = "Sync";
                    obj.act = "pulseGenStop";
                    var jsonStr = JSON.stringify(obj);
                    Test.server_sonprg("response none", "", jsonStr);
                }

                comps[cname] = {name: "pulseOffButton", type: "button~sys", opts: opts};





                var cname = lyMap.get("pnP2a") + "~5";
                var opts = {};
                opts.fontSize = "0.5rh";
                opts.innerText = "進階模式";
                opts.iw = 200;
                opts.wAlign = "right";
                opts.clickFunc = function (iobj) {


                    var systemParaSetPrg = function () {
                        var obj = {};
                        obj.selects = [];
                        obj.selects.push("系統 參數設定");
                        obj.selects.push("脈波產生器 參數設定");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("除錯模式");
                        obj.selects.push("離開");
                        obj.selects.push("重新啟動");

                        obj.yc = 10;
                        obj.xc = 2;
                        obj.selectEsc_f = 0;
                        obj.title = "進階模式";
                        obj.actionFunc = function (iobj) {
                            if (iobj.inx === 0) {
                                self.systemParaSet(0);
                                return;
                            }
                            if (iobj.inx === 1) {
                                self.systemParaSet(1);
                                return;
                            }
                            if (iobj.inx === 9) {
                                self.debugMode();
                                return;
                            }
                            if (iobj.inx === 10) {
                                window.close();
                                return;
                            }
                        };
                        var mod = new Model("", "Md_selectBox", obj, {});
                        sys.popModel(mod, 800, 600);
                    };


                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            if (iiobj.value !== gr.systemParaSetPassword)
                                return;
                            gr.systemParaSetDefaultPassword = gr.systemParaSetPassword;
                            systemParaSetPrg();
                        }
                    };
                    if (gr.systemParaSetPassword !== gr.systemParaSetDefaultPassword) {
                        var setObj = sys.getOptsSet("str", "");
                        setObj.name = "輸入密碼";
                        setObj.value = "";
                        mac.numpad(setObj, retFunc);
                        return;
                    }
                    systemParaSetPrg();
                };
                comps[cname] = {name: "p2EngBut", type: "button~sys", opts: opts};
            }

            var cname = lyMap.get("pnMain") + "~" + 2;
            mac.setFootBar(layouts, lyMap, comps, cname);


        }

        if (pageInx === 3) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 2;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 150;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //==============================================================================================
            if ("linePanel") {


                var lineAction = function (iobj) {
                    console.log(iobj);
                    obj = {};
                    obj.sonprgName = "Sync";
                    obj.act = "powerSuplyOnOff";
                    obj.index = KvLib.toInt(iobj.indexStr, 0);
                    var jsonStr = JSON.stringify(obj);
                    Test.server_sonprg("response none", "", jsonStr);
                };


                var setObj = {};
                //setObj.wr = [60, 40, 100, 100, 100, 100, 100, 100, 60, 60, 9999];
                setObj.wr = ["0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", 9999, 0];
                setObj.heads = ["NO", "", "V(50V)", "I(50V)", "T(50V)", "V(32V)", "I(32V)", "T(32V)", "", ""];
                setObj.headFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
                setObj.valueFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
                if (op.viewMode_f)
                    setObj.itemTypes = ["label", "led", "gressBar", "gressBar", "gressBar", "gressBar", "gressBar", "gressBar", "button", "button"];
                else
                    setObj.itemTypes = ["label", "led", "value", "value", "value", "value", "value", "value", "button", "button"];
                setObj.limitLows = [null, null, null, null, null, null, null, null, null, null];
                setObj.limitHighs = [null, null, null, null, null, null, null, null, null, null];
                setObj.gressBarMaxes = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                setObj.gressBarMins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setObj.initColors = [null, 0, "#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc", null, null];
                setObj.loadColors = [null, 1, "#0f0", "#0f0", "#0f0", "#0f0", "#0f0", "#0f0", null, null];
                setObj.lowColors = [null, 2, "#f00", "#f00", "#f00", "#f00", "#f00", "#f00", null, null];
                setObj.highColors = [null, 2, "#f00", "#f00", "#f00", "#f00", "#f00", "#f00", null, null];


                setObj.fixeds = [0, 0, 1, 1, 0, 1, 1, 0, 0, 0];
                setObj.values = [0, 0, 0, 0, 0, 0, 0, 0, "ON/OFF", "OFF"];

                var cname = lyMap.get("pnMain") + "~0";
                var opts = {};
                opts.yc = 19;
                opts.xc = 1;
                opts.xm = 10;
                opts.ym = 2;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainL", cname);
                //==============================================================================================
                var cname = lyMap.get("pnMainL") + "~" + (0);
                var opts = {};
                KvLib.deepCoverObject(opts, setObj);
                opts.head_f = 1;
                models[cname] = {name: "head~0", type: "Md_lineCtr~sys", opts: opts};



                for (var i = 0; i < 18; i++) {
                    var cname = lyMap.get("pnMainL") + "~" + (1 + i);
                    var opts = {};
                    KvLib.deepCoverObject(opts, setObj);
                    if (i < 2) {
                        if (i === 0)
                            opts.values[0] = "1-1";
                        else
                            opts.values[0] = "1-2";
                    } else {
                        var j = i - 2;
                        var xx = ((j / 4) | 0) + 2;
                        var yy = (j % 4) + 1;
                        opts.values[0] = xx + "-" + yy;
                    }
                    opts.actionFunc = lineAction;
                    models[cname] = {name: "Md_lineCtr#" + i, type: "Md_lineCtr~sys", opts: opts};
                }


                /*
                 var cname = lyMap.get("pnMain") + "~0";
                 var opts = {};
                 opts.yc = 19;
                 opts.xc = 2;
                 opts.xm = 10;
                 opts.ym = 2;
                 opts.margin = 4;
                 layouts[cname] = {name: cname, type: "base", opts: opts};
                 lyMap.set("pnMainL", cname);
                 //==============================================================================================
                 var cname = lyMap.get("pnMainL") + "~" + (0);
                 var opts = {};
                 opts.head_f = 1;
                 opts.heads = ["編號", "電壓 V", "電流 A", "溫度 °C", "重置"];
                 opts.color = "#000";
                 models[cname] = {name: "head~0", type: "Md_linePowSup~sys", opts: opts};
                 
                 var cname = lyMap.get("pnMainL") + "~" + (1);
                 var opts = {};
                 opts.head_f = 1;
                 opts.heads = ["編號", "電壓 V", "電流 A", "溫度 °C", "重置"];
                 opts.color = "#000";
                 models[cname] = {name: "head~1", type: "Md_linePowSup~sys", opts: opts};
                 
                 
                 for (var i = 0; i < 36; i++) {
                 var cname = lyMap.get("pnMainL") + "~" + (2 + i);
                 var opts = {};
                 if (i < 2) {
                 if (i === 0)
                 opts.title = "1-1";
                 else
                 opts.title = "1-2";
                 } else {
                 var j = i - 2;
                 var xx = ((j / 4) | 0) + 2;
                 var yy = (j % 4) + 1;
                 opts.title = xx + "-" + yy;
                 }
                 if ((xx + 1) % 2)
                 opts.color = "#000";
                 opts.viewMode_f = op.viewMode_f;
                 opts.fixeds = [1, 1, 0];
                 opts.maxes = [15, 10, 125];
                 opts.limitLows = op.powerSuplyStatus.limitLows;
                 opts.limitHighs = op.powerSuplyStatus.limitHighs;
                 opts.values = [];
                 opts.values.push(op.powerSuplyStatus.valueA[i][0]);
                 opts.values.push(op.powerSuplyStatus.valueA[i][1]);
                 opts.values.push(op.powerSuplyStatus.valueA[i][2]);
                 opts.load_f = op.powerSuplyStatus.load_f;
                 opts.resetButton_f = 1;
                 models[cname] = {name: "Md_linePowSup#" + i, type: "Md_linePowSup~sys", opts: opts};
                 }
                 */
            }
            if ("ctrBar") {
                var cname = lyMap.get("pnMain") + "~1";
                var opts = {};
                opts.yc = 16;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainR", cname);
                //==============================================================================================
                var cname = lyMap.get("pnMainR") + "~1";
                var opts = {};
                opts.innerText = "電壓上限";
                opts.baseColor = "#bbd";
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "voltUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~2";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";

                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["powerSuplyVoltLimitHigh"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "電壓上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "voltLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~4";
                var opts = {};
                opts.innerText = "電壓下限";
                opts.baseColor = "#bbd";
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "voltDownTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~5";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";

                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["powerSuplyVoltLimitLow"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "電壓下限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "voltLimitLow", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~7";
                var opts = {};
                opts.innerText = "電流上限";
                opts.baseColor = "#bbd";
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "currentUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~8";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["powerSuplyCurrentLimitHigh"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "電流上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "currentLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~10";
                var opts = {};
                opts.innerText = "溫度上限";
                opts.baseColor = "#bbd";
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "temprUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~11";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["powerSuplyTemperatureLimitHigh"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "溫度上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "temprLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~14";
                var opts = {};
                opts.innerText = "工程模式";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function (event) {
                    op.viewMode_f ^= 1;
                    md.reCreate();
                };
                comps[cname] = {name: "temprUpValue", type: "button~sys", opts: opts};
            }

        }

        if (pageInx === 4) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 2;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 150;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);

            var lineAction = function (iobj) {
                console.log(iobj);
                if (iobj.name === "set") {
                    opts = {};
                    opts.title = iobj.text + " 相位角設定";
                    var mod = new Model("", "Md_angleSetBox", opts, {});
                    sys.popModel(mod, 1000, 600);

                }
            };
            //==============================================================================================
            if ("linePanel") {
                if (!op.engMode_f) {
                    var setObj = {};
                    setObj.wr = [9999, 30, 30, 30, 30, 90, 90, 60];
                    setObj.heads = ["編號", "OD", "OW", "OT", "OR", "輸出功率", "溫度", "Reset"];
                    setObj.headFontSizes = ["0.5rh", "0.4rh", "0.4rh", "0.4rh", "0.4rh", "0.4rh", "0.4rh", "0.5rh"];
                    setObj.valueFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
                    if (op.viewMode_f)
                        setObj.itemTypes = ["label", "led", "led", "led", "led", "gressBar", "gressBar", "button"];
                    else
                        setObj.itemTypes = ["label", "led", "led", "led", "led", "value", "value", "button"];
                    setObj.limitLows = [null, null, null, null, null, null, null, null];
                    setObj.limitHighs = [null, null, null, null, null, null, null, null];
                    setObj.gressBarMaxes = [100, 0, 0, 0, 0, 100, 100, 100];
                    setObj.gressBarMins = [0, 0, 0, 0, 0, 0, 0, 0];
                    setObj.initColors = [null, 0, 0, 0, 0, "#fff", "#fff", null];
                    setObj.loadColors = [null, 1, 1, 1, 1, "#0f0", "#0f0", null];
                    setObj.lowColors = [null, 2, 2, 2, 2, "#ff0", "#ff0", null];
                    setObj.highColors = [null, 3, 3, 3, 3, "#f00", "#f00", null];
                    setObj.fixeds = [0, 0, 0, 0, 0, 1, 0, 0];
                    setObj.values = ["1-1", 0, 0, 0, 0, 0, 0, "Reset"];

                    var cname = lyMap.get("pnMain") + "~0";
                    var opts = {};
                    opts.yc = 19;
                    opts.xc = 2;
                    opts.xm = 10;
                    opts.ym = 2;
                    opts.margin = 4;
                    layouts[cname] = {name: cname, type: "base", opts: opts};
                    lyMap.set("pnMainL", cname);
                    //==============================================================================================
                    var cname = lyMap.get("pnMainL") + "~" + (0);
                    var opts = {};
                    KvLib.deepCoverObject(opts, setObj);
                    opts.head_f = 1;
                    models[cname] = {name: "head~0", type: "Md_lineCtr~sys", opts: opts};

                    var cname = lyMap.get("pnMainL") + "~" + (1);
                    var opts = {};
                    KvLib.deepCoverObject(opts, setObj);
                    opts.head_f = 1;
                    models[cname] = {name: "head~1", type: "Md_lineCtr~sys", opts: opts};


                    for (var i = 0; i < 36; i++) {
                        var cname = lyMap.get("pnMainL") + "~" + (2 + i);
                        var opts = {};
                        KvLib.deepCoverObject(opts, setObj);
                        if (i < 2) {
                            if (i === 0)
                                opts.values[1] = "1-1";
                            else
                                opts.values[1] = "1-2";
                        } else {
                            var j = i - 2;
                            var xx = ((j / 4) | 0) + 2;
                            var yy = (j % 4) + 1;
                            opts.values[1] = xx + "-" + yy;
                        }
                        opts.actionFunc = lineAction;
                        models[cname] = {name: "Md_lineCtr#" + i, type: "Md_lineCtr~sys", opts: opts};
                    }
                } else {
                    var cname = lyMap.get("pnMain") + "~0";
                    var opts = {};
                    opts.yc = 2;
                    opts.ihO = {};
                    opts.ihO.c0 = 60;
                    opts.ihO.c1 = 9999;
                    layouts[cname] = {name: cname, type: "base", opts: opts};
                    lyMap.set("pnMainUp", cname);


                    var cname = lyMap.get("pnMainUp") + "~0";
                    var opts = {};
                    opts.xc = 2;
                    opts.xm = 10;
                    opts.ym = 2;
                    opts.margin = 4;
                    layouts[cname] = {name: cname, type: "base", opts: opts};
                    lyMap.set("pnMainUp0", cname);



                    var cname = lyMap.get("pnMainUp0") + "~0";
                    var opts = {};
                    opts.title = "順向輸出功率";
                    opts.unit = "dBm";
                    models[cname] = {name: "wtOutCw", type: "Md_lineView~sys", opts: opts};
                    //
                    var cname = lyMap.get("pnMainUp0") + "~1";
                    var opts = {};
                    opts.title = "反向輸出功率";
                    opts.unit = "dBm";
                    models[cname] = {name: "wtOutCcw", type: "Md_lineView~sys", opts: opts};




                    var cname = lyMap.get("pnMainUp") + "~1";
                    var opts = {};
                    opts.yc = 19;
                    opts.xc = 2;
                    opts.xm = 10;
                    opts.ym = 2;
                    opts.margin = 4;
                    layouts[cname] = {name: cname, type: "base", opts: opts};
                    lyMap.set("pnMainL", cname);





                    //==============================================================================================
                    var cname = lyMap.get("pnMainL") + "~" + (0);
                    var opts = {};
                    opts.head_f = 1;
                    opts.heads = ["編號", "輸入功率 dBm", "輸出功率 dBm", "溫度 °C", "相位角"];
                    opts.color = "#000";
                    models[cname] = {name: "head~0", type: "Md_linePowSup~sys", opts: opts};

                    var cname = lyMap.get("pnMainL") + "~" + (1);
                    var opts = {};
                    opts.head_f = 1;
                    opts.heads = ["編號", "輸入功率 dBm", "輸出功率 dBm", "溫度 °C", "相位角"];
                    opts.color = "#000";

                    models[cname] = {name: "head~1", type: "Md_linePowSup~sys", opts: opts};


                    for (var i = 0; i < 36; i++) {
                        var cname = lyMap.get("pnMainL") + "~" + (2 + i);
                        var opts = {};
                        if (i < 2) {
                            if (i === 0)
                                opts.title = "1-1";
                            else
                                opts.title = "1-2";
                        } else {
                            var j = i - 2;
                            var xx = ((j / 4) | 0) + 2;
                            var yy = (j % 4) + 1;
                            opts.title = xx + "-" + yy;
                        }
                        if ((xx + 1) % 2)
                            opts.color = "#000";
                        opts.viewMode_f = op.viewMode_f;
                        opts.fixeds = [1, 1, 0];
                        opts.values = [];
                        opts.values.push(op.sspaStatus.valueA[i][0]);
                        opts.values.push(op.sspaStatus.valueA[i][1]);
                        opts.values.push(op.sspaStatus.valueA[i][2]);
                        opts.values.push(0);

                        opts.load_f = op.sspaStatus.load_f;
                        opts.limitLows = op.sspaStatus.limitLows;
                        opts.limitHighs = op.sspaStatus.limitHighs;
                        opts.maxes = [30.0, 100, 150];
                        opts.resetButton_f = 0;
                        opts.setButton_f = 1;
                        opts.actionFunc = lineAction;
                        models[cname] = {name: "Md_linePowSup#" + i, type: "Md_linePowSup~sys", opts: opts};
                    }


                }
            }
            if ("ctrBar") {
                var cname = lyMap.get("pnMain") + "~1";
                var opts = {};
                opts.yc = 17;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainR", cname);
                //==============================================================================================
                var cname = lyMap.get("pnMainR") + "~1";
                var opts = {};
                opts.innerText = "輸入功率上限";
                opts.baseColor = "#bbd";
                opts.maxByte = 10;
                opts.fontSize = 0;
                comps[cname] = {name: "inputPowertUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~2";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["sspaInputPowerLimitHigh"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "輸入功率上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    setObj.fixed = 1;
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "inputPowerLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~3";
                var opts = {};
                opts.innerText = "輸入功率下限";
                opts.baseColor = "#bbd";
                opts.maxByte = 10;
                opts.fontSize = 0;
                comps[cname] = {name: "inputPowerDownTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~4";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["sspaInputPowerLimitLow"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "輸入功率下限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "inputPowerLimitLow", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~5";
                var opts = {};
                opts.innerText = "輸出功率上限";
                opts.baseColor = "#bbd";
                opts.maxByte = 10;
                opts.fontSize = 0;
                comps[cname] = {name: "outputPowertUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~6";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["sspaOutputPowerLimitHigh"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "輸出功率上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "outputPowerLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~7";
                var opts = {};
                opts.innerText = "輸出功率下限";
                opts.baseColor = "#bbd";
                opts.maxByte = 10;
                opts.fontSize = 0;
                comps[cname] = {name: "outputPowerDownTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~8";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["sspaOutputPowerLimitLow"] = iiobj.value;
                            self.saveParas();
                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "輸出功率下限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };
                comps[cname] = {name: "outputPowerLimitLow", type: "button~sys", opts: opts};






                var cname = lyMap.get("pnMainR") + "~9";
                var opts = {};
                opts.innerText = "溫度上限";
                opts.baseColor = "#bbd";
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "temprUpTitle", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~10";
                var opts = {};
                opts.innerText = "";
                opts.fontSize = "0.7rh";
                opts.clickFunc = function (iobj) {
                    var retFunc = function (iiobj) {
                        if (iiobj.act === "keypadEnter") {
                            gr.paraSet["sspaTemperatureLimitHigh"] = iiobj.value;
                            self.saveParas();

                        }
                    };
                    var setObj = sys.getOptsSet("float", "");
                    setObj.name = "溫度上限";
                    setObj.value = parseFloat(iobj.kvObj.opts.innerText);
                    mac.numpad(setObj, retFunc);
                };

                comps[cname] = {name: "temprLimitHigh", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~16";
                var opts = {};
                opts.innerText = "顯示模式";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function (event) {
                    op.viewMode_f ^= 1;
                    md.reCreate();
                };
                comps[cname] = {name: "temprUpValue", type: "button~sys", opts: opts};


                var cname = lyMap.get("pnMainR") + "~15";
                var opts = {};
                opts.innerText = "顯示模式";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function (event) {
                    op.viewMode_f ^= 1;
                    md.reCreate();
                };
                comps[cname] = {name: "temprUpValue", type: "button~sys", opts: opts};


                var cname = lyMap.get("pnMainR") + "~16";
                var opts = {};
                opts.innerText = "工程模式";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function (event) {
                    op.engMode_f ^= 1;
                    op.viewMode_f = 1;
                    md.reCreate();
                };
                comps[cname] = {name: "temprUpValue", type: "button~sys", opts: opts};
            }

        }

        if (pageInx === 5) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.yc = 3;
            opts.ihO = {};
            opts.ihO.c0 = "0.5rh";
            opts.ihO.c1 = 9999;
            opts.ihO.c2 = 60;
            opts.ym = 6
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //==============================================================================================
            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.yc = 2;
            opts.xc = 2;
            opts.tm = 10;
            opts.bm = 10;
            opts.ym = 10;
            opts.xm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnUp", cname);
            //======================================================================
            if ("wtIn") {
                var cname = lyMap.get("pnUp") + "~0";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp0", cname);
                //=======================
                var cname = lyMap.get("pnUp0") + "~0";
                var opts = {};
                opts.innerText = "輸入功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtInTitle", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp0") + "~1";
                var opts = {};
                opts.title = "本機";
                opts.unit = "dBm";
                models[cname] = {name: "wtInLocal", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp0") + "~2";
                var opts = {};
                opts.title = "遙控";
                opts.unit = "dBm";
                models[cname] = {name: "wtInRemote", type: "Md_lineView~sys", opts: opts};
            }
            //======================================================================
            if ("wtOut0") {
                var cname = lyMap.get("pnUp") + "~1";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp1", cname);
                //=======================
                var cname = lyMap.get("pnUp1") + "~0";
                var opts = {};
                opts.innerText = "輸出功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtOutTitle0", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp1") + "~1";
                var opts = {};
                opts.title = "前置放大器";
                opts.wr = ["0.4rw", 9999, "0.2rw"];
                opts.unit = "dBm";
                models[cname] = {name: "wtOutPre", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp1") + "~2";
                var opts = {};
                opts.title = "驅動放大器";
                opts.wr = ["0.4rw", 9999, "0.2rw"];
                opts.unit = "dBm";
                models[cname] = {name: "wtOutDrive", type: "Md_lineView~sys", opts: opts};
            }
            //======================================================================
            if ("wtOut1") {
                var cname = lyMap.get("pnUp") + "~2";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp2", cname);
                //=======================
                var cname = lyMap.get("pnUp2") + "~0";
                var opts = {};
                opts.innerText = "輸出功率";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtOutTitle1", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp2") + "~1";
                var opts = {};
                opts.title = "順向";
                opts.unit = "dBm";
                models[cname] = {name: "wtOutCw", type: "Md_lineView~sys", opts: opts};
                //
                var cname = lyMap.get("pnUp2") + "~2";
                var opts = {};
                opts.title = "反向";
                opts.unit = "dBm";
                models[cname] = {name: "wtOutCcw", type: "Md_lineView~sys", opts: opts};
            }
            //==============================================================================================
            if ("wtFade") {
                var cname = lyMap.get("pnUp") + "~3";
                var opts = {};
                opts.yc = 3;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnUp3", cname);
                //=======================
                var cname = lyMap.get("pnUp3") + "~0";
                var opts = {};
                opts.innerText = "衰減器";
                opts.baseColor = "#bbd";
                comps[cname] = {name: "wtFadeTitle", type: "label~namePanel", opts: opts};
                //
                var cname = lyMap.get("pnUp3") + "~1";
                var opts = {};
                opts.title = "衰減量";
                opts.unit = "dBm";
                models[cname] = {name: "wtFade", type: "Md_lineView~sys", opts: opts};
                //

                if (op.viewMode_f) {
                    var cname = lyMap.get("pnUp3") + "~2";
                    var opts = {};
                    opts.xc = 2;
                    opts.xm = 10;
                    opts.lm = 10;
                    opts.rm = 10;
                    opts.tm = 2;

                    layouts[cname] = {name: cname, type: "base", opts: opts};
                    lyMap.set("pnUp32", cname);
                    var cname = lyMap.get("pnUp32") + "~0";
                    var opts = {};
                    opts.title = '<i class="material-icons">&#xe147;</i>';
                    opts.actionFunc = function (event) {
                        var vobj = op.meterStatus.valueA[6];
                        if (vobj.input < vobj.max)
                            vobj.input++;
                    };
                    models[cname] = {name: "upButton", type: "Md_pushButton", opts: opts};
                    //
                    var cname = lyMap.get("pnUp32") + "~1";
                    var opts = {};
                    opts.title = '<i class="material-icons">&#xe15c;</i>';
                    opts.actionFunc = function (event) {
                        var vobj = op.meterStatus.valueA[6];
                        if (vobj.input > vobj.min)
                            vobj.input--;
                    };
                    models[cname] = {name: "upButton", type: "Md_pushButton", opts: opts};
                }
                //



                //




            }
            //==============================================================================================
            if (op.viewMode_f) {
                var cname = lyMap.get("pnMain") + "~1";
                var opts = {};
                var vobjs = opts.valueObjs = [];
                for (var i = 0; i < 6; i++) {
                    var obj = {};
                    obj.name = op.meterStatus.valueA[i].name;
                    obj.id = op.meterStatus.valueA[i].id;
                    obj.offset = op.meterStatus.valueA[i].offset;
                    obj.scale = op.meterStatus.valueA[i].scale;
                    obj.input = op.meterStatus.valueA[i].input;
                    obj.output = op.meterStatus.valueA[i].output;
                    obj.fixeds = [0, 2, 0, op.meterStatus.valueA[i].fixed];
                    obj.min = [null, null, null, null];
                    obj.max = [null, null, null, null];
                    vobjs.push(obj);
                }
                opts.rowCnt = 6;
                opts.actionFunc = function (iobj) {
                };
                models[cname] = {name: "vsetPanel", type: "Md_vsetPanel~sys", opts: opts};
            }

            //==============================================================================================

            if ("ctrBar") {
                var cname = lyMap.get("pnMain") + "~2";
                var opts = {};
                opts.xc = 3;
                opts.lm = 10;
                opts.rm = 10;
                opts.xm = 20;
                opts.ym = 0;
                opts.bm = 10;
                opts.iwO = {};
                opts.iwO.c0 = 9999;
                opts.iwO.c1 = 200;
                opts.iwO.c2 = 200;


                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnP2a", cname);


                if (!op.viewMode_f) {
                    var cname = lyMap.get("pnP2a") + "~2";
                    var opts = {};
                    opts.fontSize = "0.5rh";
                    opts.innerText = "工程模式";
                    opts.clickFunc = function (event) {
                        op.viewMode_f ^= 1;
                        md.reCreate();
                    };
                    comps[cname] = {name: "p2EngBut", type: "button~sys", opts: opts};
                } else {
                    var loadSetToOpts = function () {
                        var setMd = md.modelRefs["vsetPanel"];
                        for (var i = 0; i < setMd.opts.valueObjs.length; i++) {
                            var vobj = setMd.opts.valueObjs[i];
                            op.meterStatus.valueA[i].offset = vobj.offset;
                            op.meterStatus.valueA[i].scale = vobj.scale;
                        }
                        self.saveParas();
                    };
                    var cname = lyMap.get("pnP2a") + "~1";
                    var opts = {};
                    opts.fontSize = "0.5rh";
                    opts.innerText = "SAVE";
                    opts.clickFunc = function (event) {
                        loadSetToOpts();
                        op.viewMode_f ^= 1;
                        md.reCreate();
                    };
                    comps[cname] = {name: "p2SaveBut", type: "button~sys", opts: opts};

                    var cname = lyMap.get("pnP2a") + "~2";
                    var opts = {};
                    opts.fontSize = "0.5rh";
                    opts.innerText = "ESC";
                    opts.clickFunc = function (event) {
                        var setMd = md.modelRefs["vsetPanel"];
                        var yesFunc = function (iobj) {
                            if (iobj.buttonName === "YES") {
                                loadSetToOpts();
                                self.saveParas();
                            }
                        };
                        if (setMd.opts.dataChanged_f)
                            sys.mesBox("cy~Warnning", 600, "Datas Have Changed. Do You Want To Save It?", ["YES", "NO"], yesFunc);
                        op.viewMode_f ^= 1;
                        md.reCreate();
                    };
                    comps[cname] = {name: "p2EscBut", type: "button~sys", opts: opts};
                }
            }

        }

        if (pageInx === 6) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 2;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 160;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //==============================================================================================
            if ("linePanel") {
                var cname = lyMap.get("pnMain") + "~0";
                var opts = {};
                opts.yc = 16;
                opts.xc = 2;
                opts.xm = 10;
                opts.ym = 2;
                opts.margin = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainL", cname);
                //==============================================================================================
                var cname = lyMap.get("pnMainL") + "~" + (0);
                var opts = {};
                opts.head_f = 1;
                opts.heads = ['<i class="gf">&#xe5ca</i>', "波寬(uS)", "責任週期", "次數"];
                models[cname] = {name: "head~0", type: "Md_linePulseGen~sys", opts: opts};

                var cname = lyMap.get("pnMainL") + "~" + (1);
                var opts = {};
                opts.head_f = 1;
                opts.heads = ['<i class="gf">&#xe5ca</i>', "波寬(uS)", "責任週期", "次數"];

                models[cname] = {name: "head~1", type: "Md_linePulseGen~sys", opts: opts};


                var actionFunc = function (iobj) {
                    if (iobj.act === "valueChange") {
                        var strA = iobj.name.split("~");
                        var yInx = parseInt(strA[0]);
                        var xInx = parseInt(strA[1]);
                        var value = KvLib.parseNumber(iobj.valueStr);
                        var va = op.pulseGenStatus.pulseObjA[yInx];
                        if (xInx === 0)
                            va.enable_f = value;
                        if (xInx === 1)
                            va.width = value * 10;
                        if (xInx === 2)
                            va.duty = value * 10;
                        if (xInx === 3)
                            va.times = value;
                    }

                };



                for (var i = 0; i < 30; i++) {
                    var cname = lyMap.get("pnMainL") + "~" + (i + 2);
                    var opts = {};
                    var enable_f = op.pulseGenStatus.pulseObjA[i].enable_f;
                    var width = op.pulseGenStatus.pulseObjA[i].width;
                    var duty = op.pulseGenStatus.pulseObjA[i].duty;
                    var times = op.pulseGenStatus.pulseObjA[i].times;

                    opts.values = [enable_f, width, duty, times];
                    opts.viewMode_f = op.viewMode_f;
                    opts.actionFunc = actionFunc;
                    models[cname] = {name: "Md_linePulseGen~" + i, type: "Md_linePulseGen~sys", opts: opts};
                }
            }
            if ("ctrBar") {
                var cname = lyMap.get("pnMain") + "~1";
                var opts = {};
                opts.yc = 14;
                opts.ym = 4;
                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainR", cname);
                //==============================================================================================
                var cname = lyMap.get("pnMainR") + "~1";
                var opts = {};
                opts.innerText = "操控模式: 本機";
                opts.fontSize = 0;
                comps[cname] = {name: "operateModeButton", type: "label~namePanel", opts: opts};

                var cname = lyMap.get("pnMainR") + "~3";
                var opts = {};
                opts.innerText = "本機";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function () {
                    op.pulseGenStatus.localRemote_f = 0;
                    //op.pulseGenStatus.pulseStart_f = 0;
                };
                comps[cname] = {name: "localButton", type: "button~sys", opts: opts};

                var cname = lyMap.get("pnMainR") + "~2";
                var opts = {};
                opts.innerText = "遙控";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function () {
                    op.pulseGenStatus.localRemote_f = 1;
                    //op.pulseGenStatus.pulseStart_f = 0;
                };
                comps[cname] = {name: "remoteButton", type: "button~sys", opts: opts};



                //
                var cname = lyMap.get("pnMainR") + "~5";
                var opts = {};
                opts.innerText = "全部選取";
                opts.fontSize = "0.5rh";
                if (!op.viewMode_f)
                    opts.disable_f = 1;
                opts.clickFunc = function (iobj) {
                    for (var i = 0; i < 30; i++)
                        op.pulseGenStatus.pulseObjA[i].enable_f = 1;
                };
                comps[cname] = {name: "selectAll", type: "button~sys", opts: opts};
                //
                var cname = lyMap.get("pnMainR") + "~6";
                var opts = {};
                opts.innerText = "全部取消";
                opts.fontSize = "0.5rh";
                if (!op.viewMode_f)
                    opts.disable_f = 1;
                opts.clickFunc = function (iobj) {
                    for (var i = 0; i < 30; i++)
                        op.pulseGenStatus.pulseObjA[i].enable_f = 0;
                };
                comps[cname] = {name: "clearAll", type: "button~sys", opts: opts};
                //
                var cname = lyMap.get("pnMainR") + "~7";
                var opts = {};
                opts.innerText = "隨機";
                opts.checked_f = 1;
                opts.clickFunc = function (iobj) {
                    op.pulseGenStatus.localRandomFixed_f = 0;
                };
                comps[cname] = {name: "randomPulseButton", type: "button~checkName", opts: opts};

                var cname = lyMap.get("pnMainR") + "~8";
                var opts = {};
                opts.innerText = "固定";
                opts.checked_f = 0;
                opts.clickFunc = function (iobj) {
                    op.pulseGenStatus.localRandomFixed_f = 1;
                };
                comps[cname] = {name: "fixedPulseButton", type: "button~checkName", opts: opts};

                var cname = lyMap.get("pnMainR") + "~9";
                var opts = {};
                //opts.preText="頻率";
                opts.innerText = "";
                //opts.afterText = "G";
                opts.fontSize = "0.45rh";
                opts.clickFunc = function (iobj) {
                    //op.pulseGenStatus.localRandomFixed_f = 1;

                    var opts1 = {};
                    opts1.actionFunc = function (iobj) {
                        var freq = KvLib.toNumber(iobj.value, 2.9) * 100;
                        op.pulseGenStatus.freq = freq - 290;
                        //obj.valueStr = iobj.value;
                    };

                    var setObj = {};
                    setObj.dataType = "ratio";
                    setObj.setType = "inputFloat";
                    setObj.nullOk_f = 0;
                    setObj.name = "";
                    setObj.value = (op.pulseGenStatus.freq + 290) / 100;
                    setObj.max = 3.5;
                    setObj.min = 2.9;
                    setObj.fixed = 2;
                    opts1.setObj = setObj;
                    var mod = new Model("", "Md_numpad~sys", opts1, {});
                    var popOpts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = 600;
                    popOpts.h = 500;
                    sys.popOnModel(popOpts);



                };
                comps[cname] = {name: "freqButton", type: "button~sys", opts: opts};


                //
                var cname = lyMap.get("pnMainR") + "~10";
                var opts = {};
                opts.innerText = "開始";
                opts.fontSize = "0.5rh";
                opts.clickFunc = function (iobj) {
                    if (!op.pulseGenStatus.pulseStart_f) {
                        //op.pulseGenStatus.puulseStart_f = 1;
                        obj = {};
                        obj.sonprgName = "Sync";
                        obj.act = "pulseGenStart";
                        obj.trigAfterSetTime = gr.paraSet["pgTrigAfterSetTime"];
                        obj.rfAfterTrigTime = gr.paraSet["pgRfAfterTrigTime"];
                        obj.trigAfterRfTime = gr.paraSet["pgTrigAfterRfTime"];
                        obj.pulseGenFreq = "2.9";
                        obj.pulseGenRandom = "1";
                        var str = "";
                        for (var i = 0; i < 30; i++) {
                            if (i !== 0)
                                str += "~";
                            str += op.pulseGenStatus.pulseObjA[i].enable_f;
                            str += ",";
                            str += op.pulseGenStatus.pulseObjA[i].width;
                            str += ",";
                            str += op.pulseGenStatus.pulseObjA[i].duty;
                            str += ",";
                            str += op.pulseGenStatus.pulseObjA[i].times;
                        }
                        obj.pulseGenValues = str;
                        var jsonStr = JSON.stringify(obj);
                        Test.server_sonprg("response none", "", jsonStr);

                    } else {
                        //op.pulseGenStatus.pulseStart_f = 0;
                        obj = {};
                        obj.sonprgName = "Sync";
                        obj.act = "pulseGenStop";
                        var jsonStr = JSON.stringify(obj);
                        Test.server_sonprg("response none", "", jsonStr);
                    }

                };
                comps[cname] = {name: "startButton", type: "button~sys", opts: opts};
                //

                var cname = lyMap.get("pnMainR") + "~13";
                var opts = {};
                opts.fontSize = "0.5rh";
                opts.innerText = "工程模式";
                opts.clickFunc = function (event) {
                    if (op.viewMode_f) {
                        for (var i = 0; i < 30; i++) {
                            var name = "pulseGenParaA#" + i;
                            var valueStr = "";
                            valueStr += op.pulseGenStatus.pulseObjA[i].enable_f;
                            valueStr += "," + op.pulseGenStatus.pulseObjA[i].width;
                            valueStr += "," + op.pulseGenStatus.pulseObjA[i].duty;
                            valueStr += "," + op.pulseGenStatus.pulseObjA[i].times;
                            gr.paraSet[name] = valueStr;
                        }
                        self.saveParas();
                    }
                    op.viewMode_f ^= 1;
                    md.reCreate();
                };
                comps[cname] = {name: "p6EngBut", type: "button~sys", opts: opts};


            }

        }


        if (pageInx === 7) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            models[cname] = {name: "plot", type: "Md_scope~sys", opts: opts};
        }
        //======================================================================


        var buttonClickFunc = function (event) {
            var self = md.mdClass;
            self.clearSelfTest();
            var name = event.kvObj.name;
            md.opts.testStatus.testMode = "";
            var strA = name.split("~");
            md.opts.pageInx = parseInt(strA[1]);
            md.reCreate();
        };

        var cname = lyMap.get("headBar");
        var opts = {};
        opts.xc = 8;
        opts.margin = 4;
        opts.xm = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        for (var i = 0; i < 8; i++) {
            var cname = lyMap.get("pnButton") + "~" + i;
            var opts = {};
            if (i === 0)
                opts.innerText = "主頁面";
            if (i === 1)
                opts.innerText = "自測頁面";
            if (i === 2)
                opts.innerText = "系統頁面";
            if (i === 3)
                opts.innerText = "電源供應器";
            if (i === 4)
                opts.innerText = "固態放大器";
            if (i === 5)
                opts.innerText = "衰減器";
            if (i === 6)
                opts.innerText = "脈波產生器";
            if (i === 7)
                opts.innerText = "顯示波形";
            if (pageInx === i) {
                opts.insideShadowColor = "#00f";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.maxByte = 10;
            opts.fontSize = 0;
            opts.fontSize = "0.25rh";
            opts.clickFunc = buttonClickFunc;
            comps[cname] = {name: "mainKey~" + i, type: "button~sys", opts: opts};

        }



        /*
         for (var i = 0; i < op.kvObjs.length; i++) {
         var kvobj = op.kvObjs[i];
         if (kvobj.modelSet === "Layout")
         layouts[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         if (kvobj.modelSet === "Component")
         comps[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         if (kvobj.modelSet === "Model")
         models[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         }
         * 
         */
    }
}
//===========================================


//===========================================
class Md_lineView {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        op.colorInx = 1;
        op.wr = ["0.3rw", 9999, "0.2rw"];
        op.title = "title";
        op.unit = "unit";
        return op;
    }
    afterCreate() {

    }

    checkWatch() {


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
        opts.xc = 3;
        opts.iwO = {};
        opts.iwO.c0 = op.wr[0];
        opts.iwO.c1 = op.wr[1];
        opts.iwO.c2 = op.wr[2];


        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = "0.5rh";
        comps[cname] = {name: "title", type: "plate~dark", opts: opts};
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.altColorInx = op.colorInx;
        comps[cname] = {name: "meter", type: "label~meter", opts: opts};
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.innerText = op.unit;
        opts.textAlign = "left";
        opts.lpd = 4;
        opts.fontSize = "0.5rh";
        comps[cname] = {name: "unit", type: "plate~dark", opts: opts};



    }
}
//===========================================



//===========================================
class Md_ledLine {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.textColor = "#fff";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        op.colorInx = 1;
        op.wr = ["0.3rw", 9999];
        op.title = "title";
        op.ledMargin = 6;
        return op;
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
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = op.wr[0];
        opts.iwO.c1 = op.wr[1];

        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.backgroundInx = op.colorInx;
        opts.margin = op.ledMargin;
        comps[cname] = {name: "led", type: "label~led", opts: opts};

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = "0.5rh";
        opts.innerTextColor = op.textColor;
        opts.textAlign = "left";
        comps[cname] = {name: "title", type: "plate~dark", opts: opts};


    }
}
//===========================================


//===========================================
class Md_lineCtr {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        op.ledMargin = 3;
        //led,no,volt,current,tempr,reset
        op.head_f = 0;
        op.load_f = 0;
        op.wr = [30, 9999, 90, 90, 60];
        op.heads = ["", "編號", "電壓", "電流", "Reset"];
        op.headFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
        op.valueFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
        op.itemTypes = ["led", "label", "value", "gressBar", "button"];
        op.limitLows = [null, null, null, null, null];
        op.limitHighs = [null, null, null, null, null];
        op.gressBarMaxes = [100, 100, 100, 100, 100];
        op.gressBarMins = [0, 0, 0, 0, 0];
        op.initColors = [0, null, "#f00", "#f00", null];
        op.loadColors = [1, null, "#f00", "#f00", null];
        op.lowColors = [2, null, "#ff0", "#ff0", null];
        op.highColors = [3, null, "#f00", "#f00", null];
        op.baseColors = ["#222", "#222", "#222", "#222", "#222"];
        op.fixeds = [null, null, 1, 2, null];
        op.values = [null, "1-1", 34.56, 98.688, "Reset"];
        return op;
    }

    optsToSta() {
        var self = this.md;
        var op = self.opts;
        var md = this.md;

        for (var i = 0; i < op.wr.length; i++) {
            var itemType = op.itemTypes[i];
            if (itemType === "value") {
                try {
                    md.stas.valueStrs[i] = md.opts.values[i].toFixed(md.opts.fixeds[i]);
                } catch (ex) {
                    md.stas.valueStrs[i] = "xxx";
                }
            }
            var color = "#0f0";
            if (md.opts.limitLows[i] !== null) {
                if (md.opts.values[i] < md.opts.limitLows[i]) {
                    color = "#ff0";
                    md.stas.ledColorInx = 2;
                }
            }
            if (md.opts.limitHighs[i] !== null) {
                if (md.opts.values[i] > md.opts.limitHighs[i]) {
                    color = "#f00";
                    md.stas.ledColorInx = 2;
                }
            }
            if (!md.opts.load_f) {
                md.stas.ledColorInx = 0;
                color = "#00f";
            }
            md.stas.valueColors[i] = color;
            md.stas.ledColorInxes[i] = md.opts.values[i];
            md.stas.progressValues[i] = md.opts.values[i];
            md.stas.limitLows[i] = md.opts.limitLows[i];
            md.stas.limitHighs[i] = md.opts.limitHighs[i];
            if (!md.opts.load_f) {
                md.stas.ledColorInxes[i] = 0;
                md.stas.valueColors[i] = "#777";
                md.stas.valueStrs[i] = "---";
            }


        }

    }

    afterCreate() {

        var self = this.md;
        var md = self;
        var op = self.opts;

        md.stas.valueStrs = [];
        md.stas.valueColors = [];
        md.stas.progressValues = [];
        md.stas.limitLows = [];
        md.stas.limitHighs = [];
        md.stas.ledColorInxes = [];



        for (var i = 0; i < op.wr.length; i++) {

            md.stas.ledColorInxes.push(0);
            md.stas.valueStrs.push("");
            md.stas.valueColors.push("#fff");
            md.stas.progressValues.push(0);
            md.stas.limitLows.push(null);
            md.stas.limitHighs.push(null);



            var itemType = op.itemTypes[i];
            if (itemType === "led") {
                var obj = self.compRefs["item#" + i];
                if (obj) {
                    sys.setInputWatch(obj, "fatherStas", "ledColorInxes#" + i, "backgroundInx");
                }
                continue;
            }
            if (itemType === "value") {
                var obj = self.compRefs["item#" + i];
                if (obj) {
                    sys.setInputWatch(obj, "fatherStas", "valueStrs#" + i, "innerText");
                    sys.setInputWatch(obj, "fatherStas", "valueColors#" + i, "innerTextColor");
                }
                continue;
            }

            if (itemType === "label") {
                /*
                 var obj = self.compRefs["item#" + i];
                 if (obj) {
                 sys.setInputWatch(obj, "fatherStas", "valueStrs#" + i, "innerText");
                 }
                 */
                continue;
            }


            if (itemType === "gressBar") {
                var obj = self.compRefs["item#" + i];
                if (obj) {
                    sys.setInputWatch(obj, "fatherStas", "progressValues#" + i, "progressValue", 1);
                    sys.setInputWatch(obj, "fatherStas", "limitLows#" + i, "limitLow", 1);
                    sys.setInputWatch(obj, "fatherStas", "limitHighs#" + i, "limitHigh", 1);
                    sys.setInputWatch(obj, "fatherOpts", "load_f", "load_f", 1);
                }
                continue;
            }
        }

    }

    chkWatch() {
        var self = this;
        self.optsToSta();
        sys.inputWatch(self.md);
        sys.checkWatch(self.md);
    }
    actionFunc = function (iobj) {
        console.log(iobj);
        var obj = {};
        var fatherMd = iobj.kvObj.fatherMd;
        obj.act = "buttonClick";
        obj.name = iobj.kvObj.name;
        obj.text = iobj.kvObj.opts.innerText;
        obj.indexStr = fatherMd.name.split("#")[1];
        if (fatherMd.opts.actionFunc)
            fatherMd.opts.actionFunc(obj);
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
        //self.optsToSta();
        //======================================================================
        var cname = "c";
        var opts = {};
        opts.xc = op.wr.length;
        opts.xm = 4;
        opts.iwO = {};
        for (var i = 0; i < op.wr.length; i++) {
            opts.iwO["c" + i] = op.wr[i];
        }
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (op.head_f) {
            for (var i = 0; i < op.wr.length; i++) {
                var cname = lyMap.get("body") + "~" + (i);
                var opts = {};
                opts.innerText = op.heads[i];
                opts.fontSize = op.headFontSizes[i];
                comps[cname] = {name: "head~" + i, type: "plate~dark", opts: opts};
            }
            return;
        }
        for (var i = 0; i < op.wr.length; i++) {
            var cname = lyMap.get("body") + "~" + (i);
            var itemType = op.itemTypes[i];
            var opts = {};
            if (itemType === "led") {
                opts.backgroundInx = op.initColors[i];
                opts.margin = op.ledMargin;
                opts.innerText = "";
                opts.baseColor = op.baseColors[i];
                comps[cname] = {name: "item#" + i, type: "label~led", opts: opts};
                continue;
            }
            if (itemType === "label") {
                var opts = {};
                opts.innerText = op.values[i];
                opts.fontSize = op.valueFontSizes[i];
                opts.baseColor = op.baseColors[i];
                comps[cname] = {name: "item#" + i, type: "plate~dark", opts: opts};
            }
            if (itemType === "value") {
                var opts = {};
                opts.innerText = op.values[i].toFixed(op.fixeds[i]);
                opts.fontSize = op.valueFontSizes[i];
                opts.innerTextColor = op.initColors[i];
                opts.baseColor = op.baseColors[i];
                comps[cname] = {name: "item#" + i, type: "plate~none", opts: opts};
            }
            if (itemType === "button") {
                var opts = {};
                opts.innerText = op.values[i];
                opts.fontSize = op.valueFontSizes[i];
                opts.clickFunc = self.actionFunc;
                comps[cname] = {name: "item#" + i, type: "button~sys", opts: opts};
            }
            if (itemType === "gressBar") {
                var opts = {};
                opts.progressValue = op.values[i];
                opts.max = op.gressBarMaxes[i];
                opts.min = op.gressBarMins[i];
                opts.limitLow = op.limitLows[i];
                opts.limitHigh = op.limitHighs[i];
                opts.fixed = op.fixeds[i];
                opts.tm = 10;
                opts.bm = 10;
                opts.load_f = op.load_f;
                comps[cname] = {name: "item#" + i, type: "progress~sys", opts: opts};
            }
        }


    }
}
//===========================================



//===========================================
class Md_linePowSup {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        op.ledMargin = 3;
        //led,no,volt,current,tempr,reset
        op.wr = [30, 9999, 90, 90, 90, 60];
        op.title = "title";
        op.head_f = 0;
        op.maxes = [100, 100, 100];
        op.mins = [0, 0, 0];
        op.values = [0, 0, 0];
        op.errLed_f = 0;
        op.heads = ["編號", "電壓", "電流", "溫度"];
        op.limitLows = [40, 30, 30];
        op.limitHighs = [60, 50, 40];
        op.fixeds = [0, 0, 0];
        op.viewMode_f = 1;
        op.load_f = 0;
        op.setButton_f = 0;
        op.resetButton_f = 0;
        return op;
    }

    optsToSta() {
        var md = this.md;
        var op = md.opts;
        md.stas.valueStrs = [];
        md.stas.valueColors = [];
        md.stas.progressValues = [];
        md.stas.limitLows = [];
        md.stas.limitHighs = [];
        md.stas.ledColors = [];


        for (var i = 0; i < op.values.length; i++) {
            md.stas.valueStrs.push(md.opts.values[i].toFixed(md.opts.fixeds[i]));
            var color = "#0f0";
            if (md.opts.values[i] < md.opts.limitLows[i]) {
                color = "#f00";
                //md.stas.ledColorInx = 2;
            }
            if (md.opts.values[i] > md.opts.limitHighs[i]) {
                color = "#f00";
                //md.stas.ledColorInx = 2;
            }
            if (!md.opts.load_f) {
                //md.stas.ledColorInx = 0;
                color = "#00f";
            }
            md.stas.valueColors.push(color);
            md.stas.ledColors.push(md.opts.values[i]);
            md.stas.progressValues.push(md.opts.values[i]);
            md.stas.limitLows.push(md.opts.limitLows[i]);
            md.stas.limitHighs.push(md.opts.limitHighs[i]);



        }


    }

    afterCreate() {
        var self = this.md;

        var obj = self.compRefs["led"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "ledColorInx", "backgroundInx");
        }


        var obj = self.compRefs["value#0"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "valueStrs#0", "innerText");
            sys.setInputWatch(obj, "fatherStas", "valueColors#0", "innerTextColor");
        }
        var obj = self.compRefs["value#1"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "valueStrs#1", "innerText");
            sys.setInputWatch(obj, "fatherStas", "valueColors#1", "innerTextColor");
        }
        var obj = self.compRefs["value#2"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "valueStrs#2", "innerText");
            sys.setInputWatch(obj, "fatherStas", "valueColors#2", "innerTextColor");
        }

        var obj = self.compRefs["value#3"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "valueStrs#3", "innerText");
            sys.setInputWatch(obj, "fatherStas", "valueColors#3", "innerTextColor");
        }


        var obj = self.compRefs["progressValue#0"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "progressValues#0", "progressValue", 1);
            sys.setInputWatch(obj, "fatherStas", "limitLows#0", "limitLow", 1);
            sys.setInputWatch(obj, "fatherStas", "limitHighs#0", "limitHigh", 1);
            sys.setInputWatch(obj, "fatherOpts", "load_f", "load_f", 1);
        }
        var obj = self.compRefs["progressValue#1"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "progressValues#1", "progressValue", 1);
            sys.setInputWatch(obj, "fatherStas", "limitLows#1", "limitLow", 1);
            sys.setInputWatch(obj, "fatherStas", "limitHighs#1", "limitHigh", 1);
            sys.setInputWatch(obj, "fatherOpts", "load_f", "load_f", 1);
        }
        var obj = self.compRefs["progressValue#2"];
        if (obj) {
            sys.setInputWatch(obj, "fatherStas", "progressValues#2", "progressValue", 1);
            sys.setInputWatch(obj, "fatherStas", "limitLows#2", "limitLow", 1);
            sys.setInputWatch(obj, "fatherStas", "limitHighs#2", "limitHigh", 1);
            sys.setInputWatch(obj, "fatherOpts", "load_f", "load_f", 1);
        }
    }
    chkWatch() {
        var self = this;
        self.optsToSta();
        sys.inputWatch(self.md);
        sys.checkWatch(self.md);
    }
    actionFunc = function (iobj) {
        console.log(iobj);
        var obj = {};
        var fatherMd = iobj.kvObj.fatherMd;
        obj.act = "buttonClick";
        obj.name = iobj.kvObj.name;
        obj.text = iobj.kvObj.opts.innerText;
        obj.index = fatherMd.name.split("#")[1];
        if (fatherMd.opts.actionFunc)
            fatherMd.opts.actionFunc(obj);
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
        self.optsToSta();
        //======================================================================
        var cname = "c";
        var opts = {};
        opts.xc = 6;
        opts.xm = 4;
        opts.iwO = {};
        opts.iwO.c0 = op.wr[0];
        opts.iwO.c1 = op.wr[1];
        opts.iwO.c2 = op.wr[2];
        opts.iwO.c3 = op.wr[3];
        opts.iwO.c4 = op.wr[4];
        opts.iwO.c5 = op.wr[5];
        opts.color = op.color;

        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (op.head_f) {
            for (var i = 0; i < 5; i++) {
                var cname = lyMap.get("body") + "~" + (i + 1);
                var opts = {};
                opts.innerText = op.heads[i];
                opts.fontSize = "0.5rh";
                if (op.heads[i].length > 6) {
                    opts.fontSize = 0;
                    opts.maxByte = 10;
                }
                comps[cname] = {name: "head~" + i, type: "plate~dark", opts: opts};
            }
            return;
        }

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = "0.4rh";
        if (!op.setButton_f)
            comps[cname] = {name: "title", type: "plate~dark", opts: opts};
        else {
            opts.clickFunc = self.actionFunc;
            comps[cname] = {name: "set", type: "button~sys", opts: opts};
        }
        var errLed = 0;
        for (var i = 0; i < op.values.length; i++) {
            var cname = lyMap.get("body") + "~" + (2 + i);
            if (op.viewMode_f) {
                var opts = {};
                opts.innerText = "";//st.valueStrs[i];
                opts.innerTextColor = "#fff";
                comps[cname] = {name: "value#" + i, type: "plate~none", opts: opts};

            } else {
                var opts = {};
                opts.progressValue = st.progressValues[i];
                opts.max = op.maxes[i];
                opts.min = op.mins[i];
                opts.limitLow = op.limitLows[i];
                opts.limitHigh = op.limitHighs[i];
                opts.fixed = op.fixeds[i];
                opts.tm = 10;
                opts.bm = 10;
                opts.load_f = op.load_f;
                comps[cname] = {name: "progressValue#" + i, type: "progress~sys", opts: opts};
            }

        }

        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.backgroundInx = md.stas.ledColorInx;
        opts.margin = op.ledMargin;
        opts.innerText = "";
        comps[cname] = {name: "led", type: "label~led", opts: opts};




        if (op.resetButton_f) {
            var cname = lyMap.get("body") + "~" + 5;
            var opts = {};
            opts.innerText = "Reset";
            opts.clickFunc = self.actionFunc;
            comps[cname] = {name: "reset", type: "button~sys", opts: opts};
        }

    }
}
//===========================================







//===========================================
class Md_setPanel {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        //led,no,volt,current,tempr,reset
        op.wr0 = [9999, 350];
        op.wr1 = [9999, 100, 100, 100];
        op.title = "title";
        op.head_f = 0;
        op.values = [12, 55, 89];
        op.heads = ["編號", "電壓", "電流", "溫度"];
        op.values = [];
        op.values.push([]);
        op.values.push([]);
        op.values.push([]);
        op.values.push([]);
        op.rowCnt = 10;
        op.dispNo_f = 1;
        op.pageCnt = 0;
        op.setInx = -1;
        for (var i = 0; i < 55; i++) {
            op.values[0].push("V0" + i);
            op.values[1].push("V1" + i);
            op.values[2].push("V2" + i);
            op.values[3].push("V3" + i);
        }
        op.limits = [];
        var limObj = {max: 100, min: 0, muls: [0.01, 0.01, 1, 10, 100], fixed: 2};
        op.limits.push(limObj);
        return op;
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
        opts.ihO.c0 = 9999;
        opts.ihO.c1 = 40;
        if (op.values[0].length > op.rowCnt)
            opts.ihO.c1 = 40;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeft", cname);
        //======================================================================

        var cname = lyMap.get("pnLeft") + "~" + 0;
        var opts = {};
        opts.xc = op.heads.length;
        opts.xm = 4;
        opts.iwO = {};
        for (var i = 0; i < op.heads.length; i++)
            opts.iwO["c" + i] = op.wr1[i];
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeftU", cname);
        //======================================================================
        for (var i = 0; i < op.heads.length; i++) {
            var cname = lyMap.get("pnLeftU") + "~" + i;
            var opts = {};
            opts.yc = op.rowCnt + 1;
            if (op.values[0].length > op.rowCnt)
                opts.yc = op.rowCnt + 1;
            opts.margin = 2;
            opts.ym = 2;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnRow~" + i, cname);

            var nowInx = op.pageCnt * op.rowCnt;
            for (var j = 0; j < op.rowCnt + 1; j++) {
                var cname = lyMap.get("pnRow~" + i) + "~" + (j);
                if (j === 0) {
                    var opts = {};
                    opts.innerText = op.heads[i];
                    comps[cname] = {name: "headName~" + i, type: "label~namePanel", opts: opts};
                    continue;
                }
                if (nowInx >= op.values[i].length)
                    continue;

                if (i === 0) {
                    var opts = {};
                    if (op.dispNo_f) {
                        if (nowInx < 9)
                            opts.innerText = "" + (nowInx + 1) + ". " + op.values[i][nowInx];
                        else
                            opts.innerText = "" + (nowInx + 1) + " " + op.values[i][nowInx];
                    } else
                        opts.innerText = op.values[i][nowInx];
                    if ((op.setInx + 1) === j) {
                        opts.insideShadowColor = "#00f";
                        opts.insideShadowBlur = "0.5rh";
                    }
                    opts.textAlign = "left";
                    opts.lpd = 10;
                    opts.clickFunc = function (event) {
                        var name = event.kvObj.name;
                        var strA = name.split("~");
                        var inx = parseInt(strA[2]);
                        op.setInx = inx;
                        md.reCreate();
                    };
                    comps[cname] = {name: "value~" + i + "~" + (j - 1), type: "button~sys", opts: opts};
                    nowInx++;
                    continue;
                }
                var opts = {};
                opts.innerText = "" + op.values[i][nowInx];
                comps[cname] = {name: "value~" + i + "~" + (j - 1), type: "label~valuePanel", opts: opts};
                nowInx++;
                continue;
            }



        }

        var cname = lyMap.get("pnLeft") + "~" + 1;
        var opts = {};
        opts.xc = 4;
        opts.xm = 4;
        opts.lm = 10;
        opts.rm = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLeftD", cname);
        //======================================================================
        var allPage = ((op.values[0].length - 0.5) / op.rowCnt) | 0;
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
            op.setInx = -1;
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
            op.setInx = -1;
            md.reCreate();
        };
        comps[cname] = {name: "pageButton~" + i, type: "button~sys", opts: opts};

        var cname = lyMap.get("pnLeftD") + "~3";
        var opts = {};
        opts.innerText = "No: " + (op.pageCnt * op.rowCnt + 1) + " / " + op.values[0].length;
        opts.textAlign = "right";
        comps[cname] = {name: "pageButton~" + i, type: "plate~dark", opts: opts};

        var cname = lyMap.get("body") + "~1";
        var opts = {};
        opts.rightWidth = 100;
        opts.buttonHeight = 60;
        opts.lineHeight = 60;
        opts.muls = [0.01, 0.1, 1, 10, 100];
        if (op.setInx < 0) {
            opts.title = "";
            opts.value = null;
        } else {
            opts.title = op.values[0][op.setInx];
            opts.value = op.values[1][op.setInx];
            if (op.limits) {
                if (op.limits[op.setInx]) {
                    opts.min = op.limits[op.setInx].min;
                    opts.max = op.limits[op.setInx].max;
                    opts.muls = op.limits[op.setInx].muls;
                    opts.fixed = op.limits[op.setInx].fixed;
                }
            }
        }
        opts.dataType = "ratio";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (op.setInx < 0)
                return;
            op.values[1][op.setInx] = iobj.value;
            var kvObj = md.compRefs["value~1~" + op.setInx];
            if (op.limits[op.setInx]) {
                kvObj.opts.innerText = iobj.value.toFixed(op.limits[op.setInx].fixed);
            } else {
                kvObj.opts.innerText = "" + iobj.value;
            }
            if (op.actionFunc) {
                var obj = {};
                obj.name = "value~1~" + op.setInx;
                obj.valueStr = kvObj.opts.innerText;
                op.actionFunc(obj);
            }
            kvObj.reCreate();

        };

        models[cname] = {name: "tuner", type: "Md_tuner~sys", opts: opts};


    }
}
//===========================================


//===========================================
class Md_linePulseGen {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.borderWidth = 0;
        op.borderColor = "#fff";
        op.ledMargin = 3;
        op.name = "";
        //led,no,volt,current,tempr,reset
        op.viewMode_f = 0;
        op.wr = ["0.2rw", "0.3rw", "0.3rw", 9999];
        op.mins = [0, 0, 0, 1];
        op.maxs = [0, 10000, 200, 255];
        op.fixeds = [0, 1, 1, 0];

        op.title = "title";
        op.head_f = 0;
        op.values = [12, 55, 89, 12];
        op.heads = ["編號", "電壓", "電流", "ddd"];
        return op;
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
        opts.xc = op.wr.length;
        opts.xm = 4;
        opts.iwO = {};
        for (var i = 0; i < op.wr.length; i++)
            opts.iwO["c" + i] = op.wr[i];
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //======================================================================
        if (op.head_f) {
            for (var i = 0; i < op.heads.length; i++) {
                var cname = lyMap.get("body") + "~" + (i);
                var opts = {};
                opts.innerText = op.heads[i];
                opts.fontSize = "0.5rh";
                comps[cname] = {name: "head~" + i, type: "plate~dark", opts: opts};
            }
            return;
        }

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.innerText = op.title;
        comps[cname] = {name: "title", type: "plate~dark", opts: opts};

        var errLed = 0;

        var buttonClick = function (iobj) {
            var kvObj = iobj.kvObj;
            var md = kvObj.fatherMd;
            var strA = md.name.split("~");
            var yInx = parseInt(strA[1]);
            var strA = kvObj.name.split("~");
            var xInx = parseInt(strA[1]);

            var opts = {};
            opts.actionFunc = function (iobj) {
                var strA = kvObj.name.split("~");
                var strB = kvObj.fatherMd.name.split("~");
                var obj = {};
                obj.act = "valueChange";
                obj.name = strB[1] + "~" + strA[1];
                obj.valueStr = iobj.value;
                if (op.actionFunc)
                    op.actionFunc(obj);
            };

            var setObj = {};
            if (op.fixeds[xInx])
                setObj.dataType = "ratio";
            else
                setObj.dataType = "num";
            setObj.setType = "inputNumber";
            setObj.nullOk_f = 0;
            setObj.name = "";
            setObj.value = KvLib.parseNumber(kvObj.opts.innerText);
            setObj.max = op.maxs[xInx];
            setObj.min = op.mins[xInx];
            setObj.fixed = op.fixeds[xInx];
            opts.setObj = setObj;
            var mod = new Model("", "Md_numpad~sys", opts, {});
            var popOpts = {};
            popOpts.kvObj = mod;
            popOpts.w = 600;
            popOpts.h = 500;
            sys.popOnModel(popOpts);
        };


        for (var i = 1; i < 4; i++) {
            var errFlag = 0;
            var cname = lyMap.get("body") + "~" + (i);
            if (!op.viewMode_f) {
                var opts = {};
                opts.innerText = op.values[i].toFixed(op.fixeds[i]);
                opts.innerTextColor = "#ccc";
                opts.baseColor = "#333";
                comps[cname] = {name: "value~" + i, type: "plate~none", opts: opts};
            } else {
                var opts = {};
                opts.innerText = op.values[i].toFixed(op.fixeds[i]);
                opts.clickFunc = buttonClick;
                comps[cname] = {name: "valueButton~" + i, type: "button~sys", opts: opts};
            }

        }

        var errFlag = 0;
        var cname = lyMap.get("body") + "~" + (0);
        var opts = {};
        opts.clickFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var strA = kvObj.name.split("~");
            var strB = kvObj.fatherMd.name.split("~");
            var obj = {};
            obj.act = "valueChange";
            obj.name = strB[1] + "~0";
            obj.valueStr = "" + kvObj.opts.checked_f ^ 1;
            if (op.actionFunc)
                op.actionFunc(obj);
        };
        if (!op.viewMode_f)
            opts.disable_f = 1;
        opts.checked_f = op.values[0];
        comps[cname] = {name: "valueCheck", type: "button~check", opts: opts};




    }
}
//===========================================


//===========================================
class Md_angleSetBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.color = "#222";
        op.title = "title";
        op.borderWidth = 1;

        return op;
    }
    afterCreate() {

        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var mdObj = md.modelRefs["wtIn"];
        if (mdObj) {
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "gr.syncTmp.stas.sspaStatus.valueA[" + (4) + "][0]", "innerText");
        }
        var mdObj = md.modelRefs["wtCombineOut"];
        if (mdObj) {
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "gr.syncTmp.stas.sspaStatus.valueA[" + (4) + "][1]", "innerText");
        }
        var mdObj = md.modelRefs["avgTempr"];
        if (mdObj) {
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "gr.syncTmp.stas.sspaStatus.valueA[" + (4) + "][2]", "innerText");
        }
        var mdObj = md.modelRefs["preAngle"];
        if (mdObj) {
            var meterObj = mdObj.compRefs["meter"];
            sys.setInputWatch(meterObj, "directName", "gr.syncTmp.stas.sspaStatus.valueA[" + (4) + "][3]", "innerText");
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
        opts.yc = 6;
        opts.ihO = {};
        opts.ihO.c0 = 50;
        opts.ihO.c1 = 120;
        opts.ihO.c2 = 20;
        opts.ihO.c3 = 9999;
        opts.ihO.c4 = 100;
        opts.ihO.c5 = 50;
        opts.xm = 8;
        opts.bm = 10;
        opts.lm = 4;
        opts.rm = 4;
        opts.color = op.color;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);


        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.yc = 2;
        opts.xc = 2;
        opts.xm = 4;
        opts.ym = 4
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body1", cname);


        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = "0.5rh";
        comps[cname] = {name: "title", type: "plate~dark", opts: opts};


        var cname = lyMap.get("body1") + "~" + (0);

        var opts = {};
        opts.title = "輸入功率";
        opts.unit = "dBm";
        opts.fontSize = "0.3rh";
        opts.wr = ["0.5rw", 9999, "0.2rw"];
        models[cname] = {name: "wtIn", type: "Md_lineView~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + (1);
        var opts = {};
        opts.title = "合併輸出功率";
        opts.unit = "dBm";
        opts.fontSize = "0.3rh";
        opts.wr = ["0.5rw", 9999, "0.2rw"];
        models[cname] = {name: "wtCombineOut", type: "Md_lineView~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + (2);
        var opts = {};
        opts.title = "平均溫度 ";
        opts.unit = "°C";
        opts.fontSize = "0.3rh";
        opts.wr = ["0.5rw", 9999, "0.2rw"];
        models[cname] = {name: "avgTempr", type: "Md_lineView~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + (3);
        var opts = {};
        opts.title = "前級相位角";
        opts.unit = "°";
        opts.fontSize = "0.3rh";
        opts.wr = ["0.5rw", 9999, "0.2rw"];
        models[cname] = {name: "preAngle", type: "Md_lineView~sys", opts: opts};


        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 550;
        opts.iwO.c1 = 9999;
        opts.xm = 8;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body3", cname);

        var cname = lyMap.get("body3") + "~" + 1;
        var opts = {};
        opts.yc = 8;
        opts.ihO = {};
        opts.ihO.c0 = 50;
        opts.ihO.c1 = 50;
        opts.ihO.c2 = 50;

        opts.ihO.c3 = 50;
        opts.ihO.c4 = 50;
        opts.ihO.c5 = 50;
        opts.ihO.c6 = 50;
        opts.ihO.c7 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body3R", cname);

        var cname = lyMap.get("body3") + "~" + 0;
        var opts = {};
        opts.yc = 8;
        opts.ihO = {};
        opts.ihO.c0 = 50;
        opts.ihO.c1 = 50;
        opts.ihO.c2 = 50;
        opts.ihO.c3 = 50;
        opts.ihO.c4 = 50;
        opts.ihO.c5 = 50;
        opts.ihO.c6 = 50;
        opts.ihO.c7 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body3L", cname);



        /*
         var cname = lyMap.get("pnMainUp0") + "~0";
         var opts = {};
         opts.title = "順向輸出功率";
         opts.unit = "dBm";
         models[cname] = {name: "wtOutCw", type: "Md_lineView~sys", opts: opts};
         */


        for (var i = 0; i < 4; i++) {

            var cname = lyMap.get("body3L") + "~" + (i);
            var opts = {};
            opts.xc = 3;
            opts.iwO = {};
            opts.iwO.c0 = 150;
            opts.iwO.c1 = 150;
            opts.iwO.c2 = 9999;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("body3L" + (i), cname);


            var cname = lyMap.get("body3L" + (i)) + "~" + 0;
            var opts = {};
            opts.innerText = "sspa" + (i + 1);
            comps[cname] = {name: "sspaName" + i, type: "label~sys", opts: opts};

            var cname = lyMap.get("body3L" + (i)) + "~" + 1;
            var opts = {};
            opts.altColorInx = 2;
            opts.preText = "溫度";
            opts.innerText = "" + (45 + i);
            comps[cname] = {name: "sspaTemp" + i, type: "label~meter", opts: opts};

            var cname = lyMap.get("body3L" + (i)) + "~" + 2;
            var opts = {};
            opts.altColorInx = 2;
            opts.preText = "相位角";
            opts.innerText = "" + (0 + i);
            comps[cname] = {name: "sspaAngle" + i, type: "label~meter", opts: opts};






            var opts = {};
            var setObj = sys.setOptsSetFix("name", "number");
            setObj.value = 0;
            setObj.id = "id" + i;
            setObj.textAlign = "left";
            setObj.nameFontSize = "0.6rh";
            setObj.showDataType_f = 0;
            setObj.buttonWidth = 100;
            setObj.showName_f = 0;
            setObj.titleWidth = 0;
            opts.setObj = setObj;
            var cname = lyMap.get("body3R") + "~" + (i);
            models[cname] = {name: "setAngle#" + i, type: "Md_editOptsLine~sys", opts: opts};



        }

        /*
         var cname = lyMap.get("body1R") + "~" + 1;
         var opts = {};
         opts.margin = 0;
         opts.setObjs = [];
         opts.noOffset = 0;
         
         models[cname] = {name: "modelButton", type: "Md_editOptsLine~sys", opts: opts};
         
         
         
         for (var i = 0; i < 4; i++) {
         var setObj = sys.setOptsSetFix("name", "number");
         setObj.value = 0;
         setObj.id = "id"+i;
         setObj.textAlign = "left";
         setObj.nameFontSize = "0.6rh";
         setObj.showDataType_f=0;
         setObj.buttonWidth=100;
         setObj.showName_f=0;
         setObj.titleWidth = 0;
         opts.setObjs.push(setObj);
         }
         opts.selectAble_f = 0;
         opts.tagOn_f = 0;
         opts.ih = 50;
         opts.rowCount = op.rowCount;
         opts.showDataType_f = 0;
         //opts.actionFunc = actionFunc;
         models[cname] = {name: "setList", type: "Md_setList~light", opts: opts};
         */


        var cname = lyMap.get("body") + "~" + 4;
        var opts = {};
        opts.xc = 2;
        opts.xm = 200;
        opts.margin = 20;
        opts.iw = 200;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body4", cname);


        var cname = lyMap.get("body4") + "~" + 0;
        var opts = {};
        opts.innerText = "自動校準";
        opts.wAlign = "center";
        opts.clickFunc = function (iobj) {
            console.log(iobj);
            sys.popOff(2);
        };
        comps[cname] = {name: "autoAdjButton", type: "button~sys", opts: opts};


        var cname = lyMap.get("body4") + "~" + 1;
        var opts = {};
        opts.innerText = "手動設定";
        opts.wAlign = "center";
        opts.clickFunc = function (iobj) {
            console.log(iobj);
        };
        comps[cname] = {name: "manuSetButton", type: "button~sys", opts: opts};





        var cname = lyMap.get("body") + "~" + 5;
        var opts = {};
        opts.innerText = "ESC";
        opts.iw = 200;
        opts.wAlign = "center";
        opts.clickFunc = function (iobj) {
            console.log(iobj);
            sys.popOff(2);
        };
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};

        //======================================================================
    }
}
//===========================================


















