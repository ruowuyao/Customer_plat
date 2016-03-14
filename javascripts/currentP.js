var list_datas = new Array();
var datas_ggmc = new Array();
var datas_sm = new Array();
var datas_muls = new Array();
var project_data = {};
var jt_datas = [];
var my_gx = [];
var treefilm;
var jtss = [];
var list_index;
var ggss = [];
//used
var xms2 = {
    //used
    "project_name": "",
    "project_code": "",
    "process_data": [
    ]
};

var guige = [
'规格1', 
"规格2", 
"规格3"
];
var dataset2 = [
    {id: 1,value: "1"}, 
    {id: 2,value: "2"}, 
    {id: 3,value: "3"}, 
    {id: 4,value: "4"}, 
    {id: 5,value: "5"}, 
    {id: 6,value: "6"}, 
    {id: 7,value: "7"}, 
    {id: 8,value: "8"}, 
    {id: 9,value: "9"}, 
    {id: 10,value: "10"}, 
    {id: 11,value: "11"}, 
    {id: 12,value: "12"}, 
];
var dt3 = [
{project_name: "项目1",process_name: "工序1",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序2",cutter_specs: "规格2",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序3",cutter_specs: "规格2",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序1",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序3",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目3",process_name: "工序1",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序1",cutter_specs: "规格2",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序2",cutter_specs: "规格4",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序3",cutter_specs: "规格3",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序1",cutter_specs: "规格2",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序3",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目3",process_name: "工序1",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序3",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目3",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目1",process_name: "工序1",cutter_specs: "规格5",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目3",process_name: "工序1",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目4",process_name: "工序1",cutter_specs: "规格8",cutter_life: 100}, 
{project_name: "项目2",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
{project_name: "项目4",process_name: "工序2",cutter_specs: "规格1",cutter_life: 100}, 
];

webix.ready(function() {
    console.log(xms2);
    /*后台需要传过来的数据
  var cutters = JSON.parse($("#cutters").val());
  var machines = JSON.parse($("#machines").val());*/
    //---------------------- 添加项目模态框开始------------------
    //模态框的form表单内容
    var add_P_form = {
        view: "form",
        id: "add_P_form",
        borderless: true,
        complexData: true,
        elements: [
        {
            margin: 20,
            cols: [
            {
                view: "text",
                label: "项目名称",
                id: "project_name",
                name: "project_name",
                width: 300,
                labelWidth: 100
            }, 
            {
                view: "datepicker",
                id: "start_date",
                timepicker: true,
                label: "开始日期",
                labelAlign: "right",
                name: "start",
                stringResult: true,
                format: "%Y-%m-%d",
                width: 240
            }, 
            {
                view: "datepicker",
                id: "end_date",
                timepicker: true,
                label: "结束日期",
                labelAlign: "right",
                name: "end",
                stringResult: true,
                format: "%Y-%m-%d ",
                width: 240
            }, 
            ],
        }, 
        {
            margin: 10,
            cols: [
            {}, 
            {
                view: "button",
                id: "btn4",
                value: '下一步',
                click: "down_pro",
                inputWidth: 70,
                width: 70
            }
            ]
        }
        ]
    }
    var add_P_toolbar = {
        view: "toolbar",
        id: "add_P_toolbar",
        elements: [
        {
            view: "label",
            label: "添加项目",
            width: 85
        }, 
        {}, 
        {
            view: "icon",
            icon: "times-circle",
            css: "alter",
            click: "$$('project').hide();"
        }
        ],
    }
    //window模态框
    var project = new webix.ui({
        view: "window",
        id: 'project',
        width: 1200,
        position: "center",
        modal: true,
        move: true,
        head: webix.copy(add_P_toolbar),
        body: webix.copy(add_P_form)
    });
    //---------------------- 添加项目模态框结束------------------
    
    //---------------------- 添加工序、规格（寿命）、机台模态框开始------------------
    
    /*显示工序添加操作*/
    var pro_list = {
        rows: [
            {
            margin: 10,
            cols: [
            {
                view: "text",
                id: "add_pro",
                label: "工序名称:",
                placeholder: "请输入要添加的工序名称",
                width: 280
            }, 
            {
                view: "button",
                id: "add_pros_btn",
                width: 70,
                value: "添加工序",
                click: "add_pros"
            }
            ]
            }, 
            {
            view: "text",
            id: "search_pro",
            label: "快速查找:",
            placeholder: "请输入工序名称进行查询",
            width: 360
            }, 
            {
            view: "list",
            id: "process_list",
            template: "#process_name#<button class='delbtn1 right2 style'>删除</button>",
            width: 320,
            height: 400,
            select: true,
            data: [],
            onClick: {//删除工序事件
                "delbtn1": function(e, id, trg) {
                    var list_index2=$$("process_list").getIndexById(id);//点击的删除按钮所在工序索引
                    if (xms2.process_data[list_index]) { //判断数据是否已经保存过，若保存过还需将数据删除           
                        $$("process_list").remove(id);//删除相应界面
                        xms2.process_data.splice(list_index2,1); //删除相应工序数据
                        ggss.splice(list_index2,1); //删除相应规格寿命数据
                        jt_datas.splice(list_index2,1); //删除相应机台数据
                        /*更换规格界面*/
                        $$("my_pro_dt").clearAll();
                        var id2 = $$("process_list").getSelectedId(); //相应界面删除后，若焦点更换，获取其id
                        var list_index3=$$("process_list").getIndexById(id2);
                        $$("my_pro_dt").define("data",ggss[list_index3] );
                        $$("my_pro_dt").refresh();
                        /*更换机台界面*/           
                        $$("muls").setValue(jt_datas[list_index3]);
                        $$("muls").refresh();
                    } 
                    else {
                        $$("process_list").remove(id);
                    }
                    return false;
                    //here it blocks default behavior
                }
            },
            }
        ]
    };
    /*弹出框图表按钮*/
    var right_button = {
        type: "line",
        css: "right_button",
        rows: 
        [
        {
            view: "button",
            value: "-->",
            width: 50,
            disabled: true
        }, 
        ]
    };
    /*规格表格*/
    var my_pro_dt = {
        view: "datatable",
        id: "my_pro_dt",
        width: 300,
        height: 440,
        columns: [
        {
            id: "material_id",
            header: "规格名称",
            width: 250,
            editor: "combo",
            options: guige,
            suggest: {
                body: {
                    on: {
                        'onItemClick': function(id) {
                            // 获取整个工序的规格gg_values
                            var dt = $$("my_pro_dt");
                            var gg_value;
                            var gg_values = [];
                            var select_value = this.getItem(id).value;
                            dt.eachRow(function(row) {
                                gg_value = dt.getText(row, "material_id");
                                gg_values.push(gg_value);
                            }
                            );
                            //
                            for (var i = 0; i < gg_values.length; i++) {
                                if (select_value == gg_values[i]) {
                                    webix.alert({
                                        title: "警告",
                                        text: "同一规格不能添加两次，如果需要添加，请在刀具库中添加新规格，通过客户简称区别！",
                                        ok: "确定",
                                        type: "confirm-warning",
                                        callback: function(result) {
                                            if (result == true) {
                                                var sel = dt.getSelectedId();
                                                console.log(sel);
                                                //获取正在选择的行的行id,列id名称,和行id
                                                var row = dt.getItem(sel.row);
                                                //获取正在选择的行的行内容,列内容,和行id
                                                /*row[sel.column] = "";
                                                dt.updateItem(sel.row, row);*/
                                                row.material_id="";
                                                dt.updateItem(sel.row, row);
                                            }
                                        }
                                    });
                                    break;
                                }
                            }
                            ;
                        }
                    }
                }
            }
        }, 
        {
            id: "cutter_life",
            header: "寿命",
            editor: "text",
            width: 100
        }, 
        {
            id: "operate",
            header: "操作",
            width: 70,
            tooltip: false,
            fillspace: true,
            template: "<button class='delbtn2 style'>删除</button>"
        }/*{common.trashIcon()}删除*/
        ],
        onClick: {//删除规格寿命事件
            "delbtn2": function(e, id, trg) {//list_index指选中的工序
              var id2 = $$("process_list").getSelectedId(); //相应界面删除后，若焦点更换，获取其id
              var list_index=$$("process_list").getIndexById(id2);//焦点所在工序索引
              var list_index2=$$("my_pro_dt").getIndexById(id);//焦点所在规格寿命索引
              if(xms2.process_data[list_index]) { //判断数据是否已经保存过，若保存过还需将数据删除
                ggss[list_index].splice(list_index2,1); //删除相应规格寿命数据
                $$("my_pro_dt").editStop();
                $$("my_pro_dt").remove(id);         
              }
              else {
                $$("my_pro_dt").editStop();
                $$("my_pro_dt").remove(id); 
              }
              return false;
            } 
        },
        select: true,
        data: "",
        editable: true,
        tooltip: true,
        // scrollX:true,
        scrollY: true,
        // data:filmset,//url:当是外来数据时用这个
        // url:"http://192.168.1.111:9001/Application/demo"
    };
    /*添加一行规格按钮*/
    var add_button = {
        view: "button",
        value: "添加规格",
        width: 70,
        click: "addRows"
    };
    /*选择机台多选下拉表*/
    var add_machine = {
        view: "multiselect",
        id: "muls",
        width: 350,
        inputWidth: 300,
        label: "机台选择",
        yCout: 2,
        options: {
            data: dataset2
        },
        labelAlign: 'right',
        inputAlign: "right"
    };
    /*模态框头部信息*/
    var add_pro_toolbar = {
        view: "toolbar",
        id: "add_pro_toolbar",
        elements: [
        {
            view: "label",
            label: "添加工序",
            width: 130
        }, 
        {}, 
        {
            view: "icon",
            icon: "times-circle",
            css: "alter",
            click: "cancel"
        }
        ],
    }
    /*模态框身体、尾部信息*/
    var add_pro_form = {
        view: "form",
        id: "add_pro_form",
        borderless: true,
        complexData: true,
        elements: [
        {
            cols: [
            pro_list, 
            right_button, 
            {
                rows: [
                {
                    cols: [
                    {}, 
                    add_button
                    ]
                }, 
                my_pro_dt, 
                ]
            }, 
            right_button, 
            {
                rows: [
                {
                    height: 230
                }, 
                add_machine
                ]
            }
            ]
        }, 
        {
            margin: 10,
            cols: [
            {}, 
            {
                view: "button",
                id: "btn_pro1",
                value: '上一步',
                inputWidth: 70,
                width: 70,
                click: 'up_project'
            }, 
            {
                view: "button",
                id: "btn_pro2",
                value: '保存当前数据',
                inputWidth: 120,
                width: 120,
                click: 'submit'
            }, 
            {
                view: "button",
                id: "btn_pro3",
                value: '完成',
                inputWidth: 70,
                width: 70,
                click: "all_submit"
            }, 
            ]
        }
        ]
    }
    /*window模态框*/
    var process = new webix.ui({
        view: "window",
        id: 'process',
        width: 1400,
        position: "center",
        modal: true,
        move: true,
        head: webix.copy(add_pro_toolbar),
        body: webix.copy(add_pro_form)
    });
    //---------------------- 添加工序-规格（寿命）-机台模态框结束------------------
    /*显示信息*/
    var my_template = {
        template: "<span style='font-size:20px; font-weight:bold; color:#3498DB'; >当前项目</span>&nbsp;/&nbsp;&nbsp;currentProject",
        height: 45,
        width: 300,
        borderless: true
    };
    /*创建项目按钮*/
    var my_button = {
        cols: [
        {
            view: "button",
            id: "btn1",
            value: '创建项目',
            inputWidth: 85,
            width: 90,
            click: function() {
                showForm("project")
            }
        },
        /*{
            view: "button",
            id: "btn2",
            value: '删除项目',
            inputWidth: 85,
            width: 90,
            click: function() {
                 var temp=$$('my_datatable3').getSelectedItem();
                 var params = {};
                 params["project_id"]=temp.project_id;
                 // if()
                 webix.confirm({
                   title:"警告",
                   text:"确定删除该项目？",
                   ok:"确定", 
                   cancel:"取消",
                   type:"confirm-warning",
                   callback:function(result){
                     if(result==true){
                       webix.ajax().sync().post("delProject", params, function(text, xml, xhr) {
                         location.reload();
                       })             
                     }
                   }
                 });                
            }
        }, */
        // {view:"button",id:"btn2",value:'Excel导入',inputWidth:85,width:85},    
        ],
    };
    /*显示当前页面表格*/
    var my_datatable3 = {
        view: "datatable",
        id: "my_datatable3",
        columns: [
        {
            id: "project_name",
            header: ["项目名称", {
                content: "textFilter",
                placeholder: "请输入项目名称进行查询",
            }],
            fillspace: true
        }, 
        {
            id: "process_name",
            header: "工序",
            fillspace: true
        }, 
        {
            id: "cutter_specs",
            header: "规格",
            fillspace: true
        }, 
        {
            id: "cutter_life",
            header: "寿命",
            fillspace: true
        }, 
        ],
        height: 740,
        editable: true,
        tooltip: true,
        data: {
            data: "",
            spans: []
        },
        spans: true,
        select: "cell",
    };
    var web = {
        type: "line",
        container: "body",
        id: "mylayout",
        rows: [
        my_template, 
        my_button, 
        {
            height: 10
        }
        ],
    };
    webix.ui(my_datatable3);
    webix.ui(web);
    /*---webix.ui结束----*/
    // 工序名搜索
    /*后台所需数据
  webix.ajax().sync().post("getRoughProjectList", "", function(text, xml, xhr){
    var text1=JSON.parse(text); 
    var data = new webix.DataCollection({data:text1.data});
    $$('my_datatable3').data.sync(data);
    chuli(text1.data);
  });*/
    $$("search_pro").attachEvent("onTimedKeyPress", function() {
        var value = this.getValue();
        $$("process_list").filter(function(obj) {
            return obj.process_name.indexOf(value) >= 0;
        }
        )
    });
    /*当数据保存后规格和寿命再更改*/
    $$('my_pro_dt').attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate) {
        var material_judge2 = [];
        var life_judge2 = [];
        console.log(state.old);
        console.log(editor);
        console.log(ignoreUpdate);
        if (state.old == undefined || state.old == "") {
        } 
        else {
            if (state.value != state.old) {
                webix.alert({
                    title: "警告",
                    text: "您的规格或寿命数据已改，若该条数据之前已保存，请再次点击“保存当前数据”按钮，否则修改后的数据将无法保存后台！",
                    ok: "确定",
                    type: "confirm-warning",
                    callback: function(result) {
                        if (result == true) {
                        }
                    }
                });
            }
        }
    });
    change();
    chuli(dt3);
    //调用处理的地方
    /*--------------end-----------*/
});
/*显示模态框 */
function showForm(winId) {
    $$(winId).show();
};
/*删除规格寿命数据*/
function deldatas(component) {
    $$("component").remove($$("component").getSelectedId());
};
/*onAfterSelect更换规格和机台界面*/
function change() {
    $$("process_list").attachEvent("onAfterSelect", function(id, e, node) {
        console.log(xms2);
        var plist = $$("process_list");
        list_index = plist.getIndexById(id);
        /*更换规格界面*/
        $$("my_pro_dt").clearAll();
        $$("my_pro_dt").define("data", ggss[list_index]);
        $$("my_pro_dt").refresh();
        /*更换机台界面*/
        $$("muls").setValue(jt_datas[list_index]);
        $$("muls").refresh();
    });
}
/*在添加项目页面点击“下一步”跳转入工序页面*/
function down_pro() {
    var data = $$("project_name").getValue();
    var start_date_data = $$("start_date").getValue();
    var end_date_data = $$("end_date").getValue();
    var bool = start_date_data <= end_date_data;
    
    if (data == "" || start_date_data == "" || end_date_data == "" || bool == false) {
        webix.alert({
            title: "警告",
            text: "您有数据尚未填写！！<br/>或开始与结束日期存在逻辑错误！！",
            ok: "确定",
            type: "confirm-warning",
            callback: function(result) {
                if (result == true) {
                }
            }
        });
    } 
    else {
        $$('project').hide();
        showForm("process");
        /*保存项目数据*/
        project_data = $$("add_P_form").getValues();
    }
}
/*在添加工序、规格（寿命）、机台页面点击上一步跳转入添加项目页面*/
function up_project() {
    $$('process').hide();
    showForm("project");
}
/*点击“添加工序”按钮添加一行工序并保存工序数据*/
function add_pros() {
    var pros = $$("process_list");
    var data = $$("add_pro").getValue();
    var gxmcs = [];
    var count = 0;
    pros.data.each(function(obj) {
        gxmcs.push(obj.process_name);
    }
    );
    for (var i = 0; i <= gxmcs.length; i++) {
        if (data == gxmcs[i])
            count++;
    }
    if (data == "" || count > 0) {
        webix.alert({
            title: "警告",
            text: "您输入的工序名称为空<br/>或该名称已存在！",
            ok: "确定",
            type: "confirm-warning",
            callback: function(result) {
                if (result == true) {
                }
            }
        });
    } 
    else {
        var list_id = pros.add({
            process_name: data
        });
        $$('process_list').select(list_id);
    }
};
/*点击“添加规格”按钮添加一行规格名称和寿命*/
function addRows() {
    var dt = $$("my_pro_dt");
    var item = $$("process_list").getSelectedItem();
    if (item == undefined) {
        dt.disable();
        webix.alert({
            title: "警告",
            text: "请先添加并在左侧工序列表中点击选择一项工序！",
            ok: "确定",
            type: "confirm-warning",
            callback: function(result) {
                if (result == true) {
                }
            }
        });
    } 
    else {
        dt.enable();
        var id = dt.add({
        });
        dt.select(id);
        dt.editRow(id);
        
    }
}
/*获取机台数据*/
function gain_jt() {
    var gx = {
        "process_name": "",
        "cutters": [],
        "machines": []
    };
    var jts = [];
    var text = $$("muls").getText().replace(/\s/g, "");
    /*机台ID的处理*/
    var text1 = text.split(",");
    var ch = JSON.stringify(text1);
    var datas_muls = JSON.parse(ch);
    /*机台名称的处理*/
    for (var i = 0; i < datas_muls.length; i++) {
        var jt = {
            "machine_id": ""
        };
        jt.machine_id = datas_muls[i];
        jts.push(jt);
        gx.machines = jts;
    }
    return gx.machines;
};
/*获取规格、寿命数据*/
function gain_gg() {
    var gx = {
        "process_name": "",
        "cutters": [],
        "machines": []
    };
    var cutters = [];
    $$("my_pro_dt").eachRow(function(row) {
        var gg = {
            "material_id": "",
            "cutter_life": ""
        };
        var dt = $$("my_pro_dt");
        gg.material_id = dt.getItem(row).material_id;
        gg.cutter_life = dt.getItem(row).cutter_life;
        cutters.push(gg);
        gx.cutters = cutters;
    });
    return gx.cutters;
};
/*获取工序数据*/
function gain_gx() {
    var gxs = [];
    $$("process_list").data.each(function(obj) {
        var gx = {
            "process_name": "",
            "cutters": [],
            "machines": []
        };
        gx.process_name = obj.process_name;
        gxs.push(gx);
    });
    return gxs;
};
/*获取项目数据*/
function gain_xm() {
    var xm = {
        "project_name": "",
        "project_code": "",
        "process_data": []
    };
    xm.project_name = project_data.project_name;
    xm.project_code = project_data.project_code;
    return xm;
};
/*当点击完成页面的×时，提醒用户：最后一条数据尚未保存，是否退出该界面？*/
function cancel() {
    webix.confirm({
        title: "警告",
        text: "最后一条数据尚未保存，是否退出该界面？",
        ok: "退出",
        cancel: "返回",
        type: "confirm-warning",
        /*error*/
        callback: function(result) {
            if (result) {
                $$('process').hide();
            }
        }
    });
}
/*当点击“提交一条数据”时，提交一条数据到暂时变量xms2中保存*/

