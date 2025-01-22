package org.kevin;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 *
 * @author kevin
 */
public final class Root {

    static final Logger log = Logger.getLogger(Root.class);
    static Connection con1;

//kv:Every new Connect to web server index.jsp will establish Root     
//==========================================================
    public Root(HashMap<String, String> requestPara, String realPath) {
        int i;
        String[] strA;
        strA = realPath.split("/");
        String srcPath = "";
        if (GB.loaded_f != 0) {
            return;
        }
        GB.loaded_f = 1;
        GB.requestPara = requestPara;
        for (i = 0; i < strA.length - 2; i++) {
            srcPath = srcPath + strA[i] + "/";
        }
        GB.rootPath=srcPath;
        GB.webSrcPath=srcPath+"web/";
        GB.webRootPath = realPath;
        GB.exePath = System.getProperty("user.dir");
        System.out.println("webRootPath = " + GB.webRootPath);
        System.out.println("exePath = " + GB.exePath);
        //==========================================================
        String fileName = GB.rootPath + "/" + GB.appName + ".properties";
        String wstr = "";
        wstr += "\nlog4j.rootLogger=DEBUG, consoleout, fileout";
        wstr += "\nlog4j.appender.consoleout=org.apache.log4j.ConsoleAppender";
        wstr += "\nlog4j.appender.consoleout.Target=System.out";
        wstr += "\nlog4j.appender.consoleout.layout=org.apache.log4j.PatternLayout";
        wstr += "\nlog4j.appender.consoleout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %p %c:%L - %m%n";
        wstr += "\nlog4j.appender.fileout=org.apache.log4j.RollingFileAppender";
        wstr += "\nlog4j.appender.fileout.File=" + GB.rootPath + "log/" + GB.appName + ".log";
        wstr += "\nlog4j.appender.fileout.MaxFileSize=5MB";
        wstr += "\nlog4j.appender.fileout.MaxBackupIndex=10";
        wstr += "\nlog4j.appender.fileout.layout=org.apache.log4j.PatternLayout";
        wstr += "\nlog4j.appender.fileout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n";

        BufferedWriter outf = null;
        try {
            outf = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(fileName), "UTF-8"));
            outf.write(wstr);
            outf.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        PropertyConfigurator.configure(fileName);
        //=============================================
        //Base3.log.debug("This is a Debug Information.");    //debug層級
        //Base3.log.info("This is a Info Information.");      //info層級
        //Base3.log.warn("This is a Warn Information.");      //warn層級
        //Base3.log.error("This is a Error Information.");    //error層級
        //Base3.log.fatal("This is a Fatal Information.");    //fatal層級        
        //===============================================
        log.info("Web Base Program Start");
        //===============================================
        GB.init();
        GB.paraMap.clear();
        Lib.readSetdataFileToPara(GB.rootPath + "setdata.xml", GB.paraMap);
        con1 = Root.dbConnect(null);
        Root.readDatabaseToPara(con1);//read database parameters to reg
        netInf(1);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/dd/MM HH:mm:ss");
        Date date = new Date();
        GB.startTime = formatter.format(date);

    }

    //logLevel 0 debug    
    //logLevel 1 information
    //logLevel 2 warning
    //logLevel 3 error
    //logLevel 4 falut
    public String netInf(int ww) {
        InetAddress ip;
        int i;
        int sti;
        String str = null;
        String localIp = null;
        try {
            Enumeration e = NetworkInterface.getNetworkInterfaces();
            while (e.hasMoreElements()) {
                NetworkInterface n = (NetworkInterface) e.nextElement();
                Enumeration ee = n.getInetAddresses();
                while (ee.hasMoreElements()) {
                    InetAddress ia = (InetAddress) ee.nextElement();
                    str = ia.getHostAddress();
                    sti = str.indexOf("192.168.");
                    if (sti >= 0) {
                        localIp = str;
                    }
                }
            }
            if (localIp == null) {
                return str;
            }
            //========================================================================
            ip = InetAddress.getByName(localIp);
            GB.nowIp_str = ip.getHostAddress();
            NetworkInterface network = NetworkInterface.getByInetAddress(ip);
            short prflen = network.getInterfaceAddresses().get(0).getNetworkPrefixLength();
            int shft = 0xffffffff << (32 - prflen);
            int oct1 = ((byte) ((shft & 0xff000000) >> 24)) & 0xff;
            int oct2 = ((byte) ((shft & 0x00ff0000) >> 16)) & 0xff;
            int oct3 = ((byte) ((shft & 0x0000ff00) >> 8)) & 0xff;
            int oct4 = ((byte) (shft & 0x000000ff)) & 0xff;
            GB.nowSubmask_str = oct1 + "." + oct2 + "." + oct3 + "." + oct4;
            byte[] mac = network.getHardwareAddress();
            GB.nowMac_str = "";
            for (i = 0; i < mac.length; i++) {
                if (i != 0) {
                    GB.nowMac_str += "-";
                }
                GB.nowMac_str += String.format("%02X", mac[i]);
            }

            //Info printouts
            //System.out.println("Info:\nCanonical Host Name: " + canonicalHostName + "\nHost Name: " + hostName + "\nDefault Gateway Leftover: " + defaultGatewayLeftover + "\n");
            //System.out.println("Default Gateway Addresses:\n" + printAddresses(InetAddress.getAllByName(defaultGatewayLeftover)));            
            //Root.log(1, "Current ip address : " + GB.nowIp_str);
            //Root.log(1, "Current submask : " + GB.nowSubmask_str);
            //Root.log(1, "Current mac : " + GB.nowMac_str);
            //===========================================================================
            String syssec = GB.paraMap.get("syssec");

            str = "";
            if (mac.length < 6) {
                GB.syssec_f = 1;
            } else {
                GB.macStr = "" + (mac[0] & 255);
                GB.macStr += "." + (mac[1] & 255);
                GB.macStr += "." + (mac[2] & 255);
                GB.macStr += "." + (mac[3] & 255);
                GB.macStr += "." + (mac[4] & 255);
                GB.macStr += "." + (mac[5] & 255);
                str = encSyssec(mac);
            }
            if (str.equals(syssec)) {
                GB.syssec_f = 1;
            } else {
                if (ww != 0) {
                    Root.editNewDb(con1, "syssec", str);
                    GB.paraMap.put("syssec", syssec);
                }
            }

        } catch (UnknownHostException | SocketException e) {
            log.info("NetInf Error !!!");
        }
        return str;
    }

    public String encSyssec(byte[] mac) {
        String str = "";
        byte[] enckey = new byte[8];
        byte[] hop = new byte[8];
        hop[1] = (byte) (mac[0] & 255);
        hop[2] = (byte) (mac[1] & 255);
        hop[3] = (byte) (mac[2] & 255);
        hop[4] = (byte) (mac[3] & 255);
        enckey[0] = (byte) (mac[0] & 255);
        enckey[1] = (byte) (mac[1] & 255);
        enckey[2] = (byte) (mac[2] & 255);
        enckey[3] = (byte) (mac[3] & 255);
        enckey[4] = (byte) (mac[4] & 255);
        enckey[5] = (byte) (mac[5] & 255);
        enckey[6] = (byte) (GB.syssec_xor);
        enckey[7] = (byte) (GB.syssec_xor);
        Lib.dechop(hop, enckey);
        str += Integer.toString(hop[1] & 255);
        str += Integer.toString(hop[2] & 255);
        str += Integer.toString(hop[3] & 255);
        str += Integer.toString(hop[4] & 255);
        return str;

    }

    static Connection dbConnect(Connection con) {
        if (con != null) {
            return con;
        }
        try {
            String dbPath = GB.rootPath + "setdata.db";
            Class.forName("org.sqlite.JDBC");
            Connection newCon = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
            newCon.setAutoCommit(false);
            return newCon;
        } catch (Exception ex) {
            ex.printStackTrace();
            log.info("Connect Database Error !!!");
        }
        return null;
    }

    static void readDatabaseToPara(Connection con) {
        try {
            Connection con1 = Root.dbConnect(con);
            java.sql.Statement stmt = con1.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM paraTable;");
            String paraName = "";
            String paraValue = "";
            while (rs.next()) {
                paraName = rs.getString("paraName");
                paraValue = rs.getString("paraValue");
                GB.paraMap.put(paraName, paraValue);
            }
            rs.close();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("readDatabaseToPara !!!");
        }
    }

    static boolean editNewDb(Connection con, String name, String value) {
        Statement stmt;
        String sql;
        int line;
        try {
            Connection con1 = Root.dbConnect(con);
            stmt = con1.createStatement();
            sql = "UPDATE paraTable set paraValue = \"";
            sql = sql + value;
            sql = sql + "\" where paraName=\"";
            sql = sql + name;
            sql = sql + "\";";
            line = stmt.executeUpdate(sql);
            if (line == 0) {
                sql = "INSERT INTO paraTable ";
                sql += "VALUES ('";
                sql += name;
                sql += "','";
                sql += value;
                sql += "')";
                stmt.executeUpdate(sql);
            }
            con1.commit();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("editNewDb Error !!!");
            return false;
        }
        return true;
    }

