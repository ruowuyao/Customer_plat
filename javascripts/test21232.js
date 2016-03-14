webix.ready(function(){
   var plans = JSON.parse($("#plans").val());
   var projectS = JSON.parse($("#gourps").val());
    var my_templaet={ 
        template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >生产排配</span>&nbsp;/&nbsp;&nbsp;ScheduleSheet",
        height:45,
        borderless:true 
    };
    alert(plans.data);
    alert(projectS);
	var my_toolbar = {
			view : "toolbar",
			elements : [ {
				view : "combo",
				id : "plan_id",
				label : "选择计划",
				width : 260,
				labelWidth : 80,
				options : plans.data
			},  {
				view : "datepicker",
				id : "date",
				timepicker : true,
				label : "计划日期",
				labelAlign : "right",
				name : "end",
				stringResult : true,
				format : "%Y-%m-%d",
				width : 240
			}, {
				view : "button",
				value : "查询",
				width : 100,
				click : "select"
			} ,   {view:"button",value:"排配完成",click:"achieve",width:"100"} ]
		};
    var my_treetable={
        view:"datatable",
        id:"mytable",
        columns:[
            { id:"project",header:["项目名称",{ content:"textFilter", placeholder:"请输入项目名称进行查询",}],fillspace:true},
            { id:"gx",header:"工序",fillspace:true},
            { id:"bb",header:"班别",fillspace:true},
            { id:"bz",header:"安排班组",editor:"multiselect",optionslist:true,fillspace:true,options:projectS.data,inputWidth:300},
            { id:"gg",header:"规格",fillspace:true},
            { id:"num",header:"数量",fillspace:true}
          ],
        height:600,
        editable:true,
        spans:true,
        select:"cell"
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
        ],// ----rows结束----
    });// ---webix.ui结束----

  
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
  // 第一次请求需要得到所有项目的选项以及已经安排的计划数据
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.data});
  $$('mytable').data.sync(data);
  // 所有项目的选项
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
        arryNew1.push(count);// 把这次循环的元素以及出现的次数保存到新的数组中
        count = 0;// 让count的值重新等于0
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
      arryNew2.push(count);// 把这次循环的元素以及出现的次数保存到新的数组中
      count = 0;// 让count的值重新等于0
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