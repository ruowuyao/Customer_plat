 var filmset = [
    {currPage:199412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6.0*4F左旋刀",jg:3202870,sl:123456789},
    {currPage:197212,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6*r0.5粗",jg:3202870,sl:123456789},
    {currPage:197412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6-5.7-H0.58/0.6-L40-4F",jg:3202870},
    {currPage:196612,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"2.5*90开粗",jg:3202870,sl:123456789},
    {currPage:196412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"4*90高光",jg:3202870,sl:123456789},
    {currPage:199412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6.0*4F左旋刀1",jg:3202870,sl:123456789},
    {currPage:197212,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6*r0.5粗1",jg:3202870,sl:123456789},
    {currPage:197412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D6-5.7-H0.58/0.6-L40-4F1",jg:3202870},
    {currPage:196612,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"2.5*90开粗1",jg:3202870,sl:123456789},
    {currPage:196412,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"4*90高光1",jg:3202870,sl:123456789},
    {currPage:195712,gysbh:"广东省深圳市地址 ",jianc:"dssass",gg:"D1.5-C0.25-4F",jg:3202870,sl:123456789}
  ];

webix.ready(function(){
webix.ui.fullScreen();
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >刀具库管理</span>&nbsp;/&nbsp;&nbsp; CutterManager",
    height:45,
    borderless:true 
  };
  var my_table={
        view:"datatable",
        id:"mydatatable",     
        columns:[
          {id:"gg",header:"刀具规格",fillspace:true,sort:"string",editor:"text"},
          {id:"gysbh",header:"供应商物料编码",fillspace:true,editor:"text"},
          {id:"currPage",header:"客户编码",fillspace:true,editor:"text"},
          {id:"jianc",header:"简称",fillspace:true,editor:"text"},
          {id:"jg",header:"单价",fillspace:true,editor:"text"},
          {id:"sl",header:"税率",fillspace:true,editor:"text"},
          //删除
          {id:"operate",header:"操作",fillspace:true,template:"<div><span class='padding_less'>{common.trashIcon()}删除</span>&nbsp;&nbsp;&nbsp<span onclick=\"edit('#gg#');\">{common.editIcon()}编辑</span></div>"}
          // { id:"",
          //   template:"{common.trashIcon()}删除,{common.editIcon()}编辑",
          //   css:"padding_less",
          //   width:120
          // }
        ],
        height:600,      
        select:true,
        data:filmset,//url:当是外来数据时用这个
        // url:"http://192.168.1.111:9001/Application/demo"
      };
      var my_toolbar={
        view:"toolbar",
        elements:[           
          {
            view:"text",
            id:"s1",
            label:"刀具规格:",
            width:300
          },
          {
            view:"text",
            id:"s2",
            label:"供应商物料编码:",
            labelWidth:135,
            width:300
          },
          {
            view:"text",
            id:"s3",
            label:"客户编码:",
            width:300
          },
          {view:"button",value:"查询",width:50,click:"select",css:"btn_check"},
          {view:"button",value:"添加刀具",width:80,click:"addRow",css:"btn_check"},
          {view:"button",value:"确认添加",width:80,click:"confirm",css:"btn_check"},
          {view:"button",value:"保存修改",width:80,click:"save",css:"btn_check"}
        ]   
      };
  var web={
    container:"body",
    type:"line",
    id:"mylayout",
    rows:[
        my_template,
        my_toolbar,
        my_table,
        page
    ],
  };
  webix.ui(web);//---webix.ui结束----

  // 实现删除
$$('mydatatable').on_click.padding_less=function(e, id, trg){
            $$("mydatatable").editStop();   
            $$("mydatatable").remove(id);
            return false;
        };
})

function callback(data){
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.page});
  $$('mydatatable').data.sync(data);
  $$("pagerA").define("limit",text1.totalPageCount);
  $$("pagerA").define("count",text1.totalCount);
  $$("pagerA").define("size",text1.pageSize);
  $$("pagerA").define("page",text1.currPage-1);
  $$('pagerA').refresh();
}
//添加一行
function addRow(){ 
  var dt=$$("mydatatable");
  var id=dt.add({
  }); 
  dt.addRowCss(id, "newRow");
  // var newPg=++text1.pageSize;
  // $$("pagerA").define("size",newPg);
  dt.editRow(id);
};

//获取表格值并刷新
function confirm(){
  var dt=$$("mydatatable");
  dt.editStop();   
  dt.eachRow(function(row){
    if(dt.hasCss(row,"newRow")==true){
      params=dt.getItem(row);
        if(params.gg==""){
          alert("请填写刀具规格...");
           dt.editRow(row);
          return false;
        }
        if(params.gysbh==""){
          alert("请填写供应商物料编码...");
          dt.editRow(row);
          return false;
        }
        if(params.currPage==""){
          alert("请填写客户编码...");
          dt.editRow(row);
          return false;
        }
        if(params.jianc==""){
          alert("请填写简称...");
          dt.editRow(row);
          return false;
        }
        if(params.jg==""){
          alert("请填写单价...");
          dt.editRow(row);
          return false;
        }
        if(params.sl==""){
          alert("请填写税率...");
          dt.editRow(row);
          return false;
        }
        dt.removeRowCss(row, "newRow");
        alert(params.gg);
     }    
  });
  // var originalPg=text1.pageSize;
  // alert(oldsize);
  // $$("pagerA").define("size",oldsize);
  // postData("http://192.168.1.111:9001/Application/demo", params,callback2);

}
//查询实现
function select(){
  params="";
  var s1=$$("s1").getValue();
  var s2=$$("s2").getValue();
  var s3=$$("s3").getValue();
  console.log(s1);
  console.log(s2);
  console.log(s3);
  params=s1+"#"+s2+"#"+s3;
  // alert(params);
  if(params=="##"){
    alert("请输入查询条件");
  }
  else{
    postData("",params,callback);
  }
  
}
function edit(gg){
  console.log(gg);
  var dt=$$("mydatatable");
  dt.eachRow(function(row){
    if(dt.getItem(row).gg==gg){
      dt.editRow(row);
      dt.addRowCss(row, "newRow2");
    }    
  });
}
function save(){
  var dt=$$("mydatatable");
  var params=[];
  var i=0;
  dt.editStop();   
  dt.eachRow(function(row){
    if(dt.hasCss(row,"newRow2")==true){
      params[i]=dt.getItem(row);
      dt.removeRowCss(row, "newRow2");
      console.log(params[i]);
      i++;
    }    
  });
   console.log(params);
}