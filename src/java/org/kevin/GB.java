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

    public static int min_js_f = 0;
    static public String appName = "webServeletBase";
    public static Map<String,Object> paraSetMap=new HashMap();

    
    // Select 1 ====================================
    public static String sourceDir = "web/";          //for debug use
    //public static String sourceDir="webapps/ROOT/";     //for deplyment use
    //==============================================
    public static int osInx = 0;
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
    public static String paraSetPath = "e:/kevin/myCode/webServletBase/web/user-sync";
    public static String webSrcPath = "";
    public static String rootPath = "";
    public static String webRootPath = "";
    public static String exePath = "";
    public static HashMap<String, String> requestPara;
    public static int os = 1; //0: not defined, 1: win, 2: linux, 3: mac, 4: sunos
    public static HashMap<String, String> paraMap = new HashMap();
    public static HashMap<String, String> userParaMap = new HashMap();

    public static void init() {

    }
}

