webix.ready(function(){
  var params={};
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >库存状况</span>&nbsp;/&nbsp;&nbsp;CutterUse",
    height:45,
    borderless:true 
  };
  var my_toolbar={
    view:"toolbar",
    elements:[           
      // {view:"button",value:"查询",width:50,click:"check",css:"btn_check"}
    ]   
  };
  var my_datatable={
    view:"datatable",
    id:"mydatatable",   
    columns:[
      {id:"id",header:["ID"],},
      {id:"gg",header:["规格",{content:"textFilter"}],fillspace:true},
      {id:"gys",header:"供应商",fillspace:true},
      {id:"dqkc",header:"当前库存",fillspace:true},
      {id:"aqkc",header:"安全库存",fillspace:true},
      {id:"lysl",header:"领用数量",fillspace:true},
      {id:"hssl",header:"回收数量",fillspace:true},
      {id:"cysl",header:"持有数量",fillspace:true},
      {id:"cz",header:"操作",template:"<a class='btn1' href='useRecord.html'>#cz#</a>",adjust:true,fillspace:true},    
    ],  
    tooltip:true,
    height:700,        
    select:true,
    editable:true,
    checkboxRefresh:true,
    data:my_kucun,//url:当是外来数据时用这个
    // url:"http://192.168.1.111:9001/Application/demo"
    // url:""
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
      {height:10},
      my_datatable,
      page
    ],
  };
  webix.ui(web);//---webix.ui结束----
})
 
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