//==============================================================================
    public static boolean checkDb(Connection con, String paraName) {
        String dbPath = GB.webRootPath + "setdata.db";
        String sbuf;
        boolean ret = false;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            sbuf = "SELECT 1 FROM paraTable WHERE paraName = '" + paraName + "';";
            ResultSet rs = stmt.executeQuery(sbuf);
            if (!rs.isBeforeFirst()) {
                ret = true;
            } else {
                ret = false;
            }
            rs.close();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("checkDb Error !!!");
        }
        return ret;
    }

    public static String readDb(Connection con, String paraName) {
        String paraValue;
        String sbuf;
        String ret = null;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            sbuf = "SELECT * FROM paraTable WHERE paraName = '" + paraName + "';";
            ResultSet rs = stmt.executeQuery(sbuf);
            while (rs.next()) {
                paraValue = rs.getString("paraValue");
                ret = paraValue;
                break;
            }
            rs.close();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("checkDb Error !!!");
            return null;
        }
        return ret;
    }
  
    public static int editDb(Connection con, String paraName, String paraValue) {
        String sql;
        int chgLine = 0;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            //UPDATE paraTable set 
            sql = "UPDATE paraTable set paraValue = \"";
            sql = sql + paraValue;
            sql = sql + "\" where paraName=\"";
            sql = sql + paraName;
            sql = sql + "\";";
            chgLine = stmt.executeUpdate(sql);
            con1.commit();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("editDb Error !!!");
            return 0;
        }
        return chgLine;
    }

    public static int insertDb(Connection con, String paraName, String paraValue) {
        String sql;
        int chgLine = 0;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            sql = "INSERT INTO paraTable VALUES ('";
            sql += paraName;
            sql += "','";
            sql += paraValue;
            sql += "');";
            chgLine = stmt.executeUpdate(sql);
            con1.commit();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("insertDb Error !!!");
            return 0;
        }
        return chgLine;
    }

    public static int deleteDb(Connection con, String paraName) {
        String sql;
        int chgLine = 0;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            //UPDATE paraTable set 
            sql = "DELETE from paraTable where paraName=\"";
            sql = sql + paraName;
            sql = sql + "\";";
            chgLine = stmt.executeUpdate(sql);
            con1.commit();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("deleteDb Error !!!");
            return 0;
        }
        return chgLine;
    }

    public static int deleteAllDb(Connection con) {
        String sql;
        int chgLine = 0;
        try {
            Connection con1 = Root.dbConnect(con);
            //==============================================
            java.sql.Statement stmt = con1.createStatement();
            //UPDATE paraTable set 
            sql = "DELETE from paraTable;";
            chgLine = stmt.executeUpdate(sql);
            con1.commit();
            stmt.close();
            if (con == null) {
                con1.close();
            }
        } catch (Exception ex) {
            log.info("deleteAllDb Error !!!");
            return 0;
        }
        return chgLine;
    }

}
