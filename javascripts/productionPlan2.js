var test=[
    { "project":"项目1","gx":"工序1","bb":"白班",gg:"1212",num:11},
    { "project":"项目1","gx":"工序1","bb":"晚班",gg:"1212",num:11},
    { "project":"项目1","gx":"工序2","bb":"白班",gg:"1212",num:11},
    { "project":"项目1","gx":"工序2","bb":"晚班",gg:"1212",num:11},
    { "project":"项目2","gx":"工序1","bb":"白班",gg:"1212",num:11},
    { "project":"项目2","gx":"工序1","bb":"中班",gg:"1212",num:11},
    { "project":"项目2","gx":"工序1","bb":"晚班",gg:"1212",num:11},
  ];
webix.ready(function(){
  var tabledataD=[
    { "project":"项目1","gx":"工序1","bb":"早班",gg:"1",num:1,bz:"1,2,3"},
    { "project":"项目1","gx":"工序1","bb":"早班",gg:"14",num:14},
    { "project":"项目1","gx":"工序1","bb":"晚班",gg:"15",num:15},
    { "project":"项目1","gx":"工序1","bb":"晚班",gg:"3",num:3,bz:"1,2,3"},
    { "project":"项目1","gx":"工序2","bb":"早班",gg:"2",num:2,bz:"1,2,3"},
    { "project":"项目1","gx":"工序2","bb":"早班",gg:"16",num:16},
    { "project":"项目1","gx":"工序2","bb":"晚班",gg:"5",num:5,bz:"1,2,3"},
    { "project":"项目1","gx":"工序2","bb":"晚班",gg:"17",num:17},
    { "project":"项目2","gx":"工序1","bb":"早班",gg:"6",num:6,bz:"1,2,3"},
    { "project":"项目2","gx":"工序1","bb":"中班",gg:"4",num:4,bz:"1,2,3"},
    { "project":"项目2","gx":"工序1","bb":"晚班",gg:"7",num:7,bz:"1,2,3"},
    { "project":"项目2","gx":"工序2","bb":"早班",gg:"9",num:9,bz:"1,2,3"},
    { "project":"项目3","gx":"工序1","bb":"中班",gg:"8",num:8},
    { "project":"项目3","gx":"工序1","bb":"早班",gg:"11",num:11},
    { "project":"项目3","gx":"工序1","bb":"晚班",gg:"12",num:12},
    { "project":"项目3","gx":"工序2","bb":"早班",gg:"13",num:13,bz:"1,2,3"},
    { "project":"项目2","gx":"工序2","bb":"晚班",gg:"10",num:10},
  ];
   var projectS=[
        {id:"1",value:"组1"},
        {id:"2",value:"组2"},
        {id:"3",value:"组3"},
        {id:"4",value:"组4"},
   ];
    var my_templaet={ 
        template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >生产排配</span>&nbsp;/&nbsp;&nbsp;ScheduleSheet",
        height:45,
        borderless:true 
    };
    var my_toolbar={
        view:"toolbar",
        elements:[ 
        {view:"text",id:"jhmc",label:"计划名称",width:260,labelWidth:80},
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
        { view:"button", value:"查询",width:100,click:"select" },
        { view:"button", value:"排配完成",width:100,click:"achieve" },
      ]   
    };
    var my_treetable={
        view:"datatable",
        id:"mytable",
        columns:[
            { id:"project",header:["项目名称",{ content:"textFilter", placeholder:"请输入项目名称进行查询",}],fillspace:true},
            { id:"gx",header:"工序",fillspace:true},
            { id:"bb",header:"班别",fillspace:true},
            { id:"bz",header:"安排班组",editor:"multiselect",optionslist:true,options:projectS,width:500,
            },
            { id:"gg",header:"规格",fillspace:true},
            { id:"num",header:"数量",fillspace:true},
          ],
        height:window.screen.height*0.6,
        editable:true,
        resizeColumn:true,
        tooltip:true,
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
            my_treetable
           
        ],//----rows结束----
    });//---webix.ui结束---- 

  var params={};//json对象
