var list_datas=new Array();
var datas_ggmc=new Array();
var datas_sm=new Array();
var datas_muls=new Array();
var project_data;
var jt_datas=[]; 
var my_gx=[];
var treefilm;
var jtss=[];
var list_index;


webix.ready(function(){
  
  var big_film_set = [
      {"id":1,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","img":"bg1"},
      {"id":2,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","img":"bg2"},
      {"id":3,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","img":"bg3"},
      {"id":4,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","img":"bg4"},
      {"id":5,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","img":"bg5"}
  ];
  var filmset = [
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:199412,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"},
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:197212,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"},
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:197412,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"},
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:196612,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"},
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:196412,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"},
    { checkBoxs:"",xl:"1", circleNextPageNo:"美思美科（供应商名称）",currPage:195712,khlxr:"广东省深圳市地址 ",khlxrfs:"王五"}
  ];
  var guige=[
    '规格1',
    "规格2",
    "规格3"
  ];
  var testdata=[
    {ggsm:20},
    {ggsm:30},
    {ggsm:40},
    {ggsm:50},
  ];
  var dataset2 = [
    {id:1,value: "1"},
    {id:2,value: "2"},
    {id:3,value: "3"},
    {id:4,value: "4"},
    {id:5,value: "5"},
    {id:6,value: "6"},
    {id:7,value: "7"},
    {id:8,value: "8"},
    {id:9,value: "9"},
    {id:10,value: "10"},
    {id:11,value: "11"},
    {id:12,value: "12"},
  ];
  //---------------------- 添加项目模态框开始------------------
  //模态框的form表单内容
  var add_P_form = {
    view:"form",
    id:"add_P_form",
    borderless:true,
    complexData:true,
    elements: [
      { 
        margin:20,
        cols:[
          {view:"text",label:"项目名称",id:"xmmc",name:"xmmc",width:300,labelWidth:100,value:"你说"},
          {view:"text",label:"项目编码",id:"xmbm",name:"xmbm",width:300,labelWidth:100},
        ],
      }, 
      {
        margin:10,
        cols:[
          {},
          {view:"button",id:"btn4",value:'下一步',inputWidth:70,width:70,/*type:"danger",*/click:"down_pro"}
        ]
      }
    ]
  } 
  var add_P_toolbar={
    view:"toolbar",
    id:"add_P_toolbar",
    elements:[     
      {view:"label", label: "添加项目",width:85},
      {},
      { view:"icon", icon:"times-circle", css:"alter",click:"$$('project').hide();"}
    ], 
  }
 //window模态框
  var project=new webix.ui({
    view:"window",
    id:'project',
    // fullscreen:true,
    width:800,
    position:"center",
    modal:true,
    move:true,
    head:webix.copy(add_P_toolbar),
    body:webix.copy(add_P_form)
  });
 //---------------------- 添加项目模态框结束------------------
 
  //---------------------- 添加工序、规格（寿命）、机台模态框开始------------------
  
  /*显示工序添加操作*/
  var pro_list={/*css:"pro_list",*/
    rows:[
      { margin:10,
        cols:[
          {
            view:"text",
            id:"add_pro",
            label:"工序名称:",
            placeholder:"请输入要添加的工序名称",
            width:280
          },
          {
            view:"button",
            id:"add_pros_btn",
            width:70,
            value:"添加工序",
            click:"add_pros"
          }
        ]
      },
      {
        view:"text",
        id:"search_pro",
        label:"快速查找:",
        placeholder:"请输入查询的工序",
        width:360
      },
      {
        view:"list",         
        id:"process_list",         
        template:"#gxmc#",
        width:320,
        height:400,
        select:true,
        data:[],
        /*当点击另一个工序时获取并保存工序数据、规格数据、机台数据*/
        on: {
          onSelectChange:function () {
            
          }
        }
      }  
  ]};
  /*弹出框图表按钮*/
  var right_button={
    type:"line",css:"right_button",rows:
    [
      {view:"button",value:"-->",width:50,disabled:true},
    ]
  };
  /*表格*/
  var my_pro_dt={
    view:"datatable",
    id:"my_pro_dt",  
    width:300, 
    height:440, 
    columns:[
      {id:"ggmc",header:"规格名称",width:100,editor:"richselect",options:guige},
      {id:"ggsm",header:"寿命",editor:"text",width:100,fillspace:true}
    ],        
    select:true,
    data:"",
    editable:true,
    // data:filmset,//url:当是外来数据时用这个
    // url:"http://192.168.1.111:9001/Application/demo"
  };
  /*添加一行规格按钮*/
  var add_button={
    view:"button",value:"添加规格",width:70,click:"addRows"
  };
  /*添加机台按钮*/
  var add_machine_button={
    view:"button",value:"添加机台",width:70,css:"add_machine",click:'add_machine'
  };
  /*选择机台多选下拉表*/
  var add_machine={
    view:"multiselect",
    id:"muls", 
    width:350,
    inputWidth:300,
    label:"机台选择", 
    // css:"add_machine",
    yCout:2,
    options:{
      data:dataset2 
    },
    // value:"1,3", 
    // placeholder:"规格1", 
    // tooltip:true,
    labelAlign:'right', 
    inputAlign:"right", 
    disabled:true,  
  };
  /*模态框头部信息*/
  var add_pro_toolbar={
    view:"toolbar",
    id:"add_pro_toolbar",
    elements:[     
      {view:"label", label: "添加工序",width:130},
      {},
      { view:"icon", icon:"times-circle", css:"alter",click:"$$('process').hide();"}
    ], 
  }
  /*模态框身体、尾部信息*/
  var add_pro_form = {
    view:"form",
    id:"add_pro_form",
    borderless:true,
    complexData:true,
    elements: [
      {
        cols:[
          pro_list,
          right_button, 
          {rows:[
            {
              cols:[
                {},
                add_button
              ]  
            },   
            my_pro_dt,                           
          ]},
          right_button,
          {
            rows:[
              add_machine_button,
              add_machine,
            ]
          }  
        ]
      },
      {
        margin:10,
        cols:[
          {},
          // {view:"button",id:"btn_pro1",value:'上一步',inputWidth:70,width:70,/*type:"danger",*/click:'up_project'},
          {view:"button",id:"btn_pro2",value:'提交一条数据',inputWidth:120,width:120,click:'submit',/*type:"danger"*/},
          {view:"button",id:"btn_pro3",value:'退出',inputWidth:70,width:70,click:'down_check_end'},
        ]
      }
    ]
  } 
  /*window模态框*/
  var process=new webix.ui({
    view:"window",
    id:'process',
    // fullscreen:true,
    width:1400,
    position:"center",
    modal:true,
    move:true,
    head:webix.copy(add_pro_toolbar),
    body:webix.copy(add_pro_form)
  });
 //---------------------- 添加工序-规格模态框结束------------------
 
  //---------------------- 确认数据并关闭模态框开始------------------
  /*树表格*/
  var my_datatable2={
    view:"datatable",
    // container:"treetable",
    id:"my_datatable2",
    columns:[
      {id:"project",header:["项目"],/*width:100*/},
      {id:"process",header:"工序"},
      {id:"speci",header:"规格",/*width:350*/},
      {id:"sm",header:"寿命",/*width:350*/},
      {id:"jitai",header:"机台",fillspace:true},
    ],
    autoheight:true,
    // autowidth:true,
    data:{
      data:"",
      /*spans:[//id, column, width, height, value, css
        [1, "project", 1, 2,"你好", "highlight"],
        [3, "project", 1, 2],
      ],*/
    },
    spans:true,
    select:"row",
  };
  //模态框的form表单内容
  var check_end_form = {
    view:"form",
    id:"check_end_form",
    borderless:true,
    complexData:true,
    elements: [
      { 
        margin:20,
        cols:[
          my_datatable2
        ],
      }, 
      {
        margin:10,
        cols:[
          {},
          {view:"button",id:"btn_check1",value:'上一步',inputWidth:70,width:70,/*type:"danger",*/click:"up_process"},
          {view:"button",id:"btn_check2",value:'完成',inputWidth:70,width:70,/*type:"danger",*/click:"end"}
        ]
      }
    ]
  } 
  var check_end_toolbar={
    view:"toolbar",
    id:"check_end_toolbar",
    elements:[     
      {view:"label", label: "若确认数据无误，点击完成，保存数据！",width:370},
      {},
      { view:"icon", icon:"times-circle", css:"alter",click:"$$('check_end').hide();"}
    ], 
  }
 //window模态框
  var check_end=new webix.ui({
    view:"window",
    id:'check_end',
    // fullscreen:true,
    width:1200,
    position:"center",
    modal:true,
    move:true,
    head:webix.copy(check_end_toolbar),
    body:webix.copy(check_end_form )
  });
 //---------------------- 确认数据并关闭模态框结束------------------
  /*显示信息*/
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >首页</span>&nbsp;/&nbsp;&nbsp;统计数据",
    height:45,
    borderless:true 
  };
  /*创建项目按钮*/
  var my_button={
    cols:[
      {view:"button",id:"btn1",value:'创建项目',inputWidth:85,width:90,click:function(){showForm("project")}},
      {view:"button",id:"btn2",value:'Excel导入',inputWidth:85,width:85},    
    ],   
  };
  /*显示当前页面表格*/
  var my_datatable3={
      view:"datatable",
      id:"my_datatable3",
      columns:[
          { id:"project",header:["项目名称",{ content:"textFilter", placeholder:"请输入项目名称进行查询",}],fillspace:true},
          { id:"gx",header:"工序",fillspace:true},
          { id:"gg",header:"规格",fillspace:true},
          { id:"life",header:"寿命",fillspace:true},
        ],
      height:600,
      editable:true,
      data:{
        data:"",
        /*url:"",*/
        spans:[
        ]
      },
      spans:true,
      select:"cell",
  };
  var web={
    type:"line",
    container:"body",
    id:"mylayout",
    rows:[
      my_template,
      my_button,
      {height:10},
      my_datatable3
    ],
  };
  webix.ui(web);
  // webix.ui(my_treetable);
  /*---webix.ui结束----*/
  // 工序名搜索
  $$("search_pro").attachEvent("onTimedKeyPress",function(){
    var value = this.getValue();
    $$("process_list").filter(function(obj){
     /* console.log(obj);*/
        return obj.gxmc.indexOf(value)>=0;
    })
  });
  change();
  

  
 /*--------------end-----------*/
});
function change(){
  $$("process_list").attachEvent("onItemClick",function(id,e,node){
    var plist=$$("process_list");
      list_index=plist.getIndexById(id);
      console.log(list_index);
      /*更换规格界面*/
      $$("my_pro_dt").clearAll();
      $$("my_pro_dt").define("data",ggss[list_index] );
      $$("my_pro_dt").refresh();   
      /*更换机台界面*/
            
      console.log(jt_datas[list_index]);
      $$("muls").setValue(jt_datas[list_index]);
      console.log(jt_datas[list_index]);
      $$("muls").refresh(); 
    });
}

  

/*显示模态框 */
function showForm(winId,node){
  $$(winId).getBody().clear();
  $$(winId).show(node);
  $$(winId).getBody().focus();
};
/*在添加项目页面点击“下一步”跳转入工序页面*/
function down_pro(){
  $$('project').hide();
  showForm("process");

  /*保存项目数据*/
  project_data=$$("add_P_form").getValues();
}
/*在添加工序、规格（寿命）、机台页面点击上一步跳转入添加项目页面*/
function up_project(){
  $$('process').hide();
  showForm("project");
}
/*在确认数据页面点击上一步跳转入添加工序、规格（寿命）、机台页面*/
function up_process(){
  $$('check_end').hide();
  showForm("process");
}
/*点击“添加规格”按钮添加一行规格名称和寿命*/
function addRows(){ 
  var dt=$$("my_pro_dt");  
  var item = $$("process_list").getSelectedItem();
  if(item==undefined){
    dt.disable();
    alert("请先添加并选择一项工序！");
  }
  else{
    dt.enable();
    var id=dt.add({
    });
  }
}
/*点击“添加工序”按钮添加一行工序并保存工序数据*/
function add_pros( ){ 
  var pros=$$("process_list");
  var data=$$("add_pro").getValue();
  if(data==""){
    alert("请输入要添加的工序");
  }
  else{
    var id=pros.add({
      gxmc:data
    });
  }     
  // $$('add_pros_btn').disable();
 /* 当点击“添加工序”按钮后获取工序数据*/
  Array.prototype.distinct = function(){//去除数组重复元素
    var self = this;
    var _a = this.concat().sort();
    _a.sort(function(a,b){
      if(a == b){
        var n = self.indexOf(a);
        self.splice(n,1);
      }
    });
    return self;
  };
  // my_p=my_p.distinct();  
};
/*点击“完成”按钮,关闭模态框并将数据传递给后台*/
function end(){
  $$('check_end').hide(); 
}
/*在添加工序、规格（寿命）、机台页面点击“确认”按钮跳转入确认数据页面，并将数据传入页面*/
function down_check_end(){
  $$('process').hide();
  showForm("check_end");
  /*---------------将数据传入确认表格开始-----------------*/
  treefilm=[
    { "id":1, "project":"项目1","process":"工序1","speci":"规格1","sm":21,"jitai":"机台1"},
    { "id":2, "project":"项目2","process":"工序2","speci":"规格2","sm":22,"jitai":"机台2"},
    { "id":3, "project":"项目3","process":"工序3","speci":"规格3","sm":23,"jitai":"机台3"},
    { "id":4, "project":"项目4","process":"工序4","speci":"规格4","sm":24,"jitai":"机台4"},
    { "id":5, "project":"项目5","process":"工序5","speci":"规格5","sm":25,"jitai":"机台5"}
  ];
  // console.log(treefilm[0]);
  /*将数据跨行*/
  var row=1;
  var i=2;
  var col="project";
  $$("my_datatable2").addSpan([
    [row,"project",row,4],
    [row,"process",row,2]
  ]);
  /*更新数据*/
  $$("my_datatable2").clearAll();
  $$("my_datatable2").define("data", treefilm);
  $$("my_datatable2").refresh();

    var treefilm2=[
    { id:1, project:"项目1",process:"工序1",speci:"规格1",sm:21,jitai:"机台1"},
    { id:2, project:"项目2",process:"工序2",speci:"规格2",sm:22,jitai:"机台2"},
    { id:3, project:"项目3",process:"工序3",speci:"规格3",sm:23,jitai:"机台3"},
    { id:4, project:"项目4",process:"工序4",speci:"规格4",sm:24,jitai:"机台4"},
    { id:5, project:"项目5",process:"工序5",speci:"规格5",sm:25,jitai:"机台5"}
    ];
/*当未点击工序的某一项时，点击添加规格无效，且弹出提示*/
}
/*点击“添加机台”按钮添加，选择机台可操作*/
function add_machine(){
  var dt=$$("my_pro_dt");  
  var item = $$("process_list").getSelectedItem();
  if(item==undefined){
    $$('muls').disable();
    alert("请先添加并选择一项工序！");
  }
  else{
    $$("muls").enable();
  } 
}
/*获取机台数据*/
function gain_jt(){
  var gx = {
      "gxmc": "",
      "ggs": [],
      "jts": []
  };
  var jts = [];
  var text = $$("muls").getText().replace(/\s/g, "");
  var text1 = text.split(",");
  var ch=JSON.stringify(text1);
  var datas_muls=JSON.parse(ch);
  for(var i=0;i<datas_muls.length;i++){
    var jt = {
        "jitai":""
      };
    jt.jitai=datas_muls[i];
    jts.push(jt);
    gx.jts=jts;
  }
  return gx.jts;
};
/*获取规格、寿命数据*/
function gain_gg(){
  var gx = {
      "gxmc": "",
      "ggs": [],
      "jts": []
  };

  var ggs = [];

  $$("my_pro_dt").eachRow( function (row){
      var gg = {
        "ggmc":"",
        "ggsm":""
      };
      var dt=$$("my_pro_dt");
      gg.ggmc=dt.getItem(row).ggmc;
      gg.ggsm=dt.getItem(row).ggsm;

      // console.log(JSON.stringify(gg));
      ggs.push(gg);
      gx.ggs=ggs;
      // console.log(JSON.stringify(ggs));
  });

  // console.log(JSON.stringify(ggs));
  // console.log(gx);
  return gx.ggs;
};
/*获取工序数据*/
function gain_gx(){  
  var xm = {
    "xmmc": "",
    "xmbm": "",
    "gxs": []
  };
  var gxs=[];

  var gxmcs=[];
  $$("process_list").data.each(function(obj){ 
    var gx = {
        "gxmc": "",
        "ggs": [],
        "jts": []
    };
    gx.gxmc=obj.gxmc;  
    gxs.push(gx);
    // xm.gxs=gxs;   
    
    // gxmcs.push(gx.gxmc);
    
  });
  /*console.log(gxmcs);
  return gxmcs;*/
  return gxs;
};
/*获取项目数据*/
function gain_xm(){
  var xm = {
    "xmmc": "",
    "xmbm": "",
    "gxs": []
  };
  xm.xmmc=project_data.xmmc;
  xm.xmbm=project_data.xmbm;
  return xm;
};

/*当点击“提交数据”时，“添加工序”按钮变为可编辑*/
var ggss=[];//used
function submit(){
  /*提示信息：该条数据已提交，请输入下一条数据，或更改上一条数据*/
  webix.alert({
    title: "提示信息",
    text: "该条数据已提交，您可以输入下一条数据，或更改上一条数据!",
    type:"'alert-warning'"
  });
  var xms2 = {
    "xmmc": "",
    "xmbm": "",
    "gxs": [   
    ]
  };
 /*工序数据*/
  var gxs2 = gain_gx();
  console.log(JSON.stringify(gxs2));

  /*规格、寿命数据*/
  var ggs2=gain_gg();  
  console.log(JSON.stringify(ggs2));
  ggss[list_index]=ggs2;
  // console.log(JSON.stringify(ggss));
  
  /*将规格数据传递给工序数据*/
  for(var i=0;i<gxs2.length;i++){
      gxs2[i].ggs=ggss[i];
  }
  // console.log(JSON.stringify(gxs2));
  
  /*机台数据*/
  var jts2 = gain_jt();

  jtss[list_index]=jts2;
  console.log(jtss);
  /*将机台数据传递给工序数据*/
  for(var i=0;i<gxs2.length;i++){
      gxs2[i].jts=jtss[i];
  }

 /*项目数据*/
 xms2.xmmc=project_data.xmmc;
 xms2.xmbm=project_data.xmbm;
 xms2.gxs=gxs2;
 console.log(JSON.stringify(xms2));

 var jt_data=[];
  for(var i=0;i<jtss[list_index].length;i++){
    jt_data.push(jtss[list_index][i].jitai);
  }
  console.log(jt_data);
  jt_datas[list_index]=jt_data;

postData("http://192.168.1.111:9001/Application/demo", xms2,callback2);

}
function callback2(data){
  $$("my_datatable3").define("url", "http://192.168.1.111:9001/Application/demo");
  $$("my_datatable3").refresh();
}
// 对后台的数据进行分析，几个项目，几个工序
function chuli(){
  var d=$$("my_datatable3").config.data.data;
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
        $$("my_datatable3").addSpan([
           [e1, "project", 1, arryNew1[i]],
        ]);
        f1=arryNew1[i];
　}
   for(var j=0;j<arryNew2.length;j++){
          e2=e2+f2;
          $$("my_datatable3").addSpan([
             [e2, "gx", 1, arryNew2[j]],
          ]);
          f2=arryNew2[j];
  　}
  $$("my_datatable3").refresh();
}