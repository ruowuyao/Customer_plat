 var filmset = [
    {operater_id:"MS_199412",operater_name:"张飞1",department:"A000001",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:1},
    {operater_id:"MS_199213",operater_name:"张飞2",department:"A000002",address:"广东省深圳市地址 ",sex:"女",tel:123456789,userState:0},
    {operater_id:"MS_199111",operater_name:"张飞3",department:"A000003",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:1},
    {operater_id:"MS_199999",operater_name:"张飞4",department:"A000004",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:1},
    {operater_id:"MS_198887",operater_name:"张飞5",department:"A000005",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:0},
    {operater_id:"MS_145445",operater_name:"张飞6",department:"A000006",address:"广东省深圳市地址 ",sex:"女",tel:123456789,userState:0},
    {operater_id:"MS_135455",operater_name:"张飞7",department:"A000007",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:0},
    {operater_id:"MS_234445",operater_name:"张飞8",department:"A000008",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:1},
    {operater_id:"MS_565465",operater_name:"张飞9",department:"A000009",address:"广东省深圳市地址 ",sex:"男",tel:123456789,userState:1},
    
  ];
  // 测试数据
  var roleData=[
  {roleName:"超级管理员"},
  {roleName:"管理员"},
  {roleName:"VIP用户"},
  {roleName:"普通用户"},
  {roleName:"浏览者"},
];
webix.ready(function(){
  var params={};
  params.pageSize=10;
  //得到成员表格
  postData("H1",params,callback1);
  
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >成员管理</span>&nbsp;/&nbsp;&nbsp; MemberManagement",
    height:45,
    borderless:true 
  };
  var my_table={
        view:"datatable",
        id:"mydatatable",     
        columns:[
          {id:"operater_id",header:"成员id",/* [{ content:"textFilter", placeholder:"请输入成员id进行查询",}],*/fillspace:true,sort:"string"},
          {id:"operater_name",header:"成员姓名",/*[{ content:"textFilter", placeholder:"请输入成员姓名进行查询",}],*/fillspace:true},
          {id:"department",header:"所属部门",/*[{ content:"textFilter", placeholder:"请输入所属部门进行查询",}],*/fillspace:true},
          {id:"sex",header:"性别",fillspace:true},
          {id:"tel",header:"联系方式",fillspace:true},
          {id:"address",header:"地址",fillspace:true},
          {id:"userState",header:"用户状态",fillspace:true,
            template:function(obj,type){
                if(obj.userState==0){
                    return "不启用";
                }if(obj.userState==1){
                    return "启用";
                }    
              }
            },
            {id:"edit",header:"操作",width:60,template:"<div><a href='#' onclick=\"edit('#operater_id#');\">编辑</a></div>"},
        ],
        height:600,      
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
            label:"成员id:",
            width:200
          },
          {
            view:"text",
            id:"s2",
            label:"成员姓名:",
            width:200
          },
          {
            view:"text",
            id:"s3",
            label:"所属部门:",
            width:200
          },
          {view:"button",value:"查询",width:50,click:"select",css:"btn_check"},
          {view:"button",value:"添加成员",width:100,click:"addRow",css:"btn_check"},
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
//添加成员模态框实现
var basicForm1=[
 {margin:100,cols:[
            {view:"text",id:"memberNo",name:"memberNo", width:300,label:"成员id：",labelWidth:100},
            {view:"text",id:"memberName",name:"memberName",width:300,label:"成员姓名：",labelWidth:100},
        ]},
        {margin:100,cols:[
          {view:"text",id:"psd",name:"psd",type:"password", width:300,label:"密码：",labelWidth:100},
            {view:"text",id:"tel",name:"tel",width:300,label:"联系电话：",labelWidth:100},
       ]},
        {margin:100,cols:[
          // {view:"text",id:"department",name:"department",width:300,label:"所属部门：",labelWidth:100},
          {view:"text",id:"department",name:"department",width:300,label:"电子邮件：",labelWidth:100},
          {view:"text",id:"address",name:"address",width:300,label:"地址：",labelWidth:100,}
        ]},
        {margin:100,cols:[
        { view:"radio", name:"sex",id:"sex", label:"性别：",labelWidth:100,width:300, options:["男", "女"] },
        { view:"checkbox", name:"state",id:"state",value:1,label:"用户状态：", labelWidth:100, labelRight:"启用" ,width:300},
        ]},
];
var formPlat=[
                          {view:"text",label:"所属平台：",id:"platN",width:300, labelWidth:100,css:{"margin-left":"10px!important"}},
                          {view:"text",label:"平台客户：",id:"platC",width:300,labelWidth:100}
                        ];
formPlat[0].readonly = true;
formPlat[1].readonly = true;
var Mytabview={
          view:"tabview",
          cells:[
            {
              header:"基础信息",
              body:{
                view:"form",
                id:"basicForm",
                width:800,
                height:360,
                elements:basicForm1
              }
               
            },
            {
              header:"角色信息",
              body:{
                rows:[
                    {margin:50,
                        cols:formPlat/*[
                          {view:"text",label:"所属平台：",id:"platN",width:300, labelWidth:100,css:{"margin-left":"10px!important"}},
                          {view:"text",label:"平台客户：",id:"platC",width:300,labelWidth:100}
                        ]*/
                    },
                    {
                      view:"datatable",
                      id:"roleTable",
                      width:800,
                      height:322,
                      editable:true,
                      select:true,
                      css:{"margin-left":"10px!important"},
                      columns:[
                      {id:"pick", header:"选择", template:"{common.checkbox()}",checkValue:"1",width:60},
                        {id:"roleName",header:"角色名称",fillspace:true},
                        {id:"useDate",header:"有效时间",editor:"date",  stringResult:true, fillspace:true},
                        {id:"expiryDate",header:"失效时间",editor:"date", stringResult:true, fillspace:true},
                      ],
                    }
                  ]
              }
            }
          ]
      };
webix.ui({
    view:"window",
    id:"win3",
    borderless:true,
    type:"clean",
    position:"center",
    // css:{"width":"60%","height":"70%"},
    width:800,
    height:500,
    modal:true,
    move:true,
    head:false,
    body:{
      rows:[
      Mytabview,
      {cols:[
        {view:"button",id:"save",value:"保存",click:"save",width:80,css:{"margin-left":"620px!important"}},
        {view:"button",id:"cancel",value:"取消",click:"$$('win3').hide()",width:80,css:{"margin-left":"10px!important"}},
      ]}
      ]
    }
  });
//获取所属平台和客户名称并且赋值
$$("platC").setValue("sadasds");
$$("platN").setValue("aaaaa");
  // 实现删除
$$('mydatatable').on_click.padding_less=function(e, id, trg){
            $$("mydatatable").editStop();   
            $$("mydatatable").remove(id);
            return false;
  };
$$("s1").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        var name2=$$("s2").getValue();
        var name3=$$("s3").getValue();
        if(value==""&&name2==""&&name3==""){
          location.reload();
        }
    }); 
