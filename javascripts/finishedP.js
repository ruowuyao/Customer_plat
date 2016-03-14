webix.ready(function(){
  var tabledataD=[
    { id:1,"project":"项目1","gx":"工序1",gg:"1212",life:11},
    { id:2,"project":"项目1","gx":"工序1",gg:"1212",life:11},
    { id:3,"project":"项目1","gx":"工序2",gg:"1212",life:11},
    { id:4,"project":"项目1","gx":"工序2",gg:"1212",life:11},
    { id:5,"project":"项目2","gx":"工序1",gg:"1212",life:11},
    { id:6,"project":"项目2","gx":"工序1",gg:"1212",life:11},
    { id:7,"project":"项目2","gx":"工序1",gg:"1212",life:11},
    { id:8,"project":"项目2","gx":"工序2",gg:"1212",life:11},
    { id:9,"project":"项目2","gx":"工序2",gg:"1212",life:11},
    { id:10,"project":"项目3","gx":"工序1",gg:"1212",life:55},
    { id:11,"project":"项目3","gx":"工序1",gg:"1212",life:55},
    { id:12,"project":"项目3","gx":"工序1",gg:"1212",life:55},
    { id:13,"project":"项目3","gx":"工序2",gg:"1212",life:55},
  ];
  
   var projectS=[
        {id:"1",value:"组1"},
        {id:"2",value:"组2"},
        {id:"3",value:"组3"},
        {id:"4",value:"组4"},
   ];
    var my_templaet={ 
        template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >已完成项目</span>&nbsp;/&nbsp;&nbsp;CompletedProjects",
        height:45,
        borderless:true 
    };
    var my_toolbar={
        view:"toolbar",
        elements:[ 
        {view:"text",id:"xmmc",label:"项目名称",width:260,labelWidth:80},
        {view:"text",id:"gxmc",label:"工序名称",width:260,labelWidth:80},
        { view:"button", value:"查询",width:100,click:"select" }
      ]   
    };
    var my_treetable={
        view:"datatable",
        id:"mytable",
        columns:[
            { id:"project",header:["项目名称",{ content:"textFilter", placeholder:"请输入项目名称进行查询",}],fillspace:true},
            { id:"gx",header:"工序",fillspace:true},
            { id:"gg",header:"规格",fillspace:true},
            { id:"life",header:"寿命",fillspace:true},
          ],
        height:window.screen.height*0.6,
        editable:true,
        data:{
          data:tabledataD,
          spans:[
          ]
        },
        spans:true,
        select:"cell",
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

  var params={};//json对象
// 设置分页每页显示的大小
  params.pageSize =5;
  postData("getCustomerList", params,callback);

  webix.i18n.controls.select = "确定";
  chuli();
});

function callback(data){
  //第一次请求需要得到所有项目的选项以及已经安排的计划数据
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.data});
  $$('mytable').data.sync(data);
  //所有项目的选项
}
// 对后台的数据进行分析，几个项目，几个工序
function chuli(){
  var d=$$("mytable").config.data.data;
  var count=0;
  var arryNew1=Array();
  var arryNew2=Array();
  var temp="";
  var b1=Array();
  var b2=Array();
  var ddd=0;
  var ccc=0;
  for(var i=0;i<d.length;i++){
    // 得到项目重复情况
      if(b1[i]!=-1){
        temp=d[i].project;
        for(var j=0;j<d.length;j++){
          if(temp==d[j].project){
            count++;
            b1[j] = -1;
          }
        }
        arryNew1.push(count);//把这次循环的元素以及出现的次数保存到新的数组中
        count = 0;//让count的值重新等于0
      }
  }
for(var k=0;k<arryNew1.length;k++){
 ccc=ddd+arryNew1[k];
  for(var j=ddd;j<ccc;j++){
    if(b2[j]!=-1){
      temp=d[j].gx;
      for(var i=ddd;i<ccc;i++){
        // 判断
       if(temp==d[i].gx){
          count++;
         b2[i] = -1;
        }
      } 
      arryNew2.push(count);//把这次循环的元素以及出现的次数保存到新的数组中
      count = 0;//让count的值重新等于0
    }
  }
  ddd=ccc;
}
var e1=1;
var e2=1;
var f1=0;
var f2=0;
　　for(var i=0;i<arryNew1.length;i++){
        e1=e1+f1;
        $$("mytable").addSpan([
           [e1, "project", 1, arryNew1[i]],
        ]);
        f1=arryNew1[i];
　　}
    for(var j=0;j<arryNew2.length;j++){
          e2=e2+f2;
          $$("mytable").addSpan([
             [e2, "gx", 1, arryNew2[j]],
          ]);
          f2=arryNew2[j];
  　　}
$$("mytable").refresh();
}

//查询实现
function select(){
  var xmmc=$$("xmmc").getValue();
  var gxmc=$$("gxmc").getValue();
  params=xmmc+"#"+gxmc;
  if(params=="#"){
    alert("请输入查询条件");
    return false;
  }
  alert(params);
  postData("",params,callback);
}