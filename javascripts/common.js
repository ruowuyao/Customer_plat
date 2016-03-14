function postData(url,params,page){
	webix.ajax().post(url, params, function(text, xml, xhr){
    console.log(text);
    console.log(xml);
    console.log(xhr);
                        //response
                        page(text);
        });
}
var page={
            view:"pager",
            id:"pagerA",
            count:1000,
            master:false,
            group:15,
            size:5,
            page:1,
            template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}",
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
            css:{"text-align": "center","margin-top":"20px!important","margin-bottom":"20px!important"}
        };
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