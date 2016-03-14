 var filmset = [
    {operater_id:"MS_199412",operater_name:"张飞1",no:"A000001",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_199213",operater_name:"张飞2",no:"A000002",address:"广东省深圳市地址 ",sex:"女",tel:123456789},
    {operater_id:"MS_199111",operater_name:"张飞3",no:"A000003",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_199999",operater_name:"张飞4",no:"A000004",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_198887",operater_name:"张飞5",no:"A000005",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_145445",operater_name:"张飞6",no:"A000006",address:"广东省深圳市地址 ",sex:"女",tel:123456789},
    {operater_id:"MS_135455",operater_name:"张飞7",no:"A000007",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_234445",operater_name:"张飞8",no:"A000008",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    {operater_id:"MS_565465",operater_name:"张飞9",no:"A000009",address:"广东省深圳市地址 ",sex:"男",tel:123456789},
    
  ];

webix.ready(function(){
webix.ui.fullScreen();
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >所有操作员</span>&nbsp;/&nbsp;&nbsp; AllOperater",
    height:45,
    borderless:true 
  };
  var my_table={
        view:"datatable",
        id:"mydatatable",     
        columns:[
          {id:"operater_id",header:"操作员id",fillspace:true,sort:"string",editor:"text"},
          {id:"operater_name",header:"操作员姓名",fillspace:true,editor:"text"},
          {id:"no",header:"卡号",fillspace:true,editor:"text"},
          {id:"sex",header:"性别",fillspace:true,editor:"text"},
          {id:"tel",header:"联系方式",fillspace:true,editor:"text"},
          {id:"address",header:"地址",fillspace:true,editor:"text"},
          //删除
          { id:"",
            template:"{common.trashIcon()}删除",
            css:"padding_less",
            width:120
          },
         
        ],
        height:window.screen.height*0.6,    
        select:true,
        data:filmset,//url:当是外来数据时用这个
        // url:"http://192.168.1.111:9001/Application/demo"
      };
      var my_toolbar={
        view:"toolbar",
        id:"mytoolbar",
        elements:[           
          {
            view:"text",
            id:"s1",
            name:"s1",
            label:"操作员id:",
            width:300
          },
          {
            view:"text",
            id:"s2",
            label:"操作员姓名:",
            labelWidth:105,
            width:300
          },
          {view:"button",value:"查询",width:50,click:"select",css:"btn_check"},
          {view:"button",value:"添加操作员",width:100,click:"addRow",css:"btn_check"},
          {view:"button",value:"确认添加",width:80,click:"confirm",css:"btn_check"}
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
        // {
        //   cols:[
        //     page,
        //     {view:"text",label:"跳转至",id:"Tpage",labelWidth:60,width:120,css:{"margin-top":"20px!important"}},
        //     {view:"button",label:"确定",width:50,css:{"margin-top":"20px!important","margin-right":"120px!important"},click:"change"}
        //   ]
        // }
    ],
  };
  webix.ui(web);//---webix.ui结束----

  // 实现删除
$$('mydatatable').on_click.padding_less=function(e, id, trg){
            $$("mydatatable").editStop();   
            $$("mydatatable").remove(id);
            return false;
  };
// $$("mytoolbar").elements["s1"].attachEvent("onChange", function(newv, oldv){
//   var name2=$$("s2").getValue();
//   console.log(newv);
//   console.log(name2);
//    if(newv==""&&name2==""){
//     location.reload();
//     }
//   }); 
$$("s1").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        var name2=$$("s2").getValue();
        if(value==""&&name2==""){
          location.reload();
        }
    }); 
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
var flag=true;
 //行id
  var row;
//添加一行
function addRow(){ 
  var dt=$$("mydatatable");
  if(flag){
    var id=dt.add({
    }); 
    row=id;
    console.log(row);
    dt.addRowCss(id, "newRow");
    dt.editRow(id);
    flag=false;
  }else{
    alert("请完成当前操作员添加");
    console.log(row);
    dt.editRow(row);
  }
  // var newPg=++text1.pageSize;
  // $$("pagerA").define("size",newPg);
  // dt.editRow(id);
};

//获取表格值并刷新
function confirm(){
  var dt=$$("mydatatable");
  dt.editStop();  
  var i=0; 
  var params=[];
  dt.eachRow(function(row){
    if(dt.hasCss(row,"newRow")==true){
      params=dt.getItem(row);
      if(params.operater_id==""){
          alert("请填写操作员id...");
           dt.editRow(row);
          return false;
        }
        if(params.operater_name==""){
          alert("请填写操作员姓名...");
          dt.editRow(row);
          return false;
        }
        if(params.no==""){
          alert("请填写卡号...");
          dt.editRow(row);
          return false;
        }
        if(params.sex==""){
          alert("请填写性别...");
          dt.editRow(row);
          return false;
        }
        if(params.tel==""){
          alert("请填写联系方式...");
          dt.editRow(row);
          return false;
        }
        if(params.address==""){
          alert("请填写地址...");
          dt.editRow(row);
          return false;
        }else{
          flag=true;
        }
      dt.removeRowCss(row, "newRow");
    }i++;    
  });
  // var json=JSON.stringify(params);
  console.log(params);
  // console.log(json);
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
  params=s1+"#"+s2;
  // alert(params);
  if(params=="#"){
    alert("请输入查询条件");
  }
  else{
    postData("212122213211",params,callback);
  }
}
function change(){
  //获取跳转的页数，传到后台
  var params=$$("Tpage").getValue();
  if(isNaN(params)){
    alert("请输入数字");
  }else{
  console.log(params);
  // postData("getCustomerList", params,callback);
  $$("pagerA").define("page",params-1);
  $$("pagerA").refresh();
  }
}