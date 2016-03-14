webix.ready(function(){
  var params={};
  params.pageSize=10;
  var roleData=[
    {rowid:"ms0123865",roleName:"管理员1",creator:"华晨新1",customerInfo:"hasdksakisa1"},
    {rowid:"ms0123866",roleName:"管理员2",creator:"华晨新2",customerInfo:"hasdksakisa2"}
  ];
  //---------------------- 添加角色模态框开始------------------
  var form1=[
    {
      cols:[
        {view:"text",label:"角色名称",id:"roleName",name:"roleName",width:300,labelWidth:100},
        {width:180},
        {view:"text",label:"所属平台",id:"plat",name:"plat",width:300,labelWidth:100},
      ]
    },
    {
      cols:[
        {view:"text",label:"客户信息",id:"customerInfo",name:"customerInfo",width:300,labelWidth:100},
        {},
      ]
    }
  ];
  form1[0].cols[2].readonly=true;
  form1[1].cols[0].readonly=true;
  /*基础信息表单*/
  var my_form = {
   	view:"form",
   	id:"my_form",
   	width:1000,
   	height:500,
   	borderless:true,
   	elements:form1
  }     
  /*权限信息表格*/
  var my_treetable={
   	view:"treetable",
   	id:"my_treetable",
   	height:500,     
   	columns:[
   	  {id:"checkbox", header:["选择",{content:"masterCheckbox" }], template:"{common.checkbox()}", fillspace:true},
   	  {id:"leve",header:["leve",{content:"textFilter"}],fillspace:true},
      {id:"permissions",header:"权限点",template:"{common.treetable()}#permissions#",width:250},
   	  {id:"ATTR1",header:"ATTR1",fillspace:true,editor:"text"},
   	  {id:"ATTR2",header:"ATTR2",fillspace:true,editor:"text"},
   	  {id:"ATTR3",header:"ATTR3",fillspace:true,editor:"text"},
   	  {id:"ATTR4",header:"ATTR4",fillspace:true,editor:"text"},
   	],  
   	// autoheight:true,      
   	select:true,
   	editable:true,
   	checkboxRefresh:true,
   	// data:juese,//url:当是外来数据时用这个
  };
  /*客户信息、权限信息保存、退出按钮*/
  var my_btn={
   	cols:[
   	  {},
   	  {view:"button",value:"保存",width:70,click:"save_role"},
   	  {view:"button",value:"退出",width:70,click:function(){exit("roles")}}
   	] 
  };
  /*tabView*/
  var my_tabView={
    view: "tabview",
    cells: [
      {
      	height:800,
        header: "基础信息",
        body:{
        	rows:[
            my_form,
            my_btn
        	]	    	    
        }
      },
      {
      	height:800,
        header: "权限信息",
        body:{
        	rows:[
            my_treetable,
            my_btn
        	]      	    
        }
      }
    ]
  };
  //window模态框
  var roles=new webix.ui({
   	view:"window",
   	type:"space",
   	id:'roles',
   	width:1000,
   	height:600,
   	position:"center",
   	modal:true,
   	move:true,
   	head:false,
   	body:webix.copy(my_tabView)
  });
  //---------------------- 添加角色模态框结束------------------

	/*头部信息*/
	var my_template={
	  template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >角色管理</span>&nbsp;/&nbsp;&nbsp;Roles",
	  height:45,
	  borderless:true 
	};
	/*添加角色按钮*/
	var my_button={
    view:"button",id:"btn1",value:'添加角色',inputWidth:85,/*width:150,*/click:function(){showForm("roles")}
	};
	/*显示表格*/
	var my_datatable2={
	  view:"datatable",
	  id:"my_datatable2",
	  columns:[
	    { id:"roleName",header:["角色名称",{ content:"textFilter", placeholder:"请输入角色名称进行查询",}],fillspace:true},
      { id:"creator",header:"创建者",fillspace:true},
      { id:"customerInfo",header:"客户信息",fillspace:true},
	    { id:"operate",header:"操作",template:"<a class='btn1'href='#' onclick=\"edit();\">编辑</a>",fillspace:true},
	  ],
	  height:600/*740*/,
	  editable:true,
	  tooltip:true,
	  data:roleData,
	  select:"row",
	};
	var web={
	  container:"container",
	  type:"line",
	  id:"mylayout",
	  rows:[
	    my_template,
	    my_button,
	    my_datatable2,
      page
	  ],
	};
  
	// webix.ui(my_datatable);
	webix.ui(web);//---webix.ui结束----

  /*从后台获取数据，显示已添加的角色表格*/
  // postData("H1",params,callback1);
  
  /*复选框若有子节点，子节点选中状态跟随父节点*/
  $$("my_treetable").attachEvent("onCheck", function(row, column, state){
    var checkboxNodes=[];
    var item=$$("my_treetable").getItem(row);
    if(item.$count>0){//如果该节点有子节点
      // 遍历每一行权限信息，通过判断$parent是否等于父节点，得到所有子节点的id（other：通过父节点的$count，知道相同个数的下面的div就是子节点）
      $$("my_treetable").eachRow( function (row2){
        var item2=$$("my_treetable").getItem(row2);
        if(item2.$parent==row) checkboxNodes.push(row2);
      });
      for(var j=0;j<checkboxNodes.length;j++){//将子节点的复选框状态等于父节点的状态
        var row = $$("my_treetable").getItem(checkboxNodes[j]);
        row.checkbox=state;
      }
    }
  });


});//---end----

