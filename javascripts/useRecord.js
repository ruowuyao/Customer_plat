webix.ready(function(){
  var params=new Array();
  var URL="";
  var my_template={
      template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >领用回收记录</span>&nbsp;/&nbsp;&nbsp;useRecord",
      height:45,
      borderless:true 
  };
  var my_toolbar={
      view:"toolbar",
      elements:[          
        {
          view:"datepicker",
          id:"storge_date",
          timepicker:true,
          label:"开始",
          labelAlign:"right", 
          name:"end",
          stringResult:true,
          format:"%Y年%m月%d日  at %H:%i:%s",
          width:320
        },
        {
          view:"datepicker",
          id:"storge_date2",
          timepicker:true,
          label:"结束",
          labelAlign:"right", 
          name:"end",
          stringResult:true,
          format:"%Y年%n月%d日  at %H:%i:%s",
          width:320
        },
        {width:30},
        { view:"text", placeholder:"请输入查询条件",width:200 },
        {view:"button",value:"查询",width:50,click:check,css:"btn_check"}
      ]   
  };
  var my_datatable={
    view:"datatable",
    id:"mydatatable",     
    columns:[
      {id:"id",header:["ID"],fillspace:true},
      {id:"czy",header:["操作员",{content:"textFilter"}],fillspace:true},
      {id:"lysl",header:"领用数量",fillspace:true},
      {id:"hssl",header:"回收数量",fillspace:true},
      {id:"cysl",header:"持有数量",math:"[$r,:2] - [$r,:3]",fillspace:true},
      {id:"cz",header:"操作",template:"<a class='btn1' href='useRecord2.html'>#cz#</a>",adjust:true,fillspace:true},    
    ],  
    height:600,      
    select:true,
    tooltip:true,
    math: true,
    editable:true,
    checkboxRefresh:true,
    data:my_lyhs,//url:当是外来数据时用这个
    // url:URL//上面设置了URL全局变量
  };
  var page={
    view:"pager",
    id:"pagerA",
    count:1000,
    master:false,
    group:15,
    size:5,
    page:1,
    template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}",
    css:"pager",
    on: {
      onItemClick: function(id, e, node){
        if (id == "next") {
          if($$("pagerA").config.limit==$$("pagerA").config.page+1)
            {
              id = $$("pagerA").config.limit-1;
            }
          else
          {
            id=$$("pagerA").config.page+1;
          }
        }
        else if(id=="prev")
        {
          id=$$("pagerA").config.page-1; 
        }
        else if(id=="first")
        {
          id=0;
        }
        else if(id=="last")
        {
          id=$$("pagerA").config.limit-1;
        } 
        var params={};
        params.currPage =parseInt(id)+1;
        alert( params.currPage);
        params.pageSize =5;
        postData("getCustomerList", params,callback);
      }
    },
    height:38,
    css:{"text-align": "center","margin-top":"20px!important"}
  };
  var web={
      container:"body",
      type:"line",
      id:"mylayout",
      rows:[
        my_template,
        my_toolbar,
        my_datatable,
        page
      ],
  };
  webix.ui(web);//---webix.ui结束----  
  
  function callback(data){
    alert(data);
    text1=JSON.parse(data); 
    var data = new webix.DataCollection({data:text1.page});
       $$('mydatatable').data.sync(data);
       $$("pagerA").define("limit",text1.totalPageCount);
       $$("pagerA").define("count",text1.totalCount);
       $$("pagerA").define("size",text1.pageSize);
       $$("pagerA").define("page",text1.currPage-1);
       $$('pagerA').refresh();
  }
  function check(){
    var startDate=$$("storge_date").getValue();
    var endDate=$$("storge_date2").getValue();
    params.push(startDate,endDate);
    console.log(params);
    postData("getCustomerList", params,callback2);   
  } 
  function callback2(data){
    // var text=JSON.parse(data);
    $$("mydatatable").clearAll();
    $$("mydatatable").define("url", URL);
    $$("mydatatable").refresh();
  }
/*-------all end----------*/
});  

  
