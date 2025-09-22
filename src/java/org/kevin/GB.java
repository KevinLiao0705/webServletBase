package org.kevin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author kevin
 */
public class GB {
    public static int osInx = 0;//0 for window 1:for linux
    //==
    //public static String setAppName="syncSetExe";
    //public static String setAppName="josnSipSet";
    public static String setAppName="josnSipUi";
    //==============================================
    //public static String winParaSetFullName="e:/kevin/myCode/josnSipSet/paraSetSip.json";
    //public static String linuxParaSetFullName="/home/pi/kevin/sipphone/paraSetSip.json";
    public static String winParaSetFullName="e:/kevin/myCode/josnSipSet/paraSetUi.json";
    public static String linuxParaSetFullName="/home/pi/kevin/sipphone/paraSetUi.json";
    //=====================================
    public static int min_js_f = 0;
    static public String appName = "webServeletBase";
    public static Map<String,Object> paraSetMap=new HashMap();
    public static String sourceDir = "web/";          //for debug use
    //public static String sourceDir="webapps/ROOT/";     //for deplyment use
    public static String paraSetFullName = "";
    //public static String paraSetPath = "e:/kevin/myCode/webSet";
    //public static String paraSetPath = "/home/admintx/syncSetExe";
    //public static String paraSetPath = "e:/kevin/myCode/sipphoneSet";
    //public static String paraSetPath = "e:/kevin/myCode/sipphoneUiSet";
    //==============================================
    //======================================
    public static int syssec_f = 0;
    public static int syssec_xor = 0x00;
    public static String nowIp_str = "";
    public static String nowSubmask_str = "";
    public static String nowMac_str = "";
    public static String macStr;
    public static String startTime="";
    public static int loaded_f=0;
    //======================================
    //public static String paraSetPath = "e:/kevin/myCode/webServletBase/web/user-sync";
    
    public static String webSrcPath = "";
    public static String rootPath = "";
    public static String webRootPath = "";
    public static String exePath = "";
    public static HashMap<String, String> requestPara;
    public static int os = 2; //0: not defined, 1: win, 2: linux, 3: mac, 4: sunos
    public static HashMap<String, String> paraMap = new HashMap();
    public static HashMap<String, String> userParaMap = new HashMap();

    public static void init() {
        if(GB.osInx==0){
            sourceDir = "web/";
            paraSetFullName=winParaSetFullName;
        }
        else{
            sourceDir="webapps/ROOT/";
            paraSetFullName=linuxParaSetFullName;
        }

    }
}

