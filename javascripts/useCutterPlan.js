webix.ready(function(){
	var my_template={
	  template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >安排刀具</span>&nbsp;/&nbsp;&nbsp;统计数据",
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
});