// 设置分页每页显示的大小
  params.pageSize =5;
  postData("getCustomerList", params,callback);
  chuli(tabledataD);
  webix.i18n.controls.select = "确定";
 
});
function achieve(){
  $$("mytable").editStop();
   var tableValues={};
      var i=0;
      $$("mytable").eachRow( 
        function (row){
          tableValues[i]= $$("mytable").getItem(row);
          i++;
      });
    console.log(tableValues);
}

function callback(data){
  //第一次请求需要得到所有项目的选项以及已经安排的计划数据
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.data});
  $$('mytable').data.sync(data);
  //所有项目的选项
}

//查询实现
function select(){
  var storge_date1=$$("startDate").getText();
  var pici=$$("jhmc").getValue();
  params=pici+"#"+storge_date1;
  if(params=="#"){
    alert("请输入查询条件");
    return false;
  }
  alert(params);
 // postData("",params,callback);
  $$('mytable').define("data",test);
  $$("mytable").refresh();
  chuli(test);
}
// 对后台的数据进行分析，几个项目，几个工序
function chuli(data){
  var d=data;
  d.sort( function(a, b){   
    return (a["project"]) > (b["project"])? 1 : (a[ "project"]) == (b[ "project" ]) ? 0 : -1;   
}); 
  var count=0;
  var arryNew1=Array();
  var arryNew2=Array();
  var arryNew3=Array();
  var temp="";
  var b1=Array();
  var b2=Array();
  var b3=Array();
  var ddd=0;
  var ccc=0;
  var eee=0;
  var fff=0;
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
  console.log(arryNew1);
//用于将数据排序得到调理好的数据
var sortArray1=new Array();
var sortArray2=new Array();
getSort(arryNew1,sortArray1,"gx",d);
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
console.log(arryNew2);
getSort(arryNew2,sortArray2,"bb",d);
  for(var k=0;k<arryNew2.length;k++){
   eee=fff+arryNew2[k];
  for(var j=fff;j<eee;j++){
    if(b3[j]!=-1){
      temp=d[j].bb;
      for(var i=fff;i<eee;i++){
        // 判断
       if(temp==d[i].bb){
        count++;
         b3[i] = -1;
        }
      } 
      arryNew3.push(count);//把这次循环的元素以及出现的次数保存到新的数组中
      count = 0;//让count的值重新等于0
    }
  }
  fff=eee;
}
 $$('mytable').clearAll();
  $$('mytable').define("data",d);
  $$("mytable").refresh();
console.log(arryNew3);
　　span(arryNew1,"project");
　　span(arryNew2, "gx");
　　span(arryNew3, "bb");
　　span(arryNew3, "bz");
 $$("mytable").refresh();
}

function span(arryNew1,key){
  var e1;
  var f1=0;
  var f11=0;
  for(var i=0;i<arryNew1.length;i++){
        f11=f1+f11;
        e1=$$("mytable").getIdByIndex(f11);
        $$("mytable").addSpan([
           [e1, key, 1, arryNew1[i]],
        ]);
        f1=arryNew1[i];
　　}
}
function getSort(arryNew2,sortArray2,key,d){
var p3=0;
var p4=0;
  for(var i=0;i<arryNew2.length;i++){
          sortArray2[i]=new Array();
          p3=p3+p4;
          for(var j=p3;j<p3+arryNew2[i];j++){
            sortArray2[i][j]=d[j];
          }
          sortArray2[i].sort( function(a, b){   
            return (a[key]) >(b[key])? 1 : (a[key]) == (b[key]) ? 0 : -1;  
            // return a[key].localeCompare(b[key]);
          });
          var l=0;
          for(var k=p3;k<p3+arryNew2[i];k++){
            d[k]=sortArray2[i][l++];
          } 
          p4=arryNew2[i];
  　　}
}