 var no=1;
webix.ready(function(){
    var big_film_set = [
        {"id":1,"teminal_name":"The Shawshank Redemption1","teminal_code":"hcx_000001",state:1},
        {"id":2,"teminal_name":"The Shawshank Redemption2","teminal_code":"hcx_000002",state:0},
        {"id":3,"teminal_name":"The Shawshank Redemption3","teminal_code":"hcx_000003",state:1},
        {"id":4,"teminal_name":"The Shawshank Redemption4","teminal_code":"hcx_000004",state:0},
        {"id":5,"teminal_name":"The Shawshank Redemption5","teminal_code":"hcx_000005",state:1}

    ];
    var data = [
        {"code":"cpu","name":"error"},
        {"code":"cpu","name":"error"},
        {"code":"cpu","name":"ok"},
        {"code":"cpu","name":"error"},
        {"code":"cpu","name":"ok"}

    ];
    var my_template={ 
              template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >终端状况</span>&nbsp;/&nbsp;&nbsp; TerminalState",
              height:45,
              borderless:true 
            };
    var my_toolbar={
        view:"toolbar",
        elements:[           
          {
            view:"text",
            id:"s1",
            label:"终端号：",
            width:300
          },
          {
            view:"text",
            id:"s2",
            label:"终端名称:",
            labelWidth:105,
            width:300
          },
          {view:"button",value:"查询",width:50,click:"select",css:"btn_check"}
        ]   
      };
    var my_table={
                view:"dataview",
                height:350,
                scroll:false,
                id:"dataviewC",
                borderless:true,
                type:{ 
                    width:300,
                    height:300,
                    template:function(obj){
                        if(obj.state==0){
                            return "<div class='overall' onclick=\"detail('#teminal_code#');\"><div id='sign1'></div><img src='images/guizi.png' /></div><div>终端号："+obj.teminal_code+"</div><div>终端名称："+obj.teminal_name+"</div><button class='look1' onclick=\"detail('#teminal_code#');\">查看详情</button>";   
                        }
                            return "<div class='overall' onclick=\"detail('#teminal_code#');\"><div id='sign2'></div><img src='images/guizi.png' /></div><div>终端号："+obj.teminal_code+"</div><div>终端名称："+obj.teminal_name+"</div><button class='look2' onclick=\"detail('#teminal_code#');\">查看详情</button>";   
                         if(obj.state==1){
                         }
                    }
                },
                data:big_film_set
            };
    var myDetail={
              view:"datatable",
              id:"table",
              height:250,
              css:"tableC",
              // hidden:true,
              type:{
                       votes_color:function(obj,type){
                            return  (obj.name =="ok"?"green":"red")
                        }
                    },
              columns:[
                {id:"No",header:"序号",width:60,
                    template:function(obj,type){
                      return no++;
                    }
                },
                {id:"code",header:"故障类型",fillspace:true},
                {id:"name",header:"错误情况",fillspace:true, 
                    template:function(obj,type){
                        return "<span style='color:"+type.votes_color(obj)+
                            "'>"+obj.name+"</span>";
                    }
                }
              ],
              data:data
            };
    var body=new webix.ui({
        fullscreen:true,
        container:"body",
        type:"line",
        id:"mylayout",
        margin:10,
        rows:[
            my_template,
            my_toolbar,
            my_table,
            myDetail,
            page
        ]//----rows结束----
    });//---webix.ui结束---- 
 $$('table').hide();
 //设置dataview高度
$(".overall").parent().parent().height(350);
});

function callback(data){
  alert(data);
  var text1=JSON.parse(data); 
  var data = new webix.DataCollection({data:text1.page});
  $$('mydatatable').data.sync(data);
  $$("pagerA").define("limit",text1.totalPageCount);
  $$("pagerA").define("count",text1.totalCount);
  $$("pagerA").define("size",text1.pageSize);
  $$("pagerA").define("page",text1.currPage-1);
  $$('pagerA').refresh();
}
function detail(teminal_code){
    // webix.ajax().sync().post("getSuppliersCutterList", "teminal_code=" + teminal_code,function(text, xml, xhr) {
          // var tableValues1 = $.parseJSON(text);
           // });
    no=1;
  // var data = new webix.DataCollection({data:tableValues1});
  // $$('table2').data.sync(data);
  $$("table").show();
}

//查询实现
function select(){
  params="";
  var s1=$$("s1").getValue();
  var s2=$$("s2").getValue();
  params=s1+"#"+s2;
  // alert(params);
  if(params=="#"){
    alert("请输入查询条件");
  }
  else{
    postData("",params,callback);
  }
  
}