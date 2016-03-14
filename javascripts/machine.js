 var filmset = [
    {gtmc:"1F000001",louceng:"1F"},
    {gtmc:"1F000002",louceng:"1F"},
    {gtmc:"1F000003",louceng:"1F"},
    {gtmc:"2F000001",louceng:"2F"},
    {gtmc:"3F000001",louceng:"3F"},
    {gtmc:"3F000002",louceng:"3F"},
    {gtmc:"3F000003",louceng:"3F"},
    {gtmc:"4F000001",louceng:"4F"},
    {gtmc:"5F000001",louceng:"5F"},
    {gtmc:"1F000001",louceng:"1F"},
    {gtmc:"1F000002",louceng:"1F"},
    {gtmc:"1F000003",louceng:"1F"},
    {gtmc:"2F000001",louceng:"2F"},
    {gtmc:"3F000001",louceng:"3F"},
    {gtmc:"3F000002",louceng:"3F"},
    {gtmc:"3F000003",louceng:"3F"},
    {gtmc:"4F000001",louceng:"4F"},
    {gtmc:"5F000001",louceng:"5F"},
    {gtmc:"1F000001",louceng:"1F"},
    {gtmc:"1F000002",louceng:"1F"},
    {gtmc:"1F000003",louceng:"1F"},
    {gtmc:"2F000001",louceng:"2F"},
    {gtmc:"3F000001",louceng:"3F"},
    {gtmc:"3F000002",louceng:"3F"},
    {gtmc:"3F000003",louceng:"3F"},
  ];
var data11 = [
    {gtmc:"4F000001",louceng:"4F"},
    {gtmc:"5F000001",louceng:"5F"},
    {gtmc:"1F000001",louceng:"1F"},
    {gtmc:"1F000002",louceng:"1F"},
    {gtmc:"1F000003",louceng:"1F"},
    {gtmc:"2F000001",louceng:"2F"},
    {gtmc:"3F000001",louceng:"3F"},
    {gtmc:"3F000002",louceng:"3F"},
    {gtmc:"3F000003",louceng:"3F"},
    {gtmc:"4F000001",louceng:"4F"},
    {gtmc:"5F000001",louceng:"5F"},
    {gtmc:"1F000001",louceng:"1F"},
    {gtmc:"1F000002",louceng:"1F"},
    {gtmc:"1F000003",louceng:"1F"},
    {gtmc:"2F000001",louceng:"2F"},
    {gtmc:"3F000001",louceng:"3F"},
    {gtmc:"3F000002",louceng:"3F"},
    {gtmc:"3F000003",louceng:"3F"},
    {gtmc:"4F000001",louceng:"4F"},
    {gtmc:"5F000001",louceng:"5F"},
   
  ];

webix.ready(function(){
webix.ui.fullScreen();
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >机台管理</span>&nbsp;/&nbsp;&nbsp; MachineManager",
    height:45,
    borderless:true 
  };
  var my_table={
        view:"datatable",
        id:"mydatatable",     
        columns:[
          {id:"gtmc",header:"机台名称",fillspace:true,sort:"string",editor:"text"},
          {id:"louceng",header:"所在楼层",fillspace:true,sort:"string",editor:"text"},
          //删除
          { id:"",
            template:"{common.trashIcon()}删除",
            css:"padding_less",
            width:120
          }
        ],
        height:window.screen.height*0.6,
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
            label:"机台名称:",
            width:300
          },
          {view:"button",value:"查询",width:50,click:"select",css:"btn_check"},
          {view:"button",value:"添加机台",width:80,click:"addRow",css:"btn_check"},
          {view:"button",value:"确认添加",width:80,click:"confirm($$('mydatatable'))",css:"btn_check"}
        ]   
      };
      var page={
            view:"pager",
            id:"pagerA",
            master:false,
            count:100,
            group:15,
            size:5,
            page:1,
            template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}",
            height:38,
            css:{"text-align": "center","margin-top":"20px!important","margin-bottom":"20px!important"},
            on: {
                  onItemClick: function(id, e, node){ 
                    callback();
                  }
            },
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

function callback(){
  alert(data11);
  // var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:data11});
  $$('mydatatable').data.sync(data);
  // $$("pagerA").define("limit",text1.totalPageCount);
  // $$("pagerA").define("count",text1.totalCount);
  // $$("pagerA").define("size",text1.pageSize);
  // $$("pagerA").define("page",text1.currPage-1);
  // $$('pagerA').refresh();
}
//添加一行
var flag=true;
//行id
 var row1;
//添加一行
function addRow(){ 
  var dt=$$("mydatatable");
  if(flag){
   var id=dt.add({
   }); 
   row1=id;
   console.log(row1);
   dt.addRowCss(id, "newRow");
   dt.editRow(id);
    flag=false;
  }
 else{
   alert("请完成当前操作员添加");
   console.log(row1);
   dt.editRow(row1);
 }
};

//获取表格值并刷新
function confirm(){
  var dt=$$("mydatatable");
  dt.editStop();   
  dt.eachRow(function(row){
    if(dt.hasCss(row,"newRow")==true){
      params=dt.getItem(row).gtmc;
      if(params.gtmc==""){
          alert("请填写机台名称...");
           dt.editRow(row);
          return false;
        }
        if(params.louceng==""){
          alert("请填写所在楼层...");
          dt.editRow(row);
          return false;
        }else{
          flag=true;
          console.log(params);
        }
      dt.removeRowCss(row, "newRow");
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
  console.log(s1);
  params=s1;
  // alert(params);
  if(params==""){
    alert("请输入查询条件");
  }
  else{
    postData("",params,callback);
  }
}