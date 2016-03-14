var hidden1=Array();
var hidden2=Array();
webix.ready(function(){
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >操作员入组</span>&nbsp;/&nbsp;&nbsp; OperateGroup",
    height:45,
    borderless:true 
  };
  
var button={
    type:"line",margin:20,css:"buttons",rows:
    [
      {view:"button",value:"<--",width:50,click:"addOne"},
      {view:"button",value:"-->",width:50,click:"clearOne"},
      {view:"button",value:"<<",width:50,click:"addAll"},
      {view:"button",value:">>",width:50,click:"clearAll"},
    ]
};
// 显示所有组
var list1={
  css:"list1",
  rows:[
    { margin:10,
      cols:[
        {
          view:"text",
          id:"add1",
          label:"组号:",
          placeholder:"请输入要添加的组号",
          width:240
        },
        {
          view:"button",
          width:70,
          value:"添加组",
          click:"addRow"
        }
      ]
    },
    {
        view:"text",
        id:"search1",
        label:"快速查找:",
        placeholder:"请输入查询的组号",
        width:320
    },
    {
      view:"list",
      width:320,
      id:"group",
      height:400,
      template:"#bzmc#",
      select:true,
      data:[]
    }
]};
// 显示选中组的所有操作员
var list2={css:"list2",
  rows:[
  { margin:10,
    cols:[
      {
        view:"label",
        label:"已有操作员:",
        width:100
      },
      {
        view:"label",
        id:"num",
        width:100
      }
    ]
  },
  {
    view:"list",
    width:320,
    height:400,
    id:"operater",
    template:"#operate#",
    select:true,
    data:[]
  }
]};
// 显示所有操作员
var list3={css:"list3",
  rows:[
  {
    view:"text",
    id:"search2",
    placeholder:"请输入查询的操作员",
    label:"快速查找:",
    width:320
  },
  {
    view:"list",
    width:320,
    height:400,
    select:true,
    multiselect:true,
    id:"allOperate",
    template:"#operate#",
    data:[]
  }
]};

var body={
     // margin:10,
     css:"borderGroup",
     width:window.screen.width*0.85,
     height:window.screen.height*0.6,
     rows:[
     { cols:[
      list1,
      list2,
      button,
      list3
    ]},
    {css:{"text-align":"right"},margin:10,
      cols:[
        {view:"button",value:"确定",width:60,click:"sure",css:{"margin":"400px"}}
      ]
    }
     ]
  };
  var web={
    container:"body",
    id:"mylayout",
    rows:[
      my_template,
      body
    ],
  };
  webix.ui(web);//---webix.ui结束----
// 组名搜索
$$("search1").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        $$("group").filter(function(obj){
          console.log(obj);
            return obj.bzmc.indexOf(value)>=0;
        })
    });
// 操作员搜索
$$("search2").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        console.log(value);
        $$("allOperate").filter(function(obj){
          console.log(obj.operate);
            return obj.operate.indexOf(value)>=0;
        })
 });
//把操作员入组信息传到后台
 var i=0;
  $$('group').attachEvent("onBeforeSelect", function(id, selection){
    var item = this.getItem(id).bzmc;
      var sel = $$('group').getSelectedId();
      if(sel){
        var b=operateData();
      }
      hidden1[i]=b;
      submit(hidden2[i-1],hidden1[i]);
      i++;
   //获取当前点击的ID，和后台连接，得到对应组数据
    // webix.ajax().sync().post("getSuppliersCutterList", "bzmc=" + item,function(text, xml, xhr) {
          // var json = $.parseJSON(text);
          // supplierData2 = json.data;
          //测试数据
          var data1=[ 
              {operate:"张三1/MS_193212"},
              {operate:"李四1/MS_193213"},
              {operate:"李浩/MS_193214"},
              {operate:"王小丫/MS_193215"},
            ];
          var data = new webix.DataCollection({data:data1});
          $$('operater').data.sync(data);
          $$("num").setValue($$("operater").count());
    // });
  });
// 页面初始化时访问后台，得到组列表和所有操作员列表
  // webix.ajax().sync().post("getSuppliersCutterList", "supplier_name=" + newv,function(text, xml, xhr) {
          // var json = $.parseJSON(text);
          // supplierData2 = json.data;
          //测试数据
          var group1=[ 
               { bzmc:"1组"},{bzmc:"2组"},{bzmc:"3组"},{bzmc:"4组"},{bzmc:"5组"},{bzmc:"6组"},
               {bzmc:"7组"},{bzmc:"8组"},{bzmc:"9组"},{bzmc:"10组"}
              ];
              //所有操作员数据
          var group2=[ 
              {operate:"张三1/MS_193212"},
              {operate:"李四1/MS_193213"},
              {operate:"李浩/MS_193214"},
              {operate:"王小丫/MS_193215"},
              {operate:"徐峰/MS_193216"},
              {operate:"许飞/MS_193217"},
              {operate:"李浩/MS_193218"},
              {operate:"王小丫/MS_193219"},
              {operate:"徐峰/MS_193210"},
              {operate:"许飞/MS_194212"},
              {operate:"许飞1/MS_195212"},
              {operate:"李浩1/MS_196212"},
              {operate:"王小丫1/MS_197212"},
              {operate:"徐峰1/MS_198212"}
            ];
          var data = new webix.DataCollection({data:group1});
          $$('group').data.sync(data);
          var data = new webix.DataCollection({data:group2});
          $$('allOperate').data.sync(data);
    // });
    $$("num").setValue($$("operater").count());
})

