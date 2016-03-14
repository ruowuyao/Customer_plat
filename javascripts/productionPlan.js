 var projectS=[];
webix.ready(function(){
  // 测试数据
   projectS=[
        {id:"1",value:"项目1"},
        {id:"2",value:"项目2"},
        {id:"3",value:"项目3"},
        {id:"4",value:"项目4"},
        {id:"5",value:"项目1"},
        {id:"6",value:"项目2"},
        {id:"7",value:"项目3"},
        {id:"8",value:"项目4"},
        {id:"9",value:"项目1"},
        {id:"10",value:"项目2"},
        {id:"11",value:"项目3"},
        {id:"12",value:"项目4"},
        {id:"13",value:"项目1"},
        {id:"14",value:"项目2"},
        {id:"15",value:"项目3"},
        {id:"16",value:"项目4"},
   ];
  var params={};//json对象
// 设置分页每页显示的大小
  params.pageSize =5;
  postData("getCustomerList", params,callback);
 var tabledata=[
        {plan:"计划1",project:"项目1",start:"2015-11-12",end:"2016-01-12",state:1},
        {plan:"计划2",project:"项目1",start:"2016-01-12",end:"2016-03-12",state:0},
        {plan:"计划3",project:"项目2",start:"2016-03-18",end:"2016-04-12",state:1},
        {plan:"计划4",project:"项目3",start:"2016-04-12",end:"2016-06-02",state:0},
        {plan:"计划5",project:"项目3",start:"2016-06-10",end:"2016-07-12",state:1},
        {plan:"计划6",project:"项目3",start:"2016-07-15",end:"2016-09-12",state:-1},
   ];
    var my_templaet={ 
        template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >生产计划</span>&nbsp;/&nbsp;&nbsp;ProductionPlan",
        height:45,
        borderless:true 
    };
    var my_toolbar={
        view:"toolbar",
        elements:[ 
        {view:"text",id:"jhmc",label:"计划名称",width:260,labelWidth:80},
        {view:"text",id:"xmmc",label:"项目名称",width:260,labelWidth:80},
        {
          view:"datepicker",
          id:"startDate",
          timepicker:true,
          label:"计划开始",
          labelAlign:"right", 
          name:"end",
          stringResult:true,
          format:"%Y-%m-%d %H:%i",
          width:240
        },
        {
          view:"datepicker",
          id:"endDate",
          timepicker:true,
          label:"计划结束",
          labelAlign:"right", 
          name:"end",
          format:"%Y-%m-%d %H:%i",
          stringResult:true,
          width:240
        },
        { view:"button", value:"查询",width:100,click:"select" },
        { view:"button", value:"安排计划",width:100,click:"plan" }
      ]   
    };
    var my_treetable={
        view:"datatable",
        columns:[
            { id:"plan",header:["计划名称", { content:"textFilter", placeholder:"请输入计划名称进行查询",}],fillspace:true},
            { id:"project",header:["项目名称",{ content:"textFilter", placeholder:"请输入项目名称进行查询",}],fillspace:true},
            { id:"state",header:"计划状态",fillspace:true,
              template:function(obj,type){
                if(obj.state==0){
                    return "在进行";
                }if(obj.state==1){
                    return "已完成";
                }if(obj.state==-1){
                    return "未完成";
                }      
              }
            },
            { id:"start",header:"开始时间",fillspace:true},
            { id:"end",header:"结束时间",fillspace:true}
        ],
        height:window.screen.height*0.6,
        data:tabledata,
        spans:true,
        select:"row",
    };
  
    var body=new webix.ui({
        fullscreen:true,
        container:"body",
        type:"line",
        id:"mylayout",
        rows:[
            my_templaet,
            my_toolbar,
            my_treetable,
            page
        ],//----rows结束----
    });//---webix.ui结束---- 
    // 原料入库表单模态框实现
var addForm=[
            {margin:50,cols:[
            {view:"text",id:"planName",name:"planName",width:300,label:"计划名称：",labelWidth:100},
            {view:"combo",id:"selectP",name:"selectP", width:300,label:"选择项目：",labelWidth:100,options:projectS},
        ]},
        {margin:50,cols:[
            {view:"datepicker",timepicker:true,stringResult:true,id:"start_date",name:"start_date",width:300,label:"开始时间：",labelWidth:100,format:"%Y-%m-%d %H:%i"},
            {view:"datepicker",timepicker:true,stringResult:true,id:"end_date",name:"end_date",width:300,label:"结束时间：",labelWidth:100,format:"%Y-%m-%d %H:%i"}
        ]},
        // 领料表格
        {
          view:"datatable",
          id:"tableA",
          editable:true,
          tooltip:true,
          columns:[],
          height:200
        },
        {view:"button",value:"确定",width:80,click:"sure", css:{"margin-left":"580px!important"}}
    ];
 var head={
      view:"toolbar", margin:-4, cols:[
        {view:"label", label: "安排计划" },
        { view:"icon", icon:"times-circle",
          click:"$$('win3').hide();"}
        ]
  };
  var body={
    view:"form",
    id:"form",
    // autoheight:true,
    // width:700,
    margin:20,
    elements:addForm
  };
  webix.ui({
    view:"window",
    id:"win3",
    position:"center",
    width:window.screen.width*0.5,
    height:window.screen.height*0.5,
    modal:true,
    move:true,
    head:head,
    body:body
  });
// $$("tableA").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
//    $$("tableA").editStop();
// });
  // $$("jhmc").attachEvent("onTimedKeyPress",function(){
  //       var value = this.getValue();
  //       var name2=$$("xmmc").getValue();
  //       var startDate=$$("startDate").getText();
  //       var endDate=$$("endDate").getText();
  //       if(value==""&&name2==""&&startDate==""&&endDate==""){
  //         location.reload();
  //       }
  //   }); 
  // $$("xmmc").attachEvent("onTimedKeyPress",function(){
  //       var value = this.getValue();
  //       var name2=$$("jhmc").getValue();
  //       var startDate=$$("startDate").getText();
  //       var endDate=$$("endDate").getText();
  //       if(value==""&&name2==""&&startDate==""&&endDate==""){
  //         location.reload();
  //       }
  //   }); 
  // $$("startDate").attachEvent("onChange",function(){
  //       var value = this.getValue();
  //       var name2=$$("jhmc").getValue();
  //       var name1=$$("xmmc").getValue();
  //       var endDate=$$("endDate").getText();
  //       if(value==""&&name2==""&&name1==""&&endDate==""){
  //         location.reload();
  //       }
  //   }); 
  // $$("endDate").attachEvent("onChange",function(){
  //       var value = this.getValue();
  //       var name2=$$("jhmc").getValue();
  //       var name1=$$("xmmc").getValue();
  //       var startDate=$$("startDate").getText();
  //       if(value==""&&name2==""&&startDate==""&&name1==""){
  //         location.reload();
  //       }
  //   }); 
});

