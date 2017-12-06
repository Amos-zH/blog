/**
 * 人员选择器
 * 用法：
 personSelector.open({
   	 userObj: null,//登录人员信息:默认为null,type： Object
   	 type: 1,//选择类型 ：1->单选 2->多选 3->可选与必选，默认为1
   	 viewSubDeptStaff: false,//是否显示子级部门人员：默认为 false
   	 param:{} //传入的已选数据 required:已选的必选对象，alternative:已选的可选对象，selected:一个选框时的已选择对象，默认为null
 },function(data){
     //回调函数 data:已选择的人员列表
 });
 */

    personSelector = {
        rootText: 'YASHA',
        zTreeObj:null,
        personMsgList:null,
        winObj : null,
        type: {
            single: 1,//单选
            multiple: 2,//多选
            alternative: 3 //可选与必选
        },
        open: function(settings,callback){
            parent.layer.open({
                title:'选择人员',
                maxmin: true,
                type: 2,
                skin: 'layui-layer-rim', //加上边框
                area: ['900px','90%'], //宽高
                fixed: false, //不固定
                content: '../commons/user-selector/more-people.shtml',
                btn: ['确定', '取消']
                ,yes: function(index, layero){
                    if(personSelector.winObj.currType == personSelector.type.alternative && personSelector.winObj.selectedUser.required.length == 0){
                        parent.layer.msg('必选人员不能为空',{time:1000});
                    }else{
                        callback(personSelector.winObj.selectedUser);
                        parent.layer.close(index);
                    }
                },btn2: function(index, layero){
                    parent.layer.close(index);
                },success: function(layero,index){
                    personSelector.winObj = layero.find('iframe')[0].contentWindow;
                    personSelector.winObj.userMsg = settings.userObj ? settings.userObj : null;//登录人员信息：userMsg
                    personSelector.winObj.currType = settings.type ? settings.type : 1;//人员选择类型：currType
                    personSelector.winObj.acceptData = settings.param ? settings.param : null;//传入已选人员数据：acceptData
                    personSelector.winObj.selectedUser = personSelector.winObj.acceptData;//用户所选人员集合：selectedUser
                    personSelector.winObj.viewSubDeptStaff = settings.viewSubDeptStaff ? settings.viewSubDeptStaff : false;
                    if(jQuery.isEmptyObject( personSelector.winObj.selectedUser)){
                        settings.type == personSelector.type.alternative ? personSelector.winObj.selectedUser={required:[],alternative:[]} : personSelector.winObj.selectedUser={selected:[]};
                    }
                    personSelector.winObj.personSelector.init();
                }
            });
        },
        init: function(){
            personSelector.personMsgList = $('#personMsgList');
            personSelector.initTree();
            personSelector.bindEvent();
            if(currType == personSelector.type.alternative){
                $('.jsDoubleSel').show().siblings('.jsOneSel').hide();
            }else{
                $('.jsOneSel').show().siblings('.jsDoubleSel').hide();
            }
        },
        //左侧组织树
        initTree: function(){
            var setting = {
                view: {
                    showLine: false,
                    showIcon: false,
                    selectedMulti: false,
                    expandSpeed: ''
                },
                callback: {
                    beforeClick: function(treeId,treeNode){
                        var treeObj = $.fn.zTree.getZTreeObj("orgTree");
                        var nodes = treeObj.getSelectedNodes();
                        if(nodes[0] == treeNode){
                            return false;
                        }
                    },
                    onClick: function () {//切换组织部门
                        personSelector.personMsgList.datagrid('reload');
                    }
                }
            };
            var zNodes = [
                {id: 0, name: "常用联系人", children: []},
                {
                    id: 0, name: "YASHA", open: true, children: [
                    {
                        id: 1, pId: 0, name: "蘑菇加", children: [
                        {id: 101, pId: 1, name: "蘑菇加公司高层"},
                        {id: 102, pId: 1, name: "蘑菇加研发部"},
                        {
                            id: 103, pId: 1, name: "平台中心", children: [
                            {name: "技术开发部"},
                            {name: "平台规划部"}
                        ]
                        }
                    ]
                    },
                    {
                        id: 2, pId: 0, name: "亚厦装饰", children: [
                        {id: 201, pId: 2, name: "高层"},
                        {id: 206, pId: 2, name: "集采中心"},
                        {
                            id: 207, pId: 2, name: "董事会", children: [
                            {id: 210, pId: 2, name: "审计部"},
                            {id: 211, pId: 2, name: "稽核中心"},
                            {id: 205, pId: 2, name: "董事会秘书"}
                        ]
                        }
                    ]
                    },
                    {
                        id: 3, pId: 0, name: "亚厦股份", children: [
                        {id: 201, pId: 2, name: "党委"},
                        {id: 206, pId: 2, name: "纪委"},
                        {
                            id: 207, pId: 2, name: "董事会", children: [
                            {id: 210, pId: 2, name: "审计部"},
                            {id: 211, pId: 2, name: "稽核中心"},
                            {id: 205, pId: 2, name: "董事会秘书"}
                        ]
                        }
                    ]
                    },
                    {
                        id: 4, pId: 0, name: "亚厦装饰", children: [
                        {id: 301, pId: 3, name: "高层"},
                        {id: 302, pId: 3, name: "企业管理部"},
                        {
                            id: 303, pId: 3, name: "监察部", children: [
                            {name: "督导部"},
                            {name: "法务部"},
                            {name: "合约部"}
                        ]
                        },
                        {
                            id: 304, pId: 3, name: "生产系统", children: [
                            {
                                name: "工管中心", children: [
                                {name: "工程督导部"},
                                {name: "决算管理部"},
                                {name: "计划运营部"},
                                {name: "综合管理部"},
                                {name: "项目部"}
                            ]
                            },
                            {name: "生产深化设计院"}
                        ]
                        }
                    ]
                    }
                ]
                }
            ];
            personSelector.zTreeObj = $.fn.zTree.init($("#orgTree"), setting, zNodes);
            var node = personSelector.zTreeObj.getNodeByParam("text", personSelector.rootText, null);
            personSelector.zTreeObj.selectNode(node);
            personSelector.zTreeObj.expandNode(node, true);
            personSelector.initDg();
        },
        //初始化数据表格
        initDg: function(){
            personSelector.personMsgList.datagrid({
                fit:true,
                url:'datagrid_data1.json',
                method:'get',
                singleSelect: currType == personSelector.type.single ? true : false,
                pagination:true,
                pageSize : 10,pageList : [ 10, 20,30,40],
                onLoadSuccess: function(data){
                    if(!jQuery.isEmptyObject(acceptData)){
                        $.each(acceptData,function(j,arr){
                            $.each(arr,function(n,val){
                                (!$('#sel_'+val.no)[0]) && ($('.selected-box.'+j).append('<span class="close-btn-sm" id="sel_' + val.no + '">' + val.name + '<i class="close-user"></i></span>'));
                                for(var i=0;i<data.rows.length;i++){
                                    if(data.rows[i].no == val.no) {
                                        $('#personMsgList').datagrid('selectRow', i);
                                        $('.sel-count').text($('.close-btn-sm').length);
                                    }
                                }
                            });
                        });
                    }
                },
                //双击选择人员
                onDblClickRow: function(rowIndex, rowData){
                    if(currType == personSelector.type.single){
                        if($('.close-btn-sm').length >= 1 ){
                            parent.layer.msg('只能选择一个人员',{time:1000})
                        }else{
                            $('.selected').append('<span class="close-btn-sm" id="sel_' + rowData.no + '">' + rowData.name + '<i class="close-user"></i></span>');
                            $('.sel-count').text($('.close-btn-sm').length);
                            selectedUser.selected.push(rowData);
                        }
                    }else if(currType == personSelector.type.multiple){
                        if(!$('#sel_'+rowData.no)[0]){
                            $('.selected').append('<span class="close-btn-sm" id="sel_' + rowData.no + '">' + rowData.name + '<i class="close-user"></i></span>');
                            $('.sel-count').text($('.close-btn-sm').length);
                            selectedUser.selected.push(rowData);
                        }else{
                            parent.layer.msg('该人员已选择',{time:1000});
                        }
                    }else{
                        return false;
                    }
                }
            });
        },
        bindEvent: function(){
            //点击添加用户按钮添加用户
            $('.jsAddToRight').click(function (e) {
                var checkedArr = personSelector.personMsgList.datagrid('getChecked');
                var selArr = [];
                if(currType == personSelector.type.single && ($('.close-btn-sm').length >= 1 || checkedArr.length>1)){
                    parent.layer.msg('只能选择一个人员',{time:1000});
                }else if(checkedArr && checkedArr.length > 0){
                    for(var i=0;i<checkedArr.length;i++){
                        if(!$('#sel_'+checkedArr[i].no)[0]){
                            if($(this).hasClass('jsRequired')){
                                selectedUser.required.push(checkedArr[i]);
                            }else if($(this).hasClass('jsAvailable')){
                                selectedUser.alternative.push(checkedArr[i]);
                            }else{
                                selectedUser.selected.push(checkedArr[i]);
                            }
                            $(this).closest('dl').find('.selected-box').append('<span class="close-btn-sm" id="sel_' + checkedArr[i].no + '">' + checkedArr[i].name + '<i class="close-user"></i></span>');
                            $('.sel-count').text($('.close-btn-sm').length);
                        }else{
                            selArr.push(checkedArr[i]);
                        }
                    }
                    (selArr.length == checkedArr.length) && parent.layer.msg('人员已选择',{time:1000});
                }else{
                    parent.layer.msg('请选择人员',{time:1000});
                }
            });
            //删除已选人员
            $('.close-user').live('click', function (e) {
                var _id = $(this).closest('.close-btn-sm').attr('id').replace('sel_','');
                $.each(selectedUser,function(i,arr){
                    for(var n=0;n<arr.length;n++){
                        if(_id == arr[n].no){
                            arr.splice(n,1);
                        }
                    }
                });
                $(this).closest('.close-btn-sm').remove();
                $('.sel-count').text($('.close-btn-sm').length);
            });
        }
    };
