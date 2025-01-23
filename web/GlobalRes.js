class GlobalRes {
    constructor() {
        //this.appName="webBuilder";
        this.appName="sync";
        this.appId=3;
        this.globleTime="DummyTargetMaster.globleTime()";

        //=========
        if(this.appId===0)
            this.appType="Model~DummyTargetMaster~base.sys0";
        if(this.appId===1)
            this.appType="Model~DummyTargetSub~base.sys0";
        if(this.appId===2)
            this.appType="Model~DummyTargetSub~base.sys0";
        if(this.appId===3)
            this.appType="Model~DummyTargetCtr~base.sys0";
        if(this.appId===4)
            this.appType="Model~DummyTargetCtr~base.sys0";
        if(this.appId===99)
            this.appType="Model~MdaMdTest~base.sys0";
        
        this.language = "chnT";
        this.appPageCnt=0;
        this.logoImage="systemResource/dummyTargetLogo.png";
        this.logoImageWidth=1000;
        this.logoImageHeight=630;
        this.defaultUserName = "kevinAdmin";
        this.defaultUserPassword = "16020039";
        this.clearCookie_f = 0;
        this.appFirstEntry_f=0;
        //==============================
        this.kid = 0;
        this.ser = 0;
        // this.kidMap=new Map();
        //this.webSocketAddress = "127.0.0.1";
        //this.webSocketAddress = "192.168.0.28";
        this.webIp="127.0.0.1";
        this.webSocketPort = "80";
        this.userName = "sync";
        this.password = "1234";
        this.mouseAct = {};
        this.baseColor = "#27282c";
        this.minFontSize = 10;
        this.maxFontSize = 200;
        this.mdTestInx = 0;
        this.scrollWidth = 0;
        this.debugCnt = 0;
        this.mouseDown_f = 0;
        this.addSubTimer = null;
        this.flash_f=0;
        this.mesBoxOn_f=0;
        this.paras = {};
        this.syncTmp={};
        this.blockSubOpts={};
        //============================
        this.footBarMessageText="";
        this.footBarMessageColor="#000";
        this.footBarStatus0="";
        this.footBarStatus1="";
        this.footBarStatus2="";
        this.footBarMessageTime=0;
        /*
        this.message = "";
        this.messageKobj = null;
        this.messageTime = 0;
        this.messageColor = "#000";
        this.messageTimerId = null;
        this.status1 = "";
        this.status2 = "";
        this.status3 = "";
        */
        this.version="1.0";
        //============================
        this.animates = [];
        this.compOpts = {};
        this.modelOpts = {};
        this.compBaseOpts = {};
        this.plotOpts = {};
        this.plotBaseOpts = {};
        this.urlSelectObj = {};
        this.paraSet={};
        this.socketRetPrgTbl={};
        //=====================
        this.editUndoStack = [];
        this.editUndoInx = -1;
        this.editUndoEnd = -1;
        this.editUndo_f = 0;
        this.editRedo_f = 0;
        this.editUndoMax = 64;
        //============================
        this.systemParaSetPassword="1234";
        this.systemParaSetDefaultPassword="1234";
        this.repaint_f = 0;
        this.window_innerWidth_old = -1;
        this.window_innerHeight_old = -1;
        
        //this.systemName="webFrame";
        //this.systemName="future";
        //this.systemName="sync";
        this.systemName="keyboardOled";
        //this.systemName="webIcs";
        
        
        
        this.showLogo_f = 1;
        this.showLogoTime=1000;//ms
        this.enabelLogin_f = 1;
        this.logoUrl='./systemResource/robot_aiot_1920x1080.jpg';

        this.mouseFuncPara = null;
        //this.googleMapKeys = ["AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q"];
        this.googleMapKeys = [];


        this.colorTable = [
            "#ffffff",
            "#cccccc",
            "#888888",
            "#444444",
            "#000000",
            "#ff0000",
            "#aa0000",
            "#440000",
            "#00ff00",
            "#00aa00",
            "#004400",
            "#0000ff",
            "#0000aa",
            "#000044",
            "#00ffff",
            "#00aaaa",
            "#004444",
            "#ffff00",
            "#aaaa00",
            "#444400",
            "#000000",
            "#000000",
            "#000000"
        ];

        this.colorSetTbl = [//B/f
            "#4f4", "#000", //0
            "#ff0", "#000", //1
            "#f33", "#000", //2
            "#66f", "#000", //3
            "#000", "#4f4", //0
            "#000", "#ff0", //1
            "#000", "#f33", //2
            "#000", "#66f", //3

            "#060", "#fff", //0
            "#660", "#fff", //1
            "#800", "#fff", //2
            "#008", "#fff", //3
            "#fff", "#000", //0
            "#000", "#fff", //1
            "#fff", "#800", //2
            "#fff", "#008", //3

            "#000", "#000"  //end
        ];

        this.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        this.hexTable = [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'a', 'b',
            'c', 'd', 'e', 'f'
        ];


        var self = this;

        if ("syncUse") {




        }



    }
}



var gr = new GlobalRes();
//disable mouse right key
document.addEventListener('contextmenu', event => event.preventDefault());
/*================================================================*/
var gbStyle = document.createElement('style');
gbStyle.innerHTML = `
@font-face {
        font-family: digital_1;
        src: url(DS-DIGIT.TTF);
}
@font-face {
        font-family: digital_2;
        src: url(digital-7.ttf);
}
@font-face {
        font-family: digital_3;
        src: url(digital-7a.ttf);
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(iconfont/MaterialIcons-Regular.woff2) format('woff2'),
    url(iconfont/MaterialIcons-Regular.woff) format('woff'),
    url(iconfont/MaterialIcons-Regular.ttf) format('truetype');
}
.material-icons,.gf{
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: hidden;  
  pointer-events:none;  
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;
  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;
  /* Support for IE. */
  font-feature-settings: 'liga';
}
 `;

var mouseWheelFunc=function(event){
    gr.wheelEvent=event;
    console.log("global wheel");
};

var mouseUpFunc=function(event){
    gr.mouseDown_f=1;
};
var mouseDownFunc=function(event){
    gr.mouseDown_f=0;
    gr.mouseDisable_f=0;
};

document.head.appendChild(gbStyle);
document.addEventListener('mousedown',mouseUpFunc);
document.addEventListener('mouseup', mouseDownFunc);
//document.addEventListener('wheel', mouseWheelFunc);

/*================================================================*/
//google map use
var initMap = function () {

};