/*将各个数据整合*/
function data() {
    var process_judge = [];
    var material_judge = [];
    var life_judge = [];
    var jts_judge = [];
    var material_nullValue = 0;
    var life_nullValue = 0;
    var jt_nullValue = 0;
    /*工序列表数据*/
    $$("process_list").data.each(function(obj) {
        process_judge.push(obj.process_name);
    }
    );
    /*规格表格数据*/
    $$("my_pro_dt").eachRow(function(row) {
        var dt = $$("my_pro_dt");
        material_judge.push(dt.getItem(row).material_id);
        life_judge.push(dt.getItem(row).cutter_life);
    });
    /*机台multiselect数据*/
    var text = $$("muls").getText().replace(/\s/g, "");
    var text1 = text.split(",");
    var ch = JSON.stringify(text1);
    jts_judge = JSON.parse(ch);
    
    /*使用material_nullValue记录规格名称数据的空值（""）数量*/
    for (var i = 0; i < material_judge.length; i++) {
        if (material_judge[i] == undefined || material_judge[i] == "") {
            material_nullValue++;
        }
    }
    /*使用life_nullValue记录规格寿命数据的空值（""）数量*/
    for (var i = 0; i < life_judge.length; i++) {
        if (life_judge[i] == undefined || life_judge[i] == "") {
            life_nullValue++;
        }
    };
    /*使用jt_nullValue记录规格寿命数据的空值（""）数量*/
    for (var i = 0; i < jts_judge.length; i++) {
        if (jts_judge[i] == "" || jts_judge[i] == undefined) {
            jt_nullValue++;
        }
    };
    /*判断所有数据是否为空，一种空为没有添加（length为0），一种空为添加了但是没有内容（""）*/
    if (process_judge.length <= 0 || material_judge.length <= 0 || material_nullValue > 0 || life_nullValue > 0 || jt_nullValue > 0) 
    {
        webix.alert({
            title: "警告",
            text: "当前数据存在空值，请检查工序、规格、机台！！",
            ok: "确定",
            type: "confirm-warning",
            callback: function(result) {
                if (result == true) {
                }
            }
        });
    } 
    else {
        /*工序数据*/
        var gxs2 = gain_gx();
        /*规格、寿命数据*/
        var ggs2 = gain_gg();
        ggss[list_index] = ggs2;
        
        /*机台数据*/
        var jts2 = gain_jt();
        jtss[list_index] = jts2;
        
        /*将规格数据传递给工序数据*/
        for (var i = 0; i < gxs2.length; i++) {
            gxs2[i].cutters = ggss[i];
        }
        
        /*将机台数据传递给工序数据*/
        for (var i = 0; i < gxs2.length; i++) {
            gxs2[i].machines = jtss[i];
        }
        /*项目数据*/
        xms2.project_name = project_data.project_name;
        xms2.project_code = project_data.project_code;
        /*将工序数据传给项目*/
        xms2.process_data = gxs2;
        
        var jt_data = [];
        for (var i = 0; i < jtss[list_index].length; i++) {
            jt_data.push(jtss[list_index][i].machine_id);
        }
        jt_datas[list_index] = jt_data;
        /*当点击“提交一条数据”按钮时，弹出可进行下一步添加数据操作提示框*/
        if (info == 0) {
            webix.alert({
                title: "提示信息",
                text: "当前工序数据已提交，您可以输入下一条数据，或更改上一条数据!",
                type: "'alert-warning'"
            });
        }
        /*当点击“完成”按钮时，弹出提示框*/ 
        else if (info == 1) {
            /*判断是否出现有工序名称，但没有工序规格和机台的情况，这种情况点击“提交一条数据”按钮事件无法判别*/
            var count = 0;
            for (var i = 0; i < xms2.process_data.length; i++) {
                if (xms2.process_data[i].cutters == undefined) {
                    count++;
                }
            }
            if (count > 0) {
                webix.alert({
                    title: "提示信息",
                    text: "您有工序未添加规格或机台!",
                    type: "'alert-warning'"
                });
            } 
            else {
                $$('process').hide();
                /* var params ={};
        params.project_data = JSON.stringify(xms2);
        webix.ajax().sync().post("addProject", params, function(text, xml, xhr){
          alert("执行完毕");
          location.reload();
        }); */
            }
        }
    }
    $$("my_pro_dt").editStop();
}
var info;
/*点击“添加当前数据”按钮*/
function submit() {
    info = 0;
    data();
}
/*点击“完成”按钮*/
function all_submit() {
    info = 1;
    data();
}
function callback2(data) {
    $$("my_datatable3").define("url", "http://192.168.1.111:9001/Application/demo");
    $$("my_datatable3").refresh();
}
/*function sortNumber(propertyName1){
  return function(object1,object2)       {
    var value1=object1[propertyName1];
    var value2=object2[propertyName1];
    return value1.localeCompare(value2);
  }
};*/


