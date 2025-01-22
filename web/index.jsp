<%-- 
    Document   : index
    Created on : 2024年4月17日, 上午11:14:06
    Author     : Kevin
--%>

<%@page import="java.util.HashMap"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Enumeration"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="org.kevin.*" %>

<!DOCTYPE html>
<html>
    <%

        String strPath;
        String webRootPath = application.getRealPath("/").replace('\\', '/');
        String str = "";
        Enumeration headerNames = request.getHeaderNames();
        HashMap<String, String> requestPara = new HashMap();
        while (headerNames.hasMoreElements()) {
            String paraName = (String) headerNames.nextElement();
            String paraValue = request.getHeader(paraName);
            requestPara.put(paraName, paraValue);
        }
        GB.requestPara = requestPara;
        GB.webRootPath = webRootPath;
        new Root(requestPara, webRootPath);
        //=================================
        String file = webRootPath + "root.html";
        BufferedReader reader = new BufferedReader(new FileReader(file));
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        String ls = System.getProperty("line.separator");
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append(ls);
        }
        stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        reader.close();
        String content = stringBuilder.toString();
        out.println(content);
        //=================================
%>     

</html>
