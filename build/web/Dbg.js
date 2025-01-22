/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Dbg {
    constructor() {
    }

    getBuilderMenus() {
        var menus = this.getMenus("menu0", 8);
        var kvs0 = menus.kvTexts;
        kvs0[0].chnT = "";
        kvs0[0].image = "systemResource/color.png";
        
        kvs0[6].eng = "ComponentTest";
        kvs0[6].id = "componentTest";
        kvs0[6].menus=this.getMenus(kvs0[6].id, 8);
        var kvs1=kvs0[6].menus.kvTexts;
        //
        kvs0[7].eng = "DialogTest";
        kvs0[7].id = "dialogTest";
        kvs0[7].menus=this.getMenus(kvs0[0].id, 8);
        var kvs1=kvs0[7].menus.kvTexts;
        //===============================
        kvs1[0].id="testMesssageBox";
        kvs1[0].eng="Test MesssageBox";
        kvs1[0].image = "systemResource/icons8-info-64.png";
        kvs1[0].menus=this.getMenus(kvs1[0].id, 5);
        var kvs2=kvs1[0].menus.kvTexts;
        kvs2[0].id="mesBox";
        kvs2[0].eng="Show mesBox";
        kvs2[0].image = "systemResource/icons8-info-64.png";
        kvs2[1].id="warnBox";
        kvs2[1].eng="Show warnBox";
        kvs2[1].image = "systemResource/icons8-warning-48.png";
        kvs2[2].id="okBox";
        kvs2[2].eng="Show okBox";
        kvs2[2].image = "systemResource/icons8-ok-60.png";
        kvs2[3].id="errorBox";
        kvs2[3].eng="Show errorBox";
        kvs2[3].image = "systemResource/icons8-error-48.png";
        kvs2[4].id="checkBox";
        kvs2[4].eng="Show checkBox";
        kvs2[4].image = "systemResource/icons8-check-48.png";
        //================================
        kvs1[1].id="testSelectBox";
        kvs1[1].eng="Test SelectBox";
        kvs1[1].image = "systemResource/icons8-select-64.png";
        kvs1[1].menus=this.getMenus(kvs1[1].id, 4);
        var kvs2=kvs1[1].menus.kvTexts;
        kvs2[0].id="selectBox";
        kvs2[0].eng="Show selectBox";
        kvs2[0].image = "systemResource/icons8-selection-48.png";
        kvs2[1].id="selectOkBox";
        kvs2[1].eng="Show selectOkBox";
        kvs2[1].image = "systemResource/icons8-selection-48.png";
        kvs2[2].id="selectPageBox";
        kvs2[2].eng="Show selectPageBox";
        kvs2[2].image = "systemResource/icons8-page-100.png";
        kvs2[3].id="selectPageOkBox";
        kvs2[3].eng="Show selectPageOkBox";
        kvs2[3].image = "systemResource/icons8-page-64.png";
        //================================
        kvs1[2].id="testMdaList";
        kvs1[2].eng="Test Mdalist";
        kvs1[2].image = "systemResource/icons8-list-64.png";
        kvs1[2].menus=this.getMenus(kvs1[2].id, 2);
        var kvs2=kvs1[2].menus.kvTexts;
        kvs2[0].id="base.sys0";
        kvs2[0].eng="Show base.sys0";
        kvs2[0].image = "systemResource/icons8-list-50.png";
        kvs2[1].id="base.sys1";
        kvs2[1].eng="Show base.sys1";
        kvs2[1].image = "systemResource/icons8-listDark-50.png";
        //================================
        kvs1[3].id="testMdaContainer";
        kvs1[3].eng="Test MdaContainer";
        kvs1[3].image = "systemResource/icons8-container-64.png";
        kvs1[3].menus=this.getMenus(kvs1[3].id, 6);
        var kvs2=kvs1[3].menus.kvTexts;
        kvs2[0].id="base.page";
        kvs2[0].eng="Show base.page";
        kvs2[0].image = "systemResource/icons8-listPage-64.png";
        kvs2[1].id="base.table";
        kvs2[1].eng="Show base.table";
        kvs2[1].image = "systemResource/icons8-table-64.png";
        kvs2[2].id="base.free";
        kvs2[2].eng="Show base.free";
        kvs2[2].image = "systemResource/icons8-list-100.png";
        kvs2[3].id="dark.page";
        kvs2[3].eng="Show dark.page";
        kvs2[3].image = "systemResource/icons8-listDark-64.png";
        kvs2[4].id="dark.table";
        kvs2[4].eng="Show dark.table";
        kvs2[4].image = "systemResource/icons8-listDark-50.png";
        kvs2[5].id="dark.free";
        kvs2[5].eng="Show dark.free";
        kvs2[5].image = "systemResource/icons8-list-58.png";
        //================================
        kvs1[4].id="testContainerBox";
        kvs1[4].eng="Test ContainerBox";
        kvs1[4].image = "systemResource/icons8-container-64.png";
        kvs1[4].menus=this.getMenus(kvs1[4].id, 3);
        var kvs2=kvs1[4].menus.kvTexts;
        kvs2[0].id="base.page";
        kvs2[0].eng="Show base.page";
        kvs2[0].image = "systemResource/icons8-listPage-64.png";
        kvs2[1].id="base.table";
        kvs2[1].eng="Show base.table";
        kvs2[1].image = "systemResource/icons8-table-64.png";
        kvs2[2].id="base.free";
        kvs2[2].eng="Show base.free";
        kvs2[2].image = "systemResource/icons8-list-100.png";
        //================================
        kvs1[5].id="testSetLine";
        kvs1[5].eng="Test SetLine";
        kvs1[5].image = "systemResource/icons8-container-64.png";
        kvs1[5].menus=this.getMenus(kvs1[5].id, 16);
        var kvs2=kvs1[5].menus.kvTexts;
        kvs2[0].id="buttonActs";
        kvs2[0].eng="Show buttonActs";
        kvs2[0].image = "systemResource/icons8-listPage-64.png";
        kvs2[1].id="buttonOnOffs";
        kvs2[1].eng="Show buttonOnOffs";
        kvs2[1].image = "systemResource/icons8-table-64.png";
        kvs2[2].id="buttonSelect";
        kvs2[2].eng="Show buttonSelect";
        kvs2[2].image = "systemResource/icons8-list-100.png";
        kvs2[3].id="buttonChecks";
        kvs2[3].eng="Show buttonChecks";
        kvs2[3].image = "systemResource/icons8-listPage-64.png";
        kvs2[4].id="buttonRadio";
        kvs2[4].eng="Show buttonRadio";
        kvs2[4].image = "systemResource/icons8-table-64.png";
        kvs2[5].id="inputText";
        kvs2[5].eng="Show inputText";
        kvs2[5].image = "systemResource/icons8-list-100.png";
        kvs2[6].id="labelViews";
        kvs2[6].eng="Show labelViews";
        kvs2[6].image = "systemResource/icons8-list-100.png";
        kvs2[7].id="select";
        kvs2[7].eng="Show select";
        kvs2[7].image = "systemResource/icons8-list-100.png";
        kvs2[8].id="inputSelect";
        kvs2[8].eng="Show inputSelect";
        kvs2[8].image = "systemResource/icons8-list-100.png";
        kvs2[9].id="setLineBox";
        kvs2[9].eng="Show setLineBox";
        kvs2[9].image = "systemResource/icons8-list-100.png";
        kvs2[10].id="setOptsBox";
        kvs2[10].eng="Show setOptsBox";
        kvs2[10].image = "systemResource/icons8-list-100.png";
        kvs2[11].id="textArea";
        kvs2[11].eng="Show textArea";
        kvs2[11].image = "systemResource/icons8-list-100.png";
        
        
        //================================
        kvs1[6].id="testInputPad";
        kvs1[6].eng="Test Input Pad";
        kvs1[6].image = "systemResource/icons8-container-64.png";
        kvs1[6].menus=this.getMenus(kvs1[6].id, 8);
        var kvs2=kvs1[6].menus.kvTexts;
        kvs2[0].id="intPad";
        kvs2[0].eng="Show intPad";
        kvs2[0].image = "systemResource/icons8-listPage-64.png";
        kvs2[1].id="hexPad";
        kvs2[1].eng="Show hexPad";
        kvs2[1].image = "systemResource/icons8-table-64.png";
        kvs2[2].id="intPadBox";
        kvs2[2].eng="Show intPadBox";
        kvs2[2].image = "systemResource/icons8-list-100.png";
        kvs2[3].id="hexPadBox";
        kvs2[3].eng="Show hexPadBox";
        kvs2[3].image = "systemResource/icons8-listPage-64.png";
        kvs2[4].id="intHexPadBox";
        kvs2[4].eng="Show intHexPadBox";
        kvs2[4].image = "systemResource/icons8-table-64.png";
        kvs2[5].id="floatPadBox";
        kvs2[5].eng="Show floatPadBox";
        kvs2[5].image = "systemResource/icons8-table-64.png";
        kvs2[6].id="keyboardBox";
        kvs2[6].eng="Show keyboardBox";
        kvs2[6].image = "systemResource/icons8-list-100.png";
        kvs2[7].id="pickColorBox";
        kvs2[7].eng="Show pickColorBox";
        kvs2[7].image = "systemResource/icons8-list-100.png";
        
        return menus;
        
    }

    getTestMenus() {
        var menus = this.getMenus("menu0", 14);
        var kvs = menus.kvTexts;
        kvs[0].chnT = "";
        kvs[0].image = "systemResource/color.png";
        for (var i = 0; i < 14; i++) {
            var count = 8;
            if (i === 2)
                count = 2;
            if (i === 6)
                count = 40;
            menus.kvTexts[i].menus = this.getMenus("menu1." + i, count);
            if (i === 2)
                continue;
            if (i === 7)
                continue;
            var kvs = menus.kvTexts[i].menus.kvTexts;
            kvs[0].image = "systemResource/color.png";
            if (i === 4)
                kvs[3].chnT = "q12345566778989090000000";
            kvs[5].image = "systemResource/color.png";
            kvs[3].hotkeyText = 'ctr+t';
            kvs[4].type = "hLine";
            kvs[3].menus = this.getMenus("menu2", 10);
            kvs[5].menus = this.getMenus("menu2", 10);
            kvs[1].disable_f = 1;
        }
        return menus;
    }

    getMenus(id, times) {
        var menus = {};
        menus.id = id;
        var kvTexts = menus.kvTexts = [];
        for (var i = 0; i < times; i++) {
            var tobj = {};
            tobj.id = "itemId#" + i;
            tobj.objName = "textObj";
            tobj.type = "text";//default text,hLine
            tobj.eng = "Menu-" + i;
            //tobj.chnT = "測試--" + i;
            tobj.image = "";
            //tobj.image = "systemResource/color.png";
            //tobj.disable_f = 1;
            //tobj.hotkeyText = 'ctr+t';
            //tobj.type="hLine";
            kvTexts.push(tobj);
        }
        return menus;
    }
    
    getButtonsType(){
        var types=[];
        types.push("Component~Cp_base~button.sys0");
        types.push("Component~Cp_base~button.sys1");
        types.push("Component~Cp_base~button.sys2");
        types.push("Component~Cp_base~button.sys3");
        types.push("Component~Cp_base~button.sys4");
        types.push("Component~Cp_base~button.list");
        types.push("Component~Cp_base~button.none");
        types.push("Component~Cp_base~button.menu0");
        types.push("Component~Cp_base~button.sys0");
        types.push("Component~Cp_base~button.sys0");
        return types;
        
    }

}

var dbg = new Dbg();