function sortNumber(propertyName1) {
    return function(object1, object2) {
        var value1 = object1[propertyName1];
        var value2 = object2[propertyName1];
        if(value1>value2){return 1;}
        else{
           if(value1<value2){return -1;}
           else{return 0;}
        }
        if (value1 > value2) {
            return 1;
        } 
        else if (value1 < value2) {
            return -1;
        } 
        else {
            return 0;
        }
    }
    ;
}



// 对后台的数据进行分析，几个项目，几个工序


function chuli(data) {
    var data_project = data.sort(sortNumber("project_name"));
    //按照条件项目名称排好序的所有数据
    var new_data = [];
    //已经排好序的所有数据
    var start = data_project[0].project_name;
    //相同组合的第一个数据的内容
    var j = 0;
    //相同组合的第一个数据的下标
    var temp_data1;
    //存储在条件项目名称下再按照工序名称排好序的所有数据
    var begins = [];
    //所有相同组合的第一个数据的下标的数组集合
    begins.push(0);
    var dt33 = $$("my_datatable3");
    //-------start:在项目已排好的前提下将工序名称相同的数据排在一起-------------
    for (var i = 0; i < data_project.length; i++) {
        if (start != data_project[i].project_name) {
            temp_data1 = data_project.slice(j, i).sort(sortNumber("process_name"));
            //在条件项目名称下再按照工序名称排好序的所有数据
            j = i;
            begins.push(j);
            start = data_project[i].project_name;
            for (var n = 0; n < temp_data1.length; n++) {
                new_data.push(temp_data1[n]);
            }
        }
    }
    var temp_data2 = data_project.slice(j).sort(sortNumber("process_name"));
    for (var k = 0; k < temp_data2.length; k++) {
        new_data.push(temp_data2[k]);
    }
    //-------end:在项目已排好的前提下将工序名称相同的数据排在一起-------------
    dt33.clearAll();
    dt33.define("data", new_data);
    dt33.refresh();
    //-------start:将相同的数据addSpan()在一起（项目名称）-------------
    for (var m = 0; m < begins.length; m++) {
        var e1 = dt33.getIdByIndex(begins[m]);
        var result = begins[m + 1] - begins[m];
        //两个组合的第一个数据下标相减，得到第一个组合的长度
        if (begins[m + 1] != undefined) {
            dt33.addSpan([[e1, "project_name", 1, result]]);
        } 
        else {
            //最后一个组合的begins[i+1]为undefined
            var result2 = new_data.length - begins[m];
            dt33.addSpan([[e1, "project_name", 1, result2]]);
        }
    }
    //-------end:将相同的数据addSpan()在一起（项目名称）-------------
    //-------start:将相同的数据addSpan()在一起（工序名称）-------------
    var start2 = new_data[0].process_name;
    var s = 0;
    var begins_1 = begins;
    begins_1.push(new_data.length);
    var begins2 = [];
    begins2.push(0);
    for (var g = 1; g < begins_1.length; g++) {
        for (var p = s; p < begins_1[g]; p++) {
            if (start2 != new_data[p].process_name) {
                begins2.push(p);
                start2 = new_data[p].process_name;
            }
        }
        s = p;
        //最后一个工序名称组合
        begins2.push(p);
        //最后一个工序名称组合
        if (p < new_data.length) {
            start2 = new_data[p].process_name;
        }
        //把最后一个多出来的下标去掉
    }
    var j2 = 0;
    for (var h = j2; h < begins2.length; h++) {
        var e2 = dt33.getIdByIndex(begins2[h]);
        j2 = begins2[h + 1];
        var result3 = begins2[h + 1] - begins2[h];
        //两个组合的第一个数据下标相减，得到第一个组合的长度
        if (begins[h + 1] == undefined && e2 == undefined) {
            var result4 = new_data.length - begins2[h];
            dt33.addSpan([[e2, "process_name", 1, result4]]);
        } 
        else {
            //最后一个组合的begins[i+1]为undefined
            dt33.addSpan([[e2, "process_name", 1, result3]]);
        }
    }
    //-------end:将相同的数据addSpan()在一起（工序名称）-------------
    dt33.refresh();
}