$$("s2").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        var name2=$$("s1").getValue();
        var name3=$$("s3").getValue();
        if(value==""&&name2==""&&name3==""){
          location.reload();
        }
    });
$$("s3").attachEvent("onTimedKeyPress",function(){
        var value = this.getValue();
        var name2=$$("s2").getValue();
        var name3=$$("s1").getValue();
        if(value==""&&name2==""&&name3==""){
          location.reload();
        }
    });
$$("roleTable").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
  var item = $$("roleTable").getSelectedItem();
  console.log(item);
  if(item.useDate>item.expiryDate&&item.useDate&&item.expiryDate){
    alert("有效时间不能大于失效时间！");
    item[editor.column]="";
    // $$("roleTable").updateItem(editor.row, editor.column);
  }
});
})

function addRow(){ 
  $$("basicForm").clear();
  $$("state").setValue(1);
  $$("memberNo").enable();
  $$("psd").enable();

   // 得到角色表格
  postData("H2","",callback2);
  // 测试数据
  var roleData=[
  {roleName:"超级管理员"},
  {roleName:"管理员"},
  {roleName:"VIP用户"},
  {roleName:"普通用户"},
  {roleName:"浏览者"},
];
$$('roleTable').clearAll();
  $$('roleTable').define("data",roleData);
  $$("roleTable").refresh();
  $$("win3").show();
};
//查询实现
function select(){
  var pici=$$("s1").getValue();
  var pici1=$$("s2").getValue();
  var pici2=$$("s3").getValue();
  params=pici+"#"+pici1+"#"+pici2;
  alert(params);
  postData("",params,callback);
}
function save(){
  var params={};
  var formValues={};
  var tableValues=[];
  var flag=false;
  $$("roleTable").editStop();
  // 表单数据
  formValues=$$("basicForm").getValues();
  console.log(formValues);
  params.formValues=formValues;
  // 遍历每一行，得到表格数据
  $$("roleTable").eachRow( 
    function (row){
      if($$("roleTable").getItem(row).pick==1){
      tableValues.push($$("roleTable").getItem(row));
        flag=true;
      }
    });
  console.log(tableValues);
  params.tableValues=tableValues;
  if(formValues.memberNo==""){
          alert("请填写成员id...");
          return false;
        }
        if(formValues.memberName==""){
          alert("请填写成员姓名...");
          return false;
        }
        if(formValues.psd==""){
          alert("请填写密码...");
          return false;
        }
        if(formValues.tel==""){
          alert("请填写联系方式...");
          return false;
        }
        if(formValues.department==""){
          // alert("请填写所属部门...");
          alert("请填写电子邮件...");
          return false;
        }
        if(formValues.department.indexOf("@")<0){
          // alert("请填写所属部门...");
          alert("请规范填写电子邮件...");
          return false;
        }
        if(formValues.address==""){
          alert("请填写地址...");
          return false;
        }
        if(formValues.sex==""){
          alert("请选择性别...");
          return false;
        }
        if(!flag){
          alert("请给成员添加角色...");
          return false;
        }
        else{
          console.log(params);
          postData("T1",params,callback1);
          $$('win3').hide();
          $$("roleTable").clearAll();
          $$("basicForm").clear();
        }
}
function callback1(data) {
  //从后台获取数据，得到所有成员表格数据
  var text1 = JSON.parse(data);
  $$('mydatatable').clearAll();
  $$('mydatatable').define("data",text1.page);
  $$("mydatatable").refresh();
  $$("pagerA").define("limit", text1.totalPageCount);
  $$("pagerA").define("count", text1.totalCount);
  $$("pagerA").define("size", text1.pageSize);
  $$("pagerA").define("page", text1.currPage - 1);
  $$('pagerA').refresh();
}
function callback2(data) {
  //从后台获取数据，得到所有角色名称
  var text1 = JSON.parse(data);
  $$('roleTable').clearAll();
  $$('roleTable').define("data",text1.page);
  $$("roleTable").refresh();
}
function edit(memberNo){
  $$("win3").show();
  var params={};
  params.memberNo=memberNo;
   // 得到对应成员的角色表格
  postData("H2",params,callback2);
  // 测试数据
  var tableData=[
    {pick:1,roleName:"超级管理员",useDate:"2016-01-05 00:00"},
    {pick:0,roleName:"管理员"},
    {pick:0,roleName:"VIP用户"},
    {pick:1,roleName:"普通用户",useDate:"2016-01-05 00:00"},
    {pick:1,roleName:"浏览者",useDate:"2016-01-05 00:00",expiryDate:"2017-01-05 00:00"},
  ];
  $$('roleTable').clearAll();
  $$('roleTable').define("data",tableData);
  $$("roleTable").refresh();
  //根据成员号从后台获取成员信息
  // webix.ajax().sync().post("T1", "operater_id="+memberNo, function(text, xml, xhr) {
  //   var memberData=text.data;
  // });
 // 测试数据
 var formData= {memberNo:"MS_199999",memberName:"张飞4",department:"A000004",address:"广东省深圳市地址 ",sex:"男",tel:123456789,state:1,psd:123456};
  $$('basicForm').setValues({
          memberNo : formData.memberNo,
          memberName : formData.memberName,
          department : formData.department,
          address : formData.address,
          sex : formData.sex,
          tel : formData.tel,
          psd : formData.psd,
          state : formData.state
        });
  $$("memberNo").disable();
  $$("psd").disable();
}