//添加一行
function addRow(){ 
  var dt=$$("group");
  var data=$$("add1").getValue();
  if(data==""){
    alert("请输入要添加的组号");
  }
  else{
    var id=dt.add({
      bzmc:$$("add1").getValue()
    },0); 
    var b=operateData();
    submit(id,b);
  }
};
//删除所有操作员
function clearAll(){
  $$('operater').clearAll();
  $$("num").setValue($$("operater").count());
}
//添加所有操作员
function addAll(){
var sel = $$('group').getSelectedId();
  if(sel){
    var item=Array();
    for(var i=0;i<$$("allOperate").count();i++){
      item[i]=$$('allOperate').getItem($$("allOperate").getIdByIndex(i)).operate;
    }
    common(item);
  }
  else{
    alert("请先选择组");
  }
}
function common(item){
  var dt=$$("operater");
  var a=Array();
  var b=Array();
  var c = $$("operater").count();
  var flag2=Array();
  for(var j=0;j<item.length;j++){
      flag2[j]=true;
      for(var i=0;i<c;i++){
      a[i]=$$("operater").getIdByIndex(i);
      b[i]=$$('operater').getItem(a[i]).operate;
        if(b[i]==item[j]){
          flag2[j]=false;
          alert(b[i]+"已经在该组中");
        }
      }
    }
    for(var i=0;i<item.length;i++){ 
     if(flag2[i]){
        dt.add({
          operate:item[i]
        });
      }
    }
  $$("num").setValue($$("operater").count());
}
// 添加操作员（一个或者多个）
function addOne(){
var sel = $$('group').getSelectedId();
if(sel){  
  var item=Array();
  var dt=$$("operater");
  var id = $$('allOperate').getSelectedId(); 
  //目前操作员的数量
  var c = $$("operater").count();
  var a=Array();
  var b=Array();
  var flag1=true;
  var flag2=Array();
  console.log(id);
  if(typeof(id)=="string"){
    var aaa=$$('allOperate').getItem(id).operate;
     for(var i=0;i<c;i++){
      a[i]=$$("operater").getIdByIndex(i);
      b[i]=$$('operater').getItem(a[i]).operate;
      if(b[i]==aaa){
        flag1=false;
        alert(aaa+"已经在该组中");
      }
    }
    if(flag1){
      dt.add({
        operate:aaa
      });
    }
  }
  else{
    for(var i=0;i<id.length;i++){
      item[i] = $$('allOperate').getItem(id[i]).operate;
    }
    common(item);
  }
  $$("num").setValue($$("operater").count());
  }
  else{
    alert("请先选择组");
  }
}
// 删除一个操作员
function clearOne(){
  var id = $$('operater').getSelectedId(); 
  $$('operater').remove(id);
  $$("num").setValue($$("operater").count());
}
// 确认完成操作员入组
function sure(){
  var id = $$('group').getSelectedId();
if(id){ 
  //获取当时的组名 
  var item1 = $$('group').getItem(id).bzmc;
  console.log(item1);
  // 获取对应的操作员
  var b=operateData();
  var params=item1+"---"+b;
  //将数据传到后台
   // webix.ajax().sync().post("getSuppliersCutterList",params,function(text, xml, xhr) {
      //测试数据
          // var group1=text;
          //  var data = new webix.DataCollection({data:group1});
          // $$('group').data.sync(data);
  // });
 }
  else{
    alert("请先选择组");
  }
}
// 将入组情况提交到后台
function submit(id,b){
  var sel = $$('group').getSelectedId(); 
  if(sel){
    if(id!=sel){
     //获取当时的组名 
      var item = $$('group').getItem(sel).bzmc;
       var params=item+"---"+b;
       //将数据传到后台
   // webix.ajax().sync().post("getSuppliersCutterList",params,function(text, xml, xhr) {
      //测试数据
          // var group1=text;
          //  var data = new webix.DataCollection({data:group1});
          // $$('group').data.sync(data);
  // });
    }
  }
}
// 获取当时相对应组的操作员
function operateData(){
  var c = $$("operater").count();
  var b=Array();
  for(var i=0;i<c;i++){
    b[i]=$$('operater').getItem($$("operater").getIdByIndex(i)).operate; 
  }
  return b;
}