function plan(){
   // $$('tableA').hideColumn();
    $$('tableA').config.columns = [];
// grid.refreshColumns();
   $$('tableA').refreshColumns();
  // var data = new webix.DataCollection({data:[]});
  // $$("tableA").data.sync(data);
$$("tableA").define("data",[]);
$$("tableA").refresh();
    $$('win3').show();
      // 选择项目
    $$("form").elements["selectP"].attachEvent("onChange", function(newv, oldv){
        // 从后台得到对应的工序、班别
       // webix.ajax().sync().post("getSuppliersCutterList", "supplier_name=" + newv,function(text, xml, xhr) {
               //tableD=$.parseJSON(text);//data为物料选项对应的表格其他数据
            //测试数据
            // 表格数据
            var tableD=[
                {gongxu:"工序1",banci1:"",banci2:"",banci3:""},
                {gongxu:"工序2",banci1:"",banci2:"",banci3:""},
                {gongxu:"工序3",banci1:"",banci2:"",banci3:""},
                {gongxu:"工序4",banci1:"",banci2:"",banci3:""}
            ];
            // 表头数据
            var columnD=[
                {id:"gongxu",header:"工序",fillspace:true},
                {id:"banci1",header:"早班",fillspace:true,editor:"text"},
                {id:"banci2",header:"中班",fillspace:true,editor:"text",},
                {id:"banci3",header:"晚班",editor:"text", fillspace:true}
            ];
            $$('tableA').define("columns", columnD);
            $$('tableA').refresh();
            $$('tableA').define("data", tableD);
            $$('tableA').refresh();
            // var data = new webix.DataCollection({data:tableD});
            // $$("tableA").data.sync(data);

       // });
     });
}
function sure(){
  var params={};
  var tableValues={};
  var flag1=false;
  var formdata=$$("form").getValues();
  if(formdata.planName==""){
    alert("请输入计划名称...");
    return false;
  }else if(formdata.selectP==""){
    alert("请选择项目...");
    return false;
  }else if(formdata.start_date==""){
    alert("请输入开始时间...");
    return false;
  }else if(formdata.end_date==""){
    alert("请输入结束时间...");
    return false;
  }else{
    flag1=true;
  }
  var i=0;
  if(flag1){
    $$("tableA").editStop(); 
    $$("tableA").eachRow( 
    function (row){
   // 遍历每一行，得到表格数据
        tableValues[i]= $$("tableA").getItem(row);
        i++;
       $$("tableA").editStop(); 
    });
  }
    params.tableValues=tableValues;
    params.formdata=formdata;
    console.log(params);
    // postData("http://192.168.1.111:9001/Application/demo",params,callback());
    // $$("tableA").clearAll();
    // $$('tableA').define("columns", []);
    // $$('tableA').refresh();
    // var data = new webix.DataCollection({data:[]});
    // $$("tableA").data.sync(data);
    $$('win3').getBody().clear();
    $$('win3').hide();
}
function callback(data){
  //第一次请求需要得到所有项目的选项以及已经安排的计划数据
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.data});
  $$('mydatatable').data.sync(data);
  //所有项目的选项
  //测试数据
 projectS=[
        {id:"1",value:"项目5"},
        {id:"2",value:"项目6"},
        {id:"3",value:"项目7"},
        {id:"4",value:"项目8"},
   ];
}
//查询实现
function select(){
  var storge_date1=$$("startDate").getText();
  var storge_date2=$$("endDate").getText();
  var pici=$$("jhmc").getValue();
  var pici1=$$("xmmc").getValue();
  params=pici+"#"+pici1+"#"+storge_date1+"#"+storge_date2;
  if(params=="###"){
    alert("请输入查询条件");
    return false;
  }
  alert(params);
  postData("",params,callback);
}