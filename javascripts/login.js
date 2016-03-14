webix.ready(function(){
	var loginForm=[
			{view:"text",id:"username",label:"账号:",height:42,name:"username"},
			// {view:"label",id:"confirmUse",height:15},
			{view:"text",id:"psd",type:"password",height:42,name:"passowrd",label:"密码:" },
			{cols:[
			{view:"label",id:"confirm",height:15,css:"confirm"},
	        {
	          view:"button",id:"login",name:"login",width:80,css:{"margin-left":"0px!important"},value:"登录",type:"form",
	          click:function(){
		            var username = $$("username").getValue();
		            var password = $$("psd").getValue();
		            // alert("账号1："+username+"密码："+password);
		            if(username==""){
		            	$$("confirm").setValue("*请输入用户名");
		            }
		            else if(password==""){
		            	$$("confirm").setValue("*请输入密码");
		            }
		            else if(username!="1234"||password!="123456"){
		            	$$("confirm").setValue("*用户名或者密码错误");
		            }
		            else{
		            		window.location.href = "index.html";
		            }
				}
	        }
			]}
    		
    		
		];
	webix.ui({
	  view:"window",
      id:"win1",
      // width:300,
      // height:250,
      // position:"center",
      // modal:true,
      move:true,
      left:700, top:200,
      // resize:true,
      head:{
      	template:"<span style='font-size: 22pt;font-weight:bold; font-family: '微软雅黑';'' >ASTS&nbsp;&nbsp</span><span>customer platform</span>",
      },
      body:{
        view:"form",
		container:"login",
		id:"loginForm",
		css:"login",
		width:450,
		margin:20,
		elements:loginForm
      }
    }).show();
})