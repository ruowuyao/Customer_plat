 webix.ready(function(){
  var my_template={
    template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >版本日志</span>&nbsp;/&nbsp;&nbsp; VersonLog",
    height:45,
    borderless:true 
  };
  var body={
    // css:"OutBorder",
    // width:1600,
    multi:true,
        view:"accordion",
        rows:[
          { header:"客户工作平台4.2.679(2016-01-09) 升级",
            body:{
              template:"<div>1.优化退出、注销、重启软件的速度<p>2.优化了同步的速度<p>3.修复了 win7 系统在没有选中笔记的情况下按 ctrl+m 导致崩溃的bug<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复若干 bug 并优化了软件性能</div>",
              css:"firstT"
            }, 
            height:300
          },
          { 
            header:"客户工作平台4.2.437(2016-03-11) 升级",
            body:{
              template:"<div>1.新增笔记修订功能<p>2.增加别人在评论中@我的消息显示在消息中心->@提到我的消息中<p>3.优化不同群组间移动笔记时，笔记原始评论显示效果<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复了某些情况下在选项中设置了默认字体为微软雅黑，却显示 Times 的 bug<p>7.修复英文版本下个人主页不可显示的 bug</div>",
              css:"firstT"
            }, 
            height:300
          },
          { 
            header:"客户工作平台4.2.437(2016-05-15) 升级",
            body:{
              template:"<div>1.新增笔记修订功能<p>2.增加别人在评论中@我的消息显示在消息中心->@提到我的消息中<p>3.优化不同群组间移动笔记时，笔记原始评论显示效果<p>4.修复了移动多个文件夹，多次点击进度条的取消按钮可能引起崩溃的bug<p>5.修复了修改用户名或密码时提示同步错误的bug<p>6.修复了某些情况下在选项中设置了默认字体为微软雅黑，却显示 Times 的 bug<p>7.修复英文版本下个人主页不可显示的 bug</div>",
              css:"firstT"
            }, 
            height:300
          }
        ]
  };
  var web={
    container:"body",
    type:"line",
    id:"mylayout",
    rows:[
        my_template,
        body
    ],
  };
  webix.ui(web);//---webix.ui结束----
})