/*点击“添加角色”按钮显示模态框:从后台获取数据 */
function showForm(winId){
  $$(winId).show();
  /*从后台获取基础信息和权限信息数据*/
  // postData("H2","",callback2);
  //从后台获取基础信息表单部分数据
  //测试数据
  $$('my_form').setValues({
      plat: "客户平台", 
      customerInfo: "华晨新"
    });
  // 得到权限表格
  
  // 测试数据
  var juese=[
    {"leve":"1","permissions":"权限1","open":true,checkbox:1,"data":[
      {"leve":"1.1","permissions":"权限1.1",checkbox:0},
      {"leve":"1.2","permissions":"权限1.2",checkbox:1,open:true,"data":[
        {"leve":"1.2.1","permissions":"权限1.2.1",checkbox:0},
        {"leve":"1.2.2","permissions":"权限1.2.2",checkbox:0}
      ]},
      {"leve":"1.3","permissions":"权限1.3",checkbox:0},
      {"leve":"1.4","permissions":"权限1.4",checkbox:0}
    ]},
    {"leve":"2","permissions":"权限2","open":true,checkbox:0,"data":[
      {"leve":"2.1","permissions":"权限2.1",checkbox:0},
      {"leve":"2.2","permissions":"权限2.2",checkbox:1},
      {"leve":"2.3","permissions":"权限2.3",checkbox:0},
      {"leve":"2.4","permissions":"权限2.4",checkbox:0}
    ]},
  ];
  $$('my_treetable').clearAll();
  $$('my_treetable').define("data",juese);
  $$("my_treetable").refresh();
};
/*点击“编辑”按钮*/
function edit(){
  var params={};
  var rowId;//交给后台的数据，以获取相应的数据
  dt2.attachEvent("onItemClick", function(id, e, node){//获取点击编辑按钮的那一行的数据
      var item = this.getItem(id);
      // rowId=item.***;
      console.log(item); 
      console.log(id); 
  });
  $$("roles").show();//打开编辑的window
  // postData("H2",rowId,callback3);

  // 测试数据
  // 得到对应成员的基础信息表单测试数据
  var formData= {roleName:"管理员",plat:"客户工作平台",customerInfo:"hasdksakisa"};
  $$('my_form').setValues(formData); 
  // 得到对应成员的权限表格测试数据
  var juese1=[
      {"leve":"1","permissions":"权限1","open":true,"data":[
        {"leve":"1.1","permissions":"权限1.1",checkbox:0},
        {"leve":"1.2","permissions":"权限1.2",checkbox:1,open:true,"data":[
          {"leve":"1.2.1","permissions":"权限1.2.1",checkbox:0},
          {"leve":"1.2.2","permissions":"权限1.2.2",checkbox:0}
        ]},
        {"leve":"1.3","permissions":"权限1.3",checkbox:0},
        {"leve":"1.4","permissions":"权限1.4",checkbox:0}
      ]},
      {"leve":"2","permissions":"权限2","open":true,"data":[
        {"leve":"2.1","permissions":"权限2.1",checkbox:0},
        {"leve":"2.2","permissions":"权限2.2",checkbox:1},
        {"leve":"2.3","permissions":"权限2.3",checkbox:1},
        {"leve":"2.4","permissions":"权限2.4",checkbox:0}
      ]},
    ];
  $$('my_treetable').clearAll();
  $$('my_treetable').define("data",juese1);
  $$("my_treetable").refresh();
}
/*点击“保存”按钮,将“基础信息”和“权限信息”一起发送至后台*/
function save_role(){
  var params={};//要传给后台的所有数据
  var formValues={};//要传给后台的基础信息表单数据
  var tableValues=[];//要传给后台的权限信息表格数据
  $$("my_treetable").editStop();
  // 获取基础信息表单数据
  formValues=$$("my_form").getValues();
  console.log(formValues);
  params.formValues=formValues;
  // 遍历每一行权限信息，得到表格数据
  $$("my_treetable").eachRow(function (row){
    tableValues.push($$("my_treetable").getItem(row));
  });
  console.log(tableValues);
  params.tableValues=tableValues;
  console.log(JSON.stringify(params));
  /*判断基础信息和权限信息是否已填写*/
  var checkboxCount=0;
  for(var i=0;i<tableValues.length;i++){    
    if(tableValues[i].checkbox==1){
      checkboxCount++;
    }
  }
  if(formValues.roleName==""||checkboxCount==0){
    webix.alert({
      title: "警告",
      text: '您有数据尚未填写或勾选！',
      ok: "确定",
      type: "confirm-warning",
      callback: function(result) {
        if (result == true) {
        }
      }
    });
    return false;
  }
  else{
    console.log(params);
    postData("T1",params,callback1);
    $$('roles').hide();
    $$("my_form").clear();
    $$("my_treetable").clearAll();   
  }     
}
/*退出模态框*/
function exit(winId){
  $$(winId).hide();
  $$("my_form").clear();
};
/*从后台获取数据，得到已添加角色的表格数据*/
function callback1(data) {
  var text1 = JSON.parse(data);
  /*显示表格数据*/
  $$('my_datatable2').clearAll();
  $$('my_datatable2').define("data",text1.page);
  $$("my_datatable2").refresh();
  /*显示分页数据*/
  $$("pagerA").define("limit", text1.totalPageCount);
  $$("pagerA").define("count", text1.totalCount);
  $$("pagerA").define("size", text1.pageSize);
  $$("pagerA").define("page", text1.currPage - 1);
  $$('pagerA').refresh();
}
/*点击“添加角色”按钮时，从后台获取基础信息表单和权限信息表格数据*/
function callback2(data) {
  var text2 = JSON.parse(data);
  //从后台获取数据，得到基础信息表单
  $$('my_form').setValues(text2.info1);
  //从后台获取数据，得到权限信息表格
  $$('my_treetable').clearAll();
  $$('my_treetable').define("data",text2.info2);
  $$("my_treetable").refresh();
}
/*点击“编辑”按钮时，与后台交换数据*/
function callback3(data) {
  var text3 = JSON.parse(data);
  // 从后台获取数据，得到基础信息表格
  $$('my_form').setValues(text2.jichu);
  
  //从后台获取数据，得到权限信息表格
  $$('my_datatable').clearAll();
  $$('my_datatable').define("data",text2.quanxian);
  $$("my_datatable").refresh();
}

