/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.animation.KeyValue;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.kevin.*;

/**
 *
 * @author Kevin
 */
public final class MainServlet extends HttpServlet {

    RetData retData = new RetData();
    KvJson kj = new KvJson();

    public MainServlet() {
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            // TODO output your page here. You may use following sample code. 
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet MainServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet MainServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String filePath;
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        JSONObject webInJo = new JSONObject();
        JSONObject webOutJo = new JSONObject();
        if (isMultipart) {
            //int maxFileSize = 50 * 1024;
            //int maxMemSize = 4 * 1024;
            File file;
            DiskFileItemFactory factory = new DiskFileItemFactory();
            // maximum size that will be stored in memory
            //factory.setSizeThreshold(maxMemSize);
            // Location to save data that is larger than maxMemSize.
            factory.setRepository(new File("c:\\temp"));
            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
            // maximum file size to be uploaded.
            //upload.setSizeMax(maxFileSize);
            try {
                // Parse the request to get file items.
                List fileItems = upload.parseRequest((RequestContext) request);
                // Process the uploaded file items
                Iterator i = fileItems.iterator();
                while (i.hasNext()) {
                    FileItem fi = (FileItem) i.next();
                    //if (!fi.isFormField()) {
                    if (!fi.isFormField()) {
                        // Get the uploaded file parameters
                        String fieldName = fi.getFieldName();
                        String fileName = fi.getName();
                        String contentType = fi.getContentType();
                        boolean isInMemory = fi.isInMemory();
                        long sizeInBytes = fi.getSize();
                        //=======================================================
                        System.out.println("fieldName=  " + fieldName);
                        System.out.println("fileName=  " + fileName);
                        System.out.println("contentType=  " + contentType);
                        System.out.println("isInMemory=  " + isInMemory);
                        System.out.println("sizeInBytes=  " + sizeInBytes);
                        //========================================================
                        String[] strF = fieldName.split("~");
                        switch (strF[0]) {
                            case "unzipFileToDir":
                                file = new File(GB.webRootPath + "tmp.zip");
                                if (file.exists()) {
                                    file.delete();
                                }
                                fi.write(file);
                                File dirFile = new File(GB.webRootPath + strF[1]);
                                if (dirFile.exists() && dirFile.isDirectory()) {
                                    Lib.deleteDir(dirFile);
                                }
                                Lib.unzipFile(GB.webRootPath + "tmp.zip", GB.webRootPath);
                                file.delete();
                                break;

                            case "saveFileToDir":
                                filePath = GB.webRootPath + strF[1] + "/";
                                if (strF.length >= 3) {
                                    file = new File(filePath + strF[2]);
                                } else {
                                    file = new File(filePath + fileName);
                                }
                                fi.write(file);
                                break;

                        }

                    }
                }

                JSONObject outJo = new JSONObject();
                JSONObject outOpts = new JSONObject();
                putJoO(outJo, "act", "filesProcess");
                putJoO(outJo, "type", "response");
                putJoO(outJo, "responseMessage", "Commands OK !");
                putJoJo(outJo, "opts", outOpts);
                response.setContentType("application/json;charset=utf-8");//指定返回的格式为JSON格式
                try (PrintWriter out = response.getWriter()) {
                    out.print(outJo);
                }
            } catch (Exception ex) {
                System.out.println(ex.toString());
            }
            return;
        }
        //===========================================================
        request.setCharacterEncoding("UTF-8");
        StringBuilder strBuilder = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        String webInJoStr;
        JSONObject tempJo;
        //==========================================================
        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        //==========================================================
        while ((line = reader.readLine()) != null) {
            strBuilder.append(line);
        }
        webInJoStr = strBuilder.toString();
        try {
            webOutJo.put("act", "none");
            webOutJo.put("type", "response");
            webOutJo.put("status", "error");
            webOutJo.put("message", "Command Format Error !!!");
            switch (webInJoStr.charAt(0)) {
                case '[': {
                    JSONArray webInJa = new JSONArray(webInJoStr);
                    //========================
                    //....
                    //========================
                    break;
                }
                case '{': {
                    webInJo = new JSONObject(webInJoStr);
                    if (!webInJo.get("type").toString().equals("command")) {//command or response
                        break;
                    }
                    if (!kj.rJo(webInJo, "retOpts")) {
                        webOutJo.put("retOpts", kj.valueJo);
                    }
                    anaJo(webInJo, webOutJo);
                    break;
                }
                default:
                    break;
            }

        } catch (JSONException ex) {
            Logger.getLogger(MainServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        //====================================================
        response.setContentType("application/json;charset=utf-8");//指定返回的格式为JSON格式
        PrintWriter outPrint = response.getWriter();
        outPrint.print(webOutJo);
        outPrint.close();

    }

    public HashMap<String, Object> getParas() {
        HashMap<String, Object> paraMap = new HashMap();
        //String fileName = GB.webRootPath + "user-" + "webIcs" + "/paraSet.json";
        String fileName = GB.paraSetPath + "/paraSet.json";
        File file = new File(fileName);
        if (file.exists() && !file.isDirectory()) {
            String jsonStr = Lib.readStringFile(fileName);
            if (jsonStr == null) {
                return paraMap;
            }
            try {
                JSONObject jsObj = new JSONObject(jsonStr);
                Iterator<String> it = jsObj.keys();
                while (it.hasNext()) {
                    String key = it.next();
                    Object obj = jsObj.get(key);
                    paraMap.put(key, obj);
                }
                return paraMap;
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return paraMap;

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    public void putJoO(JSONObject jo, String key, Object value) {
        try {
            jo.put(key, value);//添加元素
        } catch (JSONException ex) {
            Logger.getLogger(MainServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void putJoJo(JSONObject jo, String key, JSONObject sonJo) {
        try {
            jo.put(key, sonJo);//添加元素
        } catch (JSONException ex) {
            Logger.getLogger(MainServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String getJoToStr(JSONObject jo, String key) {
        try {
            return jo.get(key).toString();
        } catch (JSONException ex) {
            return "";
        }
    }

    public void anaStr(String inpJo, JSONObject outJo) {

    }

    public void anaJoA(JSONObject in, JSONObject outxxx) {
        //in.get(0).getJSONObject("Data").getJSONArray("Phone").get(0);        
        Object obj;
        try {
            obj = in.getJSONArray("tmp").get(0);

        } catch (JSONException ex) {
            Logger.getLogger(MainServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public boolean geJoToRetStr(JSONObject in, String name) {
        this.retData.err_f = false;
        try {
            this.retData.retStr = in.get(name).toString();

        } catch (JSONException ex) {
            this.retData.err_f = true;
            return false;
        }
        return true;
    }

    public boolean geJoToRetType(JSONObject in, String name) {
        this.retData.err_f = false;
        try {
            this.retData.retObj = in.get(name);//.toString();
            Class cls = this.retData.retObj.getClass();
            String type = cls.getSimpleName();
            switch (type) {
                case "String":
                    this.retData.retStr = (String) this.retData.retObj;
                    break;
                case "Integer":
                    this.retData.reti = (int) this.retData.retObj;
                    break;
                case "Double":
                case "Float":
                    this.retData.retf = (float) this.retData.retObj;
                    break;
                default:
                    this.retData.retStr = this.retData.retObj.toString();
            }
        } catch (JSONException ex) {
            this.retData.err_f = true;
            return false;
        }
        return true;
    }

    public void loadOutJoResponseError(JSONObject inOptsJo, JSONObject outJo, String errStr) {
        String responseType = "response none";
        if (geJoToRetStr(inOptsJo, "responseType")) {
            responseType = this.retData.retStr;
        }
        switch (responseType) {
            case "responseDialogOk":
            case "responseDialogError":
            case "responseDialogErrorMessageOk":
                putJoO(outJo, "responseType", "dialogError");
                break;
            case "messageOk":
            case "messageError":
                putJoO(outJo, "responseType", "messageError");
                break;
            default:
                putJoO(outJo, "responseType", responseType);
                break;
        }
        putJoO(outJo, "responseMessage", errStr);

    }

    public void loadOutJoResponseOk(JSONObject optsJso, JSONObject outJso, String okStr) {
        geJoToRetStr(optsJso, "responseType");
        if (this.retData.err_f) {
            putJoO(outJso, "responseType", "response none");
        } else {
            switch (this.retData.retStr) {
                case "responseDialogOk"://ok or error
                    putJoO(outJso, "responseType", "dialogOk");
                    break;
                case "responseErrorMessageOk":
                case "messageOk":
                    putJoO(outJso, "responseType", "messageOk");
                    break;
                default:
                    putJoO(outJso, "responseType", "responseNone");
                    break;
            }
        }
        putJoO(outJso, "responseMessage", okStr);
    }

    public HashMap<String, String> getUsreParaMap(String userName) {
        HashMap<String, String> paraMap = new HashMap();
        String fileName = GB.webRootPath + "user-" + userName + "/paraSet.json";
        File file = new File(fileName);
        if (file.exists() && !file.isDirectory()) {
            String jsonStr = Lib.readStringFile(fileName);
            if (jsonStr == null) {
                return paraMap;
            }
            try {
                JSONObject jsObj = new JSONObject(jsonStr);
                Iterator<String> it = jsObj.keys();
                while (it.hasNext()) {
                    String key = it.next();
                    String valueStr = (String) jsObj.get(key);
                    paraMap.put(key, valueStr);
                }
                return paraMap;
            } catch (Exception ex) {
            }
        }
        return paraMap;

    }

    public void anaJo(JSONObject inJo, JSONObject outJo) {
        String action;
        JSONObject inOptsJo;
        JSONObject inRetOptsJo;
        JSONObject outOptsJo = new JSONObject();
        String outStr;
        String filePath;
        String fileName;
        String appName;
        String userName;
        String password;
        String content;
        String typeStr;
        String initDir;
        String[] strA;
        RetClass retc;
        File file;

        try {
            action = inJo.get("act").toString();
            inOptsJo = new JSONObject(inJo.get("opts").toString());
            kj.wStr(outJo, "act", action);
            //====================================================================
            switch (action) {
                case "login":
                    kj.wStr(outJo, "message", "login Error !!!");
                    kj.jobj = inOptsJo;
                    if (kj.rStr("appName")) {
                        return;
                    }
                    appName = kj.valueStr;
                    if (kj.rStr("userName")) {
                        return;
                    }
                    userName = kj.valueStr;
                    if (kj.rStr("password")) {
                        return;
                    }
                    password = kj.valueStr;
                    //=======================================================
                    fileName = GB.webRootPath + "user-" + appName + "/systemSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'systemSet.json' error !!!");
                        return;
                    }
                    String systemSetContent = retc.valueStr;
                    //=======================================================                    
                    fileName = GB.webRootPath + "user-" + appName + "/userSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'userSet.json' error !!!");
                        return;
                    }
                    String userSetContent = retc.valueStr;
                    //=======================================================                    
                    fileName = GB.paraSetPath +  "/paraSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'paraSet.json' error !!!");
                        return;
                    }
                    String paraSetContent = retc.valueStr;
                    //=======================================================                    
                    fileName = GB.webRootPath + "user-" + appName + "/paraSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'paraSet.json' error !!!");
                        return;
                    }
                    //=======================================================                    
                    
                    JSONObject systemSetJo = new JSONObject(systemSetContent);
                    JSONObject paraSetJo = new JSONObject(paraSetContent);
                    JSONObject userSetJo = new JSONObject(userSetContent);
                    ArrayList<String> acounts = new ArrayList<String>();
                    kj.jobj = systemSetJo;
                    if (!kj.rStrA("systemAcounts")) {
                        for (int i = 0; i < kj.strAL.size(); i++) {
                            acounts.add(kj.strAL.get(i));
                        }
                    }
                    kj.jobj = paraSetJo;
                    if (!kj.rStrA("userAcounts")) {
                        for (int i = 0; i < kj.strAL.size(); i++) {
                            acounts.add(kj.strAL.get(i));
                        }
                    }

                    int pass = 0;
                    int user=0;
                    for (int i = 0; i < acounts.size(); i++) {
                        user=0;
                        strA = acounts.get(i).split("~");
                        if (strA.length != 3) {
                            continue;
                        }
                        if (!strA[0].equals(userName)) {
                            continue;
                        }
                        user=1;
                        if (!strA[2].equals(password)) {
                            break;
                        }
                        pass = 1;
                        break;
                    }
                    if(user==0 && pass==0){
                        kj.wStr(outJo, "message", "Login Error !!!");
                        return;
                    }
                    if(user==1 && pass==0){
                        kj.wStr(outJo, "message", "Password Error !!!");
                        return;
                    }
                    GB.paraSetMap = this.getParas();
                    kj.wObj(outOptsJo, "userSet", userSetJo);
                    kj.wStr(outOptsJo, "paraSet", paraSetContent);
                    kj.wObj(outOptsJo, "webIp", GB.nowIp_str);
                    kj.wObj(outJo, "opts", outOptsJo);
                    kj.wStr(outJo, "status", "ok");
                    kj.wStr(outJo, "message", "Login OK.");

                    break;
//=============================================================================================================================                    
                case "saveStringToFile":
                    kj.wStr(outJo, "message", "Command Format Error !!!");
                    kj.jobj = inOptsJo;
                    if (kj.rStr("appName")) {
                        return;
                    }
                    appName = kj.valueStr;
                    if (kj.rStr("fileName")) {
                        return;
                    }
                    fileName = kj.valueStr;
                    if("paraSet".equals(fileName))
                        fileName=GB.paraSetPath+"/"+"paraSet.json";
                    if (kj.rStr("content")) {
                        return;
                    }
                    content = kj.valueStr;
                    
                    
                    System.out.println("Write String To File: " + fileName);

                    BufferedWriter outf = new BufferedWriter(new OutputStreamWriter(
                            new FileOutputStream(fileName), "UTF-8"));
                    try {
                        outf.write(content);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    } finally {
                        outf.close();
                    }
                    kj.wObj(outJo, "opts", outOptsJo);
                    kj.wStr(outJo, "status", "ok");
                    kj.wStr(outJo, "message", "Write File OK.");
                    strA = fileName.split("/");
                    if (strA[strA.length - 1].equals("paraSet.json")) {
                        GB.paraSetMap = this.getParas();
                    }
                    break;
                    
                    
                    
                
                //****************************************************************************************************
                case "writeImageFile":
                    loadOutJoResponseError(inOptsJo, outJo, "writeImageFile Error !!!");
                    if (!geJoToRetStr(inOptsJo, "path")) {
                        break;
                    }
                    String path = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "value")) {
                        break;
                    }
                    JSONObject imageJso = new JSONObject(this.retData.retStr);
                    if (!geJoToRetStr(imageJso, "fileName")) {
                        break;
                    }
                    strA = this.retData.retStr.split("\\.");
                    String fullImageName = path + "/" + strA[0] + ".png";
                    if (!geJoToRetStr(imageJso, "width")) {
                        break;
                    }
                    int imageWidth = this.retData.reti;
                    if (!geJoToRetStr(imageJso, "height")) {
                        break;
                    }
                    int imageHeight = this.retData.reti;
                    Object obj = imageJso.get("data");
                    Class cls = obj.getClass();
                    String type = cls.getSimpleName();
                    JSONObject imageData = (JSONObject) obj;
                    int[] rgbaA = new int[imageWidth * imageHeight];
                    int imageDataLen = imageWidth * imageHeight;
                    for (int i = 0; i < imageDataLen; i++) {
                        int btr = (int) (imageData.get("" + (i * 4 + 0)));
                        int btg = (int) (imageData.get("" + (i * 4 + 1)));
                        int btb = (int) (imageData.get("" + (i * 4 + 2)));
                        int bta = (int) (imageData.get("" + (i * 4 + 3)));
                        rgbaA[i] = (bta) << 24;
                        rgbaA[i] += (btr) << 16;
                        rgbaA[i] += (btg) << 8;
                        rgbaA[i] += (btb);
                    }
                    if (!ImageHandle.createBmpFile(rgbaA, imageWidth, imageHeight, fullImageName)) {
                        break;
                    }

                    putJoO(outJo, "responseMessage", "Write OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;

                case "sonprg":
                    loadOutJoResponseError(inOptsJo, outJo, "sonprg Error !!!");
                    if (!geJoToRetStr(inOptsJo, "value")) {
                        break;
                    }
                    JSONObject sonprgJso = new JSONObject(this.retData.retStr);
                    if (!geJoToRetStr(sonprgJso, "sonprgName")) {
                        break;
                    }
                    if (this.retData.retStr.equals("Ics")) {
                        /*
                        ics.handleCommand(sonprgJso);
                        if (ics.errCnt > 0) {
                            loadOutJsoResponseError(inOptsJo, outJo, ics.errStr);
                            break;
                        }
                        putJoO(outOptsJo, "value", "{\"status\":\"OK\",\"message\":\"" + ics.okStr + "\"}");
                        putJoO(outJo, "responseMessage", "Son Command OK");
                        putJoJo(outJo, "opts", outOptsJo);
                         */
                    }
                    break;

                case "zipDir":
                    loadOutJoResponseError(inOptsJo, outJo, "zip file Error !!!");
                    if (!geJoToRetStr(inOptsJo, "dirName")) {
                        break;
                    }
                    String dirName = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "zipName")) {
                        break;
                    }
                    String zipName = GB.webRootPath + this.retData.retStr;
                    Lib.zipDir(dirName, zipName);
                    putJoO(outOptsJo, "value", "{'status':'zip ok'}");
                    putJoO(outJo, "responseMessage", "Zip Dir OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;


//=============================================================================================================================                    
                case "copyFile":
                    putJoO(outJo, "responseMessage", "Copy File Error!");
                    if (!geJoToRetStr(inOptsJo, "fromFileName")) {
                        break;
                    }
                    String fromFileName = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "toFileName")) {
                        break;
                    }
                    String toFileName = GB.webRootPath + this.retData.retStr;
                    file = new File(fromFileName);
                    if (!file.exists()) {
                        putJoO(outJo, "responseMessage", "File Source Is Not Exist !!!");
                        break;
                    }
                    if (!geJoToRetStr(inOptsJo, "overWrite")) {
                        file = new File(toFileName);
                        if (file.exists() && !file.isDirectory()) {
                            putJoO(outJo, "responseMessage", "File Destination Is Exist !!!");
                            break;
                        }
                    }
                    if (Lib.copyFile(fromFileName, toFileName) != 0) {
                        break;
                    }
                    putJoO(outJo, "responseMessage", "Copy File OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;
//=============================================================================================================================                    
                case "testServerResponse":
                    putJoO(outJo, "responseMessage", "Test Server OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;
                case "readFileNames":
                    putJoO(outJo, "responseMessage", "Read File Names Error!");
                    if (!geJoToRetStr(inOptsJo, "initDir")) {
                        return;
                    }
                    initDir = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "compareNames")) {
                        return;
                    }
                    String[] compareNames = this.retData.retStr.split(",");
                    ArrayList<String> alFileNames = Lib.readFileNames(initDir, compareNames);
                    outStr = Lib.stringListToString(alFileNames);
                    putJoO(outJo, "responseMessage", "Read File Names OK");
                    putJoO(outOptsJo, "value", outStr);
                    putJoJo(outJo, "opts", outOptsJo);
                    break;

                case "loadUserParaMap":
                    putJoO(outJo, "responseMessage", "loadUserParaMap Error!");
                    if (!geJoToRetStr(inOptsJo, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    GB.userParaMap = this.getUsreParaMap(userName);
                    putJoO(outOptsJo, "status", "OK");
                    putJoO(outJo, "responseMessage", "loadUserParaMap OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;

                case "saveStringToFilexxx":
                    putJoO(outJo, "responseMessage", "Save To File Error!");
                    if (!geJoToRetStr(inOptsJo, "fileName")) {
                        break;
                    }
                    fileName = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "value")) {
                        break;
                    }
                    System.out.println("fileName= " + fileName);

                    outf = new BufferedWriter(new OutputStreamWriter(
                            new FileOutputStream(fileName), "UTF-8"));
                    try {
                        outf.write(this.retData.retStr);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    } finally {
                        outf.close();
                    }
                    putJoO(outOptsJo, "status", "OK");
                    putJoO(outJo, "responseMessage", "Save To File OK");
                    putJoJo(outJo, "opts", outOptsJo);
                    strA = fileName.split("/");
                    if (strA[strA.length - 1].equals("paraSet.json")) {
                        GB.paraSetMap = this.getParas();

                    }

                    break;
                case "readFile":
                    putJoO(outJo, "responseMessage", "Read File Error!");
                    if (!geJoToRetStr(inOptsJo, "fileName")) {
                        break;
                    }
                    fileName = GB.webRootPath + this.retData.retStr;
                    String outName = null;
                    if (geJoToRetStr(inOptsJo, "outName")) {
                        outName = this.retData.retStr;
                    }
                    userSetContent = Lib.readStringFile(fileName);
                    if (userSetContent == null) {
                        putJoO(outJo, "responseMessage", "Read File \"" + fileName + "\" Error !!!");
                        break;
                    }
                    putJoO(outOptsJo, "value", userSetContent);
                    if (outName != null) {
                        putJoO(outOptsJo, "outName", outName);
                    }
                    putJoO(outJo, "responseMessage", "Read File OK!");
                    putJoO(outJo, "responseStatus", "ok");
                    putJoJo(outJo, "opts", outOptsJo);
                    break;

                case "deleteFilesInDir":
                    putJoO(outJo, "responseMessage", "Delete File Error !!!");
                    if (!geJoToRetStr(inOptsJo, "dir")) {
                        return;
                    }
                    String actDir = GB.webRootPath + this.retData.retStr;
                    if (!geJoToRetStr(inOptsJo, "fileNames")) {
                        return;
                    }
                    JSONArray jaFileNames = new JSONArray(this.retData.retStr);
                    String[] fileNames = Lib.toStringArray(jaFileNames);
                    ArrayList<String> fileNameList = new ArrayList<String>();

                    for (int ii = 0; ii < fileNames.length; ii++) {
                        filePath = actDir + "/";
                        file = new File(filePath + fileNames[ii]);
                        if (file.exists() && !file.isDirectory()) {
                            file.delete();
                            fileNameList.add(fileNames[ii]);
                        }
                    }
                    outStr = Lib.stringListToString(fileNameList);
                    putJoO(outJo, "responseMessage", "Delete Files OK.");
                    putJoO(outOptsJo, "value", outStr);
                    putJoJo(outJo, "opts", outOptsJo);
                    break;

            }

        } catch (Exception ex) {
            kj.wStr(outJo, "message", ex.toString().split("Exception:")[1]);
            Logger.getLogger(MainServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}

class RetData {

    boolean err_f = false;
    String errStr = "";
    String statusStr = "";
    String valueStr = "";
    String retStr = "";
    int reti = 0;
    float retf = 0;
    Object retObj;
    List<KeyValue> lsKeyValue = new ArrayList<>();
}
