var params= new Array();
webix.ready(function(){
  var clickColumnId;
  var clickRowId;
  webix.Date.startOnMonday = true;

  var calendar_window=webix.ui({
    view:"window",
    id:"my_window",
    move:true,
    head:{
      view:"toolbar",margin:-4,cols:[
        {},
        { view:"icon", icon:"times-circle",click:"$$('my_window').hide();"}
      ]
    },
    body:{
      view:"calendar",
      id:"my_calendar",
      type:"time"
    }, 
  });
  var my_template={
      template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >班别管理</span>&nbsp;/&nbsp;&nbsp;Class",
      height:45,
      borderless:true 
  };
  var my_toolbar={
    view:"toolbar",
    elements:[           
      {view:"button",value:"添加班别",width:100,click:'addRow()'},
      {view:"button",value:"保存",width:50,click:"save"}
    ]   
  };
  var my_datatable={
      view:"datatable",
      id:"mydatatable",     
      columns:[
        {id:"index",header:["序号"],fillspace:true},
        {id:"czy",header:["班别名称"],editor:"text",fillspace:true},
        {id:"lysl",header:"起始时间",editor:"text",fillspace:true},
        {id:"hssl",header:"截止时间",editor:"text",fillspace:true },
        {id:"del",header:"操作",template:'<button class="delbtn" id="del_btn" onclick=\"del();\">删除</button>',fillspace:true},  
      ],  
      onClick: {//删除一行班别事件
        "delbtn": function(e, id, trg) {//list_index指选中的工序
          $$("my_window").hide(); 
          dt.remove(id);
          console.log("2b");  
        } 
      },
      autoheight:true,      
      select:true,
      editable:true,
      checkboxRefresh:true,
      tooltip:true,
     //url:当是外来数据时用这个
      // url:"http://192.168.1.111:9001/Application/demo"
       data:my_class,
  };
  webix.editors.$popup = {
  date:{
     view:"popup",
     body:{ 
        view:"calendar",
        type:"time", 
     }
  }
};
  var web={
      container:"body",
      type:"line",
      id:"mylayout",
      rows:[
        my_template,
        my_toolbar,
        my_datatable
      ],
  };
  webix.ui(web);//---webix.ui结束----   
  var dt=$$("mydatatable");
  /*当点击开始和截止时间列时才允许弹出日历窗口*/
  dt.attachEvent("onItemClick",function(id, e, node){
    // $$("mylist").detachEvent(myEvent);
    clickColumnId=id.column;
    clickRowId=id.row;
    var timeNode = dt.getItemNode(id);
    if(clickColumnId=="hssl"||clickColumnId=="lysl"){
      $$("my_window").show(timeNode,{pos:"bottom"}); 
    } 
  })
  dt.attachEvent("onAfterEditStart", function(id){
      //... some code here ... 
  });
  /*将所选的时间赋值给点击的单元格并刷新界面*/
  $$('my_calendar').attachEvent("onAfterDateSelect", function(date){
    var values=dt.getItem(clickRowId);
    var format = webix.Date.dateToStr("%H:%i:00");
    var times = format(date); //2012.05
        values[clickColumnId] = times;
    dt.refresh();  
  });
  /*点击done按钮后，直接关闭window窗口*/
  $$("my_calendar").attachEvent("onChange", function(date){
    $$('my_window').hide(); 
  });
 webix.i18n.controls.window = "确定";
/*------all end---------*/
});             
/*添加一行班别*/
function addRow(){ 
  var dt=$$("mydatatable");
  var id=dt.add({
  }); 
  dt.addRowCss(id, "newRow");
  dt.edit({
        row:id,
        column:"czy"
});
  dt.focusEditor(); 
};

/*保存班别数据*/
function save(){
  var dt=$$("mydatatable");
  dt.eachRow(function(row){
    var rows=dt.getItem(row);
    params.push(rows.czy,rows.lysl,rows.hssl);
  });
  console.log(params);
  postData("http://192.168.1.111:9001/Application/demo", params,callback2);
}

function callback2(data){
  $$("mydatatable").define("url", "http://192.168.1.111:9001/Application/demo");
  $$("mydatatable").refresh();
}
/*var arr = new Array(3);
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr + "<br />")
document.write(arr.push("James") + "<br />")
document.write(arr)
*/

  

