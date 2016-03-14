webix.type(webix.ui.tree, {
  name:"menuTree",
  height: 40,
  folder:function(obj, common){
    if(obj.icon)
      return "<span class='webix_icon icon fa-"+obj.icon+"'></span>&nbsp;";
    return "";
  }
});
webix.ready(function(){
webix.ui.fullScreen();
  //将所有打开的iframe的id赋值给变量openAll
  var openAll=new Array();
  openAll.push("currentP.html");
  var oa=new Array();//openAll处理过重复后的，后面又进行了删除后数据处理
  var treedata=[
    {id:"PM.html",value:"项目管理",data:[
      {id:"currentP.html",value:"当前项目",icon:"tasks"},
      {id:"finishedP.html",value:"完成项目",icon:"check"},
      {id:"productionPlan.html",value:"生产计划",icon:"spinner"},
      {id:"productionPlan2.html",value:"生产排配",icon:"th"},           
    ]},
    {id:"class.html",value:"班别管理",icon:"pinterest"},
    {id:"reserve.html",value:"库存状况",icon:"th-list "},
    {id:"useRecord.html",value:"领用回收记录",icon:"retweet"},  
    {id:"operator.html",value:"操作员管理",data:[
      {id:"alloperator.html",value:"所有操作员",icon:"user"},
      {id:"group.html",value:"操作员入组",icon:"group"},
    ]},
    {id:"machine.html",value:"机台管理",icon:"cogs"},
    {id:"cutterLibrary.html",value:"刀具库管理",icon:"list-alt"},
    {id:"report.html",value:"报表",icon:"bar-chart"},
    {id:"terminal.html",value:"终端状况",icon:"wrench"},
    {id:"system.html",value:"系统设置",open:true,data:[
      {id:"role.html",value:"角色管理",icon:"umbrella"}, 
      {id:"member.html",value:"成员管理",icon:"user-md"},            
    ]},
  ];
  var my_tab=[
    { value: '当前库存', id: 'listView'},
    { value: '领用记录', id: 'formView'},
    { value: '回收记录', id: 'aboutView'}
  ];
  var my_ctdata=[
    "删除全部标签","Rename","Delete",
    {$template:"Separator"},//这是一根分隔线
    "Info"
  ];
  var newdata=["全部删除","删除其他","删除右边"];
  var ctdata = webix.copy(newdata);

  //toolbar
  var my_toolbar={
      view:"toolbar",
      height: 60,
      elements:[ 
        {view:"label",template:"<div><img src='images/customer1.png' class='logo'/><span class='wenzi'>ASTS_客户工作平台</span></div>"},//第1行结束
        { view:"menu",
          id:"userMenu",
          type:{
                  subsign:true
                },
          data:[
            { view:"label",id:"customerN",value:"华诚兴3132",icon:"user",type:"icon",autowidth:true,
           submenu:[
                { view:"button", type:"icon", icon:"cog", value:"修改密码", width:100 ,click:"set"},
                { view:"button", type:"icon", icon:"level-up", value:"注销", width:100 ,click:"window.location.href = 'login.html';"},
              ]
            }
          ], 
          tooltip:{
                template:"<span class='webix_strong'>#value#</span>"
            },
          // minWidth:130,
          width:160,
          css:"userMenu",
          openAction:"click",
          on:{
            onMenuItemClick:function(id){
              var value=this.getMenuItem(id).value;
              console.log(value);
              if(value=="修改密码"){
                 $$("win1").show();
              }
              if(value=="注销"){
                 window.location.href = 'login.html';
              }
            }
          },
        },
        { view:"button", type:"icon", icon:"home", label:"首页", width:100,click:"firstPage()" },
        // { view:"button", type:"icon", icon:"cog", label:"设置", width:100 ,click:"set"},
        // { view:"button", type:"icon", icon:"level-up", label:"注销", width:100 ,click:"window.location.href = 'login.html';"},
        // { view:"icon", icon:"envelope", width:80,label:"gfdgf"},{ view:"icon", icon:"user", width:80},{ view:"icon", icon:"cog", width:80}
      ]
  };
  //tree
  var my_tree={
    view:"tree",
    css:"tree",
    id:"left_tree",
    type: "menuTree",
    // activeTitle:true,
    // gravity:0.1,
    width:170,
    // template:"{common.folder()}&nbsp;#value#",
    data:webix.copy(treedata),         
    select:true,
    fullspace:true,
    height:/*890*/890
    // autoheight:true,
  };
  //tabbar
  var my_tabbar={
    view:"tabbar", id:"my_tab",/*multiview:true,*/height:30, tabMinWidth:140,
    close:true,
    onContext:{}, // the empty object 
    options:[{ value: '当前项目', id: 'currentP.html'}], 
  };
  //iframe
  var my_iframe={
    view:"iframe", 
    css:"iframe",
    id:"frame-body",
    autowidth:true,
    // width:1740, 
    src:"currentP.html"
  };
  //contextmenu 用来删除全部打开的界面的下拉列表
  webix.ui({
    view:"contextmenu",
    id:"cmenu",
    data:ctdata
  });
  //整个web的布局
  var web={
    container:"body",
    rows:[
      my_toolbar,
      {
        cols:[{
          rows:[ my_tree,
          {view:"label",template:"<div class='rizi'>v0.01&nbsp;<span class='update' onclick=\"showLog();\">&nbsp;更新日志</span></div>",height:0}
          ]
        },
          {view:"resizer"},//第2行第2列结束
          {
            type:"line",
            rows:[
              /*{ id:"tabs", view:"tabbar",  multiview:true, options:[], height:50},
              { id:"views", cells:[
                 {view:"template", id:"tpl", template:"Pick a film from the list!"}
              ]}*/
              my_tabbar,
              my_iframe
            ]
          }       
        ]
      },//----cols结束----
    ]//----rows结束----
  };
  var xiugaiForm=[
      {view:"text",id:"username",label:"账号:",height:42,name:"username"},
      {view:"text",id:"psd",type:"password",height:42,name:"psd",label:"旧密码:" },
      {view:"text",id:"psd1",type:"password",height:42,name:"psd1",label:"新密码:" },
      {view:"text",id:"psd2",type:"password",height:42,name:"psd2",label:"确认密码:" },
      {view:"button",id:"sure",name:"sure",css:{"text-align":"center"},value:"确定",type:"form",click:"submit"}
     ];
  webix.ui({
    view:"window",
      id:"win1",
      move:true,
      modal:true,
      left:700, top:200,
      css:{"box-shadow":"1px 1px 1px 1px #eee"},
      // resize:true,
      head:{
         cols:[
        {view:"label", template:"<span style='font-size: 14pt; font-family: '微软雅黑';'' >&nbsp;&nbsp修改密码</span>" },
        { view:"icon", icon:"times-circle",
          click:"$$('win1').hide();"}
        ]
      },
      body:{
        view:"form",
        id:"xiugaiForm",
        width:450,
        margin:20,
        elements:xiugaiForm
      }
    });

 var head={
      view:"toolbar", margin:-4, cols:[
        {view:"label", label: "版本日志" },
        { view:"icon", icon:"times-circle",
          click:"$$('win3').hide();"}
        ]
  };
  var body={
    rows:[
          { 
              template:"<h2>客户工作平台4.2.679(2016-01-09) 升级</h2><div>1.优化退出、注销、重启软件的速度<p>2.优化了同步的速度<p>3.修复了 win7 系统在没有选中笔记的情况下按 ctrl+m 导致崩溃的bug<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复若干 bug 并优化了软件性能</div>",
            
            css:"firstT",
           
           autoheight:true
          },
          { 
           
                template:"<h2>客户工作平台4.2.437(2016-03-11) 升级</h2><div>1.新增笔记修订功能<p>2.增加别人在评论中@我的消息显示在消息中心->@提到我的消息中<p>3.优化不同群组间移动笔记时，笔记原始评论显示效果<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复了某些情况下在选项中设置了默认字体为微软雅黑，却显示 Times 的 bug<p>7.修复英文版本下个人主页不可显示的 bug</div>",
                css:"firstT",
                autoheight:true
          },
          { 
                template:"<h2>客户工作平台4.2.437(2016-05-15) 升级</h2><div>1.新增笔记修订功能<p>2.增加别人在评论中@我的消息显示在消息中心->@提到我的消息中<p>3.优化不同群组间移动笔记时，笔记原始评论显示效果<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复了某些情况下在选项中设置了默认字体为微软雅黑，却显示 Times 的 bug<p>7.修复英文版本下个人主页不可显示的 bug</div>",
                css:"firstT",
                autoheight:true
          }
        ]
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
    body:{
            view:"scrollview",
            body:body,
            scroll:true,
          }
 
  });
  webix.ui(web);//---webix.ui结束----
  //当点击左树时触发事件打开相应的Tabbar和iframe界面以及保存所有打开的iframe id
  $$("left_tree").attachEvent("onItemClick",function(sid,e,node){
    // 获取树的长度
    // var index  = tree.getBranchIndex('1.1');
    // $$('frame-body').define("src", sid);
    var item=this.getItem(sid);
    var value=item.value;
    // console.log(item.value);
    var t=$$("left_tree").serialize();
    // $$('my_tab').addOption(sid,value,true);
    for(var i=0;i<t.length;i++){
      if(t[i].$count==0&&t[i].id==sid){
        $$('frame-body').define("src", sid);
        $$('my_tab').addOption(sid,value,true);
      } 
      else{
          $$("left_tree").open(sid);
          for(var j=0;j<t[i].$count;j++){//每个根目录下子目录的数目
            if(t[i].data){
              if(t[i].data[j].$count==0&&t[i].data[j].id==sid){
                $$('frame-body').define("src", sid);
                $$('my_tab').addOption(sid,value,true);
              } 
            }
          }
      }
    } 
    openAll.push(sid);
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
    oa=openAll.distinct(); 
   }); 
  //当点击tabbar时触发事件打开相应的iframe界面并高亮相应的树节点
  $$("my_tab").attachEvent("onAfterTabClick",function(sid){
    $$('frame-body').define("src", sid);
    $$('left_tree').select(sid); 
  });
  //当右键tabbar时触发事件打开contextmenu
  $$("cmenu").attachTo($$("my_tab").$view);
  //当点击tab上的×后触发事件关闭相应的iframe界面并高亮变换后相应的树节点
  $$("my_tab").attachEvent("onOptionRemove", function(id, value){
    $$('frame-body').define("src", value);
    $$('left_tree').select(value);
    // console.log(id);
    if(value==-1){//当删除了所有的界面时，默认打开主页iframe和tabbar
      $$('frame-body').define("src", "mainPage.html");
      $$('my_tab').addOption("mainPage.html","主页",true);
    }
    //在数组oa中删除相应的元素    
    for(var i=0;i<oa.length;i++){
      if(oa[i]==id){
         oa.splice(i,1);
      }
    }
});

  //当右键contextmenu选项后删除全部
  $$("cmenu").attachEvent("onItemClick",function(sid,e,node){
    var context = this.getContext();
    // var src=context.target.attributes[1].nodeValue;
    var src=context.target.attributes[1].value;
    var ob=oa.reverse();
    //谷歌可以用，火狐不兼容
    //var listId = context.toElement.innerText;
    //谷歌、火狐都可以用
    var listId = context.target.childNodes[0].data;
    var del=oa.length;
    if(sid=="全部删除"){
      for(var i=0;i<del+1;i++){
          i=0;
          del--;
          $$('my_tab').removeOption(oa[i]);       
      }
    }
    if(sid=="删除其他"){
      for(var i=0;i<del+1;i++){
          i=0;
          del--;
          $$('my_tab').removeOption(oa[i]);       
      }
      $$('frame-body').define("src", src);
      $$('my_tab').addOption(src,listId,true);
      openAll.push(src);
      $$('my_tab').removeOption("mainPage.html");    
    }
      if(sid=="删除右边"){
      for(var i=0;i<del+1;i++){
          i=0;
          del--;
          $$('my_tab').removeOption(oa[i]);
          if(src==oa[i]){
             break;
          } 
      }
    }
  });
//webSocket连接
/*[Constructor(in DOMString url, in optional DOMString protocol)] 
 interface WebSocket { 
   readonly attribute DOMString URL; 
        // ready state 
   const unsigned short CONNECTING = 0; 
   const unsigned short OPEN = 1; 
   const unsigned short CLOSED = 2; 
   readonly attribute unsigned short readyState; 
   readonly attribute unsigned long bufferedAmount; 
   //networking 
   attribute Function onopen; 
   attribute Function onmessage; 
   attribute Function onclose; 
   boolean send(in DOMString data); 
   void close(); 
 }; 
 WebSocket implements EventTarget;

 
var wsServer='ws://localhost:8888/Demo';
var websocket=new WebSocket(wsServer);
websocket.onopen=function(evt){onOpen(evt)};
websocket.onclose=function(evt){onClose(evt)};
websocket.onmessage=function(evt){onMessage(evt)};
websocket.onerror=function(evt){onError(evt)};

function onOpen(evt){
  console.log('Connected to WebSocket server.');
}
function onClose(evt){
  console.log("Disconnected");
}
function onMessage(evt){
  console.log('Retrieved data from server: ' + evt.data);
}
function onError(evt){
  console.log('Error occured: ' + evt.data);
}*/


});

 function firstPage(){
    $$('frame-body').define("src", "mainPage.html");
      $$('my_tab').addOption("mainPage.html","主页",true);
  }
  function set(){
    $$("win1").show();
  }
  function submit(){
    var params={};
    var aa=$$("xiugaiForm").getValues();
    params.psd=aa.psd;
    params.psd1=aa.psd1;
    params.psd2=aa.psd2;
    if(params.psd==""){
      alert("请输入原来的密码...");
      return false;
    }
    if(params.psd1==""){
      alert("请输入新的密码...");
      return false;
    }
    if(params.psd2==""){
      alert("请确认新的密码...");
      return false;
    }
    else{
    console.log(params);
    // webix.ajax().sync().post("getSuppliersCutterList",params,function(text, xml, xhr) {
    //   if(xhr.state=="success"){
    //      $$("win1").hide();
    //   }
    //   else{
    //     console.log(xhr.state);
    //   }
    // }
  }
}
function showLog(){
   $$("win3").show();
}
