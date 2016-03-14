webix.ready(function(){
webix.ui.fullScreen();
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >操作员管理</span>&nbsp;/&nbsp;&nbsp; AllOperater",
    height:45,
    borderless:true 
  };
  var web={
    container:"body",
    type:"line",
    id:"mylayout",
    rows:[
        my_template,
       
    ],
  };
  webix.ui(web);//---webix.ui结束----

})

